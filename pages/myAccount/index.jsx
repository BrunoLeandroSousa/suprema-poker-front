import React from 'react';
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Grid, Paper, Avatar, TextField, Button } from '@material-ui/core';
import { userSchema } from '../validations/userValidation';
import { useRouter } from 'next/router'
import Link from 'next/link';

function CreateAccount(props) {
  const router = useRouter();
  
  const createUser = async (event) => {
    event.preventDefault();
    let formData = {
      email: event.target[0].value,
      name: event.target[1].value,
      cpf: event.target[2].value,
      password: event.target[3].value,
      saldo: 10
    }

    const isValid = await userSchema.isValid(formData);
    
    if(!isValid){
      toast.error('preencha o formulário corretamente');
    }

    await axios.post(
      'https://suprema-poker-api.herokuapp.com/createUser',
      formData,
    ).then(res=>{
      const isObjectData = res.data;
      if(isObjectData){
        toast.success('usuario criado com sucesso');
        router.push('/login');
      }
    }).catch(error=> toast.error('verifique se o email ja foi cadastrado, cpf utilizado ou nome.'));
  }

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

  const input={
    marginTop: '2rem',
  }

  const loginLink={
    margin: '0 auto',
    marginTop: '2rem'
  }

  return (
    <Grid>
      <ToastContainer/>
      <form id="createUserForm" onSubmit={createUser}>
        <Paper elevation={10} style={paperStyle}>
          <Grid align='center'>
            <Avatar style={avatarStyle}><img src="/logo-suprema.png" alt=""/></Avatar>
            <h2>Crie sua conta</h2>
          </Grid>
            <TextField lavel='email' placeholder='Digite um email' fullwidth="true" required/>
            <TextField style={input} placeholder='Digite seu nome completo' fullwidth="true" required/>
            <TextField style={input} placeholder='Digite seu cpf completo' fullwidth="true" required/>
            <TextField style={input} lavel='password' placeholder='escolha uma senha' type='password' fullwidth="true" required/>
          <Button type='submit' form="createUserForm" style={button} variant="contained" color='primary'>Salvar</Button>
          <Button type='submit' form="createUserForm" style={button} variant="contained" color='primary'>Editar</Button>
          <Button type='submit' form="createUserForm" style={button} variant="contained" color='secondary'>Apagar a conta</Button>
          <Link href="/login/">
            <a style={loginLink}href="">Já possui uma conta? faça o login.</a>
          </Link>
        </Paper>
      </form>
    </Grid>
  );
}

export default CreateAccount;