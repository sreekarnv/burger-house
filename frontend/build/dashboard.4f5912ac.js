function e(e,t,o,r){Object.defineProperty(e,t,{get:o,set:r,enumerable:!0,configurable:!0})}var t=("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequireb892;t.register("6oRRF",(function(o,r){e(o.exports,"default",(function(){return d}));var n=t("8d0rP"),a=t("jFA1T"),i=t("1Hhev"),u=t("joeaJ");var d=(e="not-protected",t)=>{const{isLoading:o,startLoading:r,stopLoading:d}=u.default(),s=a.useQueryClient(),f=i.useHistory(),l=i.useLocation(),c=s.getQueryData("user");return n.useEffect((()=>{r(),"not-protected"===e&&!c||"protected"===e&&c?f.replace(l.pathname):t?f.replace(t):f.replace("/error"),d()}),[c]),{isLoading:o}}})),t.register("joeaJ",(function(o,r){e(o.exports,"default",(function(){return a}));var n=t("8d0rP");var a=(e=!1)=>{const[t,o]=n.useState(e);return{isLoading:t,startLoading:()=>o(!0),stopLoading:()=>o(!1)}}}));