import{q as i,r as a,j as s,R as p,y as x}from"./app-pVd2MQ2a.js";import{T as r}from"./ToggleSwitch-mcKuWbcW.js";import{F as j}from"./index.esm-1KvQqiY9.js";import h from"./Admin-AWq4wbzD.js";import{A as u}from"./AdminContext-XPUPs-Ky.js";import"./index-CcLU-bGk.js";import"./DeleteButton-1PqugslN.js";import"./index.esm-g1PIFD2o.js";import"./MyModal-CXPpkDHd.js";import"./FrontendLayout-5eZi8OKX.js";import"./index.esm-BYOauOW8.js";import"./index.esm-QLC9g9Cy.js";import"./index.esm-PLsVaipD.js";import"./index.esm-Ftz7Dz2S.js";import"./CustomFileInput-zXHrhRrT.js";const k=()=>{const{url:n}=i(),{admins:t}=i().props,[o,c]=a.useState(!0),{colHeaders:d}=a.useContext(u),l=e=>{c(!o),x.post(n,{field:e,sortBy:o?"asc":"desc",sort:!0},{onSuccess:()=>{},onError:()=>{}})};return s.jsx(p.Fragment,{children:s.jsx("div",{className:"my-5",children:s.jsxs(r,{children:[s.jsxs(r.Head,{children:[d.filter(e=>e.selected==!0).map(e=>s.jsx(r.HeadCell,{children:s.jsxs("div",{className:"flex",children:[s.jsxs("span",{className:"me-2",children:[" ",e.name," "]}),s.jsx(j,{className:"cursor-pointer",onClick:()=>l(e.field)})]})},e.id)),s.jsx(r.HeadCell,{children:s.jsx("span",{className:"sr-only",children:"Edit"})})]}),s.jsx(r.Body,{className:"divide-y",children:t.length>0?t.map((e,m)=>s.jsx(h,{item:e,id:m},e.id)):s.jsx(r.Row,{children:s.jsx(r.Cell,{className:"text-red-700",children:"No Data"})})})]})})})};export{k as default};
