import { ISLOADING, GET_NEWS_LIST } from '../constants/action-types';
import { db, docRef } from '../firebase/init';
import toastr from 'toastr';



export const isLoading = bool => ({
    type: ISLOADING,
    isloading: bool
});

export const getNewsList = news => ({
    type: GET_NEWS_LIST,
    news
});


/**
 * Me trae los datos desde la base de datos, al momento de cargarlos.
 */
export const getNews = () => {
    return (dispatch) => {
        dispatch(isLoading(true));
        let news = [];
        db.collection("news").get().then((snapshot) => {
            snapshot.forEach(function (childSnapshot) {
                let values = childSnapshot.data();
                let childData = {
                    id: childSnapshot.id,
                    imageMain: values.imageMain,
                    link: values.link,
                    longDescription: values.longDescription,
                    shortDescription: values.shortDescription,
                    title: values.title
                };
                news.push(childData);

            })
            dispatch(getNewsList(news));
        });
    }
}


export const addNews = (dataJSON) => {
    return (dispatch) => {
        dispatch(isLoading(true))
        db.collection("news").add({
            date: new Date(),
            imageMain: dataJSON.imageMain,
            link: dataJSON.link,
            longDescription: dataJSON.longDescription,
            shortDescription: dataJSON.shortDescription,
            title: dataJSON.title
        })
            .then(() => {
                toastr.success("Datos almacenados correctamente");
            }).catch((error) => {
                toastr.error(error);
            })
    }
}



export const editNews = (dataJSON, id) => {
    return (dispatch) => {
        dispatch(isLoading(true));
        db.collection("news").doc(id).update({
            imageMain: dataJSON.imageMain,
            link: dataJSON.link,
            longDescription: dataJSON.longDescription,
            shortDescription: dataJSON.shortDescription,
            title: dataJSON.title
        })
            .then(() => { toastr.success("Datos actualizados correctamente") })
            .catch(() => { toastr.error("Error al guardar los datos") })
    }
}