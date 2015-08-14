require 'yelp' 
require 'pry'
require 'json'
class YELP

	def self.search(lat1, long1, lat2, long2, activity, radius)
		lat1 = lat1
		long1 = long1
		lat2 = lat2
		long2 = long2
		activity = activity
		radius = radius

		#COMPUTE MIDPOINT OF LOCATIONS
		avgLat = (((lat1.to_f)+(lat2.to_f))/2)
		avgLong = (((long1.to_f)+(long2.to_f))/2)

		coords = { latitude: avgLat, longitude: avgLong }
		params = { term: activity, limit: 5, radius_filter: radius, sort: 2 }
		locale = { lang: 'en' }

		query = Yelp.client.search_by_coordinates(coords, params, locale)
		if (query.total < 5)
			params[:radius_filter] = 600
			query = Yelp.client.search_by_coordinates(coords, params, locale)
		end 

		if (query.total < 5)
			params[:radius_filter] = 1200
			query = Yelp.client.search_by_coordinates(coords, params, locale)
		end 

		if (query.total == 0)
			p "NOTHING FOUND"
		end
		
		return query
		
	end
end
