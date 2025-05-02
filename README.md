## Purpose

UI and API automation examples for Playwright test framework using testcases and apis defined at https://automationexercise.com/ incorporating  
1. Page Object Model  
2. Faker for fake dynamic data  
3. Eslint for linting  
4. Prettier for formatting

## Getting the Latest Code

Using the terminal navigate to the folder you would like the project to reside and then do a `git clone https://github.com/druoid/playwright-automation-example.git`

## Setting Up the Environment

1. In a terminal install NVM (Node version manager) with `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash`
2. Restart terminal, then install Node.js by running the following command  
`nvm install node`       # latest version  
3. Verify npm is installed by running the following command  
`npm -v`   # Should return the npm version

## Running the Tests

1. Open the project in the IDE of your choice
2. In the terminal run `npm install` which does the following -  
    Installs all the dependencies listed in the dependencies and devDependencies sections of package.json.  
    Creates or updates the node_modules/ folder (where packages are stored).  
    Creates or updates package-lock.json (which locks exact versions for reproducibility).

4. To run the tests in the browser run the following commands
`npx playwright test` or `npm test`   
5. To run the tests headless run the following command  
`npx playwright test --headed=false`
Or headless using a specific browser `npx playwright test --project=chromium --headless`  
Or to run a specific test headlessly `npx playwright test path/to/your/test.spec.ts --headless`
6. To run tests in debug mode run the following commands
`npx playwright test --debug`


## Additional Details

Additional configured commands  
`npm run lint` runs the lint script as defined in the package.json  
`npm run format` runs the format script as defined in the package json which keeps code consistently styled leveraging prettier.  
`npm test` runs playwright tests   

