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
5. Save the file and run your Angular app
