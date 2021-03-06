import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Directory from "./_common/Directory";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import Badge from "@material-ui/core/Badge";
import getDate from "./_utils/getDate";
import Divider from "@material-ui/core/Divider";

const styles = (theme) => ({
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: `12px ${theme.spacing.unit * 3}px`,
        minWidth: 0 // So the Typography noWrap works
    },
    toolbar: theme.mixins.toolbar,
    pStyle: {
        margin: 0,
        marginLeft: "16px",
        color: "#404040"
    },
    dateStyle: {
        color: "#202020",
        fontStyle: "italic"
    },
    linkStyle: {
        color: "#0000EE",
        textDecoration: "underline",
        cursor: "pointer"
    }
});

class CommentsList extends Component {
    handleOpenTargetRequest = (target_id) => {
        this.props.history.push(`/performance/project/${target_id}`);
    };

    render() {
        const { classes, data, msgArr } = this.props;
        return (
            <div className={classes.content}>
                {data.map(({ comment, name, folder, id }, index) => {
                    return (
                        <Fragment key={index}>
                            <Directory folder={folder.name} target={name} />
                            <Divider />
                            {comment.map(({ message, create_date, created_by_id, viewed }) => {
                                return (
                                    <ListItem key={create_date}>
                                        <Badge color="secondary" badgeContent={viewed ? 0 : "new"}>
                                            <ChatBubbleOutlineIcon fontSize="small" style={{ marginRight: "8px" }} />
                                        </Badge>
                                        <p className={classes.pStyle}>
                                            {created_by_id} {msgArr[0]} <b>{msgArr[1]}</b>: "
                                            <span className={classes.linkStyle} onClick={() => this.handleOpenTargetRequest(id)}>
                                                {message}
                                            </span>
                                            " <span className={classes.dateStyle}>{getDate(create_date)}</span>
                                        </p>
                                    </ListItem>
                                );
                            })}
                        </Fragment>
                    );
                })}
            </div>
        );
    }
}

CommentsList.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CommentsList);
