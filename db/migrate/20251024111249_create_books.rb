class CreateBooks < ActiveRecord::Migration[8.0]
  def change
    create_table :books do |t|
      t.string :title, null: false, limit: 300
      t.string :isbn, null: false, limit: 17
      t.integer :stock, null: false

      t.timestamps
    end
    add_index :books, :isbn, unique: true
  end
end
