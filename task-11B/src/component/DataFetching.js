import React, { useEffect,useState} from "react";
import { TableRow, Table, TableCell, TableBody, Box, IconButton } from "@material-ui/core";
import { fetchUsers, holidayListSliceState, readTodo } from "../slice/holidaySlice";
import { useSelector } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import moment from "moment";
import { useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import VisibilityIcon from '@material-ui/icons/Visibility';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import EditIcon from '@material-ui/icons/Edit';
 import Link from "@material-ui/core/Link";


const useStyles = makeStyles({
    tableCell: {
        padding: "16px 16px",
    },
});
const RedTextTypography = withStyles({
    root: {
        color: "#ba000d",
    },
})(Typography);

const theme = createTheme({
    typography: {
        fontFamily: "Raleway, Arial",
        fontSize: 16,
    },
    
});
const location = (code) =>{
    let desc=  "All Locations";
  
    switch (code) {
       case "ALL":
           desc ="All Locations"
           break;
        case "IND":
            desc ="India"
            break;  
        case "USA":
           desc ="Bettendorf, IA"
           break;
         }
    return desc;
}
const hType =(code) =>{
  let desc1="Fixed"
      
  switch (code) {
    case "F":
        desc1="Fixed"
        break;
     case "O":
         desc1 ="Options"
         break;     
    }
  return desc1;
}


//fetching the data from the api
function DataFetching() {
    const classes = useStyles();
    
   const holidays = useSelector(holidayListSliceState);

   const [AllHolidays,setHolidays]= useState();
    console.log("AllHolidays",holidays);
    const currentYear = moment().format("YYYY");
    const today = parseInt(currentYear);
    const dispatch = useDispatch();
   
   
     useEffect(() => {
        dispatch(fetchUsers(today));
    }, [today]);

 

     useEffect(()=>{
        setHolidays(holidays);
     },[holidays])
         
    return (
        <ThemeProvider theme={theme}>
            <React.Fragment>
                {holidays && holidays.holidays && holidays.holidays.length > 0 ? (
                    <Table aria-label="simple table" size="small">
           
                        <TableBody>
                        
                            {holidays.holidays.map((holiday) => (
            
                                <TableRow className={classes.tableRow} fontWeight="fontWeightBold" key={holiday.HolidayId}>
                                <TableCell style={{borderBottom: "none"}}>
                               
                                  <Link href={'/view/' + holiday.HolidayId}>
                                  <IconButton  id={holiday.HolidayId} fontSize="small" value={holiday.HolidayId} >
                                  <VisibilityIcon  style={{color:blue[600]}}  />
                                  </IconButton>
                                  </Link>
                                  
                                  <Link href={'/update/' +holiday.HolidayId}>
                                  <IconButton fontSize="small">
                                  <EditIcon style={{color:red[400],borderBottom: "none",minWidth: '50px'}} />
                                  </IconButton>
                                  </Link>

                                </TableCell>
                                
                                    <TableCell
                                        className={classes.tableCell}
                                        style={{
                                            borderBottom: "none",
                                            padding: "1px",
                                            paddingLeft: "1%",
                                            width: "18%",
                                        }}
                                    >
                                        {holiday.Date}
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            borderBottom: "none",
                                            padding: "0px",
                                            paddingLeft: "1%",
                                            width: "22%",
                                        }}
                                    >
                                        {holiday.Description}
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            borderBottom: "none",
                                            padding: "0px",
                                            paddingLeft: "1%",
                                            width: "20%",
                                        }}
                                    >
                                        {" "}
                                        { hType(holiday.type)}
                                    </TableCell>
                                    <TableCell style={{ borderBottom: "none", padding: "1px",paddingRight:'1%' }}>
                                        {" "}
                                        {location(holiday.location)}
                                        
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <Box mt={5} paddingLeft={40}>
                        <RedTextTypography variant="h6">
                            No Records Found for this particular year
                        </RedTextTypography>
                    </Box>
                )}
            </React.Fragment>
          
        </ThemeProvider>
       
    );
}

export default DataFetching;
