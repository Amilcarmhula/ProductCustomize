
const listItemsFrontM = document.getElementById('listTextItems')
const listImageItemsM = document.getElementById('listImageItems')






let x = ''
let y = ''

let w = ''
let h = ''
let itemSelecionadoM = ''
listItemsFrontM.addEventListener('change', function () {
    itemSelecionadoM = this.value
    // console.log(itemSelecionadoM)
    x = parseFloat(document.getElementById(itemSelecionadoM).getAttribute('x')); // posição inicial x
    y = parseFloat(document.getElementById(itemSelecionadoM).getAttribute('y')); // posição inicial y
})

listImageItemsM.addEventListener('change', function () {
    itemSelecionadoM = this.value
    // console.log('*',itemSelecionadoM)
    x = parseFloat(document.getElementById(itemSelecionadoM).getAttribute('x')); // posição inicial x
    y = parseFloat(document.getElementById(itemSelecionadoM).getAttribute('y')); // posição inicial y
    w = parseFloat(document.getElementById(itemSelecionadoM).getAttribute('width'))
    h = parseFloat(document.getElementById(itemSelecionadoM).getAttribute('height'))
})

const loadTags = () => {
    const svgCanvas = document.getElementById('svgCanvas')
    const maskGroup = svgCanvas.querySelectorAll('.parte')
    return maskGroup

}

/*
    Update Image Size
*/
const customRange = document.getElementById('customRange')
customRange.addEventListener('input', function() {
    // console.log(this.value)
    loadTags().forEach(element => {
        element.querySelectorAll('*').forEach(tag =>{
            if (tag.id == itemSelecionado) {
                tag.setAttribute('height', h*this.value);
                tag.setAttribute('width', w*this.value);
            }
        })
    })
})
/*
    Update Position Items
*/
const upDatePosition = (idItemSelecionado, xPosition, yPosition) => {
    let newElement = ''
    loadTags().forEach(element => {
        element.querySelectorAll('*').forEach(tag =>{
            if (tag.id ==idItemSelecionado && !idItemSelecionado.startsWith('CorDa')){
                tag.setAttribute('x', xPosition)
                tag.setAttribute('y', yPosition)
                // Para alterar a posicao dos elementos filhos se existirem
                newElement = document.getElementById(tag.id)
                newElement.querySelectorAll('*').forEach(elem => {
                    elem.setAttribute('x', xPosition)
            })
        }else{
            console.log('Nao pode ser reposicionado!')
        }
        })
    })
}

let step = 5; // passo de movimento

// Função para mover o rect para cima
function moveUp() {
    y -= step;
    upDatePosition(itemSelecionadoM, x, y)
}

// Função para mover o rect para baixo
function moveDown() {
    y += step;
    upDatePosition(itemSelecionadoM, x, y)
}

// Função para mover o rect para a esquerda
function moveLeft() {
    x -= step;
    upDatePosition(itemSelecionadoM, x, y)
}

// Função para mover o rect para a direita
function moveRight() {
    x += step;
    upDatePosition(itemSelecionadoM, x, y)
}

// Adiciona event listeners para os botões
document.getElementById('moveUp').addEventListener('mousedown', moveUp);
document.getElementById('moveDown').addEventListener('click', moveDown);
document.getElementById('moveLeft').addEventListener('click', moveLeft);
document.getElementById('moveRight').addEventListener('click', moveRight);


