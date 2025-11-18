const colorSelect = document.getElementById('color-select')
const numberSelect = document.querySelectorAll('input[type=radio]')
let paletteNumber = 5
const schemeSelect = document.getElementById('scheme-select')
const getpaletteBtn = document.getElementById('get-palette-btn')

const loadColors = () => {
    const characters = '0123456789ABCDEF'
    let hexValue = '#'
    for (let i = 0; i < 6; i++) {
        hexValue += characters[(Math.floor(Math.random() * 16))]
    }
    colorSelect.value = hexValue
    getColors()
}

const setPalette = (data) => {
    let colorHTML = ''
    for (let i = 0; i < paletteNumber; i++) {
        const yiqContrastColor = () => {
            const yiqCalc = ((data.colors[i].rgb.r * 299) + (data.colors[i].rgb.g * 587) + (data.colors[i].rgb.b * 114)) / 1000
            return yiqCalc >= 128 ? 'black' : 'white'
        }

        colorHTML += `
        <div class="color-wrapper" id="color-${i + 1}" style="background-color: ${data.colors[i].hex.value};color:${yiqContrastColor()}">
                <div>
                    <div class="color-code" id="hex-${i + 1}">Hex: ${data.colors[i].hex.value}</div>
                    <div class="color-code" id="rgb-${i + 1}">RGB: ${[data.colors[i].rgb.r, data.colors[i].rgb.g, data.colors[i].rgb.b].join(' ')}</div>
                    <div class="color-code" id="cmyk-${i + 1}">CMYK: ${[data.colors[i].cmyk.c, data.colors[i].cmyk.m, data.colors[i].cmyk.y, data.colors[i].cmyk.k].join(' ')}</div>
                </div>
                <div class="copy-btn-wrapper">
                    <button>Copy Hex Code</button>
                </div>
            </div>
            `
    }
    document.getElementById('palette-wrapper').innerHTML = colorHTML
}

const getColors = () => {
    fetch(`https://www.thecolorapi.com/scheme?hex=${colorSelect.value.replace('#', '')}&mode=${schemeSelect.value}&count=${paletteNumber}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setPalette(data)
        })
}

const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`

loadColors()

numberSelect.forEach(number => {
    number.addEventListener('click', () => {
        paletteNumber = number.value
        getColors()
    })
})

document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault()
    getColors()
})

document.getElementById('palette-wrapper')
    .addEventListener('click', (e) => {
        if (e.target.closest('.copy-btn-wrapper button')) {
            console.log(e)
            const hexCode = rgb2hex(e.target.parentElement.parentElement.style.backgroundColor)
            navigator.clipboard.writeText(hexCode)
            e.target.textContent = 'Copied!'
            setTimeout(() => e.target.textContent = 'Copy Hex Code', '1000')
            navigator.clipboard.readText()
                .then((text) => {
                    text === hexCode ? null : window.alert('Uh oh, there\'s been an error!')
                })
        }
    })