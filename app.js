'use strict';

//images
Product.allProducts = [];
Product.container = document.getElementById('images');
Product.justViewed = [];
Product.pics = [document.getElementById('img1'), document.getElementById('img2'), document.getElementById('img3')]
Product.tally = document.getElementById('final');

var maxClicks = 0;

function Product(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  this.totalClicks = 0;
  this.views = 0;
  Product.allProducts.push(this);
}

new Product('bag', 'img/bag.jpg');
new Product('banana', 'img/banana.jpg');
new Product('bathroom', 'img/bathroom.jpg');
new Product('boots', 'img/boots.jpg');
new Product('breakfast', 'img/breakfast.jpg');
new Product('bubblegum', 'img/bubblegum.jpg');
new Product('chair', 'img/chair.jpg');
new Product('cthulhu', 'img/cthulhu.jpg');
new Product('dog-duck', 'img/dog-duck.jpg');
new Product('dragon', 'img/dragon.jpg');
new Product('pen', 'img/pen.jpg');
new Product('pet-sweep', 'img/pet-sweep.jpg');
new Product('tauntaun', 'img/tauntaun.jpg');
new Product('unicorn', 'img/unicorn.jpg');
new Product('usb', 'img/usb.gif');
new Product('water-can', 'img/water-can.jpg');
new Product('wine-glass', 'img/wine-glass.jpg');

//images event
var imgEl = document.getElementById('img1');
var imgEl2 = document.getElementById('img2');
var imgEl3 = document.getElementById('img3');

imgEl.addEventListener('click', randomPic);
imgEl2.addEventListener('click', randomPic);
imgEl3.addEventListener('click', randomPic);

function randomPic() {
  var randomIndex = Math.floor(Math.random() * Product.allProducts.length);
  var randomIndex2 = Math.floor(Math.random() * Product.allProducts.length);
  var randomIndex3 = Math.floor(Math.random() * Product.allProducts.length);
  imgEl.src = Product.allProducts[randomIndex].filepath;
  imgEl2.src = Product.allProducts[randomIndex2].filepath;
  imgEl3.src = Product.allProducts[randomIndex3].filepath;
  //prevent repeating images within all 3 slots.
  if(randomIndex === randomIndex2 || randomIndex === randomIndex3) {
    randomPic();
  }
  else if(randomIndex2 === randomIndex || randomIndex2 === randomIndex3) {
    randomPic();
  }
  //attempt to stop back to back images within same column
  
  //attmept maximum of 25 clicks
  function stopClicks() {
    if(maxClicks === 25) {
      clicksReached();
      render();
    } else {
      maxClicks++;
    }
  }
  stopClicks();
}

randomPic();

//clicks and render functions
function clicksReached() {
  imgEl.removeEventListener('click', randomPic);
  imgEl2.removeEventListener('click', randomPic);
  imgEl3.removeEventListener('click', randomPic);
}

function render() {
  for(var k = 0; k < Product.allProducts.length; k++) {
    var final = document.getElementById('final');
    var liEl = document.createElement('li');
    liEl.textContent = Product.allProducts.name[k] + 'got ' + Product.allProducts.totalClicks[k] + ' votes!';
    final.appendChild(liEl);
  }
}