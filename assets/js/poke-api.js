
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;//Ao invés de escrever types nessa atribuição eu escrivi type e com isso quebrou o código todo ;-;
    pokemon.type = type;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    //Transformo em uma nova lista de promises do detalhe do pokemon e converto para json
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 6) => {//Criei um método para o objeto pokeApi
    //Tudo após o ponto de interrogação na url é o que chamamos de query string
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    /*
    INTERFACE DE UMA PROMISE
    A função fetch é uma requisição de alguma coisa. 
    A função then é uma resposta de quando a requisição dá certo. 
    Quando a requisição dá errada, usamos o catch para dar uma resposta.
    Se eu quiser fazer uma operação independente do sucesso ou fracasso, eu posso usar o finally
    */
    //Foi no servidor e buscou a lista de pokemons
    return fetch(url)//Devolve uma promise de response
        //Quando essa promise for resolvida, converte o body para json
        .then((response) => response.json())//O que vai para o primeiro then é o retorno (promise) do fetch.
        //Quando o body for convertido, pego o results do json, que é a lista de pokemons
        .then((jsonBody) => jsonBody.results)//O que vai para o segundo then é o retorno do primeiro
        /*Pego essa lista de pokemons convertida e transformo em uma nova lista de promises do detalhe do pokemon e converto para json*/
        .then((pokemons) => pokemons.map((pokeApi.getPokemonDetail)))
        /*O Promise.all guarda uma array de promise e espera todas essas promises terminar. 
        Depois de todas as requisições terminarem, executa o then*/
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}


