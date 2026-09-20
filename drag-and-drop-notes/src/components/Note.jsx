import React, { forwardRef } from 'react'

const Note = forwardRef(({content,initialPos, ...props}, ref) => {
  return (
    <div 
        ref={ref}
        className='absolute border border-black select-none p-4 w-65 cursor-move bg-yellow-100'
        style={{ top: initialPos?.y, left: initialPos?.x }} 
        {...props}
    >
      {content}
    </div>
  )
})

export default Note
