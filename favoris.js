const FavList = JSON.parse(localStorage.getItem('gamefav')) || [];
console.log(FavList);

const display = document.getElementById('container');
display.className = "p-2";
if (FavList.length === 0) {
  display.className = "p-2 h-[100vh] w-full flex flex-wrap items-center justify-center";
  const title = document.createElement('h1');
  title.textContent = "Empty favoris list!";
  title.className = "text-white text-center mt-10 text-[40px]";
  display.appendChild(title);
}
else{
    const carte = document.createElement('div');
    carte.className = "flex flex-wrap gap-4 justify-center";
    carte.id = "carte";
    FavList.forEach(game => {
    
    carte.innerHTML += `
        <div class="w-[300px] bg-[#202020] rounded-[10px] mt-[5%]">
            <img src="${game.image}" class="rounded-[10px] rounded-b-[0px] w-[300px] h-[200px]"/>
            <div class="p-2">
                <div class="p-2 relative">
                <button type="button" class="game-name text-white text-[22px] font-bold cursor-pointer">${game.name}</button>
                <button id="favorite-btn" class="favorite-btn text-[20px] text-white"></button>
                </div>
                <h2 class="text-white font-bold"><i class="text-white text-[20px] p-2"></i></h2>
                <h2 class="text-[#676363] uppercase font-bold flex flex-row justify-between">Release date: <span class="date text-white">${game.released}</span></h2>
                <h2 class="text-[#676363] uppercase font-bold flex flex-row justify-between">Genres: <span class="date text-white">${game.genre}</span></h2>
                <h2 class="text-[#676363] uppercase font-bold flex flex-row justify-between">Rating: <span class="date text-white">${game.rating}</span></h2>
            </div>
         </div>
    `;
    display.appendChild(carte);
});
}

const footer = document.getElementById('footer');
footer.style.display = 'flex';
footer.className = "bg-[#FFFFFF] w-full flex flex-row items-center justify-around p-5";
