import { ComponentDesignContext } from '@/Context/ComponentDesignContext'
import React from 'react'
import { useContext } from 'react'
import { Modal, Button } from 'flowbite-react'
import { usePage } from '@inertiajs/react'

const PreviewModal = () => {
    const {openPreviewModal, setOpenPreviewModal} = useContext(ComponentDesignContext);
    const {preview_data} = usePage().props;
    const previewArr = Object.values(preview_data);

  return (
    <Modal 
        size="4xl"
        show={openPreviewModal} 
        onClose={() => setOpenPreviewModal(false)}
    >
        <Modal.Header> Preview Component Design </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
                {
                    previewArr.length > 0 &&
                    <div className='flex'>
                        <div className='me-5'>
                            <p className='text-lg font-bold'> Content Design </p>
                            <div className='my-3' dangerouslySetInnerHTML={{__html : preview_data.content}}></div>
                        </div>
                        <div>
                            <p className='text-lg font-bold'> Skeleton Design </p>
                            <div className='my-3' dangerouslySetInnerHTML={{__html : preview_data.skeleton}}></div>
                        </div>
                    </div>
                }
          </div>
        </Modal.Body>
      </Modal>
  )
}

export default PreviewModal
