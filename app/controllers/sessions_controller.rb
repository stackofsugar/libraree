class SessionsController < ApplicationController
  allow_unauthenticated_access only: %i[ create ]
  allow_non_admin only: %i[ destroy ]
  rate_limit to: 10, within: 3.minutes, only: :create, with: -> { render status: :too_many_requests }

  include LoggingHelper

  def create
    if authenticated?
      render json: {
        typ: "already_authenticated"
      }
    else
      if user = User.authenticate_by(login_params)
        token = start_new_session_for(user)
        reset_session
        render json: { token: token }
      else
        render json: {
          msg: "Invalid credentials supplied",
          typ: "invalid_credentials"
          }, status: :unprocessable_entity
      end
    end
  end

  def show
    render json: { msg: "" }
  end

  def destroy
    terminate_session
    render status: :ok
  end

  private

  def login_params
    params.expect(user: [ :email_address, :password ])
  end
end
