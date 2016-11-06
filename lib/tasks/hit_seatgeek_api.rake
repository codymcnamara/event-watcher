desc 'hit seatgeek api'

task hit_seatgeek_api: :environment do

  # https://seatgeek.com/account/develop
  client_id = 'NjEzOTI5MnwxNDc4MzkzNzA0'
  secret = 'mMCDGXMM9gk5UBjvrNxAqI7TRXR4pYBmqJKLFD9_'

  url = 'https://api.seatgeek.com/2/events/3525271?client_id=NjEzOTI5MnwxNDc4MzkzNzA0'
  uri =  URI.parse(url)
  raw_body = Net::HTTP.get_response(uri).body
  response = JSON.parse(raw_body)

  p response['archived']
end
