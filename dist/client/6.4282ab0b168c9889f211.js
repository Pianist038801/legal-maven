webpackJsonp([6],{693:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function l(e){return{}}Object.defineProperty(t,"__esModule",{value:!0});var c=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,n,r,o){var a=t&&t.defaultProps,i=arguments.length-3;if(n||0===i||(n={}),n&&a)for(var l in a)void 0===n[l]&&(n[l]=a[l]);else n||(n=a||{});if(1===i)n.children=o;else if(i>1){for(var c=Array(i),u=0;u<i;u++)c[u]=arguments[u+3];n.children=c}return{$$typeof:e,type:t,key:void 0===r?null:""+r,ref:null,props:n,_owner:null}}}(),u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),f=n(0),s=(r(f),n(4)),p=(r(s),n(59)),d=n(48),h=(n(49),n(925)),y=r(h),b=n(742),v=r(b),m=function(e){function t(e){o(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={keyword:""},n.category=[{title:"Start-Ups",topics:[{title:"Should I incorporate?",href:"/legaltopics/incorporate"},{title:"Can I trademark?",href:"/legaltopics/trademark"},{title:"Do I need to set up payroll?",href:"/legaltopics/payroll"},{title:"Do I need worker's compensation insurance?",href:""}]},{title:"Real Estate",topics:[{title:"Do I owe transfer tax? (CA only)",href:"/legaltopics/transfertax"},{title:"Am I entitled to a refund of my security deposit?",href:"/"}]}],n}return i(t,e),u(t,[{key:"onSearch",value:function(e){this.setState({keyword:e.target.value})}},{key:"render",value:function(){var e=this,t=this.category.map(function(t,n){var r=t.topics.filter(function(t){return t.title.toLowerCase().includes(e.state.keyword.toLowerCase())}).map(function(e,t){return c(d.Link,{className:y["default"].item,to:e.href},t,e.title)});return r.length?c("div",{className:y["default"].category},n,c("div",{className:y["default"]["category-title"]},void 0,t.title),r):null});return c("div",{className:y["default"].legaltopics+" wow fadeIn"},void 0,c("div",{className:""+y["default"]["search-box-container"]},void 0,c("div",{className:"container"},void 0,c(v["default"],{placeholder:"Search Legal Topics",onChange:this.onSearch.bind(this)}))),c("div",{className:y["default"]["title-container"]},void 0,c("div",{className:y["default"]["main-title"]},void 0,"Let's get started, please select a topic.")),c("div",{className:y["default"]["main-container"]+" container"},void 0,t))}}]),t}(f.Component);t["default"]=(0,p.connect)(l)(m)},742:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,n,r,o){var a=t&&t.defaultProps,i=arguments.length-3;if(n||0===i||(n={}),n&&a)for(var l in a)void 0===n[l]&&(n[l]=a[l]);else n||(n=a||{});if(1===i)n.children=o;else if(i>1){for(var c=Array(i),u=0;u<i;u++)c[u]=arguments[u+3];n.children=c}return{$$typeof:e,type:t,key:void 0===r?null:""+r,ref:null,props:n,_owner:null}}}(),c=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(0),f=(r(u),n(4)),s=(r(f),n(59),n(48),n(49),n(745)),p=r(s),d=function(e){function t(e){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return i(t,e),c(t,[{key:"render",value:function(){return l("div",{className:p["default"]["search-box-container"]},void 0,l("input",{type:"text",className:p["default"]["search-box"],placeholder:this.props.placeholder,onChange:this.props.onChange}),l("i",{className:"fa fa-search "+p["default"]["search-icon"],"aria-hidden":"true"}))}}]),t}(u.Component);t["default"]=d},745:function(e,t){e.exports={"search-box-container":"_2VgBVMR0DY0MotI_EdDz3u","search-icon":"_2TVsnhmFqdMoyHeshu0vvW","search-box":"_1z4InyDaPOFFrrjVToUB04"}},925:function(e,t){e.exports={legaltopics:"_1QnudGqMJ6jjuh23uIYNrr","search-box-container":"_1NnZz6XVCJO1y47NCJzaHn","title-container":"_3D_1FVbAbCbnNEyF-P8nEW","main-title":"_3WQc4gzsgFoDnBIRY1YWdp","main-container":"ANef79a5Et04I24eN1VzC",category:"_33uIc0dNDj1fhd6sKOpEIw","category-title":"_1XzNQouh405W6cLj6Xc1JJ",item:"a6DkO-r5lb32Gm_qz2znc"}}});