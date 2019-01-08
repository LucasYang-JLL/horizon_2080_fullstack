import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import EnhancedTableHead from "./TableHeader";
import EnhancedTableToolbar from "./TableToolbar";
import Slide from "@material-ui/core/Slide";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import Tooltip from "@material-ui/core/Tooltip";
import { FormattedMessage } from "react-intl";
import Checkbox from "@material-ui/core/Checkbox";
import axios from "axios";

const styles = (theme) => ({
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        minWidth: 0 // So the Typography noWrap works
    },
    root: {
        width: "100%",
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3
    },
    table: {
        minWidth: 1020
    },
    tableCell: {
        width: "150px",
        minWidth: "150px"
    },
    tableCellSmall: {
        width: "60px",
        minWidth: "60px"
    },
    tableCellLarge: {
        width: "200px",
        minWidth: "200px"
    },
    tableWrapper: {
        overflowX: "auto"
    },
    toolbar: theme.mixins.toolbar
});

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    // console.log(array);
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function getSorting(order, orderBy) {
    return order === "desc" ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

class EnhancedTable extends React.Component {
    state = {
        order: "asc",
        orderBy: "target_name",
        selected: [],
        data: this.props.data,
        page: 0,
        rowsPerPage: 5
    };

    static getDerivedStateFromProps(prop, state) {
        if (prop.data !== state.data) {
            return { data: prop.data };
        } else return null;
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = "desc";

        if (this.state.orderBy === property && this.state.order === "desc") {
            order = "asc";
        }

        this.setState({ order, orderBy });
    };

    handleSelectAllClick = (event) => {
        if (event.target.checked) {
            this.setState((state) => ({ selected: state.data.map((n) => n.id) }));
            return;
        }
        this.setState({ selected: [] });
    };

    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
        // console.log(this.props, id);
        this.props.slideDirection("left");
        this.props.history.push(`/performance/project/${id}`);
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = (id) => this.state.selected.indexOf(id) !== -1;

    render() {
        const { classes, folderTitle, emptyRecords } = this.props;
        const { slideState } = this.props.reduxState;
        const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        // console.log(this.props);
        return (
            <Slide direction={slideState} in mountOnEnter unmountOnExit>
                <Paper className={classes.root}>
                    <EnhancedTableToolbar folderTitle={folderTitle} numSelected={selected.length} />
                    <div className={classes.tableWrapper}>
                        {data.length > 0 ? (
                            <Table className={classes.table} aria-labelledby="tableTitle">
                                <EnhancedTableHead
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={this.handleSelectAllClick}
                                    onRequestSort={this.handleRequestSort}
                                    rowCount={data.length}
                                    title="target"
                                />

                                <TableBody>
                                    {stableSort(data, getSorting(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((n) => {
                                            const isSelected = this.isSelected(n.id);
                                            return (
                                                <TableRow
                                                    hover
                                                    onClick={(event) => this.handleClick(event, n.id)}
                                                    role="checkbox"
                                                    aria-checked={isSelected}
                                                    tabIndex={-1}
                                                    key={n.id}
                                                    selected={isSelected}
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    <TableCell className={classes.tableCellSmall} padding="dense">
                                                        {n.urgent ? (
                                                            <Tooltip title="Behind Schedule" placement="bottom-start">
                                                                <FiberManualRecord fontSize="small" style={{ color: "#E30613" }} />
                                                            </Tooltip>
                                                        ) : (
                                                            <Tooltip title="On Schedule" placement="bottom-start">
                                                                <FiberManualRecord fontSize="small" style={{ color: "#4CAF50" }} />
                                                            </Tooltip>
                                                        )}
                                                    </TableCell>
                                                    <TableCell className={classes.tableCellLarge} component="th" scope="row">
                                                        {n.name}
                                                    </TableCell>
                                                    <TableCell className={classes.tableCellLarge}>{n.description}</TableCell>
                                                    <TableCell className={classes.tableCell}>{n.critical_flag.toString()}</TableCell>
                                                    {/* <TableCell className={classes.tableCell}>20/40</TableCell> */}
                                                    <TableCell className={classes.tableCell}>{n.progress}%</TableCell>
                                                    {/* <TableCell className={classes.tableCell}>{n.countable_flag.toString()}</TableCell> */}
                                                    <TableCell className={classes.tableCell}>{n.expire_date}</TableCell>
                                                    <TableCell className={classes.tableCell}>{n.created_by_id}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    <TableRow style={{ height: 49 * emptyRows }}>
                                        <TableCell style={{ textAlign: "center" }} colSpan={8} />
                                    </TableRow>
                                </TableBody>
                            </Table>
                        ) : (
                            <div style={{ height: 49 * emptyRows, display: "flex", alignItems: "center", justifyContent: "center", color: "#808080" }}>
                                <FormattedMessage id={"target.creation.message"}>{(msg) => <div style={{ margin: "16px" }}>{msg}</div>}</FormattedMessage>
                            </div>
                        )}
                    </div>
                    <TablePagination
                        labelRowsPerPage=""
                        rowsPerPageOptions={[]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        backIconButtonProps={{
                            "aria-label": "Previous Page"
                        }}
                        nextIconButtonProps={{
                            "aria-label": "Next Page"
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </Paper>
            </Slide>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired
};
EnhancedTable.defaultProps = {
    classes: {}
};

EnhancedTable = withStyles(styles)(EnhancedTable);

export default EnhancedTable;
