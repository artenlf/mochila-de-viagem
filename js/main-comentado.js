////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// começando a aula aqui. 

const form = document.getElementById("novoItem");
const lista = document.getElementById("lista")
// const itens = [] // variavel global que recebe um Array vazio que irá receber os objetos frutos do input de usuário após o submit. ver linha abaixo
const itens = JSON.parse(localStorage.getItem("itens")) || [] // a variável itens agora passa a buscar as informações armazenadas no local storage. Se as não houver informações (isto é, false), então ele irá criar um Array vazio. Além disso, precisamos usar o método JSON.parse para transformar as strings em objetos novamente, caso contrário nossa iteração para acessar itens não terá sucesso.

// aula 3 após feito o Array itens que vamos levar na mochila, agora precisamos preencher o Array com os itens armazenados no localStorage. Para isso, precisamos criar uma iteração para acessar cada item e escrevê-los no Array corretamente.

itens.forEach( (elemento) => {
    console.log(elemento.nome, elemento.quantidade)
})

form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const nome = evento.target.elements['nome'] //como o código é usado mais de uma vez, podemos criar uma variável para fazer uma refatoração simples. O código ficará bem mais limpo.
    const quantidade = evento.target.elements['quantidade'] // o mesmo caso da variável acima

    criaElemento(nome.value, quantidade.value) // cria o elemento após no evento gatilho do botão submit

    nome.value = "" // limpa o campo (placeholder) de nome após o submit
    quantidade.value = "" // limpa o campo (placeholder) de quantidade após o submit
})

function criaElemento(nome, quantidade) {
    // no HTML quando um novo item é criado a sintaxe é:
    // <li class="item"><strong>7</strong>Camisas</li>
    // vamos reproduzir o padrão de código para criar um novo item:

    const novoItem = document.createElement('li') //armazena a criação de uma tag li
    novoItem.classList.add("item") //chama a const acima e adiciona a classe "item"
    const numeroItem = document.createElement('strong') //armazena a tag strong 
    // agora vamos fazer o quantidade e o nome do item inputados pelo usuário serem amazenados na criação do elemento
    numeroItem.innerHTML = quantidade // [importante!] a tag strong recebe quantidade DENTRO(!) do HTML

    novoItem.appendChild(numeroItem) // [importante!] quando criamos um elemento dentro JS, não é possível adicionar esse elemento como se fosse um conteúdo simples de HTML. Por isso não utilizamos o innerHTML, mas sim o appendChild --> ACRESCENTA um elemento filho no elemento que será ACRESCENTADO na tag li
    novoItem.innerHTML += nome // agora que o HTML já recebeu nosso OBJETO, adicionamos o nome ao elemento novoItem

    // const lista = document.getElementById("lista") // vamos buscar a tag pai que vai receber o ACRESCIMO de li. Vamos fazer isso buscando pela ID e deixar as classes apenas para o CSS. Vamos passar essa variável para o global, pois ela será utilizada mais vezes.

    lista.appendChild(novoItem) // chamamos a variável global 'lista' para ACRESCENTARMOS o nosso objeto completo no HTML

    // vamos setar um localStorage abaixo

    // localStorage.setItem("nome", nome) // colocamos o setItem, passando a chave "nome" e o conteúdo nome
    // localStorage.setItem("quantidade", quantidade) // mesma coisa, passando a chave "quantidade" e o conteúdo quantidade

    // essa forma de localStorage acima só consegue armazenar 1 item por vez. Toda vez que tentarmos adicionar um item, o item anterior será sobrescrito.

    // criar um objeto JavaScript com nome e quantidade

    const itemAtual = {
        "nome": nome,
        "quantidade": quantidade
    }

    itens.push(itemAtual) // função para inserir o objeto gerado pelo itemAtual dentro do Array de itens

    localStorage.setItem("itens", JSON.stringify(itens)) // [importante!] passamos a chave "itens" e o conteúdo utilizamos o método JSON stringify para transformar o objeto do itemAtual insiderido dentro do Array itens em uma string. Importante lembrar que o localStorage só nos deixa armazenar strings. 
    
    //Agora falta criar uma variável global recebendo um Array para armazenarmos os inputs a fim de evitar que sejam sobrescritos pelo usuário a cada submit. (ver linha 7)

}