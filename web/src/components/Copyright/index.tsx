import { Link, Typography } from '@material-ui/core'
import React from 'react'

const Copyright: React.FC<{ align?: 'center' | 'inherit' | 'left' | 'right' | 'justify' | undefined }> = props => {
  return (
    <Typography variant="body2" color="textSecondary" align={props.align}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/gustavodamazio/alternative-control-for-aws-or-cloud-servers">
        AWS machines
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default Copyright
