import React from "react";
import PropTypes from "prop-types";
import color from "../../MuiTheme/color";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Avatar from "@material-ui/core/Avatar";

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
    }
});

function CommentsField(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <ExpansionPanel>
                <ExpansionPanelSummary classes={{ content: classes.panelSummary }} expandIcon={<ExpandMoreIcon />}>
                    <div className={classes.panelSummaryTitle}>
                        <Avatar className={classes.avatar}>LY</Avatar>
                        <Typography className={classes.userName}>Lucas Yang</Typography>
                    </div>
                    <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.</Typography>
                    <div className={classes.commentsFooter}>
                        <Typography>09/10, 2018</Typography>
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails classes={{ root: classes.panelDetails }}>
                    <div className={classes.replyHeadingContainer}>
                        <div className={classes.emptySpread} />
                        <div className={classes.replyHeading}>
                            <Avatar className={classes.avatar}>JJ</Avatar>
                            <Typography className={classes.userName}>James Jiang</Typography>
                        </div>
                    </div>
                    <div className={classes.replyContainer}>
                        <div className={classes.spread} />
                        <div className={classes.reply}>
                            <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.</Typography>
                        </div>
                    </div>
                    <div className={classes.replyHeadingContainer}>
                        <div className={classes.emptySpread} />
                        <div className={classes.replyHeading}>
                            <Avatar className={classes.avatar}>JJ</Avatar>
                            <Typography className={classes.userName}>James Jiang</Typography>
                        </div>
                    </div>
                    <div className={classes.replyContainer}>
                        <div className={classes.spread} />
                        <div className={classes.reply}>
                            <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.</Typography>
                        </div>
                    </div>
                    <div className={classes.replyHeadingContainer}>
                        <div className={classes.emptySpread} />
                        <div className={classes.replyHeading}>
                            <Avatar className={classes.avatar}>JJ</Avatar>
                            <Typography className={classes.userName}>James Jiang</Typography>
                        </div>
                    </div>
                    <div className={classes.replyContainer}>
                        <div className={classes.spread} />
                        <div className={classes.reply}>
                            <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.</Typography>
                        </div>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>Expansion Panel 2</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.</Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}

CommentsField.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CommentsField);
