import{r as a,q as m,j as e,d as l}from"./app-SeAoMk9i.js";import{B as c}from"./ToggleSwitch-zWAqXmGF.js";import{a as p}from"./index.esm-Z9_V3lGl.js";import x from"./Commit-TGftadg1.js";import"./index.esm-erATGcW9.js";import"./index-Y4YDjm55.js";const g=()=>{const[o,t]=a.useState(!1),[i,r]=a.useState(""),{templates:n}=m().props,d=s=>{r(s),t(!0)};return e.jsxs("div",{children:[n.map(s=>e.jsx("div",{className:"p-2 bg-slate-200 rounded-md my-3",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsxs("span",{className:"me-3",children:[" ",e.jsx(p,{size:25,className:"inline"})," "]}),e.jsx("span",{className:"text-sm font-bold text-indigo-700",children:e.jsxs(l,{href:route("admin.template.files-folders",{id:s.id,base_path:s.git_info.base_path}),children:[" ",s.name,"  "]})})]}),e.jsx("div",{children:e.jsx(c,{color:"green",onClick:()=>d(s.id),children:" Commit Changes  "})})]})},s.id)),e.jsx(x,{openCommitModal:o,setOpenCommitModal:t,templateId:i})]})};export{g as default};
