import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/paper";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { FormControl, IconButton, Typography } from "@material-ui/core";
import cyan from "@material-ui/core/colors/cyan";
import yellow from '@material-ui/core/colors/yellow';
// import white from '@material-ui/core/colors/white';
import { useDispatch } from "react-redux";
import useState from "react";
import { fetchUsers } from "../slice/holidaySlice";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Link from "@material-ui/core/Link";
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
    head: {
        background: "#endregion ",
    },
    table: {
        minwidth: "100%",
    },
    root: {
        marginLeft: theme.spacing(-1),
        marginRight: theme.spacing(-1),
    },
    menuButton: {
        width: "100%",
        color: "white",
        backgroundColor: cyan[400],
        fontFamily: "Arial",
    },
    icon:{
        marginRight: theme.spacing(2),
    }

}));

export default function CustomizedTables() {
    const classes = useStyles();
    const currentYear = moment().format("YYYY");
    const today = parseInt(currentYear);
    //const [year, setYear] = useState([]);
    const dispatch = useDispatch();
     //filter function
    const handleSearch = (event) => {
        const year = event.target.value;
        dispatch(fetchUsers(year));
    };
    let result = [];
    for (let i = 0; i < 5; i++) {
        result[i] = today + i - 2;
    }
   
    return (
        <Box component="div" className={classes.root}>
            <Grid container spacing={1} className={classes.menuButton}>
                <Grid item xs={1}></Grid>
                
                <Grid item>Filter-Year:</Grid>
                <Grid item>
                    <FormControl>
                        <Select
                            onClick={handleSearch}
                            defaultValue={today}
                            style={{
                                paddingLeft: "4px",
                                color: "black",
                                backgroundColor: "white",
                                marginTop: "-3.5px",
                            }}
                        >
                             {result.map((year) => (
                                <MenuItem key={year} value={year}>
                                    {year}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table" size="small">
                    <TableHead>
                        <TableRow>
                        <StyledTableCell style={{width:'14%'}}>
                           <Link href={'/create/0'} >
                            <IconButton>
                            <Typography style={{color:'yellow'}} className={classes.icon}>Action </Typography>
                            <AddCircleOutlineIcon style ={{color:yellow[600]}}/>
                           </IconButton>
                           </Link>
                           </StyledTableCell>
                            <StyledTableCell style={{width:'9%'}}>Date</StyledTableCell>
                            <StyledTableCell style={{width:'12%'}}>Description</StyledTableCell>
                            <StyledTableCell style={{width:'11%'}}>Type</StyledTableCell>
                            <StyledTableCell style={{width:'9%'}}>Location</StyledTableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>
        </Box>
    );
}
