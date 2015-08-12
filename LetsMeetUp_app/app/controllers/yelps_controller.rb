class YelpsController < ApplicationController

	def index
		render layout: 'application', text: ''
	end

#THIS IS NOT LEGIT AT ALL 
	def search
		longitude = params[:long]
		YELP.search(longitude)
		search_results = YELP.search(params)
		#RENDER THE MAP AND LIST VIEWS
	end
end