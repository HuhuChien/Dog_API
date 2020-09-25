// fetch("https://dog.ceo/api/breeds/list/all")
//     .then(res => res.json())
//     .then(data => console.log(data));


let timer;
let deleteFirst;


async function start(){
    const res = await fetch('https://dog.ceo/api/breeds/list/all')
    const data = await res.json();
    console.log(data);
    createBreedList(data.message)
 }

 start();
    
function createBreedList(breedList){
    document.getElementById("breed").innerHTML = `
    <select onchange="loadByBreed(this.value)">
        <option>Choose a dog breed</option>
        ${Object.keys(breedList).map(function(breed){
            return `<option>${breed}</option>`
        }).join('')}
    </select>
    `
}


async function loadByBreed(breed){
    if(breed != "Choose a dog breed"){
        const res = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
        const data = await res.json();
        console.log(data); 
        createSlideshow(data.message);
    }
}


function createSlideshow(images){
    let currentPosition = 0;
    clearInterval(timer);
    clearTimeout(deleteFirst);
    console.log(images);
    document.getElementById('slideshow').innerHTML = `
    <div class="slide" style="background-image: url('${images[0]}')"></div>
    <div class="slide" style="background-image: url('${images[1]}')"></div>
    `
    currentPosition += 2
    timer = setInterval(nextSlide, 3000)
    function nextSlide(){
        document.getElementById("slideshow").insertAdjacentHTML("beforeend", `
        <div class="slide" style="background-image: url('${images[currentPosition]}')"></div>`)
        deleteFirst = setTimeout(function(){
            document.querySelector(".slide").remove()
        }, 1000)
        if(currentPosition + 1 >= images.length){
            currentPosition = 0
        } else {
            currentPosition++
        }
    }
}
    


