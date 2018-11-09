import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import SingleInput from "../_common/SingleInput";
import getDate from "../_utils/getDate";
import Divider from "@material-ui/core/Divider";

const styles = (theme) => ({
    root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    }
});

class EventList extends Component {
    state = {
        events: this.props.events,
        tmpEvents: [], // another store used to splice SingleInput into the array
        editMode: false,
        editIndex: null,
        inputValue: ""
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.events !== prevState.events) {
            return { events: nextProps.events };
        } else return null;
    }

    handleEdit = (index) => {
        const placeholder = <div>EDIT CONTENT</div>;
        this.setState((prevState) => {
            let newEvents = prevState.events.slice(); // fetch a copy of the previous events
            newEvents.splice(index, 1, placeholder); // removal index, # item to remove, insert item
            return {
                tmpEvents: newEvents,
                editMode: true,
                editIndex: index,
                inputValue: prevState.events[index].name
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
            console.log("update event");
            this.updateEvent(this.state.editIndex, this.state.inputValue);
        }
    };

    handleCloseInput = () => {
        console.log("close input");
        this.setState({
            editMode: false
        });
    };

    updateEvent = (index, value) => {
        console.log("update Event");
        // update the database and state
        this.props.updateEvent(index, value);
        // update open state
        this.setState({
            editMode: false
        });
    };

    render() {
        const { classes } = this.props;
        const { editMode, events, tmpEvents, editIndex, inputValue } = this.state;
        return (
            <div className={classes.root}>
                <List>
                    {events.length > 0
                        ? editMode
                            ? tmpEvents.map(
                                  (event, index) =>
                                      index === editIndex ? (
                                          <Fragment>
                                              <SingleInput
                                                  key={index}
                                                  buttonName="Edit"
                                                  handleInput={this.handleInput}
                                                  handleKeypress={this.handleKeypress}
                                                  inputValue={inputValue}
                                                  toggleForm={this.handleCloseInput}
                                                  submit={() => this.updateEvent(editIndex, inputValue)}
                                              />
                                              <li>
                                                  <Divider />
                                              </li>
                                          </Fragment>
                                      ) : (
                                          <Fragment>
                                              <ListItem key={index} onClick={() => this.handleEdit(index)}>
                                                  <ListItemText primary={event.name} secondary={getDate(event.create_date)} />
                                              </ListItem>
                                              <li>
                                                  <Divider />
                                              </li>
                                          </Fragment>
                                      )
                              )
                            : events.map(({ name, create_date }, index) => (
                                  <Fragment>
                                      <ListItem key={index} onClick={() => this.handleEdit(index)}>
                                          <ListItemText primary={name} secondary={getDate(create_date)} />
                                      </ListItem>
                                      <li>
                                          <Divider />
                                      </li>
                                  </Fragment>
                              ))
                        : null}
                </List>
            </div>
        );
    }
}

EventList.propTypes = {
    classes: PropTypes.object.isRequired,
    events: PropTypes.array.isRequired
};

export default withStyles(styles)(EventList);
