import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import color from "../../MuiTheme/color";

const styles = (theme) => ({
    root: {
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    progressRoot: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    progressBar: {
        flex: "1 1 100%",
        marginLeft: theme.spacing.unit
    },
    progressNumber: {
        fontSize: "12px",
        margin: "0 5px",
        color: color.Black50
    }
});

/**
 * @param {Array} progress (an array of tasks labeling if completed or not)
 */

class Progress extends React.Component {
    state = {
        completed: 0,
        progress: this.props.progress
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.progress !== prevState.progress) {
            let norm_arr = nextProps.progress.map(({ completed_flag }) => completed_flag);
            let percentage = Math.round((norm_arr.reduce((acc, curr) => acc + curr) / norm_arr.length) * 100);
            return {
                completed: percentage // get the % completion, then round the number
            };
            // return { progress: nextProps.progress };
        } else return null;
    }

    componentDidMount() {
        this.progress();
    }

    progress = () => {
        let norm_arr = this.props.progress.map(({ completed_flag }) => completed_flag);
        let percentage = Math.round((norm_arr.reduce((acc, curr) => acc + curr) / norm_arr.length) * 100);
        this.setState({
            completed: percentage // get the % completion, then round the number
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                {/* <LinearProgress variant="determinate" value={this.state.completed} /> */}
                {/* <br /> */}
                <div className={classes.progressRoot}>
                    <span className={classes.progressNumber}>{this.state.completed}%</span>
                </div>
                <LinearProgress className={classes.progressBar} color="secondary" variant="determinate" value={this.state.completed} />
            </div>
        );
    }
}

Progress.propTypes = {
    classes: PropTypes.object.isRequired
};

Progress.defaultProps = {
    progress: [true, false, true]
};

export default withStyles(styles)(Progress);
