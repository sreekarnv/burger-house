(this["webpackJsonpburger-house"]=this["webpackJsonpburger-house"]||[]).push([[15],{119:function(e,t,n){"use strict";n.r(t);var a=n(5),r=n.n(a),s=n(16),o=n(0),i=n(12),c=n(13),p=n(15),u=n(14),d=n(1),l=n.n(d),m=n(81),f=n(77),h=n(6),g=n(96),v=n(18),b=n(76),I=function(e){Object(p.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(i.a)(this,n);for(var a=arguments.length,c=new Array(a),p=0;p<a;p++)c[p]=arguments[p];return(e=t.call.apply(t,[this].concat(c))).state={formInput:{name:"",price:"",foodType:"none",photo:""},previewPhoto:"",fileUploaded:!1,alert:{show:!1,status:"",message:""}},e.onChangeHandler=function(t){var n=Object(f.b)(t,Object(o.a)({},e.state));e.setState(Object(o.a)({},n))},e.onFileChangeHandler=function(t){e.setState(Object(o.a)(Object(o.a)({},e.state),{},{formInput:Object(o.a)(Object(o.a)({},e.state.formInput),{},{photo:t.target.files[0]}),fileUploaded:!0,previewPhoto:URL.createObjectURL(t.target.files[0])}))},e.showAlertHandler=function(t,n){e.setState(Object(o.a)(Object(o.a)({},e.state),{},{alert:{show:!0,status:n,message:t}}))},e.onCloseHandler=function(){e.closeAlertTimer=setTimeout((function(){e.setState(Object(o.a)(Object(o.a)({},e.state),{},{alert:{show:!1,status:"",message:""}}))}),2e3)},e.onSubmitHandler=function(t){return e.props.location.pathname.startsWith("/dashboard/manage-ingredients/new")?e.onCreateHandler(t):e.onUpdateHandler(t)},e.onCreateHandler=function(){var t=Object(s.a)(r.a.mark((function t(n){var a,s,o;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.preventDefault(),(a=new FormData).append("name",e.state.formInput.name),a.append("price",e.state.formInput.price),a.append("foodType",e.state.formInput.foodType),a.append("photo",e.state.formInput.photo),t.next=8,e.props.createIngredient(a);case 8:"success"===e.props.createIngredientsStatus.status?(o=e.props.createIngredientsStatus.status,s="Ingredient created Successfully"):(o=e.props.createIngredientsStatus.status,s=e.props.createIngredientsStatus.message),e.showAlertHandler(s,o);case 10:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e.onUpdateHandler=function(){var t=Object(s.a)(r.a.mark((function t(n){var a,s,i;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.preventDefault(),(a=new FormData).append("name",e.state.formInput.name),a.append("price",e.state.formInput.price),a.append("foodType",e.state.formInput.foodType),e.state.fileUploaded&&a.append("photo",e.state.formInput.photo),t.next=8,e.props.updateIngredient(a,e.props.match.params.id);case 8:"success"===e.props.updateIngredientsStatus.status?(i=e.props.updateIngredientsStatus.status,s="Updated Ingredient Successfully",e.setState({formInput:Object(o.a)(Object(o.a)({},e.state.formInput),{},{name:e.props.ingredient.name,foodType:e.props.ingredient.foodType,price:e.props.ingredient.price,photo:e.props.ingredient.photo}),previewPhoto:e.props.ingredient.photo})):(i=e.props.updateIngredientsStatus.status,s=e.props.updateIngredientsStatus.message),e.showAlertHandler(s,i);case 10:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e}return Object(c.a)(n,[{key:"componentDidMount",value:function(){var e=Object(s.a)(r.a.mark((function e(){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.props.location.pathname.startsWith("/dashboard/manage-ingredients/new")){e.next=4;break}return e.next=3,this.props.getIngredient(this.props.match.params.id);case 3:"success"===this.props.getIngredientStatus&&this.setState({formInput:{name:this.props.ingredient.name,price:this.props.ingredient.price,foodType:this.props.ingredient.foodType,photo:this.props.ingredient.photo},previewPhoto:this.props.ingredient.photo});case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return this.props.createIngredientsInit||this.props.updateIngredientsInit||this.props.getIngredientInit?l.a.createElement("div",{className:"dashboard__dashboard u-vh-100 u-bg-white u-flex-center"},l.a.createElement(v.a,null)):l.a.createElement(l.a.Fragment,null,this.state.alert.status&&l.a.createElement(b.a,{close:this.onCloseHandler(),show:this.state.alert.show,status:this.state.alert.status,message:this.state.alert.message}),l.a.createElement("div",{className:"ingredients__form dashboard__dashboard"},l.a.createElement("h2",{className:"heading-1 u-text-primary ingredients__form-heading"},this.props.location.pathname.startsWith("/dashboard/manage-ingredients/new")?"Create a New Ingredient":"Update Ingredient ".concat(this.state.formInput.name)),l.a.createElement("button",{onClick:function(){return e.props.history.goBack()},className:"btn  btn__tertiary-back ingredients__form-back-btn"},l.a.createElement("span",null,"\u2190"),"Back"),l.a.createElement("form",{className:"ingredients__form-form",autoComplete:"off",onSubmit:this.onSubmitHandler},l.a.createElement(m.a,{inputtype:"input",type:"text",name:"name",label:"name",value:this.state.formInput.name,onChange:this.onChangeHandler}),l.a.createElement(m.a,{inputtype:"input",type:"number",name:"price",label:"price",value:this.state.formInput.price,onChange:this.onChangeHandler}),l.a.createElement("div",{className:"form__group"},l.a.createElement("label",{htmlFor:"foodType",className:"form__label"},"Diet"),l.a.createElement("select",{name:"foodType",id:"foodType",className:"form__input",value:this.state.formInput.foodType,onChange:this.onChangeHandler},l.a.createElement("option",{value:"none"},"None"),l.a.createElement("option",{value:"vegetarian"},"Vegetarian"),l.a.createElement("option",{value:"non-vegetarian"},"Non Vegetarian")),l.a.createElement("small",{className:"form__small"},"Select none if you want that ingredient to appear in both veg and non-veg sections")),l.a.createElement("div",{className:"form__group u-flex-between"},l.a.createElement("div",null,l.a.createElement("input",{type:"file",id:"photo",onChange:this.onFileChangeHandler,style:{display:"none"}}),l.a.createElement("label",{htmlFor:"photo",className:"btn btn__tertiary-goTo btn__sm"},"Choose Image")),l.a.createElement("div",{className:"ingredients-preview-img-bg "},l.a.createElement("img",{src:this.state.previewPhoto,className:"ingredients-preview-img-image",alt:this.state.formInput.name}))),l.a.createElement(m.a,{inputtype:"submit",variant:"tertiary",value:"Save Ingredient"}))))}}]),n}(d.Component);t.default=Object(h.b)((function(e){return{ingredient:e.ingredients.ingredient,getIngredientStatus:e.ingredients.getIngredientStatus,getIngredientInit:e.ingredients.getIngredientInit,createIngredientsStatus:e.ingredients.createIngredientsStatus,createIngredientsInit:e.ingredients.createIngredientsInit,updateIngredientsStatus:e.ingredients.updateIngredientsStatus,updateIngredientsInit:e.ingredients.updateIngredientsInit}}),(function(e){return{getIngredient:function(t){return e(g.c(t))},createIngredient:function(t){return e(g.a(t))},updateIngredient:function(t,n){return e(g.e(t,n))}}}))(I)},76:function(e,t,n){"use strict";var a=n(1),r=n.n(a);t.a=function(e){return r.a.createElement("div",{className:"alert alert__".concat(e.show," alert--").concat(e.status," ").concat(e.className)},e.message)}},77:function(e,t,n){"use strict";n.d(t,"b",(function(){return s})),n.d(t,"a",(function(){return o}));var a=n(8),r=n(0),s=function(e,t){return Object(r.a)(Object(r.a)({},t),{},{formInput:Object(r.a)(Object(r.a)({},t.formInput),{},Object(a.a)({},e.target.name,e.target.value))})},o=function(e){var t=Object(r.a)({},e.formInput),n={};return Object.keys(t).map((function(e){return n[e]=""})),n}},81:function(e,t,n){"use strict";var a=n(1),r=n.n(a);t.a=function(e){if("input"===e.inputtype){var t=!1!==e.required;return r.a.createElement("div",{className:"form__group "},r.a.createElement("label",{className:"form__label"},e.label),r.a.createElement("input",{type:e.type,name:e.name,id:e.name,placeholder:e.placeholder,className:"form__".concat(e.inputtype," ").concat(e.className),onChange:e.onChange,minLength:e.minLength,value:e.value,required:t}))}if("submit"===e.inputtype){var n=r.a.createElement("input",Object.assign({type:"submit",value:e.value,className:"btn btn__".concat(e.variant," ").concat(e.className)},e));return r.a.createElement("div",{className:"form__group ".concat(e.formGroupClass)},n)}}},96:function(e,t,n){"use strict";n.d(t,"d",(function(){return p})),n.d(t,"a",(function(){return d})),n.d(t,"c",(function(){return l})),n.d(t,"e",(function(){return f})),n.d(t,"b",(function(){return h}));var a=n(5),r=n.n(a),s=n(16),o=n(2),i=n(19),c=n.n(i),p=function(){return function(){var e=Object(s.a)(r.a.mark((function e(t){var n;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,c()({method:"get",url:"/api/v1/ingredients"});case 3:n=e.sent,t((r=n.data,{type:o.U,res:r})),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),t((a=e.t0.response.data,{type:o.S,error:a}));case 10:case"end":return e.stop()}var a,r}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}()},u=function(e){return{type:o.n,res:e}},d=function(e){return function(){var t=Object(s.a)(r.a.mark((function t(n){var a;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n({type:o.m}),t.prev=1,t.next=4,c()({method:"POST",url:"/api/v1/ingredients",data:e});case 4:a=t.sent,n(u(a.data)),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(1),n((r=t.t0.response.data,{type:o.l,error:r}));case 11:case"end":return t.stop()}var r}),t,null,[[1,8]])})));return function(e){return t.apply(this,arguments)}}()},l=function(e){return function(){var t=Object(s.a)(r.a.mark((function t(n){var a;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,c()({method:"get",url:"".concat(URL,"/api/v1/ingredients/").concat(e)});case 3:a=t.sent,n((s=a.data,{type:o.X,res:s})),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),n((r=t.t0.response.data,{type:o.V,error:r}));case 10:case"end":return t.stop()}var r,s}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}()},m=function(e){return{type:o.yb,res:e}},f=function(e,t){return function(){var n=Object(s.a)(r.a.mark((function n(a){var s;return r.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return a({type:o.xb}),n.prev=1,n.next=4,c()({method:"PATCH",url:"".concat(URL,"/api/v1/ingredients/").concat(t),data:e});case 4:s=n.sent,a(m(s.data)),n.next=11;break;case 8:n.prev=8,n.t0=n.catch(1),a((r=n.t0.response.data,{type:o.wb,error:r}));case 11:case"end":return n.stop()}var r}),n,null,[[1,8]])})));return function(e){return n.apply(this,arguments)}}()},h=function(e){return function(){var t=Object(s.a)(r.a.mark((function t(n){var a;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n({type:o.z}),t.prev=1,t.next=4,c()({method:"DELETE",url:"".concat(URL,"/api/v1/ingredients/").concat(e)});case 4:a=t.sent,n((s=a.data,{type:o.A,res:s})),n(p()),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(1),n((r=t.t0.response.data,{type:o.y,error:r}));case 12:case"end":return t.stop()}var r,s}),t,null,[[1,9]])})));return function(e){return t.apply(this,arguments)}}()}}}]);
//# sourceMappingURL=15.8580969d.chunk.js.map