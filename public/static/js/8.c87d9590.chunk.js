(this["webpackJsonpburger-house"]=this["webpackJsonpburger-house"]||[]).push([[8],{123:function(e,t,r){"use strict";r.r(t);var n=r(5),a=r.n(n),s=r(12),c=r(0),o=r(14),u=r(15),i=r(17),l=r(16),d=r(1),p=r.n(d),m=r(80),f=r.n(m),b=r(13),h=r(97),O=r(82),v=function(e){Object(i.a)(r,e);var t=Object(l.a)(r);function r(){return Object(o.a)(this,r),t.apply(this,arguments)}return Object(u.a)(r,[{key:"render",value:function(){var e=this,t=this.props.cartBurgers,r=Object.keys(t[this.props.name].ingredients).map((function(r){return p.a.createElement("p",{key:f()(),className:"card__cart-ingredient"},t[e.props.name].ingredients[r].name,"\xa0x\xa0",t[e.props.name].ingredients[r].amount)})),n=Object(c.a)({},t[this.props.name]),a=p.a.createElement(p.a.Fragment,null,p.a.createElement(O.a,{value:t[this.props.name].cart,className:"card__cart-btn",classes:"btn  btn__primary btn__primary-round ",valueClass:"u-fontSize-2rem",removeItem:function(){return e.props.decrementItem(n)},addItem:function(){return e.props.addItem(n)},items:t[this.props.name].items}),p.a.createElement("button",{onClick:function(){return e.props.deleteItem(n)},className:"card__cart-btn--delete btn btn__delete"},p.a.createElement(h.a,null))),s=t[this.props.name].title;return s.startsWith("customBurger")&&(s="Your Burger"),p.a.createElement("div",{className:"card__cart"},p.a.createElement("img",{src:t[this.props.name].BurgerImage,alt:"burger",className:"card__cart-img "}),p.a.createElement("h3",{className:"card__cart-title "},s),p.a.createElement("p",{className:"u-text-".concat(t[this.props.name].foodType," card__cart-foodType")},t[this.props.name].foodType),p.a.createElement("div",{className:"card__cart-ingredients"},r),p.a.createElement("p",{className:"card__cart-price"},"Rs ",t[this.props.name].price),a)}}]),r}(d.Component),g=r(20),y=r(76),j=r(86),_=r(81),E=function(e){Object(i.a)(r,e);var t=Object(l.a)(r);function r(){var e;Object(o.a)(this,r);for(var n=arguments.length,u=new Array(n),i=0;i<n;i++)u[i]=arguments[i];return(e=t.call.apply(t,[this].concat(u))).state={isLoading:!1,alert:{show:!1,status:"",message:""}},e.showAlertHandler=function(t,r){e.setState(Object(c.a)(Object(c.a)({},e.state),{},{alert:{show:!0,status:r,message:t}}))},e.onCloseHandler=function(){e.closeAlertTimer=setTimeout((function(){e.setState(Object(c.a)(Object(c.a)({},e.state),{},{alert:{show:!1,status:"",message:""}}))}),2e3)},e.takeToMenu=function(){return e.props.history.push({pathname:"/menu"})},e.goBack=function(){return e.props.history.goBack()},e.decrementItemFromCartHandler=function(t){t.items>0?e.props.onDecrementItemCart(t):e.props.onItemRemovedFromCart(t),e.showAlertHandler("Removed Burger from Cart","fail")},e.deleteItemFromCart=function(t){e.props.onItemRemovedFromCart(t),e.showAlertHandler("Removed Burger from Cart","fail")},e.addItemInCartHandler=function(t){e.props.onIncrementItemInCart(t),e.showAlertHandler("Added a Burger","success")},e.onOrderHandler=Object(s.a)(a.a.mark((function t(){var r,n,s;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.props.user){t.next=2;break}return t.abrupt("return",e.props.history.replace("/login"));case 2:return r=[],n=[],Object.keys(e.props.cartBurgers).map((function(t){if("".concat(t).startsWith("customBurger")){var a=[];Object.keys(e.props.cartBurgers[t].ingredients).map((function(r){var n={_id:e.props.cartBurgers[t].ingredients[r]._id,amount:e.props.cartBurgers[t].ingredients[r].amount};return a.push(n)}));var s=Object(c.a)(Object(c.a)({},e.props.cartBurgers[t]),{},{name:"Custom Burger",items:e.props.cartBurgers[t].items,ingredients:a});return n.push(s)}var o={_id:e.props.cartBurgers[t]._id,items:e.props.cartBurgers[t].items};return r.push(o)})),s={price:e.props.totalPrice,menuOrders:r,customOrders:n},t.next=8,e.props.placeOrder(s);case 8:e.props.placeOrderStatus&&(e.placeOrderTimer=setTimeout((function(){e.props.history.replace("/"),e.props.clearCart()}),1500));case 9:case"end":return t.stop()}}),t)}))),e}return Object(u.a)(r,[{key:"componentDidMount",value:function(){var e=this;this.setState({isLoading:!0}),this.timer=setTimeout((function(){e.setState({isLoading:!1})}),2e3)}},{key:"render",value:function(){var e,t,r=this,n=this.props.cartBurgers;return this.props.cart>0?(e=Object.keys(n).map((function(e){return n[e]?p.a.createElement(v,{key:f()(),name:e,decrementItem:r.decrementItemFromCartHandler,deleteItem:r.deleteItemFromCart,addItem:r.addItemInCartHandler,cartBurgers:r.props.cartBurgers}):""})),t=p.a.createElement(p.a.Fragment,null,p.a.createElement("button",{onClick:this.goBack,className:"btn btn__tertiary-back cart__goback-btn"},p.a.createElement("span",null,"\u2190")," Back"),p.a.createElement("h2",{className:"heading-1 cart__heading"},"Your Cart"),p.a.createElement("div",{className:"cart__checkout"},p.a.createElement("p",{className:"cart__checkout-price"},"Total:\xa0",p.a.createElement("span",{className:"u-ftwt-700 u-fontSize-4 u-text-transform-none"},"Rs\xa0",this.props.totalPrice," ")),p.a.createElement("button",{onClick:this.onOrderHandler,className:"btn btn__tertiary-goTo"},"Place Your Order",p.a.createElement("span",null,"\u2192"))),p.a.createElement("div",{className:"cart"},e))):t=p.a.createElement("div",{className:"cart__empty"},p.a.createElement("p",{className:"cart__empty-heading"},"Your Cart is empty!"),p.a.createElement("button",{onClick:this.takeToMenu,className:"btn btn__tertiary cart__empty-btn"},"Start Adding Items")),this.state.isLoading||this.props.placeOrderLoading?p.a.createElement("div",{className:"u-flex-center u-vh-100"},p.a.createElement(g.a,null)):this.props.placeOrderStatus?p.a.createElement("div",{className:"u-flex-center u-vh-100"},p.a.createElement("h2",{className:"u-fontSize-3rem u-text-success"},"Order Placed Successfully")):p.a.createElement(p.a.Fragment,null,this.state.alert.status&&p.a.createElement(y.a,{close:this.onCloseHandler(),show:this.state.alert.show,status:this.state.alert.status,message:this.state.alert.message}),p.a.createElement("div",{className:"section-cart"},t))}}]),r}(d.Component);t.default=Object(b.b)((function(e){return{user:e.auth.user,cart:e.cart.cart,cartBurgers:e.cart.Burgers,totalPrice:e.cart.totalPrice,menuBurgers:e.menu.Burgers,placeOrderLoading:e.orders.createUserOrderInit,placeOrderStatus:e.orders.createUserOrderStatus}}),(function(e){return{onIncrementItemInCart:function(t){return e(j.d(t))},onDecrementItemCart:function(t){return e(j.c(t))},onItemRemovedFromCart:function(t){return e(j.e(t))},placeOrder:function(t){return e(_.b(t))},clearCart:function(){return e(j.b())}}}))(E)},76:function(e,t,r){"use strict";var n=r(1),a=r.n(n);t.a=function(e){return a.a.createElement("div",{className:"alert alert__".concat(e.show," alert--").concat(e.status," ").concat(e.className)},e.message)}},77:function(e,t,r){"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function a(e){return function(e){if(Array.isArray(e))return n(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(e){if("string"===typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(r):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}r.d(t,"a",(function(){return a}))},80:function(e,t,r){(function(t){var r=t&&t.pid?t.pid.toString(36):"";function n(){var e=Date.now(),t=n.last||e;return n.last=e>t?e:t+1}e.exports=e.exports.default=function(e,t){return(e||"")+""+r+n().toString(36)+(t||"")},e.exports.process=function(e,t){return(e||"")+r+n().toString(36)+(t||"")},e.exports.time=function(e,t){return(e||"")+n().toString(36)+(t||"")}}).call(this,r(46))},81:function(e,t,r){"use strict";r.d(t,"d",(function(){return p})),r.d(t,"b",(function(){return f})),r.d(t,"a",(function(){return b})),r.d(t,"c",(function(){return v})),r.d(t,"f",(function(){return y})),r.d(t,"e",(function(){return _}));var n=r(5),a=r.n(n),s=r(77),c=r(0),o=r(12),u=r(2),i=r(18),l=r.n(i),d=function(e){return{type:u.O,error:e}},p=function(){return function(){var e=Object(o.a)(a.a.mark((function e(t){var r,n,o;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t({type:u.P}),e.prev=1,e.next=4,l.a.get("/api/v1/orders/me");case 4:r=e.sent,n=Object.keys(r.data.orders).map((function(e){return Object(c.a)(Object(c.a)({},r.data.orders[e]),{},{orders:[].concat(Object(s.a)(r.data.orders[e].customOrders),Object(s.a)(r.data.orders[e].menuOrders)),customOrders:null,menuOrders:null})})),t((a=n,{type:u.Q,orders:a})),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(1),o=Object(c.a)({},e.t0).response,t(d(o));case 13:case"end":return e.stop()}var a}),e,null,[[1,9]])})));return function(t){return e.apply(this,arguments)}}()},m=function(e){return{type:u.o,error:e}},f=function(e){return function(){var t=Object(o.a)(a.a.mark((function t(r){var n,s;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r({type:u.p}),t.prev=1,t.next=4,l()({method:"POST",url:"/api/v1/orders",data:e});case 4:n=t.sent,r((a=n.data.orders,{type:u.q,orders:a})),t.next=12;break;case 8:t.prev=8,t.t0=t.catch(1),s=Object(c.a)({},t.t0).response,r(m(s));case 12:case"end":return t.stop()}var a}),t,null,[[1,8]])})));return function(e){return t.apply(this,arguments)}}()},b=function(){return{type:u.f}},h=function(e){var t=e.order,r=e.totalOrders,n=e.pendingOrders,a=e.completedOrders,s=e.totalPrice;return{type:u.K,orders:t,totalOrders:r,pendingOrders:n,completedOrders:a,totalPrice:s}},O=function(e){return{type:u.I,error:e}},v=function(e){return function(){var t=Object(o.a)(a.a.mark((function t(r){var n,o,i,d,p,m,f,b,v;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r({type:u.J}),t.prev=1,n=[],o="",t.next=6,l.a.get("/api/v1/orders");case 6:if(d=t.sent,"All Orders"===e){t.next=13;break}return o="?status=".concat(e),t.next=11,l.a.get("/api/v1/orders".concat(o));case 11:i=t.sent,Object.keys(i.data.orders).map((function(e){return n.push(Object(c.a)(Object(c.a)({},i.data.orders[e]),{},{orders:[].concat(Object(s.a)(d.data.orders[e].customOrders),Object(s.a)(d.data.orders[e].menuOrders)),customOrders:null,menuOrders:null})),n}));case 13:p=d.data.orders.length,m=0,f=0,b=0,Object.keys(d.data.orders).map((function(t){return"pending"===d.data.orders[t].status?f+=1:"delivered"===d.data.orders[t].status&&(b+=1),"cancelled"!==d.data.orders[t].status&&(m+=d.data.orders[t].price),"All Orders"===e?(n.push(Object(c.a)(Object(c.a)({},d.data.orders[t]),{},{orders:[].concat(Object(s.a)(d.data.orders[t].customOrders),Object(s.a)(d.data.orders[t].menuOrders)),customOrders:null,menuOrders:null})),n):""})),r(h({order:n,totalOrders:p,pendingOrders:f,completedOrders:b,totalPrice:m})),t.next=25;break;case 21:t.prev=21,t.t0=t.catch(1),v=Object(c.a)({},t.t0).response,r(O(v));case 25:case"end":return t.stop()}}),t,null,[[1,21]])})));return function(e){return t.apply(this,arguments)}}()},g=function(e){return{type:u.Eb,response:e}},y=function(e){var t=e.status,r=e._id;return function(){var e=Object(o.a)(a.a.mark((function e(n){var s;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,l()({url:"/api/v1/orders/".concat(r),method:"PATCH",data:{status:t}});case 3:s=e.sent,n(g(s.data)),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),n(g(e.t0.response.data));case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}()},j=function(e){return{type:u.Z,order:e}},_=function(e){return function(){var t=Object(o.a)(a.a.mark((function t(r){var n,o,i;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r({type:u.Y}),t.prev=1,t.next=4,l()({url:"/api/v1/orders/".concat(e),method:"get"});case 4:n=t.sent,i=[],n.data.order.customOrders.map((function(e){return i.push({_id:{ingredients:e.ingredients,title:e.name,foodType:e.foodType,_id:e._id,photo:e.photo,price:e.price},items:parseInt(e.items)}),i})),o=Object(c.a)(Object(c.a)({},n.data.order),{},{orders:[].concat(i,Object(s.a)(n.data.order.menuOrders)),customOrders:null,menuOrders:null}),r(j(o)),t.next=14;break;case 11:t.prev=11,t.t0=t.catch(1),r((a=t.t0.response.data,{type:u.Z,error:a}));case 14:case"end":return t.stop()}var a}),t,null,[[1,11]])})));return function(e){return t.apply(this,arguments)}}()}},82:function(e,t,r){"use strict";var n=r(1),a=r.n(n);t.a=function(e){var t,r=!1;return 0===e.items&&(r=!0,t="btn btn__primary-disabled"),a.a.createElement("div",{className:"btn__addOrRemove ".concat(e.className)},a.a.createElement("button",{type:"button",onClick:e.addItem,className:e.classes},"+"),a.a.createElement("p",{className:"u-text-tertiary ".concat(e.valueClass)},e.items),a.a.createElement("button",{type:"button",onClick:e.removeItem,disabled:r,className:t||e.classes},"-"))}},86:function(e,t,r){"use strict";r.d(t,"a",(function(){return s})),r.d(t,"d",(function(){return c})),r.d(t,"c",(function(){return o})),r.d(t,"e",(function(){return u})),r.d(t,"b",(function(){return i}));var n=r(2),a=r(81),s=function(e){return{type:n.a,burgerObj:e}},c=function(e){return{type:n.ab,burgerObj:e}},o=function(e){return{type:n.r,burgerObj:e}},u=function(e){return{type:n.kb,burgerObj:e}},i=function(){return function(e){e(l()),e(a.a())}},l=function(){return{type:n.f}}},97:function(e,t,r){"use strict";var n=r(1),a=r.n(n);function s(){return(s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function c(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},s=Object.keys(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var o=a.a.createElement("title",null,"trash"),u=a.a.createElement("path",{d:"M3.389 7.113l1.101 10.908c0.061 0.461 2.287 1.977 5.51 1.979 3.225-0.002 5.451-1.518 5.511-1.979l1.102-10.908c-1.684 0.942-4.201 1.387-6.613 1.387-2.41 0-4.928-0.445-6.611-1.387zM13.168 1.51l-0.859-0.951c-0.332-0.473-0.692-0.559-1.393-0.559h-1.831c-0.7 0-1.061 0.086-1.392 0.559l-0.859 0.951c-2.57 0.449-4.434 1.64-4.434 2.519v0.17c0 1.547 3.403 2.801 7.6 2.801 4.198 0 7.601-1.254 7.601-2.801v-0.17c0-0.879-1.863-2.070-4.433-2.519zM12.070 4.34l-1.070-1.34h-2l-1.068 1.34h-1.7c0 0 1.862-2.221 2.111-2.522 0.19-0.23 0.384-0.318 0.636-0.318h2.043c0.253 0 0.447 0.088 0.637 0.318 0.248 0.301 2.111 2.522 2.111 2.522h-1.7z"}),i=function(e){var t=e.svgRef,r=e.title,n=c(e,["svgRef","title"]);return a.a.createElement("svg",s({width:20,height:20,viewBox:"0 0 20 20",ref:t},n),void 0===r?o:r?a.a.createElement("title",null,r):null,u)},l=a.a.forwardRef((function(e,t){return a.a.createElement(i,s({svgRef:t},e))}));r.p,t.a=function(e){return a.a.createElement(l,{className:"".concat(e.className)})}}}]);
//# sourceMappingURL=8.c87d9590.chunk.js.map