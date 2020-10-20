import React, { useRef } from 'react'
import { Avatar, Button, Container, CssBaseline, Grid, makeStyles, Typography } from '@material-ui/core'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { MdCloud } from 'react-icons/md'
import * as Yup from 'yup'
import { ValidationError } from 'yup'

import TextField from '../../../components/Form/TextField'
import { Link } from 'react-router-dom'
import AuthService from '../../../services/AuthService'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import HttpsResponse from '../../../models/HttpsResponse'
import { useHistory } from 'react-router-dom'

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

export const ForgotPassword: React.FC = () => {
  const classes = useStyles()
  const formRef = useRef<FormHandles | null>(null)
  const history = useHistory()

  async function handleSubmit(data: { email: string }) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().required('O email é obrigatório.').email('Digite um e-mail valido.')
      })
      await schema.validate(data, { abortEarly: false })
      formRef?.current?.setErrors({})
      AuthService.forgotPass(data.email)
        .then(res => {
          toast.success(`📬 Verifique seu email!`, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          })
          history.push('reset-pass')
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
          Esqueceu a senha?
        </Typography>
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
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Redefinir
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/reset-pass">Inserir token de reset.</Link>
            </Grid>
            <Grid item>
              <Link to="/">{'Voltar ao login!'}</Link>
            </Grid>
          </Grid>
        </Form>
      </div>
    </Container>
  )
}

export default ForgotPassword
