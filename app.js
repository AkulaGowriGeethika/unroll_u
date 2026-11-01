const state = { poses: [], category: "All", level: "All", query: "" };
const categories = ["All","Standing","Balance","Backbends","Seated & Floor","Restorative","Strength","Inversions"];
const $ = (id) => document.getElementById(id);
const grid = $("poseGrid");
const filters = $("categoryFilters");

async function init() {
  $("year").textContent = new Date().getFullYear();
  try {
    const response = await fetch("poses.json");
    if (!response.ok) throw new Error("Could not load pose library");
    state.poses = await response.json();
    renderFilters();
    renderPoses();
  } catch (error) {
    grid.innerHTML = '<p class="load-error">The pose library could not load. Please run this site using the local server instructions in README.txt.</p>';
    $("resultCount").textContent = "Library unavailable";
  }
}
function renderFilters() {
  filters.innerHTML = categories.map(c => `<button class="filter-chip ${c===state.category?"active":""}" data-category="${escapeHtml(c)}">${escapeHtml(c)}</button>`).join("");
  filters.querySelectorAll("button").forEach(btn => btn.addEventListener("click", () => {
    state.category = btn.dataset.category; renderFilters(); renderPoses();
  }));
}
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
}
function matches(p) {
  const q = state.query.toLowerCase();
  const haystack = [p.name,p.sanskrit,p.category,p.level,...p.focus,...p.benefits].join(" ").toLowerCase();
  return (state.category==="All" || p.category===state.category) &&
    (state.level==="All" || p.level===state.level) && (!q || haystack.includes(q));
}
function renderPoses() {
  const list = state.poses.filter(matches);
  $("resultCount").textContent = `${list.length} ${list.length===1?"pose":"poses"} to explore`;
  $("emptyState").hidden = list.length !== 0;
  grid.hidden = list.length === 0;
  grid.innerHTML = list.map((p,i) => `
    <article class="pose-card" tabindex="0" role="button" aria-label="View ${escapeHtml(p.name)} details" data-id="${escapeHtml(p.id)}">
      <div class="pose-card-visual"><img src="${escapeHtml(p.image)}" alt="Illustration of ${escapeHtml(p.name)}" loading="lazy"></div>
      <div class="pose-card-content">
        <div class="pose-card-top"><span class="pose-category">${escapeHtml(p.category)}</span><span class="level-pill">${escapeHtml(p.level)}</span></div>
        <h3>${escapeHtml(p.name)}</h3><p class="sanskrit">${escapeHtml(p.sanskrit)}</p>
        <div class="pose-card-footer"><span>◷ ${escapeHtml(p.duration)}</span><span>↗</span></div>
      </div>
    </article>`).join("");
  grid.querySelectorAll(".pose-card").forEach(card => {
    const open = () => showPose(card.dataset.id);
    card.addEventListener("click",open);
    card.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();open();}});
  });
}
function showPose(id) {
  const p = state.poses.find(item=>item.id===id); if(!p) return;
  $("modalCategory").textContent = p.category.toUpperCase()+" POSE";
  $("modalImage").src = p.image;
  $("modalImage").alt = "Illustration of "+p.name+" ("+p.sanskrit+")";
  $("modalTitle").textContent = p.name;
  $("modalSanskrit").textContent = p.sanskrit;
  $("modalLevel").textContent = p.level;
  $("modalDuration").textContent = p.duration;
  $("modalFocus").textContent = p.focus.join(" · ");
  $("modalSteps").innerHTML = p.steps.map(x=>`<li>${escapeHtml(x)}</li>`).join("");
  $("modalBenefits").innerHTML = p.benefits.map(x=>`<li>${escapeHtml(x)}</li>`).join("");
  $("modalCautions").innerHTML = p.cautions.map(x=>`<li>${escapeHtml(x)}</li>`).join("");
  $("videoLink").href = "https://www.youtube.com/results?search_query="+encodeURIComponent(p.video);
  $("poseModal").hidden = false; document.body.style.overflow="hidden"; $("modalClose").focus();
}
function closeModal(){ $("poseModal").hidden=true; document.body.style.overflow=""; }
$("searchInput").addEventListener("input",e=>{state.query=e.target.value;renderPoses();});
$("levelFilter").addEventListener("change",e=>{state.level=e.target.value;renderPoses();});
$("resetFilters").addEventListener("click",()=>{state.category="All";state.level="All";state.query="";$("searchInput").value="";$("levelFilter").value="All";renderFilters();renderPoses();});
$("modalClose").addEventListener("click",closeModal);
$("poseModal").addEventListener("click",e=>{if(e.target===$("poseModal"))closeModal();});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal();if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();$("searchInput").focus();}});
$("menuToggle").addEventListener("click",()=>{$("desktopNav").classList.toggle("open");});
document.querySelectorAll(".desktop-nav a").forEach(a=>a.addEventListener("click",()=>$("desktopNav").classList.remove("open")));
init();
