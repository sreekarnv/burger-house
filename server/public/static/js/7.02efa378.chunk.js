(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[7],{108:function(e,t,r){"use strict";r.r(t);var n=r(0),a=r(13),s=r(14),c=r(16),u=r(15),o=r(1),i=r.n(o),p=r(8),d=r(89),l=r(20),m=r(86),f=r(85),b=r(78),v=function(e){Object(c.a)(r,e);var t=Object(u.a)(r);function r(){var e;Object(a.a)(this,r);for(var s=arguments.length,c=new Array(s),u=0;u<s;u++)c[u]=arguments[u];return(e=t.call.apply(t,[this].concat(c))).state={showAddorRemoveBtn:!1,alert:{show:!1,status:"",message:""}},e.takeToBurgerBuilder=function(){return e.props.history.push("/build-your-burger")},e.showAlertHandler=function(t,r){e.setState(Object(n.a)(Object(n.a)({},e.state),{},{alert:{show:!0,status:r,message:t}}))},e.onCloseHandler=function(){e.closeAlertTimer=setTimeout((function(){e.setState(Object(n.a)(Object(n.a)({},e.state),{},{alert:{show:!1,status:"",message:""}}))}),2e3)},e.decrementItemFromCartHandler=function(t){t.items>0?e.props.onDecrementItemCart(t):e.props.onItemRemovedFromCart(t),e.showAlertHandler("Removed Burger from cart successfully","fail")},e.addItemToCart=function(t){e.props.onItemPushedToCart(t);e.showAlertHandler("Added Burger to Cart successfully","success")},e.incrementBurgerInCart=function(t){e.props.onIncrementItemInCart(t);e.showAlertHandler("Added Burger to Cart successfully","success")},e}return Object(s.a)(r,[{key:"componentDidMount",value:function(){this.props.loadBurgers()}},{key:"componentWillUnmount",value:function(){clearTimeout(this.timer),clearTimeout(this.closeAlertTimer)}},{key:"render",value:function(){var e,t=this,r=this.props.menu;return r&&(e=Object.keys(r).map((function(e){return i.a.createElement(d.a,{_id:r[e]._id,initialprice:r[e].price,price:r[e].totalprice,key:r[e]._id,title:r[e].title,foodType:r[e].foodType,ingredients:r[e].ingredients,burgerImage:r[e].photo,items:r[e].items,page:"menu",addItem:t.incrementBurgerInCart,removeItem:t.decrementItemFromCartHandler,addItemToCart:t.addItemToCart})}))),this.props.loading?i.a.createElement("div",{className:"u-flex-center u-vh-100"},i.a.createElement(l.a,null)):i.a.createElement(i.a.Fragment,null,this.state.alert.status&&i.a.createElement(b.a,{close:this.onCloseHandler(),show:this.state.alert.show,status:this.state.alert.status,message:this.state.alert.message}),i.a.createElement("section",{className:"section-menu"},i.a.createElement("h2",{className:"menu__heading heading-1"},"Menu"),i.a.createElement("div",{className:"menu__list"},e),i.a.createElement("button",{onClick:this.takeToBurgerBuilder,className:"menu__btn btn btn__tertiary-goTo"},"Screw it! Make your own burger")))}}]),r}(o.Component);t.default=Object(p.b)((function(e){return{menu:e.menu.Burgers,loading:e.menu.loading}}),(function(e){return{onIncrementItemInCart:function(t){return e(m.d(t))},onDecrementItemCart:function(t){return e(m.c(t))},onItemPushedToCart:function(t){return e(m.a(t))},onItemRemovedFromCart:function(t){return e(m.e(t))},loadBurgers:function(){return e(f.e())}}}))(v)},78:function(e,t,r){"use strict";var n=r(1),a=r.n(n);t.a=function(e){return a.a.createElement("div",{className:"alert alert__".concat(e.show," alert--").concat(e.status," ").concat(e.className)},e.message)}},79:function(e,t,r){"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function a(e){return function(e){if(Array.isArray(e))return n(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(e){if("string"===typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(r):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}r.d(t,"a",(function(){return a}))},81:function(e,t,r){(function(t){var r=t&&t.pid?t.pid.toString(36):"";function n(){var e=Date.now(),t=n.last||e;return n.last=e>t?e:t+1}e.exports=e.exports.default=function(e,t){return(e||"")+""+r+n().toString(36)+(t||"")},e.exports.process=function(e,t){return(e||"")+r+n().toString(36)+(t||"")},e.exports.time=function(e,t){return(e||"")+n().toString(36)+(t||"")}}).call(this,r(48))},82:function(e,t,r){"use strict";r.d(t,"d",(function(){return l})),r.d(t,"b",(function(){return f})),r.d(t,"a",(function(){return b})),r.d(t,"c",(function(){return g})),r.d(t,"f",(function(){return O})),r.d(t,"e",(function(){return _}));var n=r(4),a=r.n(n),s=r(79),c=r(0),u=r(7),o=r(2),i=r(18),p=r.n(i),d=function(e){return{type:o.O,error:e}},l=function(){return function(){var e=Object(u.a)(a.a.mark((function e(t){var r,n,u;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t({type:o.P}),e.prev=1,e.next=4,p.a.get("/api/v1/orders/me");case 4:r=e.sent,n=Object.keys(r.data.orders).map((function(e){return Object(c.a)(Object(c.a)({},r.data.orders[e]),{},{orders:[].concat(Object(s.a)(r.data.orders[e].customOrders),Object(s.a)(r.data.orders[e].menuOrders)),customOrders:null,menuOrders:null})})),t((a=n,{type:o.Q,orders:a})),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(1),u=Object(c.a)({},e.t0).response,t(d(u));case 13:case"end":return e.stop()}var a}),e,null,[[1,9]])})));return function(t){return e.apply(this,arguments)}}()},m=function(e){return{type:o.o,error:e}},f=function(e){return function(){var t=Object(u.a)(a.a.mark((function t(r){var n,s;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r({type:o.p}),t.prev=1,t.next=4,p()({method:"POST",url:"/api/v1/orders",data:e});case 4:n=t.sent,r((a=n.data.orders,{type:o.q,orders:a})),t.next=12;break;case 8:t.prev=8,t.t0=t.catch(1),s=Object(c.a)({},t.t0).response,r(m(s));case 12:case"end":return t.stop()}var a}),t,null,[[1,8]])})));return function(e){return t.apply(this,arguments)}}()},b=function(){return{type:o.f}},v=function(e){var t=e.order,r=e.totalOrders,n=e.pendingOrders,a=e.completedOrders,s=e.totalPrice;return{type:o.K,orders:t,totalOrders:r,pendingOrders:n,completedOrders:a,totalPrice:s}},h=function(e){return{type:o.I,error:e}},g=function(e){return function(){var t=Object(u.a)(a.a.mark((function t(r){var n,u,i,d,l,m,f,b,g;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r({type:o.J}),t.prev=1,n=[],u="",t.next=6,p.a.get("/api/v1/orders");case 6:if(d=t.sent,"All Orders"===e){t.next=13;break}return u="?status=".concat(e),t.next=11,p.a.get("/api/v1/orders".concat(u));case 11:i=t.sent,Object.keys(i.data.orders).map((function(e){return n.push(Object(c.a)(Object(c.a)({},i.data.orders[e]),{},{orders:[].concat(Object(s.a)(d.data.orders[e].customOrders),Object(s.a)(d.data.orders[e].menuOrders)),customOrders:null,menuOrders:null})),n}));case 13:l=d.data.orders.length,m=0,f=0,b=0,Object.keys(d.data.orders).map((function(t){return"pending"===d.data.orders[t].status?f+=1:"delivered"===d.data.orders[t].status&&(b+=1),"cancelled"!==d.data.orders[t].status&&(m+=d.data.orders[t].price),"All Orders"===e?(n.push(Object(c.a)(Object(c.a)({},d.data.orders[t]),{},{orders:[].concat(Object(s.a)(d.data.orders[t].customOrders),Object(s.a)(d.data.orders[t].menuOrders)),customOrders:null,menuOrders:null})),n):""})),r(v({order:n,totalOrders:l,pendingOrders:f,completedOrders:b,totalPrice:m})),t.next=25;break;case 21:t.prev=21,t.t0=t.catch(1),g=Object(c.a)({},t.t0).response,r(h(g));case 25:case"end":return t.stop()}}),t,null,[[1,21]])})));return function(e){return t.apply(this,arguments)}}()},y=function(e){return{type:o.Hb,response:e}},O=function(e){var t=e.status,r=e._id;return function(){var e=Object(u.a)(a.a.mark((function e(n){var s;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,p()({url:"/api/v1/orders/".concat(r),method:"PATCH",data:{status:t}});case 3:s=e.sent,n(y(s.data)),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),n(y(e.t0.response.data));case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}()},j=function(e){return{type:o.Z,order:e}},_=function(e){return function(){var t=Object(u.a)(a.a.mark((function t(r){var n,u,i;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r({type:o.Y}),t.prev=1,t.next=4,p()({url:"/api/v1/orders/".concat(e),method:"get"});case 4:n=t.sent,i=[],n.data.order.customOrders.map((function(e){return i.push({_id:{ingredients:e.ingredients,title:e.name,foodType:e.foodType,_id:e._id,photo:e.photo,price:e.price},items:parseInt(e.items)}),i})),u=Object(c.a)(Object(c.a)({},n.data.order),{},{orders:[].concat(i,Object(s.a)(n.data.order.menuOrders)),customOrders:null,menuOrders:null}),r(j(u)),t.next=14;break;case 11:t.prev=11,t.t0=t.catch(1),r((a=t.t0.response.data,{type:o.Z,error:a}));case 14:case"end":return t.stop()}var a}),t,null,[[1,11]])})));return function(e){return t.apply(this,arguments)}}()}},83:function(e,t,r){"use strict";var n=r(1),a=r.n(n);t.a=function(e){var t,r=!1;return 0===e.items&&(r=!0,t="btn btn__primary-disabled"),a.a.createElement("div",{className:"btn__addOrRemove ".concat(e.className)},a.a.createElement("button",{type:"button",onClick:e.addItem,className:e.classes},"+"),a.a.createElement("p",{className:"u-text-tertiary ".concat(e.valueClass)},e.items),a.a.createElement("button",{type:"button",onClick:e.removeItem,disabled:r,className:t||e.classes},"-"))}},84:function(e,t,r){"use strict";r.d(t,"a",(function(){return p})),r.d(t,"e",(function(){return d})),r.d(t,"b",(function(){return l})),r.d(t,"c",(function(){return m})),r.d(t,"d",(function(){return f}));var n=r(4),a=r.n(n),s=r(0),c=r(7),u=r(2),o=r(18),i=r.n(o),p=function(e){return{type:u.b,name:e}},d=function(e){return{type:u.lb,name:e}},l=function(e){return{type:u.g,ingredients:e}},m=function(){return{type:u.h}},f=function(){return function(){var e=Object(c.a)(a.a.mark((function e(t){var r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,i.a.get("/api/v1/ingredients");case 3:r=e.sent,t((a=r.data.ingredients,{type:u.H,ingredients:a})),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),t((n=Object(s.a)({},e.t0).response.data,{type:u.F,error:n}));case 10:case"end":return e.stop()}var n,a}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}()}},85:function(e,t,r){"use strict";r.d(t,"d",(function(){return l})),r.d(t,"e",(function(){return m})),r.d(t,"a",(function(){return f})),r.d(t,"f",(function(){return b})),r.d(t,"g",(function(){return v})),r.d(t,"h",(function(){return h})),r.d(t,"b",(function(){return g})),r.d(t,"c",(function(){return y}));var n=r(4),a=r.n(n),s=r(0),c=r(7),u=r(2),o=r(18),i=r.n(o),p=r(84),d=function(e){return{type:u.E,burgers:e}},l=function(){return function(){var e=Object(c.a)(a.a.mark((function e(t){var r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t({type:u.G}),e.prev=1,e.next=4,i.a.get("/api/v1/ingredients");case 4:r=e.sent,t((a=r.data.ingredients,{type:u.H,ingredients:a})),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),t((n=Object(s.a)({},e.t0).response.data,{type:u.F,error:n}));case 11:case"end":return e.stop()}var n,a}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}()},m=function(){return function(){var e=Object(c.a)(a.a.mark((function e(t){var r,n,c;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t({type:u.D}),e.prev=1,e.next=4,i.a.get("/api/v1/burgers");case 4:r=e.sent,n=r.data.burgers,t(d(n)),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(1),c=Object(s.a)({},e.t0).response?Object(s.a)({},e.t0).response:e.t0,t((a=c,{type:u.C,error:a}));case 13:case"end":return e.stop()}var a}),e,null,[[1,9]])})));return function(t){return e.apply(this,arguments)}}()},f=function(e){return{type:u.Bb,name:e}},b=function(e){return{type:u.Cb,name:e}},v=function(e){return{type:u.pb,ings:e}},h=function(e){return function(){var t=Object(c.a)(a.a.mark((function t(r){var n,c;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e._id?e._id:e.get("_id"),t.prev=1,t.next=4,i()({url:"/api/v1/burgers/".concat(n),data:e,method:"PATCH"});case 4:c=t.sent,r((o=c.data,{type:u.rb,status:o})),r(m()),r(Object(p.d)()),t.next=13;break;case 10:t.prev=10,t.t0=t.catch(1),r((a=Object(s.a)({},t.t0.response.data),{type:u.qb,error:a}));case 13:case"end":return t.stop()}var a,o}),t,null,[[1,10]])})));return function(e){return t.apply(this,arguments)}}()},g=function(e){return function(){var t=Object(c.a)(a.a.mark((function t(r){var n;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,i()({url:"/api/v1/burgers",data:e,method:"POST"});case 3:n=t.sent,r((c=n.data,{type:u.k,status:c})),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),r((a=Object(s.a)({},t.t0.response.data),{type:u.i,error:a}));case 10:case"end":return t.stop()}var a,c}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}()},y=function(e){return function(){var t=Object(c.a)(a.a.mark((function t(r){var n;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,r({type:u.t}),t.next=4,i()({url:"/api/v1/burgers/".concat(e),method:"delete"});case 4:n=t.sent,r((c=n.data,{type:u.u,response:c})),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),r((a=Object(s.a)({},t.t0.response.data),{type:u.s,error:a}));case 11:case"end":return t.stop()}var a,c}),t,null,[[0,8]])})));return function(e){return t.apply(this,arguments)}}()}},86:function(e,t,r){"use strict";r.d(t,"a",(function(){return s})),r.d(t,"d",(function(){return c})),r.d(t,"c",(function(){return u})),r.d(t,"e",(function(){return o})),r.d(t,"b",(function(){return i}));var n=r(2),a=r(82),s=function(e){return{type:n.a,burgerObj:e}},c=function(e){return{type:n.ab,burgerObj:e}},u=function(e){return{type:n.r,burgerObj:e}},o=function(e){return{type:n.kb,burgerObj:e}},i=function(){return function(e){e(p()),e(a.a())}},p=function(){return{type:n.f}}},89:function(e,t,r){"use strict";var n=r(13),a=r(14),s=r(16),c=r(15),u=r(1),o=r.n(u),i=r(81),p=r.n(i),d=r(8),l=r(83),m=function(e){Object(s.a)(r,e);var t=Object(c.a)(r);function r(){var e;Object(n.a)(this,r);for(var a=arguments.length,s=new Array(a),c=0;c<a;c++)s[c]=arguments[c];return(e=t.call.apply(t,[this].concat(s))).state={showAlert:!1,showAddorRemoveBtn:!1},e.ingredients=Object.keys(e.props.ingredients).map((function(t){return o.a.createElement("p",{key:p()(),className:"card__menu-ingredient"},o.a.createElement("span",{className:"card__menu-ingredient-name"},e.props.ingredients[t].name),"\xa0\u2715\xa0",o.a.createElement("span",null,e.props.ingredients[t].amount))})),e}return Object(a.a)(r,[{key:"render",value:function(){var e,t=this,r={_id:this.props._id,title:this.props.title,initialprice:this.props.initialprice,foodType:this.props.foodType,ingredients:this.props.ingredients,BurgerImage:this.props.burgerImage,items:this.props.items,price:this.props.price};return Object.keys(this.props.menuBurgers).map((function(n){return"menu"!==t.props.page?e=o.a.createElement("button",{onClick:function(){return t.props.chooseBurger(t.props._id)},className:"btn btn__primary card__menu-btn"},"Update Settings"):t.props.cartBurgers&&t.props.cartBurgers[t.props.title]?t.props.cartBurgers[t.props.title].items>0?(r.items=t.props.cartBurgers[t.props.title].items,e=o.a.createElement(l.a,{valueClass:"u-fontSize-3rem",className:"card__menu-btn",classes:"btn btn__primary btn__primary-round btn--large ",removeItem:function(){return t.props.removeItem(r)},addItem:function(){return t.props.addItem(r)},items:t.props.cartBurgers[t.props.title].items})):e:e=o.a.createElement("button",{onClick:function(){return t.props.addItemToCart(r)},className:"btn btn__primary card__menu-btn"},"Add to Cart")})),o.a.createElement("div",{className:"card__menu"},o.a.createElement("img",{src:this.props.burgerImage,alt:"burger",className:"card__menu-img"}),o.a.createElement("h3",{className:"card__menu-title"},this.props.title),o.a.createElement("p",{className:"u-text-".concat(this.props.foodType," card__menu-foodType")},this.props.foodType),o.a.createElement("div",{className:"card__menu-ingredients"},this.ingredients),o.a.createElement("p",{className:"card__menu-price"},"Rs ",this.props.initialprice),e)}}]),r}(u.Component);t.a=Object(d.b)((function(e){return{cart:e.cart.cart,cartBurgers:e.cart.Burgers,menuBurgers:e.menu.Burgers}}))(m)}}]);
//# sourceMappingURL=7.02efa378.chunk.js.map