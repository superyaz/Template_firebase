import {ISLOADING, GET_DAILYREPORTS_LIST} from '../constants/action-types';
import {db} from '../firebase/init';

export const isLoading = bool =>({
    type:ISLOADING,
    isLoading:bool
});

export const getDailyReportsList = dailyReports =>({
    type:GET_DAILYREPORTS_LIST, 
    dailyReports
});

export const getDailyReports = ()=> {
    return (dispatch) => {
        dispatch(isLoading(true));
        let dailyReports = [];
        db.collection("dailyReports").get().then((snapshot)=>{
            snapshot.forEach(function(childSnapshot){
                let values = childSnapshot.data();
                let childData = {
                    id:childSnapshot.id,
                    alp:values.alp,
                    appointments:values.appointments,
                    comments:values.comments,
                    lead:values.lead,
                    presentations:values.presentations,
                    referrals:values.referrals,
                    sales:values.sales,
                    user:values.user.path
                };
                console.log(childData);
                dailyReports.push(childData);
            });
            dispatch(getDailyReportsList(dailyReports));
        });
    }
}