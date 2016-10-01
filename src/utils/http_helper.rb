require 'json'
require 'net/http'
require 'uri'

# HttpHelper Module
module HttpHelper
  def post_request_to(request_path, request_body, error_path)
    session[:error] = nil
    response = HttpHelper.post_request(request_path, request_body)
    body = JSON.parse(response.body, symbolize_names: true)
    if response.code.to_i == 200
      yield(body)
    else
      session[:error] = body[:error]
      redirect error_path
    end
  end

  def form_error_to(name_with_pass, error_path)
    name_define = name_with_pass[:name].empty? == false
    password_define = name_with_pass[:password].empty? == false

    if name_define && password_define
      yield
    else
      session[:error] = 'Name or Password is empty.'
      redirect error_path
    end
  end

  def self.post_request(path, body)
    uri_str = "http://localhost:9393/#{path}"
    uri = URI.parse(uri_str)
    req = Net::HTTP::Post.new(uri.path,
                              'Content-Type' => 'application/json')
    req.body = body.to_json
    Net::HTTP.start(uri.host, uri.port) { |http| http.request(req) }
  end
end
