
const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 1080;//Máximo de pokemons que podemos ter
const limit = 20;//Quantidade de pokemons que aparece por vez
let offset = 0;


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
        <a href="pokemon.html" target="_blank">
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
        </a>
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

    
