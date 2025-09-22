const FLOORS=[3,4,5]
const KEY=f=>`monitors-floor-${f}`
const $=sel=>document.querySelector(sel)
const chips=$('#chips')
const tabs=$('#tabs')
const countEl=$('#count')
const floorName=$('#floorName')
const totalAllEl=$('#totalAll')
const plusBtn=$('#plusBtn')
const minusBtn=$('#minusBtn')
const zeroBtn=$('#zeroBtn')
const resetBtn=$('#resetBtn')
const confirmReset=$('#confirmReset')
let currentFloor=FLOORS[0]
let state={}
function loadState(){
  FLOORS.forEach(f=>{
    const v=localStorage.getItem(KEY(f))
    state[f]=Number.isFinite(+v)?parseInt(v,10):0
  })
}
function saveFloor(f){
  localStorage.setItem(KEY(f),String(state[f]))
  renderChips()
  renderTotal()
}
function setFloor(f){
  currentFloor=f
  document.querySelectorAll('.tab').forEach(el=>el.classList.toggle('active',+el.dataset.f===f))
  floorName.textContent=`${f}º andar`
  updateCounter()
}
function updateCounter(){
  const v=state[currentFloor]||0
  countEl.textContent=v
  minusBtn.disabled=v<=0
}
function renderTabs(){
  tabs.innerHTML=''
  FLOORS.forEach(f=>{
    const b=document.createElement('button')
    b.className='tab'
    b.dataset.f=f
    b.textContent=`${f}º andar`
    b.addEventListener('click',()=>setFloor(f))
    tabs.appendChild(b)
  })
}
function renderChips(){
  chips.innerHTML=''
  FLOORS.forEach(f=>{
    const c=document.createElement('div')
    c.className='chip'
    c.textContent=`${f}º: ${state[f]||0}`
    chips.appendChild(c)
  })
}
function renderTotal(){
  const t=FLOORS.reduce((s,f)=>s+(state[f]||0),0)
  totalAllEl.textContent=t
}
function inc(n){
  state[currentFloor]=(state[currentFloor]||0)+n
  if(state[currentFloor]<0) state[currentFloor]=0
  saveFloor(currentFloor)
  updateCounter()
}
function zeroFloor(){
  if(confirmReset.checked){
    const ok=confirm(`Zerar o ${currentFloor}º andar?`)
    if(!ok) return
  }
  state[currentFloor]=0
  saveFloor(currentFloor)
  updateCounter()
}
function resetAll(){
  if(!confirm('Zerar TODOS os andares?'))return
  FLOORS.forEach(f=>{state[f]=0;saveFloor(f)})
  updateCounter()
}
plusBtn.addEventListener('click',()=>inc(1))
minusBtn.addEventListener('click',()=>inc(-1))
zeroBtn.addEventListener('click',zeroFloor)
resetBtn.addEventListener('click',resetAll)
loadState()
renderTabs()
renderChips()
renderTotal()
setFloor(currentFloor)
