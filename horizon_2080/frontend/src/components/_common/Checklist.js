import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";

const styles = (theme) => ({
    root: {
        width: "100%",
        maxHeight: "300px",
        overflowY: "auto",
        backgroundColor: theme.palette.background.paper
    },
    dense: {
        padding: 0
    },
    iconDense: {
        padding: "5px"
    }
});

class Checklist extends React.Component {
    // state = {
    //     checked: [0]
    // };

    // handleToggle = (value) => () => {
    //     const { checked } = this.state;
    //     const currentIndex = checked.indexOf(value);
    //     const newChecked = [...checked];

    //     if (currentIndex === -1) {
    //         newChecked.push(value);
    //     } else {
    //         newChecked.splice(currentIndex, 1);
    //     }

    //     this.setState({
    //         checked: newChecked
    //     });
    // };

    render() {
        const { classes, arr, checked, toggleChecklist } = this.props;
        return (
            <div className={classes.root}>
                <List>
                    {arr.map(({ checked, content }, index) => {
                        console.log(index);
                        return (
                            <ListItem className={classes.dense} key={content} role={undefined} dense button onClick={toggleChecklist(index)}>
                                <Checkbox className={classes.iconDense} checked={checked} tabIndex={-1} disableRipple />
                                <ListItemText primary={`${content}`} />
                            </ListItem>
                        );
                    })}
                </List>
            </div>
        );
    }
}

Checklist.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Checklist);
