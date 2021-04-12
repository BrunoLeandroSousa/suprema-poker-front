import React, { useState, useEffect} from 'react';
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Grid, Paper, Avatar, TextField, Button } from '@material-ui/core';
import { useRouter } from 'next/router'
import { formatPrice } from '../../utils/format'
import Link from 'next/link';
import { route } from 'next/dist/next-server/server/router';

function CreateAccount(props) {
  const router = useRouter();
  const [myAccountInfos, setMyAccountInfos] = useState([]);
  const [editAccount, setEditAccount] = useState(false);

  /* edit form fields */
  const [ email, setEmail ] = useState([]);
  const [ name, setName ] = useState([]);  

  useEffect(() => {
    const sessionLocal = localStorage.getItem('session');
    const session = JSON.parse(sessionLocal);
    const axiosConfig = {
      headers: { Authorization: `Bearer ${session.token}`, 'Content-Type': 'application/json' }
    };

    /* puxando transações recebidas */
    (async function setTransactions(){
      await axios.get(
        `https://suprema-poker-api.herokuapp.com/showuserid/${session.user.id}`, 
        axiosConfig
      ).then(response=>setMyAccountInfos(response.data));
    })();
  });

  const paperStyle={
    padding: 40, 
    width:350, 
    margin:"20px auto", 
    display:"flex", 
    flexDirection: "column"
  }

  const avatarStyle={
    backGroundColor:'1bbd7e'
  }

  const button={
    marginTop: '2rem',
  }

  const loginLink={
    margin: '0 auto',
    marginTop: '2rem'
  }

  const setNewEmail = (e)=>{
    setEmail(e.target.value);
  }

  const setNewName = (e)=>{
    setName(e.target.value);
  }

  const updateUser = async () => {
    const sessionLocal = localStorage.getItem('session');
    const session = JSON.parse(sessionLocal);
    const axiosConfig = {
      headers: { Authorization: `Bearer ${session.token}`, 'Content-Type': 'application/json' }
    };

    if(axios == undefined){
      router.push('/login');
    }
    
    let formData = {
      email: email,
      name: name,
      cpf: session.user.cpf
    }
    await axios.put(
      `https://suprema-poker-api.herokuapp.com/updateMyAccount/${session.user.id}`,
      formData, 
      axiosConfig
    ).then(toast.success('cadastro alterado com sucesso'));
   
    setEditAccount(false)
  }

  const deleteAccount = async () =>{

    const sessionLocal = localStorage.getItem('session');
    const session = JSON.parse(sessionLocal);
    const axiosConfig = {
      headers: { Authorization: `Bearer ${session.token}`, 'Content-Type': 'application/json' }
    };

    if(axios == undefined){
      router.push('/login');
    }

    await axios.delete(
      `https://suprema-poker-api.herokuapp.com/deletemyaccount/${session.user.id}`,
      axiosConfig
    ).then(router.push('/login'));
  }

  const editAccountFunction = () =>{
    if(editAccount===false){
      return <div>
                <h4>Name: {myAccountInfos.name}</h4>
                <h4>Email: {myAccountInfos.email}</h4>
                <h4>Cpf: {myAccountInfos.cpf}</h4>
                <h4>Saldo: {formatPrice(myAccountInfos.saldo)}</h4>
             </div>
    }
    else{
      return(
        <div style={{margin: '0 auto'}}>
          <TextField onChange={(e) => setNewEmail(e)} lavel='email' placeholder='Digite seu novo email' fullwidth="true" required/>
          <TextField onChange={(e) => setNewName(e)} placeholder='digite seu novo nome' type='password' fullwidth="true" required/>
        </div>
      )
    }
  }
  
  return (
    <Grid>
      <ToastContainer/>
      <form id="createUserForm">
        <Paper elevation={10} style={paperStyle}>
          <Grid align='center'>
            <Avatar style={avatarStyle}><img src="/logo-suprema.png" alt=""/></Avatar>
            <h2>Crie sua conta</h2>
          </Grid>
          {editAccountFunction()}
            <div style={{display: (editAccount ? 'flex' : 'none'), alignItems:'center'}}>

              <Button 
              style={button} 
              variant="contained" 
              color='primary' 
              onClick={()=>setEditAccount(false)}>
                cancelar
              </Button>

              <Button style={button} 
              variant="contained" 
              color='primary'
              style={{marginLeft: '1rem', marginTop: '2rem'}} 
              onClick={()=>updateUser()}
              >
                Salvar
              </Button>

            </div>
            <Button style={button} variant="contained" color='primary' onClick={()=>setEditAccount(true)}>Editar a conta</Button>
            <Button style={button} variant="contained" color='secondary' onClick={()=>deleteAccount()}>Apagar a conta</Button>
          <Link href="/dashboard/">
            <a style={loginLink}href="">Voltar para a dashBoard.</a>
          </Link>
        </Paper>
      </form>
    </Grid>
  );
}

export default CreateAccount;