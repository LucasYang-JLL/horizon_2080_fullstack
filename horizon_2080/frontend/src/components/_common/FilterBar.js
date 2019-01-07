import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import color from "../../MuiTheme/color";
import classNames from "classnames";
import { FormattedMessage } from "react-intl";

const styles = (theme) => ({
    root: {
        // display: "flex",
        width: "100%",
        maxHeight: "300px",
        overflowY: "auto"
    },
    filterRow: {
        display: "flex",
        alignSelf: "center"
    },
    filterItem: {
        display: "flex"
    },
    chip: {
        margin: theme.spacing.unit / 2
    },
    activeStyle: {
        border: `2px solid rgb(13, 86, 201)`
    }
});

class FilterBar extends React.Component {
    render() {
        const { classes, filterObj, filterItemClickHandler, Departments, Users } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.filterRow}>
                    <FormattedMessage id={"filterBar.option.department"}>
                        {(msg) => (
                            <div className={classes.filterRow} style={{ marginRight: "4px" }}>
                                {msg}:
                            </div>
                        )}
                    </FormattedMessage>
                    <div className={classes.filterRow}>
                        {Departments.map((department, index) => {
                            return (
                                <Chip
                                    key={index}
                                    onClick={() => filterItemClickHandler("Departments", index)}
                                    label={department.name}
                                    className={department.active ? classNames(classes.chip, classes.activeStyle) : classes.chip}
                                    clickable
                                />
                            );
                        })}
                    </div>
                </div>
                <div className={classes.filterRow}>
                    <FormattedMessage id={"filterBar.option.user"}>
                        {(msg) => (
                            <div className={classes.filterRow} style={{ marginRight: "4px" }}>
                                {msg}:
                            </div>
                        )}
                    </FormattedMessage>
                    <div className={classes.filterRow}>
                        {Users.map((user, index) => {
                            if (user.visible) {
                                return (
                                    <Chip
                                        key={index}
                                        onClick={() => filterItemClickHandler("Users", index)}
                                        label={user.name.split(".").join(" ")}
                                        className={user.active ? classNames(classes.chip, classes.activeStyle) : classes.chip}
                                        clickable
                                    />
                                );
                            }
                        })}
                    </div>
                </div>

                {/* {Object.entries(filterObj).map((row) => (
                    <div className={classes.filterRow}>
                        {row.map((element) => {
                            switch (typeof element) {
                                case "string":
                                    return <div className={classes.filterRow}>{element}:</div>;
                                case "object":
                                    return (
                                        <div className={classes.filterRow}>
                                            {element.map((value, index) => {
                                                return (
                                                    <Chip
                                                        key={index}
                                                        onClick={() => filterItemClickHandler(value, index)}
                                                        label={value.name}
                                                        className={value.active ? classNames(classes.chip, classes.activeStyle) : classes.chip}
                                                        clickable
                                                    />
                                                );
                                            })}
                                        </div>
                                    );
                                default:
                                    return null;
                            }
                        })}
                    </div>
                ))} */}
            </div>
        );
    }
}

FilterBar.propTypes = {
    classes: PropTypes.object.isRequired
};

// the object

FilterBar.defaultProps = {
    // Departments: [{ name: "TDIM", active: true }, { name: "Markets", active: true }],
    // Users: [
    //     {
    //         name: "Lucas.Yang",
    //         department: "TDIM",
    //         active: true
    //     },
    //     {
    //         name: "Tammy.Yu",
    //         department: "Markets",
    //         active: false
    //     }
    // ]
};

export default withStyles(styles)(FilterBar);
