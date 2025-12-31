import { ReducerType } from '@reduxjs/toolkit'
import React from 'react'

function Button(
   {
    children,
    className="",
    bgColor="bg-blue-500",
    type="button",
    ...props
   }
) {
  return (
    <button type={type} className={`${className} ${bgColor} text-white p-2 rounded my-2 shadow`} {...props}>{children}</button>
  )
}

export default Button