import AbstractFirebaseService from "./AbstractFirebaseService";

class TodoService extends AbstractFirebaseService {

    constructor() {
        super("firestore");
    }

    getAllByUserId(userId) {
        return this.getFirebase()
            .firestore()
            .collection("todos")
            .where("user_id", '==', userId)
            .get()
            .then(this._extractDatas);
    }

    insert(register) {
        return this.getFirebase()
                    .firestore()
                    .collection("todos")
                    .add(register)
                    .then(doc => doc.id);
    }

    getQtdTodosByUserIdAndType(userId, type) {
        return this.getFirebase()
            .firestore()
            .collection("todos")
            .where("user_id", '==', userId)
            .where("type", "==", type)
            .get()
            .then(this._extractDatas)
            .then(documents => documents.length);
    }

    update(id, datasModified) {
        return this.getFirebase()
        .firestore()
        .collection("todos")
        .doc(id)
        .update(datasModified)
    }

}

const todoService = new TodoService();
export default todoService;