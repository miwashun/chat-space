Rails.application.routes.draw do
  root  'messages#index'
  devise_for :users
  get 'messages' => 'messages#index'
  resources :users, only: [:edit, :update]

end
