import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";
import SaveIcon from "@material-ui/icons/Save";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import Form from "../_common/Form";
import Progress from "../_common/Progress";
import Checklist from "../_common/Checklist";
import TextField from "@material-ui/core/TextField";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
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
        textAlign: "left"
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
            textMessage: ""
        };
    }

    componentDidMount() {
        this.fetchSubTarget();
    }
    // static getDerivedStateFromProps(nextProps, prevState) {
    //     if (nextProps.data !== prevState.fields) {
    //         return { fields: nextProps.data };
    //     } else return null;
    // }

    fetchSubTarget = () => {
        axios
            .get(`/api/query_sub_target_individual/${this.props.target_id}/`)
            .then((response) => {
                // handle success
                console.log("HI", response);
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

    updateSubTarget = (id, obj) => {
        axios
            .put(`/api/update_sub_target_individual/${id}/`, obj)
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

    toggleForm = () => {
        this.setState((prevState) => {
            return {
                openForm: !prevState.openForm
            };
        });
    };

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
                this.updateSubTarget(this.state.data[currentIndex].id, this.state.data[currentIndex]);
            }
        );
    };

    handleInput = (name) => (event) => {
        this.setState({
            [name]: event.target.value
        });
    };

    sendForm = () => {
        let endpoint = `/api/create_sub_target_individual/${this.props.target_id}/`;
        const form = {
            completed_flag: false,
            name: this.state.textMessage,
            target_id_individual: this.props.target_id
        };
        axios
            .post(endpoint, form)
            .then((response) => {
                // handle success
                console.log(response);
                this.setState((prevState) => {
                    console.log(prevState);
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

    handleKeypress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const { data } = this.state;
            if (this.state.textMessage) {
                console.log("add task");
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
            console.log("add task");
            this.sendForm();
            // reset text input
            this.setState({
                textMessage: ""
            });
        }
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.SubtargetRoot}>
                {this.state.data.length > 0 ? (
                    <div className={classes.SubtargetContent}>
                        <Progress progress={this.state.data} />
                        {/* Progress: 0% */}
                        <Checklist arr={this.state.data} toggleChecklist={this.toggleChecklist} />
                        {!this.state.openForm ? (
                            <Button className={classes.button} fullWidth onClick={this.toggleForm} disableRipple>
                                Add a task...
                            </Button>
                        ) : (
                            <ClickAwayListener onClickAway={this.toggleForm}>
                                <div className={classes.messageInputRoot}>
                                    <TextField
                                        multiline
                                        type="text-field"
                                        autoFocus
                                        fullWidth
                                        variant="outlined"
                                        className={classes.textField}
                                        value={this.state.textMessage}
                                        onChange={this.handleInput("textMessage")}
                                        onKeyPress={this.handleKeypress}
                                        margin="normal"
                                    />
                                    <Button variant="contained" size="small" className={classes.buttonSmall} onClick={this.addTask}>
                                        Add
                                    </Button>
                                    <IconButton classes={{ label: classes.offsetIcon }} className={classNames(classes.iconButton, classes.rightIcon)} onClick={this.toggleForm}>
                                        <CloseIcon />
                                    </IconButton>
                                </div>
                            </ClickAwayListener>
                        )}
                    </div>
                ) : !this.state.openForm ? (
                    <div className={classes.initialMsg}>
                        You have not made any tasks for this target yet, click to create one
                        <Button variant="contained" size="small" className={classes.button} onClick={this.toggleForm}>
                            <AddIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                            Add
                        </Button>
                    </div>
                ) : (
                    <ClickAwayListener onClickAway={this.toggleForm}>
                        <div className={classes.messageInputRoot}>
                            <TextField
                                multiline
                                type="text-field"
                                autoFocus
                                fullWidth
                                variant="outlined"
                                className={classes.textField}
                                value={this.state.textMessage}
                                onChange={this.handleInput("textMessage")}
                                onKeyPress={this.handleKeypress}
                                margin="normal"
                            />
                            <Button variant="contained" size="small" className={classes.buttonSmall} onClick={this.addTask}>
                                Add
                            </Button>
                            <IconButton classes={{ label: classes.offsetIcon }} className={classNames(classes.iconButton, classes.rightIcon)} onClick={this.toggleForm}>
                                <CloseIcon />
                            </IconButton>
                        </div>
                    </ClickAwayListener>
                )}
            </div>
        );
    }
}

SubtargetField.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SubtargetField);
