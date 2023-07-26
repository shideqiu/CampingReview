# 🏕 Camp Review

Camp Review is a web application that allows users to discover and review campgrounds. This project was built using Node.js, Express, MongoDB, and Bootstrap, with authentication handled by Passport.js. Users can create, edit, and remove campgrounds, as well as review campgrounds. The application also includes user profiles with additional information, the option to edit profiles, and the ability to change password. The application integrates Mapbox to display the locations of the campgrounds on a map, and it uses Cloudinary to store campground images. The database is hosted on MongoDB Atlas, and the server is deployed on Render.

<a href="https://campingreview.onrender.com">
 <p align="center">
  <img src="./camp_review.png"350" alt="Campground"
 </p>
</a>

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication and authorization using Passport.js.
- Create, edit, and remove campgrounds.
- Review campgrounds, with the option to edit or remove the reviews.
- User profiles with additional information (full name and email), and the ability to edit profiles or change password.
- Display campgrounds with average rating.
- Integration with Mapbox to display campground locations on a map.
- Cloudinary integration for storing and managing campground images.

## Technologies

- Node.js
- Express
- MongoDB (Database hosted on MongoDB Atlas)
- EJS (Templating engine)
- Bootstrap (Front-end framework)
- Passport.js (User authentication)
- Render (Server hosting)
- Mapbox (Mapping and location services)
- Cloudinary (Image storage and management)

## Getting Started

To run Camp Review locally on your machine, follow these instructions:

### Prerequisites

- Node.js: Make sure you have Node.js installed on your system.

### Installation

1. Clone this GitHub repository to your local machine or download the ZIP file and extract it.

2. Navigate to the project's root directory.

3. Install the required dependencies by running the following command:

`npm install`

4. Create a `.env` file in the project's root directory and add the necessary environment variables, such as MongoDB connection string and Passport.js secret key.

## Usage

1. Once you have completed the installation and set up the environment variables, start the application by running:

`npm start`

2. The application will be accessible at `http://localhost:3000` in your web browser.

3. Register a new user account or log in using an existing account.

4. Explore campgrounds, add new campgrounds, and leave reviews for campgrounds.

5. Edit your user profile information, add or remove campgrounds from your profile, and change your account password if desired.

## Deploying on Render

To deploy the application on Render, follow these steps:

1. Create an account on Render (https://render.com/) if you don't have one.

2. Set up a new web service on Render and connect it to your GitHub repository.

3. Add the necessary environment variables (e.g., MongoDB connection string, Passport.js secret key, Mapbox API key, Cloudinary configuration) in the Render dashboard.

4. Deploy the application by clicking the "Deploy" button in the Render dashboard.

5. The application will be deployed, and you can access it using the URL provided by Render.

## Contributing

We welcome contributions from the community to enhance Camp Review. If you find any bugs, want to add new features, or improve the documentation, please feel free to open an issue or submit a pull request.

---

We hope that Camp Review will be a useful platform for campers to discover and review campgrounds. Happy camping and exploring! If you have any questions or feedback, don't hesitate to reach out to us. Enjoy your camping adventures!
