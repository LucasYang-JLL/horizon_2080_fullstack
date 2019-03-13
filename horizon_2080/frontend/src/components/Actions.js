import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import ActionsList from "./ActionsList";
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

class Actions extends Component {
    state = {
        emptyRecord: false,
        data: []
    };

    componentDidMount() {
        this.fetchRecentActions();
    }

    fetchRecentActions = () => {
        axios
            .get("/api/fetch_recent_actions/")
            .then((response) => {
                // handle success
                let action = response.data;
                if (response.data.length === 0) {
                    this.setState({
                        emptyRecord: true
                    });
                } else {
                    // get the id of sub-targets that are being viewed the first time
                    let actionsID = action.map(({ action }) => {
                        return action
                            .map(({ viewed, id }) => {
                                if (viewed === false) {
                                    return id;
                                } else return null;
                            })
                            .filter((e) => e !== null);
                    });
                    // flatten the array
                    let viewedActionsID = [].concat.apply([], actionsID);
                    this.setState(
                        {
                            data: action
                        },
                        () => {
                            this.props.updateActionBadgeCount(0);
                            this.updateViewedStatus(viewedActionsID);
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

    updateViewedStatus = (actions) => {
        actions.forEach((id) => {
            axios.put(`/api/update_viewed_action/${id}/`, { viewed: true });
        });
    };

    render() {
        const { classes, history } = this.props;
        const { slideState } = this.props.reduxState;
        return (
            <Slide direction={slideState} in mountOnEnter unmountOnExit>
                <div className={classes.content}>
                    <div className={classes.toolbar} />
                    <FormattedMessage id={"recent.title.actions"}>{(msg) => <h2 style={{ margin: 0 }}>{msg}</h2>}</FormattedMessage>
                    <FormattedMessage id={"recent.text.recentActions"}>
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

Actions.propTypes = {
    classes: PropTypes.object.isRequired
};

const EventListWithLoad = WithLoadingScreen(ActionsList);

export default withStyles(styles)(Actions);
