//pozitionez toate imaginile albumelor in inaltime

const boxesImgsAlbume=document.querySelectorAll("[class*='imagine_albume']>img");
for (var i=0; i<boxesImgsAlbume.length; i++) {
  console.log(boxesImgsAlbume[i].style.left);
  boxesImgsAlbume[i].style.top=(0.5-boxesImgsAlbume[i].style.height/2)+"%";
}
