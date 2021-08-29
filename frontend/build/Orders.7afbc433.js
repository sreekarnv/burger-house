function e(e,a,r,t){Object.defineProperty(e,a,{get:r,set:t,enumerable:!0,configurable:!0})}var a=("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequireb892;a.register("hkLOl",(function(r,t){var d;d=r.exports,Object.defineProperty(d,"__esModule",{value:!0,configurable:!0}),e(r.exports,"default",(function(){return x}));var l=a("2fYNA"),s=a("8d0rP"),n=a("3vjuD"),i=a("cm4pu"),u=a("61yyI"),o=a("8Sad7"),c=a("6VaSw"),f=a("iYpMn"),v=a("iI38a"),m=a("1Hhev");var x=e=>{var a,r,t;const{push:d}=m.useHistory(),[x,p]=s.useState(""),[h,g]=s.useState([]),{isLoading:j,data:N}=v.default({}),{isLoading:y,data:_}=f.default({});return s.useEffect((()=>{(null==_?void 0:_.length)&&g(_)}),[_]),s.useEffect((()=>{if(null==x?void 0:x.length){const e=[..._].filter((e=>e.status===x));g(e)}else g(_)}),[x,_]),j?l.jsx(n.default,{fullScreen:!0}):l.jsxs("div",{className:"orders-admin",children:[l.jsx("h1",{className:"heading-2 u-text-center u-text-capitalize u-text-primary u-mb-12",children:"Manage Orders"}),l.jsxs("div",{className:"orders-admin__stats u-mb-18",children:[l.jsx(u.default,{fieldClassName:"u-text-tertiary",field:"total",value:`Rs ${((null==N||null===(a=N.pending)||void 0===a?void 0:a.price)||0)+(null==N?void 0:N.delivered.price)+(null==N?void 0:N.cancelled.price)}`}),l.jsx(u.default,{fieldClassName:"u-text-black",field:"total orders",value:(null==N?void 0:N.delivered.total)+(null==N?void 0:N.cancelled.total)+((null==N||null===(r=N.pending)||void 0===r?void 0:r.total)||0)}),l.jsx(u.default,{fieldClassName:"u-text-success",field:"delivered orders",value:null==N?void 0:N.delivered.total}),l.jsx(u.default,{fieldClassName:"u-text-dark",field:"cancelled orders",value:null==N?void 0:N.cancelled.total}),l.jsx(u.default,{fieldClassName:"u-text-danger",field:"pending orders",value:(null==N||null===(t=N.pending)||void 0===t?void 0:t.total)||0})]}),l.jsxs("div",{className:"orders-admin__list",children:[l.jsx("div",{className:"orders-admin__list-filter",children:l.jsxs(c.default,{onChange:e=>p(e.target.value),children:[l.jsx(i.default,{value:"",children:"-"}),l.jsx(i.default,{value:"cancelled",children:"Cancelled"}),l.jsx(i.default,{value:"delivered",children:"Delivered"}),l.jsx(i.default,{value:"pending",children:"Pending"})]})}),l.jsxs("div",{className:"orders-admin__list-items",children:[y&&l.jsx("h5",{className:"heading-3 u-text-center u-text-primary",children:"Loading..."}),null==h?void 0:h.map((e=>x.length?e.status===x?l.jsx(o.default,{onClick:()=>d(`/dashboard/admin/orders/${e._id}`),order:e},e._id):null:l.jsx(o.default,{onClick:()=>d(`/dashboard/admin/orders/${e._id}`),order:e},e._id))),!(null==h?void 0:h.length)&&l.jsxs("h5",{className:"u-text-center u-text-danger heading-3 u-text-capitalize",children:["No ",x," Orders"]})]})]})]})}})),a.register("cm4pu",(function(r,t){e(r.exports,"default",(function(){return l}));var d=a("2fYNA");var l=({children:e,...a})=>d.jsx("option",{...a,children:e})})),a.register("61yyI",(function(r,t){e(r.exports,"default",(function(){return l}));var d=a("2fYNA");var l=({field:e,value:a,fieldClassName:r,valueClassName:t})=>d.jsxs("div",{className:"order-admin-stat-card u-text-center u-p-8",children:[d.jsx("p",{className:`order-admin-stat-card__field u-text-uppercase u-ftwt-700 ${r||""}`,children:e}),d.jsx("p",{className:`order-admin-stat-card__value u-text-primary ${t||""}`,children:a})]})})),a.register("6VaSw",(function(r,t){e(r.exports,"default",(function(){return l}));var d=a("2fYNA");var l=({children:e,...a})=>d.jsx("select",{className:"input",...a,children:e})})),a.register("iYpMn",(function(r,t){e(r.exports,"default",(function(){return i}));var d=a("fYxNN"),l=a("1Hhev"),s=a("jFA1T");const n=async()=>(await d.default({method:"GET",url:"/api/v2/orders/admin"})).data.data;var i=({onError:e,onSuccess:a,onSettled:r})=>{const{replace:t}=l.useHistory(),{data:d,error:i,isLoading:u}=s.useQuery("admin-orders",n,{onSuccess:e=>{a&&a(e)},onError:a=>{e&&e(a),403===a.response.status&&t({pathname:"/error",state:{message:a.response.data.message}})},onSettled:(e,a)=>{r&&r(e,a)}});return{data:d,error:i,isLoading:u}}})),a.register("iI38a",(function(r,t){e(r.exports,"default",(function(){return i}));var d=a("fYxNN"),l=a("1Hhev"),s=a("jFA1T");const n=async()=>(await d.default({method:"GET",url:"/api/v2/orders/admin/orderStats"})).data.orderStats;var i=({onError:e,onSuccess:a,onSettled:r})=>{const{replace:t}=l.useHistory(),{data:d,error:i,isLoading:u}=s.useQuery("order-admin-stats",n,{onSuccess:e=>{a&&a(e)},onError:a=>{403===a.response.status&&t({pathname:"/error",state:{message:a.response.data.message}}),e&&e(a)},onSettled:(e,a)=>{r&&r(e,a)}});return{data:d,error:i,isLoading:u}}}));