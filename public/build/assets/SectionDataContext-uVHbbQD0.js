import{r as e,q as M,W as O,j as U,y as c}from"./app-vArPckAo.js";import{_ as y}from"./index-c3RIIRT3.js";const I=e.createContext(null),L=({children:r})=>{const[i,n]=e.useState(!1),[d,t]=e.useState(!1),[l,p]=e.useState([]),[u,a]=e.useState(!1),{page_id:m,template_id:f,section:s,flash:o}=M().props,[D,S]=e.useState(""),_={section_id:s.id,design_id:""},{data:g,setData:x,reset:C}=O(_),E=()=>{a(!0),c.get(route("admin.template.section.data"),{use_component:!0,page_id:m,template_id:f,section_id:s.id},{onSuccess:()=>{a(!1),n(!0)},onError:()=>{}})},h=()=>{c.post(route("admin.template.section.component-design.delete",D),{section_id:s.id},{onSuccess:()=>{t(!1)},onError:()=>{}})},j=v=>{S(v),t(!0)};return e.useEffect(()=>{o.success&&y.success(o.success)},[o.success]),U.jsx(I.Provider,{value:{openUseComponent:i,setOpenUseComponent:n,handleUseComponent:E,handleDeleteComponentDesign:h,openDeleteModal:d,setOpenDeleteModal:t,handleOpenDeleteModal:j,loading:u,data:g,setData:x,reset:C,errors:l,setErrors:p},children:r})};export{I as S,L as a};
