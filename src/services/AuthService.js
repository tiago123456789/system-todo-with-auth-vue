import AbstractFirebaseService from "./AbstractFirebaseService";

class AuthService extends AbstractFirebaseService {

    constructor() {
        super();
    }

    authenticate(credential) {
        return new Promise((resolve, reject) => {
            this.getFirebase()
                .auth()
                .signInWithEmailAndPassword(
                    credential.getUsername(),
                    credential.getPassword()
                )
                .then(resolve)
                .catch(reject);
        });
    }


    resetPassword(email) {
        return new Promise((resolve, reject) => {
            this.getFirebase()
                .auth()
                .sendPasswordResetEmail(email)
                .then(resolve)
                .catch(reject);
        });
    }

    listenIfUserAuthenticate(callback) {
        this.getFirebase()
            .auth()
            .onAuthStateChanged(callback);
    }

    isAuthenticated() {
       return this.getFirebase().auth().currentUser != null;
    }

    logout() {
        this.getFirebase().auth().signOut();
    }

}

const authService = new AuthService();
export default authService;