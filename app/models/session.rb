class Session < ApplicationRecord
  has_secure_token length: 32
  belongs_to :user
end
