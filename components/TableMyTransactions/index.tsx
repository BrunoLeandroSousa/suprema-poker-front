import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { TableMyTransactions } from './styles';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { formatPrice } from '../../utils/format';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function TableTransactions() {
  const [myTransactions, setMyTransactions] = useState([]);

  useEffect(() => {
    const sessionLocal = localStorage.getItem('session');
    const session = JSON.parse(sessionLocal);
    const axiosConfig = {
      headers: { Authorization: `Bearer ${session.token}`, 'Content-Type': 'application/json' }
    };

    /* puxando transações recebidas */
    (async function setTransactions(){
      await axios.get(
        `http://localhost:3333/receivedtransactions/${session.user.id}`, 
        axiosConfig
      ).then(response=>setMyTransactions(response.data))
      .catch( error=> toast.error('verifique se o email ja foi cadastrado, cpf utilizado ou nome.'));
    })();
  },[myTransactions]);

  const classes = useStyles();

  return (
    <>
      <ToastContainer/>
      <TableContainer style={{maxWidth: '50rem', margin: '0 auto'}}component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Recebido de</StyledTableCell>
              <StyledTableCell align="left">valor da transação</StyledTableCell>
              <StyledTableCell align="left">data da transaferência</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myTransactions.map((transaction) => (
              <StyledTableRow key={transaction.id}>
                <StyledTableCell align="left">{transaction.originPlayerName}</StyledTableCell>
                <StyledTableCell align="left"style={{color:'green'}}>{formatPrice(transaction.transactionValue)}</StyledTableCell>
                <StyledTableCell align="left">{transaction.created_at}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default TableTransactions;