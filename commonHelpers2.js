import"./assets/modulepreload-polyfill-3cfb730f.js";import{i}from"./assets/vendor-77e16229.js";const r=document.querySelector(".form"),c=document.querySelector('input[name="delay"]'),u=document.querySelector('input[name="state"][value="fulfilled"]'),l=document.querySelector('input[name="state"][value="rejected"]'),n=({delay:e,shouldResolve:s=!0})=>new Promise((o,t)=>{setTimeout(()=>{s?o(e):t(e)},e)});r.addEventListener("submit",e=>{e.preventDefault();const s=c.value,o=Number(s);u.checked?n({delay:o}).then(t=>i.success({title:"OK",message:`✅ Fulfilled promise in ${t} ms`,position:"topRight"})):l.checked&&n({delay:o,shouldResolve:!1}).catch(t=>i.error({title:"Error",message:`❌ Rejected promise in ${t} ms`,position:"topRight"}))});
//# sourceMappingURL=commonHelpers2.js.map
