
/*
class Pokemon extends HTMLElement {
    constructor(){
        super();

        //Como shadow faz parte da minha função construtora, ele fará parte do molde da minha classe
        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(this.build());//Colocando o resultado da função build() como filho da minha sombra.
        shadow.appendChild(this.styles());
    }

    build(){
        const componentRoot = document.createElement("div");
        componentRoot.setAttribute("class", "container")
    }

    styles(){

    }
}

customElements.define("app-pokemon", Pokemon);*/

function loadPokemon(){
    
}