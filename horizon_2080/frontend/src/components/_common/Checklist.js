import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import EventNoteIcon from "@material-ui/icons/EventNote";
import Checkbox from "@material-ui/core/Checkbox";

const styles = (theme) => ({
    root: {
        width: "100%",
        maxHeight: "300px",
        marginTop: theme.spacing.unit,
        overflowY: "auto",
        backgroundColor: theme.palette.background.paper
    },
    dense: {
        padding: 0
    },
    iconDense: {
        padding: "5px"
    },
    eventIcon: {
        color: "#808080",
        fontSize: "14px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: theme.spacing.unit
    }
});

class Checklist extends React.Component {
    render() {
        const { classes, arr, toggleChecklist, editItem } = this.props;
        // console.log(arr);
        return (
            <div className={classes.root}>
                <List>
                    {arr.map((obj, index) => (
                        <ListItem className={classes.dense} key={index} role={undefined} dense button>
                            <Checkbox onClick={toggleChecklist(index)} className={classes.iconDense} checked={obj.completed_flag} tabIndex={-1} disableRipple />
                            <ListItemText onClick={editItem(index)} primary={`${obj.name}`} />
                            <div className={classes.eventIcon} onClick={editItem(index)}>
                                <span>{obj.event_count > 0 ? obj.event_count : null}</span>
                                <EventNoteIcon />
                            </div>
                        </ListItem>
                    ))}
                </List>
            </div>
        );
    }
}

Checklist.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Checklist);
