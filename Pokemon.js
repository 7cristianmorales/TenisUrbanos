const btn = document.getElementById("generate-btn");
const card = document.getElementById("pokemon-card");
const maxPokemon = 1010;

btn.addEventListener("click", async () => {
  const randomId = Math.floor(Math.random() * maxPokemon) + 1;
  const url = `https://pokeapi.co/api/v2/pokemon/${randomId}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    const id = data.id;
    const name = data.name.toUpperCase();
    const img = data.sprites.front_default;
    const type = data.types.map(t => t.type.name).join(", ");
    
    const hp = data.stats.find(s => s.stat.name === "hp").base_stat;
    const attack = data.stats.find(s => s.stat.name === "attack").base_stat;
    const defense = data.stats.find(s => s.stat.name === "defense").base_stat;
    const spAttack = data.stats.find(s => s.stat.name === "special-attack").base_stat;
    const spDefense = data.stats.find(s => s.stat.name === "special-defense").base_stat;
    const speed = data.stats.find(s => s.stat.name === "speed").base_stat;

    card.innerHTML = `
      <h2>${name}</h2>
      <p>#${id}</p>
      <img src="${img}" alt="${name}">
      <p><strong>Tipo:</strong> ${type}</p>
      <p><strong>HP:</strong> ${hp}</p>
      <p><strong>Ataque:</strong> ${attack}</p>
      <p><strong>Defensa:</strong> ${defense}</p>
      <p><strong>Ataque Especial:</strong> ${spAttack}</p>
      <p><strong>Defensa Especial:</strong> ${spDefense}</p>
      <p><strong>Velocidad:</strong> ${speed}</p>
    `;
    card.classList.remove("hidden");
  } catch (error) {
    card.innerHTML = `<p>Error al obtener el Pokémon</p>`;
    card.classList.remove("hidden");
    console.error(error);
  }
});
