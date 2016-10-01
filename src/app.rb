require 'sinatra'
require 'sinatra/reloader'
require_relative 'utils/http_helper'

# Sinatra Main controller
class MainApp < Sinatra::Base
  include HttpHelper

  use Rack::Session::Pool, expire_after: 2_592_000
  configure :development do
    register Sinatra::Reloader
  end

  get '/' do
    id_with_token = { id: session[:id], token: session[:token] }

    post_request_to('users/auth/token', id_with_token, 'login') do |body|
      @title = 'Twitterlike'
      @message = body.to_s
      @styles = []
      erb :index
    end
  end

  get '/login' do
    @title = 'Twitterlike -Login-'
    @styles = ['login.css']
    @error = session[:error]

    erb :login
  end

  post '/login' do
    name_with_path = { name: params[:name], password: params[:password] }

    form_error_to(name_with_path, '/login') do
      post_request_to('users/auth', name_with_path, 'login') do |body|
        session[:id] = body[:id]
        session[:token] = body[:token]
        redirect '/'
      end
    end
  end

  get '/signup' do
    @title = 'Twitterlike -Sign up-'
    @styles = ['signup.css']
    @error = session[:error]

    erb :signup
  end

  post '/signup' do
    name_with_path = { name: params[:name], password: params[:password] }

    form_error_to(name_with_path, '/signup') do
      post_request_to('users', name_with_path, 'signup') do |body|
        session[:id] = body[:id]
        session[:token] = body[:token]
        redirect '/'
      end
    end
  end
end
