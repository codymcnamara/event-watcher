desc 'create a day objects for each event'

task track_price_changes: :environment do

  Event.where(completed: false).each do |event|

    url = "https://api.seatgeek.com/2/events/#{event.seatgeek_id}?client_id=NjEzOTI5MnwxNDc4MzkzNzA0"
    uri =  URI.parse(url)
    raw_body = Net::HTTP.get_response(uri).body
    response = JSON.parse(raw_body)

    if response['archived']
      event.update(completed: true)
      next
    end

    Day.create(
      event_id: event.id,
      listing_count: response['stats']['listing_count'], average_price: response['stats']['average_price'], lowest_price: response['stats']['lowest_price'], highest_price: response['stats']['highest_price'],
    )

  end
end
