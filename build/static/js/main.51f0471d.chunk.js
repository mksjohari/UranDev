(this.webpackJsonptest=this.webpackJsonptest||[]).push([[0],{21:function(e,a,t){e.exports={loginContainer:"signIn_loginContainer__39xgI",loginForm:"signIn_loginForm__1ZLke",label:"signIn_label__23FJz"}},30:function(e,a,t){e.exports={container:"layout_container__2-u-p",content:"layout_content__3zUXp"}},38:function(e,a,t){e.exports=t.p+"static/media/logo.11424990.png"},39:function(e,a,t){e.exports={container:"footer_container__30Ys7"}},4:function(e,a,t){e.exports={header:"header_header__27Jyo",logoAndDetails:"header_logoAndDetails__1chhs",logo:"header_logo__1UBHg",details:"header_details__2T-J0",signUp:"header_signUp__2R3ei",login:"header_login__3EKnk",headerLink:"header_headerLink__3u68C",imageLogo:"header_imageLogo__1Ap40",textLogo:"header_textLogo__e8XE8",navContainer:"header_navContainer__365US",navList:"header_navList__3cXfU",navItem:"header_navItem__3AYTL",activeNavItem:"header_activeNavItem__2WzhW"}},46:function(e,a,t){e.exports=t(62)},61:function(e,a,t){},62:function(e,a,t){"use strict";t.r(a);var n,l,r=t(0),o=t.n(r),c=t(12),i=t.n(c),s=t(2),m=t(8),u=t(4),d=t.n(u),p=t(38),E=t.n(p),g=function(){return o.a.createElement("header",{className:d.a.header},o.a.createElement("div",{className:d.a.logoAndDetails},o.a.createElement("div",{className:d.a.logo},o.a.createElement(m.b,{className:d.a.headerLink,to:"/"},o.a.createElement("img",{className:d.a.imageLogo,src:E.a,alt:"Uran Logo ..."}),o.a.createElement("h1",{className:d.a.textLogo},"URAN"))),o.a.createElement("div",{className:d.a.details},o.a.createElement("div",{className:d.a.signUp},"Sign Up"),o.a.createElement("div",{className:d.a.login},"Login"))),o.a.createElement("div",{className:d.a.navContainer},o.a.createElement("nav",null,o.a.createElement("ul",{className:d.a.navList},o.a.createElement("li",null,o.a.createElement(m.c,{activeClassName:d.a.activeNavItem,className:d.a.navItem,exact:!0,to:"/"},"Home")),o.a.createElement("li",null,o.a.createElement(m.c,{activeClassName:d.a.activeNavItem,className:d.a.navItem,to:"/explore"},"Explore")),o.a.createElement("li",null,o.a.createElement(m.c,{activeClassName:d.a.activeNavItem,className:d.a.navItem,to:"/projects"},"Projects")),o.a.createElement("li",null,o.a.createElement(m.c,{activeClassName:d.a.activeNavItem,className:d.a.navItem,to:"/profile"},"Profile"))))))},h=t(39),v=t.n(h),f=function(){return o.a.createElement("div",{className:v.a.container},o.a.createElement("h3",null,"Created by Uran"))},_=t(30),b=t.n(_),N=t(26),I=t(20),w=t.n(I),C=t(31),j=t(16),O=t.n(j),U=(t(37),t(58),t(15)),x=t(76),y={apiKey:"AIzaSyCb3O3mwrZnycpDs8sv7XJKbPE0gvRsqD4",authDomain:"uran-28-12-98.firebaseapp.com",databaseURL:"https://uran-28-12-98.firebaseio.com",projectId:"uran-28-12-98",storageBucket:"uran-28-12-98.appspot.com",messagingSenderId:"113317665845",appId:"1:113317665845:web:9b4e3065a9a84b7cd5a57c",measurementId:"G-DDKX9CHS1L"},L=function(e){return n||(e.initializeApp(y),n=e,e)},k=t(21),P=t.n(k),S=(l=O.a,n||(l.initializeApp(y),n=l),l.app().functions("australia-southeast1")).httpsCallable("testCall"),A=function(){var e=Object(C.a)(w.a.mark((function e(a){return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:L(O.a).auth().signInWithPopup(H).then((function(e){a(e)})).catch((function(e){var a=e.code,t=e.message,n=e.email,l=e.credential;console.log(n,l,a,t)}));case 1:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),D=Object(U.b)(null,{updateUser:function(e){return function(a){var t;t=e.additionalUserInfo.profile.family_name?e.additionalUserInfo.profile.family_name:"",console.log(e);var n={email:e.additionalUserInfo.profile.email,firstName:e.additionalUserInfo.profile.given_name,lastName:t,photoUrl:e.additionalUserInfo.profile.picture};console.log(n)}}})((function(e){var a=Object(r.useState)(""),t=Object(N.a)(a,2),n=t[0],l=t[1],c=Object(r.useState)(""),i=Object(N.a)(c,2),s=i[0],u=i[1],d=Object(r.useState)(null),p=Object(N.a)(d,1)[0],E=function(e){var a=e.currentTarget,t=a.name,n=a.value;"userEmail"===t?l(n):"userPassword"===t&&u(n)};return o.a.createElement("div",{className:P.a.loginContainer},o.a.createElement("div",{className:P.a.loginForm},o.a.createElement("h1",null,"Sign In"),null!==p&&o.a.createElement("div",null,p),o.a.createElement("form",null,o.a.createElement("label",{className:P.a.label,htmlFor:"userEmail"},"Email:"),o.a.createElement("br",null),o.a.createElement("input",{type:"email",name:"userEmail",value:n,placeholder:"E.g: uran@gmail.com",id:"userEmail",onChange:function(e){return E(e)}}),o.a.createElement("br",null),o.a.createElement("label",{className:P.a.label,htmlFor:"userPassword"},"Password:"),o.a.createElement("br",null),o.a.createElement("input",{type:"password",name:"userPassword",value:s,placeholder:"Your Password",id:"userPassword",onChange:function(e){return E(e)}}),o.a.createElement("br",null),o.a.createElement(x.a,{style:{marginTop:10},color:"primary",variant:"contained",onClick:function(e){!function(e,a,t){e.preventDefault(),console.log(e,a,t)}(e,n,s)}},"Sign in")),o.a.createElement("p",{className:"text-center my-3"},"Don't have an account? ",o.a.createElement(m.b,{to:"/"},"Sign up here")," ",o.a.createElement("br",null)," ",o.a.createElement(m.b,{to:"/"},"Forgot Password?")),o.a.createElement("hr",null),o.a.createElement(x.a,{color:"secondary",variant:"contained",onClick:function(){console.log("hello"),A(e.updateUser)}},"Sign in with Google"),"   ",o.a.createElement(x.a,{color:"default",variant:"contained",onClick:Object(C.a)(w.a.mark((function e(){return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:S().then((function(e){console.log(e)}));case 1:case"end":return e.stop()}}),e)})))},"Test Log"),"   ",o.a.createElement(x.a,{color:"default",variant:"contained",onClick:function(){L(O.a).auth().signOut()}},"Sign Out")))})),H=new O.a.auth.GoogleAuthProvider,F=function(e){return o.a.createElement("div",{className:b.a.container},o.a.createElement(g,null),o.a.createElement("div",{className:b.a.content},e.children),o.a.createElement(D,null),o.a.createElement(f,null))},J=Object(U.b)((function(e){return{user:e.user}}))((function(e){return console.log(e.user),o.a.createElement("div",null,o.a.createElement("h1",null,"Hello,"),o.a.createElement("p",null,"KHAIRRI JOHARI"))})),R=function(){return o.a.createElement("div",null,o.a.createElement("h1",null,"Hello,"),o.a.createElement("p",null,"I'm Exploring"))},z=function(){return o.a.createElement("div",null,o.a.createElement("h1",null,"Hello,"),o.a.createElement("p",null,"I'm Projects"))},T=function(){return o.a.createElement("div",null,o.a.createElement("h1",null,"Hello,"),o.a.createElement("p",null,"I'm profile"))},K=(t(61),function(){return o.a.createElement(F,null,o.a.createElement(s.c,null,o.a.createElement(s.a,{component:J,exact:!0,path:"/"}),o.a.createElement(s.a,{component:R,path:"/explore"}),o.a.createElement(s.a,{component:z,path:"/projects"}),o.a.createElement(s.a,{component:T,path:"/profile"})))}),W=t(44),X=t(13),B=t(33),G={success:null,firstName:null,lastName:null},Y=Object(X.c)({user:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:G,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"UPDATE_INFO":return Object(B.a)(Object(B.a)({},e),{},{uid:a.uid,firstName:a.firstName,lastName:a.uid});default:return e}}});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Z=Object(X.e)(Y,Object(X.d)(Object(X.a)(W.a)));i.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(m.a,null,o.a.createElement(U.a,{store:Z},o.a.createElement(K,null)))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[46,1,2]]]);
//# sourceMappingURL=main.51f0471d.chunk.js.map