import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Snackbar from "./_common/Snackbar";
import EventsList from "./EventsList";
import WithLoadingScreen from "./_common/WithLoadingScreen";
import axios from "axios";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const styles = (theme) => ({
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        minWidth: 0 // So the Typography noWrap works
    },
    toolbar: theme.mixins.toolbar
});

class Events extends Component {
    state = {
        emptyRecord: false,
        data: []
    };

    componentDidMount() {
        this.fetchRecentSubtargetAndEvent();
    }

    fetchRecentSubtargetAndEvent = () => {
        axios
            .get("/api/fetch_sub_target_and_event_limit_10/")
            .then((response) => {
                // handle success
                console.log(response.data);
                // handle success
                if (response.data.length === 0) {
                    this.setState({
                        emptyRecord: true
                    });
                } else {
                    this.setState({
                        data: response.data
                    });
                }
            })
            .catch((error) => {
                // handle error
                console.log(error);
            })
            .then(() => {
                // always executed
            });
    };

    render() {
        const { classes, history } = this.props;
        const { slideState } = this.props.reduxState;
        return (
            <Slide direction={slideState} in mountOnEnter unmountOnExit>
                <div className={classes.content}>
                    <div className={classes.toolbar} />
                    <h2 style={{ margin: 0 }}>Recent Updates</h2>
                    <EventListWithLoad history={history} data={this.state.data} emptyRecord={this.state.emptyRecord} openEventRequest={this.props.openEventRequest} />
                </div>
            </Slide>
        );
    }
}

Events.propTypes = {
    classes: PropTypes.object.isRequired
};

const EventListWithLoad = WithLoadingScreen(EventsList);

export default withStyles(styles)(Events);
