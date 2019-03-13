import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import ActivityList from "./ActivityList";
import WithLoadingScreen from "./_common/WithLoadingScreen";
import axios from "axios";
import { FormattedMessage } from "react-intl";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const styles = (theme) => ({
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        overflow: "auto",
        minWidth: 0 // So the Typography noWrap works
    },
    toolbar: theme.mixins.toolbar
});

class Activity extends Component {
    state = {
        emptyRecord: false,
        data: []
    };

    componentDidMount() {
        this.fetchRecentSubtargetAndEvent();
    }

    fetchRecentSubtargetAndEvent = () => {
        axios
            .get("/api/fetch_recent_sub_target_and_event/")
            .then((response) => {
                // handle success
                let activity = response.data;
                if (response.data.length === 0) {
                    this.setState({
                        emptyRecord: true
                    });
                } else {
                    // get the sub-targets that are being viewed the first time
                    let subTargets = activity.map(({ sub_target }) => {
                        return sub_target
                            .map(({ viewed, id }) => {
                                if (viewed === false) {
                                    return id;
                                } else return null;
                            })
                            .filter((e) => e !== null);
                    });
                    // get the events that are being viewed the first time
                    let events = activity.map(({ event }) => {
                        return event.map(({ viewed, id }) => {
                            if (viewed === false) {
                                return id;
                            }
                        });
                    });
                    // flatten the array
                    let viewedSubTargets = [].concat.apply([], subTargets);
                    let viewedEvents = [].concat.apply([], events);
                    this.setState(
                        {
                            data: activity
                        },
                        () => {
                            this.props.updateActivityBadgeCount(0);
                            this.updateViewedStatus(viewedSubTargets, viewedEvents);
                        }
                    );
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

    updateViewedStatus = (targets, events) => {
        targets.forEach((id) => {
            axios.put(`/api/update_viewed_sub_target/${id}/`, { viewed: true });
        });
        events.forEach((id) => {
            axios.put(`/api/update_viewed_event/${id}/`, { viewed: true });
        });
    };

    render() {
        const { classes, history } = this.props;
        const { slideState } = this.props.reduxState;
        return (
            <Slide direction={slideState} in mountOnEnter unmountOnExit>
                <div className={classes.content}>
                    <div className={classes.toolbar} />
                    <FormattedMessage id={"recent.title.events"}>{(msg) => <h2 style={{ margin: 0 }}>{msg}</h2>}</FormattedMessage>
                    <FormattedMessage id={"recent.text.recentUpdates"}>
                        {(msg) => {
                            let msgArr = msg.split(",");
                            return <EventListWithLoad msgArr={msgArr} history={history} data={this.state.data} emptyRecord={this.state.emptyRecord} openEventRequest={this.props.openEventRequest} />;
                        }}
                    </FormattedMessage>
                </div>
            </Slide>
        );
    }
}

Activity.propTypes = {
    classes: PropTypes.object.isRequired
};

const EventListWithLoad = WithLoadingScreen(ActivityList);

export default withStyles(styles)(Activity);
