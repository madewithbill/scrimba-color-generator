const colorSelect = document.getElementById('color-select')
const schemeSelect = document.getElementById('scheme-select')
const getSchemeBtn = document.getElementById('get-scheme-btn')
const colorBlock1 = document.getElementById('color-1')
const colorCode1 = document.getElementById('code-1')
const colorBlock2 = document.getElementById('color-2')
const colorCode2 = document.getElementById('code-2')
const colorBlock3 = document.getElementById('color-3')
const colorCode3 = document.getElementById('code-3')
const colorBlock4 = document.getElementById('color-4')
const colorCode4 = document.getElementById('code-4')
const colorBlock5 = document.getElementById('color-5')
const colorCode5 = document.getElementById('code-5')
const hexCodes = document.querySelectorAll('.color-code')


const loadColors = () => {
    const characters = '0123456789ABCDEF'
    let hexValue = '#'
    for (let i = 0; i < 6; i++) {
        hexValue += characters[(Math.floor(Math.random() * 16))]
    }
    colorSelect.value = hexValue
    getColors()
}

const getColors = () => {
    fetch(`https://www.thecolorapi.com/scheme?hex=${colorSelect.value.replace('#', '')}&mode=${schemeSelect.value}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            colorBlock1.style.backgroundColor = colorCode1.textContent = data.colors[0].hex.value
            colorBlock2.style.backgroundColor = colorCode2.textContent = data.colors[1].hex.value
            colorBlock3.style.backgroundColor = colorCode3.textContent = data.colors[2].hex.value
            colorBlock4.style.backgroundColor = colorCode4.textContent = data.colors[3].hex.value
            colorBlock5.style.backgroundColor = colorCode5.textContent = data.colors[4].hex.value
        })
}


loadColors()

getSchemeBtn.addEventListener('click', getColors)

hexCodes.forEach((hexCode) => {
    hexCode.addEventListener('click', function () {
        navigator.clipboard.writeText(hexCode.innerHTML)
        navigator.clipboard.readText()
            .then((text) => {
                text === hexCode.innerHTML ? window.alert('Your color has been copied!') : window.alert('Uh oh, there\'s been an error!')
            })
    })
})
