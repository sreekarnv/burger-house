!function(){function e(e,t,n,a){Object.defineProperty(e,t,{get:n,set:a,enumerable:!0,configurable:!0})}var t=("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequireb892;t.register("jWrnh",(function(n,a){var o;o=n.exports,Object.defineProperty(o,"__esModule",{value:!0,configurable:!0}),e(n.exports,"default",(function(){return x}));var i=t("9DAHI"),r=t("glVET"),l=t("1PC3C"),s=t("ld3mg"),u=t("1Wb4O"),c=t("lY1nR"),d=t("jYUHu"),h=t("8j5RM"),f=t("6HHIu"),g=t("hZ42O"),x=function(){var e=g.useSelector((function(e){return e.cart.cartValue})),t=f.useQueryClient().getQueryData("user"),n=r.useLocation(),a=h.default(),o=a.isOpen,x=a.onOpen,j=a.onClose;return i.jsxs("header",{className:"navigation",children:[i.jsxs(r.Link,{to:"/",className:"navigation__brand u-text-dark",children:[i.jsx(s.default,{}),"Burger House"]}),"/error"!==n.pathname&&i.jsxs(i.Fragment,{children:[i.jsxs("nav",{className:"navigation__nav",children:[i.jsx(c.default,{to:"/",exact:!0,children:"Home"}),i.jsx(c.default,{to:"/menu",children:"Menu"}),!t&&i.jsxs(i.Fragment,{children:[i.jsx(c.default,{to:"/auth/login",exact:!0,children:"Login"}),i.jsx(c.default,{to:"/auth/register",exact:!0,children:"Register"})]}),t&&i.jsx(c.default,{to:"/dashboard",children:"Dashboard"}),i.jsx(c.default,{showBadge:!0,badgeValue:e,to:"/cart",exact:!0,children:"Cart"}),t&&i.jsx(c.default,{logout:!0,to:"/auth/logout",exact:!0,children:"Logout"})]}),o?i.jsx("span",{className:"navigation__toggle",children:i.jsx(l.default,{onClick:j,className:" u-text-dark"})}):i.jsx("span",{className:"navigation__toggle",children:i.jsx(u.default,{onClick:x,className:"u-text-dark"})}),i.jsx(d.default,{closeNav:j,showMobileNav:o})]})]})}})),t.register("1Wb4O",(function(n,a){e(n.exports,"default",(function(){return r}));var o=t("eGTdo"),i=t("9DAHI"),r=function(e){return i.jsx("svg",o.objectSpread({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},e,{children:i.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 6h16M4 12h16M4 18h7"})}))}})),t.register("lY1nR",(function(n,a){e(n.exports,"default",(function(){return l}));var o=t("9DAHI"),i=t("glVET"),r=t("9U91e"),l=function(e){var t=e.to,n=e.children,a=e.exact,l=e.showBadge,s=e.badgeValue,u=e.onClick,c=e.logout;return o.jsxs(i.NavLink,{className:"nav-item ".concat(c?"nav-item__logout":""),activeClassName:c?"":"nav-item--active",to:t,exact:a,onClick:u,children:[l&&o.jsx(r.default,{className:"nav-item__badge",color:"primary",variant:"rounded",size:"sm",children:s}),n]})}})),t.register("jYUHu",(function(n,a){e(n.exports,"default",(function(){return d}));var o=t("9DAHI"),i=t("9oHsR"),r=t("lY1nR"),l=t("6HHIu"),s=t("hZ42O"),u={show:{height:180,transition:{delayChildren:.3,duration:.5}},hide:{height:0,transition:{duration:.5}}},c={show:{opacity:1,transition:{staggerChildren:.5}},hide:{opacity:0}},d=function(e){var t=e.showMobileNav,n=e.closeNav,a=s.useSelector((function(e){return e.cart.cartValue})),d=l.useQueryClient().getQueryData("user");return o.jsx(i.AnimatePresence,{children:t&&o.jsx(i.motion.div,{variants:u,initial:"hide",animate:"show",exit:"hide",className:"nav-mobile u-bg-light",children:o.jsxs(i.motion.div,{variants:c,children:[o.jsx(r.default,{onClick:function(){n()},to:"/",exact:!0,children:"Home"}),o.jsx(r.default,{onClick:function(){n()},to:"/menu",children:"Menu"}),!d&&o.jsxs(o.Fragment,{children:[o.jsx(r.default,{onClick:function(){n()},to:"/auth/login",exact:!0,children:"Login"}),o.jsx(r.default,{onClick:function(){n()},to:"/auth/register",exact:!0,children:"Register"})]}),d&&o.jsx(r.default,{onClick:function(){n()},to:"/dashboard",children:"Dashboard"}),o.jsx(r.default,{onClick:function(){n()},showBadge:!0,badgeValue:a,to:"/cart",exact:!0,children:"Cart"}),d&&o.jsx(r.default,{onClick:function(){n()},logout:!0,to:"/auth/logout",exact:!0,children:"Logout"})]})})})}}))}();