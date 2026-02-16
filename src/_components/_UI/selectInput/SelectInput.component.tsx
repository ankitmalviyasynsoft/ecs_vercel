import React from 'react'
import { Select, SelectProps } from '@heroui/react'

export const selectStyles = {
  label: '!text-white font-semibold text-t-20 pb-2 px-6',
  trigger: [
    'group',
    'bg-zinc',
    'rounded-3xl',
    'h-14',
    'border-none',
    'transition-colors duration-300',
    'data-[hover=true]:bg-white',
    'data-[open=true]:bg-white',
    'data-[focus=true]:bg-white',
    'data-[hover=true]:text-black',
    'data-[open=true]:text-black',
    'data-[focus=true]:text-black',
    'group-data-[invalid=true]:!bg-zinc',
    'group-data-[invalid=true]:data-[hover=true]:!bg-white',
    'group-data-[invalid=true]:data-[open=true]:!bg-white',
    'group-data-[invalid=true]:data-[focus=true]:!bg-white',
    'group-data-[invalid=true]:data-[hover=true]:!text-black',
    'group-data-[invalid=true]:data-[open=true]:!text-black',
    'group-data-[invalid=true]:data-[focus=true]:!text-black',
  ],
  value: ['text-white', 'text-t-20', 'px-3', 'group-data-[hover=true]:!text-black', 'group-data-[open=true]:!text-black', 'group-data-[focus=true]:!text-black'],
  popoverContent: 'bg-white text-black',
  errorMessage: ['!text-t-15', 'px-6'],
}

// NOTE: Replace it with actual icon
function SelectDownArrowIcon() {
  return (
    <svg viewBox="0 0 24.00 24.00" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M12 7L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>{' '}
        <path d="M8 13L12 17L16 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>{' '}
      </g>
    </svg>
  )
}

const SelectInput = React.forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  return <Select ref={ref} classNames={selectStyles} labelPlacement="outside" selectorIcon={<SelectDownArrowIcon />} {...props} />
})

SelectInput.displayName = 'SelectInput'

export default SelectInput
