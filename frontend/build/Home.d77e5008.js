function r(r,e,t,n){Object.defineProperty(r,e,{get:t,set:n,enumerable:!0,configurable:!0})}var e=("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequireb892;e.register("lXVVG",(function(t,n){r(t.exports,"addBurgerToCart",(function(){return c})),r(t.exports,"pushBurgerToCart",(function(){return s})),r(t.exports,"clearCart",(function(){return d})),r(t.exports,"popBurgerFromCart",(function(){return i})),r(t.exports,"removeBurgerFromCart",(function(){return l})),r(t.exports,"removeAllBurgersFromCart",(function(){return f})),r(t.exports,"removeAllItemsOfBurgerFromCart",(function(){return a}));var o=e("cEuqI"),u=e("5JOnG");const s=r=>({type:o.ADD_BURGER_TO_CART,burger:r}),i=r=>({type:o.REMOVE_BURGER_FROM_CART,burger:r}),a=r=>({type:o.REMOVE_ALL_ITEMS_BURGER_FROM_CART,burger:r}),c=r=>e=>{e(s(r)),e(u.updateBurgerItemsInCart(r,"add"))},l=r=>e=>{e(i(r)),e(u.updateBurgerItemsInCart(r,"remove"))},f=r=>e=>{e(a(r)),e(u.updateBurgerItemsInCart(r,"removeAll"))},d=r=>e=>{r.forEach((r=>{e(f(r))})),e({type:o.CLEAR_CART})}})),e.register("5JOnG",(function(t,n){r(t.exports,"getNewBurgers",(function(){return i})),r(t.exports,"updateBurgerItemsInCart",(function(){return u})),r(t.exports,"getBurgers",(function(){return s}));var o=e("cEuqI");const u=(r,e)=>({type:o.UPDATE_BURGER_ITEMS_IN_CART,burger:r,cartAction:e}),s=(r,e)=>({type:o.GET_BURGERS,burgers:r,cartBurgers:e}),i=r=>({type:o.GET_NEW_BURGERS,burgers:r})})),e.register("295dV",(function(t,n){r(t.exports,"default",(function(){return a}));var o=e("2fYNA"),u=e("5c08f"),s=e("hazYE"),i=e("2QLtV");var a=({leftOnClick:r,rightOnClick:e,...t})=>o.jsxs("div",{className:`add-remove-btn ${t.className}`,children:[o.jsx(u.default,{onClick:r,children:o.jsx(i.default,{className:"u-text-dark"})}),o.jsx("p",{children:t.children}),o.jsx(u.default,{onClick:e,children:o.jsx(s.default,{className:"u-text-dark"})})]})})),e.register("5c08f",(function(t,n){r(t.exports,"default",(function(){return u}));var o=e("2fYNA");var u=({children:r,size:e="sm",className:t,...n})=>o.jsx("button",{className:`icon-btn icon-btn__size--${e} ${t||""}`,...n,children:r})})),e.register("hazYE",(function(t,n){r(t.exports,"default",(function(){return u}));var o=e("2fYNA");var u=r=>o.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",...r,children:o.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M18 12H6"})})})),e.register("2QLtV",(function(t,n){r(t.exports,"default",(function(){return u}));var o=e("2fYNA");var u=r=>o.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",...r,children:o.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M12 6v6m0 0v6m0-6h6m-6 0H6"})})}));