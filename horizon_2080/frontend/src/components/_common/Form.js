import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FormattedMessage } from "react-intl";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import axios from "axios";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

/**
 * @param {Array} inputFields ({type, label, name, required, props})
 * @param {Boolean} open - open/close form
 * @param {function} toggle - toggle open/close state
 * @param {String} endpoint - api link to post data
 */

const styles = (theme) => ({
    form: {
        display: "flex",
        flexDirection: "column"
    },
    formRow: {
        marginBottom: "16px"
    }
});
class Form extends React.Component {
    state = {
        open: this.props.open,
        fields: {}
    };

    componentDidMount() {
        const fieldObj = {};
        this.props.inputFields.forEach(({ name }) => {
            fieldObj[name] = null;
        });
        this.setState({
            fields: fieldObj
        });
    }

    handleChange = (name, value) => {
        console.log(name, value);
        this.setState({
            ...this.state,
            fields: {
                ...this.state.fields,
                [name]: value
            }
        });
    };

    submitForm = () => {
        let { toggleSnackbar, endpoint, dest, folder_id } = this.props;
        let fields = Object.assign(this.state.fields);
        if (folder_id) {
            fields.folder_id = folder_id;
        }
        axios
            .post(endpoint, fields)
            .then((response) => {
                // handle success
                console.log(response);
                if (dest) {
                    this.props.history.push(`${dest}${response.data.id}`);
                }
                if (toggleSnackbar) {
                    toggleSnackbar(true, "success", "Submitted!");
                }
                this.props.toggle();
            })
            .catch((error) => {
                // handle error
                console.log(error);
            });
    };

    render() {
        let { inputFields, open, toggle, classes, title } = this.props;
        return (
            <Dialog disableBackdropClick open={open} onClose={toggle} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        this.submitForm();
                        // this.handleClose();
                    }}
                >
                    <DialogContent className={classes.form}>
                        {inputFields.map(({ type, label, name, required, props, noLabel }) => (
                            <FormattedMessage id={label} key={name}>
                                {(msg) => {
                                    switch (type) {
                                        case "checkbox":
                                            return (
                                                <FormControlLabel
                                                    control={<Checkbox checked={this.state.fields[name] || ""} onChange={(e) => this.handleChange(name, e.target.checked)} value={name} />}
                                                    label={msg}
                                                />
                                            );
                                        default:
                                            return (
                                                <TextField
                                                    className={classes.formRow}
                                                    type={type}
                                                    required={required}
                                                    label={noLabel ? "" : msg}
                                                    value={this.state.fields[name] || ""}
                                                    onChange={(e) => this.handleChange(name, e.target.value)}
                                                    InputProps={{
                                                        ...props
                                                    }}
                                                    InputLabelProps={{
                                                        shrink: true
                                                    }}
                                                />
                                            );
                                    }
                                }}
                            </FormattedMessage>
                        ))}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={toggle} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }
}
export default withStyles(styles)(Form);
