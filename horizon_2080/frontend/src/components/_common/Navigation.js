import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import Icon from "@material-ui/core/Icon";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
    button: {
        margin: "0px",
        width: "40px",
        minWidth: "40px"
    },
    extendedIcon: {
        marginRight: theme.spacing.unit
    },
    navigationRoot: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: "30px",
        marginTop: theme.spacing.unit * 3
    },
    alignRight: {
        marginLeft: "auto",
        [theme.breakpoints.up("md")]: {
            // marginRight: "20px"
        }
    }
});

const button = {
    add: <AddIcon />,
    edit: <EditIcon />
};

class Navigation extends Component {
    handleGoBack = () => {
        this.props.slideFunc("right");
        this.props.history.goBack();
    };

    render() {
        let { classes, depth, component, buttonType, buttonMethod } = this.props;
        const showNavButton = depth > 1 ? true : false;
        return (
            <div className={classes.navigationRoot}>
                {showNavButton ? (
                    <Button mini variant="text" color="primary" className={classes.button} onClick={this.handleGoBack}>
                        <KeyboardArrowLeftIcon />
                    </Button>
                ) : null}
                <FormattedMessage id={`navigation.${component}.title`}>
                    {(title) => {
                        let titleArr = title.split(",");
                        depth = depth <= 1 ? 0 : depth;
                        if (depth >= titleArr.length) {
                            depth = titleArr.length - 1;
                        }
                        return <span style={{ fontWeight: "bold", fontSize: "24px" }}>{titleArr[depth]}</span>;
                    }}
                </FormattedMessage>
                {buttonType ? (
                    <Button mini variant="fab" color="secondary" className={classNames(classes.button, classes.alignRight)} onClick={buttonMethod}>
                        {button[buttonType]}
                    </Button>
                ) : null}
            </div>
        );
    }
}

Navigation.propTypes = {
    classes: PropTypes.object.isRequired,
    depth: PropTypes.number.isRequired,
    component: PropTypes.string.isRequired
    // buttonType: PropTypes.string.isRequired
};

Navigation.defaultProps = {
    docked: false,
    classes: {}
};

export default withStyles(styles)(Navigation);
