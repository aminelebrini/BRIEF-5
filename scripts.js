let slideImages = [
    "https://drop-assets.ea.com/images/63e0S1gWvaFpYSAHyCu5Zo/5a0f2fec92b19ae8e8de9ac99e15e0d3/battlefield-6-all-out-warfare-16x9.jpg?im=AspectCrop=(16,9),xPosition=0.434375,yPosition=0.4962962962962963;Resize=(1280)&q=85",
    "https://www.callofduty.com/content/dam/atvi/callofduty/cod-touchui/legacy/modern-warfare/features/multiplayer/Harbinger.jpg",
    "https://drop-assets.ea.com/images/2KVQq4lSBcPUJct6DEjdic/c06c2dc0e4ffc9a213fd1e8d8a7c2e72/FC26_Rev_Stadium_Clubs_16x9.jpg?im=AspectCrop=(16,9),xPosition=0.5,yPosition=0.5;Resize=(1280)&q=85",
    "https://media-rockstargames-com.akamaized.net/tina-uploads/tina-modules/gta-v/6f3821f838206d283eb6d4daba97d40eee78aa51.jpg",
    "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/12/call-of-duty-advanced-warfare-riot-shield.jpg?w=1200&h=628&fit=crop",
    "https://www.konami.com/efootball/s/img/main_page_1.png?v=856"
  ];

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
    events();

    // --- Filtrae par genre ---
    document.getElementById('genre').addEventListener('change', (e) => {
      const gender = e.target.value;
      displaycarte.innerHTML = "";

      if (gender === 'All') {
        displaydata(allgame);
        return;
      }

      const filtred_Cartes = allgame.filter(game => {
        if (game.genres && game.genres.length > 0) {
          return game.genres.some(g => g.name.toLowerCase() === gender.toLowerCase());
        }
        return false;
      });

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

      displaydata(filtred_Cartes_platform);
    });

    // --- Filtre par note ---
    document.getElementById('Notes').addEventListener('change', (e) => {
      const note = e.target.value;
      displaycarte.innerHTML = "";

      if (note === 'All') {
        displaydata(allgame);
        return;
      }

      const filtred_Cartes_notes = allgame.filter(game => {
        if (game.ratings && game.ratings.length > 0) {
          return game.ratings.some(p => p.title.toLowerCase() === note.toLowerCase());
        }
        return false;
      });

      displaydata(filtred_Cartes_notes);
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
  carte.className = "flex flex-wrap gap-4 justify-center";

  for (let i = 0; i < data.length; i++) {
    let game = data[i];
    let iconClass = '';
    let platformName = 'Unknown';
    let genre = 'Unknown';

    if (game.genre) {
      genre = game.genre;
    } else if (game.genres && game.genres.length > 0) {
      genre = game.genres[0].name;
    }

    if (game.platforms && game.platforms.length > 0) {
      platformName = game.platforms[0].platform.name.toLowerCase();
      if (platformName.includes('pc')) iconClass = 'fa-brands fa-windows';
      else if (platformName.includes('playstation')) iconClass = 'fab fa-playstation';
      else if (platformName.includes('xbox')) iconClass = 'fab fa-xbox';
      else if (platformName.includes('nintendo')) iconClass = 'fab fa-nintendo';
      else if (platformName.includes('android')) iconClass = 'fab fa-android';
      else if (platformName.includes('ios')) iconClass = 'fab fa-apple';
    }

    const isFav = FavList.some(f => f.id === game.id);
    
    const heartClass = isFav ? 'fa-solid text-[#EBF70E]' : 'fa-regular text-white';

    carte.innerHTML += `
      <div class="w-[300px] bg-[#202020] rounded-[10px] mt-[5%]">
        <img src="${game.background_image}" class="rounded-[10px] rounded-b-[0px] w-[300px] h-[200px]"/>

        <div class="p-2 relative">
          <button type="button" 
            class="game-name text-white text-[22px] text-left font-bold cursor-pointer" 
            data-id="${game.id}" 
            data-name="${game.name}"
            data-released="${game.released}" 
            data-genre="${genre}" 
            data-rating="${game.rating}" 
            data-description="${game.description}" 
            data-image="${game.background_image}"
            data-icons="${iconClass}" 
            data-addBg="${game.background_image_additional}" 
            data-url="${game.website}"
            data-developer="${game.developers?.[0]?.name || ''}" 
            data-pub="${game.publishers?.[0]?.name || ''}">
            ${game.name}
          </button>

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
            data-developer="${game.developers?.[0]?.name || ''}" 
            data-pub="${game.publishers?.[0]?.name || ''}">
            <i id="iconFav" class="${heartClass} fa-heart"></i>
          </button>

          <h2 class="text-white font-bold">
            <i class="${iconClass} text-white text-[20px] p-2"></i>
          </h2>

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
    carte.className = "flex flex-wrap gap-4 justify-center";
    carte.id = "carte";

    for(let i = 0; i < next.length; i++)
    {
      let game = next[i];
      let genre = 'Unknown';
      let platform = 'Unknown';
      if (game.genres && game.genres.length > 0) {
      genre = game.genres[0].name;
      }
      // if(game.platforms && game.platforms.length > 0)
      // {
      //     platform = game.platforms[0].name.toLowerCase();
      //     if(platform.includes('pc'))
      //     {
      //       iconClass = 'fa-brands fa-windows';
      //     }else if(platform.includes('playstation'))
      //     {
      //       iconClass = 'fab fa-playstation';
      //     }else if(platform.includes('xbox'))
      //     {
      //       iconClass = 'fab fa-xbox';
      //     }
      //     else if(platform.includes('nintendo'))
      //     {
      //       iconClass = 'fas fa-nintendo';
      //     }
      //     else if(platform.includes('android'))
      //     {
      //       iconClass = 'fab fa-android';
      //     }
      //     else if(platform.includes('ios'))
      //     {
      //       iconClass = 'fab fa-iphone';
      //     }
      // }
      const isFav = FavList.some(f => f.id === game.id);
      const heartClass = isFav ? 'fa-solid text-[#EBF70E]' : 'fa-regular text-white';
      carte.innerHTML += `
         <div class="w-[300px] bg-[#202020] rounded-[10px] mt-[5%]">
  <img src="${game.background_image}" class="rounded-[10px] rounded-b-[0px] w-[300px] h-[200px]"/>

  <div class="p-2 relative">
    <button 
      type="button" 
      class="game-name text-white text-[22px] font-bold text-left cursor-pointer" 
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
      data-pub="${game.publishers[0].name}" 
      data-comments="${game.reviews_text}">
      ${game.name}
    </button>

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


