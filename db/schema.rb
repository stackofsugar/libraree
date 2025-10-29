# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_10_24_112147) do
  create_table "books", force: :cascade do |t|
    t.string "title", limit: 300, null: false
    t.string "isbn", limit: 17, null: false
    t.integer "stock", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["isbn"], name: "index_books_on_isbn", unique: true
  end

  create_table "borrowings", force: :cascade do |t|
    t.string "human_id", limit: 16, null: false
    t.date "return_date", null: false
    t.date "returned_at"
    t.bigint "book_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["book_id"], name: "index_borrowings_on_book_id"
    t.index ["user_id"], name: "index_borrowings_on_user_id"
  end

  create_table "sessions", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "ip_address", null: false
    t.string "token", limit: 32, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["token"], name: "index_sessions_on_token", unique: true
    t.index ["user_id"], name: "index_sessions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email_address", limit: 150, null: false
    t.string "password_digest", null: false
    t.string "id_card_number", null: false
    t.string "name", limit: 150, null: false
    t.boolean "is_admin", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email_address"], name: "index_users_on_email_address", unique: true
    t.index ["id_card_number"], name: "index_users_on_id_card_number", unique: true
  end

  add_foreign_key "borrowings", "books"
  add_foreign_key "borrowings", "users"
  add_foreign_key "sessions", "users"
end
