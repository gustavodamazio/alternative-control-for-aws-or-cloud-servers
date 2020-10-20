import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Link as RouterLink } from 'react-router-dom'
import Copyright from '../../../components/Copyright'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2)
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800]
  }
}))

export default function NotFound() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container component="main" className={classes.main} maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom>
          Oops!
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {'404 - PAGINA NÃO ENCONTRADA'}
        </Typography>
        <Typography variant="body1">
          A página que você está procurando pode ter sido removida devido a mudança de nome ou está temporariamente
          indisponível.
        </Typography>
        <RouterLink to="/">Voltar ao inicio</RouterLink>
      </Container>
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1">Gerenciador alternativo para maquinas AWS.</Typography>
          <Copyright />
        </Container>
      </footer>
    </div>
  )
}
