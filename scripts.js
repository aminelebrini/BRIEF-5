let slideImages = [
    "https://drop-assets.ea.com/images/63e0S1gWvaFpYSAHyCu5Zo/5a0f2fec92b19ae8e8de9ac99e15e0d3/battlefield-6-all-out-warfare-16x9.jpg?im=AspectCrop=(16,9),xPosition=0.434375,yPosition=0.4962962962962963;Resize=(1280)&q=85",
    "https://www.callofduty.com/content/dam/atvi/callofduty/cod-touchui/legacy/modern-warfare/features/multiplayer/Harbinger.jpg",
    "https://drop-assets.ea.com/images/2KVQq4lSBcPUJct6DEjdic/c06c2dc0e4ffc9a213fd1e8d8a7c2e72/FC26_Rev_Stadium_Clubs_16x9.jpg?im=AspectCrop=(16,9),xPosition=0.5,yPosition=0.5;Resize=(1280)&q=85"
];

const slideDiv = document.getElementById('slide');
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

fetch('https://gamees-api.netlify.app/public/filteredGames.json')
  .then(response => {
    if (!response.ok) {
      throw new Error("Error fetching data");
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    displaydata(data);
  })
  .catch(err => {
    console.error("Error fetching data:", err);
  });

  const displaycarte = document.getElementById('displaycartes');
  display.innerHTML = '';
  function displaydata(data)
  {
    
    const carte = document.createElement('div');
    carte.id = 'carte';
    carte.className = "flex flex-wrap gap-4 justify-center";
    
    data.forEach(game=>{
        let iconClass = '';
        let platformName = 'Unknown';
        if (game.platforms && game.platforms.length > 0) {
            platformName = game.platforms[0].platform.name.toLowerCase();
            if(platformName.includes('windows'))
            {
              iconClass = 'fab fa-windows';
            }else if(platformName.includes('playstation'))
            {
              iconClass = 'fab fa-playstation';
            }else if(platformName.includes('xbox'))
            {
              iconClass = 'fab fa-xbox';
            }
            else if(platformName.includes('nintendo'))
            {
              iconClass = 'fas fa-gamepad';
            }
        }
        carte.innerHTML = `
         <div class="w-[300px] h-[800px} bg-[#676363] rounded-[10px]">
            <img src="${game.background_image}" class="rounded-[10px] rounded-b-[0px]"/>
            <div>
                <h1 class="text-white">${game.name}</h1>
               <h2 class="text-white"><i class="${iconClass} text-white text-[20px] p-2"></i></h2>
            </div>
         </div>
        `;
    })

        displaycarte.appendChild(carte);
  }