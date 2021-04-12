import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { TableMyTransactions } from './styles';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Button } from '@material-ui/core';
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
import { useRouter } from 'next/router'

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
  const router = useRouter();
  useEffect(() => {
    const sessionLocal = localStorage.getItem('session');
    const session = JSON.parse(sessionLocal);
    const axiosConfig = {
      headers: { Authorization: `Bearer ${session.token}`, 'Content-Type': 'application/json' }
    };

    if(axios == undefined){
      router.push('/login');
    }

    (async function setTransactions(){
      await axios.get(
        `https://suprema-poker-api.herokuapp.com/madetransactions/${session.user.id}`, 
        axiosConfig
      ).then(response=>setMyTransactions(response.data))
      .catch( error=> toast.error('Você não recebeu nenhuma transação ainda'));
    })();
  },[]);

  async function setTransactions(){
    const sessionLocal = localStorage.getItem('session');
    const session = JSON.parse(sessionLocal);
    const axiosConfig = {
      headers: { Authorization: `Bearer ${session.token}`, 'Content-Type': 'application/json' }
    };

    await axios.get(
      `https://suprema-poker-api.herokuapp.com/madetransactions/${session.user.id}`, 
      axiosConfig
    ).then(response=>setMyTransactions(response.data))
    .catch( error=> toast.error('Você não recebeu nenhuma transação ainda'));
  }

  const deleteTransaction = async (transactioId)=>{
    const sessionLocal = localStorage.getItem('session');
    const session = JSON.parse(sessionLocal);
    const axiosConfig = {
      headers: { Authorization: `Bearer ${session.token}`, 'Content-Type': 'application/json' }
    };
    await axios.delete(
    `https://suprema-poker-api.herokuapp.com/canceltransaction/${transactioId}`, 
      axiosConfig
    ).then(res=>{
    }).catch(error=>toast.error(error));
    await setTransactions()
  } 

  const classes = useStyles();

  return (
      <>
      <ToastContainer/>
        <TableContainer style={{maxWidth: '50rem', margin: '0 auto'}}component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">Você</StyledTableCell>
                  <StyledTableCell align="left">valor da transação</StyledTableCell>
                  <StyledTableCell align="left">data da transaferência</StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {myTransactions.map((transaction) => (
                  <StyledTableRow key={transaction.id}>
                    <StyledTableCell align="left">{transaction.originPlayerName}</StyledTableCell>
                    <StyledTableCell align="left"style={{color:'green'}}>{formatPrice(transaction.transactionValue)}</StyledTableCell>
                    <StyledTableCell align="left">{transaction.created_at}</StyledTableCell>
                    <StyledTableCell align="left">
                
                      <Button
                        onClick={()=>deleteTransaction(transaction.id)}
                        variant="contained" color="secondary"
                      >
                        Deletar transação
                      </Button>
                
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      </>
    );
}

export default TableTransactions;