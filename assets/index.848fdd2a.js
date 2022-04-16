var x=Object.defineProperty,$=Object.defineProperties;var C=Object.getOwnPropertyDescriptors;var y=Object.getOwnPropertySymbols;var D=Object.prototype.hasOwnProperty,E=Object.prototype.propertyIsEnumerable;var I=(n,a,t)=>a in n?x(n,a,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[a]=t,v=(n,a)=>{for(var t in a||(a={}))D.call(a,t)&&I(n,t,a[t]);if(y)for(var t of y(a))E.call(a,t)&&I(n,t,a[t]);return n},b=(n,a)=>$(n,C(a));import{u as W,j as r,a as i,r as S}from"./index.dab549c7.js";import{r as P,d as j,q as k,a as q}from"./constants.0e976e3e.js";const A="_component_14028_1",F="_icon_14028_12",J="_name_14028_21",O="_weather_14028_28",T="_btn_14028_70",U="_addition_14028_86";var e={component:A,icon:F,name:J,weather:O,"temp-value":"_temp-value_14028_32","temp-time":"_temp-time_14028_46","weather-info":"_weather-info_14028_53","weather-tag-wrapper":"_weather-tag-wrapper_14028_57","weather-tag":"_weather-tag_14028_57",btn:T,addition:U,"addition-item":"_addition-item_14028_93","addition-label":"_addition-label_14028_120","addition-value":"_addition-value_14028_121"};function H(n){const a=W();function t(){const l=new Date,s=l.getHours();return`${j[l.getDay()]}, ${s>12?s-12:s}${s>12?"pm":"am"}`}function _(l,s){a(`./detail/${encodeURIComponent(`${l},${s}`)}`)}const{name:f,icon:o,temp:d,text:c,windDir:m,windScale:p,precip:h,humidity:N,windSpeed:g,longitude:u,latitude:w}=n.data;return r("div",{className:e.component,children:[o?i("img",{className:e.icon,src:P(o)}):null,i("p",{className:e.name,children:f}),r("section",{className:e.weather,children:[r("div",{className:e["weather-temp"],children:[i("p",{className:e["temp-value"],children:d}),i("p",{className:e["temp-time"],children:t()})]}),r("div",{className:e["weather-info"],children:[i("p",{className:e["weather-tag-wrapper"],children:r("span",{className:e["weather-tag"],children:[m,p,"\u7EA7"]})}),i("p",{className:e["weather-tag-wrapper"],children:i("span",{className:e["weather-tag"],style:{background:"rgba(106, 117, 186, 0.5)"},children:c})})]})]}),i("button",{disabled:!w||!u,className:e.btn,onClick:_.bind(null,u,w),children:"\u8BE6\u60C5"}),r("aside",{className:e.addition,children:[r("dl",{className:e["addition-item"],children:[i("dt",{className:e["addition-label"],children:"\u964D\u6C34\u91CF"}),r("dd",{className:e["addition-value"],children:[h,"mm"]})]}),r("dl",{className:e["addition-item"],children:[i("dt",{className:e["addition-label"],children:"\u6E7F\u5EA6"}),r("dd",{className:e["addition-value"],children:[N,"%"]})]}),r("dl",{className:e["addition-item"],children:[i("dt",{className:e["addition-label"],children:"\u98CE\u901F"}),r("dd",{className:e["addition-value"],children:[g,"km/h"]})]})]})]})}function V(){const[n,a]=S.exports.useState({name:"--",icon:"",temp:"--",obsTime:"--",text:"--",windDir:"--",windScale:"--",windSpeed:"--",precip:"--",humidity:"--"});function t(){try{a(JSON.parse(window.localStorage.getItem("weatherInfo")||"{}"))}catch{console.log("weather info init error")}}async function _(o,d){const{location:c=[]}=await k(o,d);if(c.length){const{adm1:m,adm2:p,name:h}=c[0];a(b(v({},n),{name:`${h}, ${m}`}))}}async function f(o,d){const{now:{temp:c,obsTime:m,text:p,icon:h,windDir:N,windScale:g,windSpeed:u,precip:w,humidity:l}}=await q(o,d),s=b(v({},n),{temp:c,obsTime:m,text:p,icon:h,windDir:N,windScale:g,windSpeed:u,precip:w,humidity:l,longitude:o,latitude:d});a(s),window.localStorage.setItem("weatherInfo",JSON.stringify(s))}return S.exports.useEffect(()=>{t(),navigator.geolocation.getCurrentPosition(async o=>{const{longitude:d,latitude:c}=o&&o.coords||{};d&&c&&(n.name==="--"?_(d,c):f(d,c))},o=>{console.error(o);const d=window.localStorage.getItem("weatherInfo");if(n.name==="--"&&d)try{a(JSON.parse(d))}catch(c){console.log(c)}},{maximumAge:6e4})},[n.name]),r("div",{className:"view__home",children:[i("header",{className:"header"}),i("main",{className:"main",children:i(H,{data:n})})]})}export{V as default};
