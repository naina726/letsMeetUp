require 'yelp' 
require 'pry'
require 'json'
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
		params = { term: activity, limit: 5, radius_filter: 400 }
		locale = { lang: 'en' }

		query = Yelp.client.search_by_coordinates(coords, params, locale)
		queryJSON = query.to_json
		# puts "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n\n\n"
		# puts "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n\n\n"
		# puts queryJSON
		return queryJSON
	end
end
