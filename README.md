# Plant Classifier Frontend
To begin, run `npm install` <br><br>
After the command has finished running, run `npx expo start`. This will provide you with a QR code in the terminal that you can scan with your phone's camera to view the app. <br>
*You must have Expo Go downloaded on your phone for the QR code to work* <br><br>
In order for the analysis to work, you must also have `plant-classifier-backend` running locally and change the `apiUrl` value inside `pages/LiveView.js` and `pages/UploadPhoto.js` to the address given by running `plant-classifier-backend`. The backend github repo can be found [here](https://github.com/hkim1016/plant-classifier-backend)