class UpdateVenueInformationForEvents < ActiveRecord::Migration
  def change
    rename_column :events, :vanue_name, :venue_name
    remove_column :events, :city, :string
    add_column :events, :venue_location, :string
  end
end
