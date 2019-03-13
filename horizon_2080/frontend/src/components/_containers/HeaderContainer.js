import { connect } from "react-redux";
import { selectLanguage, slideDirection, saveUserID, updateActivityBadgeCount, updateActionBadgeCount, updateCommentBadgeCount } from "../_actions/header";
import Header from "../Header";

// redux provided wrapper to map state to props
const mapStateToProps = (state) => {
    return {
        reduxState: state
    };
};

// redux provided wrapper to map dispatch to props
const mapDispatchToProps = (dispatch) => {
    return {
        selectLanguage: (value) => {
            dispatch(selectLanguage(value));
        },
        slideDirection: (value) => {
            dispatch(slideDirection(value));
        },
        saveUserID: (id) => {
            dispatch(saveUserID(id));
        },
        updateActivityBadgeCount: (count) => {
            dispatch(updateActivityBadgeCount(count))
        },
        updateActionBadgeCount: (count) => {
            dispatch(updateActionBadgeCount(count))
        },
        updateCommentBadgeCount: (count) => {
            dispatch(updateCommentBadgeCount(count))
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
