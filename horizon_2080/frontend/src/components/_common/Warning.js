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
class Warning extends React.Component {
    state = {
        fields: {}
    };

    submitForm = () => {
        let { deleteProject } = this.props;
        deleteProject();
        // this.props.toggle();
        // axios
        //     .delete(endpoint, fields)
        //     .then((response) => {
        //         // handle success
        //         // if (dest) {
        //         //     this.props.history.push(`${dest}${response.data.id}`);
        //         // }
        //         // if (toggleSnackbar) {
        //         //     this.props.fetchTarget();
        //         //     toggleSnackbar(true, "success", "Submitted!");
        //         // }
        //     })
        //     .catch((error) => {
        //         // handle error
        //         console.log(error);
        //     });
    };

    render() {
        let { open, toggle, classes, title, deleteProject } = this.props;
        return (
            <Dialog disableBackdropClick open={open} onClose={(e) =>toggle(e)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        this.submitForm();
                        toggle(e);
                    }}
                >
                    <DialogContent className={classes.form}>
                        Are you sure you want to do this?
                    </DialogContent>
                    <DialogActions>
                        <FormattedMessage id={"generic.button.cancel"}>
                            {(msg) => (
                                <Button onClick={(e) =>toggle(e)} color="primary">
                                    {msg}
                                </Button>
                            )}
                        </FormattedMessage>
                        <FormattedMessage id={"generic.button.submit"}>
                            {(msg) => (
                                <Button type="submit" color="primary">
                                    {msg}
                                </Button>
                            )}
                        </FormattedMessage>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }
}
export default withStyles(styles)(Warning);
