require 'yelp' 
require 'pry'
class YELP

	def self.search(lat1, long1, lat2, long2, activity)
		#COMPUTE MIDPOINT OF LOCATIONS
		
		avgLat = ((lat1+lat2)/2)
		puts avgLat
		avgLong = ((long1+long2)/2)
		puts avgLong

		coords = { latitude: avgLat, longitude: avgLong }
		params = { term: activity, limit: 5 }
		locale = { lang: 'en' }

		binding.pry

		query = Yelp.client.search_by_coordinates(coords, params, locale)
		puts query

		#ALTERNATE OPTION - TEST THIS
		queryJSONPARSE = JSON.parse(query)
		puts queryJSONPARSE

		#ALTERNATE OPTION - TEST THIS
		queryToJSON = query.toJSON()
		puts queryToJSON

	end


end
