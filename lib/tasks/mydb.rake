# frozen_string_literal: true

namespace :mydb do
  task reload: :environment do
    if Rails.env.development?
      puts "Dropping database"
      Rake::Task["db:drop"].invoke
      puts "Creating database"
      Rake::Task["db:create"].invoke
      puts "Recreating database schema"
      Rake::Task["db:rollback"].invoke
      puts "Running database migrations"
      Rake::Task["db:migrate"].invoke
      if ENV["seed"]
        puts "Seeding database"
        Rails::Command.invoke("db:seed")
      end
    else
      raise "mydb:reload is only available on development environment!"
    end
  end
end
