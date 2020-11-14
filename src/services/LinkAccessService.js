import AbstractFirebaseService from "./AbstractFirebaseService";

class LinkAcessService extends AbstractFirebaseService {

    constructor() {
        super("firestore_link_access");
    }

    getByLink(link) {
        return this.getFirebase()
            .firestore()
            .collection("access_link")
            .where("link", '==', link)
            .get()
            .then(this._extractDatas)
            .then(documents => documents[0]);
    }

    insert(register) {
        return this.getFirebase()
                    .firestore()
                    .collection("access_link")
                    .add(register)
                    .then(doc => doc.id);
    }

   
}

const linkAcessService = new LinkAcessService();
export default linkAcessService;