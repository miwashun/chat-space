Rails.application.routes.draw do
  root  'messages#index'
  root 'groups#index'
  devise_for :users
  get 'messages' => 'messages#index'
  resources :users, only: [:edit, :update]
  resources :groups, only: [:new, :create, :edit, :update]

end
