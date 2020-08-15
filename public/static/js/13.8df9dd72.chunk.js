(this["webpackJsonpburger-house"]=this["webpackJsonpburger-house"]||[]).push([[13],{126:function(e,t,n){"use strict";n.r(t);var r=n(14),a=n(15),s=n(17),i=n(16),c=n(1),o=n.n(c),l=n(12),u=n(97),d=n(85),p=n(99),m=n(93),f=function(e){return o.a.createElement(d.a,{className:"ingredients__list-item"},o.a.createElement("img",{src:e.image,alt:e.name,className:"icon"}),o.a.createElement("h3",{className:"ingredients__list-item-name"},e.name),o.a.createElement("p",{className:"ingredients__list-item-price"},"Rs ",e.price),o.a.createElement("p",{className:"ingredients__list-item-diet u-text-".concat(e.foodType)},"none"!==e.foodType?e.foodType:"---"),o.a.createElement("button",{onClick:function(){return e.edit(e._id)},className:"ingredients__list-item-edit btn btn__edit"},o.a.createElement(p.a,null)),o.a.createElement("button",{onClick:function(){return e.delete(e._id)},className:"ingredients__list-item-delete btn btn__delete"},o.a.createElement(m.a,null)))},h=n(87),g=n(20),v=n(31),b=function(e){Object(s.a)(n,e);var t=Object(i.a)(n);function n(){var e;Object(r.a)(this,n);for(var a=arguments.length,s=new Array(a),i=0;i<a;i++)s[i]=arguments[i];return(e=t.call.apply(t,[this].concat(s))).state={isLoading:!1,showModal:!1,message:"",type:"",ingId:""},e.showModal=function(t,n,r){e.setState({showModal:!0,message:t,type:n,ingId:r})},e.closeModal=function(){e.setState({showModal:!1,message:"",type:"",ingId:""})},e.onCreateHandler=function(){return e.props.history.push("".concat(e.props.match.url,"/new"))},e.onEditHandler=function(t){return e.props.history.push("".concat(e.props.match.url,"/").concat(t))},e.onDeleteHandler=function(t){e.showModal("Are you sure you want to delete this ingredient ? ","delete",t)},e.onSubmitHandler=function(t){"delete"===t&&e.props.deleteIngredient(e.state.ingId)},e}return Object(a.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.setState({isLoading:!0}),this.timer=setTimeout((function(){e.props.getAllIngredients(),e.setState({isLoading:!1})}),2e3)}},{key:"render",value:function(){var e=this;return this.props.deleteIngredientInit||this.state.isLoading?o.a.createElement("div",{className:"dashboard__dashboard u-flex-center u-vh-100 u-bg-white"},o.a.createElement(g.a,null)):o.a.createElement(o.a.Fragment,null,o.a.createElement(h.a,{show:this.state.showModal,close:this.closeModal,message:this.state.message,edit:this.props.message,type:this.state.type,submit:this.onSubmitHandler}),o.a.createElement(v.a,{show:this.state.showModal,close:this.closeModal}),o.a.createElement("div",{className:"u-vh-100 ingredients dashboard__dashboard"},o.a.createElement("h2",{className:"ingredients__heading heading-1 u-text-primary"},"Manage Ingredients"),o.a.createElement("button",{className:"btn btn__tertiary-goTo ingredients__create-btn",onClick:this.onCreateHandler},"Create Ingredient"),o.a.createElement("div",{className:"ingredients__list"},this.props.ingredients&&this.props.ingredients.map((function(t){return o.a.createElement(f,{_id:t._id,name:t.name,image:t.photo,price:t.price,foodType:t.foodType,edit:e.onEditHandler,delete:e.onDeleteHandler})})))))}}]),n}(c.Component);t.default=Object(l.b)((function(e){return{ingredients:e.ingredients.ingredients,deleteIngredientStatus:e.ingredients.deleteIngredientStatus,deleteIngredientInit:e.ingredients.deleteIngredientsInit}}),(function(e){return{getAllIngredients:function(){return e(u.d())},deleteIngredient:function(t){return e(u.b(t))}}}))(b)},85:function(e,t,n){"use strict";var r=n(1),a=n.n(r),s=n(24);t.a=function(e){return a.a.createElement(s.b,{to:e.to?e.to:"#",className:"list__item ".concat(e.className),style:{listStyle:"none"}},e.children)}},87:function(e,t,n){"use strict";var r=n(14),a=n(15),s=n(17),i=n(16),c=n(1),o=n.n(c),l=function(e){Object(s.a)(n,e);var t=Object(i.a)(n);function n(){return Object(r.a)(this,n),t.apply(this,arguments)}return Object(a.a)(n,[{key:"render",value:function(){return o.a.createElement("div",{className:"modal modal__".concat(this.props.show," ").concat(this.props.className)},this.props.children)}}]),n}(c.Component),u=function(e){Object(s.a)(n,e);var t=Object(i.a)(n);function n(){var e;Object(r.a)(this,n);for(var a=arguments.length,s=new Array(a),i=0;i<a;i++)s[i]=arguments[i];return(e=t.call.apply(t,[this].concat(s))).onSubmitHandler=function(){e.props.submit(e.props.type),e.props.close()},e}return Object(a.a)(n,[{key:"render",value:function(){return o.a.createElement(l,{className:"confirm__modal",show:this.props.show},o.a.createElement("h4",{className:"confirm__modal-message"},this.props.message),o.a.createElement("button",{onClick:this.onSubmitHandler,className:"btn btn__success confirm__modal-btn-success"},"Yes"),o.a.createElement("button",{onClick:this.props.close,className:"btn btn__danger confirm__modal-btn-danger"},"No"))}}]),n}(c.Component);t.a=u},93:function(e,t,n){"use strict";var r=n(1),a=n.n(r);function s(){return(s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=a.a.createElement("title",null,"trash"),o=a.a.createElement("path",{d:"M3.389 7.113l1.101 10.908c0.061 0.461 2.287 1.977 5.51 1.979 3.225-0.002 5.451-1.518 5.511-1.979l1.102-10.908c-1.684 0.942-4.201 1.387-6.613 1.387-2.41 0-4.928-0.445-6.611-1.387zM13.168 1.51l-0.859-0.951c-0.332-0.473-0.692-0.559-1.393-0.559h-1.831c-0.7 0-1.061 0.086-1.392 0.559l-0.859 0.951c-2.57 0.449-4.434 1.64-4.434 2.519v0.17c0 1.547 3.403 2.801 7.6 2.801 4.198 0 7.601-1.254 7.601-2.801v-0.17c0-0.879-1.863-2.070-4.433-2.519zM12.070 4.34l-1.070-1.34h-2l-1.068 1.34h-1.7c0 0 1.862-2.221 2.111-2.522 0.19-0.23 0.384-0.318 0.636-0.318h2.043c0.253 0 0.447 0.088 0.637 0.318 0.248 0.301 2.111 2.522 2.111 2.522h-1.7z"}),l=function(e){var t=e.svgRef,n=e.title,r=i(e,["svgRef","title"]);return a.a.createElement("svg",s({width:20,height:20,viewBox:"0 0 20 20",ref:t},r),void 0===n?c:n?a.a.createElement("title",null,n):null,o)},u=a.a.forwardRef((function(e,t){return a.a.createElement(l,s({svgRef:t},e))}));n.p,t.a=function(e){return a.a.createElement(u,{className:"".concat(e.className)})}},97:function(e,t,n){"use strict";n.d(t,"d",(function(){return l})),n.d(t,"a",(function(){return d})),n.d(t,"c",(function(){return p})),n.d(t,"e",(function(){return f})),n.d(t,"b",(function(){return h}));var r=n(5),a=n.n(r),s=n(11),i=n(2),c=n(18),o=n.n(c),l=function(){return function(){var e=Object(s.a)(a.a.mark((function e(t){var n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,o()({method:"get",url:"/api/v1/ingredients"});case 3:n=e.sent,t((a=n.data,{type:i.U,res:a})),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),t((r=e.t0.response.data,{type:i.S,error:r}));case 10:case"end":return e.stop()}var r,a}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}()},u=function(e){return{type:i.n,res:e}},d=function(e){return function(){var t=Object(s.a)(a.a.mark((function t(n){var r;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n({type:i.m}),t.prev=1,t.next=4,o()({method:"POST",url:"/api/v1/ingredients",data:e});case 4:r=t.sent,n(u(r.data)),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(1),n((a=t.t0.response.data,{type:i.l,error:a}));case 11:case"end":return t.stop()}var a}),t,null,[[1,8]])})));return function(e){return t.apply(this,arguments)}}()},p=function(e){return function(){var t=Object(s.a)(a.a.mark((function t(n){var r;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,o()({method:"get",url:"".concat(URL,"/api/v1/ingredients/").concat(e)});case 3:r=t.sent,n((s=r.data,{type:i.X,res:s})),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),n((a=t.t0.response.data,{type:i.V,error:a}));case 10:case"end":return t.stop()}var a,s}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}()},m=function(e){return{type:i.yb,res:e}},f=function(e,t){return function(){var n=Object(s.a)(a.a.mark((function n(r){var s;return a.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r({type:i.xb}),n.prev=1,n.next=4,o()({method:"PATCH",url:"".concat(URL,"/api/v1/ingredients/").concat(t),data:e});case 4:s=n.sent,r(m(s.data)),n.next=11;break;case 8:n.prev=8,n.t0=n.catch(1),r((a=n.t0.response.data,{type:i.wb,error:a}));case 11:case"end":return n.stop()}var a}),n,null,[[1,8]])})));return function(e){return n.apply(this,arguments)}}()},h=function(e){return function(){var t=Object(s.a)(a.a.mark((function t(n){var r;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n({type:i.z}),t.prev=1,t.next=4,o()({method:"DELETE",url:"".concat(URL,"/api/v1/ingredients/").concat(e)});case 4:r=t.sent,n((s=r.data,{type:i.A,res:s})),n(l()),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(1),n((a=t.t0.response.data,{type:i.y,error:a}));case 12:case"end":return t.stop()}var a,s}),t,null,[[1,9]])})));return function(e){return t.apply(this,arguments)}}()}},99:function(e,t,n){"use strict";var r=n(1),a=n.n(r);function s(){return(s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=a.a.createElement("title",null,"edit"),o=a.a.createElement("path",{d:"M17.561 2.439c-1.442-1.443-2.525-1.227-2.525-1.227l-12.826 12.825-1.010 4.762 4.763-1.010 12.826-12.823c-0.001 0 0.216-1.083-1.228-2.527zM5.68 17.217l-1.624 0.35c-0.156-0.293-0.345-0.586-0.69-0.932s-0.639-0.533-0.932-0.691l0.35-1.623 0.47-0.469c0 0 0.883 0.018 1.881 1.016 0.997 0.996 1.016 1.881 1.016 1.881l-0.471 0.468z"}),l=function(e){var t=e.svgRef,n=e.title,r=i(e,["svgRef","title"]);return a.a.createElement("svg",s({width:20,height:20,viewBox:"0 0 20 20",ref:t},r),void 0===n?c:n?a.a.createElement("title",null,n):null,o)},u=a.a.forwardRef((function(e,t){return a.a.createElement(l,s({svgRef:t},e))}));n.p,t.a=function(e){return a.a.createElement(u,{className:e.className})}}}]);
//# sourceMappingURL=13.8df9dd72.chunk.js.map