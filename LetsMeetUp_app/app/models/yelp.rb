require 'yelp' 
class YELP

	def self.search(lat1, long1, lat2, long2, activity)
		#COMPUTE MIDPOINT OF LOCATIONS
		avgLat = (lat1+lat2)/2
		avgLong = (long1+long2)/2
		coords = { latitude: avgLat, longitude: avgLong }


		params = {
			term: "activity"
		}


		query = JSON.parse(HTTParty.get(Yelp.client.search_by_coordinates(coords, params, locale)))
	end


end



