webpackJsonp([2],{"+q6a":function(t,n,e){var i=e("CNDR");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);e("rjj0")("4b644db3",i,!0,{})},CNDR:function(t,n,e){(n=t.exports=e("FZ+f")(!1)).push([t.i,"\n.list-2fctG_0 .item {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin-bottom: 0.1rem;\n  height: 1.2rem;\n  border-radius: 0.06rem;\n  text-align: center;\n  padding: 0.1rem 0;\n}\n.list-2fctG_0 .item .text {\n  font-size: 0.2rem;\n  line-height: 0.3rem;\n  color: #fff;\n}\n@-webkit-keyframes list-load-3CXeB_0 {\n0% {\n    -webkit-transform: translateY(100px);\n            transform: translateY(100px);\n}\n100% {\n    -webkit-transform: translateY(0px);\n            transform: translateY(0px);\n}\n}\n@keyframes list-load-3CXeB_0 {\n0% {\n    -webkit-transform: translateY(100px);\n            transform: translateY(100px);\n}\n100% {\n    -webkit-transform: translateY(0px);\n            transform: translateY(0px);\n}\n}\n",""]),n.locals={list:"list-2fctG_0","list-load":"list-load-3CXeB_0"}},WmsI:function(t,n,e){var i=e("j6mu");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);e("rjj0")("44d67912",i,!0,{})},Z2mZ:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=e("dS0K"),s=e("W+FH"),r={components:{ColorList:i.a},data:function(){return{letterList:[]}},computed:{numberId:function(){return this.$route.params.numberId}},mounted:function(){this.getLetterList()},methods:{getLetterList:function(){var t=this;Object(s.c)(this.numberId).then(function(n){1===n.code&&(t.letterList=n.data)})},clickHandler:function(t){this.$router.push("/main/letter-detail/"+this.numberId+"/"+t.id)}}},a={render:function(){var t=this.$createElement,n=this._self._c||t;return n("page",[n("div",{class:this.$style["letter-list"]},[n("color-list",{ref:"list",attrs:{data:this.letterList},on:{"item-click":this.clickHandler}})],1)])},staticRenderFns:[]};var l=e("VU/8")(r,a,!1,function(t){this.$style=e("WmsI")},null,null);n.default=l.exports},dS0K:function(t,n,e){"use strict";var i={props:{data:{type:Array,default:function(){return[]}}},data:function(){return{isFinishAnimation:!1}},computed:{setStyle:function(t,n){var e=this;return function(t,n){return{background:n.background,animation:e.isFinishAnimation?"none":e.$style["list-load"]+" "+(200*t+400)+"ms"}}}},methods:{animationend:function(t){t===this.data.length-1&&(this.isFinishAnimation=!0)},clickHandler:function(t,n){this.isFinishAnimation=!0,this.$emit("item-click",t,n)}}},s={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{class:t.$style.list},t._l(t.data,function(n,i){return e("div",{key:i,staticClass:"item",style:t.setStyle(i,n),on:{click:function(e){return t.clickHandler(n,i)},animationend:function(n){return t.animationend(i)}}},[e("div",{staticClass:"text"},[t._v("id: "+t._s(n.id))]),t._v(" "),e("div",{staticClass:"text"},[t._v("text: "+t._s(n.text))]),t._v(" "),n.children?e("div",{staticClass:"text"},[t._v("子项长度: "+t._s(n.children.length))]):t._e()])}),0)},staticRenderFns:[]};var r=e("VU/8")(i,s,!1,function(t){this.$style=e("+q6a")},null,null);n.a=r.exports},j6mu:function(t,n,e){(n=t.exports=e("FZ+f")(!1)).push([t.i,"\n.letter-list-hOlsw_0 {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  height: 100%;\n  padding: 0.3rem 0.1rem;\n}\n",""]),n.locals={"letter-list":"letter-list-hOlsw_0"}}});