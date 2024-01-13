import React from 'react'
import Side from './Parts/Side'

const FrontendLayout = ({children}) => {
  return (
    <div>
        <div className="flex">
          <div className="w-2/12">
              {/* SideBar  */}
              <div className="sticky top-0">
                  <Side />
              </div>
          </div>
          <div className="w-10/12">
            {/* Content  */}
              <div className="px-10 mt-14">
                  {children}
              </div>
          </div>
        </div>
    </div>

  )
}

export default FrontendLayout
