import React from 'react'
import { Textarea, TextAreaProps } from '@heroui/react'
import { inputStyles } from '../textinput/TextInput.component'

const textAreaStyles = {
  ...inputStyles,
  inputWrapper: [...(inputStyles.inputWrapper as string[]), '!h-auto py-4! mt-2'],
}

const TextAreaInput = React.forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  return <Textarea ref={ref} classNames={textAreaStyles} labelPlacement="outside" minRows={6} {...props} />
})

TextAreaInput.displayName = 'TextAreaInput'

export default TextAreaInput
