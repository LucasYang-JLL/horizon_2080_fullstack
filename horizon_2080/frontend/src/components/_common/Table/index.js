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
        width: "150px"
    },
    tableWrapper: {
        overflowX: "auto"
    },
    toolbar: theme.mixins.toolbar
});

let counter = 0;
function createData(name, calories, fat, carbs, protein) {
    counter += 1;
    return { id: counter, name, calories, fat, carbs, protein };
}

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
        orderBy: "calories",
        selected: [],
        data: [
            createData("Cupcake", 305, 3.7, 67, 4.3),
            createData("Donut", 452, 25.0, 51, 4.9),
            createData("Eclair", 262, 16.0, 24, 6.0),
            createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
            createData("Gingerbread", 356, 16.0, 49, 3.9),
            createData("Honeycomb", 408, 3.2, 87, 6.5),
            createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
            createData("Jelly Bean", 375, 0.0, 94, 0.0),
            createData("KitKat", 518, 26.0, 65, 7.0),
            createData("Lollipop", 392, 0.2, 98, 0.0),
            createData("Marshmallow", 318, 0, 81, 2.0),
            createData("Nougat", 360, 19.0, 9, 37.0),
            createData("Oreo", 437, 18.0, 63, 4.0)
        ],
        page: 0,
        rowsPerPage: 5
    };

    componentDidMount() {
        axios
            .get(this.props.endpoint)
            .then(function(response) {
                // handle success
                console.log(response);
            })
            .catch(function(error) {
                // handle error
                console.log(error);
            })
            .then(function() {
                // always executed
            });
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
        console.log(this.props, id);
        this.props.slideDirection("left");
        this.props.history.push(`${this.props.match.path}/${id}`);
        // if (selectedIndex === -1) {
        //     newSelected = newSelected.concat(selected, id);
        // } else if (selectedIndex === 0) {
        //     newSelected = newSelected.concat(selected.slice(1));
        // } else if (selectedIndex === selected.length - 1) {
        //     newSelected = newSelected.concat(selected.slice(0, -1));
        // } else if (selectedIndex > 0) {
        //     newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        // }
        // this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = (id) => this.state.selected.indexOf(id) !== -1;

    render() {
        const { classes } = this.props;
        const { slideState } = this.props.reduxState;
        const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        // console.log(this.props);
        return (
            <Slide direction={slideState} in mountOnEnter unmountOnExit>
                <Paper className={classes.root}>
                    <EnhancedTableToolbar numSelected={selected.length} />
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table} padding="dense" aria-labelledby="tableTitle">
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
                                            <TableRow hover onClick={(event) => this.handleClick(event, n.id)} role="checkbox" aria-checked={isSelected} tabIndex={-1} key={n.id} selected={isSelected}>
                                                {/* <TableCell padding="checkbox">
                                                <Checkbox checked={isSelected} />
                                            </TableCell> */}
                                                <TableCell className={classes.tableCell} component="th" scope="row">
                                                    {n.name}
                                                </TableCell>
                                                <TableCell className={classes.tableCell} numeric>
                                                    {n.calories}
                                                </TableCell>
                                                <TableCell className={classes.tableCell} numeric>
                                                    {n.fat}
                                                </TableCell>
                                                <TableCell className={classes.tableCell} numeric>
                                                    {n.carbs}
                                                </TableCell>
                                                <TableCell className={classes.tableCell} numeric>
                                                    {n.protein}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 49 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <TablePagination
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

EnhancedTable = withStyles(styles)(EnhancedTable);

export default EnhancedTable;
