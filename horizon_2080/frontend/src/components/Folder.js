import React, { Component, Fragment } from "react";
import Slide from "@material-ui/core/Slide";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import WithLoadingScreen from "./_common/WithLoadingScreen";
import ListIcon from "@material-ui/icons/List";
import DoneIcon from "@material-ui/icons/Done";
import Form from "./_common/Form";
import { compose } from "redux";
import axios from "axios";
import color from "../MuiTheme/color";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const styles = (theme) => ({
    content: {
        display: "flex",
        width: "100%",
        flexDirection: "column",
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        [theme.breakpoints.up("md")]: {},
        [theme.breakpoints.down("sm")]: {},
        minWidth: 0 // So the Typography noWrap works
    },
    toolbar: theme.mixins.toolbar,
    CardContainer: {
        display: "flex",
        flexWrap: "wrap",
        overflow: "auto"
    },
    card: {
        maxWidth: 275,
        minWidth: 175,
        maxHeight: 175,
        minHeight: 71,
        margin: theme.spacing.unit * 3,
        cursor: "pointer",
        textTransform: "none"
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
    },
    messageInputRoot: {
        display: "flex",
        flexDirection: "row",
        flex: "1 1 100%",
        flexWrap: "wrap"
    },
    button: {
        margin: theme.spacing.unit,
        width: "100%",
        height: "63px",
        textAlign: "left"
    },
    buttonSmall: {
        width: "50px",
        height: "35px"
    },
    leftIcon: {
        marginRight: theme.spacing.unit
    },
    rightIcon: {
        marginLeft: theme.spacing.unit
    },
    iconSmall: {
        fontSize: 20
    },
    offsetIcon: {
        height: "12px"
    },
    iconButton: {
        width: "36px",
        height: "36px"
    },
    folderTitle: {
        padding: 0,
        margin: 0,
        fontWeight: 500
    },
    cardContentRoot: {
        padding: theme.spacing.unit,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "&:last-child": {
            padding: theme.spacing.unit
        }
    },
    labelWrapper: {
        display: "flex",
        flexDirection: "row"
    },
    cardLabel: {
        display: "flex",
        alignItems: "center",
        margin: "0 4px",
        color: color.Black50
    },
    spacer: {
        flex: 1
    }
});

const inputFields = [
    {
        type: "input",
        label: "folder.field.folder_name",
        name: "name",
        required: true,
        noLabel: true
    }
];

class Folder extends Component {
    state = {
        cards: [],
        hover: -1,
        openModal: false,
        newFolderTitle: ""
    };

    componentDidMount() {
        this.fetchFolder();
    }

    fetchFolder = () => {
        axios
            .get("/api/horizon_folder/")
            .then((response) => {
                // handle success
                this.setState({
                    cards: response.data
                });
            })
            .catch((error) => {
                // handle error
                console.log(error);
            })
            .then(() => {
                // always executed
            });
    };

    handleCardClick = (id) => {
        // this.props.push()
        this.props.history.push(`/performance/${id}`);
        this.props.slideDirection("left");
    };

    toggleNewFolderModal = () => {
        this.setState((prevState) => {
            return {
                openModal: !prevState.openModal
            };
        });
    };

    setHover = (id) => {
        this.setState({
            hover: id
        });
    };

    render() {
        const { classes } = this.props;
        const { slideState } = this.props.reduxState;
        return (
            <Slide direction={slideState} in mountOnEnter unmountOnExit>
                <div className={classes.content}>
                    <div className={classes.toolbar} />
                    <h2 style={{ marginTop: 0 }}>Campaigns</h2>
                    <WrapComponent
                        toggleNewFolderModal={this.toggleNewFolderModal}
                        handleCardClick={this.handleCardClick}
                        hover={this.state.hover}
                        setHover={this.setHover}
                        openModal={this.state.openModal}
                        data={this.state.cards}
                        // classes={classes}
                        history={this.props.history}
                    />
                </div>
            </Slide>
        );
    }
}

const styleCard = (theme) => ({
    spacer: {
        flex: 1
    },
    cardLabel: {
        display: "flex",
        alignItems: "center",
        margin: "0 4px",
        color: color.Black50
    },
    labelWrapper: {
        display: "flex",
        flexDirection: "row"
    },
    folderTitle: {
        padding: 0,
        margin: 0,
        fontWeight: 500
    },
    CardContainer: {
        display: "flex",
        flexWrap: "wrap",
        overflow: "auto"
    },
    card: {
        maxWidth: 275,
        minWidth: 175,
        maxHeight: 175,
        minHeight: 71,
        margin: theme.spacing.unit * 3,
        cursor: "pointer",
        textTransform: "none"
    },
    cardContentRoot: {
        padding: theme.spacing.unit,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "&:last-child": {
            padding: theme.spacing.unit
        }
    }
});
const WrapComponent = compose(
    WithLoadingScreen,
    withStyles(styleCard)
)(CardContainer);

function CardContainer(props) {
    const { classes, data, setHover, hover, handleCardClick, toggleNewFolderModal, openModal, history } = props;
    return (
        <div className={classes.CardContainer}>
            {data.map(({ id, name, completed_target, total_target }) => (
                <Card raised={id === hover ? true : false} key={id} className={classes.card} onClick={() => handleCardClick(id)} onMouseEnter={() => setHover(id)} onMouseLeave={() => setHover(-1)}>
                    <CardContent classes={{ root: classes.cardContentRoot }}>
                        <h4 className={classes.folderTitle}>{name.length > 20 ? `${name.slice(0, 17)}...` : name}</h4>
                        <div className={classes.spacer} />
                        <div className={classes.labelWrapper}>
                            <div className={classes.spacer} />
                            <div className={classes.cardLabel}>
                                <ListIcon />
                                <span>{total_target}</span>
                            </div>
                            <div className={classes.cardLabel}>
                                <DoneIcon />
                                <span>{completed_target}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
            <Button className={classes.card} variant="outlined" color="primary" onClick={toggleNewFolderModal}>
                Create new folder...
            </Button>
            <Form title="Enter folder name" open={openModal} toggle={toggleNewFolderModal} endpoint="api/create_horizon_folder/" inputFields={inputFields} dest="/performance/" history={history} />
        </div>
    );
}

CardContainer.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Folder);
