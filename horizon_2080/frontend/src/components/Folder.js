import React, { Component, Fragment } from "react";
import Slide from "@material-ui/core/Slide";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import WithLoadingScreen from "./_common/WithLoadingScreen";
import IconButton from "@material-ui/core/IconButton";
import ListIcon from "@material-ui/icons/List";
import MoreIcon from "@material-ui/icons/MoreVert";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import Form from "./_common/Form";
import Warning from "./_common/Warning";
import { compose } from "redux";
import FilterBar from "./_common/FilterBar";
import Divider from "@material-ui/core/Divider";
import { FormattedMessage } from "react-intl";
import axios from "axios";
import color from "../MuiTheme/color";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const styles = (theme) => ({
    content: {
        // display: "flex",
        overflow: "auto",
        // width: "100%",
        flexDirection: "column",
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        [theme.breakpoints.up("md")]: {},
        [theme.breakpoints.down("sm")]: {},
        minWidth: 0 // So the Typography noWrap works
    },
    titleBar: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
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
        emptyRecord: false,
        newFolderTitle: "",
        Departments: [],
        Users: [],
        anchorEl: null,
        action: null,
        warning: false
    };

    componentDidMount() {
        this.fetchUserInfo();
        this.fetchFolder();
    }

    fetchFolder = () => {
        axios
            .get("/api/horizon_folder/")
            .then((response) => {
                // handle success
                if (response.data.length === 0) {
                    this.setState({
                        emptyRecord: true
                    });
                } else {
                    this.setState({
                        cards: response.data
                    });
                }
            })
            .catch((error) => {
                // handle error
                console.log(error);
            })
            .then(() => {
                // always executed
            });
    };

    fetchUserInfo = () => {
        axios
            .get("/api/user_subset_info/")
            .then((response) => {
                // handle success
                let Departments = response.data.userList.map(({ department }) => department);
                let uniqueDepartments = [...new Set(Departments)].map((department) => ({ name: department, active: true }));
                let Users = response.data.userList.map(({ name, department }) => ({ name, department, active: true, visible: true }));
                this.setState({
                    Departments: uniqueDepartments,
                    Users
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

    deleteFolderRequest = () => {
        axios
            .delete("/api/user_subset_info/")
            .then((response) => {
                // handle success
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

    handleDeleteClick = (e, projectID) => {
        e.stopPropagation();
        console.log("hi");
        this.setState({
            warning: true
        });
    };

    toggleWarning = (e) => {
        e.stopPropagation();
        this.setState((prevState) => {
            return { warning: !prevState.warning };
        });
    };

    confirmDeleteClick = () => {
        console.log("execute delete");
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

    // handle filter list click logic
    filterItemClickHandler = (name, index) => {
        this.setState(
            (prevState) => {
                let arr = [...prevState[name]];
                arr[index].active = !arr[index].active;
                return {
                    [name]: arr
                };
            },
            () => {
                if (name === "Departments") {
                    // when clicking on a department chip
                    let userArr = [...this.state.Users];
                    userArr.map((user) => {
                        if (user.department === this.state.Departments[index].name) {
                            if (this.state.Departments[index].active === false) {
                                user.visible = false;
                                user.active = false;
                            } else {
                                user.visible = true;
                                user.active = true;
                            }
                            return user;
                        }
                        return user;
                    });
                    this.setState({
                        Users: userArr
                    });
                }
            }
        );
    };

    handleMoreActionClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
    };

    handleMenuClick = (action) => {
        this.setState({
            action: action,
            anchorEl: null
        });
    };

    render() {
        const { classes } = this.props;
        const { slideState, userID } = this.props.reduxState;
        const open = Boolean(this.state.anchorEl);
        return (
            <Slide direction={slideState} in mountOnEnter unmountOnExit>
                <div className={classes.content}>
                    <div className={classes.toolbar} />
                    <Warning title={""} open={this.state.warning} toggle={this.toggleWarning} endpoint="api/create_horizon_folder/" dest="/performance/" history={history} />
                    <FilterBar filterItemClickHandler={this.filterItemClickHandler} Departments={this.state.Departments} Users={this.state.Users} />
                    <div className={classes.titleBar}>
                        <FormattedMessage id={"folder.title.self"}>{(msg) => <h3>{msg}</h3>}</FormattedMessage>
                        <div className={classes.spacer} />
                        <IconButton aria-label="More" aria-owns={open ? "long-menu" : undefined} aria-haspopup="true" onClick={this.handleMoreActionClick}>
                            <MoreIcon />
                        </IconButton>
                        <Menu id="long-menu" anchorEl={this.state.anchorEl} open={open} onClose={this.handleMenuClose}>
                            <MenuItem onClick={() => this.handleMenuClick("delete")}>Delete Project</MenuItem>
                        </Menu>
                    </div>
                    <Divider />
                    <CardWithLoad
                        toggleNewFolderModal={this.toggleNewFolderModal}
                        handleCardClick={this.handleCardClick}
                        handleDeleteClick={this.handleDeleteClick}
                        hover={this.state.hover}
                        action={this.state.action}
                        setHover={this.setHover}
                        openModal={this.state.openModal}
                        data={this.state.cards.filter(({ created_by_id }) => created_by_id === userID)}
                        emptyRecord={this.state.emptyRecord}
                        history={this.props.history}
                        creatable={true}
                    />
                    {this.state.Users.map((user) =>
                        this.state.cards.filter(({ created_by_id }) => created_by_id === user.name).length !== 0 ? (
                            user.active ? (
                                <Fragment key={user.name}>
                                    <FormattedMessage id={"folder.title.others"}>
                                        {(msg) => (
                                            <h3>
                                                {user.name.split(".").join(" ")}
                                                {msg}
                                            </h3>
                                        )}
                                    </FormattedMessage>
                                    <Divider />
                                    <CardWithLoad
                                        toggleNewFolderModal={this.toggleNewFolderModal}
                                        handleCardClick={this.handleCardClick}
                                        hover={this.state.hover}
                                        setHover={this.setHover}
                                        openModal={this.state.openModal}
                                        data={this.state.cards.filter(({ created_by_id }) => created_by_id === user.name)}
                                        emptyRecord={this.state.emptyRecord}
                                        history={this.props.history}
                                        creatable={false}
                                    />
                                </Fragment>
                            ) : null
                        ) : null
                    )}
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
    },
    lessPadding: {
        padding: "3px"
    }
});

const CardWithLoad = compose(
    WithLoadingScreen,
    withStyles(styleCard)
)(CardContainer);

function CardContainer(props) {
    const { classes, data, setHover, hover, handleCardClick, handleDeleteClick, toggleNewFolderModal, openModal, history, creatable, action } = props;
    return (
        <div className={classes.CardContainer}>
            {data.map(({ id, name, completed_target, total_target }) => (
                <Card raised={id === hover ? true : false} key={id} className={classes.card} onClick={() => handleCardClick(id)} onMouseEnter={() => setHover(id)} onMouseLeave={() => setHover(-1)}>
                    <CardContent classes={{ root: classes.cardContentRoot }}>
                        <h4 className={classes.folderTitle}>{name.length > 20 ? `${name.slice(0, 17)}...` : name}</h4>
                        <div className={classes.spacer} />
                        <div className={classes.labelWrapper}>
                            {action === "delete" ? (
                                <IconButton aria-label="More" className={classes.lessPadding}>
                                    <DeleteIcon fontSize="small" onClick={(e) => handleDeleteClick(e, id)} />
                                </IconButton>
                            ) : null}
                            <div className={classes.spacer} />
                            {completed_target / total_target === 1 ? (
                                <div className={classes.cardLabel} style={{ color: "#4CAF50" }}>
                                    <DoneAllIcon />
                                </div>
                            ) : (
                                <Fragment>
                                    <div className={classes.cardLabel}>
                                        <ListIcon />
                                        <span>{total_target}</span>
                                    </div>
                                    <div className={classes.cardLabel}>
                                        <DoneIcon />
                                        <span>{completed_target}</span>
                                    </div>
                                </Fragment>
                            )}
                        </div>
                    </CardContent>
                </Card>
            ))}
            {creatable ? (
                <Fragment>
                    <FormattedMessage id={"folder.creation.message"}>
                        {(msg) => (
                            <Button className={classes.card} variant="outlined" color="primary" onClick={toggleNewFolderModal}>
                                {msg}
                            </Button>
                        )}
                    </FormattedMessage>
                    <FormattedMessage id={"folder.creation.create"}>
                        {(msg) => (
                            <Form title={msg} open={openModal} toggle={toggleNewFolderModal} endpoint="api/create_horizon_folder/" inputFields={inputFields} dest="/performance/" history={history} />
                        )}
                    </FormattedMessage>
                </Fragment>
            ) : null}
        </div>
    );
}

CardContainer.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Folder);
