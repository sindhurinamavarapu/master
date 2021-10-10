import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "../component/NavBar";
import Header from "../component/Header";
import DataFetching from "../component/DataFetching";
import HolidayPage from "../component/HolidayPage";
import { Box } from "@material-ui/core";
import HolidayFormik from "../component/HolidayFormik";

const Router = () => (
    <BrowserRouter>
        <Box component="div">
    
            <NavBar />
            <Switch>
                <Route path="/" exact={true}>
                <Header />
                <DataFetching />
                </Route>
                <Route path='/:actionType/:id' component={HolidayFormik} exact={true}></Route>
            </Switch>
        </Box>
    </BrowserRouter>
);
export default Router;
