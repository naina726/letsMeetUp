class YelpsController < ApplicationController
	def search
		binding.pry
		#GETTING PARAMS FROM INTERNALSEARCH IN FORMVIEW
		lat1 = params[:lat1]
		long1 = params[:long1]
		lat2 = params[:lat2]
		long2 = params[:long2]
		activity = params[:activity]

		puts "!!!!!!!!!!!!!!!!!!!!!!!!"
		puts lat1
		puts long2 
		puts "!!!!!!!!!!!!!!!!!!!!!!!!"
		search_results = YELP.search(lat1, long1, lat2, long2, activity)
		#SENDING TO YELP.RB TO USE GEM, 
		#RETURNS HERE, AND RETURNS JSON TO
		#INTERNALSEARCH IN FORMVIEW --- THEN CALLS
		#MAPVIEW INITIALIZER AND GENERATEMARKERS FXN 
	end
end