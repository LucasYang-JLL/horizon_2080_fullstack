import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const styles = {
    root: {
        flexGrow: 1
    }
};

/**
 * @param {Array} progress (an array of tasks labeling if completed or not)
 */

class Progress extends React.Component {
    state = {
        completed: 0
    };

    componentDidMount() {
        this.progress();
    }

    progress = () => {
        this.setState({
            completed: (this.props.progress.filter((value) => value === true).length / this.props.progress.length) * 100
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <LinearProgress variant="determinate" value={this.state.completed} />
                <br />
                <LinearProgress color="secondary" variant="determinate" value={this.state.completed} />
            </div>
        );
    }
}

Progress.propTypes = {
    classes: PropTypes.object.isRequired
};

Progress.defaultProps = {
    progress: [true, false, true, false, false]
};

export default withStyles(styles)(Progress);
