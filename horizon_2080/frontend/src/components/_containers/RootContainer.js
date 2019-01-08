import React, { Fragment, Component } from "react";
import App from "../../App";
import CssBaseline from "@material-ui/core/CssBaseline";
import { injectIntl, IntlProvider, FormattedRelative } from "react-intl";
import { connect } from "react-redux";
import { addLocaleData } from "react-intl";
import en from "react-intl/locale-data/en";
import zh from "react-intl/locale-data/zh";
import { toggleSnackbar } from "../_actions/common";

const mapStateToProps = (state) => {
    return {
        reduxState: state
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        toggleSnackbar: (snackbarOpen, variant = "info", message = "Input message here") => {
            dispatch(toggleSnackbar(snackbarOpen, variant, message));
        }
    };
};

addLocaleData([...en, ...zh]);

const translationConfig = {
    locale: "en-US",
    messages: {
        en: {
            "header.drawers": `Performance, Events, Recent Comments, Actions, Settings`,
            "navigation.performance.title": `Target, Details`,
            "navigation.comments.title": `Recent Comments`,
            "tab.comments.title": "Comments, Actions",
            "tab.details.title": "Summary, Sub Target",
            "details.field.target_name": "Target Name",
            "details.field.target_description": "Target Description",
            "details.field.start_date": "Start Date",
            "details.field.expire_date": "Expire Date",
            "details.field.created_by": "Created By",
            "details.field.importance": "20%",
            "target.table.label": ` ,Name, Description, 20%, Completion, Expire Date, Created By`,
            "target.add.title": "Add New Target",
            "target.creation.message": "Looks like there's no targets. Create a new one now",
            "sub_target.button.add": "Add a task...",
            "folder.field.folder_name": "Folder name",
            "folder.creation.message": "Create new project...",
            "folder.creation.create": "Enter project name",
            "folder.title.self": "My Projects",
            "folder.title.others": "'s Projects",
            "generic.button.submit": "Submit",
            "generic.button.cancel": "Cancel",
            "filterBar.option.department": "Department",
            "filterBar.option.user": "Users",
            "event.title.description": "Write some notes for this task",
            "event.button.add": "Add a note...",
            "event.button.close": "Close",
            "recent.title.events": "Recent Updates",
            "recent.title.comments": "Recent Comments",
            "recent.title.actions": "Recent Actions",
            "recent.text.recentUpdates": ` added, Sub-target, posted, Event`,
            "recent.text.recentComments": ` posted, Comment`,
            "comment.text.placeholder": "Enter your comment...",
            "comment.text.welcomeText": "Looks like there's no comments yet. Be the first one to comment!"
        },
        zh: {
            "header.drawers": "行动目标, 备注概览, 留言概览, 执行备忘, 设置",
            "navigation.performance.title": `目标细分, 详细信息`,
            "navigation.comments.title": `我的留言`,
            "tab.comments.title": "留言, 备忘",
            "tab.details.title": "概括, 子目标",
            "details.field.target_name": "目标名称",
            "details.field.target_description": "目标详情",
            "details.field.start_date": "开始日期",
            "details.field.expire_date": "结束日期",
            "details.field.created_by": "创建者",
            "details.field.importance": "20%",
            "target.table.label": ` ,目标名称, 目标详情, 20%, 进展, 结束日期, 创建者`,
            "target.add.title": "创建新的目标",
            "target.creation.message": "看起来还没有目标创立。 添加一个新的吧",
            "sub_target.button.add": "记录行动要点...",
            "folder.field.folder_name": "文件夹",
            "folder.creation.message": "创建新的行动目标...",
            "folder.creation.create": "请输入行动目标的名称",
            "folder.title.self": "我的行动目标",
            "folder.title.others": "的行动目标",
            "generic.button.submit": "提交",
            "generic.button.cancel": "取消",
            "filterBar.option.department": "部门",
            "filterBar.option.user": "用户",
            "event.title.description": "为这个行动要点写些笔记",
            "event.button.add": "添加笔记...",
            "event.button.close": "关闭",
            "recent.title.events": "近期更新",
            "recent.title.comments": "近期留言",
            "recent.title.actions": "近期备忘",
            "recent.text.recentUpdates": ` 添加一条, 行动要点, 记录一条,笔记`,
            "recent.text.recentComments": ` 发布一条 ,留言`,
            "comment.text.placeholder": "输入你的留言...",
            "comment.text.welcomeText": "还没有人留言。发表些观点吧！"
        }
    }
};

class RootContainer extends Component {
    render() {
        let { language, snackbarProp } = this.props.reduxState;
        let { toggleSnackbar } = this.props;
        return (
            <IntlProvider locale={navigator.language} messages={translationConfig.messages[language]}>
                <Fragment>
                    <CssBaseline />
                    <App toggleSnackbar={toggleSnackbar} snackbarProp={snackbarProp} />
                </Fragment>
            </IntlProvider>
        );
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RootContainer);
