import { connect } from "react-redux";
import Tableau from "../Tableau";
import { slideDirection } from "../_actions/header";
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
        toggleSnackbar: (snackbarOpen, variant = "info", message = "Input message here") => {
            dispatch(toggleSnackbar(snackbarOpen, variant, message));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Tableau);
