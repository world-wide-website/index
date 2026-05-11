window.fastTag = (tag, parent, className, id, text) => {
  const el = document.createElement(tag);
  if (parent) parent.appendChild(el);
  if (className) el.className = className;
  if (id) el.id = id;
  if (text) el.textContent = text;
  return el;
};

// ================= GLOBAL =================
let totalFiles = "0";
let totalSize = 0;
let serial = 1;
let filesData = [];

// 📦 FORMAT SIZE (AUTO CONVERT)
function formatBytes(bytes){
  if(bytes === 0) return "0 B";

  const k = 1024;
  const sizes = ["B","KB","MB","GB","TB","PB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = bytes / Math.pow(k, i);
  return value.toFixed(2) + " " + sizes[i];
}

// 📦 NORMALIZE INPUT SIZE → BYTES
function normalizeToBytes(size){
  if(!size) return 0;

  if(typeof size === "number") return size;

  const match = size.match(/([\d.]+)\s*(B|KB|MB|GB|TB|PB)?/i);
  if(!match) return 0;

  let value = parseFloat(match[1]);
  let unit = (match[2] || "MB").toUpperCase();
  const map = { B:1, KB:1024, MB:1024**2, GB:1024**3, TB:1024**4, PT:1024**5, };
  return value * (map[unit] || map["MB"]);
}

// 🌐 GET SIZE FROM SRC
async function getSizeFromSrc(src, fallbackBytes){
  try{
    const res = await fetch(src, { method:"HEAD" });
    const len = res.headers.get("content-length");
    if(len){ return parseInt(len);}
    }
    catch(e){console.log("Size fetch failed");}
    return fallbackBytes || 0;
}

// ⏱ FORMAT TIME (GLOBAL)
function formatMediaTime(sec){sec = Math.floor(sec || 0);
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  const pad = n => n.toString().padStart(2, "0");
  return h > 0
             // hh:mm:ss                   // mm:ss
    ?`${pad(h)}:${pad(m)}:${pad(s)}`:`${pad(m)}:${pad(s)}`;         
}       // ⏱ GET DURATION FROM MEDIA
function attachMediaTime(media, label){
    media.onloadedmetadata = ()=>{label.textContent = formatMediaTime(media.duration);};
}



// ================= HEADER =================
const Container = fastTag("header", document.body, "Container");

const header = fastTag("header", Container);
const dropZone = fastTag("div", Container, "drop-zone", null, "Drag & Drop Files Here");   // ================= DROP =================
const panel = fastTag("div", Container, "upload-panel");        // ================= PANEL =================
const table = fastTag("table", Container, "file-table");        // ================= TABLE =================
const grid = fastTag("div", Container, "grid"); grid.style.display = "none";  // ================= GRID =================

const uploadBtn = fastTag("button", header, "upload-btn", null, "Upload Files");
const exportBtn = fastTag("button", header, "export-btn", null, "Get Array");
const toggleBtn = fastTag("button", header, "toggle-btn", null, "Grid View");       // 🔥 TOGGLE BUTTON
const stats = fastTag("div", header, "stats", null, "Files: 0 | Size: 0 MB");
const fileInput = fastTag("input", header); fileInput.type = "file"; fileInput.multiple = true; fileInput.style.display = "none";
const currentFileText = fastTag("div", panel, "current-file");
const thead = fastTag("thead", table);
const headRow = fastTag("tr", thead);

["S.No","Preview","Length","Name","Type","Format","Size","Uploaded","Actions"].
forEach(h => fastTag("th", headRow, null, null, h));

const tbody = fastTag("tbody", table);

// ================= EVENTS =================
uploadBtn.onclick = () => fileInput.click();
fileInput.onchange = e => startUpload([...e.target.files]);

["dragover","drop"].forEach(ev=>{
  document.addEventListener(ev,e=>e.preventDefault());
});

dropZone.ondrop = e=>{
  startUpload([...e.dataTransfer.files]);
};

// ================= TOGGLE VIEW =================
let isGrid = false;
toggleBtn.onclick = () => { isGrid = !isGrid;
  if(isGrid){
    table.style.display = "none";
    grid.style.display = "grid";
    toggleBtn.textContent = "Table View";
    renderGrid();
  }else{
    table.style.display = "table";
    grid.style.display = "none";
    toggleBtn.textContent = "Grid View";
  }
};

// ================= EXPORT =================
exportBtn.onclick = () => {
  const unique = new Map();
  filesData.forEach(f => { if (!unique.has(f.src)) unique.set(f.src, f); });
  const text = [...unique.values()].map(i => JSON.stringify(i, null, 2)).join(",\n");
  navigator.clipboard.writeText(text);
  alert("✅ Copied");
};

// ================= GRID RENDER =================
function renderGrid(){
  grid.innerHTML = "";
  const unique = new Map();
  filesData.forEach(f=>{if(!unique.has(f.src)) unique.set(f.src,f);});

  [...unique.values()].forEach(data=>{
    const card = fastTag("div", grid, "card");
    let media;

    if(data.type === "image"){
      media = fastTag("img", card);
      media.src = data.src;
    }
    else if(data.type === "video"){
      media = fastTag("video", card);
      
media.onloadedmetadata = ()=>{
  const duration = media.duration;
  timeLabel.textContent = formatTime(duration);
};
      media.src = data.src;
      media.muted = 0;
      media.loop = true;
      media.onmouseenter = ()=>media.play();
      media.onmouseleave = ()=>media.pause();
    }
    else if(data.type === "audio"){
      fastTag("div", card, "audio-icon", null, "🎵");
      media = fastTag("audio", card);
      media.src = data.src;
      media.controls = true;
    }

    fastTag("div", card, "title", null, data.name);
    fastTag("div", card, "info", null, `${data.format}.${formatBytes(data.bytes)}`);
  });
}

// ================= UPLOAD =================
function startUpload(files){
  if(!files.length) return;

  dropZone.style.display = "none";
  panel.style.display = "block";

  let i = 0;

  function next(){
    if(i >= files.length){
      currentFileText.textContent = "Completed";
      return;
    }

    let file = files[i];
    currentFileText.textContent = file.name;

    setTimeout(()=>{
      addToTable(file);
      i++;
      next();
    },300);
  }

  next();
}

// ================= ADD =================
function addToTable(file, custom=null){

  let data;

  if(custom){
  let type = "file";
    const src = custom.src;
    const fileName = src.split("/").pop();
    const format = fileName.split(".").pop().toLowerCase();
    const nameOnly = fileName.replace(/\.[^/.]+$/, "");

    if(["jpg","jpeg","png","webp"].includes(format)) type="image";
    else if(["mp4","webm","ogg"].includes(format)) type="video";
    else if(["mp3","wav","aac"].includes(format)) type="audio";

    data = {
      src,
      name: custom.name || nameOnly,
      length,
      type,
      format,
      uploaded: custom.uploaded || "",
      bytes: normalizeToBytes(custom.size),
      
    };

    filesData.push(data);
  }
  else{
    const url = URL.createObjectURL(file);

    data = {
      src: url,
      name: file.name.replace(/\.[^/.]+$/, ""),
      type: file.type.split("/")[0],
      format: file.name.split(".").pop(),
      bytes: file.size,
      uploaded: new Date().toLocaleString()
    };

    filesData.push(data);
  }

  const row = fastTag("tr", tbody);
  fastTag("td", row, null, null, serial++);

// 🔥 PREVIEW CELL
const previewTd = fastTag("td", row);
let media = null;
let playBtn = null;

  const Timer = fastTag("td", row, "timer");
  
function createThumbnail(data){
  const format = data.format.toLowerCase();

  // IMAGE
  if(data.type === "image"){
    const img = fastTag("img", previewTd, "thumb");
    img.src = data.src;
  }

  // VIDEO 🎥
 else if(data.type === "video"){
  const wrapper = fastTag("div", previewTd, "video-wrap");

  media = fastTag("video", wrapper, "thumb");
  media.src = data.src;
  media.loop = true;
  media.muted = true;

  let userUnmuted = false; // ⭐ track user action

  // 🔊 MUTE BUTTON
  const muteBtn = fastTag("span", wrapper, "mute-btn", null, "🔇");


  // 🔊 TOGGLE MUTE
  muteBtn.onclick = ()=>{
    media.muted = !media.muted;

    if(media.muted){
      userUnmuted = false;
      muteBtn.textContent = "🔇";
    } else {
      userUnmuted = true;
      muteBtn.textContent = "🔊";

      // ensure video is playing when unmuted
      media.play().catch(()=>{});
    }
  };

  // 🖱 HOVER → autoplay muted
  wrapper.onmouseenter = ()=>{
    if(media.paused){
      media.muted = true;
      userUnmuted = false;
      media.play().catch(()=>{});
      muteBtn.textContent = "🔇";
    }
  };

  // 🖱 LEAVE → only pause if still muted
  wrapper.onmouseleave = ()=>{
    if(!userUnmuted){
      media.pause();
      media.currentTime = 0;
      media.muted = true;
      muteBtn.textContent = "🔇";
    }
  };
  // ⏱ TIME LABEL
const timeLabel = fastTag("span", Timer, "video-time", null, "00:00");

// attach duration
attachMediaTime(media, timeLabel);
}

  // AUDIO 🎵
  else if(data.type === "audio"){
  const wrapper = fastTag("div", previewTd, "audio-wrap");

  fastTag("span", wrapper, "audio-icon", null, "🎵");

  media = new Audio(data.src);

  // ▶ PLAY BUTTON
  playBtn = fastTag("span", wrapper, "play-audio", null, "▶");

  playBtn.onclick = ()=>{
    if(media.paused){
      media.play();
      playBtn.textContent = "⏸";
    } else {
      media.pause();
      playBtn.textContent = "▶";
    }
  };

  // ⏱ TIME LABEL
  const timeLabel = fastTag("span", Timer, "audio-time", null, "00:00");

  // attach duration
  attachMediaTime(media, timeLabel);
}

  // OTHER TYPES
  else if(format === "pdf"){ fastTag("span", previewTd, "pdf-icon", null, "📄");}
  else if(["txt","md","csv","log"].includes(format)){ fastTag("span", previewTd, "text-icon", null, "📝");}
  else if(["doc","docx"].includes(format)){ fastTag("span", previewTd, "word-icon", null, "🗒️");}
  else if(["xls","xlsx"].includes(format)){ fastTag("span", previewTd, "excel-icon", null, "📊");}
  else{ fastTag("span", previewTd, "file-icon", null, "📁");}
}

  createThumbnail(data);

fastTag("td", row, null, null, data.name);
fastTag("td", row, null, null, data.type);
fastTag("td", row, null, null, data.format);

// ✅ ONLY ONE SIZE COLUMN
const sizeTd = fastTag("td", row, "size-cell", null, "Loading...");

// show initial size
sizeTd.textContent = formatBytes(data.bytes);

// update from src
totalFiles++;

// initial add (fallback)
totalSize += data.bytes;

stats.textContent =
  `Files: ${totalFiles} | Size: ${formatBytes(totalSize)}`;

// 🔄 update from src (REAL SIZE)
getSizeFromSrc(data.src, data.bytes).then(newBytes=>{
  // remove old size
  totalSize -= data.bytes;

  // update data
  data.bytes = newBytes;

  // add new size
  totalSize += newBytes;

  // update UI
  sizeTd.classList.add("updating");

  setTimeout(()=>{
    sizeTd.textContent = formatBytes(newBytes);
    sizeTd.classList.remove("updating");
  }, 300);

  // 🔥 update header again
  stats.textContent =
    `Files: ${totalFiles} | Size: ${formatBytes(totalSize)}`;
});

fastTag("td", row, null, null, data.uploaded);

  const actionTd = fastTag("td", row ,"action-btn");

  fastTag("button", actionTd, null, null, "Open").onclick =
    ()=> window.open(data.src);

  fastTag("button", actionTd, null, null, "Delete").onclick = ()=>{
    row.remove();
    filesData = filesData.filter(f=>f!==data);
  };
}
function loadFromArray(arr){
  arr.forEach(i=>addToTable(null,i));
}
loadFromArray([
  { src:"audio/Bandy.mp3", size:"", uploaded:"4 Apr 2026" },
  { src:"audio/Barso re.mp3", size:"", uploaded:"12 feb 2026" },
  { src:"audio/Mustafa Mustafa.mp3", size:"", uploaded:"4 Apr 2026" },
  { src:"audio/Jimikki Ponnu.mp3", size:"", uploaded:"4 Apr 2026" },
  { src:"audio/Jeans(Kannodu Kanbathellam).mp3", size:"", uploaded:"4 Apr 2026" },
]);
