class UsersController < ApplicationController
  # Run 'authorized' before hitting only '/auto_login' route
  before_action :authorized, only: [:auto_login]

  # Registration route:
  # Creates new user in the db
  def create
    @user = User.create(user_params)
    # p @user.valid?
    # p @user
    # p user_params
    if @user.valid?
      token = encode_token({user_id: @user.id})
      render json: {user: @user, token: token}
    else
      render json: {error: "Invalid username or password"}
    end
  end

  # Log in route:
  # Looks for the user in the db, checking 'username' and 'password'
  # generates a token (if login details are valid)
  def login
    @user = User.find_by(username: params[:username])

    if @user && @user.authenticate(params[:password])
      token = encode_token({user_id: @user.id})
      render json: {user: @user, token: token}
    else
      render json: {error: "Invalid username or password"}
    end
  end

  # Returns the user. Rout is available if authentication is working 
  def auto_login
    render json: @user
  end

  private
  # grabs params from the route 
  def user_params
    params.permit(:username, :password, :email)
  end
end