const Name = localStorage.getItem('gamename');
const Release = localStorage.getItem('gamereleased');
const Genre = localStorage.getItem('gamegenre');
const Rate = localStorage.getItem('gamerating');
const Description = localStorage.getItem('gamedescription');
const image = localStorage.getItem('gameimage');
const Icon = localStorage.getItem('gameicons');
const Bgadd = localStorage.getItem('gamebgadd');
const Website = localStorage.getItem('gamewebsite');
document.getElementById('titre').innerText = Name;
document.querySelector('.logoimg').src = image;
document.getElementById('slide1').style.backgroundImage = `url('${image}')`;
const Ico = document.createElement('i');
Ico.className = Icon;
const Swip = document.createElement('img');
Swip.src = Bgadd;
document.getElementById('icons').appendChild(Ico);
//document.getElementById('swipercard').appendChild(Bgadd);
document.getElementById('explore').addEventListener('click', ()=>{
    window.location.href = Website;
})

if(Description.length <= 100)
{
    document.getElementById('introgame').innerText = Description;
}
else{
     document.getElementById('introgame').innerText = Description.slice(0,513);
}
///probleme dans l'affichage swip