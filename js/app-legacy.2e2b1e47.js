(function(){"use strict";var t={5625:function(t,e,n){n(6992),n(8674),n(9601),n(7727);var o=n(8935),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-6"},[n("h2",[t._v("Current Camera")]),t.device?n("code",[t._v(t._s(t.device.label))]):t._e(),n("div",{staticClass:"border"},[n("vue-web-cam",{ref:"webcam",attrs:{"device-id":t.deviceId,width:"100%"},on:{started:t.onStarted,stopped:t.onStopped,error:t.onError,cameras:t.onCameras,"camera-change":t.onCameraChange}})],1),n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-12"},[n("select",{directives:[{name:"model",rawName:"v-model",value:t.camera,expression:"camera"}],on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.camera=e.target.multiple?n:n[0]}}},[n("option",[t._v("-- Select Device --")]),t._l(t.devices,(function(e){return n("option",{key:e.deviceId,domProps:{value:e.deviceId}},[t._v(" "+t._s(e.label)+" ")])}))],2)]),n("div",{staticClass:"col-md-12"},[n("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:t.onCapture}},[t._v(" Capture Photo ")]),n("button",{staticClass:"btn btn-danger",attrs:{type:"button"},on:{click:t.onStop}},[t._v(" Stop Camera ")]),n("button",{staticClass:"btn btn-success",attrs:{type:"button"},on:{click:t.onStart}},[t._v(" Start Camera ")])])])]),n("div",{staticClass:"col-md-6"},[n("h2",[t._v("Captured Image")]),n("figure",{staticClass:"figure"},[n("img",{staticClass:"img-responsive",attrs:{src:t.img}})]),t.predictionList.length>0?n("div",[n("h3",[t._v("Predictions")]),n("ul",t._l(t.predictionList,(function(e,o){return n("li",{key:o},[t._v(" "+t._s(e.name)+", "+t._s(e.probability)+"% ")])})),0)]):t._e()])])])},r=[],a=n(6198),c=n(7576),s=(n(8975),n(9826),n(1539),n(7042),n(4916),n(3123),n(5505),n(7714),n(2801),n(1174),n(2472),n(8675),n(2990),n(8927),n(3105),n(5035),n(4345),n(7174),n(2846),n(4731),n(7209),n(6319),n(8867),n(7789),n(3739),n(9368),n(4483),n(2056),n(3462),n(678),n(7462),n(3824),n(5021),n(2974),n(5016),n(6977),n(6552)),u=n.n(s),l={name:"App",components:{"vue-web-cam":s.WebCam},data:function(){return{img:null,camera:null,deviceId:null,devices:[],predictionList:[]}},computed:{device:function(){var t=this;return this.devices.find((function(e){return e.deviceId===t.deviceId}))}},watch:{camera:function(t){this.deviceId=t},devices:function(){var t=(0,c.Z)(this.devices),e=t[0],n=t.slice(1);console.log("Tail: ",n),e&&(this.camera=e.deviceId,this.deviceId=e.deviceId)}},methods:{onCapture:function(){this.img=this.$refs.webcam.capture(),this.useVisionAPI()},onStarted:function(t){console.log("On Started Event",t)},onStopped:function(t){console.log("On Stopped Event",t)},onStop:function(){this.$refs.webcam.stop()},onStart:function(){this.$refs.webcam.start()},onError:function(t){console.log("On Error Event",t)},onCameras:function(t){this.devices=t,console.log("On Cameras Event",t)},onCameraChange:function(t){this.deviceId=t,this.camera=t,console.log("On Camera Change Event",t)},dataURItoBlob:function(t){var e;e=t.split(",")[0].indexOf("base64")>=0?atob(t.split(",")[1]):unescape(t.split(",")[1]);for(var n=t.split(",")[0].split(":")[1].split(";")[0],o=new Uint8Array(e.length),i=0;i<e.length;i++)o[i]=e.charCodeAt(i);return new Blob([o],{type:n})},useVisionAPI:function(){var t=(0,a.Z)(regeneratorRuntime.mark((function t(){var e,n,o,i,r=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:this.predictionList=[],e={NODE_ENV:"production",BASE_URL:"/"}.VUE_APP_CUSTOMVISIONPREDICTKEY||"<customVisionPredictionKey>",n={NODE_ENV:"production",BASE_URL:"/"}.VUE_APP_CUSTOMVISIONPREDICTENDPOINT||"<customVisionPredictionEndPoint>",console.log("Changing to binary"),o=this.$refs.webcam.capture(),i=this.dataURItoBlob(o),console.log(i),this.axios.post(n,i,{headers:{"Prediction-Key":e,"Content-Type":"application/octet-stream"}}).then((function(t){console.log(t.data);var e=t.data.predictions;console.log("Predictions"),console.log(e);for(var n=[],o=0;o<e.length;o++){var i={},a=e[o];i.name=a.tagName,i.probability=(100*a.probability).toFixed(2),n.push(i)}r.predictionList=n}));case 8:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()}},d=l,p=n(1001),f=(0,p.Z)(d,i,r,!1,null,null,null),v=f.exports,m=n(6166),h=n.n(m),b=n(6762);n(1462);o.Z.config.productionTip=!1,new o.Z({render:function(t){return t(v)}}).$mount("#app"),o.Z.use(u()),o.Z.use(b.Z,h())}},e={};function n(o){var i=e[o];if(void 0!==i)return i.exports;var r=e[o]={id:o,loaded:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.loaded=!0,r.exports}n.m=t,function(){n.amdO={}}(),function(){var t=[];n.O=function(e,o,i,r){if(!o){var a=1/0;for(l=0;l<t.length;l++){o=t[l][0],i=t[l][1],r=t[l][2];for(var c=!0,s=0;s<o.length;s++)(!1&r||a>=r)&&Object.keys(n.O).every((function(t){return n.O[t](o[s])}))?o.splice(s--,1):(c=!1,r<a&&(a=r));if(c){t.splice(l--,1);var u=i();void 0!==u&&(e=u)}}return e}r=r||0;for(var l=t.length;l>0&&t[l-1][2]>r;l--)t[l]=t[l-1];t[l]=[o,i,r]}}(),function(){n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,{a:e}),e}}(),function(){n.d=function(t,e){for(var o in e)n.o(e,o)&&!n.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.hmd=function(t){return t=Object.create(t),t.children||(t.children=[]),Object.defineProperty(t,"exports",{enumerable:!0,set:function(){throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+t.id)}}),t}}(),function(){n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){n.nmd=function(t){return t.paths=[],t.children||(t.children=[]),t}}(),function(){var t={143:0};n.O.j=function(e){return 0===t[e]};var e=function(e,o){var i,r,a=o[0],c=o[1],s=o[2],u=0;if(a.some((function(e){return 0!==t[e]}))){for(i in c)n.o(c,i)&&(n.m[i]=c[i]);if(s)var l=s(n)}for(e&&e(o);u<a.length;u++)r=a[u],n.o(t,r)&&t[r]&&t[r][0](),t[r]=0;return n.O(l)},o=self["webpackChunkcustom_vision_demo"]=self["webpackChunkcustom_vision_demo"]||[];o.forEach(e.bind(null,0)),o.push=e.bind(null,o.push.bind(o))}();var o=n.O(void 0,[998],(function(){return n(5625)}));o=n.O(o)})();
//# sourceMappingURL=app-legacy.2e2b1e47.js.map