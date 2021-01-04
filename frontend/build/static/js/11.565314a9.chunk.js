(this["webpackJsonpburger-house-frontend"]=this["webpackJsonpburger-house-frontend"]||[]).push([[11],{113:function(e,t,r){"use strict";r.r(t);var n=r(23),c=r(1),a=r(0),s=r(5),u=r(85),i=r(89),o=r.p+"static/media/lettuce.322f2880.svg",l=function(e){var t=e.onSubmit,r=e.placeholder,n=e.searchValue,a=e.setSearchValue,s=e.resetForm,u=e.reset;return Object(c.jsxs)("form",{className:"search-form",onSubmit:t,children:[Object(c.jsx)("input",{type:"text",placeholder:r,value:n,onChange:function(e){a(e.target.value)},className:"form__input",required:!0}),Object(c.jsx)("button",{type:"submit",className:"btn btn__tertiary",children:"Search"}),u&&Object(c.jsx)("button",{onClick:s,type:"reset",className:"btn btn__secondary u-text-dark",children:"Reset"})]})},g=r(24),b=r(39),d=r(7),m=r(18);t.default=Object(s.b)((function(e){return{burgers:e.burgers.burgers,getNewBurgers:e.burgers.getNewBurgers,getBurgersInit:e.burgers.getBurgersInit,getBurgersError:e.burgers.getBurgersError,cartValue:e.cart.cartValue,newBurgers:e.burgers.newBurgers}}),(function(e){return{getBurgers:function(t){return e(g.a(t))},getNewBurgers:function(t){return e(g.b(t))},addBurgerToCart:function(t){return e(b.a(t))},removeBurgerFromCart:function(t){return e(b.d(t))}}}))((function(e){var t=e.burgers,r=e.getBurgers,s=e.getBurgersInit,g=e.addBurgerToCart,b=e.removeBurgerFromCart,j=e.cartValue,h=e.newBurgers,O=e.getNewBurgers,v=Object(d.g)(),_=Object(a.useState)(!1),x=Object(n.a)(_,2),f=x[0],p=x[1],N=Object(a.useState)(""),B=Object(n.a)(N,2),y=B[0],C=B[1];Object(a.useEffect)((function(){0===j&&0===t.length&&""===y.trim()&&r(),0===h.length&&O()}),[r,j,t,O,h,y]);return Object(c.jsxs)("div",{className:"menu",children:[Object(c.jsx)("h3",{className:"menu__heading heading-1 u-text-primary",children:"Menu"}),Object(c.jsxs)("div",{className:"menu__subnav",children:[Object(c.jsxs)("div",{className:"menu__subnav-veg-only",children:[Object(c.jsxs)("div",{className:"menu__subnav-veg-only-text",children:[Object(c.jsx)("img",{src:o,alt:"veg only"}),"Vegetarian Only"]}),Object(c.jsx)(i.a,{onToggle:function(){var e;f?p(!1):(e={isVegetarian:!0},p(!0)),r(e)},active:f,className:"menu__subnav-veg-only"})]}),Object(c.jsx)(l,{reset:!0,placeholder:"Search by name....",onSubmit:function(e){if(e.preventDefault(),""!==y.trim()){var t={name:y};f&&(t.isVegetarian=!0),r(t),C("")}},value:y,searchValue:y,setSearchValue:C,resetForm:function(){r(),p(!1),C("")}}),Object(c.jsx)("button",{onClick:function(){return v.push("/make-my-burger")},type:"button",className:"btn u-text-primary menu__subnav-make-burger-cta btn__goto",children:"Click Here! To make your own burger"})]}),Object(c.jsxs)("div",{className:"menu__items",children:[!s&&t.map((function(e){return Object(c.jsx)(u.a,{burger:e,addBurger:g,removeBurger:b},e.id)})),s&&Object(c.jsx)("div",{style:{height:"55rem"},children:Object(c.jsx)(m.a,{})}),!s&&0===t.length&&Object(c.jsx)("div",{style:{height:"55rem"},children:Object(c.jsx)("h3",{className:"heading-2 u-text-danger",children:"No results for your search."})})]})]})}))},85:function(e,t,r){"use strict";var n=r(23),c=r(1),a=r(0),s=r(7),u=r(36),i=r(38);t.a=function(e){var t=e.burger,r=e.addBurger,o=e.removeBurger,l=e.admin,g=t.name,b=t.photoUrl,d=t.ingredients,m=t.price,j=t.isVegetarian,h=t.slug,O=t.itemsInCart,v=Object(a.useState)(!1),_=Object(n.a)(v,2),x=_[0],f=_[1],p=Object(a.useState)(),N=Object(n.a)(p,2),B=N[0],y=N[1];Object(a.useEffect)((function(){if(x){var e=setTimeout((function(){f(!1),y(null)}),2e3);return function(){return clearTimeout(e)}}}),[x]);var C=Object(s.i)(),w=Object(s.g)();return Object(c.jsxs)(c.Fragment,{children:[x&&Object(c.jsxs)(u.a,{variant:B,children:["success"===B&&"Added Burger To Cart","danger"===B&&"Removed Burger From Cart"]}),Object(c.jsxs)("div",{className:"card-menu",children:[Object(c.jsx)("div",{className:"card-menu__image",children:Object(c.jsx)("img",{src:b,alt:g})}),Object(c.jsx)("h4",{className:"card-menu__name",children:g}),Object(c.jsx)("p",{className:"card-menu__foodtype ".concat(j?"u-text-success":"u-text-danger"),children:j?"vegetarian":"non-vegetarian"}),Object(c.jsx)("div",{className:"card-menu__ingredients",children:d.map((function(e,t){return Object(c.jsxs)("div",{className:"card-menu__ingredient",children:[Object(c.jsx)("span",{children:e.ingredient.name}),"\xa0",Object(c.jsxs)("span",{children:["X\xa0 ",e.amount]})]},e._id+"".concat(t))}))}),Object(c.jsxs)("p",{className:"card-menu__price",children:["Rs ",m]}),!l&&0===O&&Object(c.jsx)("button",{onClick:function(){r(t),f(!0),y("success")},className:"btn btn__primary--outline card-menu__cta",children:"add to cart"}),!l&&O>0&&Object(c.jsx)(i.a,{addItem:function(){r(t),f(!0),y("success")},removeItem:function(){o(t),f(!0),y("danger")},lg:!0,color:"secondary-50",className:"card-menu__cta",children:O}),l&&Object(c.jsx)("button",{onClick:function(){return w.push("".concat(C.path,"/").concat(h))},className:"btn btn__primary--outline card-menu__cta",children:"Update Burger"})]})]})}},89:function(e,t,r){"use strict";var n=r(1),c=r(0),a=r.n(c).a.memo((function(e){var t=e.onToggle,r=e.active;return Object(n.jsx)(n.Fragment,{children:Object(n.jsx)("label",{className:"toggle-switch ".concat(r&&"toggle-switch__active"),onClick:t,children:Object(n.jsx)("div",{className:"toggle-switch__slider"})})})}));t.a=a}}]);
//# sourceMappingURL=11.565314a9.chunk.js.map