function iniciarApp(){crearGaleria(),scrollNav()}function scrollNav(){document.querySelectorAll(".navegacion_principal a").forEach(e=>{e.addEventListener("click",(function(e){e.preventDefault();const n=e.target.attributes.href.value;document.querySelector(n).scrollIntoView({behavior:"smooth"})}))})}function crearGaleria(){const e=document.querySelector(".galeria-imagenes");for(let n=1;n<=12;n++){const t=document.createElement("picture");t.innerHTML=`\n        <source srcset="build/img/thumb/${n}.avif" type="image/avif">\n        <source srcset="build/img/thumb/${n}.webp" type="image/webp">\n        <img loading="lazy" width="200" height="300" src="build/img/thumb/${n}.jpg" alt="imagen-galeria">\n        \n        `,t.onclick=function(){monstarImagen(n)},e.appendChild(t)}}function monstarImagen(e){const n=document.createElement("picture");n.innerHTML=`\n    <source srcset="build/img/grande/${e}.avif" type="image/avif">\n    <source srcset="build/img/grande/${e}.webp" type="image/webp">\n    <img loading="lazy" width="200" height="300" src="build/img/grande/${e}.jpg" alt="imagen-galeria">\n    \n    `;const t=document.createElement("div");t.appendChild(n),t.classList.add("overlay"),t.onclick=function(){document.querySelector("body").classList.remove("fijar-body"),t.remove()};const i=document.createElement("p");i.textContent="X",i.classList.add("btn-cerrar"),i.onclick=function(){document.querySelector("body").classList.remove("fijar-body"),t.remove()},t.appendChild(i);const a=document.querySelector("body");a.appendChild(t),a.classList.add("fijar-body")}document.addEventListener("DOMContentLoaded",(function(){iniciarApp()}));
//# sourceMappingURL=app.js.map
