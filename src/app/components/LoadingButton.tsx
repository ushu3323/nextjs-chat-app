'use client'
import { ButtonHTMLAttributes, MouseEvent } from 'react'

export default function LoadingButton ({
  children,
  onClick,
  isLoading,
  className,
  ...htmlProps
}: ({
  isLoading: boolean,
} & ButtonHTMLAttributes<HTMLButtonElement>)) {
  function handleOnClick (evt: MouseEvent<HTMLButtonElement>) {
    if (onClick) {
      onClick(evt)
    }
  }

  return (
    <button {...htmlProps} onClick={handleOnClick} className={['btn', className, isLoading ? 'loading' : ''].join(' ')}>{children}</button>
  )
}
