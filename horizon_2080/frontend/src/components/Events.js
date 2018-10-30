import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Snackbar from "./_common/Snackbar";

const styles = (theme) => ({
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        minWidth: 0 // So the Typography noWrap works
    },
    toolbar: theme.mixins.toolbar
});

class Events extends Component {
    render() {
        const { classes } = this.props;
        const { slideState } = this.props.reduxState;
        return (
            <Slide direction={slideState} in mountOnEnter unmountOnExit>
                <div className={classes.content}>
                    <div className={classes.toolbar} />
                    Events
                </div>
            </Slide>
        );
    }
}

Events.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Events);
