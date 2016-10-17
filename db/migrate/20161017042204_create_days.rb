class CreateDays < ActiveRecord::Migration
  def change
    create_table :days do |t|
      t.datetime :date
      t.integer :listing_count, null: false
      t.integer :average_price, null: false
      t.integer :lowest_price, null: false
      t.integer :highest_price, null: false

      t.timestamps null: false
    end
  end
end
