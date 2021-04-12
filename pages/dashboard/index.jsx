import React from 'react';
import { useEffect, useState } from 'react'
import { Container, Header, HeaderItens, HeaderMenu, Options } from './styles';
import Link from 'next/link';
import { formatPrice } from '../../utils/format';
import { useRouter } from 'next/router'
import axios from 'axios';
import MyTransactions from '../../components/TableMyTransactions'
import MadeTransaction from '../../components/TableMadeTransactions';
import { Button } from '@material-ui/core';

function HeaderApp() {
  const [infoPlayer, setInfoPlayer] = useState([]);
  const [viewTransactions, setViewTransactions] = useState('myTransactions'); 
  const router = useRouter();
  
  useEffect( async () => {
    const sessionLocal = localStorage.getItem('session');
    const session = JSON.parse(sessionLocal);
    const axiosConfig = {
      headers: { Authorization: `Bearer ${session.token}`, 'Content-Type': 'application/json' }
    };

    await axios.get(
      `https://suprema-poker-api.herokuapp.com/showuserid/${session.user.id}`, 
      axiosConfig
    ).then(response=>setInfoPlayer(response.data))
    .catch( error=> router.push('/login'));
  }, [infoPlayer]);

  const selectViewTransactions = () =>{
    if(viewTransactions=='myTransactions'){
      return(
        <MyTransactions/>
      )
    }
    else{
      return(
        <MadeTransaction/>
      )
    }
  }

  return (
    <>
      <Container>
        <Header>
          <HeaderItens>
            <img src="/logo-suprema.png" alt=""/>
            <HeaderMenu>
              <Link href="/login/">
                <a>MINHA-CONTA</a>
              </Link>
              <Link href="/madeTransaction/">
                <a>TRANSFERÊNCIA</a>
              </Link>
            </HeaderMenu>
          </HeaderItens>
        </Header>
        <Options>
          <Button variant="contained" color="primary" onClick={()=>setViewTransactions('myTransactions')}className="received_transactions">
            <p> Transações Recebidas</p>
          </Button>
          <Button variant="contained" color="primary" onClick={()=>setViewTransactions('transactionsMade')} className="transactions_Made">
            <p> Transações Feitas</p>
          </Button>
          <div >
            <p>SALDO</p>
            <p>{formatPrice(infoPlayer.saldo)}</p>
          </div>
        </Options>
      </Container>
      {selectViewTransactions()}
    </>
  );
}

export default HeaderApp;
