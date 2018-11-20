import React from "react";
import PropTypes from "prop-types";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import SingleInput from "../_common/SingleInput";
import EventList from "./SubtargetEventList";
import classNames from "classnames";
import WithLoadingScreen from "../_common/WithLoadingScreen";
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
        maxWidth: 360,
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
        const { data } = this.state;
        axios
            .get(`/api/fetch_event_by_sub_target/${data.id}/`)
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
        const { data } = this.state;
        let endpoint = `/api/create_event_by_sub_target/${data.id}/`;
        const form = {
            name: this.state.eventInput,
            sub_target_id: data.id
        };
        axios
            .post(endpoint, form)
            .then((response) => {
                // handle success
                this.setState((prevState) => {
                    return {
                        ...this.state,
                        eventInput: "",
                        eventList: prevState.eventList.concat([response.data])
                    };
                });
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
        console.log(index);
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
                console.log("HI", response);
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
                    <DialogTitle id="scroll-dialog-title" onClick={this.toggleEditMode}>
                        {data.name}
                    </DialogTitle>
                )}
                <DialogContent>
                    <div className={classes.dialogContentWrapper}>
                        <div>Summarize your encounters for this task:</div>
                        <div className={classes.eventWrapper}>
                            <div className={classes.eventListWrapper}>
                                <EventListWithLoad emptyRecord={this.state.emptyRecord} updateEvent={this.updateEvent} data={eventList} />
                                {!addMode ? (
                                    <Button className={classes.button} fullWidth onClick={this.toggleAddEvent} disableRipple>
                                        Record an event...
                                    </Button>
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
                            <div className={classes.stickerMenu}>Stickers:</div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    {/* <Button onClick={toggleEvent} color="primary">
                        Cancel
                    </Button> */}
                    <Button onClick={toggleEvent} color="primary">
                        Close
                    </Button>
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
