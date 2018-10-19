import React, { Component, Fragment } from "react";
import Slide from "@material-ui/core/Slide";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Navigation from "./_common/Navigation";
import EnhancedTable from "./_common/Table";
import { Route } from "react-router-dom";
import classNames from "classnames";
import DetailsContainer from "./_containers/DetailsContainer";

const styles = (theme) => ({
    content: {
        display: "flex",
        width: "100%",
        flexDirection: "column",
        flexGrow: 1,
        flexWrap: "wrap",
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        paddingTop: 0,
        [theme.breakpoints.up("md")]: {
            paddingBottom: 0
        },
        [theme.breakpoints.down("sm")]: {
            // overflow: "scroll",
            flexWrap: "nowrap"
        },
        minWidth: 0 // So the Typography noWrap works
    },
    contentAlt: {
        paddingRight: 0,
        [theme.breakpoints.down("sm")]: {
            paddingRight: theme.spacing.unit * 3
        }
    },
    table: {
        minWidth: 1020
    },
    tableCell: {
        width: "150px"
    },
    tableWrapper: {
        overflowX: "auto"
    },
    toolbar: theme.mixins.toolbar
});

class Performance extends Component {
    state = {};
    addPerformance = () => {
        console.log("add performance");
    };
    editPerformance = () => {
        let { editContent } = this.props.reduxState;
        this.props.toggleEditButton(!editContent);
        console.log("edit performance");
    };

    render() {
        const { classes, history } = this.props;
        const { slideState } = this.props.reduxState;
        const { pathname } = this.props.location;
        let depth = pathname.split("/").filter((value) => value !== "").length;
        // add alt style when in details view
        const contentLayout = depth === 2 ? classNames(classes.content, classes.contentAlt) : classes.content;
        const buttonMethod = depth > 1 ? this.editPerformance : this.addPerformance;
        const buttonIcon = depth > 1 ? "edit" : "add";
        return (
            <Slide direction={slideState} in mountOnEnter unmountOnExit>
                <Fragment>
                    <div className={classes.toolbar} />
                    <div className={contentLayout}>
                        <div className={classes.toolbar} />
                        <Navigation buttonType={buttonIcon} depth={depth} history={history} slideFunc={this.props.slideDirection} buttonMethod={buttonMethod} component="performance" />
                        {depth <= 1 ? <EnhancedTable endpoint="api/horizon_target_group/" {...this.props} /> : <Route path="/performance/:id" render={(props) => <DetailsContainer {...props} />} />}
                    </div>
                </Fragment>
            </Slide>
        );
    }
}

Performance.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Performance);
