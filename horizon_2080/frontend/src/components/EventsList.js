import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Directory from "./_common/Directory";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import getDate from "./_utils/getDate";
import Divider from "@material-ui/core/Divider";

const styles = (theme) => ({
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
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
    }
});

class EventsList extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.content}>
                <Directory />
                <Divider light />
                <List>
                    <ListItem>
                        <p className={classes.pStyle}>
                            Lucas added sub-target: "get this done" <span className={classes.dateStyle}>22-11-2018</span>
                        </p>
                    </ListItem>
                    <ListItem>
                        <p className={classes.pStyle}>
                            Benson recorded Event "Done! Boss" on sub-target: "get this done" <span className={classes.dateStyle}>22-11-2018</span>
                        </p>
                    </ListItem>
                </List>
            </div>
        );
    }
}

EventsList.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EventsList);
