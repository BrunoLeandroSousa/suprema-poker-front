import React, {useState, useEffect} from 'react';
import axios from 'axios'
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
import { Button } from '@material-ui/core';

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

const saldoDivStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: '10rem',
  backgroundColor: 'green',
  color: 'white',
  padding: '1rem',
  borderRadius: '0.4rem',
}

const saldoNumberStyles = {
  fontSize: '2rem',
  margin: '0rem'
}

function TableTransactions() {
  const [myTransactions, setMyTransactions] = useState([]);
  const [saldo, setSaldo] = useState([]);
  
  useEffect(() => {
    const sessionLocal = localStorage.getItem('session');
    const session = JSON.parse(sessionLocal);
    const axiosConfig = {
      headers: { Authorization: `Bearer ${session.token}`, 'Content-Type': 'application/json' }
    };

    (async function setTransactionsAndSaldo(){
      await axios.get(
        `https://suprema-poker-api.herokuapp.com/receivedtransactions/${session.user.id}`, 
        axiosConfig
      ).then(response=>setMyTransactions(response.data))
      .catch( error=> toast.error('verifique se o email ja foi cadastrado, cpf utilizado ou nome.'));

      await axios.get(
        `https://suprema-poker-api.herokuapp.com/showuserid/${session.user.id}`, 
        axiosConfig
      ).then(response=>setSaldo(response.data.saldo))
    })();
  },[]);

  const refreshTransactions = ()=>{
    const sessionLocal = localStorage.getItem('session');
    const session = JSON.parse(sessionLocal);
    const axiosConfig = {
      headers: { Authorization: `Bearer ${session.token}`, 'Content-Type': 'application/json' }
    };
    
    (async function setTransactions(){
      await axios.get(
        `https://suprema-poker-api.herokuapp.com/receivedtransactions/${session.user.id}`, 
        axiosConfig
      ).then(response=>setMyTransactions(response.data))
      .catch( error=> toast.error('verifique se o email ja foi cadastrado, cpf utilizado ou nome.'));

      await axios.get(
        `https://suprema-poker-api.herokuapp.com/showuserid/${session.user.id}`, 
        axiosConfig
      ).then(response=>setSaldo(response.data.saldo))
    })();
  }

  const classes = useStyles();

  return (
    <>
      <ToastContainer/>
      <TableContainer style={{maxWidth: '50rem', margin: '0 auto'}}component={Paper}>
        <div style={{display:'flex'}}>
          <Button 
          variant="contained" 
          color="secondary" 
          onClick={()=>refreshTransactions()}
          > 
          Atualizar transações
          </Button>
          
          <div style={saldoDivStyles}>
            saldo 
            <p style={saldoNumberStyles}>{formatPrice(saldo)}</p> 
          </div>
        </div>
        
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