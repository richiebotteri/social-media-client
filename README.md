# Workflow Course Assignment

## Description

The goal with this Workflow CA is to improve the quality of an existing environment by establishing useful workflows that make the development process more efficient.

I have acted as a QA engineer for another project called Social-Media-Client, providing project configuration, workflow tooling and tests.

## Built With
-  HTML
-  SASS
-  JS

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
4. go to js/auth/login.js and add a console.log(profile.accesstoken) in the if statement
```js
if (response.ok) {
    const profile = await response.json()
    // Add it under the fetch statement.
    console.log(profile.accessToken);
}
```
5. Open up index.html in the browser again, than open up the browser console
6. login using your profile credentials
7. check your browser console for generate accesstoken and copy it
8. past the accesstoken in the .env under USER_TOKEN
 




