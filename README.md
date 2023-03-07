# Workflow - Course Assignment

## Goal

Using the skills and knowledge from this course, improve the quality of a package by establishing helpful workflows that make the development process more efficient.

## Brief

In this exercise we where tasked with improving the quality of an existing application by providing various development workflows as well as a testing strategy.

The following workflows/hooks was required:

1. Project is configured to run Prettier on commit
2. Project is configured to run ESLint on commit
3. Project default branch is protected, code is versioned and branching conventions have been followed.

The following project file changes was required:

1. Project readme file is updated to include new configuration information and workflow status badges
2. Deployed project has been checked for 404 errors
3. Any bugs found have been communicated in the Issues tab

The following features must have been automatically tested with Unit tests:

1. The login function fetches and stores a token in browser storage
2. The logout function clears the token from browser storage

The following features must have been automatically tested with End-to-End tests:

1. The user can log in and access their profile
2. The user cannot submit the login form with invalid credentials and is shown a message
3. The user can log out with the logout button

## Setting Up The Project

1. Clone the repo branch "workflow"

```bash
git clone --branch workflow git@github.com:richiebotteri/social-media-client.git
```

2. Install node dependencies

```bash
npm install
```

3. Build project by running SCSS compiler

```bash
npm run build
```

## Usage Instructions for Environment Variables

1. Open up index.html in the browser using livereload after setting up the project
2. Register an account using "@stud.noroff.no" as email
3. copy and past username, email and password in the .env file
4. find the port you use on your localhost than fill replace the XXXX in this url: "http://localhost:XXXX"
5. Copy and past that url under the LOCAL_HOST env variable.
