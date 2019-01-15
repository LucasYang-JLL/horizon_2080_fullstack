import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import SingleInput from "../_common/SingleInput";
import Avatar from "@material-ui/core/Avatar";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import getDate from "../_utils/getDate";
import Divider from "@material-ui/core/Divider";
import { FormattedMessage } from "react-intl";

const styles = (theme) => ({
    root: {
        width: "100%",
        flex: "1 1 100%",
        display: "flex",
        maxWidth: 360,
        [theme.breakpoints.down("sm")]: {
            maxWidth: "100%"
        },
        backgroundColor: theme.palette.background.paper
    },
    helpText: {
        alignSelf: "center",
        margin: "5%",
        color: "#808080"
    },
    ulStyle: {
        flex: 1,
        overflow: "auto",
        fontSize: "12px"
    },
    liStyle: {
        padding: "8px 0",
        display: "flex",
        minHeight: "70px"
    },
    nameTextStyle: {
        fontSize: "12px"
    },
    primaryTextStyle: {
        fontSize: "14px",
        color: "#404040",
        marginTop: 4
    },
    secondaryTextStyle: {
        fontSize: "12px",
        color: "#808080"
    },
    avatarWrapper: {
        alignSelf: "flex-start",
        height: "100%"
    },
    liContentWrapper: {
        height: "100%",
        flex: 1,
        alignSelf: "flex-start"
    },
    liTitleWrapper: {},
    avatar: {
        marginLeft: 8,
        marginRight: 8,
        width: "26px",
        height: "26px",
        fontSize: "14px"
    }
});

class CommentList extends Component {
    state = {
        comments: this.props.data,
        tmpComments: [], // another store used to splice SingleInput into the array
        editMode: false,
        editIndex: null,
        inputValue: ""
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.data !== prevState.data) {
            return { comments: nextProps.data };
        } else return null;
    }

    handleEdit = (index) => {
        const placeholder = <div>EDIT CONTENT</div>;
        this.setState((prevState) => {
            let newComments = prevState.comments.slice(); // fetch a copy of the previous events
            newComments.splice(index, 1, placeholder); // removal index, # item to remove, insert item
            return {
                tmpComments: newComments,
                editMode: true,
                editIndex: index,
                inputValue: prevState.comments[index].name
            };
        });
    };

    handleInput = (name) => (event) => {
        // not using the default name in the SingleInput module
        this.setState({
            inputValue: event.target.value
        });
    };

    handleKeypress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            this.updateEvent(this.state.editIndex, this.state.inputValue);
        }
    };

    handleCloseInput = () => {
        this.setState({
            editMode: false
        });
    };

    updateEvent = (index, value) => {
        // update the database and state
        this.props.updateEvent(index, value);
        // update open state
        this.setState({
            editMode: false
        });
    };

    render() {
        const { classes } = this.props;
        const { editMode, comments, tmpComments, editIndex, inputValue } = this.state;
        // break down the state into two seperate states, for edit mode, and for normal display
        return (
            <div className={classes.root}>
                {comments.length > 0 ? (
                    <List className={classes.ulStyle}>
                        {editMode
                            ? tmpComments.map((event, index) =>
                                  index === editIndex ? (
                                      <Fragment key={index}>
                                          <SingleInput
                                              buttonName="Edit"
                                              handleInput={this.handleInput}
                                              handleKeypress={this.handleKeypress}
                                              inputValue={inputValue}
                                              toggleForm={this.handleCloseInput}
                                              submit={() => this.updateEvent(editIndex, inputValue)}
                                          />
                                          <br />

                                          <Divider />
                                      </Fragment>
                                  ) : (
                                      <Fragment key={index}>
                                          <ListItem onClick={() => this.handleEdit(index)}>
                                              <ListItemText primary={event.name} secondary={getDate(event.create_date)} />
                                          </ListItem>

                                          <Divider />
                                      </Fragment>
                                  )
                              )
                            : comments.map(({ message, create_date, created_by_id, mention_user_id }, index) => (
                                  <Fragment key={index}>
                                      <ListItem className={classes.liStyle}>
                                          <div className={classes.avatarWrapper}>
                                              <Avatar className={classes.avatar}>
                                                  {created_by_id
                                                      .split(".")
                                                      .map((value) => value[0])
                                                      .join("")
                                                      .toUpperCase()}
                                              </Avatar>
                                          </div>
                                          <div className={classes.liContentWrapper}>
                                              <div className={classes.liTitleWrapper}>
                                                  <div className={classes.nameTextStyle}>
                                                      {created_by_id.split(".").join(" ")}
                                                      {mention_user_id ? <span> <b style={{color: "#B0B1B3"}}>&#9656;</b> {mention_user_id.split(".").join(" ")}</span> : null}
                                                  </div>
                                                  <div className={classes.secondaryTextStyle}>{getDate(create_date)}</div>
                                              </div>
                                              <div className={classes.primaryTextStyle}>{message}</div>
                                          </div>
                                      </ListItem>
                                      <Divider light />
                                  </Fragment>
                              ))}
                    </List>
                ) : (
                    <FormattedMessage id="comment.text.welcomeText">{(msg) => <div className={classes.helpText}>{msg}</div>}</FormattedMessage>
                )}
            </div>
        );
    }
}

CommentList.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired
};

export default withStyles(styles)(CommentList);
