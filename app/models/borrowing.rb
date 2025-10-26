class Borrowing < ApplicationRecord
  include HumanId

  belongs_to :book
  belongs_to :user

  validates_associated :book, :user
  validates :book, :user, presence: true
  validates :return_date, comparison: { greater_than: Date.current, message: "has already passed" }
end
