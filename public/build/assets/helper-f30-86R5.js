const i=s=>{const t="app/public/resources/",e=s.replace(new RegExp(`^${t}`),"").split("/");return e.reduce((r,n,c)=>{const o=e.slice(0,c+1).join("/");return r[n]=`${t}${o}`,r},[])};export{i as g};
