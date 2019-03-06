import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import MonthlyGoalList from "./MonthlyGoalList";
import WithLoadingScreen from "./_common/WithLoadingScreen";
import YearPicker from "./_common/YearPicker";
import MonthPicker from "./_common/MonthPicker";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
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
    },
    optionFilter: {
        minWidth: 80,
        margin: "0 16px"
    }
});

class MonthlyGoal extends Component {
    state = {
        emptyRecord: false,
        data: [],
        yearArr: [],
        filterType: "MonthYear",
        year: new Date().getFullYear(), // set default to current year
        month: new Date().getMonth() // set default to current month
    };

    componentDidMount() {
        this.fetchTargetByMonthYear();
        this.fetchYearRange();
    }

    fetchTargetByMonthYear = () => {
        axios
            .get(`/api/fetch_target_by_month/${this.state.year}/${this.state.month}/`)
            .then((response) => {
                // handle success
                console.log(response.data);
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

    fetchTargetByOverdue = () => {
        axios
            .get(`/api/fetch_target_by_overdue/`)
            .then((response) => {
                // handle success
                console.log(response.data);
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

    fetchTargetByBehindSchedule = () => {
        axios
            .get(`/api/fetch_target_by_behind_schedule/`)
            .then((response) => {
                // handle success
                console.log(response.data);
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

    handleFilterTypeChange = (event) => {
        this.setState({ filterType: event.target.value }, () => {
            // this.fetchTargetByMonthYear();
            switch (this.state.filterType) {
                case "MonthYear":
                    this.fetchTargetByMonthYear();
                    break;
                case "overdue":
                    this.fetchTargetByOverdue();
                    break;
                case "behindProgress":
                    this.fetchTargetByBehindSchedule();
                    break;
            }
        });
    };

    handleYearChange = (event) => {
        this.setState({ year: event.target.value }, () => {
            this.fetchTargetByMonthYear();
        });
    };

    handleMonthChange = (event) => {
        this.setState({ month: event.target.value }, () => {
            this.fetchTargetByMonthYear();
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
                        <FormattedMessage id={"recent.title.target_progress"}>{(msg) => <h2 style={{ margin: 0 }}>{msg}</h2>}</FormattedMessage>
                        <div className={classes.spacer} />

                        {this.state.filterType === "MonthYear" ? (
                            <Fragment>
                                <YearPicker year={this.state.year} handleYearChange={this.handleYearChange} yearArr={this.state.yearArr} />
                                <MonthPicker month={this.state.month} handleMonthChange={this.handleMonthChange} />
                            </Fragment>
                        ) : null}
                        <form className={classes.optionFilter}>
                            <FormControl>
                                <Select
                                    value={this.state.filterType}
                                    onChange={this.handleFilterTypeChange}
                                    inputProps={{
                                        name: "age",
                                        id: "age-simple"
                                    }}
                                >
                                    <MenuItem value={"MonthYear"}>Targets due by month</MenuItem>
                                    {/* <MenuItem value={"behindProgress"}>Behind Schedule</MenuItem> */}
                                    <MenuItem value={"overdue"}>Overdue</MenuItem>
                                </Select>
                            </FormControl>
                        </form>
                    </div>
                    <FormattedMessage id={"recent.text.target_progress"}>
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
