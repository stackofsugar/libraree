class Book < ApplicationRecord
  has_one :borrowing, dependent: :destroy

  validates :title, length: { in: 3..300 }
  validates :isbn, length: { in: 10..17 }
  validates :isbn, uniqueness: { message: "already exists" }
  validates :stock, comparison: { greater_than_or_equal_to: 0 }
end
