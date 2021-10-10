import { configureStore } from "@reduxjs/toolkit";
import holidaySlice from "../slice/holidaySlice";


const store = configureStore({
    reducer: {
        holidaySlice: holidaySlice,
        
    },
});
export default store;
