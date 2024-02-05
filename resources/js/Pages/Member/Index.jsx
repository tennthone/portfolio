import FrontendLayout from '@/Layouts/FrontendLayout'
import React from 'react'

const Index = () => {
  return (
    <div>
      this is index page
    </div>
  )
}

Index.layout = (page) => <FrontendLayout children={page} />
export default Index
