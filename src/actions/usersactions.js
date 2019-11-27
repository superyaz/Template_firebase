import { ISLOADING, GET_USERS_LIST} from '../constants/action-types';
import { userRef, authRef, db } from '../firebase/init';
import toastr from 'toastr';


export const isLoading = bool => ({
    type: ISLOADING,
    isLoading: bool

});
export const getUserList = users => ({
    type: GET_USERS_LIST,
    users
});

export const getUsers = () => {
    return (dispatch) => {
        dispatch(isLoading(true));
        let users = [];
        db.collection("users").get().then((snapshot) => {
            snapshot.forEach(function (childSnapshot) {
                let values = childSnapshot.data();
                let childData = {
                    id: childSnapshot.id,
                    fullname: values.fullname,
                    email: values.email,
                    phone: values.phone,
                    key: childSnapshot.ref.path,
                    type: values.type
                };
                users.push(childData);
            });
            dispatch(getUserList(users));
        });
    }
}
export const addUser = (user, password) => {
    return (dispatch) => {
        dispatch(isLoading(true));
        authRef
            .createUserWithEmailAndPassword(user.email, password)
            .then((res) => {
                user.id = res.user.uid;
                userRef.push(user, (res) => {
                    toastr.success('user added successfully');
                });
            });
    }
}
export const editUser = (user) => {
    return (dispatch) => {
        dispatch(isLoading(true));
        userRef
            .child(user.key)
            .update(user)
            .catch(error => {
                toastr.error(error.message);
            });
    }
}
export const removeUser = (key, ) => {
    return (dispatch) => {
        dispatch(isLoading(true));
        var data = userRef.equalTo({ key });
    }
}

