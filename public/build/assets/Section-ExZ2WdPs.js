import{q as u,r as x,j as e,d as p,y as g}from"./app-SeAoMk9i.js";import{a as t,e as r}from"./ToggleSwitch-zWAqXmGF.js";import{_ as m}from"./index-Y4YDjm55.js";import{a as j}from"./SectionContext-KIDOIq34.js";import"./index.esm-erATGcW9.js";const w=({item:s})=>{const{template_id:i,page:l}=u().props,{handleEdit:n}=x.useContext(j),o=(a,c,d)=>{g.post(route("admin.template.section.change-status"),{[d]:a,section_id:c},{onSuccess:()=>{m.success("Status changed successfully")},onError:h=>{console.log(h)}})};return e.jsxs(t.Row,{className:"bg-white dark:border-gray-700 dark:bg-gray-800",children:[e.jsx(t.Cell,{className:"whitespace-nowrap font-medium text-gray-900 dark:text-white",children:s.id}),e.jsx(t.Cell,{children:e.jsx(p,{href:route("admin.template.section.data",{page_id:l.id,template_id:i,section_id:s.id}),className:"text-indigo-700",children:s.name})}),e.jsxs(t.Cell,{children:[" ",s.value," "]}),e.jsx(t.Cell,{children:e.jsx(r,{checked:s.isResource==1,onChange:a=>o(a,s.id,"isResource"),color:"teal"})}),e.jsx(t.Cell,{children:e.jsx(r,{checked:s.isVisible==1,onChange:a=>o(a,s.id,"isVisible"),color:"lime"})}),e.jsx(t.Cell,{children:e.jsx(r,{checked:s.isPremium==1,onChange:a=>o(a,s.id,"isPremium"),color:"indigo"})}),e.jsx(t.Cell,{children:e.jsx("button",{type:"button",href:"#",className:"font-medium text-cyan-600 hover:underline dark:text-cyan-500",onClick:()=>n(s.id),children:"Edit"})})]},s.id)};export{w as default};
