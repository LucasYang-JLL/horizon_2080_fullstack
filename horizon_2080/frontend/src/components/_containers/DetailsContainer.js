import { connect } from "react-redux";
import Details from "../sub_components/Details";
import { slideDirection } from "../_actions/header";
import { toggleEditButton, handleDataChange, storeData } from "../_actions/performance";

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
        storeData: (data) => {
            dispatch(storeData(data))
        },
        handleDataChange: (name, value) => {
            dispatch(handleDataChange(name, value))
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Details);
