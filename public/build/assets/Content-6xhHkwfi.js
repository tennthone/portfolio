import{r as i,j as e,d}from"./app-tjH46_Jn.js";import{T as r,i as o}from"./ToggleSwitch-7jU1DJ8Z.js";import{c as p}from"./index.esm--HfZg-v8.js";import{G as x}from"./index.esm-lSDKJxr1.js";function h(t){return x({tag:"svg",attr:{version:"1.2",baseProfile:"tiny",viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M16.972 6.251c-.967-.538-2.185-.188-2.72.777l-3.713 6.682-2.125-2.125c-.781-.781-2.047-.781-2.828 0-.781.781-.781 2.047 0 2.828l4 4c.378.379.888.587 1.414.587l.277-.02c.621-.087 1.166-.46 1.471-1.009l5-9c.537-.966.189-2.183-.776-2.72z"}}]})(t)}const m=(t,s=3e3)=>{const[a,n]=i.useState(!1),c=async()=>{try{await navigator.clipboard.writeText(t),n(!0)}catch(l){console.error("Unable to copy to clipboard:",l)}};return i.useEffect(()=>{let l;return a&&(l=setInterval(()=>{n(!1)},s)),()=>{clearInterval(l)}},[a,s]),{isCopying:a,handleCopy:c}},u=({item:t})=>{const{isCopying:s,handleCopy:a}=m(t.templateId);return e.jsxs(r.Row,{className:"bg-white dark:border-gray-700 dark:bg-gray-800",children:[e.jsx(r.Cell,{className:"whitespace-nowrap font-medium text-gray-900 dark:text-white",children:e.jsxs("div",{className:"flex items-center",children:[e.jsxs("p",{className:"me-3",children:[" ",t.templateId," "]}),s?e.jsx(o,{content:"TemplateId ကူးယူပြီးပြီ",style:"light",children:e.jsx(h,{size:15,className:"inline text-green-700"})}):e.jsx(o,{content:"TemplateId ကူးယူမည်",style:"light",children:e.jsx(p,{onClick:()=>a(),size:15,className:"inline text-indigo-600 cursor-copy"})})]})}),e.jsx(r.Cell,{children:e.jsx(d,{href:route("admin.template.page",{template_id:t.id}),className:"text-indigo-700",children:t.name})}),e.jsxs(r.Cell,{children:[" ",t.git_info.remote_url," "]}),e.jsxs(r.Cell,{children:[" ",t.git_info.branch_name," "]}),e.jsxs(r.Cell,{children:[" ",t.creator.name," "]}),e.jsx(r.Cell,{children:e.jsx("a",{href:"#",className:"font-medium text-cyan-600 hover:underline dark:text-cyan-500",children:"Edit"})})]},t.id)};export{u as default};
