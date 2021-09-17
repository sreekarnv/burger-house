!function(){function e(e,r,t,n){Object.defineProperty(e,r,{get:t,set:n,enumerable:!0,configurable:!0})}function r(e){return e&&e.__esModule?e.default:e}var t=("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequireb892;t.register("3x0pa",(function(r,n){e(r.exports,"default",(function(){return p}));var u=t("9DAHI"),a=t("9oHsR"),s=t("hZ42O"),c=t("gleKf"),i=t("2WtOj"),o=t("9U91e"),d=t("eG9zp"),l=t("39Qpo"),f=t("3T0bt"),g=t("hh8hX"),p=function(e){var r=e.burger,t=s.useDispatch(),n=l.default(),p=n.showAlert,h=n.setAlert,m=n.alertMessage,x=n.alertType,b=f.default(""+r.photoUrl).imageRef;return u.jsxs(u.Fragment,{children:[p&&u.jsx(i.default,{type:x,children:m}),u.jsxs(a.motion.div,{initial:!1,layout:!0,className:"burger-card",children:[u.jsxs("div",{className:"burger-card__img-wrapper",children:[u.jsx("img",{height:"100px",width:"100px",ref:b,alt:r.name,className:"burger-card__img"}),u.jsx(o.default,{size:"md",color:r.isVegetarian?"success":"danger",children:r.isVegetarian?"VEG":"N-VEG"})]}),u.jsx("h5",{className:"u-text-tertiary u-text-uppercase u-text-center burger-card__title",children:r.name}),u.jsx("ul",{className:"burger-card__ingredients",children:r.ingredients.map((function(e){var r=e.ingredient,t=e.amount;return u.jsx("li",{className:"burger-card__ingredient",children:u.jsxs("div",{children:[u.jsx("span",{children:r.name})," ",u.jsxs("span",{children:["(",t,")"]})]})},r._id)}))}),u.jsxs("div",{className:"burger-card__cta",children:[0===r.itemsInCart?u.jsx(d.default,{onClick:function(){t(g.addBurgerToCart(r)),h("success","burger added to cart")},size:"sm",variant:"outlined",className:"u-text-uppercase",children:"Add To Cart"}):u.jsx("div",{children:u.jsx(c.default,{leftOnClick:function(){t(g.addBurgerToCart(r)),h("success","burger added to cart")},rightOnClick:function(){t(g.removeBurgerFromCart(r)),h("danger","burger removed cart")},children:r.itemsInCart})}),u.jsxs("h6",{className:"u-text-tertiary burger-card__price",children:["Rs ",r.price]})]})]})]})}})),t.register("3T0bt",(function(r,n){e(r.exports,"default",(function(){return a}));var u=t("21wn6"),a=function(e){var r=u.useRef();return u.useEffect((function(){e.length&&fetch(e).then((function(e){return e.blob()})).then((function(e){var t=URL.createObjectURL(e);r.current.src=t}))}),[e]),{imageRef:r}}})),t.register("cYzrQ",(function(r,n){e(r.exports,"default",(function(){return s}));var u=t("9DAHI"),a=t("dRdEt"),s=function(){return u.jsxs("div",{className:"-p-6",children:[u.jsx(a.default,{className:"u-mb-5",type:"image"}),u.jsx(a.default,{className:"u-text-center u-mb-10",type:"title"}),u.jsx(a.default,{}),u.jsx(a.default,{})]})}})),t.register("dRdEt",(function(r,n){e(r.exports,"default",(function(){return a}));var u=t("9DAHI"),a=function(e){var r=e.type,t=void 0===r?"text":r,n=e.className;return u.jsx("div",{className:"base-skeleton base-skeleton--".concat(t," ").concat(n)})}})),t.register("cRVGN",(function(n,u){e(n.exports,"default",(function(){return g}));var a=t("eGTdo"),s=t("dETz3"),c=t("6HHIu"),i=t("hZ42O"),o=t("21wn6"),d=t("l7kuk"),l=t("ijCuw"),f=a.asyncToGenerator(l.mark((function e(r){var t;return l.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.default({method:"GET",url:"/api/v2/burgers",params:r});case 2:return t=e.sent,e.abrupt("return",t.data.data);case 4:case"end":return e.stop()}}),e)}))),g=function(e){var t=e.onError,n=e.onSuccess,u=e.onSettled,a=e.params,d=i.useDispatch(),l=i.useSelector((function(e){return e.burgers.burgers})),g=i.useSelector((function(e){return e.cart.cart})),p=c.useQuery("burgers",(function(){return f(a)}),{onSuccess:function(e){d(s.getBurgers(e,g)),n&&n(e)},onError:function(e){t&&t(e)},onSettled:function(e,r){u&&u(e,r)},refetchOnWindowFocus:!1}),h=p.error,m=p.isLoading,x=p.refetch;return r(o).useEffect((function(){x()}),[a]),{data:l,error:h,isLoading:m,refetch:x}}})),t.register("2Ru1R",(function(r,n){e(r.exports,"default",(function(){return l}));var u=t("eGTdo"),a=t("dETz3"),s=t("hZ42O"),c=t("l7kuk"),i=t("6HHIu"),o=t("ijCuw"),d=u.asyncToGenerator(o.mark((function e(){var r;return o.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c.default({method:"GET",url:"/api/v2/burgers/get-new-burgers"});case 2:return r=e.sent,e.abrupt("return",r.data.data);case 4:case"end":return e.stop()}}),e)}))),l=function(e){var r=e.onError,t=e.onSuccess,n=e.onSettled,u=s.useDispatch(),c=s.useSelector((function(e){return e.burgers.newBurgers})),o=s.useSelector((function(e){return e.burgers.burgers})),l=i.useQuery("new-burgers",d,{onSuccess:function(e){c.length&&o.length||u(a.getNewBurgers(e)),t&&t(e)},onError:function(e){r&&r(e)},onSettled:function(e,r){n&&n(e,r)}}),f=l.error,g=l.isLoading;return{data:c,error:f,isLoading:g}}}))}();