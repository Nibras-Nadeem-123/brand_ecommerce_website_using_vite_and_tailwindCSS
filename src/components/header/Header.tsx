import React from 'react'
import Upper_part from './upper_part'
import Lower_part from './lower_part'

const Header = () => {
  return (
      <div className='absolute h-35.5 w-full'> 
      <Upper_part />  
      <Lower_part />
    </div>
  )
}

export default Header