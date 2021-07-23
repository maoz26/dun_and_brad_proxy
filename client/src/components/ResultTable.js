import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const ResultTable = (props) => {
    const {
        tableData,
    } = props;

    const classes = useStyles();

    return <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell align="right">Url</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {tableData.map((row) => {
                    if (row.FirstURL) {
                        return <TableRow key={row.Text}>
                            <TableCell component="th" scope="row">{row.Text}</TableCell>
                            <TableCell align="right">{row.FirstURL}</TableCell>
                        </TableRow>
                    } else if (row.Topics) {
                        return row.Topics.map((topic) => {
                            if (topic.FirstURL) {
                                return <TableRow key={row.Text}>
                                    <TableCell scope="row">{topic.Text}</TableCell>
                                    <TableCell align="right">{topic.FirstURL}</TableCell>
                                </TableRow>;
                            }
                        })}
                })}
            </TableBody>
        </Table>
    </TableContainer>;
}

export default ResultTable;