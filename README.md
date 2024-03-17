# CafeApp
Welcome to ChillCafé :D

## Set Up
Download XCode from the app store. Go into the XCode 'settings'->'platform,' and make sure that the iOS package is downloaded. From the xCode menu select 'Open Developer Tool' -> 'Simulator.' Then, 'File'->'open simulator'->'iPhone 11.' Once an iOS simulator opens, check that the simulator does not have Expo Go installed. If it does, remove it from the simulator. Leave this simulator open while navigating to the terminal to open the app.

To open the app, in terminal, cd to the CafeApp folder. Type `npm start` and press `i`. It is normal for the expo app to take a while to load. If you are a new user, first register on the app before logging in. Feel free to try out admin and user roles! However if you want to switch roles, be sure to delete the account first, since each email account can only be associated with one role. For example, first register as an admin for 'GHS'. Then verify email. Then log in through the login screen. Feel free to add food items in the edit screen. Before exiting the app, navigate to the profile screen to delete account. Next, register your email as a user and log in to see the user view of the app. Remember to delete your user account if you want to register again as an admin. 

Note: This app was built using expo SDK 46.0.0, which requires using an iOS simulator instead of the expo app installed on a physical iOS device. The app has not been tested on an android simulator.

## Introduction

ChillCafé is a menu app aimed at creating a more seamless experience for users to check the availability and details of food items at an eatery or restaurant. It was created using React Native and Firebase. It was not published to the app store. 

Administrators can create an account for their eatery by choosing to "register as admin." After registration, Firebase will create a data storage space for that organization, and the admin can then add an image and description of food items directly through the app. Administrators can also delete a food item from the menu through the app.

As the user opens the app, they will be taken to a login page, where new users can register or existing users can log in. They will need to select an eatery to join to see their menu. The user authentication process is powered by Firebase. As a user logs in, they will be taken to the home page, or menu screen, where users can scroll through all the food the eatery has to offer. Users can also take a deeper look at each food item by clicking on the image. Here in the food items screen, users can see additional information such as the location this food item is sold at, the tags, calories, and ingredients. Users can search for the food they are interested in ordering by entering in a word and pressing the filter button. Once the user presses the filter, only food items that contain the word in its name, tags, or ingredients will show up. Finally, users can edit their personal information or log out of the app by navigating to the profile screen.

