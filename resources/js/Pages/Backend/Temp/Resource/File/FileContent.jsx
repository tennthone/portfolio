import { getTrimPath } from '@/Helper/helper';
import FrontendLayout from '@/Layouts/FrontendLayout'
import { Textarea, Button, Breadcrumb} from 'flowbite-react'
import { FaFolder } from 'react-icons/fa';
import React, { useState } from 'react'
import { Link, router } from '@inertiajs/react';
import toast, { Toaster } from 'react-hot-toast';
import { GrTemplate } from 'react-icons/gr';

const FileContent = ({fileContent, base_path, template_id}) => {
  const breadcrumb = getTrimPath(base_path);
  const [content, setContent] = useState(fileContent);
  const [loading, setLoading] = useState(false);
  const handleSave = () => {
    setLoading(true)
    router.post(route('admin.template.filedata.store'), 
    {
      content : content,
      base_path : base_path
    }, {
      onSuccess : () => {
        setLoading(false)
        toast.success("Content Updated Successfully");
      },
      onError : (err) => {
        console.log(err)
      }
    });
  }
  return (
    <div>
      <div className="mx-5 flex justify-between my-3 items-center">
        <Breadcrumb aria-label="Default breadcrumb example">
            <Breadcrumb.Item 
                href={route('admin.template.resource')}
                icon={GrTemplate}
            > 
                Templates 
            </Breadcrumb.Item>
            {
                Object.entries(breadcrumb).map(([key, value], index) => (
                    <Breadcrumb.Item icon={FaFolder} key={index}>
                        <Link href={route('admin.template.files-folders', {id : template_id , base_path : value})} > {key} </Link>
                    </Breadcrumb.Item>
                ))
            }
        </Breadcrumb>
        <Button 
          className="purple" 
          onClick={handleSave}
          isProcessing={loading}
          processingLabel='Saving'
        > Save </Button>
      </div>
      <Textarea 
        rows={30}
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <Toaster 
        position='top-right'
      />
    </div>
  )
}

FileContent.layout = page => <FrontendLayout children={page} />
export default FileContent
