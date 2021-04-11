import React, { useState, useEffect} from 'react';
import axios from 'axios'
import {ToastContainer, toast, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Grid, Paper, Avatar, TextField, Button } from '@material-ui/core';
import Link from 'next/link';

function MadeTransaction() {
  const [session, setSession] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  
  useEffect(() => {
    const sessionLocal = localStorage.getItem('session');
    const session = JSON.parse(sessionLocal);
    setSession(session);
  },[]);

  const createTransaction = async (event) => {
    console.log('teste')
    event.preventDefault();

    let formData = {
      cpf: event.target[0].value,
      valueTransaction: event.target[1].value,
    }

    console.log(formData);
    
    const axiosConfig = {
      headers: { Authorization: `Bearer ${session.token}`, 'Content-Type': 'application/json' }
    };

    /*minha requisição de login*/
    await axios.post(
      'http://localhost:3333/createtransaction',
      { 
        playerTransactionOwner: session.user.id,
        destinyPlayerCpf:formData.cpf,
        transactionValue: parseFloat(formData.valueTransaction),
        transactionStatus: 'concluída'
      },
      axiosConfig
    ).then(res=>{
      const objectData = res.data;
      if(objectData){
        toast.success('Transação concluída com sucesso');
      }
    }).catch(error=> toast.error('Cpf não cadastrado ou voce não tem saldo o suficiente'));
  }
  

  const paperStyle = {
    padding: 40, 
    width:350, 
    margin:"20px auto", 
    display:"flex", 
    flexDirection: "column",
  }

  const avatarStyle = {
    backGroundColor:'1bbd7e'
  }

  const button={
    marginTop: '2rem',
  }

  const input={
    marginTop: '2rem',
  }

  const createAccountLink={
    margin: '0 auto',
    marginTop: '2rem'
  }

  const hiddeButton = (e)=>{

  }
  return (
    <Grid>
      <ToastContainer/>
      <form id="createUserForm" onSubmit={createTransaction}>
        <Paper elevation={10} style={paperStyle}>
          <Grid align='center'>
            <Avatar style={avatarStyle}><img src="/logo-suprema.png" alt=""/></Avatar>
            <h2>Faça uma transferência</h2>
          </Grid>
            <TextField label='cpf' placeholder='O cpf do player' required/>
            <TextField style={input} label='valor' placeholder='Digite o valor da transação' type='number' required/>

          <Button 
           type='submit' 
           form="createUserForm" style={button} 
           variant="contained"
           style={{ display: (buttonDisabled ? 'block' : 'none'), marginTop: '1rem' }}
           color='primary'
           onClick={()=>setButtonDisabled(false)}
          >Fazer Transferência</Button>

          <Button 
           form="createUserForm" style={button} 
           variant="contained" 
           color='primary'
           onClick={()=>setButtonDisabled(true)}
          >Fazer outra Transferência</Button>

          <Link href="/dashboard/">
            <a style={createAccountLink}href="">Voltar para a dashboard</a>
          </Link>
        </Paper>
      </form>
    </Grid>
  );
}

export default MadeTransaction;