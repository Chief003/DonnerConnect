# DonorConnect

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/github/workflow/status/<your-github-username>/<your-repo-name>/CI)](https://github.com/<your-github-username>/<your-repo-name>/actions)


## Overview
This project aims to develop a user-friendly web-based platform designed to bridge the gap between needy schools and potential donors. The platform will allow schools to list their specific needs and enable donors to browse and contribute to targeted projects, including both monetary and non-monetary donations. With a focus on transparency and accountability, the platform will include features that allow donors to track how their contributions are utilized by recipient schools, fostering trust and effective communication.
## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Firebase Setup](#firebase-setup)
- [Usage](#usage)
- [License](#license)
- 
## Features
- **User Registration**: New users can sign up.
- **User Login**: Existing users can log in.
- **Password Recovery**: Users can reset their passwords if they forget them.

## Technologies Used
- **React**: Frontend framework.
- **Bootstrap**: Styling and responsive design.
- **Firebase**: Backend services for authentication.
- **HTML/CSS**: Frontend structure and styling.
- **JavaScript**: Client-side logic.

## Installation
1. **Clone the repository**:
    ```sh
    git clone https://github.com/your-username/auth-system.git
    ```
2. **Navigate to the project directory**:
    ```sh
    cd auth-system
    ```
3. **Install dependencies**:
    ```sh
    npm install
    ```

## Firebase Setup
1. **Create a Firebase Project**:
    - Go to the [Firebase Console](https://console.firebase.google.com/).
    - Click "Add project" and follow the instructions to set up your project.

2. **Enable Authentication**:
    - In the Firebase console, go to the Authentication section.
    - Click "Set up sign-in method" and enable Email/Password.

3. **Add Firebase Config to Your Project**:
    - In the Firebase console, go to Project Settings.
    - Under "Your apps", select "Web" and follow the steps to register your app.
    - Copy the Firebase SDK snippet and add it to your project.

## Usage
1. **Start the development server**:
    ```sh
    npm start
    ```
2. **Open your browser** and navigate to `http://localhost:3000` to view the authentication forms.
3. **Register a New User**: Fill in the signup form and submit.
4. **Login**: Use the credentials from the signup to log in.
5. **Password Recovery**: Click on "Forgot Password" and follow the instructions to reset your password.

## License
This project is licensed under the MIT License.
