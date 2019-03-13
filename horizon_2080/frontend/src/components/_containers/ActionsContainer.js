import { connect } from "react-redux";
import { updateActionBadgeCount } from "../_actions/header";
import Actions from "../Actions";

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
        updateActionBadgeCount: (count) => {
            dispatch(updateActionBadgeCount(count))
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Actions);
