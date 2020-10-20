import React, { useRef } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { MdCloud } from 'react-icons/md'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'

import TextField from '../../../components/Form/TextField'
import { ValidationError } from 'yup'
import AuthService from '../../../services/AuthService'
import { AxiosError } from 'axios'
import HttpsResponse from '../../../models/HttpsResponse'
import { toast } from 'react-toastify'
import { useAuth } from '../../../contexts/auth'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    width: 60,
    height: 60,
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

const SignUp: React.FC = () => {
  const classes = useStyles()
  const formRef = useRef<FormHandles | null>(null)
  const authContext = useAuth()
  async function handleSubmit(data: { name: string; email: string; password: string }) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().required('O email é obrigatório.').email('Digite um e-mail valido.'),
        password: Yup.string().required('A senha é obrigatória.').min(8, 'Mínimo de 8 caracteres.'),
        name: Yup.string().required('O nome é obrigatório.')
      })
      await schema.validate(data, { abortEarly: false })
      formRef?.current?.setErrors({})
      AuthService.singUp(data.name, data.email, data.password)
        .then(res => {
          toast.success(`🚀 Bem vindo ${res.data.details.user.name}!`, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          })

          authContext.SingIn('', '', true, res.data.details)
        })
        .catch((err: AxiosError<HttpsResponse>) => {
          toast.error(`😕 ${err.response?.data.message}`, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          })
        })
    } catch (err) {
      if (err instanceof ValidationError) {
        const errorMessages: { [key: string]: string } = {}
        err.inner.forEach(error => {
          errorMessages[error.path] = error.message
        })
        formRef?.current?.setErrors(errorMessages)
      }
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <MdCloud size={40} />
        </Avatar>
        <Typography component="h1" variant="h5">
          Cadastre-se
        </Typography>
        <Form ref={formRef} onSubmit={handleSubmit} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Nome"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Cadastrar
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/">Já tem uma conta? faca login.</Link>
            </Grid>
          </Grid>
        </Form>
      </div>
    </Container>
  )
}

export default SignUp
