require 'json'
require 'net/http'
require 'uri'

# HttpHelper Module
module HttpHelper
  def post_request_to(request_path, request_body, error_path)
    response = HttpHelper.post_request(request_path, request_body)
    if response.code.to_i == 200
      body = JSON.parse(response.body, symbolize_names: true)
      yield(body)
    else
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
