class SessionsController < ApplicationController
  allow_unauthenticated_access only: %i[ create ]
  allow_non_admin only: %i[ destroy show ]
  # rate_limit to: 10, within: 3.minutes, only: :create, with: -> { render status: :too_many_requests }

  include LoggingHelper

  def create
    if authenticated?
      user = current_user
      render json: {
        typ: "already_authenticated",
        user: {
          email_address: user.email_address,
          name: user.name,
          is_admin: user.is_admin
        }
      }
    else
      if user = User.authenticate_by(login_params)
        token = start_new_session_for(user)
        reset_session
        render json: {
          user: {
            token: token,
            email_address: user.email_address,
            name: user.name,
            is_admin: user.is_admin
          }
        }
      else
        render json: {
          msg: "Invalid credentials supplied",
          typ: "invalid_credentials"
          }, status: :unprocessable_entity
      end
    end
  end

  def show
    user = current_user
    render json: {
      name: user.name,
      is_admin: user.is_admin,
    }
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
