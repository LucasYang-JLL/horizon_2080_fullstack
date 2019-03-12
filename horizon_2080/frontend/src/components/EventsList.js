import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Directory from "./_common/Directory";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListAltIcon from "@material-ui/icons/ListAlt";
import InsertInvitationIcon from "@material-ui/icons/InsertInvitation";
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
    },
    listStyle: {
        alignItems: "flex-start"
    }
});

class EventsList extends Component {
    handleOpenSubtargetRequest = (sub_target_id, target_id) => {
        this.props.openEventRequest(sub_target_id);
        this.props.history.push(`/performance/project/${target_id}`);
    };

    handleOpenTargetRequest = (target_id) => {
        this.props.history.push(`/performance/project/${target_id}`);
    };

    render() {
        const { classes, data, msgArr } = this.props;
        return (
            <div className={classes.content}>
                {data.map(({ sub_target, event, name, folder, id }, index) => {
                    return (
                        <Fragment key={index}>
                            <Directory folder={folder.name} target={name} />
                            <Divider />
                            {sub_target.map(({ name, create_date, created_by_id }) => {
                                return (
                                    <ListItem className={classes.listStyle} key={create_date}>
                                        <ListAltIcon fontSize="small" style={{ marginRight: "8px" }} />
                                        <p className={classes.pStyle}>
                                            {created_by_id.split(".").join(" ")}
                                            {msgArr[0]}
                                            <b>{msgArr[1]}</b>: "
                                            <span className={classes.linkStyle} onClick={() => this.handleOpenTargetRequest(id)}>
                                                {name}
                                            </span>
                                            " <span className={classes.dateStyle}>{getDate(create_date)}</span>
                                        </p>
                                    </ListItem>
                                );
                            })}
                            {event.map(({ name, create_date, created_by_id, target, sub_target }) => {
                                return (
                                    <ListItem className={classes.listStyle} key={create_date}>
                                        <InsertInvitationIcon fontSize="small" style={{ marginRight: "8px" }} />
                                        <p className={classes.pStyle}>
                                            {created_by_id.split(".").join(" ")} {msgArr[2]} <b>{msgArr[3]}</b>: "
                                            <span className={classes.linkStyle} onClick={() => this.handleOpenSubtargetRequest(sub_target, target)}>
                                                {name}
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

EventsList.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EventsList);
