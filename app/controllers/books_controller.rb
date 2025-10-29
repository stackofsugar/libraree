class BooksController < ApplicationController
  include LoggingHelper
  allow_non_admin only: %i[ index show ]

  def index
    if params[:in_stock]
      render json: Book.select(
        :id, :title,
        :isbn, :stock, :updated_at
        ).where("stock > 0").order(:stock).order(updated_at: :desc)
    else
      render json: Book.select(
        :id, :title,
        :isbn, :stock, :updated_at
        ).order(:stock).order(updated_at: :desc)
    end
  end

  def show
    render json: Book.select(:id, :title, :isbn, :stock).find_by!(isbn: params[:isbn])
  end

  def create
    @book = Book.new(book_params)
    if @book.save
      render json: @book
    else
      render json: @book.errors, status: :unprocessable_entity
    end
  end

  private

  def book_params
    params.expect(book: [ :title, :isbn, :stock ])
  end
end
