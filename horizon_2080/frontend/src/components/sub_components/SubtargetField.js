import React, { Component, Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";
import SaveIcon from "@material-ui/icons/Save";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Form from "../_common/Form";
import Progress from "../_common/Progress";
import axios from "axios";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const styles = (theme) => ({
    SubtargetRoot: {
        display: "flex",
        flex: "1 1 100%",
        borderLeft: "1px solid rgba(0, 0, 0, 0.12)",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    marginTop: {
        marginTop: "auto"
    },
    button: {
        margin: theme.spacing.unit,
        width: "100px"
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
    initialMsg: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "50%"
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
            data: [1],
            openForm: false
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.data !== prevState.fields) {
            return { fields: nextProps.data };
        } else return null;
    }

    toggleForm = () => {
        this.setState((prevState) => {
            console.log(prevState);
            if (prevState.openForm === true) {
                console.log("hi");
                // this.fetchIndividualTargets();
            }
            return {
                openForm: !prevState.openForm
            };
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.SubtargetRoot}>
                {this.state.data.length > 0 ? (
                    <div>
                        <Progress />
                        Progress: 0%
                        <Button variant="contained" size="small" className={classes.button} onClick={this.toggleForm}>
                            <AddIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                            Add
                        </Button>
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

                <Form
                    title="Add Task"
                    toggleSnackbar={this.props.toggleSnackbar}
                    open={this.state.openForm}
                    toggle={this.toggleForm}
                    inputFields={inputFields}
                    endpoint={"api/create_horizon_target_individual/0/"}
                />
            </div>
        );
    }
}

SubtargetField.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SubtargetField);
