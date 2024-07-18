var items = ['item 1', 'item 2', 'item 3']
const itemList = document.getElementById('items')
var option =`<option value=''> Escolha um item </option>`
for(var i = 0; i<items.length; i++){
    option += `<option value='${items[i]}'> ${items[i]}</option>`
    // console.log(items[i])
}
itemList.innerHTML = option
/*const watchId = navigator.geolocation.watchPosition(
    (position) => {
        console.log('Latitude:', position.coords.latitude); 
        console.log('Longitude:', position.coords.longitude);
    },
    (error) => {
        console.error('Erro ao obter localização:', error);
    },
    {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    }
);
*/
// Para parar a observação

const svg = document.getElementById('T-shirt-svg');
const maskGroup = svg.querySelector('g[mask="url(#mask0_5_24)"]');

const canvas = new fabric.Canvas('canvas', {
    width: 533,
    height: 631,
})

canvas.renderAll()

//
// Inicializar o canvas do Fabric.js

// Função para calcular os pontos de uma estrela
function createStarPoints(centerX, centerY, points, outerRadius, innerRadius) {
    var results = [];
    var angle = Math.PI / points;
    
    for (var i = 0; i < 2 * points; i++) {
        var radius = i % 2 === 0 ? outerRadius : innerRadius;
        var currX = centerX + Math.cos(i * angle) * radius;
        var currY = centerY - Math.sin(i * angle) * radius;
        results.push({ x: currX, y: currY });
    }
    return results;
}

// Parâmetros da estrela
var centerX = 200;
var centerY = 200;
var points = 5;
var outerRadius = 100;
var innerRadius = 50;

// Criar os pontos da estrela
var starPoints = createStarPoints(centerX, centerY, points, outerRadius, innerRadius);

// Criar o polígono da estrela
var star = new fabric.Polygon(starPoints, {
    left: centerX - outerRadius,
    top: centerY - outerRadius,
    fill: 'yellow',
    stroke: 'black',
    strokeWidth: 2
});

// Adicionar a estrela ao canvas
//canvas.add(star);

//

fabric.Image.fromURL('images/canvasIMG/T-shirt-3.png', (img) => {
    console.log('w:', img.width)
    console.log('h:', img.height)
    canvas.setOverlayImage(img)
    canvas.renderAll()
})

//Add rectangle to the canvas and preview
const addRect = document.getElementById('addRect')
addRect.addEventListener('click', () => {
    var rect1 = new fabric.Rect({
        left: 100,    // Posição x do retângulo
        top: 100,     // Posição y do retângulo
        width: 100,   // Largura do retângulo
        height: 50,  // Altura do retângulo
        fill: 'red'   // Cor de preenchimento do retângulo

    });
    // Adicionar o retângulo ao canvas
    canvas.add(rect1);


    // console.log('w:',svgWidth,' h:',svgHeight)
    let newX = (rect1.left * (svg.getBBox().width / canvas.width)) / 1
    let newY = (rect1.top * (svg.getBBox().height / canvas.height)) / 1


    var rect2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect')

    rect2.setAttribute('id', 'rectID');
    rect2.setAttribute('x', newX - (newX * 0.925));//
    rect2.setAttribute('y', newY - (newY * 0.925));
    rect2.setAttribute('width', rect1.width * rect1.scaleX);
    rect2.setAttribute('height', rect1.height * rect1.scaleY);
    rect2.setAttribute('fill', rect1.fill);

    // Adicionar o retângulo ao SVG
    maskGroup.appendChild(rect2);


    rect1.on('modified', () => {
        rect2.setAttribute('x', (rect1.left * (svg.getBBox().width / canvas.width)) / 1 - 60);
        rect2.setAttribute('y', (rect1.top * (svg.getBBox().height / canvas.height)) / 1 - 60);
        console.log('x', rect1.left);
        console.log('y', rect1.top);
    })
    rect1.on('scaling', () => {
        rect2.setAttribute('width', rect1.width * rect1.scaleX);
        rect2.setAttribute('height', rect1.height * rect1.scaleY);
    })

})


//Add Text to teh canvas
const addText = document.getElementById('addText')
const textinput = document.getElementById('textInput')
addText.addEventListener('click', ()=> {
    var textCanvas = new fabric.Text(textinput.value, {
        left:100,
        top:100,
        width:100,
        height:100,
        fontFamily:'Comic Sans'
    })
    textinput.value=''

    canvas.add(textCanvas)

    let newX = (textCanvas.left * (svg.getBBox().width / canvas.width)) / 1
    let newY = (textCanvas.top * (svg.getBBox().height / canvas.height)) / 1

    console.log('x: ',newX, ' newY:', newY)

    var txtSvg = document.createElementNS('http://www.w3.org/2000/svg', 'text')
    txtSvg.setAttribute('id', 'textID')
    txtSvg.setAttribute('x',100)
    txtSvg.setAttribute('y', 100)
    txtSvg.setAttribute('width',100)
    txtSvg.setAttribute('height',100)
    txtSvg.setAttribute('font-family', 'Comic Sans');
    txtSvg.setAttribute('font-size', '24');
    txtSvg.setAttribute('font-weight', 'bold');
    txtSvg.setAttribute('font-style', 'italic');
    txtSvg.setAttribute('text-decoration', 'underline');
    txtSvg.setAttribute('text-anchor', 'middle');
    txtSvg.setAttribute('fill', 'black');
    txtSvg.setAttribute('stroke', 'red');
    txtSvg.setAttribute('stroke-width', '1');
    txtSvg.setAttribute('letter-spacing', '2');
    txtSvg.setAttribute('word-spacing', '4');
    txtSvg.setAttribute('dominant-baseline', 'middle');
    txtSvg.setAttribute('writing-mode', 'horizontal-tb');//vertical-rl
    txtSvg.setAttribute('writing-mode', 'vertical-rl');//vertical-rl
    txtSvg.setAttribute('glyph-orientation-vertical', '0');
    // txtSvg.setAttribute('transform', 'rotate(10, ' + newX + ', ' + newY + ')');
    txtSvg.setAttribute('opacity', '0.8');
    txtSvg.textContent = textCanvas.text

    maskGroup.appendChild(txtSvg)

    textCanvas.on('modified', () => {
        txtSvg.setAttribute('x',  (textCanvas.left * (svg.getBBox().width / canvas.width)) / 1 - 60)
        txtSvg.setAttribute('y', (textCanvas.top * (svg.getBBox().height / canvas.height)) / 1 - 60)
    })

    // Adicionar evento de rotação
    textCanvas.on('rotating', () => {
        let updatedX = (textCanvas.left * (svg.getBBox().width / canvas.width));
        let updatedY = (textCanvas.top * (svg.getBBox().height / canvas.height));
        txtSvg.setAttribute('x', updatedX);
        txtSvg.setAttribute('y', updatedY);
        txtSvg.setAttribute('transform', `rotate(${textCanvas.angle}, ${updatedX}, ${updatedY})`);
    });

/*Correcoes a ser feitas */
// Ajustar posicionamento no SVG
})

//const addPic = document.getElementById('addPic')
// addPic.addEventListener('click', ()=>{
//     fabric.Image.fromURL('images/minions.jpg', function(img) {
//         img.set({
//             scaleX: 0.3,
//             scaleY: 0.3,
//             left: 150,
//             top: 150
//         });
//         canvas.add(img);
//         canvas.renderAll()
//     });
// })

//Add Picture to the canvas
// document.getElementById('fileInput').addEventListener('change', function(event) {
//     var file = event.target.files[0];
//     if (file) {
//         var reader = new FileReader();
//         reader.onload = function(e) {
//             var canvasImage = fabric.Image.fromURL(e.target.result, function(img) {
//                 // console.log('Imagem size:',img.width)
//                 // console.log('Imagem size:',img.height)
//                 img.set({
//                     scaleX: (10000/img.width)/100,
//                     scaleY: (10000/img.height)/100,
//                     left: 100,
//                     top: 100
//                 });
//                 // console.log('Imagem size:',img.getScaledWidth())
//                 // console.log('Imagem size:',img.getScaledHeight())
//                 canvas.add(img);
//             });
//         };
//         reader.readAsDataURL(file);
//     }
// });

document.getElementById('fileInput').addEventListener('change', function (event) {
    var svgImage = document.createElementNS('http://www.w3.org/2000/svg', 'image')

    var file = event.target.files[0];
    if (file) {
        var reader = new FileReader();
        var imageURL = null
        reader.onload = function (e) {
            imageURL = e.target.result
            var canvasImage = fabric.Image.fromURL(imageURL, function (img) {
                // console.log('Imagem size:',img.width)
                // console.log('Imagem size:',img.height)
                img.set({
                    scaleX: (10000 / img.width) / 100,
                    scaleY: (10000 / img.height) / 100,
                    left: 100,
                    top: 100
                });
                // console.log('Imagem size:',img.getScaledWidth())
                // console.log('Imagem size:',img.getScaledHeight())
                canvas.add(img);

                img.on('modified', () => {
                    console.log('Drag',)
                    svgImage.setAttribute('x', (img.left * (svg.getBBox().width / canvas.width)) - 60)
                    svgImage.setAttribute('y', (img.top * (svg.getBBox().height / canvas.height)) - 60)
                })
                img.on('scaling', () => {
                    svgImage.setAttribute('width', img.width * img.scaleX)
                    svgImage.setAttribute('height', img.height * img.scaleY)
                })
                svgImage.setAttribute('id', 'imageID')
                svgImage.setAttribute('x', 100 * (svg.getBBox().width / canvas.width) - 60)
                svgImage.setAttribute('y', 100 * (svg.getBBox().height / canvas.height) - 60)
                svgImage.setAttribute('width', img.width * (10000 / img.width) / 100)
                svgImage.setAttribute('height', img.height * (10000 / img.height) / 100)
                svgImage.setAttributeNS('http://www.w3.org/1999/xlink', 'href', imageURL)

                maskGroup.appendChild(svgImage)
            });




        };
        reader.readAsDataURL(file);




    }
});







// fabric.Image.fromURL('svg/img/box.png', (img) => {
//     // canvas.add(img)

//     // Listener para variação de posição
//     img.on('modified', function () {
//         console.log('Nova posição da imagem:');
//         console.log('X:', img.left);
//         console.log('Y:', img.top);
//     });

//     // Listener para variação de tamanho
//     img.on('scaling', function () {
//         console.log('Novo tamanho da imagem:');
//         console.log('Largura:', img.width * img.scaleX);
//         console.log('Altura:', img.height * img.scaleY);
//     });
// })
// Para adicionar elemento dentro da tag <g>
// const svg = document.getElementById('T-shirt-svg');
// const maskGroup = svg.querySelector('g[mask="url(#mask0_5_24)"]');

// var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')

// rect.setAttribute('id', 'rectID');
// rect.setAttribute('x', '70');
// rect.setAttribute('y', '80');
// rect.setAttribute('width', '80');
// rect.setAttribute('height', '80');
// rect.setAttribute('fill', 'yellow');

// Adicionar o retângulo ao SVG
//maskGroup.appendChild(rect);

// Para listar os elementos dentro da tag <g>
document.addEventListener('DOMContentLoaded', () => {
    // Selecionar o SVG e o grupo onde os elementos estão
    const svg = document.getElementById('T-shirt-svg');
    const maskGroup = svg.querySelector('g[mask="url(#mask0_5_24)"]');

    // Listar todos os elementos dentro do grupo
    const elements = maskGroup.children;

    // Iterar sobre os elementos e exibir suas informações
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        console.log(`Elemento ${i + 1}: ${element.tagName} com ID ${element.id}`);
    }
});


// Para listar os elementos dentro da tag <g> e criar uma treeView
document.addEventListener('DOMContentLoaded', () => {
    // Selecionar o SVG e o grupo onde os elementos estão
    const svg = document.getElementById('T-shirt-svg');
    const maskGroup = svg.querySelector('g[mask="url(#mask0_5_24)"]');

    // Criar uma estrutura de dados para o jsTree
    const treeData = [];

    // Adicionar um nó raiz para o grupo de máscara
    treeData.push({
        id: 'maskGroup',
        parent: '#',
        text: 'Mask Group'
    });

    // Listar todos os elementos dentro do grupo e construir a estrutura de dados
    const elements = maskGroup.children;
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        treeData.push({
            id: element.id || `element-${i}`, // Adicionar um ID único se não houver um
            parent: 'maskGroup',
            text: `${element.tagName} (ID: ${element.id || 'sem id'})`
        });
    }

    // Inicializar o jsTree com a estrutura de dados
    $('#jstree').jstree({
        'core': {
            'check_callback': true, // Necessário para permitir a manipulação de nós
            'data': treeData
        },
        'plugins': ['dnd'] // Habilitar o plugin de drag-and-drop
    }).on('move_node.jstree', function (e, data) {
        // Lógica a ser executada quando um nó é movido
        console.log('Nó movido', data);

        // Obter os nós filhos do maskGroup em jsTree
        const nodeChildren = $('#jstree').jstree().get_node('maskGroup').children;

        // Reordenar os elementos SVG de acordo com a nova ordem na árvore
        nodeChildren.forEach(childId => {
            const movedNode = document.getElementById(childId);
            maskGroup.appendChild(movedNode);
        });
    });
});
