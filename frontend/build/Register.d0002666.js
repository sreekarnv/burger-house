!function(){function e(e,r,t,n){Object.defineProperty(e,r,{get:t,set:n,enumerable:!0,configurable:!0})}var r=("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequireb892;r.register("d0MFz",(function(t,n){var s;s=t.exports,Object.defineProperty(s,"__esModule",{value:!0,configurable:!0}),e(t.exports,"default",(function(){return y}));var a=r("eGTdo"),o=r("9DAHI"),i=r("21wn6"),u=r("MTsmO"),l=r("36btx"),c=r("bxYpe"),d=r("hZ42O"),f=r("2WtOj"),m=r("eG9zp"),p=r("7NZTF"),g=r("kTDF1"),h=r("39Qpo"),w=r("8j5RM"),v=r("31Nor"),x=r("9lsgi"),b=u.object().shape({name:u.string().required("user must provide their name").trim(),email:u.string().required("user must provide their email").email("please provide a valid email").trim(),password:u.string().required("user must provide a password").min(6,"password must contain atleast 6 characters"),passwordConfirm:u.string().required("users must confirm their password").when("password",{is:function(e){return!!(e&&e.length>0)},then:u.string().oneOf([u.ref("password")],"passwords do not match")})}),j={name:"",email:"",password:"",passwordConfirm:""},y=function(){x.default();var e=h.default(),r=e.alertMessage,t=e.alertType,n=e.setAlert,s=e.showAlert,u=d.useSelector((function(e){return e.location.location})),y=d.useDispatch(),T=w.default(),N=T.isOpen,_=T.onToggle,S=v.default({onSuccess:function(){n("success","Your account has been created successfully..")},onError:function(e){var r,t;n("danger",(null==e||null===(r=e.response)||void 0===r||null===(t=r.data)||void 0===t?void 0:t.message)||"something went wrong")}}),F=S.register,A=S.isLoading;return i.useEffect((function(){y(N?l.updateAllowLocation(!0):l.updateAllowLocation(!1))}),[N,l,y]),o.jsxs(o.Fragment,{children:[s&&o.jsx(f.default,{position:"top-center",type:t,children:r}),o.jsx("div",{className:"register",children:o.jsx(c.Formik,{onSubmit:function(e,r){F(a.objectSpread({},e,{location:u})),r.resetForm()},validationSchema:b,initialValues:j,children:o.jsx(c.Form,{className:"register__form",autoComplete:"off",children:o.jsxs("div",{className:"register__form-content",children:[o.jsx("h1",{className:"u-mb-7 u-ftwt-400 u-text-primary heading-2",children:"Register"}),o.jsx(p.default,{label:"Name",name:"name"}),o.jsx(p.default,{label:"Email",name:"email"}),o.jsx(p.default,{type:"password",label:"Password",name:"password"}),o.jsx(p.default,{type:"password",label:"Password Confirm",name:"passwordConfirm"}),o.jsxs("div",{className:"register__form-switch u-mb-10",children:[o.jsx(g.default,{active:N,color:"tertiary",onToggle:_}),o.jsx("span",{className:"u-ml-5",children:"Address (Give Access To Your Location)"})]}),o.jsx(m.default,{children:A?"Loading...":"Register"})]})})})})]})}})),r.register("kTDF1",(function(t,n){e(t.exports,"default",(function(){return a}));var s=r("9DAHI"),a=r("21wn6").memo((function(e){var r=e.active,t=e.onToggle,n=e.color,a=void 0===n?"primary":n,o=e.className;return s.jsx(s.Fragment,{children:[s.jsx("label",{className:"switch ".concat(r?"switch__active  u-bg-".concat(a):""," ").concat(o),onClick:function(){t()},children:s.jsx("div",{className:"switch__slider"})})]})}))})),r.register("31Nor",(function(t,n){e(t.exports,"default",(function(){return c}));var s=r("eGTdo"),a=r("l7kuk"),o=r("4bU42"),i=r("6HHIu"),u=r("ijCuw"),l=s.asyncToGenerator(u.mark((function e(r){var t;return u.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.default({method:"POST",url:"/api/v2/users/register",data:r});case 2:return t=e.sent,e.abrupt("return",t.data.user);case 4:case"end":return e.stop()}}),e)}))),c=function(e){var r=e.onError,t=e.onSettled,n=e.onSuccess,s=o.useHistory(),a=i.useMutation((function(e){return l(e)}),{onSuccess:function(e){n&&n(e)},onError:function(e){r&&r(e)},onSettled:function(e,r){t&&t(e,r),e&&setTimeout((function(){s.replace("/auth/login")}),1500)}}),u=a.mutate,c=a.isLoading;return{register:u,data:a.data,isLoading:c,error:a.error}}}))}();