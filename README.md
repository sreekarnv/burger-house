# Burger house 
Burger house is a fast-food e-commerce site similar to mcdonalds or burger king which sells burgers.
This website allows you to choose burgers from a menu or you are free to make your own burger with the given ingredients.
To place an order you must be logged in.

# First steps
    1. cd into both frontend and server folders 
    2. npm install to install all dependencies
    3. npm run dev in the server folder to run server in localhost (both react and express run on port 4000)
    4. Production ready app is hosted on https://burger-house-sreekar.herokuapp.com/


# For task 2
    1. I have added user account (email) verification upon user registration or resend that registration incase you have missed that email. 
    2. Collecting user location using Browser's Geo Location API when the user registers.
    3. A map (using Mapbox API) has been added in customer dashboard. Where they can track their order
    4. The map shows store location, user location, route between two locations and updates location of mock delivery driver.
    5. A button has been added so as to update the location of mock delivery driver.


# Home Page
![](preview-images/home-1.jpg)
![](preview-images/home-2.PNG)

# Make your own Burger
You are allowed to make your own burger if don't prefer the burgers offered in the menu.
![](preview-images/make-your-burger.PNG)

There is also a dashboard for both customers and the Administrator.
The customer can keep the track of his orders or cancel his order.

# Admin Dashboard
![](preview-images/Admin-dashboard.PNG)
The Admin has the privilege to:
1. Manage Orders. Mark certain customer order as delivered or pending.
2. Manage Menu. Create a new burger for the menu and update existings burgers.
3. Manage Users. (Can only make the customer an admin but cannot change the customer's details but is allowed to delete a customer).  

# Technologies Used
This website was built using ReactJs for the frontend and ExpressJs and mongoDB for the backend

This website is a desktop-first-approach website.
The styling for this website was done without using any css frameworks.
SCSS (css preprocessor) was used instead of regular css so as to maintain cleaner css code.

# credentials 
    Admin:  email: admin@email.com
            Pass: Pass123#

    user : email: user1@email.com (You can create your own account)
            Pass: Pass123#
