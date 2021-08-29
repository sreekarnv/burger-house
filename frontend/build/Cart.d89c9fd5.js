function e(e,r,t,a){Object.defineProperty(e,r,{get:t,set:a,enumerable:!0,configurable:!0})}var r=("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequireb892;r.register("lNGAx",(function(t,a){var s;s=t.exports,Object.defineProperty(s,"__esModule",{value:!0,configurable:!0}),e(t.exports,"default",(function(){return f}));var i=r("2fYNA"),n=r("8d0rP"),l=r("lXVVG"),c=r("fL72J"),u=r("6ro5L"),o=r("dMnY7"),d=r("2qZhW"),m=r("1Hhev"),h=r("jFA1T");var f=()=>{const{push:e}=m.useHistory(),r=h.useQueryClient(),{placeOrder:t,isLoading:a,data:s}=d.default({}),f=r.getQueryData("user"),x=c.useDispatch(),g=c.useSelector((e=>e.cart.cart)),p=c.useSelector((e=>e.cart.cartPrice)),v=c.useSelector((e=>e.cart.cartValue));return n.useEffect((()=>{s&&(e(`/dashboard/me/orders/${s._id}`),x(l.clearCart(g)))}),[s,x,g,l]),i.jsx("div",{className:0===v?"cart__empty":"cart",children:0===v?i.jsxs(i.Fragment,{children:[i.jsx("h1",{className:"heading-1 u-text-primary u-text-center u-text-uppercase",children:"Your Cart is empty"}),i.jsx(o.default,{onClick:()=>e("/menu"),color:"tertiary",variant:"outlined",children:"Check Menu"})]}):i.jsxs(i.Fragment,{children:[i.jsx("h1",{className:"heading-1 cart__heading u-text-primary",children:"Cart"}),i.jsx("div",{className:"cart__list",children:null==g?void 0:g.map((e=>i.jsx(u.default,{burger:e},e._id||e.id)))}),i.jsxs("div",{className:"cart__total",children:[i.jsx("h2",{className:"u-text-primary heading-2 u-text-center",children:"Total Cost"}),i.jsxs("p",{className:"cart__total-price",children:["Rs ",p]}),f?i.jsx(o.default,{onClick:()=>{const e={price:p,items:[...g]};t(e)},className:"u-w-100 u-text-uppercase",variant:"outlined",children:a?"Loading....":"Place Order"}):i.jsx(o.default,{onClick:()=>e("/auth/login"),className:"u-w-100 u-text-uppercase",variant:"outlined",children:"Please Login to order"})]}),i.jsxs("div",{className:"cart__mobile-cta",children:[i.jsxs("h1",{className:"u-text-tertiary u-text-center",children:["Total Rs ",p]}),f?i.jsx(o.default,{onClick:()=>{const e={price:p,items:[...g]};t(e)},className:"u-text-uppercase",size:"sm",variant:"outlined",children:a?"Loading....":"Place Order"}):i.jsx(o.default,{onClick:()=>e("/auth/login"),className:"u-text-uppercase",size:"sm",variant:"outlined",children:"Please Login to order"})]})]})})}})),r.register("6ro5L",(function(t,a){e(t.exports,"default",(function(){return m}));var s=r("2fYNA"),i=r("lXVVG"),n=r("295dV"),l=r("5c08f"),c=r("cgnaS"),u=r("kvv6M"),o=r("fL72J"),d=r("46dEB");var m=({burger:e})=>{var r;const t=o.useDispatch(),{imageRef:a}=d.default(""+e.photoUrl);return s.jsxs("div",{className:"burger-list-item",children:[s.jsx("div",{className:"burger-list-item__image",children:e.photoUrl?s.jsx("img",{ref:a,alt:e.name}):s.jsx(c.default,{size:"lg"})}),s.jsx("h4",{className:"burger-list-item__name",children:e.name}),s.jsxs("p",{className:"burger-list-item__price",children:["Rs ",e.price*e.itemsInCart]}),s.jsxs(s.Fragment,{children:[s.jsx(n.default,{className:"u-jc-center",leftOnClick:()=>t(i.addBurgerToCart(e)),rightOnClick:()=>t(i.removeBurgerFromCart(e)),children:e.itemsInCart}),s.jsx(l.default,{onClick:()=>t(i.removeAllBurgersFromCart(e)),className:"burger-list-item__delete-btn",children:s.jsx(u.default,{className:"u-text-danger"})})]}),s.jsx("div",{className:"burger-list-item__ings",children:(null===(r=e.name)||void 0===r?void 0:r.toLowerCase().startsWith("custom"))&&e.ingredients.map((e=>e.items>0?s.jsxs("p",{children:[e.name," x ",e.items]},e.id):null))})]})}})),r.register("kvv6M",(function(t,a){e(t.exports,"default",(function(){return i}));var s=r("2fYNA");var i=e=>s.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",...e,children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})})})),r.register("46dEB",(function(t,a){e(t.exports,"default",(function(){return i}));var s=r("8d0rP");var i=e=>{const r=s.useRef();return s.useEffect((()=>{e.length&&fetch(e).then((e=>e.blob())).then((e=>{let t=URL.createObjectURL(e);r.current.src=t}))}),[e]),{imageRef:r}}})),r.register("2qZhW",(function(t,a){e(t.exports,"default",(function(){return l}));var s=r("jFA1T"),i=r("fYxNN"),n=r("1Hhev");var l=({onError:e,onSettled:r,onSuccess:t})=>{s.useQueryClient(),n.useHistory();const{mutate:a,isLoading:l,data:c,error:u}=s.useMutation((e=>(async e=>(await i.default({method:"POST",url:"/api/v2/users/me/orders",data:e})).data.data)(e)),{onSuccess:e=>{t&&t(e)},onError:r=>{e&&e(r)},onSettled:(e,t)=>{r&&r(e,t)}});return{placeOrder:a,data:c,isLoading:l,error:u}}}));