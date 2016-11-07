class AddForeignKeyNotRefernceToDays < ActiveRecord::Migration
  def change
    add_foreign_key :days, :events
  end
end
