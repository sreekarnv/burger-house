function e(e){return e&&e.__esModule?e.default:e}function r(e,r,t,o){Object.defineProperty(e,r,{get:t,set:o,enumerable:!0,configurable:!0})}var t=("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequireb892;t.register("a4Pmz",(function(o,a){var n;n=o.exports,Object.defineProperty(n,"__esModule",{value:!0,configurable:!0}),r(o.exports,"default",(function(){return f}));var i=t("2fYNA"),s=t("8d0rP"),u=t("1Hhev"),d=t("7fSHL");const l=e(s).lazy((()=>t("2oTZS")));var f=()=>{const e=u.useRouteMatch();return i.jsxs(u.Switch,{children:[i.jsx(u.Route,{path:`${e.url}/orders`,exact:!0,children:i.jsx(l,{})}),i.jsx(u.Route,{path:`${e.url}/orders/:id`,exact:!0,children:i.jsx(d.default,{})})]})}})),t.register("7fSHL",(function(e,o){r(e.exports,"default",(function(){return d}));var a=t("2fYNA"),n=t("1Hhev"),i=t("3vjuD"),s=t("1dFVU"),u=t("cVjCT");var d=e=>{const r=n.useRouteMatch(),{isLoading:t,data:o}=s.default(r.params.id);return t?a.jsx(i.default,{fullScreen:!0}):a.jsx(u.default,{order:o,isAdmin:!0})}})),t.register("1dFVU",(function(e,o){r(e.exports,"default",(function(){return s}));var a=t("jFA1T"),n=t("fYxNN"),i=t("1Hhev");var s=e=>{const r=a.useQueryClient(),{replace:t}=i.useHistory(),{isLoading:o,data:s,error:u}=a.useQuery(["admin-orders",e],(()=>(async e=>(await n.default({method:"GET",url:`/api/v2/orders/admin/${e}`})).data.data)(e)),{initialData:()=>{var t;return null===(t=r.getQueryData("me-orders"))||void 0===t?void 0:t.find((r=>r._id===e))},onError:e=>{403===e.response.status&&t({pathname:"/error",state:{message:e.response.data.message}})}});return{isLoading:o,data:s,error:u}}})),t.register("2oTZS",(function(e,r){e.exports=Promise.all([t("6jJou")(new URL(t("c4LyC").resolve("kioiS"),import.meta.url).toString()),t("6jJou")(new URL(t("c4LyC").resolve("h2iDG"),import.meta.url).toString()),t("6jJou")(new URL(t("c4LyC").resolve("vzWxn"),import.meta.url).toString()),import("./"+t("c4LyC").resolve("2TVv0")),import("./"+t("c4LyC").resolve("7mMmP"))]).then((()=>t("hkLOl")))}));