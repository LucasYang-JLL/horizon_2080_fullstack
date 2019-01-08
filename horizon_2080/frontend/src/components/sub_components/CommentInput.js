import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { FormattedMessage } from "react-intl";

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
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: "auto",
        position: "sticky",
        bottom: 0,
        background: "#FFFFFF"
    },
    commentToolbar: {
        width: "100%",
        display: "flex",
        backgroundColor: "rgba(0, 0, 0, 0.12)",
        justifyContent: "flex-end"
    },
    overrideOutline: {
        borderTop: "1px solid rgba(0, 0, 0, 0.23)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.23)",
        borderLeft: "none",
        borderRight: "none",
        borderRadius: 0
    }
});

class CommentInput extends React.Component {
    render() {
        const { classes, handleInput, inputValue, submit, buttonName } = this.props;
        return (
            <div className={classes.messageInputRoot}>
                <FormattedMessage id="comment.text.placeholder">
                    {(msg) => (
                        <TextField
                            multiline
                            required
                            rows="2"
                            rowsMax="2"
                            type="text-field"
                            placeholder={msg}
                            fullWidth
                            variant="outlined"
                            className={classes.textField}
                            value={inputValue}
                            onChange={handleInput}
                            InputProps={{
                                classes: {
                                    notchedOutline: classes.overrideOutline
                                }
                            }}
                        />
                    )}
                </FormattedMessage>

                <div className={classes.commentToolbar}>
                    {/* <Button variant="outlined" mini className={classes.buttonSmall} onClick={submit}>
                        {buttonName}
                    </Button> */}
                    <IconButton
                        onClick={() => {
                            console.log("@ some fams");
                        }}
                    >
                        <AlternateEmailIcon fontSize="small" />
                    </IconButton>
                    <IconButton onClick={submit}>
                        <SendIcon fontSize="small" />
                    </IconButton>
                </div>
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
