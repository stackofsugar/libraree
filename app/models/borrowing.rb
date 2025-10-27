class Borrowing < ApplicationRecord
  include HumanId

  attr_accessor :borrow

  belongs_to :book
  belongs_to :user

  before_validation :decrement_book_stock, if: :borrow
  before_validation :increment_book_stock, unless: :borrow

  validates_associated :book, message: "has no stock"
  validates :return_date, comparison: { greater_than: Date.current, message: "has already passed" }
  validate :borrow_duration

  def borrow_duration
    if (self.return_date - Date.current).to_i > 30
      errors.add(:return_date, "is too long (can't borrow for more than 30 days)")
    end
  end

  def decrement_book_stock
    self.book&.decrement!(:stock)
  end

  def increment_book_stock
    self.book.increment!(:stock)
  end
end
