class CreateBooks < ActiveRecord::Migration[8.0]
  def change
    create_table :books do |t|
      t.string :human_id, null: false, limit: 16

      t.string :title, null: false, limit: 300
      t.string :isbn, null: false, limit: 17
      t.integer :stock, null: false

      t.timestamps
    end
    add_index :books, :human_id, unique: true
    add_index :books, :isbn, unique: true
  end
end
