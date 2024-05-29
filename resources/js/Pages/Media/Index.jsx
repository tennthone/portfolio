import FrontendLayout from '@/Layouts/FrontendLayout'
import { Link } from '@inertiajs/react'
import { Breadcrumb } from 'flowbite-react'
import React from 'react'
import { GrGallery } from 'react-icons/gr'

const Index = () => {
  return (
    <React.Fragment>
      {/* breadcrumb  */}
      <div className="p-3 border-2 rounded-md">
            <div className="flex justify-between">
                <Breadcrumb aria-label="Default breadcrumb example">
                    <Breadcrumb.Item icon={GrGallery}>
                        <Link href={route('admin.media-library')} > Media Libraries </Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
        </div>
    </React.Fragment>
  )
}

Index.layout = page => <FrontendLayout children={page} />
export default Index
