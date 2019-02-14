import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FilledInput from "@material-ui/core/FilledInput";
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
    root: {
        display: "flex",
        flexWrap: "wrap"
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120
    },
    selectStyle: {
        maxHeight: 46 * 5 + theme.spacing.unit * 2,
        overflowY: "auto"
    }
});

class MonthPicker extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <form className={classes.root} autoComplete="off">
                <FormControl className={classes.formControl}>
                    <FormattedMessage id={"date.months"}>
                        {(msg) => {
                            let currentMonth = new Date().getMonth()+1; // get current month
                            let monthArr = msg.split(",");
                            let upToCurrMonth = monthArr.slice(0, currentMonth); // only show months up to current
                            return (
                                <Select MenuProps={{ PopoverClasses: { paper: classes.selectStyle } }} value={this.props.month} onChange={this.props.handleMonthChange} name="month">
                                    {monthArr.map((month, index) => {
                                        return (
                                            <MenuItem key={index} value={index}>
                                                {month}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            );
                        }}
                    </FormattedMessage>
                </FormControl>
            </form>
        );
    }
}

MonthPicker.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MonthPicker);
