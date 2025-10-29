class BorrowsController < ApplicationController
  include LoggingHelper
  allow_non_admin only: %i[ show create return ]

  def all
    render json: (Borrowing.includes(:book, :user).order(Arel.sql("returned_at DESC NULLS FIRST"), updated_at: :desc).map do |borrow|
      {
        id: borrow.id,
        return_date: borrow.return_date,
        returned_at: borrow.returned_at,
        book: {
          title: borrow.book.title,
        },
        user: {
          name: borrow.user.name,
          email_address: borrow.user.email_address,
        },
        late: borrow.returned_at ? (borrow.returned_at > borrow.return_date) : nil,
        updated_at: borrow.updated_at,
      }
    end)
  end

  def show
    render json: (current_user.borrowing.where(returned_at: nil).first.then do |borrow|
      borrow ? {
        id: borrow.id,
        return_date: borrow.return_date,
        book_title: borrow.book.title,
        updated_at: borrow.updated_at
      } : {}
    end)
  end

  def create
    if current_user.borrowing.where(returned_at: nil).present?
      render json: {
        base: [ "You have an active loan. Return your book before attempting to borrow more" ]
      }, status: :unprocessable_entity
    else
      @borrowing = Borrowing.new(borrowing_params.merge({ user_id: current_user.id }))
      @borrowing.borrow = true
      if @borrowing.save
        render json: {
          id: @borrowing.id,
          return_date: @borrowing.return_date,
          book_title: @borrowing.book.title
        }
      else
        render json: @borrowing.errors, status: :unprocessable_entity
      end
    end
  end

  def return
    if current_user.borrowing.where(returned_at: nil).present?
      current_user.borrowing.where(returned_at: nil).first.update(returned_at: Date.current)
      render json: {}
    else
      render json: {
        base: [ "You have no outstanding loans" ]
      }, status: :unprocessable_entity
    end
  end

  private

  def borrowing_params
    params.expect(borrowing: [ :return_date, :book_id ])
  end
end
