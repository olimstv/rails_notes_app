class ApplicationController < ActionController::API
  # Run 'authorized' before hitting any of the routes of the controller
  before_action :authorized

  # Encodes the user's token using JWT
  def encode_token(payload)
    JWT.encode(payload, 'yourSecret')
  end

  # Returns the header of the request
  def auth_header
    request.headers['Authorization']
  end

  # Checks if there is an 'auth_header':
  # => parses it for the token 
  # => decodes the token using JWT
  def decoded_token
    if auth_header
      token = auth_header.split(' ')[1]
      begin
        JWT.decode(token, 'yourSecret', true, algorithm: 'HS256')
      rescue JWT::DecodeError
        nil
      end
    end
  end

  # If 'decoded_token' function returns nil:
  # => returns false
  # If 'decoded_token' function returns a value (not nil):
  # => takes 'user_id' and looks for the user in the database and assign the user to the property @user
  def logged_in_user
    if decoded_token
      user_id = decoded_token[0]['user_id']
      @user = User.find_by(id: user_id)
    end
  end 

# Returns true of false, based on wether 'loged_in_user' function returns 'true' of 'false'
  def logged_in?
    !!logged_in_user
  end
  
  # If the status of the response is 'unauthorized' => render 'Please log in' message.
  # Unless 'logged_in' function returns 'true'
  def authorized
    render json: {message: 'Please log in'}, status: :unauthorized unless logged_in?
  end
end
