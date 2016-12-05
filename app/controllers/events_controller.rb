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

end
