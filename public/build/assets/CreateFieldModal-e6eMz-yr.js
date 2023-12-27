import{r,j as e}from"./app-SeAoMk9i.js";import{L as a,F as n,R as i}from"./ToggleSwitch-zWAqXmGF.js";import{a as d}from"./DataContext-v53cJl0t.js";import x from"./CustomFieldModal-aNNPanCV.js";import"./index.esm-erATGcW9.js";import"./index-Y4YDjm55.js";import"./index.esm-cn3YZoOz.js";const g=()=>{const{openCreateFieldModal:t,setOpenCreateFieldModal:l,data:s,setData:o}=r.useContext(d);return e.jsx("div",{children:e.jsx(x,{children:e.jsx(c,{data:s,setData:o}),openModal:t,setOpenModal:l,heading:"Add A Field"})})},c=({data:t,setData:l})=>e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsx("div",{className:"w-1/2",children:e.jsxs("div",{className:"mx-2",children:[e.jsx("div",{className:"mb-2 block",children:e.jsx(a,{htmlFor:"name",value:"Name"})}),e.jsx(n,{variant:"outlined",label:"name",value:t.name,onChange:s=>l("name",s.target.value),helperText:"This is hit text to help user"})]})}),e.jsx("div",{className:"w-1/2",children:e.jsxs("div",{className:"mx-2",children:[e.jsx("div",{className:"mb-2 block",children:e.jsx(a,{htmlFor:"variable",value:"Variable Name"})}),e.jsx(n,{variant:"outlined",label:"variable",value:t.value,onChange:s=>l("value",s.target.value),helperText:"This is hit text to help user"})]})})]}),t.type=="file"&&e.jsx(e.Fragment,{children:e.jsxs("div",{className:"flex",children:[e.jsxs("div",{className:"w-1/2 flex items-start gap-2 me-3",children:[e.jsx(i,{id:"options",name:"options",value:"one",defaultChecked:!0,onChange:s=>l("option",s.target.value)}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx(a,{htmlFor:"options",children:" One File "}),e.jsxs("small",{children:[" ","For example, a single photo or one PDF file"," "]})]})]}),e.jsxs("div",{className:"w-1/2 flex items-start gap-2",children:[e.jsx(i,{id:"options",name:"options",value:"many",defaultvalue:!0,onChange:s=>l("option",s.target.value)}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx(a,{htmlFor:"options",children:" Many File"}),e.jsxs("small",{children:[" ","For example, several photos, PDF files, etc."," "]})]})]})]})}),t.type=="number"&&e.jsx(e.Fragment,{children:e.jsxs("div",{className:"flex",children:[e.jsxs("div",{className:"w-1/2 flex items-start gap-2 me-3",children:[e.jsx(i,{id:"options",name:"options",value:"integer",defaultChecked:!0,onChange:s=>l("option",s.target.value)}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx(a,{htmlFor:"options",children:" Integer "}),e.jsx("small",{children:" 1,2,3,5,8, 13, .... "})]})]}),e.jsxs("div",{className:"w-1/2 flex items-start gap-2",children:[e.jsx(i,{id:"options",name:"options",value:"decimal",defaultvalue:!0,onChange:s=>l("option",s.target.value)}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx(a,{htmlFor:"options",children:" Decimal "}),e.jsx("small",{children:" 3.1415265398 "})]})]})]})}),t.type=="text"&&e.jsx(e.Fragment,{children:e.jsxs("div",{className:"flex",children:[e.jsxs("div",{className:"w-1/2 flex items-start gap-2 me-3",children:[e.jsx(i,{id:"options",name:"options",value:"integer",defaultChecked:!0,onChange:s=>l("option",s.target.value)}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx(a,{htmlFor:"options",children:"Short text, eact search"}),e.jsx("small",{children:"256 characters max.Use this for titles, names, tags, URLs, e-mail addresses"})]})]}),e.jsxs("div",{className:"w-1/2 flex items-start gap-2",children:[e.jsx(i,{id:"options",name:"options",value:"decimal",defaultvalue:!0,onChange:s=>l("option",s.target.value)}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx(a,{htmlFor:"options",children:" Long Text "}),e.jsx("small",{children:"50k characters max.Use this for descriptions, text paragraphs, articles"})]})]})]})}),t.type=="datetime"&&e.jsx(e.Fragment,{children:e.jsxs("div",{className:"flex",children:[e.jsxs("div",{className:"w-1/3 flex items-start gap-2 me-3",children:[e.jsx(i,{id:"options",name:"options",value:"datetime",defaultChecked:!0,onChange:s=>l("option",s.target.value)}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx(a,{htmlFor:"options",children:" Datetime "}),e.jsx("small",{children:" 12/04/2023 12:00 PM "})]})]}),e.jsxs("div",{className:"w-1/3 flex items-start gap-2",children:[e.jsx(i,{id:"options",name:"options",value:"date",defaultvalue:!0,onChange:s=>l("option",s.target.value)}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx(a,{htmlFor:"options",children:" Date "}),e.jsx("small",{children:" 12/04/2023"})]})]}),e.jsxs("div",{className:"w-1/3 flex items-start gap-2",children:[e.jsx(i,{id:"options",name:"options",value:"decimal",defaultvalue:!0,onChange:s=>l("option",s.target.value)}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx(a,{htmlFor:"options",children:" Time "}),e.jsx("small",{children:" 12:00 PM"})]})]})]})})]});export{c as BodyContent,g as default};
