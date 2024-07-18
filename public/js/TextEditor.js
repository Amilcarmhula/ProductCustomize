const fontFamilySelect = document.getElementById('fontFamilySelect')
const fetchFontFamily = () => {
const fontFamily = [
    'Arial',
    'Arial Black',
    'Book Antiqua',
    'Comic Sans MS',
    'Courier New',
    'Cursive Fonts',
    'Fantasy Fonts',
    'Georgia',
    'Helvetica',
    'Impact',
    'Lucida Console',
    'Monaco',
    'Palatino Linotype',
    'Papyrus',
    'Tahoma',
    'Times New Roman',
    'Trebuchet MS',
    'Verdana',
]
var option = ''
for (var i = 0; i < (fontFamily.length + 1); i++) {
    if (i == 0) {
        option += `<option  value=''> Font Family</option>`
    } else {
        option += `<option  value='${fontFamily[i - 1]}'> ${fontFamily[i - 1]}</option>`
    }
} 
fontFamilySelect.innerHTML = option  
}
fetchFontFamily()


const listTextItems = document.getElementById('listTextItems')
let itemSelecionado = ''
listTextItems.addEventListener('change', function () {
    itemSelecionado = this.value
    // console.log(itemSelecionado)
})


/*
    Add Text to the Image
*/
const btnAdd = document.getElementById('btnAdd')
const txtArea = document.getElementById('txtArea')
btnAdd.addEventListener('click', () => {
    const maskGroup = document.getElementById(itemSelecionado)
    if (itemSelecionado.startsWith('CorpoD')) {
    maskGroup.appendChild(texto)
    }else{
        console.log('Nao foi possivel add item!')
    }
    // loadSVGContentToArray()
    appendChildToTextList()
    txtArea.value = ''
})

const loadTag = () => {
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
/*Detecta quebre de linha no textArea e cria paraagrafos */
let texto = document.createElementNS('http://www.w3.org/2000/svg', 'text')
function detectLineBreaks() {
    const textarea = document.getElementById('txtArea');

    textarea.addEventListener('input', function () {
        const text = textarea.value;
        const lines = text.split('\n');
        let tspan = []
        if (lines.length >= 1) {
            for (let index = 0; index < lines.length; index++) {
                tspan.push(createTspanTag(lines[index]))
            }
        }

        texto = createTextTag(tspan)
    });
    
}
function createTspanTag(lineText) {
    let data = new Date();
    let dataID = '' + data.getFullYear() + (data.getMonth() + 1) + data.getDate() + data.getHours() + data.getMinutes() + data.getSeconds() + data.getMilliseconds()
    const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    tspan.setAttribute('id', '_tspan' + dataID);
    tspan.setAttribute('x', '140');
    tspan.setAttribute('dy', '1.2em');
    tspan.textContent = lineText;

    return tspan
}

function createTextTag(arr) {
    let data = new Date();
    let dataID = '' + data.getFullYear() + (data.getMonth() + 1) + data.getDate() + data.getHours() + data.getMinutes() + data.getSeconds() + data.getMilliseconds()
    var txtSvg = document.createElementNS('http://www.w3.org/2000/svg', 'text')
    txtSvg.setAttribute('id', '_text' + dataID)
    txtSvg.setAttribute('class','mangas')
    txtSvg.setAttribute('x', 140)//95
    txtSvg.setAttribute('y', 190)//120
    txtSvg.setAttribute('font-size', '14');
    txtSvg.setAttribute('font-weight', 'normal');
    txtSvg.setAttribute('font-style', 'normal');
    txtSvg.setAttribute('text-decoration', 'normal');
    txtSvg.setAttribute('text-anchor', 'start');
    txtSvg.setAttribute('fill', '#d8cc21');
    // txtSvg.setAttribute('opacity', '0.2');
    txtSvg.setAttribute('font-family', 'Comic Sans')
    txtSvg.setAttribute('font-family', 'Arial');
    txtSvg.setAttribute('font-size', '24');
    for (let index = 0; index < arr.length; index++) {
        txtSvg.appendChild(arr[index])
    }
    return txtSvg
}

const appendChildToTextList = () => {
    var option = '<option selected class="text-center">Itens</option>'
    listTextItems.innerHTML = option

    loadTag().forEach(elements => {
        // console.log('Parte: ',elements)
        option += `<option value='${elements.id}'> ${elements.id}</option>`
    })

    loadTag().forEach(elements => {
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

    listTextItems.innerHTML = option
}


/*
    Update Fonte size
*/
const upDateFontSize = (idItemSelecionado, size) => {
    loadTag().forEach(element => {
        element.querySelectorAll('*').forEach(tag =>{
            if (tag.id == idItemSelecionado) {
                    tag.setAttribute('font-size', size);
            }
        })
    })
}


const fontSize = document.getElementById('fontSize')
fontSize.addEventListener('change', function () {
    upDateFontSize(itemSelecionado, this.value)
})

/*
    UpdateFontFamily
*/
const upDateFonteFamily = (idItemSelecionado, font) => {
    loadTag().forEach(element => {
        element.querySelectorAll('*').forEach(tag =>{
            if (tag.id == idItemSelecionado) {
                    tag.setAttribute('font-family', font);
            }
        })
    })
}

/*
    Update FontFamily
*/
fontFamilySelect.addEventListener('change', function(){
    upDateFonteFamily(itemSelecionado, this.value)
})
/*
    Update Font to Bold
*/
const upDateBold = (idItemSelecionado) => {
    loadTag().forEach(element => {
        element.querySelectorAll('*').forEach(tag =>{
            if (tag.id == idItemSelecionado) {
                if (tag.getAttribute('font-weight') != 'bold') {
                    tag.setAttribute('font-weight', 'bold');
                } else {
                    tag.setAttribute('font-weight', 'normal');
                }
            }
        })
    })
}

const btnBold = document.getElementById('btnBold')
btnBold.addEventListener('click', () => {
    upDateBold(itemSelecionado)
})

/*
    Update Font to Italic
*/
const upDateItalic = (idItemSelecionado) => {
    loadTag().forEach(element => {
        element.querySelectorAll('*').forEach(tag =>{
            if (tag.id == idItemSelecionado) {
                if (tag.getAttribute('font-style') != 'italic') {
                    tag.setAttribute('font-style', 'italic');
                } else {
                    tag.setAttribute('font-style', 'normal');
                }
            }
        })
    })
}

const btnItalic = document.getElementById('btnItalic')
btnItalic.addEventListener('click', () => {
    upDateItalic(itemSelecionado)
})

/*
    Update Font to Underline
*/
const upDateUnderline = (idItemSelecionado) => {
    loadTag().forEach(element => {
        element.querySelectorAll('*').forEach(tag =>{
            if (tag.id == idItemSelecionado) {
                if (tag.getAttribute('text-decoration') != 'underline') {
                    tag.setAttribute('text-decoration', 'underline');
                } else {
                    tag.setAttribute('text-decoration', 'normal');
                }
            }
        })
    })
}

const btnUnderline = document.getElementById('btnUnderline')
btnUnderline.addEventListener('click', () => {
    upDateUnderline(itemSelecionado)
})


/*
    Update Text Alignment Left
*/
const upDateAlignStart = (idItemSelecionado) => {
    loadTag().forEach(element => {
        element.querySelectorAll('*').forEach(tag =>{
            if (tag.id == idItemSelecionado) {
                    tag.setAttribute('text-anchor', 'start');
            }
        })
    })
}

const btnAlignStart = document.getElementById('btnAlignStart')
btnAlignStart.addEventListener('click', () => {
    upDateAlignStart(itemSelecionado)
})

/*
    Update Text Alignment Center
*/
const upDateAlignCenter = (idItemSelecionado) => {
    loadTag().forEach(element => {
        element.querySelectorAll('*').forEach(tag =>{
            if (tag.id == idItemSelecionado) {
                    tag.setAttribute('text-anchor', 'middle');
            }
        })
    })
}

const btnAlignCenter = document.getElementById('btnAlignCenter')
btnAlignCenter.addEventListener('click', () => {
    upDateAlignCenter(itemSelecionado)
})

/*
    Update Text Alignment Right
*/
const upDateAlignEnd = (idItemSelecionado) => {
    loadTag().forEach(element => {
        element.querySelectorAll('*').forEach(tag =>{
            if (tag.id == idItemSelecionado) {
                    tag.setAttribute('text-anchor', 'end');
            }
        })
    })
}

const btnAlignEnd = document.getElementById('btnAlignEnd')
btnAlignEnd.addEventListener('click', () => {
    upDateAlignEnd(itemSelecionado)
})


/*
    Update Text Color
*/
const upDateColor = (idItemSelecionado, cor) => {
    loadTag().forEach(element => {
        element.querySelectorAll('*').forEach(tag =>{
            if (tag.id == idItemSelecionado) {
                tag.setAttribute('fill', cor.toLowerCase());
        }
        })
    })
}

const colorInput = document.getElementById('colorPicker');
colorInput.addEventListener('change', function () {
    upDateColor(itemSelecionado, colorInput.value)
});


/*
   Delete Items 
*/
const deleteItems = (idItemSelecionado) => {
    loadTag().forEach(element => {
        element.querySelectorAll('*').forEach(tag =>{
            if (tag.id == idItemSelecionado) {
                tag.remove()
        }
        })
    })
}

const btnDelete = document.getElementById('btnDelete');
btnDelete.addEventListener('click', () => {
    deleteItems(itemSelecionado)
    appendChildToTextList()
});
