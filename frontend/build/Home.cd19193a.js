!function(){function r(r,e,t,n){Object.defineProperty(r,e,{get:t,set:n,enumerable:!0,configurable:!0})}var e=("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequireb892;e.register("gleKf",(function(t,n){r(t.exports,"default",(function(){return f}));var o=e("eGTdo"),u=e("9DAHI"),i=e("7AoQp"),c=e("9Z9Y0"),s=e("9omzk"),f=function(r){var e=r.leftOnClick,t=r.rightOnClick,n=o.objectWithoutProperties(r,["leftOnClick","rightOnClick"]);return u.jsxs("div",{className:"add-remove-btn ".concat(n.className),children:[u.jsx(i.default,{onClick:e,children:u.jsx(s.default,{className:"u-text-dark"})}),u.jsx("p",{children:n.children}),u.jsx(i.default,{onClick:t,children:u.jsx(c.default,{className:"u-text-dark"})})]})}})),e.register("9Z9Y0",(function(t,n){r(t.exports,"default",(function(){return i}));var o=e("eGTdo"),u=e("9DAHI"),i=function(r){return u.jsx("svg",o.objectSpread({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},r,{children:u.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M18 12H6"})}))}})),e.register("9omzk",(function(t,n){r(t.exports,"default",(function(){return i}));var o=e("eGTdo"),u=e("9DAHI"),i=function(r){return u.jsx("svg",o.objectSpread({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},r,{children:u.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M12 6v6m0 0v6m0-6h6m-6 0H6"})}))}})),e.register("hh8hX",(function(t,n){r(t.exports,"pushBurgerToCart",(function(){return i})),r(t.exports,"removeAllItemsOfBurgerFromCart",(function(){return s})),r(t.exports,"popBurgerFromCart",(function(){return c})),r(t.exports,"addBurgerToCart",(function(){return f})),r(t.exports,"removeBurgerFromCart",(function(){return a})),r(t.exports,"removeAllBurgersFromCart",(function(){return l})),r(t.exports,"clearCart",(function(){return d}));var o=e("5gCA1"),u=e("dETz3"),i=function(r){return{type:o.ADD_BURGER_TO_CART,burger:r}},c=function(r){return{type:o.REMOVE_BURGER_FROM_CART,burger:r}},s=function(r){return{type:o.REMOVE_ALL_ITEMS_BURGER_FROM_CART,burger:r}},f=function(r){return function(e){e(i(r)),e(u.updateBurgerItemsInCart(r,"add"))}},a=function(r){return function(e){e(c(r)),e(u.updateBurgerItemsInCart(r,"remove"))}},l=function(r){return function(e){e(s(r)),e(u.updateBurgerItemsInCart(r,"removeAll"))}},d=function(r){return function(e){r.forEach((function(r){e(l(r))})),e({type:o.CLEAR_CART})}}})),e.register("dETz3",(function(t,n){r(t.exports,"getNewBurgers",(function(){return c})),r(t.exports,"updateBurgerItemsInCart",(function(){return u})),r(t.exports,"getBurgers",(function(){return i}));var o=e("5gCA1"),u=function(r,e){return{type:o.UPDATE_BURGER_ITEMS_IN_CART,burger:r,cartAction:e}},i=function(r,e){return{type:o.GET_BURGERS,burgers:r,cartBurgers:e}},c=function(r){return{type:o.GET_NEW_BURGERS,burgers:r}}}))}();