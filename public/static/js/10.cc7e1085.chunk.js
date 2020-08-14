(this["webpackJsonpburger-house"]=this["webpackJsonpburger-house"]||[]).push([[10],{121:function(e,t,n){"use strict";n.r(t);var r=n(5),a=n.n(r),s=n(16),c=n(12),o=n(13),u=n(15),l=n(14),i=n(1),p=n.n(i),m=n(6),f=n(85),h=n(93),d=n(98),b=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){var e=this;return p.a.createElement(f.a,{className:"users__list-item",to:"#"},p.a.createElement("h3",{className:"users__list-item-name"},"".concat(this.props.name.split(" ")[0]," ").concat(this.props.user._id===this.props._id?"(Me)":"")),p.a.createElement("h3",{className:"users__list-item-email"},this.props.email),p.a.createElement("p",{className:"users__list-item-role"},this.props.role),("customer"===this.props.role||this.props.user._id!==this.props._id)&&p.a.createElement("button",{onClick:function(){return e.props.edit(e.props._id)},className:"users__list-item-edit btn btn__edit"},p.a.createElement(d.a,null)),this.props.user._id!==this.props._id&&p.a.createElement("button",{onClick:function(){return e.props.delete(e.props._id)},className:"users__list-item-delete btn btn__delete"},p.a.createElement(h.a,null)))}}]),n}(i.Component),v=n(0),y=n(81),_=n(77),g=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(){var e;Object(c.a)(this,n);for(var r=arguments.length,a=new Array(r),s=0;s<r;s++)a[s]=arguments[s];return(e=t.call.apply(t,[this].concat(a))).state={formInput:{name:"",role:""}},e.onChangeHandler=function(t){var n=Object(_.b)(t,Object(v.a)({},e.state));e.setState(Object(v.a)({},n))},e.onSubmitHandler=function(t){t.preventDefault();var n={};Object.keys(Object(v.a)({},e.state.formInput)).map((function(t){return""!==e.state.formInput[t]&&(n[t]=e.state.formInput[t]),n})),e.props.getUsers(n)},e}return Object(o.a)(n,[{key:"render",value:function(){return p.a.createElement("form",{className:"users__filter-form",autoComplete:"off",onSubmit:this.onSubmitHandler},p.a.createElement(y.a,{inputtype:"input",type:"text",name:"name",placeholder:"Enter name of user",value:this.state.formInput.name,onChange:this.onChangeHandler,required:!1}),p.a.createElement("div",{className:"form__group"},p.a.createElement("select",{name:"role",id:"role",className:"form__input",value:this.state.role,onChange:this.onChangeHandler},p.a.createElement("option",{value:""},"All Users"),p.a.createElement("option",{value:"customer"},"Customer"),p.a.createElement("option",{value:"admin"},"Admin"))),p.a.createElement(y.a,{inputtype:"submit",value:"search",variant:"tertiary"}))}}]),n}(i.Component),O=n(17),E=n(2),j=n(19),w=n.n(j),N=function(e){return function(){var t=Object(s.a)(a.a.mark((function t(n){var r,s;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n({type:E.N}),t.prev=1,r=e?Object.keys(e).map((function(t,n){return"".concat(0===n?"?":"&").concat(t,"=").concat(e[t])})):"",t.next=5,w()({url:"/api/v1/users".concat(r),method:"get"});case 5:s=t.sent,n((c=s.data.users,{type:E.O,users:c})),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(1),n((a=t.t0,{type:E.M,error:a}));case 12:case"end":return t.stop()}var a,c}),t,null,[[1,9]])})));return function(e){return t.apply(this,arguments)}}()},k=n(87),C=n(31),x=function(e){Object(u.a)(n,e);var t=Object(l.a)(n);function n(){var e;Object(c.a)(this,n);for(var r=arguments.length,a=new Array(r),s=0;s<r;s++)a[s]=arguments[s];return(e=t.call.apply(t,[this].concat(a))).state={showModal:!1,message:"",type:"",userId:""},e.showModal=function(t,n,r){e.setState({showModal:!0,message:t,type:n,userId:r})},e.closeModal=function(){e.setState({showModal:!1,message:"",type:"",userId:""})},e.onEditHandler=function(t){e.showModal("Are you sure you want to make this customer an admin ? ","edit",t)},e.onDeleteHandler=function(t){e.showModal("Are you sure you want to delete this user ? ","delete",t)},e.onSubmitHandler=function(t){if("edit"===t){e.props.updateUser(e.state.userId,{role:"admin"})}else"delete"===t&&e.props.deleteUser(e.state.userId)},e}return Object(o.a)(n,[{key:"componentDidMount",value:function(){var e=Object(s.a)(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.props.getAllUsers();case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return this.props.getUsersInit?p.a.createElement("div",{className:"u-flex-center u-vh-100 u-bg-white dashboard__dashboard"},p.a.createElement(O.a,null)):p.a.createElement(p.a.Fragment,null,p.a.createElement(k.a,{show:this.state.showModal,close:this.closeModal,message:this.state.message,edit:this.props.message,type:this.state.type,submit:this.onSubmitHandler}),p.a.createElement(C.a,{show:this.state.showModal,close:this.closeModal}),p.a.createElement("div",{className:"users dashboard__dashboard"},p.a.createElement("h2",{className:"users__heading heading-1 u-text-primary"},"Users"),p.a.createElement(g,{getUsers:this.props.getAllUsers}),p.a.createElement("div",{className:"users__list"},this.props.users&&this.props.users.map((function(t){return p.a.createElement(b,{key:t._id,_id:t._id,role:t.role,name:t.name,user:e.props.user,email:t.email,edit:e.onEditHandler,delete:e.onDeleteHandler})})))))}}]),n}(i.Component);t.default=Object(m.b)((function(e){return{users:e.users.users,user:e.auth.user,getUsersInit:e.users.getUsersInit}}),(function(e){return{getAllUsers:function(t){return e(N(t))},updateUser:function(t,n){return e(function(e,t){return function(){var n=Object(s.a)(a.a.mark((function n(r){return a.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r({type:E.Cb}),n.prev=1,n.next=4,w()({method:"PATCH",url:"/api/v1/users/".concat(e),data:t});case 4:r(N()),n.next=10;break;case 7:n.prev=7,n.t0=n.catch(1),Object(v.a)({},n.t0.response.data),E.Bb;case 10:case"end":return n.stop()}}),n,null,[[1,7]])})));return function(e){return n.apply(this,arguments)}}()}(t,n))},deleteUser:function(t){return e(function(e){return function(){var t=Object(s.a)(a.a.mark((function t(n){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,w()({method:"DELETE",url:"/api/v1/users/".concat(e)});case 3:n(N()),t.next=9;break;case 6:t.prev=6,t.t0=t.catch(0),Object(v.a)({},t.t0.response.data),E.B;case 9:case"end":return t.stop()}}),t,null,[[0,6]])})));return function(e){return t.apply(this,arguments)}}()}(t))}}}))(x)},77:function(e,t,n){"use strict";n.d(t,"b",(function(){return s})),n.d(t,"a",(function(){return c}));var r=n(8),a=n(0),s=function(e,t){return Object(a.a)(Object(a.a)({},t),{},{formInput:Object(a.a)(Object(a.a)({},t.formInput),{},Object(r.a)({},e.target.name,e.target.value))})},c=function(e){var t=Object(a.a)({},e.formInput),n={};return Object.keys(t).map((function(e){return n[e]=""})),n}},81:function(e,t,n){"use strict";var r=n(1),a=n.n(r);t.a=function(e){if("input"===e.inputtype){var t=!1!==e.required;return a.a.createElement("div",{className:"form__group "},a.a.createElement("label",{className:"form__label"},e.label),a.a.createElement("input",{type:e.type,name:e.name,id:e.name,placeholder:e.placeholder,className:"form__".concat(e.inputtype," ").concat(e.className),onChange:e.onChange,minLength:e.minLength,value:e.value,required:t}))}if("submit"===e.inputtype){var n=a.a.createElement("input",Object.assign({type:"submit",value:e.value,className:"btn btn__".concat(e.variant," ").concat(e.className)},e));return a.a.createElement("div",{className:"form__group ".concat(e.formGroupClass)},n)}}},85:function(e,t,n){"use strict";var r=n(1),a=n.n(r),s=n(24);t.a=function(e){return a.a.createElement(s.b,{to:e.to?e.to:"#",className:"list__item ".concat(e.className),style:{listStyle:"none"}},e.children)}},87:function(e,t,n){"use strict";var r=n(12),a=n(13),s=n(15),c=n(14),o=n(1),u=n.n(o),l=function(e){Object(s.a)(n,e);var t=Object(c.a)(n);function n(){return Object(r.a)(this,n),t.apply(this,arguments)}return Object(a.a)(n,[{key:"render",value:function(){return u.a.createElement("div",{className:"modal modal__".concat(this.props.show," ").concat(this.props.className)},this.props.children)}}]),n}(o.Component),i=function(e){Object(s.a)(n,e);var t=Object(c.a)(n);function n(){var e;Object(r.a)(this,n);for(var a=arguments.length,s=new Array(a),c=0;c<a;c++)s[c]=arguments[c];return(e=t.call.apply(t,[this].concat(s))).onSubmitHandler=function(){e.props.submit(e.props.type),e.props.close()},e}return Object(a.a)(n,[{key:"render",value:function(){return u.a.createElement(l,{className:"confirm__modal",show:this.props.show},u.a.createElement("h4",{className:"confirm__modal-message"},this.props.message),u.a.createElement("button",{onClick:this.onSubmitHandler,className:"btn btn__success confirm__modal-btn-success"},"Yes"),u.a.createElement("button",{onClick:this.props.close,className:"btn btn__danger confirm__modal-btn-danger"},"No"))}}]),n}(o.Component);t.a=i},93:function(e,t,n){"use strict";var r=n(1),a=n.n(r);function s(){return(s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var o=a.a.createElement("title",null,"trash"),u=a.a.createElement("path",{d:"M3.389 7.113l1.101 10.908c0.061 0.461 2.287 1.977 5.51 1.979 3.225-0.002 5.451-1.518 5.511-1.979l1.102-10.908c-1.684 0.942-4.201 1.387-6.613 1.387-2.41 0-4.928-0.445-6.611-1.387zM13.168 1.51l-0.859-0.951c-0.332-0.473-0.692-0.559-1.393-0.559h-1.831c-0.7 0-1.061 0.086-1.392 0.559l-0.859 0.951c-2.57 0.449-4.434 1.64-4.434 2.519v0.17c0 1.547 3.403 2.801 7.6 2.801 4.198 0 7.601-1.254 7.601-2.801v-0.17c0-0.879-1.863-2.070-4.433-2.519zM12.070 4.34l-1.070-1.34h-2l-1.068 1.34h-1.7c0 0 1.862-2.221 2.111-2.522 0.19-0.23 0.384-0.318 0.636-0.318h2.043c0.253 0 0.447 0.088 0.637 0.318 0.248 0.301 2.111 2.522 2.111 2.522h-1.7z"}),l=function(e){var t=e.svgRef,n=e.title,r=c(e,["svgRef","title"]);return a.a.createElement("svg",s({width:20,height:20,viewBox:"0 0 20 20",ref:t},r),void 0===n?o:n?a.a.createElement("title",null,n):null,u)},i=a.a.forwardRef((function(e,t){return a.a.createElement(l,s({svgRef:t},e))}));n.p,t.a=function(e){return a.a.createElement(i,{className:"".concat(e.className)})}},98:function(e,t,n){"use strict";var r=n(1),a=n.n(r);function s(){return(s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var o=a.a.createElement("title",null,"edit"),u=a.a.createElement("path",{d:"M17.561 2.439c-1.442-1.443-2.525-1.227-2.525-1.227l-12.826 12.825-1.010 4.762 4.763-1.010 12.826-12.823c-0.001 0 0.216-1.083-1.228-2.527zM5.68 17.217l-1.624 0.35c-0.156-0.293-0.345-0.586-0.69-0.932s-0.639-0.533-0.932-0.691l0.35-1.623 0.47-0.469c0 0 0.883 0.018 1.881 1.016 0.997 0.996 1.016 1.881 1.016 1.881l-0.471 0.468z"}),l=function(e){var t=e.svgRef,n=e.title,r=c(e,["svgRef","title"]);return a.a.createElement("svg",s({width:20,height:20,viewBox:"0 0 20 20",ref:t},r),void 0===n?o:n?a.a.createElement("title",null,n):null,u)},i=a.a.forwardRef((function(e,t){return a.a.createElement(l,s({svgRef:t},e))}));n.p,t.a=function(e){return a.a.createElement(i,{className:e.className})}}}]);
//# sourceMappingURL=10.cc7e1085.chunk.js.map