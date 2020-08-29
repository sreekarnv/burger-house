(this["webpackJsonpburger-house"]=this["webpackJsonpburger-house"]||[]).push([[14],{122:function(e,t,a){"use strict";a.r(t);var s=a(5),n=a.n(s),r=a(12),o=a(14),u=a(15),c=a(17),l=a(16),i=a(1),p=a.n(i),m=a(13),h=a(0),d=a(83),f=a(78),b=a(23),g=a(76),w=function(e){Object(c.a)(a,e);var t=Object(l.a)(a);function a(){var e;Object(o.a)(this,a);for(var s=arguments.length,u=new Array(s),c=0;c<s;c++)u[c]=arguments[c];return(e=t.call.apply(t,[this].concat(u))).state={formInput:{name:e.props.user.name,email:e.props.user.email,photo:e.props.user.photo},alert:{show:!1,status:"",message:""},previewPhoto:e.props.user.photo,fileUploaded:!1},e.showAlertHandler=function(t,a){e.setState(Object(h.a)(Object(h.a)({},e.state),{},{alert:{show:!0,status:a,message:t}}))},e.onCloseHandler=function(){e.closeAlertTimer=setTimeout((function(){e.setState(Object(h.a)(Object(h.a)({},e.state),{},{alert:{show:!1,status:"",message:""}}))}),2e3)},e.onChangeHandler=function(t){var a=Object(f.b)(t,Object(h.a)({},e.state));e.setState(Object(h.a)({},a))},e.onFileChangeHandler=function(t){e.setState(Object(h.a)(Object(h.a)({},e.state),{},{formInput:Object(h.a)(Object(h.a)({},e.state.formInput),{},{photo:t.target.files[0]}),fileUploaded:!0,previewPhoto:URL.createObjectURL(t.target.files[0])}))},e.onSubmitHandler=function(){var t=Object(r.a)(n.a.mark((function t(a){var s,r,o;return n.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.preventDefault(),(s=new FormData).append("name",e.state.formInput.name),s.append("email",e.state.formInput.email),e.state.fileUploaded&&s.append("photo",e.state.formInput.photo),t.next=7,e.props.updateUserData(s);case 7:"success"===e.props.userDataStatus?(o=e.props.userDataStatus,r="User details updated Successfully",e.setState({formInput:Object(h.a)(Object(h.a)({},e.props.photo),{},{name:e.props.user.name,email:e.props.user.email,photo:e.props.user.photo}),previewPhoto:e.props.user.photo,fileUploaded:!1})):(o=e.props.userDataStatus.status,r=e.props.userDataStatus.message,e.setState({fileUploaded:!1})),e.showAlertHandler(r,o);case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e}return Object(u.a)(a,[{key:"render",value:function(){return p.a.createElement(p.a.Fragment,null,this.state.alert.status&&p.a.createElement(g.a,{close:this.onCloseHandler(),show:this.state.alert.show,status:this.state.alert.status,message:this.state.alert.message}),p.a.createElement("form",{onSubmit:this.onSubmitHandler,autoComplete:"off"},p.a.createElement("div",{className:"form__group"},p.a.createElement("h2",{className:"heading-1 u-text-primary u-ftwt-400"},"Update User Details")),p.a.createElement(d.a,{inputtype:"input",name:"name",type:"text",label:"name",onChange:this.onChangeHandler,value:this.state.formInput.name}),p.a.createElement(d.a,{inputtype:"input",name:"email",type:"email",label:"Email",onChange:this.onChangeHandler,value:this.state.formInput.email}),p.a.createElement("div",{className:"form__group u-flex-between"},p.a.createElement("div",null,p.a.createElement("input",{type:"file",id:"photo",onChange:this.onFileChangeHandler,style:{display:"none"}}),p.a.createElement("label",{htmlFor:"photo",className:"btn btn__tertiary-goTo btn__sm"},"Choose Image")),p.a.createElement("div",{className:"update__user-data-preview-img-bg "},p.a.createElement("img",{src:this.state.previewPhoto,className:"update__user-data-preview-img-image",alt:this.state.formInput.name}))),p.a.createElement(d.a,{inputtype:"submit",value:this.props.loading?"Loading....":"update details",variant:"tertiary"})))}}]),a}(i.Component),v=Object(m.b)((function(e){return{user:e.auth.user,loading:e.auth.updateUserDataInit,userDataStatus:e.auth.updateUserDataStatus}}),(function(e){return{updateUserData:function(t){return e(b.f(t))}}}))(w),y=function(e){Object(c.a)(a,e);var t=Object(l.a)(a);function a(){var e;Object(o.a)(this,a);for(var s=arguments.length,u=new Array(s),c=0;c<s;c++)u[c]=arguments[c];return(e=t.call.apply(t,[this].concat(u))).state={formInput:{passwordCurrent:"",password:"",passwordConfirm:""},alert:{show:!1,status:"",message:""}},e.showAlertHandler=function(t,a){e.setState(Object(h.a)(Object(h.a)({},e.state),{},{alert:{show:!0,status:a,message:t}}))},e.onCloseHandler=function(){e.closeAlertTimer=setTimeout((function(){e.setState(Object(h.a)(Object(h.a)({},e.state),{},{alert:{show:!1,status:"",message:""}}))}),2e3)},e.onChangeHandler=function(t){var a=Object(f.b)(t,Object(h.a)({},e.state));e.setState(Object(h.a)({},a))},e.onSubmitHandler=function(){var t=Object(r.a)(n.a.mark((function t(a){var s,r;return n.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.preventDefault(),t.next=3,e.props.updateUserPassword(e.state.formInput);case 3:"success"===e.props.userPasswordStatus?(r=e.props.userPasswordStatus,s="User Password updated Successfully",e.showAlertHandler(s,r),e.LogoutTimer=setTimeout((function(){e.props.history.replace("/logout")}),1500)):(r=e.props.userPasswordStatus.status,s=e.props.userPasswordStatus.message,e.showAlertHandler(s,r));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e}return Object(u.a)(a,[{key:"componentWillUnmount",value:function(){clearTimeout(this.LogoutTimer)}},{key:"render",value:function(){return p.a.createElement(p.a.Fragment,null,this.state.alert.status&&p.a.createElement(g.a,{close:this.onCloseHandler(),show:this.state.alert.show,status:this.state.alert.status,message:this.state.alert.message}),p.a.createElement("form",{onSubmit:this.onSubmitHandler},p.a.createElement("div",{className:"form__group"},p.a.createElement("h2",{className:"heading-1 u-text-primary u-ftwt-400"},"Update User Password")),p.a.createElement(d.a,{inputtype:"input",name:"passwordCurrent",type:"password",label:"Current Password",onChange:this.onChangeHandler,value:this.state.formInput.passwordCurrent,minLength:6}),p.a.createElement(d.a,{inputtype:"input",name:"password",type:"password",label:"Password",onChange:this.onChangeHandler,value:this.state.formInput.password,minLength:6}),p.a.createElement(d.a,{inputtype:"input",name:"passwordConfirm",type:"password",label:"Password Confirm",onChange:this.onChangeHandler,value:this.state.formInput.passwordConfirm,minLength:6}),p.a.createElement(d.a,{inputtype:"submit",value:"update password",variant:"tertiary"})))}}]),a}(i.Component),j=Object(m.b)((function(e){return{user:e.auth.user,loading:e.auth.updateUserPasswordInit,userPasswordStatus:e.auth.updateUserPasswordStatus}}),(function(e){return{updateUserPassword:function(t){return e(b.g(t))}}}))(y),O=a(20),_=a(95),E=a(31),C=a(79),S=function(e){Object(c.a)(a,e);var t=Object(l.a)(a);function a(){var e;Object(o.a)(this,a);for(var s=arguments.length,u=new Array(s),c=0;c<s;c++)u[c]=arguments[c];return(e=t.call.apply(t,[this].concat(u))).state={showModal:!1,message:"",type:""},e.showModal=function(t,a){e.setState({showModal:!0,message:t,type:a})},e.closeModal=function(){e.setState({showModal:!1,message:"",type:""})},e.onDeleteHandler=function(){e.showModal("Are you sure you want to delete your account ? ","delete")},e.onSubmitHandler=function(){var t=Object(r.a)(n.a.mark((function t(a){return n.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if("delete"!==a){t.next=4;break}return t.next=3,e.props.deleteCurrentUser();case 3:"success"===e.props.deleteUserStatus&&e.props.history.push("/logout");case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e}return Object(u.a)(a,[{key:"render",value:function(){return this.props.deleteUserInit?p.a.createElement("div",{className:"u-flex-center u-vh-100 u-bg-white dashboard__dashboard"},p.a.createElement(O.a,null)):this.props.user?p.a.createElement(C.a,null,p.a.createElement(_.a,{show:this.state.showModal,close:this.closeModal,message:this.state.message,edit:this.props.message,type:this.state.type,submit:this.onSubmitHandler}),p.a.createElement(E.a,{show:this.state.showModal,close:this.closeModal}),p.a.createElement("div",{className:"dashboard__dashboard update__user"},p.a.createElement("div",{className:"u-mx-auto update__user-data"},p.a.createElement(v,Object.assign({},this.props,{showAlert:this.showAlertHandler}))),p.a.createElement("div",{className:"u-mx-auto update__user-password"},p.a.createElement(j,this.props)),p.a.createElement("div",{className:"delete__user"},p.a.createElement("h4",{className:"heading-1 delete__user-heading"},"Delete My Account"),p.a.createElement("button",{onClick:this.onDeleteHandler,className:"btn btn__danger--outline"},"Delete")))):""}}]),a}(i.Component);t.default=Object(m.b)((function(e){return{user:e.auth.user,updateUserDataInit:e.auth.updateUserDataInit,deleteUserInit:e.auth.deleteUserInit,deleteUserStatus:e.auth.deleteUserStatus}}),(function(e){return{deleteCurrentUser:function(){return e(b.b())}}}))(S)},76:function(e,t,a){"use strict";var s=a(1),n=a.n(s);t.a=function(e){return n.a.createElement("div",{className:"alert alert__".concat(e.show," alert--").concat(e.status," ").concat(e.className)},e.message)}},78:function(e,t,a){"use strict";a.d(t,"b",(function(){return r})),a.d(t,"a",(function(){return o}));var s=a(8),n=a(0),r=function(e,t){return Object(n.a)(Object(n.a)({},t),{},{formInput:Object(n.a)(Object(n.a)({},t.formInput),{},Object(s.a)({},e.target.name,e.target.value))})},o=function(e){var t=Object(n.a)({},e.formInput),a={};return Object.keys(t).map((function(e){return a[e]=""})),a}},79:function(e,t,a){"use strict";var s=a(5),n=a.n(s),r=a(12),o=a(14),u=a(15),c=a(17),l=a(16),i=a(1),p=a.n(i),m=a(13),h=a(23),d=a(4),f=function(e){Object(c.a)(a,e);var t=Object(l.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"componentDidMount",value:function(){var e=Object(r.a)(n.a.mark((function e(){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.props.checkAuthState();case 2:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return this.props.user?this.props.children:p.a.createElement(d.a,{to:"/login"})}}]),a}(i.Component);t.a=Object(m.b)((function(e){return{user:e.auth.user,checkAuthInit:e.auth.checkAuthInit}}),(function(e){return{checkAuthState:function(){return e(h.a())}}}))(f)},83:function(e,t,a){"use strict";var s=a(1),n=a.n(s);t.a=function(e){if("input"===e.inputtype){var t=!1!==e.required;return n.a.createElement("div",{className:"form__group "},n.a.createElement("label",{className:"form__label"},e.label),n.a.createElement("input",{type:e.type,name:e.name,id:e.name,placeholder:e.placeholder,className:"form__".concat(e.inputtype," ").concat(e.className),onChange:e.onChange,minLength:e.minLength,value:e.value,required:t}))}if("submit"===e.inputtype){var a=n.a.createElement("input",Object.assign({type:"submit",value:e.value,className:"btn btn__".concat(e.variant," ").concat(e.className)},e));return n.a.createElement("div",{className:"form__group ".concat(e.formGroupClass)},a)}}},95:function(e,t,a){"use strict";var s=a(14),n=a(15),r=a(17),o=a(16),u=a(1),c=a.n(u),l=function(e){Object(r.a)(a,e);var t=Object(o.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(n.a)(a,[{key:"render",value:function(){return c.a.createElement("div",{className:"modal modal__".concat(this.props.show," ").concat(this.props.className)},this.props.children)}}]),a}(u.Component),i=function(e){Object(r.a)(a,e);var t=Object(o.a)(a);function a(){var e;Object(s.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).onSubmitHandler=function(){e.props.submit(e.props.type),e.props.close()},e}return Object(n.a)(a,[{key:"render",value:function(){return c.a.createElement(l,{className:"confirm__modal",show:this.props.show},c.a.createElement("h4",{className:"confirm__modal-message"},this.props.message),c.a.createElement("button",{onClick:this.onSubmitHandler,className:"btn btn__success confirm__modal-btn-success"},"Yes"),c.a.createElement("button",{onClick:this.props.close,className:"btn btn__danger confirm__modal-btn-danger"},"No"))}}]),a}(u.Component);t.a=i}}]);
//# sourceMappingURL=14.08a69d20.chunk.js.map