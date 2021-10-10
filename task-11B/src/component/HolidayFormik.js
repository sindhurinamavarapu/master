import React from 'react';
 import { Formik ,Form} from 'formik';
 import HolidayPage from '../component/HolidayPage';
 import {addTodo} from '../slice/holidaySlice';
//import { useDispatch } from 'react-redux';
import { render } from '@testing-library/react';

 const HolidayFormik = () => (
  //const dispatch = useDispatch();
//  }
//  render(
   <div>
     <Formik
       initialValues={{ 
           id:"",
           date:"",
           type:"",
           location:"",
           description:"",
        }}
        
       onSubmit={(values, actions) => {
         //dispatch(addTodo(values))
         console.log("values",values)
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           actions.setSubmitting(false);
         }, 1000);
       }}
     >
       {props => (
         <Form onSubmit={props.handleSubmit}>
         <HolidayPage />
         </Form>
       )}
     </Formik>
   </div>
 );

 export default HolidayFormik;