require 'sinatra'
require 'sinatra/reloader'

# Sinatra Main controller
class MainApp < Sinatra::Base
  configure :development do
    register Sinatra::Reloader
  end
  get '/' do
    @title = 'hello'
    @message = 'Hello, World!'
    erb :index
  end
end
