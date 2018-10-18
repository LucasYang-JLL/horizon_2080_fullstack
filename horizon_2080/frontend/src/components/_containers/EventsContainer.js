import { connect } from "react-redux";
import Events from "../Events";

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
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Events);
