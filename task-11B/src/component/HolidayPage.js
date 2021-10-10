import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import moment from 'moment';
import { useParams } from "react-router-dom";
import * as Yup from "yup";

import { makeStyles, Typography } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Link from "@material-ui/core/Link";
import { addTodo, readTodo, setHolidays } from '../slice/holidaySlice';
//import {setForID,setHolidays} from '../slice/holidaySlice';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
// import moment from "moment";
import { holidayListSliceState, holidayListSliceId } from "../slice/holidaySlice";
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from "react-router-dom";
import axios from "axios";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { render } from "@testing-library/react";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),

  },
  root: {
    justifyContent: 'center',
    pb: '3'
  },
  inputLabel: {
    paddingLeft: '30%',
  },
  textField: {
    margin: '7'
  }
}))


const defaultProps = {
  bgcolor: 'background.paper',
  m: 1,
  border: 1,
  style: { width: '65rem', height: '35rem' },
};
//type
const type = [

  { title: 'Options' },
  { title: 'Fixed' }
]
//location 
const location = [
  { title: 'All Locations' },
  { title: 'Bettendorf,IA' },
  { title: 'India' }
]

const  HolidayPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const holidays = useSelector(holidayListSliceState);
  const holidaysListSliceId = useSelector(holidayListSliceId);
  let { id, actionType } = useParams();
  console.log("actionType", actionType);
//reading the data
useEffect(() => {
    if (actionType === "view") {
      dispatch(readTodo(id))
    }
}, [id, actionType])


return (
  
    <Box component="div" borderColor="primary.main" {...defaultProps} m={1}>
      <Grid container alignItems="center" spacing={3} style={{ padding: 7 }}>
        <Grid item xs={2} style={{ textAlign: "right" }}>Holiday Id:</Grid>
        <Grid item xs={10} >
          <TextField
            id="full-width-text-field"
            variant="outlined"
            placeholder="#"
            margin="normal"
            //value={values.HolidayId}
            fullWidth
          />
        </Grid>
        <Grid item xs={2} style={{ textAlign: "right" }}>Date:</Grid>
        <Grid item xs={10}>
          <TextField
            id="full-width-text-field"
            variant="outlined"
            type="date"
            defaultValue=""
            //value={values.Date}
            fullwidth
            style={{ width: 850 }}
            InputLabelProps={{
              shrink: true,
            }} />

        </Grid>
        <Grid item xs={2} style={{ textAlign: "right" }}>Location:</Grid>
        <Grid item xs={10} >
          <Autocomplete
            id="combo-box-demo"
            options={location}
            getOptionLabel={(option) => option.title}
            style={{ width: 850 }}
            renderInput={(params) => <TextField {...params}  label="Select" variant="outlined" />}
          />
        </Grid>
        <Grid item xs={2} style={{ textAlign: "right" }}>Holiday Type:</Grid>
        <Grid item xs={10} >
          <Autocomplete
            id="combo-box-demo"
            label="select"
            options={type}
            getOptionLabel={(option) => option.title}
            style={{ width: 850 }}

            renderInput={(params) => <TextField {...params} label="Select" variant="outlined" />}
          />
        </Grid>
        <Grid item xs={2} style={{ textAlign: "right" }}  >Description:</Grid>
        <Grid item xs={10} >
          <TextField
            id="full-width-text-field"
            variant="outlined"
            margin="normal"
            fullWidth
          />


          <Grid container mb="5" >

            <Link>
              {(actionType !== "view") ?
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.root}
                  style={{ margin: '1 auto', display: "flex" }}
                  type="submit"
                  startIcon={<SaveIcon />}
                  //value={values.Description}
                  onClick={() => { history.push("/update/${id}") }}
                >
                  Save
                 </Button> : <div>
                </div>
              }
            </Link>

            <Link>
              {(actionType === "view") ?

                <Button variant="outlined"
                  style={{ margin: '1 auto', display: "flex" }}
                  color="primary"
                  className={classes.root}
                  startIcon={<EditIcon />}
                  onClick={() => { history.push("/update/${id}") }}
                >Switch To Update
                                 </Button> : <div>
                </div>
              }
            </Link>
            <Link>
              {(actionType !== "view") && (actionType !== "create") ?
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.root}
                  startIcon={<DeleteIcon />}
                  href="/"
                >
                  Delete
              </Button> : <div></div>
              }
            </Link>
            <Link>
              {(actionType !== "view") && (actionType !== "create") ?
                <Button variant="outlined"
                  style={{ margin: '1 auto', display: "flex" }}
                  color="primary"
                  startIcon={<VisibilityIcon />}
                  className={classes.root}
                  onClick={() => { history.push("/view/${id}") }}
                >Switch To View
                 </Button>

                : <div>
                </div>
              }
            </Link>
            <Link href="/">
              <Button variant="outlined"
                style={{ margin: '1 auto', display: "flex" }}
                color="primary"
                className={classes.root}
              >Goto:Holidays
             </Button>
            </Link>

          </Grid>
        </Grid>

      </Grid>
      </Box>
  
   ) 
 }


 export default HolidayPage;