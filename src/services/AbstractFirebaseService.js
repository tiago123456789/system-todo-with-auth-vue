import firebase from "firebase";

class AbstractFirebaseService {

    constructor(name) {
        this._name = name;
        this._firebaseApp = this._initialize();
    }

    _initialize() {
        if (this._firebaseApp != null) {
            return;
        }

        return firebase.initializeApp({
            apiKey: process.env.VUE_APP_APIKEY,
            authDomain: process.env.VUE_APP_AUTH_DOMAIN,
            databaseURL: process.env.VUE_APP_DATABASE_URL,
            projectId: process.env.VUE_APP_PROJECT_ID,
            storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
            messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
            appId: process.env.VUE_APP_APPP_ID
        }, this._name);
    }

    _extractDatas(querySnapshot) {
        const documents = []
        querySnapshot.forEach(function(doc) {
            documents.push({ id: doc.id, ...doc.data() });
        });
        return documents;
    }

    getFirebase() {
        return this._firebaseApp;
    }
}

export default AbstractFirebaseService;