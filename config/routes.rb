Rails.application.routes.draw do
  scope path: "v1" do
    # Root & Health
    root "home#index"
    get "up" => "rails/health#show", as: :rails_health_check

    # Authentication
    post "login",  to: "sessions#create",  as: :login
    get "test",  to: "sessions#show",  as: :test
    post "logout", to: "sessions#destroy", as: :logout

    # Business Logic
    resources :borrower, param: :email_address
    resources :book,     param: :human_id
    resources :borrow,   param: :human_id
  end
end
