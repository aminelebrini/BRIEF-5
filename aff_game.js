const footer = document.getElementById('footer');
footer.style.display = 'flex';
footer.className = "bg-[#FFFFFF] w-full flex flex-row items-center justify-around p-5";
const Id = localStorage.getItem('gameid');
const Name = localStorage.getItem('gamename');
const Release = localStorage.getItem('gamereleased');
const Genre = localStorage.getItem('gamegenre');
const Rate = localStorage.getItem('gamerating');
const Description = localStorage.getItem('gamedescription');
const image = localStorage.getItem('gameimage');
const Icon = localStorage.getItem('gameicons');
const Bgadd = localStorage.getItem('gamebgadd');
const Website = localStorage.getItem('gamewebsite');
const Developer = localStorage.getItem('gamedeveloper');
const Publisher = localStorage.getItem('gamepublisher');
// const Requirement = localStorage.getItem('gamerequirement');
document.getElementById('gametitre').innerText = Name;
document.getElementById('titre').innerText = Name;
document.querySelector('.logoimg').src = image;
document.getElementById('slide1').style.backgroundImage = `url('${image}')`;
const Ico = document.createElement('i');
Ico.className = Icon;
const Swip = document.createElement('img');
Swip.src = Bgadd;
document.getElementById('icons').appendChild(Ico);
document.getElementById('explore').addEventListener('click', ()=>{
    window.location.href = Website;
})
let text = Description;
const maxLength = 200; 
if(text.length > maxLength){
    text = Description.slice(0, maxLength) + '...';
}
document.getElementById('introgame').innerText = text;
//document.getElementById('swipercard').appendChild(Bgadd);
const swiperCards = document.querySelectorAll('#swipercard');

swiperCards.forEach(card => {
  const img1 = document.createElement('img');
  img1.src = image;
  img1.className = 'md:w-[350px] h-[400px] rounded-md';

//   const img2 = document.createElement('img');
//   img2.src = Bgadd;
//   img2.className = 'md:w-[350px] h-auto rounded-md';

  card.appendChild(img1);
});

//GAME INFORMATIONS
const platformElem = document.getElementById('platform');
const developerElem = document.getElementById('developer');
const genreElem = document.getElementById('genre');
const publisherElem = document.getElementById('publisher');
const releaseDateElem = document.getElementById('releasedate');
platformElem.innerText = Icon;
developerElem.innerText = Developer;
genreElem.innerText = Genre;
publisherElem.innerText = Publisher;
releaseDateElem.innerText = Release;

const proprities = document.getElementById('prop');

// for(let i = 0; i < 9; i++)
// {
//     const carte1 = document.createElement('div');
//     carte1.textContent = Name;
//     proprities.appendChild(carte1);
// }

// const os = document.getElementById("os");
// const processor = document.getElementById("processor");
// const memory = document.getElementById("memory");
// const graphics = document.getElementById("graphics");
// const directx = document.getElementById("directx");
// const storage = document.getElementById("storage");
// const soundcard = document.getElementById("soundcard");
// const notes = document.getElementById("notes");


function setProfileAlphabet(username) {
    const profile = document.getElementById('profilealphabet');
    if (!username || username.trim() === "") {
      profile.textContent = "";
    } else {
        profile.textContent = username.trim()[0].toUpperCase();
    }
}


const commentInput = document.getElementById('addcomment');
const commentsContainer = document.querySelector('.comments');

document.querySelector('.addComments button').addEventListener('click', () => {
    const commentText = commentInput.value.trim();

    if (commentText === "") return;
    setProfileAlphabet(commentText);
    const newCom = document.createElement('div');
    newCom.className = "com flex flex-row items-center justify-start gap-3 p-2";

    const circle = document.createElement('div');
    circle.className = "bg-[#D9D9D9] w-[50px] h-[50px] flex items-center justify-center rounded-full font-bold text-[22px]";
    circle.textContent = document.getElementById('profilealphabet').textContent;

    const text = document.createElement('h1');
    text.className = "bg-white flex items-center w-[80%] h-[50px] rounded-[10px] px-3 text-[16px]";
    text.textContent = commentText;

    newCom.appendChild(circle);
    newCom.appendChild(text);
    commentsContainer.appendChild(newCom);
    commentInput.value = "";
});
