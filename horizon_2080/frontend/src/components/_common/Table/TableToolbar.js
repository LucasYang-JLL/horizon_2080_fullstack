import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import SingleInput from "../SingleInput";
import classNames from "classnames";

const toolbarStyles = (theme) => ({
    root: {
        paddingRight: theme.spacing.unit
    },
    highlight:
        theme.palette.type === "light"
            ? {
                  color: theme.palette.secondary.main,
                  backgroundColor: lighten(theme.palette.secondary.light, 0.85)
              }
            : {
                  color: theme.palette.text.primary,
                  backgroundColor: theme.palette.secondary.dark
              },
    spacer: {
        flex: "1 1 100%"
    },
    actions: {
        color: theme.palette.text.secondary
    },
    title: {
        flex: "0 0 auto"
    },
    editButtonStyle: {
        display: "flex",
        alignItems: "flex-start"
    },
    overRideIconStyle: {
        padding: "3px",
        margin: "0 3px"
    }
});

let EnhancedTableToolbar = (props) => {
    const { numSelected, classes, folderTitle, editMode, handleKeypress, handleInput, toggleEditMode, inputValue, handleUpdateFolder } = props;
    return (
        <Toolbar
            className={classNames(classes.root, {
                [classes.highlight]: numSelected > 0
            })}
        >
            <div className={classes.title}>
                {numSelected > 0 ? (
                    <Typography color="inherit" variant="subheading">
                        {numSelected} selected
                    </Typography>
                ) : editMode ? (
                    <SingleInput toggleForm={toggleEditMode} inputValue={inputValue} handleInput={handleInput} handleKeypress={handleKeypress} submit={handleUpdateFolder} buttonName="Edit" />
                ) : (
                    <div className={classes.editButtonStyle}>
                        <Typography variant="h6" id="tableTitle">
                            {folderTitle}
                        </Typography>
                        <IconButton aria-label="Edit Button" onClick={toggleEditMode} classes={{ root: classes.overRideIconStyle }}>
                            <EditIcon />
                        </IconButton>
                    </div>
                )}
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton aria-label="Delete">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Filter list">
                        <IconButton aria-label="Filter list">
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </div>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);
export default EnhancedTableToolbar;
