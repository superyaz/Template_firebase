import {ISLOADING, GET_NEWS_LIST} from '../constants/action-types';
import { db, userRef, authRef } from '../firebase/init';
import toastr from 'toastr';



export const isLoading = bool=>({
    type:ISLOADING,
    isloading:bool
});

export const getNewsList = news =>({
    type:GET_NEWS_LIST,
    news
});


/**
 * Me trae los datos desde la base de datos, al momento de cargarlos.
 */
export const getNews = ()=>{
    return (dispatch) => {
        dispatch(isLoading(true));
        let news = [];
        db.collection("news").get().then((snapshot)=>{
            snapshot.forEach(function(childSnapshot){
                let values = childSnapshot.data();
                let childData = {
                    id:childSnapshot.id,
                    imageMain:values.imageMain,
                    link:values.link,
                    longDescription:values.longDescription,
                    shortDescription:values.shortDescription,
                    title:values.title
                };
                news.push(childData);
            })
            dispatch(getNewsList(news));
        });
    }
}

// export const addNews = ()=>{
//     return(dispatch)=>{
//         dispatch(isLoading(true))
//         let news[];
//         db.collection("news")
//     }
// }

export const editNews = (news) =>{
    return (dispatch) =>{
        dispatch(isLoading(true));
        userRef
            .child(news.key)
            .update(news)
            .catch(error =>{
                toastr.error(error.message);
            });
            if (userRef){

            }
    }
}