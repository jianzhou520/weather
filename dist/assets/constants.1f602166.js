import{b as D}from"./index.7624395a.js";var T=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},W={exports:{}};(function(v){(function(w){function g(e,c){var a=(e&65535)+(c&65535),o=(e>>16)+(c>>16)+(a>>16);return o<<16|a&65535}function y(e,c){return e<<c|e>>>32-c}function m(e,c,a,o,h,l){return g(y(g(g(c,e),g(o,l)),h),a)}function i(e,c,a,o,h,l,p){return m(c&a|~c&o,e,c,h,l,p)}function f(e,c,a,o,h,l,p){return m(c&o|a&~o,e,c,h,l,p)}function u(e,c,a,o,h,l,p){return m(c^a^o,e,c,h,l,p)}function d(e,c,a,o,h,l,p){return m(a^(c|~o),e,c,h,l,p)}function b(e,c){e[c>>5]|=128<<c%32,e[(c+64>>>9<<4)+14]=c;var a,o,h,l,p,t=1732584193,r=-271733879,s=-1732584194,n=271733878;for(a=0;a<e.length;a+=16)o=t,h=r,l=s,p=n,t=i(t,r,s,n,e[a],7,-680876936),n=i(n,t,r,s,e[a+1],12,-389564586),s=i(s,n,t,r,e[a+2],17,606105819),r=i(r,s,n,t,e[a+3],22,-1044525330),t=i(t,r,s,n,e[a+4],7,-176418897),n=i(n,t,r,s,e[a+5],12,1200080426),s=i(s,n,t,r,e[a+6],17,-1473231341),r=i(r,s,n,t,e[a+7],22,-45705983),t=i(t,r,s,n,e[a+8],7,1770035416),n=i(n,t,r,s,e[a+9],12,-1958414417),s=i(s,n,t,r,e[a+10],17,-42063),r=i(r,s,n,t,e[a+11],22,-1990404162),t=i(t,r,s,n,e[a+12],7,1804603682),n=i(n,t,r,s,e[a+13],12,-40341101),s=i(s,n,t,r,e[a+14],17,-1502002290),r=i(r,s,n,t,e[a+15],22,1236535329),t=f(t,r,s,n,e[a+1],5,-165796510),n=f(n,t,r,s,e[a+6],9,-1069501632),s=f(s,n,t,r,e[a+11],14,643717713),r=f(r,s,n,t,e[a],20,-373897302),t=f(t,r,s,n,e[a+5],5,-701558691),n=f(n,t,r,s,e[a+10],9,38016083),s=f(s,n,t,r,e[a+15],14,-660478335),r=f(r,s,n,t,e[a+4],20,-405537848),t=f(t,r,s,n,e[a+9],5,568446438),n=f(n,t,r,s,e[a+14],9,-1019803690),s=f(s,n,t,r,e[a+3],14,-187363961),r=f(r,s,n,t,e[a+8],20,1163531501),t=f(t,r,s,n,e[a+13],5,-1444681467),n=f(n,t,r,s,e[a+2],9,-51403784),s=f(s,n,t,r,e[a+7],14,1735328473),r=f(r,s,n,t,e[a+12],20,-1926607734),t=u(t,r,s,n,e[a+5],4,-378558),n=u(n,t,r,s,e[a+8],11,-2022574463),s=u(s,n,t,r,e[a+11],16,1839030562),r=u(r,s,n,t,e[a+14],23,-35309556),t=u(t,r,s,n,e[a+1],4,-1530992060),n=u(n,t,r,s,e[a+4],11,1272893353),s=u(s,n,t,r,e[a+7],16,-155497632),r=u(r,s,n,t,e[a+10],23,-1094730640),t=u(t,r,s,n,e[a+13],4,681279174),n=u(n,t,r,s,e[a],11,-358537222),s=u(s,n,t,r,e[a+3],16,-722521979),r=u(r,s,n,t,e[a+6],23,76029189),t=u(t,r,s,n,e[a+9],4,-640364487),n=u(n,t,r,s,e[a+12],11,-421815835),s=u(s,n,t,r,e[a+15],16,530742520),r=u(r,s,n,t,e[a+2],23,-995338651),t=d(t,r,s,n,e[a],6,-198630844),n=d(n,t,r,s,e[a+7],10,1126891415),s=d(s,n,t,r,e[a+14],15,-1416354905),r=d(r,s,n,t,e[a+5],21,-57434055),t=d(t,r,s,n,e[a+12],6,1700485571),n=d(n,t,r,s,e[a+3],10,-1894986606),s=d(s,n,t,r,e[a+10],15,-1051523),r=d(r,s,n,t,e[a+1],21,-2054922799),t=d(t,r,s,n,e[a+8],6,1873313359),n=d(n,t,r,s,e[a+15],10,-30611744),s=d(s,n,t,r,e[a+6],15,-1560198380),r=d(r,s,n,t,e[a+13],21,1309151649),t=d(t,r,s,n,e[a+4],6,-145523070),n=d(n,t,r,s,e[a+11],10,-1120210379),s=d(s,n,t,r,e[a+2],15,718787259),r=d(r,s,n,t,e[a+9],21,-343485551),t=g(t,o),r=g(r,h),s=g(s,l),n=g(n,p);return[t,r,s,n]}function C(e){var c,a="",o=e.length*32;for(c=0;c<o;c+=8)a+=String.fromCharCode(e[c>>5]>>>c%32&255);return a}function _(e){var c,a=[];for(a[(e.length>>2)-1]=void 0,c=0;c<a.length;c+=1)a[c]=0;var o=e.length*8;for(c=0;c<o;c+=8)a[c>>5]|=(e.charCodeAt(c/8)&255)<<c%32;return a}function R(e){return C(b(_(e),e.length*8))}function U(e,c){var a,o=_(e),h=[],l=[],p;for(h[15]=l[15]=void 0,o.length>16&&(o=b(o,e.length*8)),a=0;a<16;a+=1)h[a]=o[a]^909522486,l[a]=o[a]^1549556828;return p=b(h.concat(_(c)),512+c.length*8),C(b(l.concat(p),512+128))}function q(e){var c="0123456789abcdef",a="",o,h;for(h=0;h<e.length;h+=1)o=e.charCodeAt(h),a+=c.charAt(o>>>4&15)+c.charAt(o&15);return a}function M(e){return unescape(encodeURIComponent(e))}function E(e){return R(M(e))}function j(e){return q(E(e))}function S(e,c){return U(M(e),M(c))}function L(e,c){return q(S(e,c))}function A(e,c,a){return c?a?S(c,e):L(c,e):a?E(e):j(e)}v.exports?v.exports=A:w.md5=A})(T)})(W);var I=W.exports;function $(v){const w=`${v.trim()}&t=${Math.floor(Date.now()/1e3)}&publicid=HE2204141315331436`,g=[],[y,m]=w.split("?"),i={};new URLSearchParams(m).forEach((u,d)=>{i[d]=u}),Object.keys(i).forEach(u=>{u!=="key"&&u!=="sign"&&!/^\s+$/.test(u)&&!/^\s+$/.test(i[u])&&g.push(u)}),g.sort();let f="";return Object.values(g).forEach(u=>{/\s+/.test(i[u])||(f+=`${u}=${i[u]}&`)}),f=`${f.substring(0,f.length-1)}a3017c1793454ea1a2bf215f1fe3a547`,`${w}&sign=${I(f)}`}async function Y(v,w,g){return D.get($(`
      https://geoapi.qweather.com/v2/city/lookup?location=${g||`${v},${w}`}
    `))}async function Z(v,w){return D.get($(`
      https://devapi.qweather.com/v7/weather/now?location=${v},${w}
    `))}async function k(v){return D.get($(`
      https://devapi.qweather.com/v7/weather/24h?location=${v}
    `))}async function x(v){return D.get($(`
      https://devapi.qweather.com/v7/weather/7d?location=${v}
    `))}var N="/weather/assets/day_sun.4321da8a.png",H="/weather/assets/night_sun.a3f8f4ab.png",O="/weather/assets/day_clouds.1f17e927.png",B="/weather/assets/night_clouds.9752a9e4.png",F="/weather/assets/day_wind.69422255.png",G="/weather/assets/night_wind.f734c929.png",P="/weather/assets/day_snow.b39b5bfa.png",z="/weather/assets/night_snow.3197890d.png",J="/weather/assets/day_storm.413314e3.png",K="/weather/assets/night_storm.3d923d50.png",Q="/weather/assets/day_rain.8c641988.png",V="/weather/assets/night_rain.c2184523.png";function ee(v,w){const g=new Date,y=!w&&g.getHours()>19;if(!v)return"";switch(v){case"100":case"150":case"800":case"801":case"802":case"803":case"804":case"805":case"806":case"807":return y?H:N;case"300":case"301":case"305":case"306":case"307":case"308":case"309":case"310":case"311":case"312":case"313":case"314":case"315":case"316":case"317":case"318":case"350":case"351":case"399":return y?V:Q;case"101":case"102":case"103":case"104":case"151":case"152":case"153":case"154":case"500":case"501":case"502":case"503":case"504":case"509":case"510":case"511":case"512":case"513":case"514":case"515":return y?B:O;case"507":case"508":return y?G:F;case"400":case"401":case"402":case"403":case"404":case"405":case"406":case"407":case"408":case"409":case"410":case"456":case"457":case"499":return y?z:P;case"302":case"303":case"304":return y?K:J;default:return y?H:N}}const ae=["\u5468\u65E5","\u5468\u4E00","\u5468\u4E8C","\u5468\u4E09","\u5468\u56DB","\u5468\u4E94","\u5468\u516D"];export{Z as a,k as b,x as c,ae as d,Y as q,ee as r};