# Project Creation

- I created the Project using Vite inside a Client Folder, Took me like 5 mins for the Project setup | May 9 | 4:08PM | client

- Installed Chakra UI Library after going through the Documentation and some basic concepts | May 9 | 4:34PM | main.jsx

- Successfully extended the custom themes, colors and color mode themes | May 9 | 5:00PM | theme.js & main.jsx

- Everyhting has done to Get Started | May 9 | 5:01PM

- Installed React-Router-dom, Basic Router setup has done | May 9 | 5:34PM | Userpage.jsx & Postpage.jsx & App.jsx

### Took a Break

- Developed a user header which has name, handle, profilePic, followers, insta link and copy link button | May 9 | 11:00 PM | UserPage.jsx & UserHeader.jsx

## Current Functionality

- Light / Dark themes.
- User will Copy profile URL dynamically 👶.

- Implemented a Tabs Components which has two tabs in Userpage (Threads and Replies) | May 9 | 11:37PM | userActivity.jsx

- Developed Post Component | May 9 | 00:23AM | Post.jsx

### Took a Break

- Extracted some JSX from Post component and created two new components to reuse them | May 10 | 11:27AM | UserActions.jsx & PostInfo.jsx

- Implemented a logic for conversion of large numbers like 92141926 to 92.1M | May 10 | 11:37AM | numberConverter.js

- Developed Comment component | May 10 | 12:10PM | Comment.jsx

- Did some code refactoring | May 10 | 1:13PM | client

### Took a Break

- More than 70% of frontend is completed, so started implementing server side logic | May 10 | 5:30PM | server

- Installed Express, Mongoose, Dotenv, Cookie-parser, bcryptjs, Nodemon, JsonWebToken and done setup for backend | May 10 | 5:44 | package.json & server.js

- Created Server, did basic "Hello from Server" response | May 10 | 6:01PM | server.js

- Created DB in MongoDB cloud | May 10 | 6:10PM | MongoDB.com

- Connected MongoDB and Node with Mongoose | May 10 | 6:15PM | connectDB.js

### Took a Break

- Implemented UserModel and PostModel | May10 | 10:10PM | userModel.js & postModel.js

- Set up Basic Middlewares like express.json(), express.urlencoded(), cookieParser() | May 10 | 10:18PM | server.js

- Implemented user signup functionality with appropriate error handling (only on postman for now) | May 10 | 11:28PM | userController.js

### Took a Break

- Bug fixing and code refactoring on signup route | May 11 | 11:50 AM | userController.js

- Implemented logic generating JWT token and set it to the User Cookies storage, Valid for 10 days | May 11 | 12:12PM | generateJwtAndSetToken.js

- Implemented Login functionality with error handling | May 11 | 12:34PM | userController.js

- Implemented Logout functionality with error handling | May 11 | 12:42PM | userController.js

- Implemented Logic to check the user is authorized/unauthorized | May 11 | 1:02PM | isAuthorized.js

- Implemented Follow and Unfollow functionality with error handling | May 11 | 1:47PM | userController.js

- Refactored the Password hashing logic to its own function to reuse it whenever necessary | May 11 | 2:00PM | hashPassword.js

## Current Functionality for Backend

- Signup (Duplicates Prevented)(Password Hashed)(Set JWT token on Cookies) (New User Creation)
- Login (Set JWT token on Cookies)(User become Authorized)
- Logout (Clear JWT token in Cookies)(User become Unauthorized)
- Follow & Unfollow (Followers & Following List Updation)(Cannot follow our own ID)

### Took a Break

- Implemented Creating a Post functionality with error handling | May 11 | 4:12PM | postController.js

- Implemented Getting a Post functionality with error handling | May 11 | 4:21PM | postController.js

- Implemented Deleting a Post functionality with error handling | May 11 | 4:46PM | postController.js

- Implemented Liking a Post functionality with error handling | May 11 | 5:03PM | postController.js

### Took a Break

- Implemented Replying for a Post functionality with error handling | May 12 | 10:17AM | postController.js

- Implemented Feed functionality with error handling | May 12 | 11:07AM | postController.js
  (If you follow someone and you hit the feeds route, all of their posts will be shown there.)

- Took sometime to refactor the code and made it more readable by adding comments to complex steps | May 12 | 2:40PM | server

## Going to Frontend Again

- So most of the routes, request, response were done, Let's focus on Frontend for sometime | May 13 | 1:17PM | client

- Took Template for signup form from Chakra UI, made necessery changes to let the signup component align with the project style | May 13 | 2:01PM | Signups.jsx

- Integrated React-Hook-Form Library to Signup Component and made robust form handling with prior warnings and visuals without scarificing anything, but there's still room for improvements | May 13 | 2:44PM | Signup.jsx

- Refactored the Signup form took from Chakra UI and made Login Component | May 13 | 2:57PM | Login.jsx

- Configured the Frontend config file to let the frontend connect to the server | May 13 | 3:21PM | vite.config.js

- Error Code 431 (Header fields too large(But it's only 155B)) kicks back request from all possible endpoints. 😫😫

- Successfully connected my Frontend to the Backend. Ahhhhh that was a Real Pain 🤕 | May 13 | 4:13PM | client & server

- Successfully made a POST request form Signup and created a new account, changes reflected on DB, got appropriate Response and JWT token placed on cookies storage. | May 13 | 4:15PM |

- Installed Recoil Library for State Management | May 13 | 4:22PM |

- Implemented AuthScreen State to manage Authorization Screen state to switch Login & Signup component inside AuthPage | May 13 | 4:30PM | AuthScreenAtom.js

- Implemented userAtom state to manage user details and error whenever a user tyr to signup/login | May 13 | 4:37PM | userAtom.js

- Will be updated soon....!
