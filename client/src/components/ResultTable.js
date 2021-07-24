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
                    <TableCell align="left">Url</TableCell>
                    <TableCell align="center">Title</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {tableData.map((row, index) => {
                    if (row.FirstURL) {
                        return <TableRow key={row.FirstURL + index}>
                            <TableCell className={'url'}>
                                <a href={row.FirstURL}>{row.FirstURL}</a>
                            </TableCell>
                            <TableCell className={'title'} align={'right'} >{row.Text}</TableCell>
                        </TableRow>
                    } else if (row.Topics) {
                        return row.Topics.map((topic, index) => {
                            if (topic.FirstURL) {
                                return <TableRow key={topic.FirstURL + index}>
                                    <TableCell className={'url'}>
                                        <a href={topic.FirstURL}>{topic.FirstURL}</a>
                                    </TableCell>
                                    <TableCell className={'title'} align="right" >{topic.Text}</TableCell>
                                </TableRow>;
                            }
                        })}
                })}
            </TableBody>
        </Table>
    </TableContainer>;
}

export default ResultTable;