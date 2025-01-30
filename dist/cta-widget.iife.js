var __defProp=Object.defineProperty,__typeError=t=>{throw TypeError(t)},__defNormalProp=(t,e,n)=>e in t?__defProp(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,__publicField=(t,e,n)=>__defNormalProp(t,"symbol"!=typeof e?e+"":e,n),__accessCheck=(t,e,n)=>e.has(t)||__typeError("Cannot "+n),__privateGet=(t,e,n)=>(__accessCheck(t,e,"read from private field"),n?n.call(t):e.get(t)),__privateAdd=(t,e,n)=>e.has(t)?__typeError("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,n),__privateSet=(t,e,n,r)=>(__accessCheck(t,e,"write to private field"),r?r.call(t,n):e.set(t,n),n);this["[name]Component"]=function(){"use strict";var t,e;"undefined"!=typeof window&&(window.__svelte||(window.__svelte={v:new Set})).v.add("5");let n=!1;n=!0;const r={},i=Symbol(),l=["touchstart","touchmove"];var o=Array.isArray,s=Array.from,a=Object.keys,u=Object.defineProperty,c=Object.getOwnPropertyDescriptor,f=Object.getOwnPropertyDescriptors,d=Object.getPrototypeOf;const v=32,p=64,h=256,$=512,_=1024,g=2048,y=4096,x=8192,b=16384,m=65536,w=1<<17,k=1<<20,C=Symbol("legacy props");function E(t){return t===this.v}function S(t){return e=t,n=this.v,!(e!=e?n==n:e!==n||null!==e&&"object"==typeof e||"function"==typeof e);var e,n}function L(t,e){return{f:0,v:t,reactions:null,equals:E,version:0}}function P(t,e=!1){var r;const i=L(t);return e||(i.equals=S),n&&null!==At&&null!==At.l&&((r=At.l).s??(r.s=[])).push(i),i}function O(t,e){return null!==kt&&Mt()&&18&kt.f&&(null===Lt||!Lt.includes(t))&&function(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}(),function(t,e){t.equals(e)||(t.v=e,t.version=qt(),G(t,g),Mt()&&null!==Et&&Et.f&_&&!(Et.f&v)&&(null!==Pt&&Pt.includes(t)?(Yt(Et,g),Kt(Et)):null===Gt?function(t){Gt=t}([t]):Gt.push(t)));return e}(t,e)}function G(t,e){var n=t.reactions;if(null!==n)for(var r=Mt(),i=n.length,l=0;l<i;l++){var o=n[l],s=o.f;s&g||(r||o!==Et)&&(Yt(o,e),1280&s&&(2&s?G(o,y):Kt(o)))}}function T(t){console.warn("https://svelte.dev/e/hydration_mismatch")}let N,A=!1;function q(t){A=t}function M(t){if(null===t)throw T(),r;return N=t}function B(){return M(U(N))}function R(t){if(A){if(null!==U(N))throw T(),r;N=t}}var j,F,D;function W(){if(void 0===j){j=window;var t=Element.prototype,e=Node.prototype;F=c(e,"firstChild").get,D=c(e,"nextSibling").get,t.__click=void 0,t.__className="",t.__attributes=null,t.__styles=null,t.__e=void 0,Text.prototype.__t=void 0}}function z(t=""){return document.createTextNode(t)}function H(t){return F.call(t)}function U(t){return D.call(t)}function J(t,e){if(!A)return H(t);var n=H(N);return null===n&&(n=N.appendChild(z())),M(n),n}function K(t,e=1,n=!1){let r=A?N:t;for(var i;e--;)i=r,r=U(r);if(!A)return r;var l=null==r?void 0:r.nodeType;if(n&&3!==l){var o=z();return null===r?null==i||i.after(o):r.before(o),M(o),o}return M(r),r}function V(t){var e=2050;null===Et?e|=h:Et.f|=k;var n=null!==kt&&2&kt.f?kt:null;const r={children:null,ctx:At,deps:null,equals:E,f:e,fn:t,reactions:null,v:null,version:0,parent:n??Et};return null!==n&&(n.children??(n.children=[])).push(r),r}function I(t){const e=V(t);return e.equals=S,e}function Q(t){var e=t.children;if(null!==e){t.children=null;for(var n=0;n<e.length;n+=1){var r=e[n];2&r.f?Z(r):lt(r)}}}function X(t){var e,n=Et;St(function(t){for(var e=t.parent;null!==e;){if(!(2&e.f))return e;e=e.parent}return null}(t));try{Q(t),e=jt(t)}finally{St(n)}return e}function Y(t){var e=X(t);Yt(t,(Nt||t.f&h)&&null!==t.deps?y:_),t.equals(e)||(t.v=e,t.version=qt())}function Z(t){Q(t),Dt(t,0),Yt(t,b),t.v=t.children=t.deps=t.ctx=t.reactions=null}function tt(t,e,n,r=!0){var i=!!(t&p),l=Et,o={ctx:At,deps:null,deriveds:null,nodes_start:null,nodes_end:null,f:t|g,first:null,fn:e,last:null,next:null,parent:i?null:l,prev:null,teardown:null,transitions:null,version:0};if(n){var s=xt;try{bt(!0),Wt(o),o.f|=32768}catch(u){throw lt(o),u}finally{bt(s)}}else null!==e&&Kt(o);if(!(n&&null===o.deps&&null===o.first&&null===o.nodes_start&&null===o.teardown&&!(o.f&k))&&!i&&r&&(null!==l&&function(t,e){var n=e.last;null===n?e.last=e.first=t:(n.next=t,t.prev=n,e.last=t)}(o,l),null!==kt&&2&kt.f)){var a=kt;(a.children??(a.children=[])).push(o)}return o}function et(t,e=!0){return tt(40,t,!0,e)}function nt(t){var e=t.teardown;if(null!==e){const t=kt;Ct(null);try{e.call(null)}finally{Ct(t)}}}function rt(t){var e=t.deriveds;if(null!==e){t.deriveds=null;for(var n=0;n<e.length;n+=1)Z(e[n])}}function it(t,e=!1){var n=t.first;for(t.first=t.last=null;null!==n;){var r=n.next;lt(n,e),n=r}}function lt(t,e=!0){var n=!1;if((e||524288&t.f)&&null!==t.nodes_start){for(var r=t.nodes_start,i=t.nodes_end;null!==r;){var l=r===i?null:U(r);r.remove(),r=l}n=!0}it(t,e&&!n),rt(t),Dt(t,0),Yt(t,b);var o=t.transitions;if(null!==o)for(const a of o)a.stop();nt(t);var s=t.parent;null!==s&&null!==s.first&&ot(t),t.next=t.prev=t.teardown=t.ctx=t.deps=t.fn=t.nodes_start=t.nodes_end=null}function ot(t){var e=t.parent,n=t.prev,r=t.next;null!==n&&(n.next=r),null!==r&&(r.prev=n),null!==e&&(e.first===t&&(e.first=r),e.last===t&&(e.last=n))}function st(t,e){var n=[];at(t,n,!0),function(t,e){var n=t.length;if(n>0){var r=()=>--n||e();for(var i of t)i.out(r)}else e()}(n,(()=>{lt(t),e&&e()}))}function at(t,e,n){if(!(t.f&x)){if(t.f^=x,null!==t.transitions)for(const r of t.transitions)(r.is_global||n)&&e.push(r);for(var r=t.first;null!==r;){var i=r.next;at(r,e,!!(!!(r.f&m)||!!(r.f&v))&&n),r=i}}}function ut(t){ct(t,!0)}function ct(t,e){if(t.f&x){Bt(t)&&Wt(t),t.f^=x;for(var n=t.first;null!==n;){var r=n.next;ct(n,!!(!!(n.f&m)||!!(n.f&v))&&e),n=r}if(null!==t.transitions)for(const n of t.transitions)(n.is_global||e)&&n.in()}}let ft=!1,dt=[];function vt(){ft=!1;const t=dt.slice();dt=[],function(t){for(var e=0;e<t.length;e++)t[e]()}(t)}function pt(t){ft||(ft=!0,queueMicrotask(vt)),dt.push(t)}const ht=0;let $t=!1,_t=ht,gt=!1,yt=null,xt=!1;function bt(t){xt=t}let mt=[],wt=0,kt=null;function Ct(t){kt=t}let Et=null;function St(t){Et=t}let Lt=null,Pt=null,Ot=0,Gt=null;let Tt=1,Nt=!1,At=null;function qt(){return++Tt}function Mt(){return!n||null!==At&&null===At.l}function Bt(t){var e,n,r=t.f;if(r&g)return!0;if(r&y){var i=t.deps,l=!!(r&h);if(null!==i){var o;if(r&$){for(o=0;o<i.length;o++)((e=i[o]).reactions??(e.reactions=[])).push(t);t.f^=$}for(o=0;o<i.length;o++){var s=i[o];if(Bt(s)&&Y(s),!l||null===Et||Nt||(null==(n=null==s?void 0:s.reactions)?void 0:n.includes(t))||(s.reactions??(s.reactions=[])).push(t),s.version>t.version)return!0}}l&&(null===Et||Nt)||Yt(t,_)}return!1}function Rt(t,e,n,r){if($t){if(null===n&&($t=!1),function(t){return!(t.f&b||null!==t.parent&&128&t.parent.f)}(e))throw t}else null!==n&&($t=!0),function(t,e){for(var n=e;null!==n;){if(128&n.f)try{return void n.fn(t)}catch{n.f^=128}n=n.parent}throw $t=!1,t}(t,e)}function jt(t){var e,n=Pt,r=Ot,i=Gt,l=kt,o=Nt,s=Lt,a=At,u=t.f;Pt=null,Ot=0,Gt=null,kt=96&u?null:t,Nt=!xt&&!!(u&h),Lt=null,At=t.ctx;try{var c=(0,t.fn)(),f=t.deps;if(null!==Pt){var d;if(Dt(t,Ot),null!==f&&Ot>0)for(f.length=Ot+Pt.length,d=0;d<Pt.length;d++)f[Ot+d]=Pt[d];else t.deps=f=Pt;if(!Nt)for(d=Ot;d<f.length;d++)((e=f[d]).reactions??(e.reactions=[])).push(t)}else null!==f&&Ot<f.length&&(Dt(t,Ot),f.length=Ot);return c}finally{Pt=n,Ot=r,Gt=i,kt=l,Nt=o,Lt=s,At=a}}function Ft(t,e){let n=e.reactions;if(null!==n){var r=n.indexOf(t);if(-1!==r){var i=n.length-1;0===i?n=e.reactions=null:(n[r]=n[i],n.pop())}}null===n&&2&e.f&&(null===Pt||!Pt.includes(e))&&(Yt(e,y),768&e.f||(e.f^=$),Dt(e,0))}function Dt(t,e){var n=t.deps;if(null!==n)for(var r=e;r<n.length;r++)Ft(t,n[r])}function Wt(t){var e=t.f;if(!(e&b)){Yt(t,_);var n=Et,r=At;Et=t;try{16&e?function(t){for(var e=t.first;null!==e;){var n=e.next;e.f&v||lt(e),e=n}}(t):it(t),rt(t),nt(t);var i=jt(t);t.teardown="function"==typeof i?i:null,t.version=Tt}catch(l){Rt(l,t,n,r||t.ctx)}finally{Et=n}}}function zt(){if(wt>1e3){wt=0;try{!function(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}()}catch(t){if(null===yt)throw t;Rt(t,yt,null)}}wt++}function Ht(t){var e=t.length;if(0!==e){zt();var n=xt;xt=!0;try{for(var r=0;r<e;r++){var i=t[r];i.f&_||(i.f^=_);var l=[];Vt(i,l),Ut(l)}}finally{xt=n}}}function Ut(t){var e=t.length;if(0!==e)for(var n=0;n<e;n++){var r=t[n];if(!(24576&r.f))try{Bt(r)&&(Wt(r),null===r.deps&&null===r.first&&null===r.nodes_start&&(null===r.teardown?ot(r):r.fn=null))}catch(i){Rt(i,r,null,r.ctx)}}}function Jt(){if(gt=!1,wt>1001)return;const t=mt;mt=[],Ht(t),gt||(wt=0,yt=null)}function Kt(t){_t===ht&&(gt||(gt=!0,queueMicrotask(Jt))),yt=t;for(var e=t;null!==e.parent;){var n=(e=e.parent).f;if(96&n){if(!(n&_))return;e.f^=_}}mt.push(e)}function Vt(t,e){var n=t.first,r=[];t:for(;null!==n;){var i=n.f,l=!!(i&v),o=l&&!!(i&_),s=n.next;if(!(o||i&x))if(8&i){if(l)n.f^=_;else try{Bt(n)&&Wt(n)}catch(f){Rt(f,n,null,n.ctx)}var a=n.first;if(null!==a){n=a;continue}}else 4&i&&r.push(n);if(null===s){let e=n.parent;for(;null!==e;){if(t===e)break t;var u=e.next;if(null!==u){n=u;continue t}e=e.parent}}n=s}for(var c=0;c<r.length;c++)a=r[c],e.push(a),Vt(a,e)}function It(t){var e=_t,n=mt;try{zt();const e=[];_t=1,mt=e,gt=!1,Ht(n);var r=null==t?void 0:t();return ft&&vt(),(mt.length>0||e.length>0)&&It(),wt=0,yt=null,r}finally{_t=e,mt=n}}function Qt(t){var e,n=t.f,r=!!(2&n);if(r&&n&b){var i=X(t);return Z(t),i}if(null!==kt){null!==Lt&&Lt.includes(t)&&function(){throw new Error("https://svelte.dev/e/state_unsafe_local_read")}();var l=kt.deps;null===Pt&&null!==l&&l[Ot]===t?Ot++:null===Pt?Pt=[t]:Pt.push(t),null!==Gt&&null!==Et&&Et.f&_&&!(Et.f&v)&&Gt.includes(t)&&(Yt(Et,g),Kt(Et))}else if(r&&null===t.deps)for(var o=t,s=o.parent,a=o;null!==s;){if(!(2&s.f)){var u=s;(null==(e=u.deriveds)?void 0:e.includes(a))||(u.deriveds??(u.deriveds=[])).push(a);break}a=s,s=s.parent}return r&&Bt(o=t)&&Y(o),t.v}const Xt=-7169;function Yt(t,e){t.f=t.f&Xt|e}function Zt(t,e=1){var n=Qt(t),r=1===e?n++:n--;return O(t,n),r}const te=new Set,ee=new Set;function ne(t,e,n,r){function i(t){if(r.capture||ie.call(e,t),!t.cancelBubble)return function(t){var e=kt,n=Et;Ct(null),St(null);try{return t()}finally{Ct(e),St(n)}}((()=>n.call(this,t)))}return t.startsWith("pointer")||t.startsWith("touch")||"wheel"===t?pt((()=>{e.addEventListener(t,i,r)})):e.addEventListener(t,i,r),i}function re(t,e,n,r,i){var l={capture:r,passive:i},o=ne(t,e,n,l);e!==document.body&&e!==window&&e!==document||function(t){const e=tt(8,null,!1);Yt(e,_),e.teardown=t}((()=>{e.removeEventListener(t,o,l)}))}function ie(t){var e,n=this,r=n.ownerDocument,i=t.type,l=(null==(e=t.composedPath)?void 0:e.call(t))||[],s=l[0]||t.target,a=0,c=t.__root;if(c){var f=l.indexOf(c);if(-1!==f&&(n===document||n===window))return void(t.__root=n);var d=l.indexOf(n);if(-1===d)return;f<=d&&(a=f)}if((s=l[a]||t.target)!==n){u(t,"currentTarget",{configurable:!0,get:()=>s||r});var v=kt,p=Et;Ct(null),St(null);try{for(var h,$=[];null!==s;){var _=s.assignedSlot||s.parentNode||s.host||null;try{var g=s["__"+i];if(void 0!==g&&!s.disabled)if(o(g)){var[y,...x]=g;y.apply(s,[t,...x])}else g.call(s,t)}catch(b){h?$.push(b):h=b}if(t.cancelBubble||_===n||null===_)break;s=_}if(h){for(let t of $)queueMicrotask((()=>{throw t}));throw h}}finally{t.__root=n,delete t.currentTarget,Ct(v),St(p)}}}function le(t,e){var n=Et;null===n.nodes_start&&(n.nodes_start=t,n.nodes_end=e)}function oe(t,e){var n,r=!!(2&e),i=!t.startsWith("<!>");return()=>{if(A)return le(N,null),N;var e,l;void 0===n&&(e=i?t:"<!>"+t,(l=document.createElement("template")).innerHTML=e,n=H(n=l.content));var o=r?document.importNode(n,!0):n.cloneNode(!0);return le(o,o),o}}function se(t,e){if(A)return Et.nodes_end=N,void B();null!==t&&t.before(e)}function ae(t,e){return fe(t,e)}function ue(t,e){W(),e.intro=e.intro??!1;const n=e.target,i=A,l=N;try{for(var o=H(n);o&&(8!==o.nodeType||"["!==o.data);)o=U(o);if(!o)throw r;q(!0),M(o),B();const i=fe(t,{...e,anchor:o});if(null===N||8!==N.nodeType||"]"!==N.data)throw T(),r;return q(!1),i}catch(s){if(s===r)return!1===e.recover&&function(){throw new Error("https://svelte.dev/e/hydration_failed")}(),W(),n.textContent="",q(!1),ae(t,e);throw s}finally{q(i),M(l)}}const ce=new Map;function fe(t,{target:e,anchor:r,props:i={},events:o,context:a,intro:u=!0}){W();var c=new Set,f=t=>{for(var n=0;n<t.length;n++){var r=t[n];if(!c.has(r)){c.add(r);var i=(s=r,l.includes(s));e.addEventListener(r,ie,{passive:i});var o=ce.get(r);void 0===o?(document.addEventListener(r,ie,{passive:i}),ce.set(r,1)):ce.set(r,o+1)}}var s};f(s(te)),ee.add(f);var d=void 0,v=function(t){const e=tt(p,t,!0);return(t={})=>new Promise((n=>{t.outro?st(e,(()=>{lt(e),n(void 0)})):(lt(e),n(void 0))}))}((()=>{var l=r??e.appendChild(z());return et((()=>{a&&(!function(t,e=!1){At={p:At,c:null,e:null,m:!1,s:t,x:null,l:null},n&&!e&&(At.l={s:null,u:null,r1:[],r2:L(!1)})}({}),At.c=a);o&&(i.$$events=o),A&&le(l,null),d=t(l,i)||{},A&&(Et.nodes_end=N),a&&function(){const t=At;if(null!==t){const l=t.e;if(null!==l){var e=Et,n=kt;t.e=null;try{for(var r=0;r<l.length;r++){var i=l[r];St(i.effect),Ct(i.reaction),tt(4,i.fn,!1)}}finally{St(e),Ct(n)}}At=t.p,t.m=!0}}()})),()=>{var t;for(var n of c){e.removeEventListener(n,ie);var i=ce.get(n);0==--i?(document.removeEventListener(n,ie),ce.delete(n)):ce.set(n,i)}ee.delete(f),l!==r&&(null==(t=l.parentNode)||t.removeChild(l))}}));return de.set(d,v),d}let de=new WeakMap;function ve(t,e,n=!1){A&&B();var r=t,l=null,o=null,s=i,a=!1;const u=(t,e=!0)=>{a=!0,c(e,t)},c=(t,e)=>{if(s===(s=t))return;let n=!1;if(A){const t="[!"===r.data;!!s===t&&(r=function(){for(var t=0,e=N;;){if(8===e.nodeType){var n=e.data;if("]"===n){if(0===t)return e;t-=1}else"["!==n&&"[!"!==n||(t+=1)}var r=U(e);e.remove(),e=r}}(),M(r),q(!1),n=!0)}s?(l?ut(l):e&&(l=et((()=>e(r)))),o&&st(o,(()=>{o=null}))):(o?ut(o):e&&(o=et((()=>e(r)))),l&&st(l,(()=>{l=null}))),n&&q(!0)};!function(t,e=0){tt(24|e,t,!0)}((()=>{a=!1,e(u),a||c(null,null)}),n?m:0),A&&(r=N)}function pe(t,e,n,r){var i=t.__attributes??(t.__attributes={});A&&(i[e]=t.getAttribute(e)),i[e]!==(i[e]=n)&&(null==n?t.removeAttribute(e):"string"!=typeof n&&function(t){var e,n=he.get(t.nodeName);if(n)return n;he.set(t.nodeName,n=[]);var r=t,i=Element.prototype;for(;i!==r;){for(var l in e=f(r))e[l].set&&n.push(l);r=d(r)}return n}(t).includes(e)?t[e]=n:t.setAttribute(e,n))}var he=new Map;const $e={get(t,e){if(!t.exclude.includes(e))return Qt(t.version),e in t.special?t.special[e]():t.props[e]},set:(t,e,r)=>(e in t.special||(t.special[e]=function(t,e,r,i){var l,o,s=!!(1&r),a=!n||!!(2&r),u=!1;o=t[e];var f,d=(null==(l=c(t,e))?void 0:l.set)??void 0,v=i,p=!0,h=!1,$=()=>(h=!0,p&&(p=!1,v=i),v);if(a)f=()=>{var n=t[e];return void 0===n?$():(p=!0,h=!1,n)};else{var _=_e((()=>(s?V:I)((()=>t[e]))));_.f|=w,f=()=>{var t=Qt(_);return void 0!==t&&(v=void 0),void 0===t?v:t}}if(d){var g=t.$$legacy;return function(t,e){return arguments.length>0?(a&&e&&!g&&!u||d(e?f():t),t):f()}}var y=!1,x=P(o),b=_e((()=>V((()=>{var t=f(),e=Qt(x);return y?(y=!1,e):x.v=t}))));return b.equals=S,function(t,e){if(arguments.length>0){const n=e?Qt(b):t;return b.equals(n)||(y=!0,O(x,n),h&&void 0!==v&&(v=n),function(t){const e=kt;try{return kt=null,t()}finally{kt=e}}((()=>Qt(b)))),t}return Qt(b)}}({get[e](){return t.props[e]}},e,4)),t.special[e](r),Zt(t.version),!0),getOwnPropertyDescriptor(t,e){if(!t.exclude.includes(e))return e in t.props?{enumerable:!0,configurable:!0,value:t.props[e]}:void 0},deleteProperty:(t,e)=>(t.exclude.includes(e)||(t.exclude.push(e),Zt(t.version)),!0),has:(t,e)=>!t.exclude.includes(e)&&e in t.props,ownKeys:t=>Reflect.ownKeys(t.props).filter((e=>!t.exclude.includes(e)))};function _e(t){for(var e=Et,n=Et;null!==e&&!(96&e.f);)e=e.parent;try{return St(e),t()}finally{St(n)}}class ge{constructor(n){var r;__privateAdd(this,t),__privateAdd(this,e);var i=new Map,l=(t,e)=>{var n=P(e);return i.set(t,n),n};const o=new Proxy({...n.props||{},$$events:{}},{get:(t,e)=>Qt(i.get(e)??l(e,Reflect.get(t,e))),has:(t,e)=>e===C||(Qt(i.get(e)??l(e,Reflect.get(t,e))),Reflect.has(t,e)),set:(t,e,n)=>(O(i.get(e)??l(e,n),n),Reflect.set(t,e,n))});__privateSet(this,e,(n.hydrate?ue:ae)(n.component,{target:n.target,anchor:n.anchor,props:o,context:n.context,intro:n.intro??!1,recover:n.recover})),(null==(r=null==n?void 0:n.props)?void 0:r.$$host)&&!1!==n.sync||It(),__privateSet(this,t,o.$$events);for(const t of Object.keys(__privateGet(this,e)))"$set"!==t&&"$destroy"!==t&&"$on"!==t&&u(this,t,{get(){return __privateGet(this,e)[t]},set(n){__privateGet(this,e)[t]=n},enumerable:!0});__privateGet(this,e).$set=t=>{Object.assign(o,t)},__privateGet(this,e).$destroy=()=>{!function(t,e){const n=de.get(t);n?(de.delete(t),n(e)):Promise.resolve()}(__privateGet(this,e))}}$set(t){__privateGet(this,e).$set(t)}$on(e,n){__privateGet(this,t)[e]=__privateGet(this,t)[e]||[];const r=(...t)=>n.call(this,...t);return __privateGet(this,t)[e].push(r),()=>{__privateGet(this,t)[e]=__privateGet(this,t)[e].filter((t=>t!==r))}}$destroy(){__privateGet(this,e).$destroy()}}let ye;function xe(t,e,n,r){var i;const l=null==(i=n[t])?void 0:i.type;if(e="Boolean"===l&&"boolean"!=typeof e?null!=e:e,!r||!n[t])return e;if("toAttribute"===r)switch(l){case"Object":case"Array":return null==e?null:JSON.stringify(e);case"Boolean":return e?"":null;case"Number":return null==e?null:e;default:return e}else switch(l){case"Object":case"Array":return e&&JSON.parse(e);case"Boolean":default:return e;case"Number":return null!=e?+e:e}}t=new WeakMap,e=new WeakMap,"function"==typeof HTMLElement&&(ye=class extends HTMLElement{constructor(t,e,n){super(),__publicField(this,"$$ctor"),__publicField(this,"$$s"),__publicField(this,"$$c"),__publicField(this,"$$cn",!1),__publicField(this,"$$d",{}),__publicField(this,"$$r",!1),__publicField(this,"$$p_d",{}),__publicField(this,"$$l",{}),__publicField(this,"$$l_u",new Map),__publicField(this,"$$me"),this.$$ctor=t,this.$$s=e,n&&this.attachShadow({mode:"open"})}addEventListener(t,e,n){if(this.$$l[t]=this.$$l[t]||[],this.$$l[t].push(e),this.$$c){const n=this.$$c.$on(t,e);this.$$l_u.set(e,n)}super.addEventListener(t,e,n)}removeEventListener(t,e,n){if(super.removeEventListener(t,e,n),this.$$c){const t=this.$$l_u.get(e);t&&(t(),this.$$l_u.delete(e))}}async connectedCallback(){if(this.$$cn=!0,!this.$$c){let e=function(t){return e=>{const n=document.createElement("slot");"default"!==t&&(n.name=t),se(e,n)}};if(await Promise.resolve(),!this.$$cn||this.$$c)return;const n={},r=function(t){const e={};return t.childNodes.forEach((t=>{e[t.slot||"default"]=!0})),e}(this);for(const t of this.$$s)t in r&&("default"!==t||this.$$d.children?n[t]=e(t):(this.$$d.children=e(t),n.default=!0));for(const t of this.attributes){const e=this.$$g_p(t.name);e in this.$$d||(this.$$d[e]=xe(e,t.value,this.$$p_d,"toProp"))}for(const t in this.$$p_d)t in this.$$d||void 0===this[t]||(this.$$d[t]=this[t],delete this[t]);this.$$c=(t={component:this.$$ctor,target:this.shadowRoot||this,props:{...this.$$d,$$slots:n,$$host:this}},new ge(t)),this.$$me=function(t){const e=tt(p,t,!0);return()=>{lt(e)}}((()=>{tt(8,(()=>{var t;this.$$r=!0;for(const e of a(this.$$c)){if(!(null==(t=this.$$p_d[e])?void 0:t.reflect))continue;this.$$d[e]=this.$$c[e];const n=xe(e,this.$$d[e],this.$$p_d,"toAttribute");null==n?this.removeAttribute(this.$$p_d[e].attribute||e):this.setAttribute(this.$$p_d[e].attribute||e,n)}this.$$r=!1}),!0)}));for(const t in this.$$l)for(const e of this.$$l[t]){const n=this.$$c.$on(t,e);this.$$l_u.set(e,n)}this.$$l={}}var t}attributeChangedCallback(t,e,n){var r;this.$$r||(t=this.$$g_p(t),this.$$d[t]=xe(t,n,this.$$p_d,"toProp"),null==(r=this.$$c)||r.$set({[t]:this.$$d[t]}))}disconnectedCallback(){this.$$cn=!1,Promise.resolve().then((()=>{!this.$$cn&&this.$$c&&(this.$$c.$destroy(),this.$$me(),this.$$c=void 0)}))}$$g_p(t){return a(this.$$p_d).find((e=>this.$$p_d[e].attribute===t||!this.$$p_d[e].attribute&&e.toLowerCase()===t))||t}});var be=oe('<div class="secondary-cta svelte-15nk0nx"><p class="svelte-15nk0nx"> <button class="secondary-button svelte-15nk0nx" type="button"></button></p></div>'),me=oe('<div class="trigger-cta svelte-15nk0nx"><div class="cta-outline svelte-15nk0nx"></div> <div class="cta-content svelte-15nk0nx"><h3 class="svelte-15nk0nx"></h3> <p class="svelte-15nk0nx"></p></div> <button class="trigger-button svelte-15nk0nx" type="button"></button> <!></div>');const we={hash:"svelte-15nk0nx",code:":host {display:contents;font-family:var(--font-family, inherit);}.trigger-cta.svelte-15nk0nx {position:relative;text-align:center;padding:30px 20px;background:#e6e6e641;color:black;width:100%;border:none;margin:20px -15px 40px;transition:background-color 0.3s ease;font-family:inherit;}.cta-outline.svelte-15nk0nx {position:absolute;top:-20px;left:5%;right:5%;bottom:-20px;border:2px solid #3D87CB;pointer-events:none;}\n\n    @media (max-width: 768px) {.cta-outline.svelte-15nk0nx {left:2%;right:2%;}.trigger-cta.svelte-15nk0nx p:where(.svelte-15nk0nx) {font-size:18px;}\n    }.cta-content.svelte-15nk0nx {max-width:500px;margin-right:auto;margin-left:auto;}.trigger-cta.svelte-15nk0nx:hover {background:#e6e6e670;}.trigger-cta.svelte-15nk0nx h3:where(.svelte-15nk0nx) {font-size:24px;margin:0 0 5px 0;color:#500000;font-family:inherit;}.trigger-cta.svelte-15nk0nx p:where(.svelte-15nk0nx) {margin:10px 0 10px 0;max-width:600px;font-size:18px;line-height:1.4;font-family:inherit;}.secondary-cta.svelte-15nk0nx {display:flex;flex-direction:column;align-items:center;}.secondary-cta.svelte-15nk0nx p:where(.svelte-15nk0nx) {margin:20px 0 0 0;max-width:600px;font-size:14px;line-height:1.4;font-family:inherit;}.secondary-button.svelte-15nk0nx {margin:3px auto 0px auto;background:none;border:none;color:#3D87CB;cursor:pointer;padding:0;font-size:14px;font-family:inherit;text-decoration:underline;text-underline-offset:4px;transition:color 0.3s ease;}.secondary-button.svelte-15nk0nx:hover {color:#3d86cbb5;}.secondary-button.svelte-15nk0nx:focus-visible {outline:2px solid #500000;outline-offset:2px;}.trigger-button.svelte-15nk0nx {padding:10px 20px;background:#3D87CB;color:white;border:none;cursor:pointer;display:inline-block;margin:10px auto 0px auto;transition:background-color 0.3s ease;font-weight:bold;font-family:inherit;}.trigger-button.svelte-15nk0nx:hover {background:#3d86cbb5;}.trigger-cta.svelte-15nk0nx:focus-visible {outline:2px solid #500000;outline-offset:2px;}"};function ke(t,e){const n=new Proxy({props:e,exclude:["children","$$slots","$$events","$$legacy","$$host"],special:{},version:L(0)},$e);var r,i;r=t,i=we,pt((()=>{var t=r.getRootNode(),e=t.host?t:t.head??t.ownerDocument.head;if(!e.querySelector("#"+i.hash)){const t=document.createElement("style");t.id=i.hash,t.textContent=i.code,e.appendChild(t)}}));let{ctaHeading:l="Download a Giving Guide",ctaText:o="Download our complimentary Giving Guide to explore giving methods and learn more about campus areas you can support with an endowment",ctaButton:s="Click here to download",targetURL:a="https://www.txamfoundation.com/contact-us/request-a-giving-guide.aspx",secondaryCtaText:u="Ready to start a gift conversation instead?",secondaryCtaButton:c="Send us a message",secondaryTargetURL:f="https://www.txamfoundation.com/contact-us.aspx"}=n;function d(){window.open(f,"_blank","noopener,noreferrer")}var v=me(),p=K(J(v),2),h=J(p);h.textContent=l,K(h,2).textContent=o,R(p);var $=K(p,2);pe($,"aria-label",o),$.textContent=s;var _=K($,2),g=t=>{var e=be(),n=J(e),r=J(n);r.nodeValue=`${u??""} `;var i=K(r);pe(i,"aria-label",u),i.textContent=c,R(n),R(e),re("click",i,d),se(t,e)};ve(_,(t=>{"none"!==u&&"hide"!==u&&t(g)})),R(v),re("click",$,(function(){window.open(a,"_blank","noopener,noreferrer")})),se(t,v)}return customElements.define("cta-widget",function(t,e,n,r,i){let l=class extends ye{constructor(){super(t,n,i),this.$$p_d=e}static get observedAttributes(){return a(e).map((t=>(e[t].attribute||t).toLowerCase()))}};return a(e).forEach((t=>{u(l.prototype,t,{get(){return this.$$c&&t in this.$$c?this.$$c[t]:this.$$d[t]},set(n){var r;n=xe(t,n,e),this.$$d[t]=n;var i=this.$$c;i&&((null==(r=c(i,t))?void 0:r.get)?i[t]=n:i.$set({[t]:n}))}})})),r.forEach((t=>{u(l.prototype,t,{get(){var e;return null==(e=this.$$c)?void 0:e[t]}})})),t.element=l,l}(ke,{ctaHeading:{type:"String"},ctaText:{type:"String"},ctaButton:{type:"String"},targetURL:{type:"String"},secondaryCtaText:{type:"String"},secondaryCtaButton:{type:"String"},secondaryTargetURL:{type:"String"}},[],[],!0)),ke}();