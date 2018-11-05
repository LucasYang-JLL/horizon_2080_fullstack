import React, { Component, Fragment } from "react";
import Slide from "@material-ui/core/Slide";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Navigation from "./_common/Navigation";
import EnhancedTable from "./_common/Table";
import { Route } from "react-router-dom";
import classNames from "classnames";
import DetailsContainer from "./_containers/DetailsContainer";
import Form from "./_common/Form";
import axios from "axios";

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
        width: "160px"
    },
    tableWrapper: {
        overflowX: "auto"
    },
    toolbar: theme.mixins.toolbar
});

const inputFields = [
    {
        type: "input",
        label: "details.field.target_name",
        name: "name",
        required: true
    },
    {
        type: "input",
        label: "details.field.target_description",
        name: "description",
        required: true,
        props: {
            multiline: true,
            // rows: 4,
            rowsMax: "4"
        }
    },
    {
        type: "date",
        label: "details.field.start_date",
        name: "start_date",
        required: true,
        props: {}
    },
    {
        type: "date",
        label: "details.field.expire_date",
        required: true,
        name: "expire_date"
    },
    {
        type: "checkbox",
        label: "details.field.importance",
        required: true,
        name: "critical_flag"
    }
];

class Performance extends Component {
    state = {
        openForm: false,
        tableData: []
    };

    componentDidMount() {
        this.fetchIndividualTargets();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.reduxState.targetUpdate !== prevProps.reduxState.targetUpdate) {
            this.fetchIndividualTargets();
        }
    }

    fetchIndividualTargets = () => {
        console.log(this.props.match);
        axios
            .get(`/api/horizon_target_individual/${this.props.match.params.id}/`)
            .then((response) => {
                // handle success
                console.log("HI", response);
                this.setState({
                    tableData: response.data
                });
            })
            .catch((error) => {
                // handle error
                console.log(error);
            })
            .then(() => {
                // always executed
            });
    };

    addPerformance = () => {
        this.setState((prevState) => {
            console.log(prevState);
            if (prevState.openForm === true) {
                console.log("hi");
                this.fetchIndividualTargets();
            }
            return {
                openForm: !prevState.openForm
            };
        });
        console.log("add performance");
    };

    render() {
        const { classes, history } = this.props;
        const { slideState } = this.props.reduxState;
        const { pathname } = this.props.location;
        let depth = pathname.split("/").filter((value) => value !== "").length;
        // add alt style when in details view
        const contentLayout = depth === 3 ? classNames(classes.content, classes.contentAlt) : classes.content;
        return (
            <Slide direction={slideState} in mountOnEnter unmountOnExit>
                <Fragment>
                    <div className={classes.toolbar} />
                    <div className={contentLayout}>
                        <div className={classes.toolbar} />
                        <Navigation buttonType={"add"} depth={depth} history={history} slideFunc={this.props.slideDirection} buttonMethod={this.addPerformance} component="performance" />
                        <Fragment>
                            <EnhancedTable data={this.state.tableData} {...this.props} />
                            <Form
                                title="Add New Target"
                                toggleSnackbar={this.props.toggleSnackbar}
                                open={this.state.openForm}
                                toggle={this.addPerformance}
                                inputFields={inputFields}
                                endpoint={`/api/create_horizon_target_individual/${this.props.match.params.id}/`}
                                folder_id={this.props.match.params.id}
                            />
                        </Fragment>
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
