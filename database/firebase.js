// database/firebaseDb.js

import * as firebase from 'firebase';

//console.log(process.env.REACT_APP_API_KEY);
//const API_KEY = process.env.REACT_APP_STORE_API_PATH;
const firebaseConfig = {
    apiKey: "AIzaSyDjo0MT4w5Qsuy4j6skgGaW8_60BYB9HVU",
    //apiKey: process.env.REACT_APP_STORE_API_PATH,
   // apiKey: REACT_APP_STORE_API_PATH,
    databaseURL: "https://retail-app-466b5-default-rtdb.firebaseio.com",
    projectId: "retail-app-466b5",
};

firebase.initializeApp(firebaseConfig);


export default firebase;