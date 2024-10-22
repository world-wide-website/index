const Links = [
  { name: "Designer Ms", link: "https://designer.microsoft.com/" },
  { name: "Bing Copilot", link: "https://www.bing.com/chat?q=Microsoft%20Copilot&qs=ds&form=ATCVAJ" },
  { name: "free game", link: "https://filecr.com/en/" }, 
  { name: "online Games", link: "https://poki.com/" },
  { name: "You tube", link: "https://www.youtube.com/" },
  { name: "I Bomma", link: "https://edu.ibomma.games/telugu-movies/" },
  { name: "Explorer", link: "https://explorer.globe.engineer/" },
  { name: "CV", link: "https://www.goodcv.com/" },
  { name: "wynk", link: "https://wynk.in/music" },
  { name: "Tools", link: "https://123apps.com/#google_vignette" },
  { name: "Movie Rulz", link: "https://ww1.4movierulz.llc/category/telugu-featured/page/0" },
  { name: "SVG", link: "https://editor.method.ac/" },
  { name: "Screen Dimensions", link: "https://world-wide-website.github.io/test-site/" },
  { name: "vector veteezy", link: "https://veteezy.com/editor/random" },
  { name: "Free Convert", link: "https://www.freeconvert.com/webp-to-jpg/" },
  { name: "vector vectr", link: "https://vectr.com/codepen/welcome" },
  { name: "vector janvas", link: "https://janvas.com" },
  { name: "Unspash Images", link: "https://unsplash.com/" },
  { name: "pixabay Images", link: "https://pixabay.com/" },
  { name: "canva", link: "https://www.canva.com/" },
  { name: "open ai", link: "https://platform.openai.com/docs/overview" },
  { name: "Github", link: "https://github.com/" },
  { name: "QR Genetater", link: "https://www.qrcodechimp.com/" },
  { name: "W3", link: "https://www.w3schools.com/" },
  { name: "LogOut from all", link: "https://www.superlogout.com/" }, 
  { name: "help line", link: "https://www.contacthelp.com" }, 
  { name: "free game pc", link: "https://www.fitgirl.repack" }, 
  { name: "Help line ", link: "https://www.contacthelp.com" }, 
  { name: "COC layout", link: "https://clashofclans-layouts.com/" },
  { name: "Ai photo's", link: "https://app.leonardo.ai/" },
  { name: "AI img to vid 1", link: "https://app.runwayml.com/video-tools" },
  { name: "Ai img to vid 2", link: "https://krea.ai" },
  { name: "clear image", link: "https://replicate.com/megvii-research/nafnet" },
  { name: "Paid softwares", link: "https://smartserials.com/a1.php" },
  { name: "video editing", link: "runwaymi.com" }, 
  { name: "Free credit card generator", link: "https://www.akto.io/tools/credit-card-generator" }, 
  { name: "Hamster Kombat", link: "https://t.me/hAmster_kombat_bot/start?startapp=kentId1853826077" }, 
  { name: "Aagame chat", link: "https://www.aagame.info" }, 
  { name: "Re-Edit", link: "https://uizard.io/" },  
  { name: "Designer", link: "https://designer.microsoft.com/home" }, 
  { name: "Logs", link: "https://www.logoai.com/" }, 
  { name: "web text", link: "https://www.yourworldoftext.com/" }, 
  { name: "Logs", link: "https://www.corrupt-a-file.net" }, 
  { name: "image or text", link: "https://www.projectnaptha.com/" }, 
  { name: "Tools", link: "https://huggingface.co/" }, 
  { name: "Tools", link: "https://www.midjourney.com/explore?tab=top" }, 
  { name: "globfone", link: "https://globfone.com/" },
  { name: "webpushnotifications", link: "https://webpushnotifications.com/" },
  { name: "poptox", link: "https://poptox.com" },
  { name: "", link: "" },
 ];

const icons = "material-symbols-outlined";

const root = document.createElement('div');
 root.className = 'root';
 document.body.appendChild(root);
 
const header = document.createElement('header');
root.appendChild(header);
 
const head = document.createElement('div');
head.className = 'head';
header.appendChild(head);
 
 const log = document.createElement('div');
  log.className = 'log';
  head.appendChild(log);
 
  const logName = document.createElement('h4');
   logName.className = 'logname';
   logName.textContent = "WAY To World";
   log.appendChild(logName);
 
 const searchContainer = document.createElement('div');
  searchContainer.className = 'searchContainer';
  head.appendChild(searchContainer);
 
  const searchbox = document.createElement('div');
   searchbox.className = 'searchbox';
   searchContainer.appendChild(searchbox);
  
    const inputSearch = document.createElement('input');
     inputSearch.className = 'inputSearch';
     inputSearch.placeholder = "Search...";
     searchbox.appendChild(inputSearch);

    const search = document.createElement('span');
     search.className = 'search ' + icons;
     search.textContent = "search";
     searchbox.appendChild(search);

  const voiceBox = document.createElement('div');
    voiceBox.className = 'voiceBox';
    searchContainer.appendChild(voiceBox);

    const voiceSearch = document.createElement('span');
     voiceSearch.className = 'voiceSearch ' + icons;
     voiceSearch.textContent = "mic";
     voiceBox.appendChild(voiceSearch);
 
 const info = document.createElement('div');
  info.className = 'inof';
  head.appendChild(info);
 
  const cast = document.createElement('span');
   cast.className = 'cast ' + icons;
   cast.textContent = "cast";
   info.appendChild(cast);

  const notification = document.createElement('span');
   notification.className = 'notification ' + icons;
   notification.textContent = "notifications";
   info.appendChild(notification);

  const account = document.createElement('span');
   account.className = 'account ' + icons;
   account.textContent = "account_circle";
   info.appendChild(account);

 const linkBox = document.createElement("div");
 linkBox.className = "linkbox";
 header.appendChild(linkBox);
 
 const explore = document.createElement("a");
 explore.className = icons+" explore";
 explore.textContent = "explore";
 explore.href ="https://www.google.co.in/maps/";
 explore.style.textDecoration = "none";
 explore.style.color = "white";
 linkBox.appendChild(explore);
 
 
 const scrollbar = document.createElement("div");
 scrollbar.className = "scroll";
 linkBox.appendChild(scrollbar);
 
 for (let i = 0; i < Links.length; i++) {
  const TabName = Links[i].name;
  const TabLink = Links[i].link;
 
   if (TabName && TabLink) { 
    const linkTitle = document.createElement("a");
    const titleLink = document.createElement("button");
    linkTitle.className = "linktitle";
    titleLink.className = "titlelink";
    
    titleLink.textContent = TabName
    linkTitle.href = TabLink;
    
    scrollbar.appendChild(linkTitle);
    linkTitle.appendChild(titleLink);
   }
 }
 
 const more = document.createElement("div");
  more.className = icons+" more";
  more.textContent = "expand_more";
  linkBox.appendChild(more);
  
 more.addEventListener('click', function() {
  scrollbar.classList.toggle('expanded');
 });
