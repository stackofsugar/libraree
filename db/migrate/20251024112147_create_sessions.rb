class CreateSessions < ActiveRecord::Migration[8.0]
  def change
    create_table :sessions do |t|
      t.references :user, null: false, foreign_key: true
      t.string :ip_address, null: false
      t.string :token, null: false, limit: 32

      t.timestamps
    end
    add_index :sessions, :token, unique: true
  end
end
