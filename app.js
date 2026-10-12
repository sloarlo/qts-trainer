(()=>{
const D=window.QTS_DATA,M=window.QTS_MODULES,$=s=>document.querySelector(s),app=$('#app');
const MK=Object.keys(D),R=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pick=a=>a[Math.floor(Math.random()*a.length)];
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const fmt=s=>new Date(s+'T12:00').toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
// ---------- storage ----------
const KEY='qtsTrainer.v1';const S=Object.assign({att:{},tests:[],review:[],log:null,lessons:{}},JSON.parse(localStorage.getItem(KEY)||'{}'));
if(!S.log)S.log=window.QTS_SEED_LOG.map(r=>r.slice());
const save=()=>localStorage.setItem(KEY,JSON.stringify(S));
function record(mod,ok,item){const a=S.att[mod]||(S.att[mod]={n:0,c:0});a.n++;if(ok)a.c++;
 if(item){const k=item.key||JSON.stringify(item.q+item.o.join());let r=S.review.find(x=>x.k===k);
  if(!ok){if(r){r.box=0;r.due=Date.now()+864e5}else S.review.push({k,mod,item,box:0,due:Date.now()+864e5})}
  else if(r&&item._review){r.box++;if(r.box>=4)S.review=S.review.filter(x=>x!==r);else r.due=Date.now()+[1,3,7,14][r.box]*864e5}}
 save()}
// ---------- analysis ----------
const pivCache={};
function pivots(k,mk){const id=k+mk;if(pivCache[id])return pivCache[id];const d=D[k],n=d.h.length,out=[];
 for(let i=mk;i<n-mk;i++){let top=true,bot=true;for(let j=i-mk;j<=i+mk;j++){if(d.h[j]>d.h[i])top=false;if(d.l[j]<d.l[i])bot=false;if(!top&&!bot)break}
  if(top)out.push({i,t:'top',p:d.h[i]});if(bot)out.push({i,t:'bottom',p:d.l[i]})}return pivCache[id]=out}
const win=a=>a<90?2:3;
// ---------- chart ----------
const shadePlugin={id:'shade',beforeDatasetsDraw(c,_,o){const{ctx,chartArea:A,scales:{x,y}}=c;(o.shades||[]).forEach(s=>{const a=x.getPixelForValue(s.a)-2,b=x.getPixelForValue(s.b)+2;ctx.fillStyle=s.color||'rgba(252,163,17,.25)';ctx.fillRect(a,A.top,b-a,A.bottom-A.top);if(s.label){ctx.fillStyle='#333';ctx.font='11px sans-serif';ctx.fillText(s.label,a+2,A.top+12)}});
 (o.hlines||[]).forEach(h=>{const py=y.getPixelForValue(h.y);ctx.strokeStyle=h.color||'#888';ctx.setLineDash([4,3]);ctx.beginPath();ctx.moveTo(A.left,py);ctx.lineTo(A.right,py);ctx.stroke();ctx.setLineDash([]);ctx.fillStyle='#444';ctx.font='11px sans-serif';ctx.fillText(h.label,A.left+3,py-3)});
 (o.vlines||[]).forEach(v=>{const px=x.getPixelForValue(v.i);ctx.strokeStyle=v.color||'#d64545';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(px,A.top);ctx.lineTo(px,A.bottom);ctx.stroke();ctx.lineWidth=1;ctx.fillStyle=v.color||'#d64545';ctx.font='bold 11px sans-serif';ctx.fillText(v.label||'',px+3,A.bottom-6)})}};
if(window.Chart)Chart.register(shadePlugin);
let charts=[];function killCharts(){charts.forEach(c=>c.destroy());charts=[]}
function chart(el,spec){if(!window.Chart){el.parentNode.innerHTML='<p class="src">Chart library failed to load (offline?).</p>';return}
 const{k,i0,i1,extra=0}=spec,d=D[k];const labels=d.d.slice(i0,i1+1).concat(spec.future||[]);const off=i=>i-i0;
 const ds=[{label:d.name+' close',data:d.c.slice(i0,i1+1),borderColor:'#14213d',borderWidth:1.3,pointRadius:0,tension:0}];
 (spec.series||[]).forEach(s=>ds.push(s));
 if(spec.points)ds.push({type:'scatter',label:'pivots',data:spec.points.map(p=>({x:labels[off(p.i)],y:p.y})),pointRadius:5,backgroundColor:spec.points.map(p=>p.c||'#d64545')});
 charts.push(new Chart(el,{type:'line',data:{labels,datasets:ds},options:{animation:false,responsive:true,maintainAspectRatio:false,interaction:{mode:'index',intersect:false},
  scales:{x:{ticks:{maxTicksLimit:7}}},plugins:{legend:{display:!!spec.series},shade:{shades:(spec.shades||[]).map(s=>({...s,a:off(s.a),b:off(s.b)})),hlines:spec.hlines||[],vlines:(spec.vlines||[]).map(v=>({...v,i:off(v.i)}))}}}}))}
// ---------- drill generators (real data) ----------
function randPivot(minAfter){const k=pick(MK),P=pivots(k,30).filter(p=>p.i<D[k].d.length-minAfter&&p.i>40);return{k,p:pick(P)}}
const G={
count(){const{k,p}=randPivot(220),n=R(25,200),b=p.i+n,d=D[k];const opts=shuffle([n,n+R(1,4),n-R(1,4),Math.round(n*1.4)]).filter((v,i,a)=>a.indexOf(v)===i);
 return{mod:'algos',q:`${d.name}: a major ${p.t} formed on ${fmt(d.d[p.i])} (red). How many trading bars from that pivot to ${fmt(d.d[b])} (blue)?`,o:opts.map(String),a:opts.indexOf(n),
  e:`Count trading bars only: ${n}. In calendar days it would be ${Math.round((new Date(d.d[b])-new Date(d.d[p.i]))/864e5)} — the course counts trading days.`,chart:{k,i0:p.i-20,i1:b+10,vlines:[{i:p.i,label:'pivot'},{i:b,label:'?',color:'#1f6feb'}]}}},
window(){const{k,p}=randPivot(380),d=D[k],A=pick([45,90,180,135,60,120]),w=win(A),s=p.i+A-w,e=p.i+A+w;
 const cal=new Date(d.d[p.i]);cal.setDate(cal.getDate()+A);const cs=new Date(cal);cs.setDate(cs.getDate()-w);const ce=new Date(cal);ce.setDate(ce.getDate()+w);const iso=x=>x.toISOString().slice(0,10);
 const wrongW=A<90?3:2;const opts=[`${fmt(d.d[s])} – ${fmt(d.d[e])}`,`${fmt(iso(cs))} – ${fmt(iso(ce))}`,`${fmt(d.d[p.i+A-wrongW])} – ${fmt(d.d[p.i+A+wrongW])}`,`${fmt(d.d[s+5])} – ${fmt(d.d[e+5])}`];const sh=shuffle(opts);
 return{mod:'algos',q:`${d.name}: major ${p.t} on ${fmt(d.d[p.i])}. Which is the ${A}-algo time window?`,o:sh,a:sh.indexOf(opts[0]),
  e:`${A} trading bars ±${w} (${A<90?'below 90 → ±2':'90 and above → ±3'}) = bars ${A-w}–${A+w}: ${opts[0]}. Did price turn there? Look at the shaded zone.`,chart:{k,i0:p.i-15,i1:Math.min(e+30,d.d.length-1),vlines:[{i:p.i,label:p.t}],shades:[{a:s,b:e,label:A+''}]},chartAfter:true}},
nextalgo(){const{k,p}=randPivot(380),d=D[k],L=[45,60,90,120,135,180,240,270,360];let n,ans;
 if(Math.random()<.75){const A=pick(L);n=A+R(-win(A),win(A));ans=L.filter(x=>Math.abs(n-x)<=win(x)).join(' & ')}else{do{n=R(30,370)}while(L.some(x=>Math.abs(n-x)<=win(x)));ans='None — no window open'}
 const others=shuffle(L.map(String).filter(x=>!ans.includes(x))).slice(0,2);const opts=shuffle([ans,...others,...(ans.startsWith('None')?[pick(L.filter(x=>!others.includes(String(x)))).toString()]:['None — no window open'])]);
 return{mod:'algos',q:`${d.name}: from the ${p.t} on ${fmt(d.d[p.i])}, the bar on ${fmt(d.d[p.i+n])} is bar #${n}. Which algo window (if any) is open on that bar? (Algos: ${L.join(', ')})`,o:opts,a:opts.indexOf(ans),
  e:`Bar ${n}: ${ans}. Windows are ±2 below 90, ±3 at 90+.`,chart:{k,i0:p.i-10,i1:p.i+n+15,vlines:[{i:p.i,label:p.t},{i:p.i+n,label:'#'+n,color:'#1f6feb'}]},chartAfter:true}},
eighth(){const k=pick(MK),d=D[k],P=pivots(k,30);let a,b;for(let t=0;t<50;t++){const j=R(0,P.length-2);a=P[j];b=P.find(x=>x.i>a.i&&x.t!==a.t);if(b&&b.i-a.i>30)break}
 const lo=Math.min(a.p,b.p),hi=Math.max(a.p,b.p),pct=pick([25,37.5,50,62.5,75,87.5,12.5]);const v=x=>(lo+(hi-lo)*x/100);const dec=k==='N225'?0:2;
 const opts=[v(pct),v(pct+12.5>100?pct-25:pct+12.5),v(100-pct===pct?pct-12.5:100-pct),lo+(hi-lo)*pct/80].map(x=>x.toFixed(dec));const u=[...new Set(opts)];const sh=shuffle(u);
 return{mod:'setup',q:`${d.name}: range from ${fmt(d.d[Math.min(a.i,b.i)])} to ${fmt(d.d[Math.max(a.i,b.i)])}, low ${lo.toFixed(dec)} and high ${hi.toFixed(dec)}. Where is the ${pct}% eighth (measured from the low)?`,o:sh,a:sh.indexOf(opts[0]),
  e:`low + (high − low) × ${pct}% = ${opts[0]}.${pct===87.5?' That is the death line.':''}`,chart:{k,i0:Math.min(a.i,b.i)-5,i1:Math.min(Math.max(a.i,b.i)+80,d.d.length-1),hlines:[12.5,25,37.5,50,62.5,75,87.5].map(x=>({y:v(x),label:x+'%',color:x===87.5?'#d64545':'#999'})),points:[{i:a.i,y:a.p},{i:b.i,y:b.p}]},chartAfter:true}},
setup(){const w=Math.random()<.5,lv=Math.random()<.5,pos=Math.random()<.3;const A=pick([45,90,135,180,240]),n=w?A+R(-win(A),win(A)):A+win(A)+R(2,8),L=pick(['25%','50%','75%','87.5% death line','a double bottom']);
 let ans,q;if(pos){q=`You are already long from a prior setup. Price reaches your target at ${L}. Bar count from the last pivot is ${n} (nearest algo ${A}). What do you do?`;ans='Take profit — closing needs price only'}
 else{q=`Flat. Bar count from a major pivot is ${n} (algo ${A}, window ${A-win(A)}–${A+win(A)}). Price is ${lv?'on '+L:'"in the middle of nowhere"'}. What do you do?`;ans=w&&lv?'Open a trade (price-time setup)':w?'Wait — window open but no price level (until it closes)':'No new trade — no open time window'}
 const all=['Open a trade (price-time setup)','Wait — window open but no price level (until it closes)','No new trade — no open time window','Take profit — closing needs price only'];
 return{mod:'setup',q,o:all,a:all.indexOf(ans),e:'Open = price AND time. Close = price only [L2-1 01:11:45].'}},
validate(){const T={Gold:[37,32,44,43,44,43],'Nikkei 225':[32,28,42,39,42,39],Coffee:[25,32,51,43,52,42],'S&P 500':[36,29,34,39,39,40]};const m=pick(Object.keys(T)),r=T[m],al=[45,90,180];
 const lift=al.map((a,i)=>r[2*i]-r[2*i+1]);const best=lift.indexOf(Math.max(...lift));const o=al.map((a,i)=>`${a} (${r[2*i]}% vs ${r[2*i+1]}% random)`);
 return{mod:'validate',q:`Homework backtest for ${m}. Which daily algo validated best (largest lift over the random baseline)?`,o,a:best,e:`Lift = hit − random: ${al.map((a,i)=>a+': '+(lift[i]>0?'+':'')+lift[i]).join(', ')}. Weight that family more; anything below random gets little weight.`}},
sar(){const n=R(1,5),dir=pick(['long','short']),opp=dir==='long'?'sell':'buy';const o=[`${opp} ${2*n} (close ${n} + reverse ${n})`,`${opp} ${n} and stay flat`,`${opp} ${3*n}`,`${dir==='long'?'buy':'sell'} ${n} more`];
 return{mod:'accel',q:`You are ${dir} ${n} contract${n>1?'s':''} on a major price-time setup. You want stop-and-reverse. What should the stop order be?`,o:shuffle(o),get a(){return this.o.indexOf(o[0])},e:'Close the position and open the same size the other way, in one stop order [L2-2 00:15:53].'}},
mtf(){for(let t=0;t<40;t++){const k=pick(MK),d=D[k],Y=R(2023,2025),P=pivots(k,10);const mon=y=>{const res=[];for(let m=0;m<12;m++){const ii=d.d.map((s,i)=>[s,i]).filter(([s])=>+s.slice(0,4)===y&&+s.slice(5,7)===m+1).map(x=>x[1]);if(!ii.length)continue;
   const hi=ii.reduce((a,b)=>d.h[b]>d.h[a]?b:a),lo=ii.reduce((a,b)=>d.l[b]<d.l[a]?b:a);if(P.some(p=>p.i===hi&&p.t==='top'))res.push({s:d.d[hi],t:'top'});if(P.some(p=>p.i===lo&&p.t==='bottom'))res.push({s:d.d[lo],t:'bottom'})}return res};
  const a=mon(Y-10),b=mon(Y-20);if(!a.length||!b.length)continue;const md=s=>{const x=new Date(Y+s.slice(4)+'T12:00');return x};const pairs=[];
  a.forEach(x=>b.forEach(y=>{const g=Math.abs(md(x.s)-md(y.s))/864e5;if(g<=15&&g>=1)pairs.push([x,y])}));if(!pairs.length)continue;const[x,y]=pick(pairs);
  const [e1,e2]=[md(x.s),md(y.s)].sort((u,v)=>u-v),f=z=>z.toLocaleDateString('en-US',{month:'short',day:'numeric'});const pol=x.t===y.t?x.t:'top or bottom';
  const ans=`${f(e1)} – ${f(e2)} ${Y}: ${pol}`;const sh=new Date(e1);sh.setMonth(sh.getMonth()+1);const sh2=new Date(e2);sh2.setMonth(sh2.getMonth()+1);
  const o=shuffle([ans,`${f(e1)} only ${Y}: ${pol==='top'?'bottom':'top'}`,`${f(sh)} – ${f(sh2)} ${Y}: ${pol}`,`No window — turns are from different decades`]);
  return{mod:'mtf',q:`${d.name} Master Time Factor for ${Y} (10- and 20-year cycles). ${Y-10} had a major ${x.t} on ${fmt(x.s)}; ${Y-20} had a major ${y.t} on ${fmt(y.s)}. What forecast window and polarity do you mark?`,o,a:o.indexOf(ans),
   e:`Different decades within ~15 days → join them: ${ans}. Then validate on the prior year and confirm with time algos + price before acting. Check the actual ${Y} chart below.`,chart:(()=>{const i0=d.d.findIndex(s=>s>=Y+'-01-01'),i1=d.d.findLastIndex(s=>s<=Y+'-12-31'),iso=z=>z.toISOString().slice(0,10),ia=d.d.findIndex(s=>s>=iso(e1)),ib=d.d.findIndex(s=>s>=iso(e2));return{k,i0,i1,shades:[{a:Math.max(i0,ia-3),b:Math.min(i1,ib+3),label:'±'}]}})(),chartAfter:true}}
  return G.sar()}};
const genFor=mod=>{const m=M.find(x=>x.id===mod);return G[pick(m.drills)]()};
const staticItem=(m,i)=>{const s=m.quiz[i],o=shuffle(s.o);return{mod:m.id,key:m.id+':'+i,q:s.q,o,a:o.indexOf(s.o[s.a]),e:s.e}};
// ---------- question UI ----------
function renderQ(box,item,onDone){killChartsIn(box);box.innerHTML=`<p><b>${item.q}</b></p>${item.chart&&!item.chartAfter?'<div class="chartbox"><canvas></canvas></div>':''}<div class="opts"></div><div class="after"></div>`;
 if(item.chart&&!item.chartAfter)chart(box.querySelector('canvas'),item.chart);const ob=box.querySelector('.opts'),a=typeof item.a==='number'?item.a:item.a;
 item.o.forEach((t,i)=>{const b=document.createElement('button');b.className='opt';b.textContent=t;b.onclick=()=>{if(box.dataset.done)return;box.dataset.done=1;const ok=i===item.a;b.classList.add(ok?'right':'wrong');ob.children[item.a].classList.add('right');
  const af=box.querySelector('.after');af.innerHTML=`<div class="fb ${ok?'ok':'no'}">${ok?'✔ Correct.':'✘ Not quite.'} ${item.e}</div>${item.chart&&item.chartAfter?'<div class="chartbox"><canvas></canvas></div>':''}`;if(item.chart&&item.chartAfter)chart(af.querySelector('canvas'),item.chart);onDone(ok)};ob.appendChild(b)})}
function killChartsIn(){}
// ---------- views ----------
function pct(m){const a=S.att[m];return a&&a.n?Math.round(100*a.c/a.n):null}
function best(m){const t=S.tests.filter(x=>x.mod===m);return t.length?Math.max(...t.map(x=>x.score)):null}
function dashboard(){const due=S.review.filter(r=>r.due<=Date.now()).length;const weak=M.filter(m=>pct(m.id)!==null&&pct(m.id)<70);
 app.innerHTML=`<div class="card"><h2>Welcome back, Arlo</h2><p>Work each module in order: <b>Learn → Practice → Test</b>. Missed items come back in <a href="#/review">Review</a> on a 1 / 3 / 7 / 14-day schedule.</p>
 <p>${due?`<a class="btn alt" href="#/review">Review ${due} due item${due>1?'s':''}</a>`:'No reviews due.'} <a class="btn ghost" href="#/live">Live windows</a> <a class="btn ghost" href="#/final">Final exam</a></p>
 ${weak.length?`<p><b>Weak areas:</b> ${weak.map(m=>`${m.title} (${pct(m.id)}%)`).join(', ')}</p>`:''}</div>
 <div class="card"><h3>Progress</h3><div class="chartbox" style="height:220px"><canvas id="prog"></canvas></div></div>
 <div class="grid">${M.map((m,i)=>{const p=pct(m.id),b=best(m.id);return`<div class="card"><h3>${i+1}. ${m.title}</h3>
 <p class="src">${S.lessons[m.id]?'✔ Lesson read':'Lesson not read'} · Accuracy ${p===null?'—':p+'%'} · Best test ${b===null?'—':b+'%'}</p><div class="bar"><i style="width:${b||0}%"></i></div><p>
 <a class="btn" href="#/m/${m.id}/learn">Learn</a><a class="btn ghost" href="#/m/${m.id}/practice">Practice</a><a class="btn ghost" href="#/m/${m.id}/test">Test</a></p></div>`}).join('')}</div>`;
 if(window.Chart)charts.push(new Chart($('#prog'),{type:'bar',data:{labels:M.map(m=>m.title.split(' ')[0]+' '+(m.title.split(' ')[1]||'')),datasets:[{label:'Accuracy %',data:M.map(m=>pct(m.id)||0),backgroundColor:'#14213d'},{label:'Best test %',data:M.map(m=>best(m.id)||0),backgroundColor:'#fca311'}]},options:{responsive:true,maintainAspectRatio:false,scales:{y:{max:100,beginAtZero:true}}}}))}
function tabs(m,mode){return`<p class="tabs">${['learn','practice','test'].map(x=>`<a class="btn ${x===mode?'on':'ghost'}" href="#/m/${m.id}/${x}">${x[0].toUpperCase()+x.slice(1)}</a>`).join('')}</p>`}
function lessonChart(m,el){const k=pick(MK),d=D[k];
 if(m.chart==='algos'){const P=pivots(k,30).filter(p=>p.i<d.d.length-200&&p.i>20),p=pick(P);const sh=[45,90,180].map(A=>({a:p.i+A-win(A),b:p.i+A+win(A),label:A+''}));
  const turns=pivots(k,10).filter(x=>x.i>p.i&&x.i<p.i+195);chart(el,{k,i0:p.i-20,i1:p.i+195,vlines:[{i:p.i,label:p.t+' '+d.d[p.i]}],shades:sh,points:turns.map(x=>({i:x.i,y:x.p,c:x.t==='top'?'#d64545':'#2a9d50'}))});
  return`${d.name}: counts from the ${p.t} of ${fmt(d.d[p.i])}. Shaded = 45/90/180 windows; dots = ±10-bar swing tops (red) and bottoms (green). Did a swing land in a window?`}
 if(m.chart==='eighths'){const P=pivots(k,30);let a,b;for(let t=0;t<50;t++){a=pick(P);b=P.find(x=>x.i>a.i&&x.t!==a.t);if(b&&b.i<d.d.length-100)break}const lo=Math.min(a.p,b.p),hi=Math.max(a.p,b.p);
  chart(el,{k,i0:a.i-5,i1:Math.min(b.i+120,d.d.length-1),hlines:[0,12.5,25,37.5,50,62.5,75,87.5,100].map(x=>({y:lo+(hi-lo)*x/100,label:x+'%',color:x===87.5?'#d64545':'#999'})),points:[{i:a.i,y:a.p},{i:b.i,y:b.p}]});return`${d.name} range ${fmt(d.d[a.i])} → ${fmt(d.d[b.i])}. Watch how price reacts at the eighths after the range ends.`}
 if(m.chart==='validate'){charts.push(new Chart(el,{type:'bar',data:{labels:['Gold','Nikkei','Coffee','S&P'],datasets:[{label:'45 hit',data:[37,32,25,36]},{label:'45 random',data:[32,28,32,29]},{label:'90 hit',data:[44,42,51,34]},{label:'90 random',data:[43,39,43,39]},{label:'180 hit',data:[44,42,52,39]},{label:'180 random',data:[43,39,42,40]}]},options:{responsive:true,maintainAspectRatio:false}}));return'Homework backtest: algo hit rate vs random baseline (%).'}
 if(m.chart==='mtf'){const Y=R(2023,2025);const series=[10,20].map((c,j)=>{const y=Y-c,i0=d.d.findIndex(s=>s>=y+'-01-01'),i1=d.d.findLastIndex(s=>s<=y+'-12-31');const yr=d.d.slice(i0,i1+1).map((s,i)=>[s.slice(5),d.c[i0+i]]);return{y,yr}});
  const i0=d.d.findIndex(s=>s>=Y+'-01-01'),i1=d.d.findLastIndex(s=>s<=Y+'-12-31'),labels=d.d.slice(i0,i1+1).map(s=>s.slice(5));const norm=(arr)=>{const mn=Math.min(...arr),mx=Math.max(...arr);return arr.map(v=>100*(v-mn)/(mx-mn))};
  const mapTo=yr=>labels.map(l=>{const f=yr.find(x=>x[0]>=l);return f?f[1]:null});const ds=[{label:Y+' (actual)',data:norm(d.c.slice(i0,i1+1)),borderColor:'#14213d',pointRadius:0,borderWidth:2}].concat(series.map((s,j)=>({label:s.y+` (${[10,20][j]}y ago)`,data:norm(mapTo(s.yr).map(v=>v??NaN)),borderColor:['#fca311','#2a9d50'][j],pointRadius:0,borderWidth:1})));
  charts.push(new Chart(el,{type:'line',data:{labels,datasets:ds},options:{responsive:true,maintainAspectRatio:false,animation:false,scales:{x:{ticks:{maxTicksLimit:12}},y:{title:{display:true,text:'normalized 0–100'}}}}}));return`${d.name}: ${Y} vs the same calendar in ${Y-10} and ${Y-20} (each scaled 0–100). Where do turns line up within ~15 days?`}
 return''}
function moduleView(id,mode){const m=M.find(x=>x.id===id);if(!m)return dashboard();let h=`<div class="card"><h2>${m.title}</h2>${tabs(m,mode)}</div>`;
 if(mode==='learn'){S.lessons[id]=1;save();app.innerHTML=h+`<div class="card">${m.lesson}</div>${m.chart?`<div class="card"><div class="chartbox"><canvas id="lc"></canvas></div><p class="src" id="lcap"></p><button class="btn ghost" id="again">New example</button></div>`:''}<div class="card"><a class="btn" href="#/m/${id}/practice">Practice this →</a></div>`;
  if(m.chart){const go=()=>{killCharts();$('#lcap').textContent=lessonChart(m,$('#lc'))};go();$('#again').onclick=()=>{const c=$('#lc').parentNode;c.innerHTML='<canvas id="lc"></canvas>';go()}}}
 else if(mode==='practice'){let n=0,c=0;app.innerHTML=h+`<div class="card"><p class="src">Drills are generated from real ${MK.map(k=>D[k].name).join(', ')} daily data plus concept checks. Score: <span id="sc">0/0</span></p><div id="qb"></div><button class="btn alt" id="nx">Next drill</button></div>`;
  const next=()=>{killCharts();const it=Math.random()<.7?genFor(id):staticItem(m,R(0,m.quiz.length-1));const qb=$('#qb');delete qb.dataset.done;renderQ(qb,it,ok=>{n++;if(ok)c++;$('#sc').textContent=c+'/'+n;record(id,ok,it)})};$('#nx').onclick=next;next()}
 else runTest(h,[...shuffle(m.quiz.map((_,i)=>i)).slice(0,6).map(i=>staticItem(m,i)),...Array.from({length:4},()=>genFor(id))],id)}
function runTest(head,items,mod){let i=0,c=0;const wrong=[];app.innerHTML=head+`<div class="card"><p class="src">Question <span id="qi">1</span> of ${items.length}</p><div id="qb"></div><button class="btn alt" id="nx" disabled>Next</button></div>`;
 const show=()=>{killCharts();const qb=$('#qb');delete qb.dataset.done;$('#qi').textContent=i+1;$('#nx').disabled=true;renderQ(qb,items[i],ok=>{if(ok)c++;else wrong.push(items[i]);record(items[i].mod,ok,items[i]);$('#nx').disabled=false})};
 $('#nx').onclick=()=>{i++;if(i<items.length)return show();const score=Math.round(100*c/items.length);S.tests.push({mod,score,date:new Date().toISOString().slice(0,10)});save();killCharts();
  const by={};items.forEach(it=>{by[it.mod]=by[it.mod]||[0,0];by[it.mod][1]++});wrong.forEach(it=>by[it.mod][0]++);
  $('#qb').parentNode.innerHTML=`<h3>Score: ${score}% (${c}/${items.length})</h3><p>${score>=80?'Strong — move on.':'Below 80% — revisit the lesson and practice.'} ${wrong.length?wrong.length+' missed item(s) added to Review.':''}</p>
  <table><tr><th>Module</th><th>Missed</th></tr>${Object.entries(by).map(([k,v])=>`<tr><td>${M.find(m=>m.id===k).title}</td><td>${v[0]}/${v[1]}</td></tr>`).join('')}</table><p><a class="btn" href="#/">Dashboard</a> <a class="btn ghost" href="#/review">Review</a></p>`};show()}
function finalView(){const items=shuffle([...M.flatMap(m=>shuffle(m.quiz.map((_,i)=>i)).slice(0,3).map(i=>staticItem(m,i))),...M.flatMap(m=>[genFor(m.id),genFor(m.id)])]);
 runTest(`<div class="card"><h2>Final exam</h2><p>${items.length} questions across all modules, mixing concept items with drills on real data.</p></div>`,items,'final')}
function reviewView(){const due=S.review.filter(r=>r.due<=Date.now());if(!due.length){const nx=S.review.map(r=>r.due).sort()[0];app.innerHTML=`<div class="card"><h2>Review</h2><p>Nothing due. ${S.review.length?`${S.review.length} item(s) scheduled; next ${new Date(nx).toLocaleDateString()}.`:'Missed questions will appear here.'}</p>${S.review.length?'<button class="btn ghost" id="now">Review them now anyway</button>':''}</div>`;const b=$('#now');if(b)b.onclick=()=>{S.review.forEach(r=>r.due=0);save();reviewView()};return}
 let i=0;app.innerHTML=`<div class="card"><h2>Review (${due.length} due)</h2><p class="src">Get it right to push it out (1→3→7→14 days, then retired). Miss it and it resets to tomorrow.</p><div id="qb"></div><button class="btn alt" id="nx" disabled>Next</button></div>`;
 const show=()=>{killCharts();const r=due[i],it=Object.assign({},r.item,{_review:true,key:r.k});const qb=$('#qb');delete qb.dataset.done;$('#nx').disabled=true;renderQ(qb,it,ok=>{record(r.mod,ok,it);$('#nx').disabled=false})};
 $('#nx').onclick=()=>{i++;if(i<due.length)show();else reviewView()};show()}
// ---------- live windows ----------
function bizDays(from,to){const out=[];const d=new Date(from+'T12:00');d.setDate(d.getDate()+1);while(d<=new Date(to+'T12:00')){if(d.getDay()%6)out.push(d.toISOString().slice(0,10));d.setDate(d.getDate()+1)}return out}
function liveView(){const today=new Date().toISOString().slice(0,10);
 app.innerHTML=`<div class="card"><h2>Live forecast windows</h2><p class="src">From your homework pack (Part 4). Rule: only act when the window is open <b>and</b> price is at an eighth; stop beyond lost motion, 0.5% risk, SAR if it accelerates. Price data ends ${fmt(D.GSPC.d.at(-1))}.</p></div>`+
 window.QTS_LIVE.map((L,j)=>`<div class="card"><h3>${L.m}</h3><table>${L.w.map(w=>`<tr><td>${fmt(w[0]).replace(', 2026','')}–${fmt(w[1]).replace(', 2026','')}${w[0]<=today&&today<=w[1]?'<span class="tag open">OPEN NOW</span>':w[1]<today?'<span class="tag">closed</span>':''}</td><td>${w[2]}</td></tr>`).join('')}</table><div class="chartbox"><canvas id="lv${j}"></canvas></div></div>`).join('')+
 `<div class="card"><h3>Paper-trade log</h3><div class="formgrid"><label>Date<input id="f0" type="date" value="${today}"></label><label>Market<select id="f1">${window.QTS_LIVE.map(l=>`<option>${l.m}</option>`)}</select></label><label>Window<input id="f2" placeholder="2026-10-12 to 2026-10-21"></label><label>Expected turn / entry<input id="f3"></label><label>Actual outcome<input id="f4"></label><label>Hit/miss<select id="f5"><option></option><option>hit</option><option>miss</option></select></label></div><label>Notes<input id="f6"></label>
 <button class="btn alt" id="add">Add entry</button><button class="btn ghost" id="csv">Export CSV</button><span class="src" id="hr"></span><div class="overflow"><table id="lt"></table></div></div>`;
 window.QTS_LIVE.forEach((L,j)=>{const d=D[L.k],i1=d.d.length-1,i0=i1-120,fut=bizDays(d.d[i1],'2026-12-04');const all=d.d.concat(fut),idx=s=>all.findIndex(x=>x>=s);
  chart($('#lv'+j),{k:L.k,i0,i1,future:fut,shades:L.w.map(w=>({a:idx(w[0]),b:idx(w[1]),label:w[0].slice(5)+'→'+w[1].slice(5)})),vlines:[{i:Math.max(idx(today),0)||i1,label:'today',color:'#1f6feb'}]})});
 const draw=()=>{const h=S.log.filter(r=>r[5]);const hits=h.filter(r=>/hit/i.test(r[5])).length;$('#hr').textContent=h.length?` Graded: ${hits}/${h.length} hits (${Math.round(100*hits/h.length)}%)`:'';
  $('#lt').innerHTML='<tr><th>Date</th><th>Market</th><th>Window</th><th>Expected</th><th>Outcome</th><th>Hit/miss</th><th>Notes</th><th></th></tr>'+S.log.map((r,i)=>`<tr>${r.map((v,c)=>c===4?`<td><input data-i="${i}" data-c="4" value="${(v||'').replace(/"/g,'&quot;')}"></td>`:c===5?`<td><select data-i="${i}" data-c="5">${['','hit','miss'].map(o=>`<option ${o===v?'selected':''}>${o}</option>`)}</select></td>`:`<td>${v||''}</td>`).join('')}<td><button class="btn ghost" data-del="${i}">✕</button></td></tr>`).join('');
  $('#lt').querySelectorAll('[data-c]').forEach(e=>e.onchange=()=>{S.log[e.dataset.i][e.dataset.c]=e.value;save();draw()});$('#lt').querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>{if(confirm('Delete this row?')){S.log.splice(b.dataset.del,1);save();draw()}})};draw();
 $('#add').onclick=()=>{S.log.push([0,1,2,3,4,5,6].map(i=>$('#f'+i).value));save();draw()};
 $('#csv').onclick=()=>{const q=v=>/[",\n]/.test(v||'')?'"'+String(v).replace(/"/g,'""')+'"':(v||'');const t=['date,market,forecast window,expected turn,actual outcome,hit/miss,notes',...S.log.map(r=>r.map(q).join(','))].join('\n');
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([t],{type:'text/csv'}));a.download='paper_trade_log.csv';a.click()}}
// ---------- router ----------
function route(){killCharts();$('#nav').classList.remove('open');const p=location.hash.slice(2).split('/');window.scrollTo(0,0);
 if(p[0]==='m')moduleView(p[1],p[2]||'learn');else if(p[0]==='final')finalView();else if(p[0]==='review')reviewView();else if(p[0]==='live')liveView();else dashboard()}
$('#menuBtn').onclick=()=>$('#nav').classList.toggle('open');window.addEventListener('hashchange',route);route();
window.QTS_TEST={G,pivots,M}; // for headless checks
})();
