import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";

const styles = (theme) => ({
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

class CommentInput extends React.Component {
    render() {
        const { classes, handleInput, inputValue, submit, buttonName } = this.props;
        return (
            <div className={classes.messageInputRoot}>
                <TextField
                    multiline
                    type="text-field"
                    autoFocus
                    fullWidth
                    variant="outlined"
                    className={classes.textField}
                    value={inputValue}
                    onChange={handleInput("textMessage")}
                    margin="normal"
                />
                <Button variant="contained" size="small" className={classes.buttonSmall} onClick={submit}>
                    {buttonName}
                </Button>
            </div>
        );
    }
}

CommentInput.propTypes = {
    handleInput: PropTypes.func.isRequired,
    inputValue: PropTypes.string.isRequired,
    submit: PropTypes.func.isRequired
};

CommentInput.defaultProps = {
    buttonName: "Add"
};

export default withStyles(styles)(CommentInput);
