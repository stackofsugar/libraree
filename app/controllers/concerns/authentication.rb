module Authentication
  include LoggingHelper
  extend ActiveSupport::Concern

  included do
    before_action :require_authentication, :require_admin
  end

  class_methods do
    def allow_unauthenticated_access(**options)
      skip_before_action :require_authentication, :require_admin, **options
    end

    def allow_non_admin(**options)
      skip_before_action :require_admin, **options
    end
  end

  private
    def authenticated?
      resume_session
    end

    def require_authentication
      resume_session || forbidden
    end

    def require_admin
      user = resume_session.user
      user.is_admin ? resume_session : forbidden
    end

    def current_user
      Current.user ||= resume_session.user
    end

    def forbidden
      render status: :forbidden, location: login_path
    end

    def resume_session
      Current.session ||= find_session_by_token
    end

    def find_session_by_token
      ActionController::HttpAuthentication::Token.authenticate(self) do |token, _|
        Session.find_by(token: token).tap do |session|
          session.touch if session
        end
      end
    end

    def start_new_session_for(user)
      user.sessions.create!(ip_address: request.remote_ip).tap do |session|
        Current.session = session
      end.token
    end

    def terminate_session
      Current.session.destroy
    end
end
