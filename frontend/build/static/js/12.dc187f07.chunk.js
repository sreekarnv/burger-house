(this["webpackJsonpburger-house-frontend"]=this["webpackJsonpburger-house-frontend"]||[]).push([[12],{127:function(e,t,r){"use strict";r.r(t);var a=r(23),s=r(1),c=r(0),n=r(5),i=r(7),o=r(9),u=r(36),l=r(84),b=r(35);t.default=Object(n.b)((function(e){return{user:e.auth.user,loginUserInit:e.auth.loginUserInit,loginUserError:e.auth.loginUserError,cartValue:e.cart.cartValue,registerUserStatus:e.auth.registerUserStatus}}),(function(e){return{loginUser:function(t){return e(b.b(t))},resetRegisterUserStatus:function(){return e(b.f())}}}))((function(e){var t=e.user,r=e.loginUserInit,n=e.loginUser,b=e.cartValue,j=e.loginUserError,m=e.resetRegisterUserStatus,f=e.registerUserStatus,d=Object(i.g)().replace,h=Object(c.useState)(!1),O=Object(a.a)(h,2),g=O[0],p=O[1];Object(c.useEffect)((function(){if(f){p(!0);var e=setTimeout((function(){m(),p(!1)}),8e3);return function(){return clearTimeout(e)}}}),[m,f]),Object(c.useEffect)((function(){j&&p(!0)}),[j]),Object(c.useEffect)((function(){return t&&b>0?d("/cart"):t?d("/menu"):void 0}),[t,d,b]);var v=Object(c.useState)({email:{type:"email",label:"Email",required:!0,value:""},password:{type:"password",label:"Password",required:!0,value:""}}),_=Object(a.a)(v,2),x=_[0],y=_[1];return Object(s.jsxs)(s.Fragment,{children:[g&&j&&Object(s.jsx)(u.a,{show:j,variant:"danger",children:j.message}),g&&f&&Object(s.jsx)(u.a,{show:"success"===f,variant:"success",children:"Account Created Successfully. Check your email to activate your account"}),Object(s.jsx)("section",{className:"auth-form login",children:Object(s.jsxs)("form",{className:"auth-form__form",autoComplete:"off",onSubmit:function(e){e.preventDefault();var t={email:x.email.value,password:x.password.value};n(t)},children:[Object(s.jsx)("div",{className:"form__group",children:Object(s.jsx)("h2",{className:"heading-1 u-text-primary u-ftwt-400",children:"Login"})}),Object.keys(x).map((function(e){return Object(s.jsx)(l.a,{formState:x,id:e,onFormStateChange:y},e)})),Object(s.jsx)("div",{className:"form__group",children:Object(s.jsx)("button",{className:"btn btn__tertiary auth-form__cta",type:"submit",children:r?"Loading...":"Login"})}),Object(s.jsx)("div",{className:"form__group",children:Object(s.jsx)(o.c,{to:"/send-email-confirmation",className:"form__link  u-text-primary",children:"Account Not Verified ? Resend User Verification Email"})})]})})]})}))},84:function(e,t,r){"use strict";var a=r(37),s=r(2),c=r(1);r(0);t.a=function(e){var t=e.id,r=e.formState,n=e.onFormStateChange;return"file"===r[t].type?Object(c.jsxs)("div",{className:"form__group form__group-sb",children:[Object(c.jsx)("label",{className:"btn btn__goto u-text-tertiary",htmlFor:t,children:"Upload Photo"}),Object(c.jsx)("input",{onChange:function(e){n(Object(s.a)(Object(s.a)({},r),{},Object(a.a)({},t,Object(s.a)(Object(s.a)({},r[t]),{},{value:e.target.files[0],preview:URL.createObjectURL(e.target.files[0])}))))},name:t,id:t,style:{display:"none"},type:r[t].type||"text"}),Object(c.jsx)("div",{className:"form__image",children:Object(c.jsx)("img",{src:r[t].preview,alt:t})})]}):Object(c.jsxs)("div",{className:"form__group",children:[Object(c.jsx)("label",{htmlFor:t,className:"form__label",children:r[t].label}),Object(c.jsx)("input",{className:"form__input",value:r[t].value,onChange:function(e){n(Object(s.a)(Object(s.a)({},r),{},Object(a.a)({},t,Object(s.a)(Object(s.a)({},r[t]),{},{value:e.target.value}))))},name:t,id:t,placeholder:r[t].placeholder,type:r[t].type||"text",required:r[t].required})]})}}}]);
//# sourceMappingURL=12.dc187f07.chunk.js.map