import React, { Component, Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";

const styles = (theme) => ({
    detailsFieldRoot: {
        padding: theme.spacing.unit * 2
    },
    fieldRoot: {
        maxWidth: "350px"
    },
    fieldInput: {
        width: "130px",
        margin: `4px 8px`
    },
    disabledInput: {
        color: "#212121",
        opacity: 1
    }
});

const inputFields = [
    {
        type: "input",
        label: "details.field.target_name",
        name: "target_name"
    },
    {
        type: "textarea",
        label: "details.field.target_description",
        name: "Description",
        props: {
            multiline: true,
            rows: 4
        }
    },
    {
        type: "input",
        label: "details.field.start_date",
        name: "Start_Date"
    },
    {
        type: "input",
        label: "details.field.expire_date",
        name: "Expire_Date"
    },
    {
        type: "input",
        label: "details.field.created_by",
        name: "Created_By"
    }
];

class DetailsField extends Component {
    state = {
        fields: {
            target_name: "213213",
            Description: "This is a hello world project for horizon 2080",
            Created_By: "Lucas Yang",
            Start_Date: "09/03/2018",
            Expire_Date: "09/19/2018"
        }
    };

    handleChange = (name) => (event) => {
        this.setState({
            ...this.state,
            fields: {
                ...this.state.fields,
                [name]: event.target.value
            }
        });
    };

    Fields = () => {
        const { classes, editContent } = this.props;
        return inputFields.map(({ type, label, name, props }) => (
            <FormattedMessage id={label} key={name}>
                {(msg) => (
                    <TextField
                        className={classes.fieldInput}
                        id="standard-read-only-input"
                        label={msg}
                        disabled={!editContent}
                        value={this.state.fields[name] || ""}
                        onChange={this.handleChange(name)}
                        InputProps={{
                            ...props,
                            disableUnderline: !editContent,
                            classes: {
                                disabled: classes.disabledInput
                            }
                        }}
                    />
                )}
            </FormattedMessage>
        ));
    };

    render() {
        const { classes } = this.props;
        // const { slideState } = this.props.reduxState;
        // const { path } = this.props.match;
        return (
            <div className={classes.detailsFieldRoot}>
                <div className={classes.fieldRoot}>
                    <this.Fields />
                </div>
            </div>
        );
    }
}

DetailsField.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DetailsField);
