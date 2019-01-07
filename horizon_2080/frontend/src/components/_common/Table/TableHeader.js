import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Tooltip from "@material-ui/core/Tooltip";

const rows = [
    { id: "urgent", numeric: false, disablePadding: true, label: "urgency" },
    { id: "name", numeric: false, disablePadding: true, label: "Target Name" },
    { id: "description", numeric: false, disablePadding: true, label: "Target Description" },
    { id: "critical_flag", numeric: false, disablePadding: true, label: "20%" },
    // { id: "event_count", numeric: false, disablePadding: true, label: "Event(Completed/Total)" },
    { id: "completion_status", numeric: false, disablePadding: true, label: "Completion Status" },
    // { id: "countable", numeric: false, disablePadding: true, label: "Countable" },
    { id: "expire_date", numeric: false, disablePadding: true, label: "Expire Date" },
    { id: "created_by", numeric: false, disablePadding: true, label: "Created By" }
];

const styles = {
    head: { padding: "0 24px" }
};

class EnhancedTableHead extends React.Component {
    createSortHandler = (property) => (event) => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount, classes } = this.props;

        return (
            <TableHead>
                <TableRow>
                    {/* <TableCell padding="checkbox">
                        <Checkbox indeterminate={numSelected > 0 && numSelected < rowCount} checked={numSelected === rowCount} onChange={onSelectAllClick} />
                    </TableCell> */}
                    <FormattedMessage id={`${this.props.title}.table.label`}>
                        {(title) => {
                            let titleArr = title.split(",");
                            return titleArr.map((title, index) => {
                                return (
                                    <TableCell classes={{ head: classes.head }} key={rows[index].id} numeric={rows[index].numeric} sortDirection={orderBy === rows[index].id ? order : false}>
                                        <Tooltip title="Sort" placement={rows[index].numeric ? "bottom-end" : "bottom-start"} enterDelay={300}>
                                            <TableSortLabel active={orderBy === rows[index].id} direction={order} onClick={this.createSortHandler(rows[index].id)}>
                                                {title}
                                            </TableSortLabel>
                                        </Tooltip>
                                    </TableCell>
                                );
                            });
                        }}
                    </FormattedMessage>
                    {/* {rows.map((row) => {
                        return (
                            <TableCell key={row.id} numeric={row.numeric} sortDirection={orderBy === row.id ? order : false}>
                                <Tooltip title="Sort" placement={row.numeric ? "bottom-end" : "bottom-start"} enterDelay={300}>
                                    <TableSortLabel active={orderBy === row.id} direction={order} onClick={this.createSortHandler(row.id)}>
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)} */}
                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
};
export default withStyles(styles)(EnhancedTableHead);
