import React from 'react'

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

export default function Section({ children, className = '', ...props }: SectionProps) {
  return (
    <section className={`container px-4 md:px-8 py-[1rem] md:py-[3rem] ${className}`} {...props}>
      {children}
    </section>
  )
}
