let gridContainer = document.getElementById('gridcontainer');
let slider = document.getElementById("myRange");
let output = document.getElementById("slidervalue");

let userColor;

output.innerHTML = slider.value; // Display the default slider value
makeGrid(slider.value);

let blackBtn = document.getElementById('goBlack');
blackBtn.addEventListener('click', goBlack);

let rainbowBtn = document.getElementById('goRainbow');
rainbowBtn.addEventListener('click', goRainbow);

let eraseBtn = document.getElementById('goErase');
eraseBtn.addEventListener('click', goErase);

let gradientBtn = document.getElementById('goGradient');
gradientBtn.addEventListener('click', goGradient);

let colorPicker = document.getElementById('colorpicker');
colorPicker.addEventListener('change', goColor);
colorPicker.addEventListener('click', goColor);

goRainbow();

//delete grid and make new grid when you click the reset button
let resetBtn = document.getElementById('reset');
resetBtn.addEventListener('click', () =>
{
    clearGrid();
    makeGrid(slider.value);
    goRainbow();
});

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    output.innerHTML = this.value;
    clearGrid();
    makeGrid(this.value);
    goRainbow();
}

function makeGrid(num) {
    for(let i = 0; i < num; i++)
    {
        let row = document.createElement('div');
        row.className = 'row';
        let cellSize = (1/num)*300;
        row.style.width = '100%';
        row.style.height = `${2*cellSize}px`;
        gridContainer.appendChild(row);

        for(let j = 0; j < num; j++)
        {
            let cell = document.createElement('button');
            cell.className = 'cell';
            cell.style.width = `${cellSize}px`;
            cell.style.height = `${cellSize}px`;
            cell.style.padding = `${cellSize}px`;
            row.appendChild(cell);
        }
    }
}

// function to clear child nodes in the container
// if it has child nodes
// and then it creates the grid in the slider function
function clearGrid(){
    if(gridContainer.hasChildNodes()){
        while(gridContainer.hasChildNodes()){
            gridContainer.removeChild(gridContainer.lastChild);
        }
    }
}

function goColor(e) {
    const gridElements = document.querySelectorAll('.cell');
    gridElements.forEach((div) => {
        div.removeEventListener('mouseenter', allBlack);
        div.removeEventListener('mouseenter', rainbow);
        div.removeEventListener('mouseenter', eraser);
        div.removeEventListener('mouseenter', darken);
        div.addEventListener('mouseenter', turnColor);
    })
    userColor = e.target.value;

    //change these to userColor values smh
    let valueColorR = userColor.slice(1,3).toString();
    let valueColorG = userColor.slice(3,5).toString();
    let valueColorB = userColor.slice(5,7).toString();

    colorPicker.style.backgroundColor = `#${valueColorR}${valueColorG}${valueColorB}`
}

function turnColor() {
    this.style.backgroundColor = userColor;
}


function darken() {
    const style = window.getComputedStyle(this);
    const backgroundColorValue = style.getPropertyValue('background-color');                //getting 'rgb(x, x, x)'
    const firstComma = backgroundColorValue.indexOf(',');
    const firstSpace = backgroundColorValue.indexOf(' ');
    const lastComma = backgroundColorValue.lastIndexOf(',');
    const lastSpace = backgroundColorValue.lastIndexOf(' ');

    const valueColorR = backgroundColorValue.slice(4, firstComma);                           //getting each number x as string
    const valueColorG = backgroundColorValue.slice((firstSpace+1), lastComma);
    const valueColorB = backgroundColorValue.slice((lastSpace+1),-1);

    const newValueColorR = valueColorR - (valueColorR*0.1);
    const newValueColorG = valueColorG - (valueColorG*0.1);
    const newValueColorB = valueColorB - (valueColorB*0.1);

    this.style.backgroundColor = `rgb(${newValueColorR},${newValueColorG},${newValueColorB})`;

}

function goGradient() {
    const gridElements = document.querySelectorAll('.cell');
    gridElements.forEach((div) => {
        div.removeEventListener('mouseenter', allBlack);
        div.removeEventListener('mouseenter', rainbow);
        div.removeEventListener('mouseenter', eraser);
        div.removeEventListener('mouseenter', turnColor);
        div.addEventListener('mouseenter', darken);
    })
}

function eraser() {
    this.style.backgroundColor = 'white';
}

function goErase() {
    const gridElements = document.querySelectorAll('.cell');
    gridElements.forEach((div) => {
        div.removeEventListener('mouseenter', allBlack);
        div.removeEventListener('mouseenter', rainbow);
        div.removeEventListener('mouseenter', darken);
        div.removeEventListener('mouseenter', turnColor);
        div.addEventListener('mouseenter', eraser);
    })
}

function rainbow() {
    let red = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);

    this.style.backgroundColor = `rgb(${red},${blue},${green})`;
}

function goRainbow() {
    const gridElements = document.querySelectorAll('.cell');
    gridElements.forEach((div) => {
        div.removeEventListener('mouseenter', allBlack);
        div.removeEventListener('mouseenter', eraser);
        div.removeEventListener('mouseenter', darken);
        div.removeEventListener('mouseenter', turnColor);
        div.addEventListener('mouseenter', rainbow);
    })
}

function allBlack() {
    this.style.backgroundColor = 'black';
}

function goBlack() {
    const gridElements = document.querySelectorAll('.cell');
    gridElements.forEach((div) => {
        div.removeEventListener('mouseenter', rainbow);
        div.removeEventListener('mouseenter', eraser);
        div.removeEventListener('mouseenter', darken);
        div.removeEventListener('mouseenter', turnColor);
        div.addEventListener('mouseenter', allBlack);
    })
}

