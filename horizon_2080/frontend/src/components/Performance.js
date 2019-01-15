import React, { Component, Fragment } from "react";
import Slide from "@material-ui/core/Slide";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Navigation from "./_common/Navigation";
import EnhancedTable from "./_common/Table";
import { Route } from "react-router-dom";
import classNames from "classnames";
import DetailsContainer from "./_containers/DetailsContainer";
import WithLoadingScreen from "./_common/WithLoadingScreen";
import Form from "./_common/Form";
import { FormattedMessage } from "react-intl";
import axios from "axios";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const styles = (theme) => ({
    content: {
        display: "flex",
        // width: "100%",
        flexDirection: "column",
        flexGrow: 1,
        // flexWrap: "wrap",
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
        emptyRecord: false,
        tableData: [],
        folderTitle: ""
    };

    componentDidMount() {
        this.fetchIndividualTargets();
        this.fetchFolderInfo().then((folder_info) => {
            this.setState({
                folderTitle: folder_info.name
            });
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.reduxState.targetUpdate !== prevProps.reduxState.targetUpdate) {
            this.fetchIndividualTargets();
        }
    }

    fetchIndividualTargets = () => {
        axios
            .get(`/api/fetch_horizon_target_individual_by_folder/${this.props.match.params.id}/`)
            .then((response) => {
                // handle success
                if (response.data.length === 0) {
                    this.setState({
                        tableData: response.data,
                        emptyRecord: true
                    });
                } else {
                    this.setState({
                        tableData: response.data
                    });
                }
            })
            .catch((error) => {
                // handle error
                console.log(error);
            })
            .then(() => {
                // update folder item counts
                // console.log(this.state.tableData.length);
                if (this.state.tableData.length === 0) return;
                this.fetchFolderInfo().then((folder_info) => {
                    // console.log(this.state.tableData[0]);
                    const db_total_count = folder_info.total_target;
                    const db_completed_count = folder_info.completed_target;
                    const folder_id = this.state.tableData[0].folder;
                    const total_target = this.state.tableData.length;
                    const completed_target = this.state.tableData.filter(({ progress }) => progress === 100).length;
                    if (db_total_count !== total_target || db_completed_count !== completed_target) {
                        axios
                            .put(`/api/updateTargetCountByFolder/${folder_id}/`, { total_target, completed_target })
                            .then((response) => {
                                // handle success
                            })
                            .catch((error) => {
                                // handle error
                                console.log(error);
                            });
                    }
                });
            });
    };

    fetchFolderInfo = () => {
        return axios
            .get(`/api/fetch_horizon_folder_by_id/${this.props.match.params.id}/`)
            .then((response) => {
                // handle success
                return response.data[0];
            })
            .catch((error) => {
                // handle error
                console.log(error);
            });
    };

    addPerformance = () => {
        this.setState((prevState) => {
            return {
                openForm: !prevState.openForm
            };
        });
    };

    updateFolderTitle = (newTitle) => {
        this.setState({
            folderTitle: newTitle
        });
    }

    render() {
        const { classes, ...otherProps } = this.props;
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
                        <Navigation buttonType={"add"} depth={depth} history={this.props.history} slideFunc={this.props.slideDirection} buttonMethod={this.addPerformance} component="performance" />
                        <Fragment>
                            <TableWithLoad emptyRecord={this.state.emptyRecord} folderTitle={this.state.folderTitle} updateFolderTitle={this.updateFolderTitle} data={this.state.tableData} {...otherProps} />
                            <FormattedMessage id={"target.add.title"}>
                                {(msg) => (
                                    <Form
                                        title={msg}
                                        toggleSnackbar={this.props.toggleSnackbar}
                                        open={this.state.openForm}
                                        toggle={this.addPerformance}
                                        fetchTarget={this.fetchIndividualTargets}
                                        inputFields={inputFields}
                                        endpoint={`/api/create_horizon_target_individual/${this.props.match.params.id}/`}
                                        folder_id={this.props.match.params.id}
                                    />
                                )}
                            </FormattedMessage>
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

const TableWithLoad = WithLoadingScreen(EnhancedTable);

export default withStyles(styles)(Performance);
