Rails.application.routes.draw do
  root to: 'application#index'
  post '/yelps/search' => 'yelps#search'

end
