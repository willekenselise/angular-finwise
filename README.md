# Expense Tracker App : FinWise 

This is a simple expense tracker application that helps you keep track of your expenses. Currently, the app supports authentication.

## Table of Contents

- [Installation](#installation)
- [Firebase Connection](#firebase-connection)
- [Usage](#usage)
- [Implemented Functionality](#implemented-functionality)
    - [Authentication](#authentication)
    - [Profile Page](#profile-page)
    - [Monthly Expenses](#monthly-expenses)
    - [Yearly Graph](#yearly-graph)

## Installation

To install and set up the project, follow these steps:

1. Clone the repository: `git clone https://github.com/willekenselise/angular-finwise.git`
2. Navigate to the project directory: `cd finWise`
3. Install the dependencies: `npm install`

# Firebase Connection

# Firebase Environment Configuration

To connect your Angular application to Firebase, you need to configure the environment file with the necessary Firebase credentials. Follow the steps below to set up the environment file correctly:

1. Create a Firebase project on the [Firebase Console](https://console.firebase.google.com/)
2. Obtain your Firebase project credentials, including the API key, project ID, and other necessary information
3. Create a new file named `environment.ts`and `environement.development.ts` in the `src/environments` directory.
4. Open the `environment.ts` and `environement.development.ts` files and add the following code:

```
export const environment = {
    production: false,
    firebase: {
        //Your firebase config
    }
};
```
5. Save the file and run your Angular ap


## Usage

To use the expense tracker app, follow these steps:

1. Start the development server: `npm start`
2. Open your web browser and navigate to `http://localhost:4200`
3. Sign up or log in to your account
4. Start adding your expenses and managing your budget

## Implemented Functionality

### Authentication

- Sign up and log in to your account

### Profile Page

- View and update your profile information

### Monthly Expenses

- Add, edit, and delete expenses for each month

### Yearly Graph

- Visualize your expenses in a yearly graph