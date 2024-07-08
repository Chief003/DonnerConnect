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
  
## Features
- **User Registration**: New users can sign up.
- **User Login**: Existing users can log in.
- **Password Recovery**: Users can reset their passwords if they forget them.

## Technologies Used
- **[React](https://reactjs.org/)**: A JavaScript library for building user interfaces.
- **[Firebase](https://firebase.google.com/)**: A platform developed by Google for creating mobile and web applications.
- **[React Router](https://reactrouter.com/)**: A collection of navigational components that compose declaratively with your application.
- **[Bootstrap](https://getbootstrap.com/)**: A front-end framework for developing responsive and mobile-first websites.
- **[React-Bootstrap](https://react-bootstrap.github.io/)**: The most popular front-end framework rebuilt for React.
- **[Axios](https://axios-http.com/)**: A promise-based HTTP client for the browser and Node.js.
- **[dotenv](https://www.npmjs.com/package/dotenv)**: A zero-dependency module that loads environment variables from a `.env` file into `process.env`.



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
    npm install firebase
    ```
    ```sh
    npm install bootstrap
    ```
    ```sh
    npm install react-bootstrap bootstrap
    ```
    ```sh
    npm install react-scripts
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



## Project Structure

```plaintext
.
├── User-Auth
├── donorconnect-backend
├── node_modules
│   ├── .bin
│   ├── accepts
│   ├── array-flatten
│   ├── bcryptjs
│   ├── bignumber.js
│   ├── body-parser
│   ├── buffer-equal-constant-time
│   ├── bytes
│   ├── call-bind
│   ├── content-disposition
│   ├── content-type
│   ├── cookie-signature
│   ├── cookie
│   ├── core-util-is
│   ├── cors
│   ├── debug
│   ├── define-data-property
│   ├── depd
│   ├── destroy
│   ├── ecdsa-sig-formatter
│   ├── ee-first
│   ├── encodeurl
│   ├── es-define-property
│   ├── es-errors
│   ├── escape-html
│   ├── etag
│   ├── express
│   ├── finalhandler
│   ├── forwarded
│   ├── fresh
│   ├── function-bind
│   ├── get-intrinsic
│   ├── gopd
│   ├── has-property-descriptors
│   ├── has-proto
│   ├── has-symbols
│   ├── hasown
│   ├── http-errors
│   ├── iconv-lite
│   ├── inherits
│   ├── ipaddr.js
│   ├── isarray
│   ├── jsonwebtoken
│   ├── jwa
│   ├── jws
│   ├── lodash.includes
│   ├── lodash.isboolean
│   ├── lodash.isinteger
│   ├── lodash.isnumber
│   ├── lodash.isplainobject
│   ├── lodash.isstring
│   ├── lodash.once
│   ├── media-typer
│   ├── merge-descriptors
│   ├── methods
│   ├── mime-db
│   ├── mime-types
│   ├── mime
│   ├── ms
│   ├── mysql
│   ├── negotiator
│   ├── object-assign
│   ├── object-inspect
│   ├── on-finished
│   ├── parseurl
│   ├── path-to-regexp
│   ├── process-nextick-args
│   ├── proxy-addr
│   ├── qs
│   ├── range-parser
│   ├── raw-body
│   ├── readable-stream
│   ├── safe-buffer
│   ├── safer-buffer
│   ├── semver
│   ├── send
│   ├── serve-static
│   ├── set-function-length
│   ├── setprototypeof
│   ├── side-channel
│   ├── sqlstring
│   ├── statuses
│   ├── string_decoder
│   ├── toidentifier
│   ├── type-is
│   ├── unpipe
│   ├── util-deprecate
│   ├── utils-merge
│   ├── vary
├── package-lock.json
├── routes
├── package-lock.json
├── package.json
├── server.js
├── node_modules
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   ├── robots.txt
├── src
│   ├── components
│   │   ├── AboutUs.js
│   │   ├── Account.js
│   │   ├── AccountDetailsForm.js
│   │   ├── AccountInfo.js
│   │   ├── BlogSection.js
│   │   ├── Footer.js
│   │   ├── ForgotPassword.js
│   │   ├── Header.js
│   │   ├── HeroSection.js
│   │   ├── Home.js
│   │   ├── LockScreen.js
│   │   ├── Login.js
│   │   ├── Mpesa.js
│   │   ├── PaymentService.js
│   │   ├── ProfileDetails.js
│   │   ├── ProfileHeader.js
│   │   ├── ProtectedRoute.js
│   │   ├── Signup.js
│   │   ├── Testimonials.js
│   │   ├── VerifyEmail.js
│   │   ├── innerResetPassword.js
│   │   ├── test.js
│   │   ├── userNotification.js
│   ├── context
│   │   ├── UserAuthContext.js
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── firebase.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── reportWebVitals.js
│   ├── setupTests.js
├── README.md
├── package-lock.json
├── package.json
├── LICENSE.md

