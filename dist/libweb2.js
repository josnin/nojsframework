var x=async(i,t,e,r)=>{let s=await t.getAttribute("If");s&&!i[s]&&!i.__reactive[s]&&(t.style.display="none")};var P=async(i,t,e,r)=>{let s=await t.getAttribute("data-bind");t.type==="text"&&s&&(t.oninput=a=>{i.__reactive[s]=a.target.value})};var u=(i,t,e)=>i.replace(t,"").replace(e,"").trim();var p=(i,t)=>{let e;return i[t]!=null?e=i[t]:i.__reactive[t]!=null?e=i.__reactive[t]:e=t,e};var _=async(i,t)=>{t.dataset.event&&(t[`on${t.dataset.event}`]=async e=>{try{let r=[];await t.dataset.args.split(",").forEach(a=>{let n=p(i,a.trim());n&&r.push(`'${n}'`)});let s=`${t.dataset.fn}(${r.join()})`;Function(`this.self.${s.replaceAll("'$event'","this.$event")}`).call({self:i,$event:e})}catch{Function(`${t.value.replaceAll("'$event'","this.$event")}`).call({$event:e})}})};var A=async(i,t,e,r)=>{let s=await t.getAttribute("*For");if(s&&global.client){let[a,n]=s.split("in");n=n.trim(),a=a.trim();let o=p(i,n);t.dataset?.uniq||(t.dataset.uniq="l2rkqnta__");let c=(+new Date).toString(36);global.client=c,console.log("BEGIN",t.dataset.uniq),await o.forEach(async(l,N)=>{let v=t.cloneNode(!0);await v.childNodes.forEach(d=>{d.dataset?.var&&(d.textContent=`${l[d.dataset.var.split(".")[1]]} ${c}`,d.dataset.index=N)}),v.dataset.uniq=c,t.parentNode?.insertBefore(v,t.nextSibling)}),await t.parentNode?.childNodes.forEach(l=>{l.dataset?.uniq&&l.dataset.uniq!==c&&(console.log("END",t.dataset.uniq,c),l.remove())})}};var g=class{constructor(...t){this.register=[x,P,_,A],this.args=t}apply(){let[t,e,r]=this.args;this.register.forEach(s=>{t.shadowRoot.querySelectorAll("*").forEach(async a=>{await s(t,a,e,r)})})}};var f={ATTR_PREFIX:"__",ATTR_REPLACE:"on",VAR_PARSE:{start:"{",end:"}"}};var E=async(i,t)=>{let e=t.textContent?.match(/{[^{^}^\|]*}/gi);!e||await e.forEach(async r=>{if(r=r.trim(),r){let s=u(r,f.VAR_PARSE.start,f.VAR_PARSE.end),a=p(i,s);a&&(t.innerHTML=t.innerHTML.replaceAll(r,`<lib-w data-var=${s}>${a}</lib-w>`))}})};var j=async(i,t,e,r)=>{for(let[s,a]of Object.entries(t.attributes))a.name.startsWith("@")&&(t.dataset.event=a.name.split("@")[1],t.dataset.fn=a.value.split("(")[0],t.dataset.args=a.value.split("(")[1].split(")")[0],t.removeAttribute(a.name))};var b=(i,t)=>t==="json"?JSON.stringify(i):i;var m=class{constructor(...t){this.register=[b],this.args=t}apply(){let[t,e]=this.args,r;return e&&(r=t,this.register.forEach(s=>{r=s(r,e)})),r}};var R=async(i,t,e,r)=>{if(t.dataset.var!==void 0&&t.dataset.var===e){let s=r;if(t.dataset.pipe){let a=t.dataset.pipe;s=await new m(s,a).apply()}t.textContent=s}};var V=(i,t,e,r)=>{t.type==="text"&&t.dataset.bind===e&&(t.value=r)};var $=async(i,t)=>{let e=await t.textContent?.match(/\{[^{^}\n\r]*\|[^{^}\n\r]*\}/gi);!e||e.forEach(async r=>{if(r=r.trim(),r){let s=u(r,f.VAR_PARSE.start,f.VAR_PARSE.end),a=s.split("|").length>1,n=s.split("|")[0].trim(),o=await p(i,n);if(o&&a){let c=s.split("|")[1].trim();o=await new m(o,c).apply(),t.innerHTML=await t.innerHTML.replaceAll(r,`<lib-w data-var=${n} data-pipe=${c}>${o}</lib-w>`)}}})};var h=class{constructor(...t){this.register=[E,$,j,V,R],this.args=t}apply(){let[t,e,r]=this.args;this.register.forEach(s=>{t.shadowRoot.querySelectorAll("*").forEach(async a=>{await s(t,a,e,r)})})}};var D=class extends HTMLElement{};customElements.define("lib-w",D);var w=class{constructor(t,e){this.makeReactive=r=>{let s={get:(a,n)=>typeof a[n]=="object"&&a[n]!==null?new Proxy(a[n],s):a[n],set:(a,n,o)=>(this.runParserAndDirectives(n,o),a[n]=o,!0)};return new Proxy(r,s)},this.self=t,this.self.attachShadow({mode:"open"}),this.self.shadowRoot.innerHTML=`<lib-w>${e} <slot></slot></lib-w>`,this.runParserAndDirectives(),this.self.__reactive=this.makeReactive(this.self.__reactive),console.log(this.self)}async runParserAndDirectives(t="",e=""){await new h(this.self,t,e).apply(),await new g(this.self,t,e).apply()}},y=class extends HTMLElement{constructor(){super();this.__reactive={}}connectedCallback(){let t=new w(this,this.__template)}};global.LWElement=y;globalThis.Parsers=h;var dt={LibWeb:w,LWElement:y};export{y as LWElement,w as LibWeb,dt as default};
//# sourceMappingURL=libweb.js.map
