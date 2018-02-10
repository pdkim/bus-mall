'use strict';

//images
Product.allProducts = [];

function Product(name, filepath) {
  this.name = name;
  this.filepath = filepath;
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
var imgEl = document.getElementById('firstSet');
var imgEl2 = document.getElementById('secondSet');
var imgEl3 = document.getElementById('thirdSet');

imgEl.addEventListener('click', randomPic);
imgEl2.addEventListener('click', randomPic);
imgEl3.addEventListener('click', randomPic);

function randomPic() {
  var clicks = 25;
  var randomIndex = Math.floor(Math.random() * Product.allProducts.length);
  imgEl.src = Product.allProducts[randomIndex].filepath;
  imgEl2.src = Product.allProducts[randomIndex].filepath;
  imgEl3.src = Product.allProducts[randomIndex].filepath;
  if(clicks > 0) {
    clicks--;
  }
  else {
    imgEl.removeEventListener('click', randomPic);
    imgEl2.removeEventListener('click', randomPic);
    imgEl3.removeEventListener('click', randomPic);
  }
}

randomPic();