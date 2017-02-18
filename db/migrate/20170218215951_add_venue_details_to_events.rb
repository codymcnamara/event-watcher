class AddVenueDetailsToEvents < ActiveRecord::Migration
  def change
    add_column :events, :city, :string
    add_column :events, :vanue_name, :string
  end
end
