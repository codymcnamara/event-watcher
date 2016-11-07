class AddFinishedAndUrlToEvents < ActiveRecord::Migration
  def change
    add_column :events, :finished, :boolean
    add_column :events, :url, :string
  end
end
