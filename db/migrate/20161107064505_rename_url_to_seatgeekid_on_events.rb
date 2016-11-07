class RenameUrlToSeatgeekidOnEvents < ActiveRecord::Migration
  def change
    rename_column :events, :url, :seatgeek_id
  end
end
