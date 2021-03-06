import React, { Component, Fragment } from "react";
import Slide from "@material-ui/core/Slide";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import classNames from "classnames";
import CommentsContainer from "../_containers/CommentsContainer";
import Navigation from "../_common/Navigation";
import Tabs from "../_common/Tabs";
import DetailsField from "./DetailsField";
import SubtargetField from "./SubtargetField";
import axios from "axios";
import Hidden from "@material-ui/core/Hidden";
import { compose } from "redux";
import WithLoadingScreen from "../_common/WithLoadingScreen";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import toRenderProps from "recompose/toRenderProps";
const WithWidth = toRenderProps(withWidth());

const styles = (theme) => ({
    content: {
        // width: "100%",
        flex: "1 1",
        display: "flex",
        padding: theme.spacing.unit * 3,
        paddingTop: 0,
        minWidth: 0, // So the Typography noWrap works
        overflowX: "hidden",
        flexGrow: 1,
        flexDirection: "column"
    },
    root: {
        alignSelf: "flex-start",
        width: "100%",
        marginTop: theme.spacing.unit * 3,
        height: "70%",
        minHeight: "350px",
        marginRight: "auto",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column"
    },
    // rootMd: {
    //     [theme.breakpoints.down("md")]: {
    //         width: "50%",
    //     }
    // },
    detailsWrapper: {
        display: "flex",
        flex: "1 1 100%"
    },
    rootSm: {
        [theme.breakpoints.down("sm")]: {
            width: "100%"
        },
        [theme.breakpoints.down("xs")]: {
            minHeight: "250px"
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

class Details extends Component {
    state = {
        activeTab: 0,
        data: {
            name: null,
            description: null,
            created_by_id: null,
            start_date: null,
            expire_date: null
        }
    };

    componentDidMount() {
        this.storeTargetData();
    }

    componentWillUnmount() {
        this.props.storeTargetData({}); // clears the store
    }

    storeTargetData = () => {
        axios
            .get(`/api/horizon_target_individual/${this.props.match.params.id}/`)
            .then((response) => {
                // handle success
                this.props.storeTargetData(response.data[0]);
                this.storeProjectData(response.data[0].folder);
            })
            .catch((error) => {
                // handle error
                console.log(error);
            })
            .then(() => {
                // always executed
            });
    };

    storeProjectData = (folder_id) => {
        axios
            .get(`/api/fetch_horizon_folder_by_id/${folder_id}/`)
            .then((response) => {
                // handle success
                this.props.storeProjectData(response.data[0]);
            })
            .catch((error) => {
                // handle error
                console.log(error);
            })
            .then(() => {
                // always executed
            });
    };

    handleTabChange = (event, value) => {
        this.setState({ activeTab: value }, () => {});
    };

    handleChange = (name) => (event) => {
        this.setState({
            ...this.state,
            data: {
                ...this.state.data,
                [name]: event.target.value
            }
        });
    };

    editPerformance = () => {
        let { editContent } = this.props.reduxState;
        this.props.toggleEditButton(!editContent);
    };

    render() {
        const { classes, history } = this.props;
        const { slideState, editContent, target_details_data, targetUpdate } = this.props.reduxState;
        const { pathname } = this.props.location;
        let depth = pathname.split("/").filter((value) => value !== "").length;
        return (
            <Fragment>
                <Slide direction={slideState} in mountOnEnter unmountOnExit>
                    <div className={classes.content}>
                        <div className={classes.toolbar} />
                        <Navigation buttonType={"edit"} depth={depth} history={history} slideFunc={this.props.slideDirection} buttonMethod={this.editPerformance} component="performance" />
                        <Paper className={classNames(classes.root, classes.rootMd, classes.rootSm)}>
                            <WithWidth>
                                {({ width }) => (
                                    <Tabs
                                        hideTab={isWidthUp("sm", width) ? 1 : 2}
                                        activeTab={this.state.activeTab}
                                        handleTabChange={this.handleTabChange}
                                        msgID="tab.details.title"
                                        variant="standard"
                                    />
                                )}
                            </WithWidth>
                            {this.state.activeTab === 0 && (
                                <div className={classes.detailsWrapper}>
                                    <DetailsFieldWithLoad
                                        toggleSnackbar={this.props.toggleSnackbar}
                                        toggleEditButton={this.props.toggleEditButton}
                                        data={target_details_data}
                                        editContent={editContent}
                                        updateTarget={this.props.updateTarget}
                                        targetUpdate={targetUpdate}
                                        handleChange={this.props.handleDataChange}
                                    />
                                    <Hidden xsDown>
                                        <SubtargetField target_id={this.props.match.params.id} OpenEventID={this.props.reduxState.OpenEventID} ResetOpenEvent={this.props.ResetOpenEvent} />
                                    </Hidden>
                                </div>
                            )}
                            {this.state.activeTab === 1 && (
                                <div className={classes.detailsWrapper}>
                                    <SubtargetField target_id={this.props.match.params.id} OpenEventID={this.props.reduxState.OpenEventID} ResetOpenEvent={this.props.ResetOpenEvent} />
                                </div>
                            )}
                        </Paper>
                    </div>
                </Slide>
                <CommentsContainer history={this.props.history} match={this.props.match} location={this.props.location} docked={true} />
            </Fragment>
        );
    }
}

Details.propTypes = {
    classes: PropTypes.object.isRequired,
    endpoint: PropTypes.string.isRequired
};

Details.defaultProps = {
    classes: {},
    endpoint: "/api/horizon_target_individual/"
};

const DetailsFieldWithLoad = WithLoadingScreen(DetailsField);

export default withStyles(styles)(Details);
