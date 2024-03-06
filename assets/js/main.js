
const pokemonList = document.getElementById('pokemonList');//Elemento pai (ol) de todos os elementos pokemon lista
const loadMoreButton = document.getElementById('loadMoreButton');//Botão de carregar mais pokemons
const pokemonSelected = document.getElementById('pokemon-selected');//Elemento pai da div de detalhes de pokemon
const idSelectContainer = document.getElementById('idSelect__container');//Div com um botão e input que determina qual pokemon que você deseja ver os detalhes
const idSelect = document.getElementById('idSelect');//Input de seleção do id do pokemon
const contentDetail = document.getElementById('contentDetail');//Elemento que só existe na shadow DOM na tela de detalhes do pokemon. Este campo mostra os detalhes do pokemon.
const about = document.getElementById('about');
const p = document.getElementById('title')

const maxRecords = 1080;//Máximo de pokemons que podemos ter
let limit = 20;//Quantidade de pokemons que aparece por vez
let offset = 0;
let id = 0;


//FUNÇÃO PARA CRIAR NOVOS POKEMONS
function loadPokemonItens(offset, limit){
    //pokeApi é um objeto do arquivo poke-api.js
    //O resultado do segundo then do método getPokemons() é a lista de pokemons, eu pego esse resultado e uso no próximo then
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {//Aparentemente posso pegar objetos de outros arquivos livremente e usar seus métodos
        

        /*O método map() tem o objetivo de executar uma função em cada item de um array em ordem e 
        constrói um novo array com base em cada retorno da função de cada index.

        O método join junta os elemtos da lista em uma string. 
        O parâmetro que ele recebe é o separador desses elementos. 
        Por padrão o separador dele é uma vírgula*/

        /*Pego o que já tinha na lista de pokemons e adiciono um novo elemento de lista da seguinte maneira:
        Mapeio cada index do array pokemons que contém os pokemons 
        e aplico a função de conversão para elemento html para cada um deles. 
        Essa conversão consiste no retorno de uma string que possui o formato html.
        Depois junto tudo com o método join()*/
        pokemonList.innerHTML += pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
        
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}         
                    </ol>
        
                    <img src="${pokemon.photo}" 
                    alt="${pokemon.name}">
                </div>
            </li>
        `).join('');
    })
}

//Chamo essa função para carregar os primeiros pokemons assim que o usuário entrar na página
loadPokemonItens(offset, limit);

//Quando o botão de carregar mais pokemons for clicado executo essa função
loadMoreButton.addEventListener('click', () => {
    offset += limit;

    const qtdRecordsWithNextPage = offset + limit;

    if (qtdRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
})

    

//Mostra os detalhes do pokemon selecionado
function showDetail(offset, limit){
    pokemonList.style.display = "none";
    loadMoreButton.style.display = "none";
    pokemonSelected.style.display = "grid";
    idSelectContainer.style.display = "none";
    p.style.cursor = "pointer";
    p.innerHTML = `<img src="./assets/imgs/arrow.png">`;
    document.querySelector('hr').style.display = "block";


    limit = 1;
    id = idSelect.value
    offset = id - 1;

    if(id >= 1 && id <= maxRecords) {
        pokeApi.getPokemons(offset, limit).then((pokemons = []) => {//Aparentemente posso pegar objetos de outros arquivos livremente e usar seus métodos
            pokeId = pokemons.map((myPoke) => myPoke.number)

            //pokemons.map((detail) => console.log(detail.number))

            pokemonSelected.innerHTML += pokemons.map((pokemon) => `
                <div class="pokemonDetail ${pokemon.type}">
                    <span class="nameDetail">${pokemon.name}</span>
                    <span class="numberDetail">#${pokemon.number}</span>
                
                    <div class="detailPokemon">
                        <ol class="typesDetail">
                            ${pokemon.types.map((type) => `<li class="typeDetail ${type}">${type}</li>`).join('')}         
                        </ol>
                
                        <img src="${pokemon.photo}" 
                        alt="${pokemon.name}">
                    </div>
                </div>

                <div id="btnEvents">
                    <span onclick="showAbout()" id="about">About</span>
                    <span onclick="showBaseStats()" id="stats">Base Stats</span>
                    <span onclick="showMoves()" id="moves">Moves</span>
                </div>
            `);
        })
    } else {
        pokemonSelected.innerHTML = `
            <div>
                <h1>Error 404</h1>
                <h3>Pokemon not found</h3>
                <img src="./assets/imgs/pokemon_sad.jpeg" alt="Pikachu triste">
            </div>
        `
        document.querySelector('hr').style.display = "none";
    }
}


function showAbout(){
    contentDetail.innerHTML = `
        <div class="attribute">
            <span class="spanHeight">Height</span>
            <span>Weight</span>
            <span>Abilities</span>
        </div>


        <div class="value">
            <span class="spanValue">Valor exemplo</span>
            <span class="spanValue">Valor exemplo</span>
            <span class="spanValue">Valor exemplo</span>
        </div>
    `
    document.querySelector('hr').style.margin = "0 74% 0 9%"
}


function showBaseStats(){
    contentDetail.innerHTML = `
        <div class="attribute">
            <span>HP</span>
            <span>Attack</span>
            <span>Defense</span>
            <span>Sp.Atk</span>
            <span>Sp.Def</span>
            <span>Speed</span>
            <span>Total</span>
        </div>


        <div class="value">
            <span class="attValue">00</span>
            <span class="attValue">00</span>
            <span class="attValue">00</span>
            <span class="attValue">00</span>
            <span class="attValue">00</span>
            <span class="attValue">00</span>
            <span class="attValue">00</span>
        </div>


        <div class="horizontalBar">
            <span>bar range</span>
            <span>bar range</span>
            <span>bar range</span>
            <span>bar range</span>
            <span>bar range</span>
            <span>bar range</span>
            <span>bar range</span>
        </div>
    `
    document.querySelector('hr').style.margin = "0 35%"
}


function showMoves(){

}






function back(){
    loadMoreButton.style.display = "grid";
    pokemonList.style.display = "grid";
    idSelectContainer.style.display = "inline";
    contentDetail.innerHTML = "";
    p.style.cursor = "default";
    pokemonSelected.innerHTML = "";
    p.innerHTML = "Pokedex";

    document.querySelector('hr').style.display = "none";
}

document.querySelector('hr').style.display = "none";