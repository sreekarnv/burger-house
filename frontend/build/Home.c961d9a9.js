parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"H8fm":[function(require,module,exports) {

},{}],"RFkF":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=r(require("react"));function t(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return t=function(){return e},e}function r(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var r=t();if(r&&r.has(e))return r.get(e);var n={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if(Object.prototype.hasOwnProperty.call(e,i)){var u=o?Object.getOwnPropertyDescriptor(e,i):null;u&&(u.get||u.set)?Object.defineProperty(n,i,u):n[i]=e[i]}return n.default=e,r&&r.set(e,n),n}var n=function(){return(n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},o=function(t){return e.createElement("svg",n({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",height:"20",width:"20",stroke:"currentColor"},t),e.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 13l4 4L19 7"}))},i=o;exports.default=i;
},{"react":"n8MK"}],"c5UA":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0,require("./gurantee.scss");var e=a(require("react")),t=r(require("../../shared/ui/icons/CheckIcon"));function r(e){return e&&e.__esModule?e:{default:e}}function n(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return n=function(){return e},e}function a(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=n();if(t&&t.has(e))return t.get(e);var r={},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var u in e)if(Object.prototype.hasOwnProperty.call(e,u)){var c=a?Object.getOwnPropertyDescriptor(e,u):null;c&&(c.get||c.set)?Object.defineProperty(r,u,c):r[u]=e[u]}return r.default=e,t&&t.set(e,r),r}var u=function(r){var n=r.children;return e.createElement("div",{className:"gurantee"},e.createElement("p",{className:"gurantee__icon"},e.createElement(t.default,{className:"u-text-success"})),e.createElement("p",{className:"gurantee__text"},n))},c=u;exports.default=c;
},{"./gurantee.scss":"H8fm","react":"n8MK","../../shared/ui/icons/CheckIcon":"RFkF"}],"GPH9":[function(require,module,exports) {

},{"./..\\..\\..\\images\\home-bg-small.jpg":[["home-bg-small.e2ff0cbc.jpg","LtX4"],"LtX4"],"./..\\..\\..\\images\\gallery-2.jpg":[["gallery-2.c2a3f95c.jpg","XOnr"],"XOnr"]}],"kCWb":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=c(require("react")),r=require("react-router"),t=i(require("~app/components/home/Gurantee/Gurantee")),a=i(require("~app/components/shared/ui/button/Button")),n=i(require("~/app/components/shared/BurgerCard/BurgerCard")),u=i(require("~app/components/shared/ui/skeletons/BurgerCardSkeleton")),o=i(require("~app/hooks/api/queries/useBurgersQuery")),l=i(require("~app/hooks/api/queries/useNewBurgersQuery"));function i(e){return e&&e.__esModule?e:{default:e}}function s(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return s=function(){return e},e}function c(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var r=s();if(r&&r.has(e))return r.get(e);var t={},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var u=a?Object.getOwnPropertyDescriptor(e,n):null;u&&(u.get||u.set)?Object.defineProperty(t,n,u):t[n]=e[n]}return t.default=e,r&&r.set(e,t),t}require("./home.scss");var p=function(){return(p=Object.assign||function(e){for(var r,t=1,a=arguments.length;t<a;t++)for(var n in r=arguments[t])Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n]);return e}).apply(this,arguments)},m=function(){var i=(0,r.useHistory)().push,s=(0,o.default)({}).isLoading,c=(0,l.default)({}),m=c.isLoading,d=c.data;return e.createElement(e.Fragment,null,e.createElement("section",{className:"home-hero"},e.createElement("div",{className:"home-hero-display--1"},e.createElement("h1",{className:"heading-2 u-text-center u-ftwt-400 u-text-white u-text-capitalize"},"We make burgers"),e.createElement(a.default,{onClick:function(){return i("/menu")},color:"tertiary",size:"lg"},"Order Now")),e.createElement("div",{className:"home-hero-display--2"},e.createElement(t.default,null,"Fresh Ingredients Only"),e.createElement(t.default,null,"Delivery Within 30 Mins"),e.createElement(t.default,null,"Quality Guaranteed!"))),e.createElement("section",{className:"home-make-burger"},e.createElement("h3",{className:"u-text-secondary heading-3"},"Don't Like Our Menu? Then Make Your Own Burger!"),e.createElement(a.default,{onClick:function(){return i("/menu/make-my-burger")},color:"tertiary"},"Make My Burger")),e.createElement("section",{className:"home-popular-burgers"},e.createElement("h1",{className:"u-text-primary u-text-center heading-1 u-text-uppercase"},"newly added to menu"),e.createElement("div",{className:"home-popular-burgers__cards"},s||m&&Array(3).fill(0).map(function(r,t){return e.createElement(u.default,{key:t})}),null==d?void 0:d.map(function(r){return e.createElement(n.default,p({key:r._id},{burger:r}))}))))},d=m;exports.default=d;
},{"react":"n8MK","react-router":"LI7H","~app/components/home/Gurantee/Gurantee":"c5UA","~app/components/shared/ui/button/Button":"tUI5","~/app/components/shared/BurgerCard/BurgerCard":"L6mp","~app/components/shared/ui/skeletons/BurgerCardSkeleton":"oeqm","~app/hooks/api/queries/useBurgersQuery":"Q3It","~app/hooks/api/queries/useNewBurgersQuery":"tuJL","./home.scss":"GPH9"}],"FheM":[function(require,module,exports) {
var t=null;function e(){return t||(t=n()),t}function n(){try{throw new Error}catch(e){var t=(""+e.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);if(t)return r(t[0])}return"/"}function r(t){return(""+t).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/,"$1")+"/"}exports.getBundleURL=e,exports.getBaseURL=r;
},{}],"TUK3":[function(require,module,exports) {
var r=require("./bundle-url").getBundleURL;function e(r){Array.isArray(r)||(r=[r]);var e=r[r.length-1];try{return Promise.resolve(require(e))}catch(n){if("MODULE_NOT_FOUND"===n.code)return new s(function(n,i){t(r.slice(0,-1)).then(function(){return require(e)}).then(n,i)});throw n}}function t(r){return Promise.all(r.map(u))}var n={};function i(r,e){n[r]=e}module.exports=exports=e,exports.load=t,exports.register=i;var o={};function u(e){var t;if(Array.isArray(e)&&(t=e[1],e=e[0]),o[e])return o[e];var i=(e.substring(e.lastIndexOf(".")+1,e.length)||e).toLowerCase(),u=n[i];return u?o[e]=u(r()+e).then(function(r){return r&&module.bundle.register(t,r),r}).catch(function(r){throw delete o[e],r}):void 0}function s(r){this.executor=r,this.promise=null}s.prototype.then=function(r,e){return null===this.promise&&(this.promise=new Promise(this.executor)),this.promise.then(r,e)},s.prototype.catch=function(r){return null===this.promise&&(this.promise=new Promise(this.executor)),this.promise.catch(r)};
},{"./bundle-url":"FheM"}],0:[function(require,module,exports) {
var b=require("TUK3");b.load([]).then(function(){require("kCWb");});
},{}]},{},[0], null)