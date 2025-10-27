class BorrowersController < ApplicationController
  include LoggingHelper

  def index
    render json: User.select(
      :id, :name, :email_address,
      :id_card_number, :is_admin, :updated_at
    ).order(is_admin: :desc).order(updated_at: :desc)
  end

  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user, location: borrower_index_path
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.expect(user: [ :email_address, :password, :id_card_number, :name, :is_admin ])
  end
end
