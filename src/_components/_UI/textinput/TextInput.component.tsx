import React from 'react'
import { Input, InputProps } from '@heroui/react'

export const inputStyles = {
  label: '!text-white font-semibold text-t-20 pb-2 px-6',
  inputWrapper: [
    'bg-zinc',
    'rounded-large',
    'h-14',
    'border-none',
    'transition-colors duration-300',
    'data-[hover=true]:!bg-white',
    'group-data-[focus=true]:!bg-white',
    'group-data-[invalid=true]:!bg-zinc',
    'group-data-[invalid=true]:group-data-[focus=true]:!bg-white',
    'group-data-[invalid=true]:data-[hover=true]:!bg-white',
  ],
  input: ['text-white', 'text-t-20', 'px-6', 'group-data-[hover=true]:!text-black', 'group-data-[focus=true]:!text-black', 'placeholder:text-gray-500'],
  errorMessage: ['!text-t-15', 'px-6', 'text-danger', 'mt-2'],
}

const TextInput = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <Input ref={ref} classNames={inputStyles} labelPlacement="outside" {...props} />
})

TextInput.displayName = 'TextInput'

export default TextInput
