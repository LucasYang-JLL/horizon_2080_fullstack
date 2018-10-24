import React, { Component, Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";

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
    }
});

const inputFields = [
    {
        type: "input",
        label: "details.field.target_name",
        name: "name"
    },
    {
        type: "input",
        label: "details.field.target_description",
        name: "description",
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
        props: {}
    },
    {
        type: "date",
        label: "details.field.expire_date",
        name: "expire_date"
    },
    {
        type: "input",
        label: "details.field.created_by",
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
        console.log("hi");
        if (nextProps.data !== prevState.fields) {
            return { fields: nextProps.data };
        } else return null;
    }

    Fields = () => {
        const { classes, editContent } = this.props;
        return inputFields.map(({ type, label, name, props }) => (
            <FormattedMessage id={label} key={name}>
                {(msg) => (
                    <TextField
                        type={type}
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
                            shrink: true,
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
        console.log(this.props);
        console.log(this.state);
        return (
            <div className={classes.detailsFieldRoot}>
                <this.Fields />
            </div>
        );
    }
}

DetailsField.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DetailsField);
