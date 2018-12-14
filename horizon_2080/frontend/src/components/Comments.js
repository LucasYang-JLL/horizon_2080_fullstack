import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import compose from "recompose/compose";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import classNames from "classnames";
import Tabs from "./_common/Tabs";
import TabsContainer from "./_containers/TabsContainer";
import Slide from "@material-ui/core/Slide";
import CommentsList from "./CommentsList";
import WithLoadingScreen from "./_common/WithLoadingScreen";
import CommentsField from "./sub_components/CommentsField";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import ClearIcon from "@material-ui/icons/Clear";
import ForumIcon from "@material-ui/icons/Forum";
import axios from "axios";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const styles = (theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        minWidth: 0 // So the Typography noWrap works
    },
    dockedRoot: {
        // position: "absolute",
        // right: 0,
        width: "30%",
        whiteSpace: "normal",
        height: "100%",
        alignSelf: "flex-end",
        overflow: "auto",
        display: "flex",
        flexDirection: "column"
        // marginLeft: theme.spacing.unit * 3
    },
    dockedRootMd: {
        [theme.breakpoints.down("sm")]: {
            overflow: "hidden",
            // width: "100%",
            // height: "200px",
            // minHeight: "200px",
            // position: "relative",
            // margin: "20px auto"
            display: "none"
        }
    },
    dockedBottomRoot: {
        position: "absolute",
        bottom: theme.spacing.unit * 3,
        right: theme.spacing.unit * 3
    },
    toolbar: theme.mixins.toolbar,
    toolbarMd: {
        [theme.breakpoints.down("sm")]: {
            display: "none"
        }
    }
});

class Comments extends Component {
    state = {
        activeTab: 0,
        data: [],
        emptyRecord: false,
    };

    componentDidMount() {
        this.fetchRecentSubtargetAndEvent();
    }

    handleTabChange = (event, value) => {
        this.setState({ activeTab: value }, () => {
            // console.log(this.state.activeTab);
        });
    };

    fetchRecentSubtargetAndEvent = () => {
        axios
            .get("/api/fetch_recent_comments/")
            .then((response) => {
                // handle success
                console.log(response.data);
                // handle success
                if (response.data.length === 0) {
                    this.setState({
                        emptyRecord: true
                    });
                } else {
                    this.setState({
                        data: response.data
                    });
                }
            })
            .catch((error) => {
                // handle error
                console.log(error);
            })
            .then(() => {
                // always executed
            });
    };

    render() {
        const { classes, docked, history, match } = this.props;
        const { slideState } = this.props.reduxState;
        const { pathname } = this.props.location;
        let depth = pathname.split("/").filter((value) => value !== "").length;
        return docked ? (
            isWidthUp("md", this.props.width) ? (
                <DockedLeft history={history} match={match} classes={classes} handleTabChange={this.handleTabChange} activeTab={this.state.activeTab} />
            ) : (
                <DockedBottom history={history} match={match} classes={classes} handleTabChange={this.handleTabChange} activeTab={this.state.activeTab} />
            )
        ) : (
            <Slide direction={slideState} in mountOnEnter unmountOnExit>
                <div className={classes.root}>
                    <div className={classes.toolbar} />
                    <h2 style={{ margin: 0 }}>Recent Comments</h2>
                    <CommentsListWithLoad history={history} data={this.state.data} emptyRecord={this.state.emptyRecord} />
                </div>
            </Slide>
        );
    }
}

Comments.propTypes = {
    classes: PropTypes.object.isRequired,
    docked: PropTypes.bool.isRequired
};
Comments.defaultProps = {
    docked: false,
    classes: {}
};

const CommentsListWithLoad = WithLoadingScreen(CommentsList);

class DockedLeft extends Component {
    render() {
        let { classes, handleTabChange, activeTab, history, match } = this.props;
        return (
            <Slide direction={"left"} in mountOnEnter unmountOnExit>
                <Paper className={classNames(classes.dockedRoot, classes.dockedRootMd)}>
                    <div className={classNames(classes.toolbar, classes.toolbarMd)} />
                    <Tabs activeTab={activeTab} handleTabChange={handleTabChange} msgID="tab.comments.title" />
                    {activeTab === 0 && <CommentsField history={history} match={match} />}
                    {activeTab === 1 && "Notes"}
                </Paper>
            </Slide>
        );
    }
}

class DockedBottom extends Component {
    state = {
        isCommentActive: false
    };

    toggleComment = () => {
        this.setState((prevState) => ({
            isCommentActive: !prevState.isCommentActive
        }));
    };

    render() {
        const { classes, handleTabChange, activeTab, history, match } = this.props;
        return (
            <div className={classes.dockedBottomRoot}>
                <IconButton className={classes.button} aria-label="Delete" onClick={this.toggleComment}>
                    <ForumIcon />
                </IconButton>
                <FullscreenComment
                    history={history}
                    match={match}
                    toggleComment={this.toggleComment}
                    isCommentActive={this.state.isCommentActive}
                    classes={classes}
                    handleTabChange={handleTabChange}
                    activeTab={activeTab}
                />
            </div>
        );
    }
}

const Transition = (TransitionProp) => {
    // setTimeout hack. improve later
    return (
        <Slide
            {...TransitionProp}
            // in={this.state.mounted}
            // appear={this.state.mounted}
            direction="up"
            // onEnter={() => setTimeout(() => this.setState({ mounted: false }), 300)}
            // onExit={() => setTimeout(() => this.setState({ mounted: true }), 100)}
        />
    );
};

class FullscreenComment extends Component {
    state = {
        mounted: true
    };

    render() {
        const { classes, activeTab, handleTabChange, isCommentActive, toggleComment, history, match } = this.props;
        // console.log(isCommentActive);
        return (
            <Dialog fullScreen open={isCommentActive} onClose={toggleComment} TransitionComponent={Transition}>
                {/* <div className={classNames(classes.toolbar)} style={{opacity: 0}} /> */}
                <div>
                    <Button mini variant="text" color="primary" style={{ position: "absolute", top: "5px", zIndex: 2 }} onClick={toggleComment}>
                        <ClearIcon />
                    </Button>
                    <TabsContainer flexEnd={true} fullWidth={false} activeTab={activeTab} handleTabChange={handleTabChange} msgID="tab.comments.title" />
                    {activeTab === 0 && <CommentsField history={history} match={match} />}
                    {activeTab === 1 && "Notes"}
                    bottom12345
                </div>
            </Dialog>
        );
    }
}

export default compose(
    withStyles(styles),
    withWidth()
)(Comments);
