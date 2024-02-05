import React, { useContext } from 'react'
import { Label, FloatingLabel} from 'flowbite-react'
import { SectionContext } from '@/Context/SectionContext'
import MyModal from '@/Pages/components/MyModal'

const Edit = () => {
  const {openEditModal, setOpenEditModal, data, setData, reset, sectionId} = useContext(SectionContext)
  return (
          <MyModal 
              children={<BodyContent data={data} setData={setData}/>}
              openModal={openEditModal}
              setOpenModal={setOpenEditModal}
              routeName="admin.template.section.update"
              param={sectionId}
              name="Section"
              heading="Edit Section"
              data={data}
              reset={reset}
          />
  )
}

export default Edit

export const BodyContent = ({data, setData}) => {
  return (
      <div className="space-y-6">
          {/* template name  */}
          <div>
          <div className="mb-2 block">
              <Label htmlFor="name" value="Add Section Name" />
          </div>
          <FloatingLabel
              variant='outlined'
              label='name'
              value={data.name}
              onChange={(event) => setData('name', event.target.value)}
          />
          </div>
          {/* remote url  */}
          <div>
          <div className="mb-2 block">
              <Label htmlFor="remote url" value="Add Variable Name" />
          </div>
          <FloatingLabel
              variant='outlined'
              label='variable'
              value={data.value}
              onChange={(event) => setData('value', event.target.value)}
          />
          </div>
      </div>
  )
}