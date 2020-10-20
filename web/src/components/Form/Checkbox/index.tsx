import React, { useRef, useEffect } from 'react'

import { Checkbox as BaseCheckbox } from '@material-ui/core'
import { useField } from '@unform/core'

import { CheckboxProps } from './types'
import { printWarning } from '../../debug/debug'

const Checkbox: React.FC<CheckboxProps> = ({ name, defaultChecked, ...restProps }) => {
  if (!name) {
    printWarning('Checkbox component must have a `name` property for correctly working.')
  }

  const inputRef = useRef(null)
  const { fieldName, defaultValue = false, registerField } = useField(name)

  useEffect(() => {
    if (fieldName) {
      registerField({
        name: fieldName,
        ref: inputRef.current,
        path: 'checked'
      })
    }
  }, [fieldName, registerField])

  return (
    <BaseCheckbox
      {...restProps}
      name={name}
      defaultChecked={Boolean(defaultValue) || Boolean(defaultChecked)}
      inputRef={inputRef}
    />
  )
}

export default React.memo(Checkbox)
