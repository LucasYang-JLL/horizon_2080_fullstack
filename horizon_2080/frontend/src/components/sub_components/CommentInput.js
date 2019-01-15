import React, { Fragment } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
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
        justifyContent: "space-between"
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
        const { classes, handleInput, inputValue, submit, data, userID, setMentionUser, clearMentionUser, mentionUser } = this.props;
        const userList = [...new Set(data.map(({ created_by_id }) => created_by_id))].filter((name) => name !== userID);
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
                    <MentionMenuWithStyle setMentionUser={setMentionUser} clearMentionUser={clearMentionUser} mentionUser={mentionUser} userList={userList} />
                    <IconButton onClick={submit}>
                        <SendIcon fontSize="small" />
                    </IconButton>
                </div>
            </div>
        );
    }
}

const mentionStyles = (theme) => ({
    mentionUserStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    closeButtonStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
});

class MentionMenu extends React.Component {
    state = {
        anchorEl: null
    };

    handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = (user) => {
        console.log(user);
        this.setState({ anchorEl: null });
        if (user !== null) {
            this.props.setMentionUser(user);
        }
    };

    render() {
        const { anchorEl } = this.state;
        const { userList, mentionUser, classes, clearMentionUser } = this.props;
        return (
            <Fragment>
                <div className={classes.mentionUserStyle}>
                    <IconButton onClick={this.handleClick}>
                        <AlternateEmailIcon fontSize="small" />
                    </IconButton>
                    {mentionUser ? (
                        <div className={classes.closeButtonStyle}>
                            {mentionUser.split(".").join(" ")}
                            <CloseIcon onClick={clearMentionUser} style={{ color: "#808080", cursor: "pointer" }} />
                        </div>
                    ) : null}
                </div>
                <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => this.handleClose(null)}>
                    {userList.map((user) => (
                        <MenuItem key={user} onClick={() => this.handleClose(user)}>
                            {user.split(".").join(" ")}
                        </MenuItem>
                    ))}
                </Menu>
            </Fragment>
        );
    }
}

const MentionMenuWithStyle = withStyles(mentionStyles)(MentionMenu);

CommentInput.propTypes = {
    handleInput: PropTypes.func.isRequired,
    inputValue: PropTypes.string.isRequired,
    submit: PropTypes.func.isRequired
};

CommentInput.defaultProps = {
    buttonName: "Add"
};

export default withStyles(styles)(CommentInput);
