require 'yelp' 
require 'pry'
class YELP

	def self.search(lat1, long1, lat2, long2, activity)
		#COMPUTE MIDPOINT OF LOCATIONS
		avgLat = (lat1+lat2)/2
		p avgLat
		avgLong = (long1+long2)/2
		p avgLong
		coords = { latitude: avgLat, longitude: avgLong }
		binding.pry

		params = {
			term: "activity"
		}


		query = JSON.parse(HTTParty.get(Yelp.client.search_by_coordinates(coords, params, locale)))
	end


end



