require 'sinatra'
require 'sinatra/reloader'
require 'json'
require 'net/http'
require 'uri'

# Sinatra Main controller
class MainApp < Sinatra::Base
  use Rack::Session::Pool, expire_after: 2_592_000
  configure :development do
    register Sinatra::Reloader
  end

  get '/' do
    id = session[:id]
    token = session[:token]

    response = post_request('users/auth/token', id: id, token: token)
    body = JSON.parse(response.body, symbolize_names: true)
    if response.code.to_i == 200
      @title = 'Twitterlike'
      @message = body.to_s
      @styles = []
      erb :index
    else
      redirect '/login'
    end
  end

  get '/login' do
    @title = 'Twitterlike -Login-'
    @styles = ['login.css']
    erb :login
  end

  post '/login' do
    name = params[:name]
    pass = params[:password]
    if name.empty? == false || pass.empty? == false
      response = post_request('users/auth', name: name, password: pass)
      body = JSON.parse(response.body, symbolize_names: true)
      if response.code.to_i == 200
        session[:id] = body[:id]
        session[:token] = body[:token]
        redirect '/'
      else
        # id & pass 間違い
        redirect '/login'
      end
    else
      # 空
      redirect '/login'
    end
  end

  get '/signup' do
    @title = 'Twitterlike -Sign up-'
    @styles = ['signup.css']
    erb :signup
  end

  post '/signup' do
    session[:signup_err] = nil
    name = params[:name]
    pass = params[:password]
    if name.empty? == false || pass.empty? == false
      response = post_request('users', name: name, password: pass)
      body = JSON.parse(response.body, symbolize_names: true)
      if response.code.to_i == 200
        session[:id] = body[:id]
        session[:token] = body[:token]
        redirect '/'
      else
        redirect 'signup'
      end
    else
      session[:signup_err] = :empty_form
      session[:error_mes] = 'Name or Password is empty.'
      redirect 'signup'
    end
  end

  private def post_request(path, body)
    uri_str = "http://localhost:9393/#{path}"
    uri = URI.parse(uri_str)
    req = Net::HTTP::Post.new(uri.path,
                              'Content-Type' => 'application/json')
    req.body = body.to_json
    Net::HTTP.start(uri.host, uri.port) { |http| http.request(req) }
  end
end
