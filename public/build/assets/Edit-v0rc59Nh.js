import{r as l,q as c,j as e}from"./app-0o_LAF03.js";import{a as m}from"./PermissionContext-WE1kA-MV.js";import{F as p}from"./FrontendLayout-2f4wfayL.js";import{M as t,c as x}from"./ToggleSwitch-WE5S0I2r.js";import"./index-j0TmCDst.js";import"./index.esm-8DuQsO7k.js";import"./index.esm-SIQhjwoI.js";import"./app-w40geAFS.js";const j=()=>{const{openEditModal:i,setOpenEditModal:o,updatePermission:a}=l.useContext(m),{editData:s}=c().props,n=Object.values(s);return e.jsx("div",{children:e.jsxs(t,{dismissible:!0,show:i,size:"4xl",onClose:()=>o(!1),children:[e.jsx(t.Header,{children:" Edit Permission "}),e.jsx(t.Body,{children:e.jsx("div",{className:"space-y-6",children:e.jsx("div",{className:"flex justify-between flex-wrap",children:n.length>0&&Object.entries(s.all_permissions).map(([d,r],h)=>e.jsx(e.Fragment,{children:e.jsx("div",{className:"w-1/4 my-3",children:e.jsx(x,{checked:!!s.user_permissions.includes(r.name),label:r.name,onChange:()=>a(s.role.id,r.id)})},d)}))})})})]})})};j.layout=i=>e.jsx(p,{children:i});export{j as default};
