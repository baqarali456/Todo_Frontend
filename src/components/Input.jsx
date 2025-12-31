import React, { useId } from "react"


function Input(
    {
        type="text",
        label="",
        ...props
    },ref

) {

    const id = useId();

  return (
    <div className=' mb-2'>
       <label  className="mb-1 block" htmlFor={id}>{label}</label>
       <input
       className="rounded w-full shadow p-3 focus:ring border border-gray-300"
       ref={ref}
       type={type}
       {...props}
        id={id} />

    </div>
  )
}

export default React.forwardRef(Input)