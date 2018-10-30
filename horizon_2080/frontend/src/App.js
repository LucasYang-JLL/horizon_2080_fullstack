import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Router, Route, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import { MuiThemeProvider } from "@material-ui/core/styles";
import MuiTheme from "./MuiTheme";
import HeaderContainer from "./components/_containers/HeaderContainer";
import PerformanceContainer from "./components/_containers/PerformanceContainer";
import EventsContainer from "./components/_containers/EventsContainer";
import CommentsContainer from "./components/_containers/CommentsContainer";
import ActionsContainer from "./components/_containers/ActionsContainer";
import SettingsContainer from "./components/_containers/SettingsContainer";
import Snackbar from "./components/_common/Snackbar";

const styles = (theme) => ({
    root: {
        flexGrow: 1,
        height: "100%",
        zIndex: 1,
        overflow: "hidden",
        position: "relative",
        display: "flex"
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        minWidth: 0 // So the Typography noWrap works
    },
    toolbar: theme.mixins.toolbar
});

const history = createBrowserHistory();

class App extends Component {
    render() {
        const { classes, toggleSnackbar, snackbarProp } = this.props;
        return (
            <Router history={history}>
                <MuiThemeProvider theme={MuiTheme}>
                    <div className={classes.root}>
                        <HeaderContainer history={history} />
                        <Route exact path="/" render={() => <Redirect push from="/" to="/performance" />} />
                        <Route path="/performance" component={PerformanceContainer} />
                        <Route path="/events" component={EventsContainer} />
                        <Route path="/comments" component={CommentsContainer} />
                        <Route path="/actions" component={ActionsContainer} />
                        <Route path="/settings" component={SettingsContainer} />
                        <Snackbar toggleSnackbar={toggleSnackbar} snackbarProp={snackbarProp} />
                    </div>
                </MuiThemeProvider>
            </Router>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
