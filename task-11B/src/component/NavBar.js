import React from "react";
import Typography from "@material-ui/core/Typography";
import Home from "@material-ui/icons/Home";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/icons/List";
import BeachAccess from "@material-ui/icons/BeachAccess";
import { makeStyles } from "@material-ui/core/styles";
import Person from "@material-ui/icons/Person";
import { Button } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import AttachMoney from "@material-ui/icons/AttachMoney";
import green from "@material-ui/core/colors/green";
import Menu from "@material-ui/core/Menu";
import Link from "@material-ui/core/Link";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";
import purple from "@material-ui/core/colors/purple";
import BrightnessLow from "@material-ui/icons/BrightnessLow";
import { IconButton } from "@material-ui/core";
import { lightBlue } from "@material-ui/core/colors";
import { MenuItem } from "@material-ui/core";
import { useEffect } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../slice/holidaySlice";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
const useStyles = makeStyles((theme) => ({
    imageIcon: {
        width: 170,
        marginright: "auto",
    },
    icon: {
        marginRight: theme.spacing(0.5),
    },
    Tool: {
        marginLeft: theme.spacing(60),
        paddingLeft: "14%",
    },
    underline: {
        borderBottom: "0px",
        "&:hover": {
            borderBottom: "0px ",
        },
        root: {
            paddingRight: theme.spacing(1),
        },
    },
}));

const NavBar = () => {
    const classes = useStyles();
    const currentYear = moment().format("YYYY");
    const today = parseInt(currentYear);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchUsers(today));
    }, [today]);
    return (
        <Box component="div">
            <Toolbar className={classes.icon}>
            <Link>
            <img className={classes.imageIcon} src="./blue.svg" alt="quadyster" />
                </Link>

                <Link>
                    <IconButton>
                        <Home style={{ color: blue[500] }} className={classes.icon} />
                        <Typography>ClockTime</Typography>
                    </IconButton>
                </Link>
                <Link>
                    <IconButton>
                        <List style={{ color: green[500] }} className={classes.icon} />
                        <Typography>TimeLog</Typography>
                    </IconButton>
                </Link>
                <Link href="/">
                    <IconButton>
                        <BeachAccess style={{ color: red[500] }} className={classes.icon} />
                        <Typography>Holiday</Typography>
                    </IconButton>
                </Link>
                <Link>
                    <IconButton>
                        <AttachMoney style={{ color: red[500] }} />
                        <Typography>Time Summary</Typography>
                    </IconButton>
                </Link>
                <Link>
                    <IconButton>
                        <BrightnessLow style={{ color: lightBlue[500] }} className={classes.icon} />
                        <Typography>Settings</Typography>
                    </IconButton>
                </Link>
                <Box component="span">
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        <Person style={{ color: purple[400] }} className={classes.Tool} />
                        <ArrowDropDownIcon />
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                        transformOrigin={{ vertical: "top", horizontal: "right" }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </Box>
    );
};
export default NavBar;
       