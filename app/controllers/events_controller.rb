class EventsController < ApplicationController

  def show
    @event = Event.find(params[:id])
    respond_to do |format|
      format.html
      format.json {
        render :json => @event.days
      }
    end
  end

  def index
    @events = Event.all
  end

  def new
    render :new
  end

  def create
    seatgeek_id = event_params[:url].split('/')[-1]
    # @event = Event.new()
    url = "https://api.seatgeek.com/2/events/#{seatgeek_id}?client_id=NjEzOTI5MnwxNDc4MzkzNzA0"
    uri =  URI.parse(url)
    raw_body = Net::HTTP.get_response(uri).body
    response = JSON.parse(raw_body)

    if response['archived'] || response["status"] == "error"
      render :index
    end

    @event = Event.new(
      seatgeek_id: seatgeek_id,
      finished: false,
      title: response['title'],
      date: response['datetime_local'],
      venue_location: response['venue']['display_location'],
      venue_name: response['venue']['name']
    )

    if @event.save
      redirect_to event_url(@event)
    else
      render :index
    end
  end


  private

  def event_params
    params.require(:event).permit(:url)
  end

end
