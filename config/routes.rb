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
    resources :borrowers, param: :human_id
    resources :books,     param: :isbn
    resource :borrows do
      get "all", on: :member
      get "return", on: :member
    end
  end
  resolve("Borrow") { [ :borrow ] }
end
