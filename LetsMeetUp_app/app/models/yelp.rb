require 'yelp' 
require 'pry'
class YELP

	def self.search(lat1, long1, lat2, long2, activity)
		lat1 = lat1
		long1 = long1
		lat2 = lat2
		long2 = long2
		activity = activity

		#COMPUTE MIDPOINT OF LOCATIONS
		puts lat1
		puts "!!!!!!!!!!!"

		avgLat = (((lat1.to_f)+(lat2.to_f))/2)
		puts avgLat
		avgLong = (((long1.to_f)+(long2.to_f))/2)
		puts avgLong

		coords = { latitude: avgLat, longitude: avgLong }
		params = { term: activity, limit: 5 }
		locale = { lang: 'en' }

		query = Yelp.client.search_by_coordinates(coords, params, locale)
		puts query


		
		binding.pry
		#ALTERNATE OPTION - TEST THIS
		queryJSONPARSE = JSON.parse(query)
		puts queryJSONPARSE

		#ALTERNATE OPTION - TEST THIS
		queryToJSON = query.toJSON()
		puts queryToJSON

	end
end
