const listItemsText = document.getElementById('listTextItems')
const selectTag = document.getElementById('selectTag')
const listImageItems = document.getElementById('listImageItems')

/*
    Fecth all models to the Select HTML tag
*/
const fetchModels = () => {
    var option = ''
    fetch('http://localhost:3000/files', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(files => files.json())
        .then(dados => {
            // console.log(dados[0])
            for (var i = 0; i < (dados.length + 1); i++) {
                if (i == 0) {
                    option += `<option id='opt0' value=''> Selecione o producto a personalizar </option>`
                } else {
                    option += `<option id = opt${i} value='${dados[i - 1]}'> ${dados[i - 1]}</option>`
                }
            }
            selectTag.innerHTML = option
        })
}

fetchModels()


/*When the SVG Model is selected, it create an img HTML tag that will load the SVG via the loadSVG(this) method  */
selectTag.addEventListener('change', function () {
    const parent = document.getElementById('containerSVG')

    // Remove todos os filhos do elemento pai
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
    const imgTag = document.createElement('img')
    imgTag.setAttribute('onload', 'loadSVG(this)')
    imgTag.setAttribute('src', 'svg/' + this.value)
    imgTag.setAttribute('id', 'imgCanvas')
    containerSVG.appendChild(imgTag)
    // console.log('Valor selecionado:', this.value);
})

const loadSVG = (image) => {
    fetch(image.src)
        .then(res => res.text())
        .then((svgContent) => {
            const span = document.createElement('span')
            span.innerHTML = svgContent
            const inlineSVG = span.getElementsByTagName('svg')[0]
            image.parentNode.replaceChild(inlineSVG, image)
            return true
        })
}

/*Load the g[mask="url(#mask0_5_24)"] content tag group to be manipulated  */
const loadCanvasTags = () => {
    const svgCanvas = document.getElementById('svgCanvas')
    const maskGroup = svgCanvas.querySelector('g[mask="url(#mask0_5_24)"]')
    // maskGroup.querySelectorAll('*').forEach(element => {
    //         console.log(element) 
    //     });
    return maskGroup
}
document.getElementById('btnModalOK').addEventListener('click', () => {
    appendChildToFrontList()
    appendChildToImagetList()

})

const loadTags_New = () => {
    const svgCanvas = document.getElementById('svgCanvas')
    const maskGroup = svgCanvas.querySelectorAll('.parte')
    // const elements = maskGroup.querySelectorAll('*')
    // maskGroup.forEach(element => {
    //     console.log('Parte: ',element.id)
    //     // console.log(element.querySelectorAll('*')) 
    //     element.querySelectorAll('*').forEach(tag =>{
    //         // console.log('Tag: ',tag)
    //     })
    // });
    return maskGroup

}
const appendChildToFrontList = () => {
    var option = '<option selected class="text-center">Itens</option>'
    listItemsText.innerHTML = option

    loadTags_New().forEach(elements => {
        // console.log('Parte: ',elements)
        option += `<option value='${elements.id}'> ${elements.id}</option>`
    })

    loadTags_New().forEach(elements => {
        const element = elements.querySelectorAll('*')
        for(let i = 0; i < element.length;i++){
            if (element[i].id.startsWith('_text')) {
            option += `<option value='${element[i].id}'> ${element[i].innerHTML}</option>`
            }
            if (element[i].id.startsWith('CorDa')) {
                option += `<option value='${element[i].id}'> ${element[i].id}</option>`
            }
        }

    })

    listItemsText.innerHTML = option
}

/*
    Add an Image to ...
*/
const fileInput = document.getElementById('fileInput')
fileInput.addEventListener('change', function (event) {
    txtArea.value = ''
    var svgImage = document.createElementNS('http://www.w3.org/2000/svg', 'image')
    let data = new Date();
    let dataID = '' + data.getFullYear() + (data.getMonth() + 1) + data.getDate() + data.getHours() + data.getMinutes() + data.getSeconds() + data.getMilliseconds()
    

    var file = event.target.files[0];
    if (file) {
        var reader = new FileReader();
        var imageURL = null
        reader.onload = function (e) {
            imageURL = e.target.result
                svgImage.setAttribute('id', '_image'+dataID)
                svgImage.setAttribute('x', 140)
                svgImage.setAttribute('y', 190)
                svgImage.setAttribute('width', 100)
                svgImage.setAttribute('height', 100)
                svgImage.setAttributeNS('http://www.w3.org/1999/xlink', 'href', imageURL)

            const maskGroup = document.getElementById(itemSelecionado)
            if (itemSelecionado.startsWith('CorpoD')) {
                maskGroup.appendChild(svgImage)
            } else {
                console.log('Nao foi possivel add item!')
            }
            appendChildToImagetList()
        };
        reader.readAsDataURL(file);
    }
});

/*
    Load the svg Content into an array, later to be converted to an object
*/
// codigo abaixo sem utilidade
// const loadSVGContentToArray = () => {
//     let arrayElements = []
//     const elements = loadCanvasTags().querySelectorAll('*');
//     // elements.forEach(element => console.log('ELEMENTS: ', element));
//     for (let index = 0; index < elements.length; index++) {
//         arrayElements[index] = elements[index]
//         //console.log(arrayElements[index])
//     }
//     convertTagToObjects(arrayElements)
//     return arrayElements
// }

/*
    Convert Tag elements to objects
*/
// const convertTagToObjects = (arr) => {
//     let arrayObjects = []
//     for (let i = 0; i < arr.length; i++) {
//         let obj = {}
//         const tag = document.getElementById(arr[i].id)

//         const attributesTag = tag.attributes

//         for (let j = 0; j < attributesTag.length; j++) {
//             const attribTag = attributesTag[j]
//             obj[attribTag.name] = attribTag.value
//         }
//         arrayObjects.push(obj)
//     }
//     appendChildToFrontList()
//     return arrayObjects
// }

/*
    Append items to Image List
*/
const appendChildToImagetList = () => {
    const svgCanvas = document.getElementById('svgCanvas')
    const maskGroup = svgCanvas.querySelectorAll('.parte')
    var option = '<option selected class="text-center">Itens</option>'
    listImageItems.innerHTML = option

    maskGroup.forEach(elements => {
        // console.log('Parte imagens: ',elements)
        option += `<option value='${elements.id}'> ${elements.id}</option>`
    })

    maskGroup.forEach(elements => {
        const element = elements.querySelectorAll('*')
        for(let i = 0; i < element.length;i++){
            if (element[i].id.startsWith('_image')) {
                option += `<option value='${element[i].id}'> ${element[i].id}</option>`
            }
        }

    })
    listImageItems.innerHTML = option
}

const btnDeleteImage = document.getElementById('btnDeleteImage')
btnDeleteImage.addEventListener('click', () => {
    deleteItems(itemSelecionado)
    appendChildToImagetList()
})



listImageItems.addEventListener('change', function () {
    itemSelecionado = this.value
    // console.log(itemSelecionado)
})
