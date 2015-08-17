require 'yelp' 
require 'pry'
require 'json'
class YELP

	def self.search(lat1, long1, lat2, long2, activity, radius)
		lat1 = lat1
		long1 = long1
		lat2 = lat2
		long2 = long2
		activity = activity.downcase()
		radius = radius

		#COMPUTE MIDPOINT OF LOCATIONS
		avgLat = (((lat1.to_f)+(lat2.to_f))/2)
		avgLong = (((long1.to_f)+(long2.to_f))/2)

		coords = { latitude: avgLat, longitude: avgLong }
		locale = { lang: 'en' }
		


		#IF ACTIVITY TO SEARCH FOR CONTAINS RESTAURANTS OR FOOD, CHANGE PARAMS
		if ((activity.include? "food") || (activity.include? "restaurant"))
			params = { term: activity, limit: 5, radius_filter: radius, sort: 2, category_filter: 'food,restaurants'}
		#IF ACTIVITY CONTAINS PIZZA, CHANGE PARAMS
		elsif (activity.include? "pizza")
			params = { term: activity, limit: 5, radius_filter: radius, sort: 2, category_filter: 'pizza'}
		#IF ACTIVITY CONTAINS COFFEE, CHANGE PARAMS
		elsif (activity.include? "coffee")
			params = { term: activity, limit: 5, radius_filter: radius, sort: 2, category_filter: 'coffee'}
		#IF ACTIVITY CONTAINS BAR, CHANGE PARAMS
		elsif (activity.include? "bar")
			params = { term: activity, limit: 5, radius_filter: radius, sort: 2, category_filter: 'bars'}
		#IF ACTIVITY CONTAINS PARKS, CHANGE PARAMS
		elsif (activity.include? "park")
			params = { term: activity, limit: 5, radius_filter: radius, sort: 2, category_filter: 'parks'}
		#ELSE, DEFAULT:
		else
			params = { term: activity, limit: 5, radius_filter: radius, sort: 2 }
		end

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
