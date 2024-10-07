import Navbar from '@/components/base/Navbar'
import AddKalesh from '@/components/kalesh/AddKalesh'
import React from 'react'

function dashboard() {
  return (
    <div className='container'>
      <Navbar/>
      <div className='text-end mt-10'>
      <AddKalesh/>
      </div>
    </div>
  )
}

export default dashboard