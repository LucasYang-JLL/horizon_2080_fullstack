import React, { Component, Fragment } from "react";
import Slide from "@material-ui/core/Slide";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
    content: {
        display: "flex",
        width: "100%",
        flexDirection: "column",
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        // paddingTop: 0,
        [theme.breakpoints.up("md")]: {},
        [theme.breakpoints.down("sm")]: {},
        minWidth: 0 // So the Typography noWrap works
    },
    toolbar: theme.mixins.toolbar,
    cardWrapper: {
        display: "flex",
        flexWrap: "wrap",
    },
    card: {
        maxWidth: 275,
        minWidth: 175,
        maxHeight: 175,
        margin: theme.spacing.unit * 3,
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)"
    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    }
});

class Folder extends Component {
    state = {};

    render() {
        const { classes } = this.props;
        const { slideState } = this.props.reduxState;
        return (
            <Slide direction={slideState} in mountOnEnter unmountOnExit>
                <div className={classes.content}>
                    <div className={classes.toolbar} />
                    <h2 style={{ marginTop: 0 }}>Campaigns</h2>
                    <CardWrapper classes={classes} />
                </div>
            </Slide>
        );
    }
}

function CardWrapper(props) {
    const { classes } = props;
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <div className={classes.cardWrapper}>
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Word of the Day
                    </Typography>
                    <Typography variant="h5" component="h2">
                        be
                        {bull}
                        nev
                        {bull}o{bull}
                        lent
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        adjective
                    </Typography>
                    {/* <Typography component="p">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                </Typography> */}
                </CardContent>
                {/* <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions> */}
            </Card>
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Word of the Day
                    </Typography>
                    <Typography variant="h5" component="h2">
                        be
                        {bull}
                        nev
                        {bull}o{bull}
                        lent
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        adjective
                    </Typography>
                    {/* <Typography component="p">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                </Typography> */}
                </CardContent>
                {/* <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions> */}
            </Card>
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Word of the Day
                    </Typography>
                    <Typography variant="h5" component="h2">
                        be
                        {bull}
                        nev
                        {bull}o{bull}
                        lent
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        adjective
                    </Typography>
                    {/* <Typography component="p">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                </Typography> */}
                </CardContent>
                {/* <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions> */}
            </Card>
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Word of the Day
                    </Typography>
                    <Typography variant="h5" component="h2">
                        be
                        {bull}
                        nev
                        {bull}o{bull}
                        lent
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        adjective
                    </Typography>
                    {/* <Typography component="p">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                </Typography> */}
                </CardContent>
                {/* <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions> */}
            </Card>
        </div>
    );
}

CardWrapper.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Folder);
