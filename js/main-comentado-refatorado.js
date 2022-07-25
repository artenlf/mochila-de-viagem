////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// aula 3 - projeto refatorando o código para melhorar a lógica

const form = document.getElementById("novoItem");
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach( (elemento) => {
    criaElemento(elemento)
})

form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    const existe = itens.find(elemento => elemento.nome === nome.value)// toda vez que nosso formulario for enviado, nós pergutamos aos itens se eles já existem

    //inicio da refatoração --->
    // criar um objeto JavaScript com nome e quantidade

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if(existe) {
        itemAtual.id = existe.id

        atualizaElemento(itemAtual)

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual // atualiza os itens dentro do Array que é utilizado pelo localStorage. Encontra o ID único de elementos que já existem e altera os valores corretamente.
    } else {
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0 // utilizando um operador ternário para checar o tamanho do Array. Se estiver vazio, começa atribui o ID 0, se contiver elementos, incrementa o número do ID em 1.

        criaElemento(itemAtual)

        itens.push(itemAtual)
        
    }


    localStorage.setItem("itens", JSON.stringify(itens))
    // final da refatoração <---

    // após a refatoração, o cria Elemento ao invés de receber o nome e a quantidade, já recebe o itemAtual


    nome.value = ""
    quantidade.value = ""
})

function criaElemento(item) { // após a refatoração passa o parâmetro item

    const novoItem = document.createElement('li')
    novoItem.classList.add("item")
    const numeroItem = document.createElement('strong')

                        //passa a acessar o objeto item na posição quantidade
    numeroItem.innerHTML = item.quantidade

    numeroItem.dataset.id = item.id

    novoItem.appendChild(numeroItem)

                        //passa a acessar o objeto item na posição nome
    novoItem.innerHTML += item.nome

    novoItem.appendChild(botaoDeleta(item.id)) // colocando o botão para executar a função deleta item para cada novo item.

    lista.appendChild(novoItem)
}

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}


// criando uma função para tirar itens da mochila
function botaoDeleta(id)  { //se o id é um parametro da função deleta, ele precisa ser também da função botão
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "X"

    elementoBotao.addEventListener("click", function()   {
        deletaElemento(this.parentNode, id)// se o id existe na função deletaElemento, precisamos então enviar o id
    })                                

    return elementoBotao
}

// criando a função deletaElemento que será chamada pelo clique do botão no "X"
function deletaElemento(tag, id) { //o id entra junto com a tag
    tag.remove()
// vamos agora remover o item do Array para poder atualizar corretamente o localStorage
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1) // o splice precisa saber qual é o ID do elemento para poder deletar o elemento correto, para isso, precisa passar o id como parametro da função deletaElemento

    localStorage.setItem("itens", JSON.stringify(itens)) // atualiza o localStorage

    // o problema é que agora quando removemos um item, o tamanho do Array muda e nossa lógica é quebrada. Precisamos encontrar qual é o último elemento do Array e mudar a id dele para ser única. Vamos fazer isso na linha 36.
}