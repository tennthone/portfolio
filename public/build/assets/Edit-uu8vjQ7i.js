import{r as d,j as e}from"./app-SeAoMk9i.js";import{L as n,F as l}from"./ToggleSwitch-zWAqXmGF.js";import{a as m}from"./SectionContext-KIDOIq34.js";import c from"./MyModal-Hiw3iuLI.js";import"./index.esm-erATGcW9.js";import"./index-Y4YDjm55.js";const g=()=>{const{openEditModal:t,setOpenEditModal:o,data:a,setData:s,reset:r,sectionId:i}=d.useContext(m);return e.jsx(c,{children:e.jsx(u,{data:a,setData:s}),openModal:t,setOpenModal:o,routeName:"admin.template.section.update",param:i,name:"Section",heading:"Edit Section",data:a,reset:r})},u=({data:t,setData:o})=>e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{children:[e.jsx("div",{className:"mb-2 block",children:e.jsx(n,{htmlFor:"name",value:"Add Section Name"})}),e.jsx(l,{variant:"outlined",label:"name",value:t.name,onChange:a=>o("name",a.target.value)})]}),e.jsxs("div",{children:[e.jsx("div",{className:"mb-2 block",children:e.jsx(n,{htmlFor:"remote url",value:"Add Variable Name"})}),e.jsx(l,{variant:"outlined",label:"variable",value:t.value,onChange:a=>o("value",a.target.value)})]})]});export{u as BodyContent,g as default};
