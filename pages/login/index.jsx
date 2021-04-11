import React from 'react';
import axios from 'axios'
import {ToastContainer, toast, zoom, Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Grid, Paper, Avatar, TextField, Button } from '@material-ui/core';
import { userSchema } from '../validations/loginValidation';
import { useRouter } from 'next/router'
import Link from 'next/link';

function Login(props) {
  const router = useRouter();
 
  const loginUser = async (event) => {
    event.preventDefault();

    let formData = {
      email: event.target[0].value,
      password: event.target[1].value,
    }

    console.log(formData);
    const isValid = await userSchema.isValid(formData);
    
    if(!isValid){
      toast.error('preencha o formulário corretamente');
    }

    /*minha requisição de login*/
    await axios.post(
      'http://localhost:3333/session',
      formData,
    ).then(res=>{
      const objectData = res.data;
      if(objectData){
        console.log(objectData)
        if (typeof window !== "undefined") {
          localStorage.setItem('session', JSON.stringify(objectData))
        }
        router.push('/');
      }
    }).catch(error=> toast.error('email ou senha incorretos'));
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

  const createAccountLink={
    margin: '0 auto',
    marginTop: '2rem'
  }

  return (
    <Grid>
      <ToastContainer/>
      <form id="createUserForm" onSubmit={loginUser}>
        <Paper elevation={10} style={paperStyle}>
          <Grid align='center'>
            <Avatar style={avatarStyle}><img src="/logo-suprema.png" alt=""/></Avatar>
            <h2>Digite suas credenciais</h2>
          </Grid>
            <TextField lavel='email' placeholder='Digite um email' fullwidth="true" required/>
            <TextField style={input} lavel='password' placeholder='escolha uma senha' type='password' fullwidth="true" required/>
          <Button type='submit' form="createUserForm" style={button} variant="contained" color='primary'>Entrar</Button>
          <Link href="/createAccount/">
            <a style={createAccountLink}href="">Ainda não se cadastrou? Clique aqui</a>
          </Link>
        </Paper>
      </form>
    </Grid>
  );
}

export default Login;