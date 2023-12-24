import FrontendLayout from '@/Layouts/FrontendLayout'
import { Textarea } from 'flowbite-react'
import React from 'react'

const ShowFile = ({fileContent}) => {
  return (
    <div>
      <Textarea 
        rows={30}
        value={fileContent}
      />
    </div>
  )
}

ShowFile.layout = page => <FrontendLayout children={page} />
export default ShowFile
