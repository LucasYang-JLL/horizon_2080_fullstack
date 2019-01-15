import { connect } from "react-redux";
import Comments from "../Comments";
import { toggleSnackbar, storeActionAccess } from "../_actions/common";

// redux provided wrapper to map state to props
const mapStateToProps = (state) => {
    return {
        reduxState: state
    };
};

// redux provided wrapper to map dispatch to props
const mapDispatchToProps = (dispatch) => {
    return {
        // selectLanguage: (value) => {
        //     dispatch(selectLanguage(value));
        // },
        toggleSnackbar: (snackbarOpen, variant = "info", message = "Input message here") => {
            dispatch(toggleSnackbar(snackbarOpen, variant, message));
        },
        storeActionAccess: (data) => {
            dispatch(storeActionAccess(data))
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Comments);
