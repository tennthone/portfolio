import{r as o,j as e}from"./app-0o_LAF03.js";import{F as p}from"./FrontendLayout-2f4wfayL.js";import c from"./Create-oqGKRAeb.js";import x from"./Delete-q4PqiBRQ.js";import u from"./Items-kBxZ0cXq.js";import"./ToggleSwitch-WE5S0I2r.js";import"./index.esm-8DuQsO7k.js";import"./index.esm-SIQhjwoI.js";import"./app-w40geAFS.js";import"./index-j0TmCDst.js";import"./DeleteModal-Rz2lEAfa.js";const j=({repos:t})=>{const[a,s]=o.useState(!1),[i,r]=o.useState(!1),[n,l]=o.useState(null),d=m=>{l(m),r(!0)};return e.jsxs("div",{children:[e.jsx("div",{className:"p-3 border-2 rounded-md",children:e.jsxs("div",{className:"flex justify-between",children:[e.jsx("p",{className:"text-xl font-bold",children:" GitHub Repositories "}),e.jsx("button",{type:"button",className:"bg-indigo-700 text-white p-2 rounded-md",onClick:()=>s(!0),children:"Create Repository"})]})}),e.jsx(u,{repos:t,handleClick:d}),e.jsx(c,{openCreateModal:a,setOpenCreateModal:s}),e.jsx(x,{openDeleteModal:i,setOpenDeleteModal:r,repoName:n})]})};j.layout=t=>e.jsx(p,{children:t});export{j as default};
