import {ISLOADING, GET_NEWS_LIST} from '../constants/action-types';
import { db } from '../firebase/init';


export const isloading = bool=>({
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
        dispatch(isloading(true));
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

