module HumanId
  extend ActiveSupport::Concern

  included do
    before_validation do
      self.human_id = SecureRandom.base58 if new_record?
    end

    validates :human_id, presence: true
  end
end
