class YelpsController < ApplicationController
	def search
		#GETTING PARAMS FROM INTERNALSEARCH IN FORMVIEW
		lat1 = params[:lat1]
		long1 = params[:long1]
		lat2 = params[:lat2]
		long2 = params[:long2]
		activity = params[:activity]
		radius = params[:radius]

		search_results = YELP.search(lat1, long1, lat2, long2, activity, radius)
		puts "********************************"
		p search_results.class
		p search_results
		puts "********************************"
		render json: search_results.businesses
		#SENDING TO YELP.RB TO USE GEM, 
		#RETURNS HERE, AND RETURNS JSON TO
		#INTERNALSEARCH IN FORMVIEW --- THEN CALLS
		#MAPVIEW INITIALIZER AND GENERATEMARKERS FXN 
	end

	def midpoint
		lat1 = params[:lat1]
		long1 = params[:long1]
		lat2 = params[:lat2]
		long2 = params[:long2]
		avgLat = (((lat1.to_f)+(lat2.to_f))/2)
		avgLong = (((long1.to_f)+(long2.to_f))/2)
		avgCoords = [avgLat, avgLong]
		render json: avgCoords
	end
end