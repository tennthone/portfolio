import{q as n,r as i,j as e}from"./app-0o_LAF03.js";import{a as s,P as d}from"./ToggleSwitch-WE5S0I2r.js";import o from"./Page-H8gTUTEB.js";import"./index.esm-8DuQsO7k.js";import"./index-j0TmCDst.js";import"./PageContext-R8A2Cmmr.js";const u=()=>{const{pages:a}=n().props,[t,c]=i.useState(1),l=()=>{};return e.jsxs(e.Fragment,{children:[e.jsxs(s,{children:[e.jsxs(s.Head,{children:[e.jsx(s.HeadCell,{children:" No "}),e.jsx(s.HeadCell,{children:" Name "}),e.jsx(s.HeadCell,{children:" Variable Name "}),e.jsx(s.HeadCell,{children:" isResource "}),e.jsx(s.HeadCell,{children:e.jsx("span",{className:"sr-only",children:"Edit"})})]}),e.jsx(s.Body,{className:"divide-y",children:a.length>0?a.map(r=>e.jsx(o,{item:r},r.id)):e.jsx(s.Cell,{className:"text-red-700 text-center",children:" No Data Here  "})})]}),e.jsx("div",{className:"flex md:justify-end overflow-x-auto sm:justify-center my-3",children:a.length>0&&e.jsx(d,{currentPage:t,totalPages:100,onPageChange:l})})]})};export{u as default};
