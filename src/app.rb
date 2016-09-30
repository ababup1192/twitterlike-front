require 'sinatra'
require 'sinatra/reloader'

# Sinatra Main controller
class MainApp < Sinatra::Base
  configure :development do
    register Sinatra::Reloader
  end
  get '/' do
    # redirect '/login'

    @title = 'Twitterlike'
    @message = 'Hello, Twitterlike'
    @styles = []
    erb :index
  end

  get '/login' do
    @title = 'Twitterlike -Login-'
    @styles = ['login.css']
    erb :login
  end

  post '/login' do
    name = params[:name]
    pass = params[:password]
    if name == 'abc' && pass == 'password'
      redirect '/'
    else
      redirect '/login'
    end
  end
end
