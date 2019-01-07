import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Progress from "../_common/Progress";
import Checklist from "../_common/Checklist";
import SingleInput from "../_common/SingleInput";
import SubtargetEvent from "./SubtargetEvent";
import { FormattedMessage } from "react-intl";
import axios from "axios";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const styles = (theme) => ({
    SubtargetRoot: {
        display: "flex",
        flex: "1 1 100%",
        borderLeft: "1px solid rgba(0, 0, 0, 0.12)",
        flexDirection: "column",
        // justifyContent: "center",
        alignItems: "center",
        padding: theme.spacing.unit * 2
    },
    marginTop: {
        marginTop: "auto"
    },
    button: {
        margin: theme.spacing.unit,
        width: "100%",
        height: "63px",
        textAlign: "left",
        textTransform: "unset"
    },
    buttonSmall: {
        width: "50px",
        height: "35px"
    },
    leftIcon: {
        marginRight: theme.spacing.unit
    },
    rightIcon: {
        marginLeft: theme.spacing.unit
    },
    iconSmall: {
        fontSize: 20
    },
    offsetIcon: {
        height: "12px"
    },
    iconButton: {
        width: "36px",
        height: "36px"
    },
    initialMsg: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "50%"
    },
    SubtargetContent: {
        // display: "flex",
        width: "100%"
    },
    messageInputRoot: {
        display: "flex",
        flexDirection: "row",
        // flex: "1 1 100%",
        flexWrap: "wrap"
    }
});

class SubtargetField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // fields: props.data,
            data: [],
            openForm: false,
            checked: [0],
            textMessage: "",
            editIndex: null,
            openEvent: false,
            modalIndex: null,
            sub_target_id: null,
            selectedSubTarget: null
        };
    }

    componentDidMount() {
        this.fetchSubTarget();
        this.props.ResetOpenEvent();
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.OpenEventID !== null) {
            console.log(nextProps.OpenEventID);
            return {
                openEvent: true,
                sub_target_id: nextProps.OpenEventID
            };
        } else return null;
    }

    fetchSubTarget = () => {
        axios
            .get(`/api/query_sub_target_individual/${this.props.target_id}/`)
            .then((response) => {
                // handle success
                this.setState({
                    data: response.data
                });
            })
            .catch((error) => {
                // handle error
                console.log(error);
            })
            .then(() => {
                // always executed
            });
    };

    updateSubTarget = (obj) => {
        axios
            .put(`/api/update_sub_target_individual/${obj.id}/`, obj)
            .then((response) => {
                // handle success
            })
            .catch((error) => {
                // handle error
                console.log(error);
            })
            .then(() => {
                // always executed
            });
    };

    sendForm = () => {
        let endpoint = `/api/create_sub_target_individual/${this.props.target_id}/`;
        const form = {
            completed_flag: false,
            name: this.state.textMessage,
            target: this.props.target_id
        };
        axios
            .post(endpoint, form)
            .then((response) => {
                // handle success
                this.setState((prevState) => {
                    return {
                        ...this.state,
                        data: prevState.data.concat([response.data])
                    };
                });
            })
            .catch((error) => {
                // handle error
                console.log(error);
            });
    };

    toggleForm = () => {
        this.setState((prevState) => {
            return {
                openForm: !prevState.openForm
            };
        });
    };

    // edit list item
    toggleChecklist = (value) => () => {
        const { data } = this.state;
        const currentIndex = value;
        const newChecked = [...data];
        // toggle true/false
        newChecked[currentIndex].completed_flag = !data[currentIndex].completed_flag;
        this.setState(
            {
                data: newChecked
            },
            () => {
                this.updateSubTarget(this.state.data[currentIndex]);
            }
        );
    };

    editSubTarget = (obj) => {
        const { data, modalIndex } = this.state;
        const currentIndex = modalIndex;
        const newData = [...data];
        newData[currentIndex] = obj;
        if (obj.name !== data[currentIndex].name) {
            this.setState(
                {
                    data: newData
                },
                () => {
                    this.updateSubTarget(this.state.data[currentIndex]);
                }
            );
        }
    };

    updateEventCount = (count) => {
        const { data, modalIndex } = this.state;
        const currentIndex = modalIndex;
        const newData = [...data];
        newData[currentIndex].event_count = count;
        this.setState({
            data: newData
        });
    };

    handleCheckListClick = (index) => () => {
        this.setState(
            {
                modalIndex: index,
                sub_target_id: this.state.data[index].id
            },
            () => {
                this.toggleEvent();
            }
        );
    };

    handleInput = (name) => (event) => {
        this.setState({
            [name]: event.target.value
        });
    };

    handleKeypress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const { data } = this.state;
            if (this.state.textMessage) {
                this.sendForm();
                // reset text input
                this.setState({
                    textMessage: ""
                });
            }
        }
    };

    addTask = () => {
        const { data } = this.state;
        if (this.state.textMessage) {
            this.sendForm();
            // reset text input
            this.setState({
                textMessage: ""
            });
        }
    };

    toggleEvent = () => {
        this.setState((prevState) => {
            return { openEvent: !prevState.openEvent };
        });
    };

    handleEventOpenRequest = () => {};

    render() {
        const { classes, OpenEventID } = this.props;
        return (
            <div className={classes.SubtargetRoot}>
                {this.state.data.length > 0 ? (
                    <div className={classes.SubtargetContent}>
                        <Progress progress={this.state.data} />
                        {/* Progress: 0% */}
                        <Checklist arr={this.state.data} toggleChecklist={this.toggleChecklist} editItem={this.handleCheckListClick} />
                        {!this.state.openForm ? (
                            <FormattedMessage id={"sub_target.button.add"}>
                                {(msg) => (
                                    <Button className={classes.button} fullWidth onClick={this.toggleForm} disableRipple>
                                        {msg}
                                    </Button>
                                )}
                            </FormattedMessage>
                        ) : (
                            <SingleInput handleInput={this.handleInput} handleKeypress={this.handleKeypress} inputValue={this.state.textMessage} toggleForm={this.toggleForm} submit={this.addTask} />
                        )}
                    </div>
                ) : !this.state.openForm ? (
                    <FormattedMessage id={"sub_target.button.add"}>
                        {(msg) => (
                            <Button className={classes.button} fullWidth onClick={this.toggleForm} disableRipple>
                                {msg}
                            </Button>
                        )}
                    </FormattedMessage>
                ) : (
                    <SingleInput handleInput={this.handleInput} handleKeypress={this.handleKeypress} inputValue={this.state.textMessage} toggleForm={this.toggleForm} submit={this.addTask} />
                )}
                <SubtargetEvent
                    target_id={this.props.target_id}
                    sub_target_id={this.state.sub_target_id}
                    updateSubTarget={this.editSubTarget}
                    updateEventCount={this.updateEventCount}
                    openEvent={this.state.openEvent}
                    toggleEvent={this.toggleEvent}
                    data={this.state.data.find(({ id }) => id === this.state.sub_target_id)}
                />
            </div>
        );
    }
}

SubtargetField.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SubtargetField);
