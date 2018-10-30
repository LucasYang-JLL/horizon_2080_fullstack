import { connect } from "react-redux";
import Performance from "../Performance";
import { slideDirection } from "../_actions/header";
import { toggleEditButton } from "../_actions/performance";
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
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Performance);
