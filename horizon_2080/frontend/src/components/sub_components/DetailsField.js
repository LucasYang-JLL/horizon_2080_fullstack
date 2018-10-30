import React, { Component, Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import axios from "axios";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const styles = (theme) => ({
    detailsFieldRoot: {
        display: "flex",
        padding: theme.spacing.unit * 2,
        flex: 1,
        maxWidth: "350px",
        flexDirection: "column"
    },
    // fieldRoot: {

    //     flex: 1
    // },
    fieldInput: {
        // width: "130px",
        margin: `4px 8px`
    },
    disabledInput: {
        color: "#212121",
        opacity: 1
    },
    spacer: {
        flex: 1
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
            rows: 4,
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
        type: "input",
        label: "details.field.created_by",
        required: true,
        name: "created_by_id"
    }
];

class DetailsField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: props.data
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.data !== prevState.fields) {
            return { fields: nextProps.data };
        } else return null;
    }

    submitForm = () => {
        let { editContent, data, toggleSnackbar } = this.props;
        this.props.toggleEditButton(!editContent);
        let endpoint = `/api/update_horizon_target_individual/${data.id}/`;
        axios
            .put(endpoint, data)
            .then((response) => {
                // handle success
                console.log(response);
                toggleSnackbar(true, "success", "Saved!");
            })
            .catch((error) => {
                // handle error
                console.log(error);
            });
    };

    Fields = () => {
        const { classes, editContent } = this.props;
        return inputFields.map(({ type, label, name, required, props }) => (
            <FormattedMessage id={label} key={name}>
                {(msg) => (
                    <TextField
                        type={type}
                        required={required}
                        className={classNames(classes.fieldInput, name === "start_date" ? classes.marginTop : null)}
                        id="standard-read-only-input"
                        label={msg}
                        disabled={!editContent}
                        value={this.state.fields[name] || ""}
                        onChange={(e) => this.props.handleChange(name, e.target.value)}
                        InputProps={{
                            ...props,
                            disableUnderline: !editContent,
                            classes: {
                                disabled: classes.disabledInput
                            }
                        }}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                )}
            </FormattedMessage>
        ));
    };

    render() {
        const { classes } = this.props;
        return (
            <form
                className={classes.detailsFieldRoot}
                onSubmit={(e) => {
                    e.preventDefault();
                    this.submitForm();
                    // this.handleClose();
                }}
            >
                <this.Fields />
                {this.props.editContent ? (
                    <Button type="submit" variant="contained" size="small" className={classes.button}>
                        <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                        Save
                    </Button>
                ) : null}
            </form>
        );
    }
}

DetailsField.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DetailsField);
