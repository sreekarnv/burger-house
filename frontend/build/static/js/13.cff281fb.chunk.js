(this["webpackJsonpburger-house-frontend"]=this["webpackJsonpburger-house-frontend"]||[]).push([[13],{130:function(e,t,a){"use strict";a.r(t);var n=a(23),r=a(1),s=a(0),i=a(5),c=a(84),l=a(18),o=a(35);t.default=Object(i.b)((function(e){return{sendEmailInit:e.auth.sendEmailInit,sendEmailStatus:e.auth.sendEmailStatus}}),(function(e){return{sendEmailConfirmation:function(t){return e(o.g(t))}}}))((function(e){var t=e.sendEmailInit,a=e.sendEmailStatus,i=e.sendEmailConfirmation,o=Object(s.useState)({email:{type:"email",label:"Email",required:!0,value:""}}),m=Object(n.a)(o,2),u=m[0],b=m[1];if(t)return Object(r.jsx)(l.a,{fullScreen:!0});return Object(r.jsxs)("div",{className:"send-email-confirm",children:[Object(r.jsxs)("form",{className:"send-email-confirm__form",autoComplete:"off",onSubmit:function(e){e.preventDefault(),""!==u.email.value&&i(u.email.value)},children:[Object(r.jsx)("div",{className:"form__group",children:Object(r.jsx)("h2",{className:"heading-1 u-text-primary u-ftwt-400",children:"Resend Email Confirmation"})}),Object.keys(u).map((function(e){return Object(r.jsx)(c.a,{formState:u,id:e,onFormStateChange:b},e)})),Object(r.jsx)("button",{type:"submit",className:"send-email-confirm__btn btn btn__tertiary",children:"Send"})]}),Object(r.jsx)("br",{}),"failed"===a&&Object(r.jsx)("p",{className:"send-email-confirm__error u-text-danger",children:"Something went wrong. Please try again later"}),"success"===e.sendEmailStatus&&Object(r.jsx)("p",{className:"send-email-confirm__error u-text-success",children:"Email sent successfully! Please check your email."})]})}))},84:function(e,t,a){"use strict";var n=a(37),r=a(2),s=a(1);a(0);t.a=function(e){var t=e.id,a=e.formState,i=e.onFormStateChange;return"file"===a[t].type?Object(s.jsxs)("div",{className:"form__group form__group-sb",children:[Object(s.jsx)("label",{className:"btn btn__goto u-text-tertiary",htmlFor:t,children:"Upload Photo"}),Object(s.jsx)("input",{onChange:function(e){i(Object(r.a)(Object(r.a)({},a),{},Object(n.a)({},t,Object(r.a)(Object(r.a)({},a[t]),{},{value:e.target.files[0],preview:URL.createObjectURL(e.target.files[0])}))))},name:t,id:t,style:{display:"none"},type:a[t].type||"text"}),Object(s.jsx)("div",{className:"form__image",children:Object(s.jsx)("img",{src:a[t].preview,alt:t})})]}):Object(s.jsxs)("div",{className:"form__group",children:[Object(s.jsx)("label",{htmlFor:t,className:"form__label",children:a[t].label}),Object(s.jsx)("input",{className:"form__input",value:a[t].value,onChange:function(e){i(Object(r.a)(Object(r.a)({},a),{},Object(n.a)({},t,Object(r.a)(Object(r.a)({},a[t]),{},{value:e.target.value}))))},name:t,id:t,placeholder:a[t].placeholder,type:a[t].type||"text",required:a[t].required})]})}}}]);
//# sourceMappingURL=13.cff281fb.chunk.js.map