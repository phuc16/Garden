(window["webpackJsonpconnect-plus-react"]=window["webpackJsonpconnect-plus-react"]||[]).push([[12],{388:function(e,t,a){"use strict";a.r(t);var l=a(38),s=a(137),r=a.n(s),o=a(138),i=a(10),n=a(11),c=a(13),d=a(12),m=a(14),h=a(0),u=a.n(h),g=a(139),p=a(134),b=a.n(p),v=a(125),y=a(124),E=a(149),f=a(15),S=a(156),N=a.n(S),x=a(135),M=a.n(x),w=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(c.a)(this,Object(d.a)(t).call(this,e))).data={labels:[],datasets:[{label:"Today Soil Moisture",data:[],backgroundColor:["rgba(255, 99, 132, 0.2)","rgba(54, 162, 235, 0.2)","rgba(255, 206, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(153, 102, 255, 0.2)","rgba(255, 159, 64, 0.2)"],borderColor:["rgba(255,99,132,1)","rgba(54, 162, 235, 1)","rgba(255, 206, 86, 1)","rgba(75, 192, 192, 1)","rgba(153, 102, 255, 1)","rgba(255, 159, 64, 1)"],borderWidth:1,fill:!0}]},a.options={scales:{yAxes:[{ticks:{beginAtZero:!0}}]},legend:{display:!0},elements:{point:{radius:0}}},a.state={allSoil:[],todaySoil:[],lastData:0},a}return Object(m.a)(t,e),Object(n.a)(t,[{key:"componentDidMount",value:function(){var e=Object(o.a)(r.a.mark((function e(){var t,a,l,s=this;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new Date,a=t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate(),l=t.getFullYear()+"-"+(t.getMonth()+1)+"-"+(t.getDate()+1),e.next=5,M.a.get("https://universe-smart-garden.herokuapp.com/data").then((function(e){for(var t=[],a=0;a<e.data.length;a++)"Moist"==e.data[a].category&&t.push(e.data[a]);s.setState({allSoil:t})}));case 5:return console.log("x"),e.next=8,M.a.get("https://universe-smart-garden.herokuapp.com/data/last").then((function(e){for(var t=0,a=0;a<e.data.length;a++)"Moist"==e.data[a].category&&(t=e.data[a].value);console.log(t),s.setState({lastData:t})}));case 8:return e.next=10,M.a.get("https://universe-smart-garden.herokuapp.com"+"/data/search?idGarden=1&startDay=".concat(a,"&endDay=").concat(l)).then((function(e){for(var t=[],a=0;a<e.data.length;a++)"Moist"==e.data[a].category&&t.push(e.data[a]);s.setState({todaySoil:t})}));case 10:return e.next=12,M.a.get("https://universe-smart-garden.herokuapp.com/data/before-last").then((function(e){var t=e.data;s.setState({nearestData:t.Moist})}));case 12:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"showChart",value:function(){for(var e=[],t=[],a=[],l=[],s=0;s<this.state.todaySoil.length;s++)e.push(this.state.todaySoil[s].value),t.push(this.state.todaySoil[s].time.slice(11,this.state.todaySoil[s].time.length).replace(".000Z",""));for(var r=0;r<this.state.allSoil.length;r++)a.push(this.state.allSoil[r].value),l.push(this.state.allSoil[r].time.slice(0,11).replace("T",""));this.data.labels=t,this.data.datasets[0].data=e,console.log(t)}},{key:"render",value:function(){console.log("render");var e=0,t="",a="",s=new Date,r=s.getFullYear()+"-"+(s.getMonth()+1)+"-"+s.getDate(),o=[this.state.lastData-this.state.nearestData];this.showChart();for(var i=0;i<this.state.todaySoil.length;i++)e+=this.state.todaySoil[i].value;if(this.state.todaySoil.length>0){var n=[];n.push.apply(n,Object(l.a)(this.state.todaySoil.map((function(e){return e.value})))),t=(t=this.state.todaySoil[n.indexOf(Math.max.apply(Math,Object(l.a)(this.state.todaySoil.map((function(e){return e.value})))))].time).replace("T",", ").replace(".000Z",""),a=(a=this.state.todaySoil[n.indexOf(Math.min.apply(Math,Object(l.a)(this.state.todaySoil.map((function(e){return e.value})))))].time).replace("T",", ").replace(".000Z","")}console.log(this.state.lastData);var c=[{id:"Max",soil:this.state.todaySoil.length>0?Math.max.apply(Math,Object(l.a)(this.state.todaySoil.map((function(e){return e.value})))):"No data",time:t},{id:"Min",soil:this.state.todaySoil.length>0?Math.min.apply(Math,Object(l.a)(this.state.todaySoil.map((function(e){return e.value})))):"No data",time:a},{id:"Avarage",soil:this.state.todaySoil.length>0?Math.round(e/this.state.todaySoil.length*100)/100:"No data",time:r}],d=[{dataField:"id",text:"ID",sort:!0},{dataField:"value",text:"Value",sort:!0},{dataField:"time",text:"Time",sort:!0}];return u.a.createElement("div",null,u.a.createElement("div",{className:"page-header"},u.a.createElement("h3",{className:"page-title"},"Soil Moisture"),u.a.createElement("nav",{"aria-label":"breadcrumb"},u.a.createElement("ol",{className:"breadcrumb"},u.a.createElement("li",{className:"breadcrumb-item"},u.a.createElement(f.b,{to:"/dashboard"},"Device Control Center")),u.a.createElement("li",{className:"breadcrumb-item active","aria-current":"page"},"Soil Moisture")))),u.a.createElement("div",{className:"row"},u.a.createElement("div",{className:"col-xl-3 col-lg-6 col-sm-6 grid-margin stretch-card"},u.a.createElement("div",{className:"card"},u.a.createElement("div",{className:"card-body text-center"},u.a.createElement("h5",{className:"mb-2 text-dark font-weight-normal"},"Soil Moisture"),u.a.createElement("h2",{className:"mb-4 text-dark font-weight-bold"},this.state.lastData),u.a.createElement("div",{className:"px-4 d-flex align-items-center"},u.a.createElement("svg",{width:"0",height:"0"},u.a.createElement("defs",null,u.a.createElement("linearGradient",{id:"progress-order"},u.a.createElement("stop",{offset:"0%",stopColor:"#1579ff"}),u.a.createElement("stop",{offset:"100%",stopColor:"#7922e5"})))),u.a.createElement(g.a,{className:"progress-order",value:this.state.lastData/10},u.a.createElement("div",null,u.a.createElement("i",{className:"mdi mdi-waves icon-md absolute-center text-dark"})))),u.a.createElement("p",{className:"mt-4 mb-0"},o>=0?"Increased since":"Decreased since"," last time"),u.a.createElement("h3",{className:"mb-0 font-weight-bold mt-2 text-dark"},Math.floor(Math.abs(o)/this.state.nearestData*100)," %")))),u.a.createElement("div",{className:"col-xl-9 col-lg-6 col-sm-6 grid-margin stretch-card"},u.a.createElement("div",{className:"card"},u.a.createElement("div",{className:"card-body text-center"},u.a.createElement("h5",{className:"mb-2 text-dark font-weight-normal"},"Soil Moisture Overview"),u.a.createElement(b.a,{bootstrap4:!0,keyField:"id",data:c,columns:[{dataField:"id",text:"",sort:!0},{dataField:"soil",text:"Moist",sort:!0},{dataField:"time",text:"Time",sort:!0}]}))))),u.a.createElement("div",{className:"row"},u.a.createElement("div",{className:"col-md-12"},u.a.createElement("div",{className:"justify-content-between align-items-center tab-transparent"},u.a.createElement(v.a,{defaultActiveKey:"chart",id:"uncontrolled-tab-example",className:"mb-3"},u.a.createElement(y.a,{eventKey:"chart",title:"Chart"},u.a.createElement("div",{className:"card"},u.a.createElement("div",{className:"card-body"},u.a.createElement("h4",{className:"card-title"},"Soil Moisture Chart"),u.a.createElement(E.a,{data:this.data,options:this.options})))),u.a.createElement(y.a,{eventKey:"today",title:"Today"},u.a.createElement("div",{className:"card"},u.a.createElement("div",{className:"card-body text-center"},u.a.createElement("h5",{className:"mb-2 text-dark font-weight-normal"},"Soil Moisture Stats Today"),u.a.createElement(b.a,{keyField:"id",data:this.state.todaySoil,columns:d})))),u.a.createElement(y.a,{eventKey:"data",title:"Data"},u.a.createElement("div",{className:"card"},u.a.createElement("div",{className:"card-body text-center"},u.a.createElement("h5",{className:"mb-2 text-dark font-weight-normal"},"Soil Moisture Stats"),u.a.createElement(b.a,{bootstrap4:!0,keyField:"id",data:this.state.allSoil,columns:d,pagination:N()({sizePerPage:5})})))))))))}}]),t}(h.Component);t.default=w}}]);
//# sourceMappingURL=12.519ecb23.chunk.js.map