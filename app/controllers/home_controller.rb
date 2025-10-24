class HomeController < ApplicationController
  def index
    render json: { message: "Welcome to Libraree" }
  end
end
