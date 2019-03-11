import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import tableau from "tableau-api";

const styles = (theme) => ({
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        minWidth: 0 // So the Typography noWrap works
    },
    toolbar: theme.mixins.toolbar
});

class Tableau extends Component {
    componentDidMount() {
        this.initViz();
    }

    initViz() {
        const vizUrl = "https://public.tableau.com/views/Book1_15522724411580/Benson_chen2";
        const vizContainer = this.vizContainer;
        let viz = new window.tableau.Viz(vizContainer, vizUrl);
    }

    render() {
        const { classes } = this.props;
        const { slideState } = this.props.reduxState;
        return (
            <Slide direction={slideState} in mountOnEnter unmountOnExit>
                <div className={classes.content}>
                    <div className={classes.toolbar} />
                    Tableau
                    <div
                        ref={(div) => {
                            this.vizContainer = div;
                        }}
                    />
                </div>
            </Slide>
        );
    }
}

Tableau.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Tableau);
