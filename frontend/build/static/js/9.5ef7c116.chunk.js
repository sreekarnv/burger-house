(this["webpackJsonpburger-house-frontend"]=this["webpackJsonpburger-house-frontend"]||[]).push([[9],{101:function(e,t,r){"use strict";r.r(t);var a=r(23),s=r(1),c=r(0),n=r(5),i=r(7),o=r(84),l=r(36),u=r(89),b=r(35);t.default=Object(n.b)((function(e){return{user:e.auth.user,sendEmailInit:e.auth.sendEmailInit,registerUserInit:e.auth.registerUserInit,registerUserError:e.auth.registerUserError,registerUserStatus:e.auth.registerUserStatus}}),(function(e){return{registerUser:function(t){return e(b.e(t))}}}))((function(e){var t=e.user,r=e.registerUserInit,n=e.registerUser,b=e.registerUserError,j=e.sendEmailInit,m=e.registerUserStatus,d=Object(i.g)().replace,f=Object(c.useState)(!1),g=Object(a.a)(f,2),O=g[0],h=g[1],p=Object(c.useState)(!1),v=Object(a.a)(p,2),_=v[0],x=v[1];Object(c.useEffect)((function(){if(t)return d("/menu")}),[t,d]),Object(c.useEffect)((function(){if("success"===m)return d("/login")}),[m,d]);var w=Object(c.useState)({coordinates:[]}),y=Object(a.a)(w,2),N=y[0],U=y[1],E=Object(c.useState)({name:{type:"text",label:"Name",required:!0,value:""},email:{type:"email",label:"Email",required:!0,value:""},password:{type:"password",label:"Password",required:!0,value:""},passwordConfirm:{type:"password",label:"Password Confirm",required:!0,value:""}}),S=Object(a.a)(E,2),C=S[0],q=S[1];return Object(c.useEffect)((function(){_&&navigator.geolocation.getCurrentPosition((function(e){U({coordinates:[e.coords.longitude,e.coords.latitude]})}))}),[_]),Object(c.useEffect)((function(){b&&h(!0)}),[b,C]),Object(s.jsxs)(s.Fragment,{children:[O&&b&&Object(s.jsx)(l.a,{show:b,variant:"danger",children:b.message}),Object(s.jsx)("section",{className:"auth-form register",children:Object(s.jsxs)("form",{className:"auth-form__form",autoComplete:"off",onSubmit:function(e){e.preventDefault();var t={name:C.name.value,email:C.email.value,passwordConfirm:C.passwordConfirm.value,password:C.password.value,location:N};n(t),Object.keys(C).forEach((function(e){C[e].value=""})),U({coordinates:[]}),x(!1)},children:[Object(s.jsx)("div",{className:"form__group",children:Object(s.jsx)("h2",{className:"heading-1 u-text-primary u-ftwt-400",children:"Register"})}),Object.keys(C).map((function(e){return Object(s.jsx)(o.a,{formState:C,id:e,onFormStateChange:q},e)})),Object(s.jsxs)("div",{className:"form__group",children:[Object(s.jsx)("label",{className:"form__label",children:"Address (Give access to your location)"}),Object(s.jsx)(u.a,{active:_,onToggle:function(){return x(!_)}})]}),Object(s.jsx)("div",{className:"form__group",children:Object(s.jsx)("button",{className:"btn btn__tertiary auth-form__cta",type:"submit",children:r||j?"Loading...":"Register"})})]})})]})}))},84:function(e,t,r){"use strict";var a=r(37),s=r(2),c=r(1);r(0);t.a=function(e){var t=e.id,r=e.formState,n=e.onFormStateChange;return"file"===r[t].type?Object(c.jsxs)("div",{className:"form__group form__group-sb",children:[Object(c.jsx)("label",{className:"btn btn__goto u-text-tertiary",htmlFor:t,children:"Upload Photo"}),Object(c.jsx)("input",{onChange:function(e){n(Object(s.a)(Object(s.a)({},r),{},Object(a.a)({},t,Object(s.a)(Object(s.a)({},r[t]),{},{value:e.target.files[0],preview:URL.createObjectURL(e.target.files[0])}))))},name:t,id:t,style:{display:"none"},type:r[t].type||"text"}),Object(c.jsx)("div",{className:"form__image",children:Object(c.jsx)("img",{src:r[t].preview,alt:t})})]}):Object(c.jsxs)("div",{className:"form__group",children:[Object(c.jsx)("label",{htmlFor:t,className:"form__label",children:r[t].label}),Object(c.jsx)("input",{className:"form__input",value:r[t].value,onChange:function(e){n(Object(s.a)(Object(s.a)({},r),{},Object(a.a)({},t,Object(s.a)(Object(s.a)({},r[t]),{},{value:e.target.value}))))},name:t,id:t,placeholder:r[t].placeholder,type:r[t].type||"text",required:r[t].required})]})}},89:function(e,t,r){"use strict";var a=r(1),s=r(0),c=r.n(s).a.memo((function(e){var t=e.onToggle,r=e.active;return Object(a.jsx)(a.Fragment,{children:Object(a.jsx)("label",{className:"toggle-switch ".concat(r&&"toggle-switch__active"),onClick:t,children:Object(a.jsx)("div",{className:"toggle-switch__slider"})})})}));t.a=c}}]);
//# sourceMappingURL=9.5ef7c116.chunk.js.map