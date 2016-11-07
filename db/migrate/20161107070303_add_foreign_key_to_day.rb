class AddForeignKeyToDay < ActiveRecord::Migration
  def change
    add_reference :days, :event, index: true
  end
end
