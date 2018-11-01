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
        height: "35px",
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
        flex: "1 1 100%",
        flexWrap: "wrap"
    }
});

const inputFields = [
    {
        type: "input",
        label: "details.field.target_name",
        name: "name",
        required: true
    },
    {
        type: "input",
        label: "details.field.target_description",
        name: "description",
        required: true,
        props: {
            multiline: true,
            // rows: 4,
            rowsMax: "4"
        }
    },
    {
        type: "date",
        label: "details.field.start_date",
        name: "start_date",
        required: true,
        props: {}
    },
    {
        type: "date",
        label: "details.field.expire_date",
        required: true,
        name: "expire_date"
    },
    {
        type: "checkbox",
        label: "details.field.importance",
        required: true,
        name: "critical_flag"
    }
];

class SubtargetField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: props.data,
            data: [{ checked: false, content: 0 }, { checked: false, content: 1 }, { checked: false, content: 2 }, { checked: false, content: 3 }],
            openForm: false,
            checked: [0],
            textMessage: ""
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.data !== prevState.fields) {
            return { fields: nextProps.data };
        } else return null;
    }

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
        newChecked[currentIndex].checked = !data[currentIndex].checked;
        this.setState({
            data: newChecked
        });
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
            let newData = [...data];
            if (this.state.textMessage) {
                console.log("add task");
                newData.push({ checked: false, content: this.state.textMessage });
                this.setState({
                    ...this.state,
                    data: newData,
                    textMessage: ""
                });
            }
        }
    };

    addTask = () => {
        const { data } = this.state;
        let newData = [...data];
        if (this.state.textMessage) {
            console.log("add task");
            newData.push({ checked: false, content: this.state.textMessage });
            this.setState({
                ...this.state,
                data: newData,
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
                        <Checklist checked={this.state.checked} arr={this.state.data} toggleChecklist={this.toggleChecklist} />
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
                ) : (
                    <div className={classes.initialMsg}>
                        You have not made any tasks for this target yet, click to create one
                        <Button variant="contained" size="small" className={classes.button} onClick={this.toggleForm}>
                            <AddIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                            Add
                        </Button>
                    </div>
                )}

                {/* <Form
                    title="Add Task"
                    toggleSnackbar={this.props.toggleSnackbar}
                    open={this.state.openForm}
                    toggle={this.toggleForm}
                    inputFields={inputFields}
                    endpoint={"api/create_horizon_target_individual/0/"}
                /> */}
            </div>
        );
    }
}

SubtargetField.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SubtargetField);
