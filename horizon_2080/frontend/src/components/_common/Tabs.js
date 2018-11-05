import React from "react";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
// import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
// import Typography from "@material-ui/core/Typography";
import color from "../../MuiTheme/color";

const styles = (theme) => ({
    root: {
        backgroundColor: color.Concrete25,
        color: color.Black75,  
    },
    tabRoot: {
        minWidth: "100px"
    },
    flexContainer: {
        justifyContent: "flex-end"
    }
});

class SimpleTabs extends React.Component {
    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes, msgID, fullWidth, handleTabChange, activeTab, flexEnd } = this.props;
        return (
            <div className={classes.root}>
                {/* <AppBar position="static"> */}
                <FormattedMessage id={msgID}>
                    {(tabName) => (
                        <Tabs classes={{ flexContainer: flexEnd ? classes.flexContainer : null }} fullWidth={fullWidth} value={activeTab} onChange={handleTabChange}>
                            {tabName.split(",").map((name, index) => (
                                <Tab key={index} className={classes.tabRoot} label={name} />
                            ))}
                        </Tabs>
                    )}
                </FormattedMessage>
                {/* </AppBar> */}
            </div>
        );
    }
}

SimpleTabs.propTypes = {
    classes: PropTypes.object.isRequired,
    msgID: PropTypes.string.isRequired,
    fullWidth: PropTypes.bool.isRequired,
    activeTab: PropTypes.number.isRequired,
    handleTabChange: PropTypes.func.isRequired
};

SimpleTabs.defaultProps = {
    msgID: "",
    fullWidth: true,
    flexEnd: false
};

export default withStyles(styles)(SimpleTabs);
