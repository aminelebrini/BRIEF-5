let slideImages = [
    "https://drop-assets.ea.com/images/63e0S1gWvaFpYSAHyCu5Zo/5a0f2fec92b19ae8e8de9ac99e15e0d3/battlefield-6-all-out-warfare-16x9.jpg?im=AspectCrop=(16,9),xPosition=0.434375,yPosition=0.4962962962962963;Resize=(1280)&q=85",
    "https://www.callofduty.com/content/dam/atvi/callofduty/cod-touchui/legacy/modern-warfare/features/multiplayer/Harbinger.jpg",
    "https://drop-assets.ea.com/images/2KVQq4lSBcPUJct6DEjdic/c06c2dc0e4ffc9a213fd1e8d8a7c2e72/FC26_Rev_Stadium_Clubs_16x9.jpg?im=AspectCrop=(16,9),xPosition=0.5,yPosition=0.5;Resize=(1280)&q=85",
    "https://media-rockstargames-com.akamaized.net/tina-uploads/tina-modules/gta-v/6f3821f838206d283eb6d4daba97d40eee78aa51.jpg",
    "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/12/call-of-duty-advanced-warfare-riot-shield.jpg?w=1200&h=628&fit=crop",
    "https://www.konami.com/efootball/s/img/main_page_1.png?v=856"
  ];

const slideDiv = document.getElementById('slide');
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
  //fonction de l'affichage
  // displaycarte.innerHTML = '';
  //   let twelve = 12;
  //   let n = 0;
  //   document.getElementById('btnmore').addEventListener('click', ()=>{

  //     n += 12;
  //     displaydata(data);
  //   })
  function displaydata(data)
  {
    
    const carte = document.createElement('div');
    carte.id = 'carte';
    carte.className = "flex flex-wrap gap-4 justify-center";
    for(let i = 0 ; i < data.length; i++)
    {
        //console.log(data.length);
        let game = data[i];
        let iconClass = '';
        let platformName = 'Unknown';
        let genre = 'Unknown';
        if (game.genre !== undefined && game.genre !== null) {
              genre = game.genre;
          } 
          else if (game.genres !== undefined && game.genres.length > 0) {
              genre = game.genres[0].name;
          }
        if (game.platforms && game.platforms.length > 0) {
            platformName = game.platforms[0].platform.name.toLowerCase();
            if(platformName.includes('pc'))
            {
              iconClass = 'fa-brands fa-windows';
            }else if(platformName.includes('playstation'))
            {
              iconClass = 'fab fa-playstation';
            }else if(platformName.includes('xbox'))
            {
              iconClass = 'fab fa-xbox';
            }
            else if(platformName.includes('nintendo'))
            {
              iconClass = 'fas fa-nintendo';
            }
            else if(platformName.includes('android'))
            {
              iconClass = 'fab fa-android';
            }
            else if(platformName.includes('ios'))
            {
              iconClass = 'fab fa-iphone';
            }
        }
        carte.innerHTML += `
         <div class="w-[300px] bg-[#202020] rounded-[10px] mt-[5%]">
            <img src="${game.background_image}" class="rounded-[10px] rounded-b-[0px] w-[300px] h-[200px]"/>
            <div class="p-2">
                <h1 class="text-white text-[22px] font-bold">${game.name}</h1>
                <h2 class="text-white font-bold"><i class="${iconClass} text-white text-[20px] p-2"></i></h2>
                <h2 class="text-[#676363] uppercase font-bold flex flex-row justify-between">Release date: <span class="date text-white">${game.released}</span></h2>
                <h2 class="text-[#676363] uppercase font-bold flex flex-row justify-between">Genres: <span class="date text-white">${genre}</span></h2>
                <h2 class="text-[#676363] uppercase font-bold flex flex-row justify-between">Rating: <span class="date text-white">${game.rating}</span></h2>
            </div>
         </div>
        `;
    }

        displaycarte.appendChild(carte);
  }

function nextDataRes(next)
{
    displaycarte.innerHTML = "";
    const carte = document.createElement('div');
    carte.className = "flex flex-wrap gap-4 justify-center";
    carte.id = "carte";

    for(let i = 0; i < next.length; i++)
    {
      let game = next[i];
      let genre = 'Unknown';
      if (game.genres && game.genres.length > 0) {
      genre = game.genres[0].name;
      }

      const iconClass = "fa-solid fa-gamepad";
      carte.innerHTML += `
         <div class="w-[300px] bg-[#202020] rounded-[10px] mt-[5%]">
            <img src="${game.background_image}" class="rounded-[10px] rounded-b-[0px] w-[300px] h-[200px]"/>
            <div class="p-2">
                <h1 class="text-white text-[22px] font-bold">${game.name}</h1>
                <h2 class="text-white font-bold"><i class="${iconClass} text-white text-[20px] p-2"></i></h2>
                <h2 class="text-[#676363] uppercase font-bold flex flex-row justify-between">Release date: <span class="date text-white">${game.released}</span></h2>
                <h2 class="text-[#676363] uppercase font-bold flex flex-row justify-between">Genres: <span class="date text-white">${genre}</span></h2>
                <h2 class="text-[#676363] uppercase font-bold flex flex-row justify-between">Rating: <span class="date text-white">${game.rating}</span></h2>
            </div>
         </div>
        `;
       
    }
   displaycarte.appendChild(carte);
}

document.getElementById('btnext').addEventListener('click', async ()=>{
  try{
    const response = await fetch('https://debuggers-games-api.duckdns.org/api/games?page=2');
    if(!response.ok)
    {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    console.log("le resultat suivant" + data.results);
    const allgame2 = data.results;
    nextDataRes(allgame2);
  }catch(error)
  {
    console.error('Erreur lors du chargement de la page suivante :', error);
  }
})
