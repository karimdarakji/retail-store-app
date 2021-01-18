// database/firebaseDb.js

import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDjo0MT4w5Qsuy4j6skgGaW8_60BYB9HVU",
    databaseURL: "https://retail-app-466b5-default-rtdb.firebaseio.com",
    projectId: "retail-app-466b5",
};

firebase.initializeApp(firebaseConfig);

export default firebase;