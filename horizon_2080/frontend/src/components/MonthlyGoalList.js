import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Directory from "./_common/Directory";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";
import getDate from "./_utils/getDate";
import Divider from "@material-ui/core/Divider";

const styles = (theme) => ({
    root: {
        ...theme.mixins.gutters(),
        margin: "0 8px",
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2
    },
    content: {
        flexGrow: 1,
        minWidth: 0, // So the Typography noWrap works
    },
    toolbar: theme.mixins.toolbar,
    pStyle: {
        margin: 0,
        color: "#404040",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    dateStyle: {
        color: "#202020",
        fontStyle: "italic"
    },
    linkStyle: {
        color: "#0000EE",
        textDecoration: "underline",
        cursor: "pointer"
    },
    spacer: {
        flex: 1
    },
    contentWrapper: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    dueDateWrapper: {
        minWidth: "125px"
    },
    chip: {
        color: "rgba(0, 0, 0, 0.54)",
        margin: "0 8px"
    },
    completion: {
        color: "rgb(76, 175, 80)"
    },
    semiBold: {
        fontWeight: 500
    },
    marginBot: {
        marginBottom: "8px"
    },
    titleWrapper: {
        display: "flex",
        alignItems: "center"
    },
    greeting: {
        color: "grey",
        display: "flex",
        flexDirection: "column",
        alignSelf: "center",
        justifyContent: "center",
        flex: 1,
        fontSize: "20px",
        fontWeight: "bold"
    }
});

class MonthlyGoalList extends Component {
    handleOpenTargetRequest = (target_id) => {
        this.props.history.push(`/performance/project/${target_id}`);
    };

    render() {
        const { classes, data, msgArr } = this.props;
        const progress_msg = msgArr[0];
        const due_msg = msgArr[1];
        console.log(data);
        return data.length === 0 ? (
            <div className={classes.greeting}>There are no targets due this month</div>
        ) : (
            <Paper className={classes.root} elevation={2}>
                <div className={classes.content}>
                    {data.map(({ target, name, complete_count }, index) => {
                        return target.length > 0 ? (
                            <Fragment key={index}>
                                <div className={classes.titleWrapper}>
                                    <Directory folder={name} />
                                    <Chip
                                        label={
                                            <b>
                                                {" "}
                                                {complete_count} / {target.length}{" "}
                                            </b>
                                        }
                                        className={classes.chip}
                                        color="default"
                                        deleteIcon={<DoneIcon />}
                                    />
                                </div>
                                <Divider classes={{ root: classes.marginBot }} />
                                {target.map(({ name, create_date, expire_date, progress, id }) => {
                                    let progressDesc;
                                    // assigns progress descriptor
                                    switch (progress) {
                                        case 0:
                                            progressDesc = <div className={classes.semiBold}>{progress_msg}</div>;
                                            break;
                                        case 100:
                                            progressDesc = <DoneIcon classes={{ root: classes.completion }} fontSize="small" />;
                                            break;
                                        default:
                                            progressDesc = <div className={classes.semiBold}>{progress}%</div>;
                                            break;
                                    }
                                    // return the list
                                    return (
                                        <ListItem key={create_date}>
                                            <div className={classes.pStyle}>
                                                <Button variant="outlined" color="primary" size="small" onClick={() => this.handleOpenTargetRequest(id)}>
                                                    {name}
                                                </Button>

                                                <div className={classes.spacer} />
                                                <div className={classes.contentWrapper}>
                                                    <Chip label={progressDesc} className={classes.chip} color="default" deleteIcon={<DoneIcon />} />
                                                    <div className={classes.dueDateWrapper}>
                                                        <b>{due_msg}:</b> <span className={classes.dateStyle}>{getDate(expire_date)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </ListItem>
                                    );
                                })}
                            </Fragment>
                        ) : null;
                    })}
                </div>
            </Paper>
        );
    }
}

MonthlyGoalList.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MonthlyGoalList);
