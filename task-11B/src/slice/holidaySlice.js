import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import moment from "moment";

const currentYear = moment().format("YYYY");
const today = parseInt(currentYear);
//slice
const holidaySlice = createSlice({
    name: "holidaySlice",
    initialState: {
       year:today,
       holidayData: [],
       holidayList:{
           id:"",
           date:"",
           location:"",
           type:"",
           description:"",
           editIntialValue:{},
           isEdit:true
       },
      

     },
    reducers: {
        setYear(state,action){
            state.year = action.payload;
        },
        getHolidays(state, action) {
            state.holidayData = action.payload;
        },
        setHolidays(state,action){
          
            state.holidayData = action.payload;
            state.editInitialValue=action.payload;
        },
        setForId(state,action){
             console.log("action",action)
            state.holidayList =action.payload;
             console.log("state",state.holidayList)
        },

    }
});

export const { getHolidays,setHolidays,setForId} = holidaySlice.actions;


//Actions
export const fetchUsers = (year) => async (dispatch) => {
    
    if (typeof year === "undefined") {
        year = moment().year();
    }
    axios.get(`http://localhost:4000/holiday/year/${year}`).then((res) => {
         dispatch(setHolidays(res.data));
         dispatch(getHolidays(res.data));
        //  dispatch(
        //      setForId({
        //          id:"",
        //          location:"All",
        //          type:"F",
        //          date:"",
        //          description:"",
        //      })
        //  )
       
    });
    
};
//  //post 
 export const addTodo = (holidayData) => async(dispatch) => {
      //console.log("holidayList",holidayList);
    
        axios.post(`http://localhost:4000/holiday`,holidayData).then((res) =>{
        
           dispatch(setHolidays(res.data))
           console.log("create",res.data)
           
        })
    }
        // )}

// //read the data

 export const readTodo = (id )=> async(dispatch) => {
    
            axios.get(`http://localhost:4000/holiday/${id}`).then((res) => {
                 console.log("read",res.data.holidays)
                 
             dispatch(setForId(res.data.holidays))
             

        })  
     } 
    
 //update
 export const updateTodo =(holidayList,id) =>async(dispatch) =>{
     axios.put(`http://localhost:4000/holiday/${id}`,holidayList).then((res) =>{
         dispatch(setForId(res.data))
     })
 } 
 //delete
 export const deleteTodo =(id,year) =>async(dispatch) =>  {
     axios.delete(`http://localhost:4000/holiday/${id}`).then((res) =>{
         dispatch(fetchUsers(res.data))
     })
 }



 export const holidayListSliceState = (state) => state.holidaySlice.holidayData;
 export const holidayListSliceId =(state) =>state.holidaySlice.holidayList;
//   console.log("holidayListId",holidayListSliceState);
export default holidaySlice.reducer;



