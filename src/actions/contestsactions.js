import {ISLOADING,GET_CONTEST_LIST } from '../constants/action-types';
import {db} from '../firebase/init';

export const isLoading = bool =>({
    type:ISLOADING,
    isLoading:bool
});

export const getContestList = contests =>({
    type:GET_CONTEST_LIST,
    contests
});

export const getContests = () =>{
    return (dispatch) => {
        dispatch(isLoading(true));
        let contests = [];
        db.collection("contests").get().then((snapshot)=>{
            snapshot.forEach(function(childSnapshot){
                let values = childSnapshot.data();
                let childData = {
                    id:childSnapshot.id,
                    imageMain:values.imageMain,
                    images:values.images,
                    link:values.link,
                    longDescription:values.longDescription,
                    shortDescription:values.shortDescription,
                    title:values.title
                };
                contests.push(childData);
            });
            dispatch(getContestList(contests));
        });
    }
}