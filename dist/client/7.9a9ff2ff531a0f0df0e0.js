webpackJsonp([7],{692:function(e,t,o){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function l(e){return{}}Object.defineProperty(t,"__esModule",{value:!0});var c=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,o,r,n){var a=t&&t.defaultProps,i=arguments.length-3;if(o||0===i||(o={}),o&&a)for(var l in a)void 0===o[l]&&(o[l]=a[l]);else o||(o=a||{});if(1===i)o.children=n;else if(i>1){for(var c=Array(i),u=0;u<i;u++)c[u]=arguments[u+3];o.children=c}return{$$typeof:e,type:t,key:void 0===r?null:""+r,ref:null,props:o,_owner:null}}}(),u=function(){function e(e,t){for(var o=0;o<t.length;o++){var r=t[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,o,r){return o&&e(t.prototype,o),r&&e(t,r),t}}(),f=o(0),s=(r(f),o(4)),p=(r(s),o(59)),d=o(48),y=(o(49),o(957)),h=r(y),v=o(747),b=r(v),m=function(e){function t(e){n(this,t);var o=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return o.state={keyword:""},o.category=[{title:"Business Corporation",topics:[{title:"CA - Professional Corporation",href:"/legalforms/ca_professional_corporation"},{title:"CA - S-Corporation",href:"/legalforms/ca_s_corporation"}]}],o}return i(t,e),u(t,[{key:"onSearch",value:function(e){this.setState({keyword:e.target.value})}},{key:"render",value:function(){var e=this,t=this.category.map(function(t,o){var r=t.topics.filter(function(t){return t.title.toLowerCase().includes(e.state.keyword.toLowerCase())}).map(function(e,t){return c(d.Link,{className:h["default"].item,to:e.href},t,e.title)});return r.length?c("div",{className:h["default"].category},o,c("div",{className:h["default"]["category-title"]},void 0,t.title),r):null});return c("div",{className:h["default"].legalforms+" wow fadeIn"},void 0,c("div",{className:""+h["default"]["search-box-container"]},void 0,c("div",{className:"container"},void 0,c(b["default"],{placeholder:"Search Legal Forms",onChange:this.onSearch.bind(this)}))),c("div",{className:""+h["default"]["title-container"]},void 0,c("div",{className:h["default"]["main-title"]},void 0,"Let's get started, please select a form.")),c("div",{className:h["default"]["main-container"]+" container"},void 0,t))}}]),t}(f.Component);t["default"]=(0,p.connect)(l)(m)},747:function(e,t,o){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,o,r,n){var a=t&&t.defaultProps,i=arguments.length-3;if(o||0===i||(o={}),o&&a)for(var l in a)void 0===o[l]&&(o[l]=a[l]);else o||(o=a||{});if(1===i)o.children=n;else if(i>1){for(var c=Array(i),u=0;u<i;u++)c[u]=arguments[u+3];o.children=c}return{$$typeof:e,type:t,key:void 0===r?null:""+r,ref:null,props:o,_owner:null}}}(),c=function(){function e(e,t){for(var o=0;o<t.length;o++){var r=t[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,o,r){return o&&e(t.prototype,o),r&&e(t,r),t}}(),u=o(0),f=(r(u),o(4)),s=(r(f),o(59),o(48),o(49),o(750)),p=r(s),d=function(e){function t(e){return n(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return i(t,e),c(t,[{key:"render",value:function(){return l("div",{className:p["default"]["search-box-container"]},void 0,l("input",{type:"text",className:p["default"]["search-box"],placeholder:this.props.placeholder,onChange:this.props.onChange}),l("i",{className:"fa fa-search "+p["default"]["search-icon"],"aria-hidden":"true"}))}}]),t}(u.Component);t["default"]=d},750:function(e,t){e.exports={"search-box-container":"_2VgBVMR0DY0MotI_EdDz3u","search-icon":"_2TVsnhmFqdMoyHeshu0vvW","search-box":"_1z4InyDaPOFFrrjVToUB04"}},957:function(e,t){e.exports={legalforms:"teKUuQkyz6mW5tTfLFx9y","search-box-container":"_2dRn6A-2AOssizAWOTlIio","title-container":"BCmq0s2LUFocUdBqjGAJw","main-title":"TH_kcNedGpBtuVh3krWuJ","main-container":"_1-qfa_O7rNClpeRke8m4JV",category:"_2g5qk64clRhfI8xpk0oEFA","category-title":"_1AafoO20HdQYSWW4qp4Gz3",item:"o62MUcK5oWVq6lj_jrIg7"}}});