let slideImages = [
    "https://drop-assets.ea.com/images/63e0S1gWvaFpYSAHyCu5Zo/5a0f2fec92b19ae8e8de9ac99e15e0d3/battlefield-6-all-out-warfare-16x9.jpg?im=AspectCrop=(16,9),xPosition=0.434375,yPosition=0.4962962962962963;Resize=(1280)&q=85",
    "https://www.callofduty.com/content/dam/atvi/callofduty/cod-touchui/legacy/modern-warfare/features/multiplayer/Harbinger.jpg",
    "https://drop-assets.ea.com/images/2KVQq4lSBcPUJct6DEjdic/c06c2dc0e4ffc9a213fd1e8d8a7c2e72/FC26_Rev_Stadium_Clubs_16x9.jpg?im=AspectCrop=(16,9),xPosition=0.5,yPosition=0.5;Resize=(1280)&q=85",
    "https://media-rockstargames-com.akamaized.net/tina-uploads/tina-modules/gta-v/6f3821f838206d283eb6d4daba97d40eee78aa51.jpg",
    "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/12/call-of-duty-advanced-warfare-riot-shield.jpg?w=1200&h=628&fit=crop",
    "https://www.konami.com/efootball/s/img/main_page_1.png?v=856"
  ];

let NotestoN = ["exceptional", "recommended", "meh", "skip"];

let FavList = [];
const slideDiv = document.getElementById('slide1');
console.log(slideDiv);

const displaycarte = document.getElementById('displaycartes');
let i = 0;

function slidechange() {
    slideDiv.style.backgroundImage = `url("${slideImages[i]}")`;
    i++;
    if(i >= slideImages.length) {
        i = 0;
    }
}
slidechange();
setInterval(slidechange, 2500);

async function fetchGames() {
  try {
    const response = await fetch('https://debuggers-games-api.duckdns.org/api/games');
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

    const data = await response.json();
    console.log('Résultats des jeux :', data.results);
    console.log('Page suivante :', data.next);

    const allgame = data.results;
    displaydata(allgame);
    //events();

    // --- Filtrae par genre ---
    document.getElementById('genre').addEventListener('change', (e) => {
      const genre = e.target.value;
      displaycarte.innerHTML = "";

      if (genre === 'All') {
        displaydata(allgame);
        return;
      }

      const filtred_Cartes = allgame.filter(game => {
        if (game.genres && game.genres.length > 0) {
          return game.genres.some(g => g.name.toLowerCase() === genre.toLowerCase());
        }
        return false;
      });
      console.log(filtred_Cartes);
      displaydata(filtred_Cartes);
    });

    // --- Filtre par plateforme ---
    document.getElementById('platformes').addEventListener('change', (e) => {
      const platform = e.target.value.toLowerCase();
      displaycarte.innerHTML = "";

      if (platform === 'All') {
        displaydata(allgame);
        return;
      }

      const filtred_Cartes_platform = allgame.filter(game => {
        if (game.platforms && game.platforms.length > 0) {
          return game.platforms.some(p => p.platform.name.toLowerCase().includes(platform));
        }
        return false;
      });
      console.log(filtred_Cartes_platform);
      displaydata(filtred_Cartes_platform);
    });

    // --- Filtre par note ---
    document.getElementById('Notes').addEventListener('change', (e) => {
    const note = e.target.value;
    displaycarte.innerHTML = "";

    if (note === 'all') {
    displaydata(allgame);
    return;
    } else {

    const filtred_Cartes_notes = allgame.filter(game => {

    if (!game.ratings || game.ratings.length === 0) {
      return false;
    }
    const maxRating = game.ratings.reduce((max, r) =>{
        if(r.count > max)
        {
          return r;
        }else{
          return max;
        }
      }
    );
      return maxRating.title.toLowerCase() === note.toLowerCase();
  });

  console.log(filtred_Cartes_notes);
  displaydata(filtred_Cartes_notes);
}

  });

  } catch (error) {
    console.error('Erreur lors de la récupération des jeux :', error);
  }
}
fetchGames();


  function clickTodisplay()
  {
    const section = document.getElementById('section');
    const footer = document.getElementById('footer');
    section.style.display = 'block';
    footer.style.display = 'flex';
    footer.className = "bg-[#FFFFFF] w-full flex flex-row items-center justify-around p-5";
    window.location.href = '#section';
  }


function displaydata(data) {
  displaycarte.innerHTML = '';

  if (data.length === 0) {
    const loading = document.createElement('h1');
    loading.textContent = "Loading";
    displaycarte.appendChild(loading);
    return;
  }

  let FavList = JSON.parse(localStorage.getItem('gamefav')) || [];

  const carte = document.createElement('div');
  carte.id = 'carte';
  carte.className = "carte flex flex-wrap gap-4 justify-center";

  for (let i = 0; i < data.length; i++) {
    let game = data[i];
    let genre = 'Unknown';
    if (game.genre) genre = game.genre;
    else if (game.genres?.length > 0) genre = game.genres[0].name;

    let iconClass = "";

    if (game.platforms && game.platforms.length > 0) {
    let icons = [];
    game.platforms.forEach(p => {
      const platformName = p.platform.name.toLowerCase();

    if (platformName.includes('pc')) icons.push('<i class="fa-brands fa-windows text-white"></i>');
    else if (platformName.includes('playstation3') || platformName.includes('playstation4') || platformName.includes('playstation5')) 
      icons.push('<i class="fab fa-playstation text-white"></i>');
    else if (['xbox', 'xboxone', 'xbox360'].some(name => platformName.includes(name))) {
      if (!icons.some(i => i.includes('fa-xbox'))) {
          icons.push('<i class="fab fa-xbox text-white"></i>');
        }
      }
    else if (platformName.includes('nintendo')) icons.push('<i class="fas fa-gamepad text-white"></i>');
    else if (platformName.includes('android')) icons.push('<i class="fab fa-android text-white"></i>');
    else if (platformName.includes('ios')) icons.push('<i class="fab fa-apple text-white"></i>');
    else if (platformName.includes('linux')) icons.push('<i class="fab fa-linux text-white"></i>');
  });
    if (icons.length > 0) {
      iconClass = icons.join(' ');
    } else {
      iconClass = icons.join('');
    }

}

    const isFav = FavList.some(f => f.id === game.id);
    const heartClass = isFav ? 'fa-solid text-[#EBF70E]' : 'fa-regular text-white';
    carte.innerHTML += `
      <div class="w-[300px] bg-[#202020] rounded-[10px] mt-[5%]">
        <img src="${game.background_image}" class="rounded-[10px] rounded-b-[0px] w-[300px] h-[200px]"/>

        <div class="p-2 relative">
          <button 
            type="button" 
            class="game-name text-white text-[22px] text-left font-bold cursor-pointer" 
            data-id="${game.id}" 
            data-name="${game.name}"
            data-released="${game.released}" 
            data-genre="${genre}" 
            data-rating="${game.rating}" 
            data-description="${game.description}" 
            data-image="${game.background_image}"
            data-addBg="${game.background_image_additional}" 
            data-url="${game.website}"
            data-developer="${game.developers[0].name || ''}" 
            data-pub="${game.publishers[0].name || ''}">
            ${game.name}
          </button>

          <button 
            id="favorite-btn" 
            class="favorite-btn text-[20px] text-white" 
            data-id="${game.id}"
            data-name="${game.name}" 
            data-released="${game.released}" 
            data-genre="${genre}" 
            data-rating="${game.rating}" 
            data-description="${game.description}" 
            data-image="${game.background_image}" 
            data-addBg="${game.background_image_additional}" 
            data-url="${game.website}"
            data-developer="${game.developers[0].name || ''}" 
            data-pub="${game.publishers[0].name || ''}">
            <i id="iconFav" class="${heartClass} fa-heart"></i>
          </button>
          <div class="flex gap-2 mb-2">
            ${iconClass}
          </div>
          <h2 class="text-[#676363] uppercase font-bold flex flex-row justify-between">
            Release date: <span class="date text-white">${game.released}</span>
          </h2>

          <h2 class="text-[#676363] uppercase font-bold flex flex-row justify-between">
            Genres: <span class="date text-white">${genre}</span>
          </h2>

          <h2 class="text-[#676363] uppercase font-bold flex flex-row justify-between">
            Rating: <span class="date text-white">${game.rating}</span>
          </h2>

        </div>
      </div>
    `;
  }

  displaycarte.appendChild(carte);
  events();
}


let n = 1;
document.getElementById('btnext').addEventListener('click', ()=>{
  window.location.href = "#section";
  n += 1;
  fetchNext(n);
})

document.getElementById('btnprevi').addEventListener('click', ()=>{
  window.location.href = "#section";
  n -= 1;
  if(n <= 0)
  {
    n = 1;
  }
  fetchNext(n);
})
//btn next and previous

async function fetchNext(n) {
   try{
    const response = await fetch(`https://debuggers-games-api.duckdns.org/api/games?page=${n}`);
    if(!response.ok)
    {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    
    console.log("le resultat suivant" + data.results);
    const allgame2 = data.results;
    //console.log(allgame2.length);
    nextDataRes(allgame2);
    events();
  }catch(error)
  {
    console.error('Erreur lors du chargement de la page suivante :', error);
  }
}
function nextDataRes(next)
{
    displaycarte.innerHTML = "";

    let FavList = JSON.parse(localStorage.getItem('gamefav')) || [];
    const carte = document.createElement('div');
    carte.className = "carte flex flex-wrap gap-4 justify-center";
    carte.id = "carte";

    for(let i = 0; i < next.length; i++)
    {
      let game = next[i];
      let genre = 'Unknown';
      let platform = 'Unknown';
      if (game.genres && game.genres.length > 0) {
      genre = game.genres[0].name;
      }
      let iconClass = "";
      if (game.platforms && game.platforms.length > 0) {
    let icons = [];
    game.platforms.forEach(p => {
      const platformName = p.platform.name.toLowerCase().trim();

    if (platformName.includes('pc')) icons.push('<i class="fa-brands fa-windows text-white"></i>');
    else if (platformName.includes('playstation3') || platformName.includes('playstation4') || platformName.includes('playstation5')) 
      icons.push('<i class="fab fa-playstation text-white"></i>');
    else if (['xbox', 'xboxone', 'xbox360'].some(name => platformName.includes(name))) {
      if (!icons.some(i => i.includes('fa-xbox'))) {
          icons.push('<i class="fab fa-xbox text-white"></i>');
        }
      }
    else if (['nintendo', 'nintendoswitch'].some(name => platformName.includes(name))){
      if(!icons.some(i=> i.includes('fa-nintendo'))){
          icons.push('<i class="fas fa-nintendo text-white"></i>');
      }
    }
    else if (platformName.includes('android')) icons.push('<i class="fab fa-android text-white"></i>');
    else if (platformName.includes('ios')) icons.push('<i class="fab fa-apple text-white"></i>');
    else if (platformName.includes('linux')) icons.push('<i class="fab fa-linux text-white"></i>');
  });
    if (icons.length > 0) {
      iconClass = icons.join(' ');
    } else {
      iconClass = icons.join('');
    }

}
      const isFav = FavList.some(f => f.id === game.id);
      const heartClass = isFav ? 'fa-solid text-[#EBF70E]' : 'fa-regular text-white';
      carte.innerHTML += `
         <div class="w-[300px] bg-[#202020] rounded-[10px] mt-[5%]">
  <img src="${game.background_image}" class="rounded-[10px] rounded-b-[0px] w-[300px] h-[200px]"/>

  <div class="p-2 relative">
    <button id="favorite-btn" class="favorite-btn text-[20px] text-white" 
    data-id="${game.id}" 
      data-name="${game.name}" 
      data-released="${game.released}" 
      data-genre="${genre}" 
      data-rating="${game.rating}" 
      data-description="${game.description}" 
      data-image="${game.background_image}" 
      data-addBg="${game.background_image_additional}" 
      data-url="${game.website}"
      data-developer="${game.developers[0].name}" 
      data-pub="${game.publishers[0].name}" >
      ${game.name}
      <i id="iconFav" class="${heartClass} fa-heart"></i>
    </button>
    <div class="flex gap-2 mb-1">${iconClass}</div>
    <h2 class="text-[#676363] uppercase font-bold flex flex-row justify-between">
      Release date: <span class="date text-white">${game.released}</span>
    </h2>
    <h2 class="text-[#676363] uppercase font-bold flex flex-row justify-between">
      Genres: <span class="date text-white">${genre}</span>
    </h2>
    <h2 class="text-[#676363] uppercase font-bold flex flex-row justify-between">
      Rating: <span class="date text-white">${game.rating}</span>
    </h2>
  </div>
</div>
        `;
   displaycarte.appendChild(carte);
  }
  events();
}

function events(){
  const btns = carte.querySelectorAll('.game-name');
  btns.forEach(btn=>{
    btn.addEventListener('click', function() {
        let Id = this.dataset.id;
        let Name = this.dataset.name;
        let Released = this.dataset.released;
        let Genre = this.dataset.genre;
        let Rate = this.dataset.rating;
        let Description = this.dataset.description;
        let Image = this.dataset.image;
        let Icon = this.dataset.icons;
        let bgadd = this.dataset.addBg;
        let website = this.dataset.url;
        let Developer = this.dataset.developer;
        let Publisher = this.dataset.pub;
        let Comments = this.dataset.comments;
        //let Images;
        localStorage.setItem('gameid', Id);
        localStorage.setItem('gamename', Name);
        localStorage.setItem('gamereleased', Released);
        localStorage.setItem('gamegenre', Genre);
        localStorage.setItem('gamerating', Rate);
        localStorage.setItem('gamedescription', Description);
        localStorage.setItem('gameimage', Image);
        localStorage.setItem('gameicons', Icon);
        localStorage.setItem('gamebgadd', bgadd);
        localStorage.setItem('gamewebsite', website);
        localStorage.setItem('gamedeveloper', Developer);
        localStorage.setItem('gamepublisher', Publisher);
        localStorage.setItem('gamecomments', Comments);
        todisplay(Name, Released, Genre, Rate, Description, Comments, Id);
        window.location.href = "aff_game.html";
    });
  })
}

function todisplay(name, released, genre, rating, Description, Comments, id) {
  console.log("Nom :", name);
  console.log("Date de sortie :", released);
  console.log("Genre :", genre);
  console.log("Note :", rating);
  console.log("Description :", Description);
  console.log("Comments :", Comments);
  console.log("id :", id);

}
document.addEventListener('click', (e) => {
  const favBtn = e.target.closest('.favorite-btn'); 
  if (!favBtn) return;

  const icon = favBtn.querySelector('i');
  let FavList = JSON.parse(localStorage.getItem('gamefav')) || [];

  const dataset = favBtn.dataset;

  const gameData = {
    id: parseInt(dataset.id),
    name: dataset.name,
    released: dataset.released,
    genre: dataset.genre,
    rating: dataset.rating,
    description: dataset.description,
    image: dataset.image,
    icons: dataset.icons,
    addbg: dataset.addbg,
    url: dataset.url,
    developer: dataset.developer,
    publisher: dataset.pub,
  };

  const index = FavList.findIndex(game => game.id === gameData.id);

  if (index === -1) {
    FavList.push(gameData);
    icon.classList.add('fa-solid', 'text-[#EBF70E]');
    icon.classList.remove('fa-regular');
    console.log(`${gameData.name} est ajouté au favoris`);
  } else {
    FavList.splice(index, 1);
    icon.classList.remove('fa-solid', 'text-[#EBF70E]');
    icon.classList.add('fa-regular');
    console.log(`${gameData.name} est supprimé de favoris`);
  }

  localStorage.setItem('gamefav', JSON.stringify(FavList));
});


const searchInp = document.getElementById('search');
    searchInp.addEventListener('input', () => {
        const value = searchInp.value.trim().toLowerCase();
        const cards = document.querySelectorAll('.game-name');
        cards.forEach(card => {
            const name = card.querySelector('.game-name').textContent.toLowerCase().trim();
            if(name.includes(value))
            {
              card.style.display = "flex";
            }else{
              card.style.display = "none";
            }
        });
    });
let gamess = [];

const search = document.querySelector('#search');

search.addEventListener("input", () => {
    const value = search.value.trim().toLowerCase();

    let url = 'https://debuggers-games-api.duckdns.org/api/games?page=1';
    if (value !== "") {
        url = `https://debuggers-games-api.duckdns.org/api/games?search=${value}&page=1`;
    }

    fetch(url)
        .then(res => res.json())
        .then(data => {
            gamess = data.results;
            displaydata(gamess);
        })
        .catch(err => console.error("Erreur fetching games:", err));
});

