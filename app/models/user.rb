class User < ApplicationRecord
  has_secure_password
  has_many :sessions, dependent: :destroy
  has_many :borrowing, dependent: :destroy

  normalizes :email_address, with: ->(e) { e.strip.downcase }
  normalizes :name, with: ->(e) { e.strip.titlecase }

  validates :email_address, length: { in: 3..150 }, uniqueness: true
  validates :name, length: { in: 3..150 }
  validates :password, length: { minimum: 8 }, allow_nil: true
  validates :id_card_number, numericality: { only_integer: true }
end
