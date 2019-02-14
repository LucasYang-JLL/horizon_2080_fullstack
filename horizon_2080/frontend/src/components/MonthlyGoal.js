import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import MonthlyGoalList from "./MonthlyGoalList";
import WithLoadingScreen from "./_common/WithLoadingScreen";
import YearPicker from "./_common/YearPicker";
import MonthPicker from "./_common/MonthPicker";
import { FormattedMessage } from "react-intl";
import axios from "axios";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const styles = (theme) => ({
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        overflow: "auto",
        minWidth: 0, // So the Typography noWrap works
        display: "flex",
        flexDirection: "column"
    },
    toolbar: theme.mixins.toolbar,
    headerWrapper: {
        display: "flex",
        alignItems: "center",
        marginBottom: theme.spacing.unit * 2,
        minHeight: "48px"
    },
    spacer: {
        flex: 1
    }
});

class MonthlyGoal extends Component {
    state = {
        emptyRecord: false,
        data: [],
        yearArr: [],
        year: new Date().getFullYear(), // set default to current year
        month: new Date().getMonth() // set default to current month
    };

    componentDidMount() {
        this.fetchRecentActions();
        this.fetchYearRange();
    }

    fetchRecentActions = () => {
        axios
            .get(`/api/fetch_target_by_month/${this.state.year}/${this.state.month}/`)
            .then((response) => {
                // handle success
                if (response.data.length === 0) {
                    this.setState({
                        emptyRecord: true,
                        data: response.data
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

    fetchYearRange = () => {
        axios
            .get(`/api/fetch_available_year/`)
            .then((response) => {
                console.log(response);
                let year_range = response.data.year_range;
                let earliest_year = year_range[0];
                let latest_year = year_range[1];
                let year_len = latest_year - earliest_year;
                let yearArr = [];
                for (let i = 0; i <= year_len; i++) {
                    yearArr.push(earliest_year + i);
                }
                // handle success
                this.setState({
                    yearArr: yearArr
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

    handleYearChange = (event) => {
        this.setState({ year: event.target.value }, () => {
            this.fetchRecentActions();
        });
    };

    handleMonthChange = (event) => {
        this.setState({ month: event.target.value }, () => {
            this.fetchRecentActions();
        });
    };

    render() {
        const { classes, history } = this.props;
        const { slideState } = this.props.reduxState;
        return (
            <Slide direction={slideState} in mountOnEnter unmountOnExit>
                <div className={classes.content}>
                    <div className={classes.toolbar} />
                    <div className={classes.headerWrapper}>
                        <FormattedMessage id={"recent.title.monthly_goal"}>{(msg) => <h2 style={{ margin: 0 }}>{msg}</h2>}</FormattedMessage>
                        <div className={classes.spacer} />
                        <YearPicker year={this.state.year} handleYearChange={this.handleYearChange} yearArr={this.state.yearArr} />
                        <MonthPicker month={this.state.month} handleMonthChange={this.handleMonthChange} />
                    </div>
                    <FormattedMessage id={"recent.text.monthly_goal"}>
                        {(msg) => {
                            let msgArr = msg.split(",");
                            return (
                                <MonthlyGoalListWithLoad msgArr={msgArr} history={history} data={this.state.data} emptyRecord={this.state.emptyRecord} openEventRequest={this.props.openEventRequest} />
                            );
                        }}
                    </FormattedMessage>
                </div>
            </Slide>
        );
    }
}

MonthlyGoal.propTypes = {
    classes: PropTypes.object.isRequired
};

const MonthlyGoalListWithLoad = WithLoadingScreen(MonthlyGoalList);

export default withStyles(styles)(MonthlyGoal);
