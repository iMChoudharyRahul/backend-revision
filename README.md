Project - 01 --> Login and sign up page
step-1 --> Basic Setup of middleware and server 
         ---> Basic Setup for ApiError
         ---> Basic setup for sending Api Response
         ---> Basic Setup for handling Promise (asyncHandler)
step-2 --> Mongodb Connection
step-3 --> (model) User Schema Creation (Define the user schema for MongoDB using Mongoose)
            --> username(string,required,lowercase,unique,trim,index), email(string,required,lowercase,unique,trim), fullName(string,required,index,trim), password(string,required), refreshToken(string), timestamps(boolean), avatar(string, required)
            --> Mongoose Middleware: Pre-save hook to hash the user's password before saving
            --> Mongoose Method: Check if the provided password is correct
            --> Mongoose Method: Generate a refresh token for the use
            --> Mongoose Method: Generate an access token for the user
step-4 --> Writing Apis
     ---> Register new user(Post)--> signup
     ---> login new user ---> login
     ---> logout user  ---> 
     ---> get current user details ---> get
     ---> update user details
     ---> change current password
     ---> Update User Avatar image
     
     
