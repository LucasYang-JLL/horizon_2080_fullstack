import { connect } from "react-redux";
import Folder from "../Folder";
import { slideDirection } from "../_actions/header";
import { toggleEditButton, updateTarget } from "../_actions/performance";
import { toggleSnackbar } from "../_actions/common";

// redux provided wrapper to map state to props
const mapStateToProps = (state) => {
    return {
        reduxState: state
    };
};

// redux provided wrapper to map dispatch to props
const mapDispatchToProps = (dispatch) => {
    return {
        slideDirection: (value) => {
            dispatch(slideDirection(value));
        },
        toggleEditButton: (value) => {
            dispatch(toggleEditButton(value));
        },
        toggleSnackbar: (snackbarOpen, variant = "info", message = "Input message here") => {
            dispatch(toggleSnackbar(snackbarOpen, variant, message));
        },
        updateTarget: (value) => {
            dispatch(updateTarget(value))
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Folder);
