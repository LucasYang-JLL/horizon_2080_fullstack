import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { FormattedMessage } from "react-intl";
import axios from "axios";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const styles = (theme) => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        minWidth: 75
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

class YearPicker extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <form className={classes.root} autoComplete="off">
                <Select MenuProps={{ PopoverClasses: { paper: classes.selectStyle } }} value={this.props.year} onChange={this.props.handleYearChange} name="year">
                    {this.props.yearArr.map((year, index) => {
                        return (
                            <MenuItem key={year} value={year}>
                                {year}
                            </MenuItem>
                        );
                    })}
                </Select>
            </form>
        );
    }
}

YearPicker.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(YearPicker);
