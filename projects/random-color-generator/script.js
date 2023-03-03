const randomColorButton = document.querySelector('#random-color-btn');
const colorDisplay = document.querySelector('.color-display');
const colorInfoElement = function(colorName, colorHex) {
    return `
<div class="color-info-display">
    <p class="color-name">Closest Named Color: <span>${colorName}</span></p>
    <p class="color-hex">${colorHex}</p>
</div>`
};


const state = {
    initialLoad: true,
    colorInfoAdded: false
};

const colorArray = [];

//Updating the Outline
const stylesheet = document.styleSheets[1];

const focusVisibleRule = [...stylesheet.cssRules].find(r => r.selectorText === ":focus-visible");

console.log(focusVisibleRule);

focusVisibleRule.style.setProperty('outline', 'violet 3px solid')

randomColorButton.addEventListener('click', async (e) => {
    
    if (state.initialLoad) {
        document.querySelector('.initial-message').style.display = "none";
        state.initialLoad = false;
    }
    
    const color = getRandomHexColor();

    colorDisplay.style.backgroundColor = `#${color}`;

    const colorURL = `https://www.thecolorapi.com/id?hex=${color}`;

    //Make GET request to get color information
    const response = await fetch(colorURL);

    const data = await response.json();

    // console.log(data);

    //Update the color-info display
    if (!state.colorInfoAdded) {
        colorDisplay.innerHTML = colorInfoElement(data.name.value, data.hex.value);
        state.colorInfoAdded = true;
    } else {
        document.querySelector('.color-name span').textContent = data.name.value;
        document.querySelector('.color-hex').textContent = data.hex.value;
    }
})

function getRandomHexColor() {
    const randomHex = Math.floor(Math.random() * 16777215).toString(16);
    return randomHex.toUpperCase();
}

//MODEL OF THE COLOR DATA FROM COLOR API:
// {
//     "hex": {
//         "value": "#E7ECFE",
//         "clean": "E7ECFE"
//     },
//     "rgb": {
//         "fraction": {
//             "r": 0.9058823529411765,
//             "g": 0.9254901960784314,
//             "b": 0.996078431372549
//         },
//         "r": 231,
//         "g": 236,
//         "b": 254,
//         "value": "rgb(231, 236, 254)"
//     },
//     "hsl": {
//         "fraction": {
//             "h": 0.6304347826086957,
//             "s": 0.9200000000000003,
//             "l": 0.9509803921568627
//         },
//         "h": 227,
//         "s": 92,
//         "l": 95,
//         "value": "hsl(227, 92%, 95%)"
//     },
//     "hsv": {
//         "fraction": {
//             "h": 0.6304347826086957,
//             "s": 0.09055118110236221,
//             "v": 0.996078431372549
//         },
//         "value": "hsv(227, 9%, 100%)",
//         "h": 227,
//         "s": 9,
//         "v": 100
//     },
//     "name": {
//         "value": "Hawkes Blue",
//         "closest_named_hex": "#D4E2FC",
//         "exact_match_name": false,
//         "distance": 1053
//     },
//     "cmyk": {
//         "fraction": {
//             "c": 0.09055118110236221,
//             "m": 0.07086614173228344,
//             "y": 0,
//             "k": 0.0039215686274509665
//         },
//         "value": "cmyk(9, 7, 0, 0)",
//         "c": 9,
//         "m": 7,
//         "y": 0,
//         "k": 0
//     },
//     "XYZ": {
//         "fraction": {
//             "X": 0.8843333333333333,
//             "Y": 0.9264180392156863,
//             "Z": 1.0745745098039217
//         },
//         "value": "XYZ(88, 93, 107)",
//         "X": 88,
//         "Y": 93,
//         "Z": 107
//     },
//     "image": {
//         "bare": "https://www.thecolorapi.com/id?format=svg&named=false&hex=E7ECFE",
//         "named": "https://www.thecolorapi.com/id?format=svg&hex=E7ECFE"
//     },
//     "contrast": {
//         "value": "#000000"
//     },
//     "_links": {
//         "self": {
//             "href": "/id?hex=E7ECFE"
//         }
//     },
//     "_embedded": {}
// }