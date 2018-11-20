import * as React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = (theme) => ({
    progress: {
        margin: theme.spacing.unit * 2
    },
    root: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
});

const WithLoadingScreen = (WrappedComponent) => {
    class LoadingScreen extends React.PureComponent {
        render() {
            const { classes, ...inheritProps } = this.props;
            switch (this.props.data.constructor) {
                case Array:
                    if (this.props.data.length === 0 && !this.props.emptyRecord)
                        return (
                            <div className={classes.root}>
                                {/* loading... */}
                                <CircularProgress className={classes.progress} color="secondary" />
                            </div>
                        );
                    return <WrappedComponent {...inheritProps} />;
                case Object:
                    if (Object.keys(this.props.data).length === 0 && !this.props.emptyRecord)
                        return (
                            <div className={classes.root}>
                                {/* loading... */}
                                <CircularProgress className={classes.progress} color="secondary" />
                            </div>
                        );
                    return <WrappedComponent {...inheritProps} />;
            }
        }
    }
    const withStyleLoadScreen = withStyles(styles)(LoadingScreen);
    return withStyleLoadScreen;
};

WithLoadingScreen.propTypes = {
    classes: PropTypes.object.isRequired
};

export default WithLoadingScreen;
