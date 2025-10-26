class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :users do |t|
      t.string :email_address, null: false, limit: 150

      t.string :password_digest, null: false
      t.string :id_card_number, null: false
      t.string :name, null: false, limit: 150
      t.boolean :is_admin, null: false, default: false

      t.timestamps
    end
    add_index :users, :email_address, unique: true
    add_index :users, :id_card_number, unique: true
  end
end
