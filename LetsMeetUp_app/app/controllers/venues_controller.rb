class VenuesController < ApplicationController

	def index
		render layout: 'application', text: ''
	end

#THIS IS NOT LEGIT AT ALL 
	def search(coordinates, params, locale)



		query = JSON.parse(HTTParty.get(Yelp.client.search_by_coordinates(coordinates, params, locale)))
		render json: query
	end
end