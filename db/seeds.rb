# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)



# Event.create(seatgeek_id: "3558422", title: "Coldplay", finished: false, date: "2017-10-05T02:00:00")

listing_count = 1000
average_price = 100
lowest_price = 80
highest_price = 120

20.times do |i|

  Day.create(
    event_id: 5,
    listing_count: listing_count -= 5,
    average_price: average_price -= 1,
    lowest_price: lowest_price -= 1,
    highest_price: highest_price += 3,
    date: (Time.now.utc + i.days).to_datetime
  )

end
