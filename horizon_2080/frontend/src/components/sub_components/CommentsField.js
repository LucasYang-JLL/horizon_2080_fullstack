import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import color from "../../MuiTheme/color";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Avatar from "@material-ui/core/Avatar";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
import WithLoadingScreen from "../_common/WithLoadingScreen";
import axios from "axios";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const styles = (theme) => ({
    root: {
        width: "100%"
    },
    avatar: {
        margin: "5px 15px 0px 0px",
        width: "30px",
        height: "30px",
        alignSelf: "center"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        alignSelf: "center"
    },
    userName: {
        alignSelf: "center"
    },
    panelSummaryTitle: {
        display: "flex",
        flexDirection: "row",
        marginBottom: "10px"
    },
    panelSummary: {
        flexDirection: "column"
    },
    panelDetails: {
        flexDirection: "column"
    },
    spread: {
        borderRight: `2px solid ${color.Concrete25}`,
        marginLeft: "12px",
        marginRight: "18px"
    },
    emptySpread: {
        marginLeft: "12px",
        marginRight: "12px"
    },
    replyHeadingContainer: {
        display: "flex",
        flexDirection: "row",
        margin: "1rem 0"
    },
    replyContainer: {
        display: "flex",
        flexDirection: "row"
    },
    replyHeading: {
        display: "flex"
    },
    commentStickToBottom: {
        position: "sticky",
        bottom: 0
    }
});

class CommentsField extends Component {
    state = {
        inputValue: "",
        data: [],
        emptyRecord: false
    };

    componentDidMount() {
        this.fetchComments();
    }

    fetchComments = () => {
        axios
            .get(`/api/fetch_comment_by_target/${this.props.match.params.id}/`)
            .then((response) => {
                // handle success. 
                if (response.data.length === 0) {
                    this.setState({
                        data: response.data,
                        emptyRecord: true // If empty record, set empty flag to true
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

    handleCommentInput = (e) => {
        console.log(e.target.value);
        this.setState({
            inputValue: e.target.value
        });
    };

    submitComment = () => {
        console.log(this.props);
        const endpoint = `/api/create_comment_by_target/${this.props.match.params.id}/`;
        // post to database
        axios
            .post(endpoint, { message: this.state.inputValue, target: this.props.match.params.id })
            .then((response) => {
                // set the record to state
                this.setState({
                    data: this.state.data.concat(response.data),
                    inputValue: ""
                });
                // handle success
                // toggleSnackbar(true, "success", "Comment Posted!");
            })
            .catch((error) => {
                // handle error
                console.log(error);
            });
    };

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <CommentListWithLoad data={this.state.data} emptyRecord={this.state.emptyRecord} />
                <CommentInput handleInput={this.handleCommentInput} inputValue={this.state.inputValue} submit={this.submitComment} />
            </Fragment>
        );
    }
}

CommentsField.propTypes = {
    classes: PropTypes.object.isRequired
};

const CommentListWithLoad = WithLoadingScreen(CommentList);

export default withStyles(styles)(CommentsField);
