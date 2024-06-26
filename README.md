# Keycloak Angular Example

![Screenshot 2024-06-26 at 00.38.58](https://i.imgur.com/xbuilhw.png)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Keycloak Integration

1. There should be a running keycloak instance (Keycloak version 22 is used for testing this implementation)
2. Create a client inside the Keycloak server as mentioned in Keycloak Client Info section
3. Provide the config details of the created client as config properties for the keycloak client initialization function (see app.config.ts file)
4. Start the angular app

## Keycloak Client Info

![Screenshot 2024-06-26 at 00.21.42](https://i.imgur.com/Bnl3Jl1.png)

![Screenshot 2024-06-26 at 00.32.34](https://i.imgur.com/F0rpnEq.png)

##### Disable unnecessary redirect URIs and web origins when running on production mode.

* client id : angular-client
* valid redirect url: http://localhost:4200/*
* web origins:  http://localhost:4200
* Authentication flow: Standard Flow (Authorization code grant type)


###### By Default SHA256 based Proof key for code exchange (PKCE) method is enabled

## Functions of the App
##### Authenticated

Check whether the user is already logged into the system. Boolean value is passed to the screen based on that

##### Login

Initiate the login process. (Yousers will be redirected to the Keycloak loging page)

##### Copy Access Token

Copy the access token to the clipboard

##### Parse Access Token

Show the parsed access token in the status panel

##### Token expired in 10 seconds

Check whether the token is going to expire within 10 seconds. Using the keycloakService provided function

this.keycloakService.isTokenExpired(n) - n seconds. if the token is going to expire within n seconds, this will return true

##### Update token (if gonna expire)

This function is also working in a similar way to isTokenExpired method. This function will update the token if it is going to expire within the given number of seconds.

##### Send HTTP Request

Send a request to the given mockbin url. This HTTP request contains the received access token as a bearer token.

##### Logout

Logout the user from the system.

##### Show Assigned Roles

Show all the assigned roles to the user including both realm roles and client roles.

Similarly you can use the function this.keycloakService.isUserInRole('role name') to directly check whetehr a particular user has a specific role assigned.
