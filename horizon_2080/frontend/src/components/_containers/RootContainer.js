import React, { Fragment, Component } from "react";
import App from "../../App";
import CssBaseline from "@material-ui/core/CssBaseline";
import { injectIntl, IntlProvider, FormattedRelative } from "react-intl";
import { connect } from "react-redux";
import { addLocaleData } from "react-intl";
import en from "react-intl/locale-data/en";
import fr from "react-intl/locale-data/fr";
import es from "react-intl/locale-data/es";
import zh from "react-intl/locale-data/zh";

const mapStateToProps = (state) => {
    return {
        reduxState: state
    };
};

addLocaleData([...en, ...fr, ...es, ...zh]);

const translationConfig = {
    locale: "en-US",
    messages: {
        en: {
            "header.drawers": `Performance, Events, Comments / Reply, Actions, Settings`,
            "navigation.performance.title": `Target, Details`,
            "navigation.comments.title": `My Comments`,
            "tab.comments.title": "Comments, Actions",
            "tab.details.title": "Summary, Event, Sub Target",
            "details.field.target_name": "Target Name",
            "details.field.target_description": "Target Description",
            "details.field.start_date": "Start Date",
            "details.field.expire_date": "Expire Date",
            "details.field.created_by": "Created By",
        },
        zh: {
            "header.drawers": "性能, 活动, 留言 / 回复, 笔记, 设置",
            "navigation.performance.title": `目标, 详细`,
            "navigation.comments.title": `我的留言`,
            "tab.comments.title": "留言, 笔记",
            "tab.details.title": "概括, 活动, 子目标",
            "details.field.target_name": "目标名称",
            "details.field.target_description": "目标详情",
            "details.field.start_date": "开始日期",
            "details.field.expire_date": "结束日期",
            "details.field.created_by": "创造者",
        }
    }
};

class RootContainer extends Component {
    render() {
        let { language } = this.props.reduxState;
        return (
            <IntlProvider locale={translationConfig.locale} messages={translationConfig.messages[language]}>
                <Fragment>
                    <CssBaseline />
                    <App />
                </Fragment>
            </IntlProvider>
        );
    }
}
export default connect(mapStateToProps)(RootContainer);
