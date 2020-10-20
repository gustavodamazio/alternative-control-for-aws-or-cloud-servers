import React, { useRef } from 'react'
import { Avatar, Button, Container, CssBaseline, FormControlLabel, Grid, makeStyles } from '@material-ui/core'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { MdCloud } from 'react-icons/md'
import * as Yup from 'yup'
import { ValidationError } from 'yup'

import TextField from '../../../components/Form/TextField'
import Checkbox from '../../../components/Form/Checkbox'
import { useAuth } from '../../../contexts/auth'
import { AxiosError } from 'axios'
import HttpsResponse from '../../../models/HttpsResponse'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

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
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

export const SingIn: React.FC = () => {
  const classes = useStyles()
  const authContext = useAuth()
  const formRef = useRef<FormHandles | null>(null)

  async function handleSubmit(data: { email: string; password: string; remember: boolean }) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().required('O email é obrigatório.').email('Digite um e-mail valido.'),
        password: Yup.string().required('A senha é obrigatória.').min(8, 'Mínimo de 8 caracteres.'),
        remember: Yup.boolean()
      })
      await schema.validate(data, { abortEarly: false })
      formRef?.current?.setErrors({})
      authContext
        .SingIn(data.email, data.password, data.remember)
        .then(res => {
          toast.success(`🚀 Bem vindo ${res.name}!`, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          })
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
        <Form ref={formRef} onSubmit={handleSubmit} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox name="remember" value="remember" color="primary" />}
            label="Manter conectado"
          />
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Entrar
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/forgot-pass">
                Esqueceu a senha?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/sing-up">
                {'Não tem conta? Cadastre se!'}
              </Link>
            </Grid>
          </Grid>
        </Form>
      </div>
    </Container>
  )
}

export default SingIn
