Rails.application.routes.draw do
  root to: 'application#index'
  get '/yelps/search' => 'yelps#search'
  post '/yelps/midpoint' => 'yelps#midpoint'
end
