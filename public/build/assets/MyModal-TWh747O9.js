import{r as y,j as s,y as g}from"./app-sXFAAeQm.js";import{M as r,a as v}from"./ToggleSwitch-LErs0pUQ.js";import{_ as S}from"./index-FgDibgJE.js";import"./index.esm-tU_kjnVM.js";const B=({openModal:a,setOpenModal:t,children:o,routeName:i,heading:l,setErrors:n,name:c,data:u,param:d,buttonName:m="Save",processingLabel:f="Saving"})=>{const[p,e]=y.useState(!1);function x(j){j.preventDefault(),e(!0),g.post(route(i,d),u,{onSuccess:()=>{e(!1),t(!1),S.success(c+"created successfully"),reset()},onError:h=>{e(!1),n(h)}})}return s.jsx(s.Fragment,{children:s.jsxs(r,{show:a,size:"md",onClose:()=>t(!1),popup:!0,children:[s.jsxs(r.Header,{children:[" ",l," "]}),s.jsx(r.Body,{children:s.jsx("form",{onSubmit:x,children:s.jsxs("div",{className:"space-y-6",children:[o,s.jsx("div",{className:"w-full",children:s.jsx(v,{type:"submit",isProcessing:p,processingLabel:f,children:m})})]})})})]})})};export{B as default};
