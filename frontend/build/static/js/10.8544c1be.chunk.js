(this["webpackJsonpburger-house-frontend"]=this["webpackJsonpburger-house-frontend"]||[]).push([[10],{133:function(e,t,r){"use strict";r.r(t);var a=r(2),n=r(6),s=r.n(n),c=r(10),u=r(23),o=r(1),i=r(15),p=r.n(i),l=r(0),d=r(5),f=r(7),b=r(18),m=r(36),j=r(84),v=r(82);t.default=function(){var e=Object(d.d)((function(e){return e.auth.user})),t=Object(d.c)(),r=Object(d.d)((function(e){return e.user.userUpdateError})),n=Object(f.g)(),i=Object(l.useState)(!1),h=Object(u.a)(i,2),O=h[0],x=h[1],y=Object(l.useState)(!1),w=Object(u.a)(y,2),_=w[0],g=w[1],N=Object(l.useState)(),k=Object(u.a)(N,2),C=k[0],S=k[1];Object(l.useEffect)((function(){if(r){g(!0);var e=setTimeout((function(){g(!1)}),2e3);return function(){return clearTimeout(e)}}}),[r]);var P=Object(l.useState)({email:{type:"email",label:"Email",required:!0,value:e.email},name:{type:"text",label:"Name",required:!0,value:e.name},photo:{type:"file",label:"photo",value:"",preview:e.photoUrl}}),U=Object(u.a)(P,2),q=U[0],F=U[1],T=Object(l.useState)({currentPassword:{type:"password",label:"Password Current",required:!0,value:""},password:{type:"password",label:"Password New",required:!0,value:""},passwordConfirm:{type:"password",label:"Password Confirm",required:!0,value:""}}),D=Object(u.a)(T,2),E=D[0],A=D[1],G=function(){var r=Object(c.a)(s.a.mark((function r(a){var n;return s.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:a.preventDefault(),n=new FormData,e.name!==q.name.value&&n.append("name",q.name.value),e.email!==q.email.value&&n.append("email",q.email.value),""!==q.photo.value&&n.append("photo",q.photo.value),t(v.c(n));case 6:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}(),H=function(){var e=Object(c.a)(s.a.mark((function e(t){var r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),x(!0),r={currentPassword:E.currentPassword.value,password:E.password.value,passwordConfirm:E.passwordConfirm.value},e.prev=3,e.next=6,p()({method:"POST",url:"/api/v2/users/updateCurrentUserPassword",data:r});case 6:if(!e.sent){e.next=10;break}return x(!1),e.abrupt("return",n.replace("/logout"));case 10:e.next=16;break;case 12:e.prev=12,e.t0=e.catch(3),g(!0),S(Object(a.a)({},e.t0.response.data));case 16:x(!1);case 17:case"end":return e.stop()}}),e,null,[[3,12]])})));return function(t){return e.apply(this,arguments)}}();return O?Object(o.jsx)(b.a,{fullScreen:!0}):Object(o.jsxs)(o.Fragment,{children:[_&&(r||C)&&Object(o.jsxs)(m.a,{variant:"danger",children:[r&&r.message,C&&C.message]}),Object(o.jsxs)("div",{className:"user-settings",children:[Object(o.jsxs)("form",{onSubmit:G,autoComplete:"off",className:"user-settings__update-form user-settings__update-form--1",children:[Object(o.jsx)("div",{className:"form__group",children:Object(o.jsx)("h2",{className:"heading-2 u-text-primary u-ftwt-400",children:"Update User Details"})}),Object.keys(q).map((function(e){return Object(o.jsx)(j.a,{formState:q,id:e,onFormStateChange:F},e)})),Object(o.jsx)("div",{className:"form__group",children:Object(o.jsx)("button",{className:"btn btn__tertiary auth-form__cta",type:"submit",children:"Update Details"})})]}),Object(o.jsxs)("form",{onSubmit:H,autoComplete:"off",className:"user-settings__update-form user-settings__update-form--2",children:[Object(o.jsx)("div",{className:"form__group",children:Object(o.jsx)("h2",{className:"heading-2 u-text-primary u-ftwt-400",children:"Update User Password"})}),Object.keys(E).map((function(e){return Object(o.jsx)(j.a,{formState:E,id:e,onFormStateChange:A},e)})),Object(o.jsx)("div",{className:"form__group",children:Object(o.jsx)("button",{className:"btn btn__tertiary auth-form__cta",type:"submit",children:"Update Password"})})]})]})]})}},82:function(e,t,r){"use strict";r.d(t,"c",(function(){return p})),r.d(t,"b",(function(){return l})),r.d(t,"a",(function(){return d})),r.d(t,"f",(function(){return f})),r.d(t,"g",(function(){return b})),r.d(t,"e",(function(){return m})),r.d(t,"d",(function(){return j}));var a=r(6),n=r.n(a),s=r(10),c=r(15),u=r.n(c),o=r(35),i=r(3),p=function(e){return function(){var t=Object(s.a)(n.a.mark((function t(r){var a;return n.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r({type:i.cb}),t.prev=1,t.next=4,u()({method:"PATCH",url:"/api/v2/users/me",data:e});case 4:a=t.sent,r({type:i.db}),r(Object(o.c)(a.data.data)),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(1),r((n=t.t0.response.data,{type:i.bb,error:n}));case 12:case"end":return t.stop()}var n}),t,null,[[1,9]])})));return function(e){return t.apply(this,arguments)}}()},l=function(){return function(){var e=Object(s.a)(n.a.mark((function e(t){var r;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t({type:i.z}),e.prev=1,e.next=4,u()({method:"GET",url:"/api/v2/users/me/orders"});case 4:r=e.sent,t((n=r.data.data,{type:i.A,orders:n})),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),t((a=e.t0.response.data,{type:i.y,error:a}));case 11:case"end":return e.stop()}var a,n}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}()},d=function(e){return function(){var t=Object(s.a)(n.a.mark((function t(r){var a;return n.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r({type:i.C}),t.prev=1,t.next=4,u()({method:"GET",url:"/api/v2/users/me/orders/".concat(e)});case 4:a=t.sent,r((s=a.data.data,{type:i.D,order:s})),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(1),r((n=t.t0.response.data,{type:i.B,error:n}));case 11:case"end":return t.stop()}var n,s}),t,null,[[1,8]])})));return function(e){return t.apply(this,arguments)}}()},f=function(){return{type:i.fb}},b=function(e){return{type:i.gb,order:e}},m=function(e){return{type:i.eb,error:e}},j=function(e,t){return function(){var r=Object(s.a)(n.a.mark((function r(a){var s;return n.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return a(f()),r.prev=1,r.next=4,u()({method:"PATCH",url:"/api/v2/users/me/orders/".concat(e),data:{status:t||"cancelled"}});case 4:s=r.sent,a(b(s.data.data)),r.next=11;break;case 8:r.prev=8,r.t0=r.catch(1),a(m(r.t0.response.data));case 11:case"end":return r.stop()}}),r,null,[[1,8]])})));return function(e){return r.apply(this,arguments)}}()}},84:function(e,t,r){"use strict";var a=r(37),n=r(2),s=r(1);r(0);t.a=function(e){var t=e.id,r=e.formState,c=e.onFormStateChange;return"file"===r[t].type?Object(s.jsxs)("div",{className:"form__group form__group-sb",children:[Object(s.jsx)("label",{className:"btn btn__goto u-text-tertiary",htmlFor:t,children:"Upload Photo"}),Object(s.jsx)("input",{onChange:function(e){c(Object(n.a)(Object(n.a)({},r),{},Object(a.a)({},t,Object(n.a)(Object(n.a)({},r[t]),{},{value:e.target.files[0],preview:URL.createObjectURL(e.target.files[0])}))))},name:t,id:t,style:{display:"none"},type:r[t].type||"text"}),Object(s.jsx)("div",{className:"form__image",children:Object(s.jsx)("img",{src:r[t].preview,alt:t})})]}):Object(s.jsxs)("div",{className:"form__group",children:[Object(s.jsx)("label",{htmlFor:t,className:"form__label",children:r[t].label}),Object(s.jsx)("input",{className:"form__input",value:r[t].value,onChange:function(e){c(Object(n.a)(Object(n.a)({},r),{},Object(a.a)({},t,Object(n.a)(Object(n.a)({},r[t]),{},{value:e.target.value}))))},name:t,id:t,placeholder:r[t].placeholder,type:r[t].type||"text",required:r[t].required})]})}}}]);
//# sourceMappingURL=10.8544c1be.chunk.js.map