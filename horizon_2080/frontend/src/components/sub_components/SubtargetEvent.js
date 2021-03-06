import React from "react";
import PropTypes from "prop-types";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import SingleInput from "../_common/SingleInput";
import EventList from "./SubtargetEventList";
import classNames from "classnames";
import WithLoadingScreen from "../_common/WithLoadingScreen";
import { FormattedMessage } from "react-intl";
import getDate from "../_utils/getDate";
import axios from "axios";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const styles = (theme) => ({
    dialogRoot: {
        width: "100%",
        height: "100%"
    },
    dialogContentWrapper: {
        postition: "relative",
        display: "flex",
        flexDirection: "column"
    },
    eventWrapper: {
        display: "flex"
    },
    eventListWrapper: {
        width: "100%",
        flex: "1 1 100%",
        // maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    },
    sidePadding: {
        paddingLeft: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 3
    },
    bottomPadding: {
        paddingBottom: theme.spacing.unit * 3
    },
    button: {
        margin: `${theme.spacing.unit} 0`,
        width: "100%",
        height: "63px",
        textAlign: "left",
        textTransform: "unset"
    },
    stickerMenu: {
        flex: "1 1 50%",
        height: "250px",
        position: "sticky",
        top: 0,
        paddingLeft: theme.spacing.unit * 3
    },
    subTargetEventTitle: {
        display: "flex",
        alignItems: "center",
        fontStyle: "italic",
        color: "#404040"
    },
    editButtonStyle: {
        display: "flex",
        alignItems: "flex-start"
    },
    overRideIconStyle: {
        padding: "3px",
        margin: "0 3px"
    }
});

class SubtargetEvent extends React.Component {
    state = {
        editMode: false,
        addMode: false,
        inputValue: "",
        eventInput: "",
        data: this.props.data,
        openForm: false,
        emptyRecord: false,
        eventList: []
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.data !== prevState.data) {
            return { data: nextProps.data };
        } else return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.data !== prevProps.data) {
            this.setState({
                ...this.state,
                eventList: [],
                emptyRecord: false
            });
            this.fetchEvent();
        }
    }

    fetchEvent = () => {
        const { sub_target_id } = this.props;
        axios
            .get(`/api/fetch_event_by_sub_target/${sub_target_id}/`)
            .then((response) => {
                // handle success
                if (response.data.length === 0) {
                    this.setState({
                        eventList: response.data,
                        emptyRecord: true
                    });
                } else {
                    this.setState({
                        eventList: response.data,
                        emptyRecord: false
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

    updateEventCount = () => {
        const { sub_target_id } = this.props;
        axios
            .put(`/api/update_event_count/${sub_target_id}`, { event_count: this.state.eventList.length })
            .then((response) => {
                // handle success
                this.props.updateEventCount(this.state.eventList.length);
            })
            .catch((error) => {
                // handle error
                console.log(error);
            })
            .then(() => {
                // always executed
            });
    };

    initComponent = () => {
        const { data } = this.state;
        if (!data) return undefined;
        this.setState({
            inputValue: data.name
        });
    };

    handleUpdateTitle = () => {
        let obj = { ...this.state.data };
        obj.name = this.state.inputValue;
        // the event data object
        this.props.updateSubTarget(obj);
        this.setState(() => ({
            editMode: false
        }));
    };

    handleKeypress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            this.handleUpdateTitle();
        }
    };

    handleEventKeypress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            this.submitEvent();
        }
    };

    handleInput = (name) => (event) => {
        // not using the default name in the SingleInput module
        this.setState({
            inputValue: event.target.value
        });
    };

    handleEventInput = (name) => (event) => {
        // not using the default name in the SingleInput module
        this.setState({
            eventInput: event.target.value
        });
    };

    // open & close editing
    toggleEditMode = () => {
        this.setState((prevState) => ({
            inputValue: this.state.data.name,
            editMode: !prevState.editMode
        }));
    };

    submitEvent = () => {
        const { target_id, sub_target_id } = this.props;
        let endpoint = `/api/create_event_by_sub_target/${sub_target_id}/`;
        const form = {
            name: this.state.eventInput,
            sub_target: sub_target_id,
            target: target_id
        };
        axios
            .post(endpoint, form)
            .then((response) => {
                // handle success
                this.setState(
                    (prevState) => {
                        return {
                            ...this.state,
                            eventInput: "",
                            eventList: prevState.eventList.concat([response.data])
                        };
                    },
                    () => {
                        this.updateEventCount();
                    }
                );
            })
            .catch((error) => {
                // handle error
                console.log(error);
            });
    };

    toggleAddEvent = () => {
        this.setState((prevState) => ({
            inputValue: this.state.data.name,
            addMode: !prevState.addMode
        }));
    };

    updateEvent = (index, value) => {
        // console.log(index);
        if (value === this.state.eventList[index].name) return null; // skip update if the input is the same as previously inputted
        let newEvents = [...this.state.eventList];
        newEvents[index].name = value;
        // the row to update in database
        let obj = newEvents[index];
        // update the state
        this.setState({
            eventList: newEvents
        });
        // update the database
        axios
            .put(`/api/update_event_by_sub_target/${obj.id}/`, obj)
            .then((response) => {
                // handle success
                // console.log("HI", response);
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
        const { classes, fullScreen, openEvent, data, toggleEvent } = this.props;
        let { editMode, addMode, eventList } = this.state;
        if (!data) return null;
        return (
            <Dialog classes={{ paper: classes.dialogRoot }} open={openEvent} fullScreen={fullScreen} onClose={toggleEvent} scroll={"paper"} aria-labelledby="scroll-dialog-title">
                {editMode ? (
                    <div className={classNames(classes.sidePadding, classes.bottomPadding)}>
                        <SingleInput
                            toggleForm={this.toggleEditMode}
                            inputValue={this.state.inputValue}
                            handleInput={this.handleInput}
                            handleKeypress={this.handleKeypress}
                            submit={this.handleUpdateTitle}
                            buttonName="Edit"
                        />
                    </div>
                ) : (
                    <div className={classes.subTargetEventTitle}>
                        <DialogTitle>{data.name}</DialogTitle>
                        <IconButton aria-label="Edit Button" onClick={this.toggleEditMode} classes={{ root: classes.overRideIconStyle }}>
                            <EditIcon />
                        </IconButton>
                        <div style={{ marginRight: "16px", marginTop: "8px", marginLeft: "auto" }}>
                            <span>{getDate(data.create_date)}</span>
                        </div>
                    </div>
                )}
                <DialogContent>
                    <div className={classes.dialogContentWrapper}>
                        <FormattedMessage id={"event.title.description"}>{(msg) => <div>{msg}:</div>}</FormattedMessage>
                        <div className={classes.eventWrapper}>
                            <div className={classes.eventListWrapper}>
                                <EventListWithLoad emptyRecord={this.state.emptyRecord} updateEvent={this.updateEvent} data={eventList} />
                                {!addMode ? (
                                    <FormattedMessage id={"event.button.add"}>
                                        {(msg) => (
                                            <Button className={classes.button} fullWidth onClick={this.toggleAddEvent} disableRipple>
                                                {msg}
                                            </Button>
                                        )}
                                    </FormattedMessage>
                                ) : (
                                    <SingleInput
                                        handleInput={this.handleEventInput}
                                        handleKeypress={this.handleEventKeypress}
                                        inputValue={this.state.eventInput}
                                        toggleForm={this.toggleAddEvent}
                                        submit={this.submitEvent}
                                    />
                                )}
                            </div>
                            {/* <div className={classes.stickerMenu}>Stickers:</div> */}
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    {/* <Button onClick={toggleEvent} color="primary">
                        Cancel
                    </Button> */}

                    <FormattedMessage id={"event.button.close"}>
                        {(msg) => (
                            <Button onClick={toggleEvent} color="primary">
                                {msg}
                            </Button>
                        )}
                    </FormattedMessage>
                </DialogActions>
            </Dialog>
        );
    }
}

SubtargetEvent.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
    openEvent: PropTypes.bool.isRequired,
    toggleEvent: PropTypes.func.isRequired,
    updateSubTarget: PropTypes.func.isRequired
};

const EventListWithLoad = WithLoadingScreen(EventList);

export default compose(
    withStyles(styles),
    withMobileDialog()
)(SubtargetEvent);
