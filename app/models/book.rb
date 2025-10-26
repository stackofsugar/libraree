class Book < ApplicationRecord
  include HumanId

  has_one :borrowing, dependent: :destroy

  validates :title, length: { in: 3..300 }
  validates :isbn, length: { in: 10..17 }
  validates :stock, comparison: { greater_than: 0 }
end
