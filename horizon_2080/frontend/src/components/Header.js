import React, { Component, Fragment } from "react";
import { persistStore } from "redux-persist";
import AppBar from "@material-ui/core/AppBar";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { FormattedMessage } from "react-intl";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LanguageIcon from "@material-ui/icons/Language";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import EventIcon from "@material-ui/icons/Event";
import CommentIcon from "@material-ui/icons/Comment";
import SendIcon from "@material-ui/icons/Send";
import PieChartIcon from "@material-ui/icons/PieChart";
import AssignmentIcon from "@material-ui/icons/Assignment";
import SettingsIcon from "@material-ui/icons/Settings";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Badge from "@material-ui/core/Badge";
import axios from "axios";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const drawerWidth = 200;

// write down all the styles into an object
const styles = (theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    flex: {
        display: "flex"
    },
    stickBottom: {
        marginTop: "auto"
    },
    drawerUl: {
        display: "flex",
        flexDirection: "column",
        height: "100%"
    },
    drawerPaper: {
        position: "relative",
        width: drawerWidth,
        whiteSpace: "nowrap",
        height: "100%"
    },
    drawerPaperMd: {
        [theme.breakpoints.down("sm")]: {
            overflowX: "hidden",
            width: theme.spacing.unit * 7,
            [theme.breakpoints.up("sm")]: {
                width: theme.spacing.unit * 7
            },
            height: "100%"
        }
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        minWidth: 0 // So the Typography noWrap works
    },
    toolbar: theme.mixins.toolbar,
    appBarMenu: {
        display: "flex",
        justifyContent: "flex-end",
        flexGrow: 1,
        alignItems: "center",
        fontSize: "14px"
    },
    navIconHide: {
        [theme.breakpoints.up("sm")]: {
            display: "none"
        }
    },
    icon: {
        margin: theme.spacing.unit,
        fontSize: 22
    },
    margin: {
        margin: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 3
    }
});

let drawerConfig = [
    { link: "/performance", icon: <EqualizerIcon /> },
    { link: "/activities", icon: <EventIcon />, badge: "activityBadgeCount" },
    { link: "/comments", icon: <CommentIcon />, badge: "commentBadgeCount" },
    { link: "/actions", icon: <SendIcon />, badge: "actionBadgeCount" },
    // { link: "/analysis", icon: <PieChartIcon /> },
    { link: "/monthly-goal", icon: <AssignmentIcon /> },
    { link: "/settings", icon: <SettingsIcon /> }
];

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            mobileOpen: false,
            open: false,
            activeDrawer: 0,
            userInfo: ""
        };
    }

    componentDidMount() {
        let drawerState = drawerConfig.findIndex(({ link }) => this.props.history.location.pathname.includes(link));
        this.setState({
            activeDrawer: drawerState === -1 ? 0 : drawerState // normalize unfound index to above 0
        });
        this.fetchUserInfo();
    }

    componentWillReceiveProps(props) {
        const { location } = props.history;
        let drawerIndex = drawerConfig.findIndex(({ link }) => location.pathname.includes(link));
        if (drawerIndex !== this.state.activeDrawer) {
            this.setState({
                activeDrawer: drawerIndex
            });
        }
        this.fetchBadgeCount();
        console.log("update header");
    }

    fetchUserInfo = () => {
        axios
            .get(`/api/user_info/`)
            .then((response) => {
                // handle success
                const user = response.data.user;
                this.props.saveUserID(user);
                this.setState({
                    userInfo: user
                });
            })
            .catch((error) => {
                // handle error
                console.log(error);
            });
    };

    fetchBadgeCount = () => {
        axios
            .get("/api/fetch_badge_count/")
            .then((response) => {
                // handle success
                let badges = response.data;
                // loop through all the badges, and update the header if count isn't 0
                for (let key in badges) {
                    if (badges.hasOwnProperty(key)) {
                        let badgeCount = badges[key];
                        if (badgeCount !== 0) {
                            let updateBadgeCount = `update${key.replace(key[0], key[0].toUpperCase())}`;
                            // update badge count
                            this.props[updateBadgeCount](badgeCount);
                        }
                    }
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

    handleDrawerToggle = () => {
        this.setState((state) => ({ mobileOpen: !state.mobileOpen }));
    };

    handleDrawerClick = (e, name, value, index) => {
        this.setState(
            (prevState) => {
                let direction = prevState[name] > index ? "up" : "down";
                this.props.slideDirection(direction);
                return {
                    ...this.state,
                    [name]: index
                };
            },
            () => {
                this.props.history.push(drawerConfig[index].link);
            }
        );
    };

    handleLanguageSwitch = (event, value) => {
        this.props.selectLanguage(value);
        this.handleClose(event);
    };

    handleMenuOpen = () => {
        this.setState((state) => ({ open: !state.open }));
    };

    handleClose = (event) => {
        if (this.anchorEl.contains(event.target)) {
            return;
        }

        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        const { open } = this.state;
        // the side drawer of the app
        const drawer = (
            <Fragment>
                <div className={classes.toolbar} />
                <FormattedMessage id={`header.drawers`}>
                    {(msg) => (
                        <List className={classes.drawerUl} onClick={this.handleDrawerToggle}>
                            {msg.split(",").map((value, index) => (
                                <ListItem
                                    className={drawerConfig[index].link === "/monthly-goal" ? classes.stickBottom : null}
                                    selected={this.state.activeDrawer === index}
                                    onClick={(e) => this.handleDrawerClick(e, "activeDrawer", value, index)}
                                    key={value}
                                    button
                                >
                                    <ListItemIcon>
                                        {drawerConfig[index].badge ? (
                                            <Badge color="secondary" badgeContent={this.props.reduxState[drawerConfig[index].badge]}>
                                                {drawerConfig[index].icon}
                                            </Badge>
                                        ) : (
                                            drawerConfig[index].icon
                                        )}
                                    </ListItemIcon>
                                    <ListItemText disableTypography primary={value} />
                                </ListItem>
                            ))}
                        </List>
                    )}
                </FormattedMessage>
            </Fragment>
        );
        return (
            <div className={classes.flex}>
                <AppBar position="absolute" className={classes.appBar}>
                    <Toolbar>
                        <Grid container direction="row" alignItems="center">
                            <IconButton color="inherit" aria-label="Open drawer" onClick={this.handleDrawerToggle} className={classes.navIconHide}>
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit" noWrap>
                                Horizon
                            </Typography>
                            <Grid className={classes.appBarMenu}>
                                <div style={{ cursor: "pointer" }}>
                                    <span>{this.state.userInfo.split(".").join(" ")}</span>
                                </div>
                                <IconButton
                                    color="inherit"
                                    onClick={this.handleMenuOpen}
                                    aria-owns={open ? "menu-list-grow" : null}
                                    aria-haspopup="true"
                                    buttonRef={(node) => {
                                        this.anchorEl = node;
                                    }}
                                >
                                    <LanguageIcon className={classes.icon} />
                                </IconButton>
                                <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
                                    {({ TransitionProps, placement }) => (
                                        <Grow {...TransitionProps} id="menu-list-grow" style={{ transformOrigin: placement === "bottom" ? "center top" : "center bottom" }}>
                                            <Paper>
                                                <ClickAwayListener onClickAway={this.handleClose}>
                                                    <MenuList>
                                                        <MenuItem onClick={(e) => this.handleLanguageSwitch(e, "zh")}>中文</MenuItem>
                                                        <MenuItem onClick={(e) => this.handleLanguageSwitch(e, "en")}>English</MenuItem>
                                                    </MenuList>
                                                </ClickAwayListener>
                                            </Paper>
                                        </Grow>
                                    )}
                                </Popper>
                                {/* <img src={LogoWhite} style={{ width: "90px" }} /> */}
                                <img src={"/static/img/JLL_Logo.png"} style={{ width: "90px" }} />
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Hidden smUp>
                    <Drawer
                        open={this.state.mobileOpen}
                        onClose={this.handleDrawerToggle}
                        variant="temporary"
                        classes={{
                            paper: classes.drawerPaper
                        }}
                        ModalProps={{
                            keepMounted: true // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden className={classes.flex} xsDown>
                    <Drawer
                        open
                        onClose={this.handleDrawerToggle}
                        variant="permanent"
                        classes={{
                            paper: classNames(classes.drawerPaper, classes.drawerPaperMd)
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </div>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired
};

// use hoc to include styles into the component
export default withStyles(styles)(Header);
