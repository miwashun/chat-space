class Message < ApplicationRecord
  belongs_to :user
  has_many :groups
  validates :content, presence: true, unless: :image?
  mount_uploader :image, ImageUploader
end
