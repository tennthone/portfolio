import{W as i,r as c,j as e}from"./app-SeAoMk9i.js";import{L as m,F as o}from"./ToggleSwitch-zWAqXmGF.js";import u from"./MyModal-Hiw3iuLI.js";import"./index.esm-erATGcW9.js";import"./index-Y4YDjm55.js";const N=({openCreateModal:l,setOpenCreateModal:r})=>{const{data:a,setData:t,reset:n}=i({name:"",remote_url:""}),[s,d]=c.useState([]);return e.jsx(u,{children:e.jsx(x,{data:a,setData:t,errors:s}),openModal:l,setOpenModal:r,routeName:"admin.template.store",name:"Resource",param:"",data:a,reset:n,errors:s,setErrors:d})},x=({data:l,setData:r,errors:a})=>e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{children:[e.jsx("div",{className:"mb-2 block",children:e.jsx(m,{htmlFor:"name",value:"Add Name"})}),e.jsx(o,{variant:"outlined",label:"Template name",value:l.name,onChange:t=>r("name",t.target.value)}),a&&a.name&&e.jsxs("div",{className:"text-red-700 my-3",children:[" ",a.name," "]})]}),e.jsxs("div",{children:[e.jsx("div",{className:"mb-2 block",children:e.jsx(m,{htmlFor:"remote url",value:"Add GitHub Remote Url"})}),e.jsx(o,{variant:"outlined",label:"Remote Url",value:l.remote_url,onChange:t=>r("remote_url",t.target.value)}),a&&a.remote_url&&e.jsxs("div",{className:"text-red-700 my-3",children:[" ",a.remote_url," "]})]})]});export{x as BodyContent,N as default};
