import React from 'react'

const Preview = ({skeleton, content}) => {
  return (
    <div>
        <div className="flex">
            <div className="me-3">
                <div dangerouslySetInnerHTML={{__html : content}}></div>
            </div>
            <div dangerouslySetInnerHTML={{__html : skeleton}}></div>
        </div>
        
    </div>
  )
}

export default Preview
