(this["webpackJsonpburger-house-frontend"]=this["webpackJsonpburger-house-frontend"]||[]).push([[14],{136:function(e,t,a){"use strict";a.r(t);var r=a(8),n=a(6),c=a.n(n),u=a(2),i=a(10),o=a(23),s=a(1),l=a(0),b=a(7),p=a(84),d=a(15),j=a.n(d),m=a(18),O=a(31),h=a(5);t.default=function(){var e=Object(b.h)(),t=Object(h.d)((function(e){return e.auth.user})),a=Object(b.g)();Object(l.useEffect)((function(){if(t&&"admin"!==t.role)return a.replace("/dashboard")}),[a,t]);var n=Object(l.useState)({name:{type:"text",label:"Name",required:!0,value:""},price:{type:"text",label:"Price",required:!0,value:""},photo:{type:"file",label:"photo",value:"",preview:""}}),d=Object(o.a)(n,2),f=d[0],v=d[1],g=Object(l.useState)(),x=Object(o.a)(g,2),_=x[0],y=x[1],N=Object(l.useState)(!1),w=Object(o.a)(N,2),S=w[0],k=w[1],U=Object(l.useState)([]),C=Object(o.a)(U,2),E=C[0],F=C[1];if(Object(l.useEffect)((function(){_||(k(!0),function(){var t=Object(i.a)(c.a.mark((function t(){var a,r;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,j()({method:"GET",url:"/api/v2/burgers/".concat(e.slug)});case 3:a=t.sent,y(a.data.data),v({name:Object(u.a)(Object(u.a)({},f.name),{},{value:a.data.data.name}),price:Object(u.a)(Object(u.a)({},f.price),{},{value:a.data.data.price}),photo:Object(u.a)(Object(u.a)({},f.photo),{},{preview:a.data.data.photoUrl})}),r=[],a.data.data.ingredients.forEach((function(e){r.push(Object(u.a)(Object(u.a)({},e.ingredient),{},{amount:e.amount}))})),F(r),t.next=13;break;case 11:t.prev=11,t.t0=t.catch(0);case 13:k(!1);case 14:case"end":return t.stop()}}),t,null,[[0,11]])})));return function(){return t.apply(this,arguments)}}()())}),[e.slug,_,f]),S)return Object(s.jsx)(m.a,{fullScreen:!0});var q=function(){var t=Object(i.a)(c.a.mark((function t(a){var n,i,o,s,l;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.preventDefault(),n=new FormData,_.name!==f.name.value&&n.append("name",f.name.value),_.price!==f.price.value&&n.append("price",f.price.value),""!==f.photo.value&&n.append("photo",f.photo.value),i=[],Object(r.a)(E).forEach((function(e){i.push({ingredient:e._id,amount:e.amount})})),o=JSON.stringify(i),n.append("ingredients",o),t.prev=9,t.next=12,j()({method:"PATCH",url:"/api/v2/burgers/".concat(e.slug),data:n});case 12:s=t.sent,y(s.data.data),v({name:Object(u.a)(Object(u.a)({},f.name),{},{value:s.data.data.name}),price:Object(u.a)(Object(u.a)({},f.price),{},{value:s.data.data.price}),photo:Object(u.a)(Object(u.a)({},f.photo),{},{preview:s.data.data.photoUrl})}),l=[],s.data.data.ingredients.forEach((function(e){l.push(Object(u.a)(Object(u.a)({},e.ingredient),{},{amount:e.amount}))})),F(l),t.next=22;break;case 20:t.prev=20,t.t0=t.catch(9);case 22:case"end":return t.stop()}}),t,null,[[9,20]])})));return function(e){return t.apply(this,arguments)}}();return Object(s.jsx)("div",{className:"burger-detail",children:Object(s.jsxs)("form",{className:"burger-detail-form",onSubmit:q,children:[Object(s.jsxs)("h3",{className:"heading-1 u-text-primary u-text-capitalize u-ftwt-400",children:["Update ",f.name&&f.name.value]}),Object.keys(f).map((function(e){return Object(s.jsx)(p.a,{formState:f,id:e,onFormStateChange:v},e)})),Object(s.jsx)("div",{className:"burger-detail-burger form__group",children:Object(s.jsx)(O.a,{hideCta:!0,ingredients:E})}),Object(s.jsx)("div",{className:"form__group",children:Object(s.jsx)("button",{type:"submit",className:"btn btn__primary",children:"Update Burger"})})]})})}},84:function(e,t,a){"use strict";var r=a(37),n=a(2),c=a(1);a(0);t.a=function(e){var t=e.id,a=e.formState,u=e.onFormStateChange;return"file"===a[t].type?Object(c.jsxs)("div",{className:"form__group form__group-sb",children:[Object(c.jsx)("label",{className:"btn btn__goto u-text-tertiary",htmlFor:t,children:"Upload Photo"}),Object(c.jsx)("input",{onChange:function(e){u(Object(n.a)(Object(n.a)({},a),{},Object(r.a)({},t,Object(n.a)(Object(n.a)({},a[t]),{},{value:e.target.files[0],preview:URL.createObjectURL(e.target.files[0])}))))},name:t,id:t,style:{display:"none"},type:a[t].type||"text"}),Object(c.jsx)("div",{className:"form__image",children:Object(c.jsx)("img",{src:a[t].preview,alt:t})})]}):Object(c.jsxs)("div",{className:"form__group",children:[Object(c.jsx)("label",{htmlFor:t,className:"form__label",children:a[t].label}),Object(c.jsx)("input",{className:"form__input",value:a[t].value,onChange:function(e){u(Object(n.a)(Object(n.a)({},a),{},Object(r.a)({},t,Object(n.a)(Object(n.a)({},a[t]),{},{value:e.target.value}))))},name:t,id:t,placeholder:a[t].placeholder,type:a[t].type||"text",required:a[t].required})]})}}}]);
//# sourceMappingURL=14.3b2ad2f2.chunk.js.map