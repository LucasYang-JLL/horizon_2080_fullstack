import { connect } from "react-redux";
import Details from "../sub_components/Details";
import { slideDirection } from "../_actions/header";
import { ResetOpenEvent } from "../_actions/event";
import { toggleEditButton, handleDataChange, storeTargetData, storeProjectData, updateTarget } from "../_actions/performance";
import { toggleSnackbar } from "../_actions/common";

// redux provided wrapper to map state to props
const mapStateToProps = (state) => {
    return {
        reduxState: state
    };
};

// redux provided wrapper to map dispatch to props
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        slideDirection: (value) => {
            dispatch(slideDirection(value));
        },
        toggleEditButton: (value) => {
            dispatch(toggleEditButton(value));
        },
        storeTargetData: (data) => {
            dispatch(storeTargetData(data));
        },
        storeProjectData: (data) => {
            dispatch(storeProjectData(data));
        },
        handleDataChange: (name, value) => {
            dispatch(handleDataChange(name, value));
        },
        toggleSnackbar: (snackbarOpen, variant = "info", message = "Input message here") => {
            dispatch(toggleSnackbar(snackbarOpen, variant, message));
        },
        updateTarget: (value) => {
            dispatch(updateTarget(value))
        },
        ResetOpenEvent: () => {
            dispatch(ResetOpenEvent())
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Details);
