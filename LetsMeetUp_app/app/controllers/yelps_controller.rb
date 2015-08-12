class YelpsController < ApplicationController

	def index
		render layout: 'application', text: ''
	end

#THIS IS NOT LEGIT AT ALL 
	def search(lat1, long1, lat2, long2, activity)
		search_results = YELP.search(lat1, long1, lat2, long2, activity)
		#RENDER THE MAP AND LIST VIEWS
	end
end