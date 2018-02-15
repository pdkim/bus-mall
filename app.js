'use strict';

//images
Product.allProducts = [];
Product.container = document.getElementById('images');
Product.justViewed = [];
Product.pics = [document.getElementById('img1'), document.getElementById('img2'), document.getElementById('img3')];
Product.tally = document.getElementById('final');
Product.totalClicks = 0;

function Product(name, src) {
  this.name = name;
  this.src = src;
  this.votes = 0;
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


function makeRandom() {
  return Math.floor(Math.random() * Product.allProducts.length);
}

function displayPic() {
  var currentylyShowing = [];
  //img1 check
  currentylyShowing[0] = makeRandom();
  while(Product.justViewed.indexOf(currentylyShowing[0]) !== -1) {
    console.error('duplicate, re-run');
    currentylyShowing[0] = makeRandom();
  }
  //img2 check
  while(currentylyShowing[0] === currentylyShowing[1] || Product.justViewed.indexOf(currentylyShowing[1]) !== -1) {
    console.error('duplicate, re-run');
    currentylyShowing[1] = makeRandom();
  }
  //img3 check
  while(currentylyShowing[0] === currentylyShowing[2] || currentylyShowing[1] === currentylyShowing[2] || Product.justViewed.indexOf(currentylyShowing[2]) !== -1) {
    console.error('duplicate, re-run');
    currentylyShowing[2] = makeRandom();
  }
  //DOM
  for(var i = 0; i < 3; i++) {
    Product.pics[i].src = Product.allProducts[currentylyShowing[i]].src;
    Product.pics[i].id = Product.allProducts[currentylyShowing[i]].name;
    Product.allProducts[currentylyShowing[i]].views += 1;
    Product.justViewed[i] = currentylyShowing[i];
  }
}

function handleClick(event) {
  console.log(Product.totalClicks, 'total clicks');
  Product.totalClicks += 1;
  if(Product.totalClicks > 24) {
    Product.container.removeEventListener('click', handleClick);
    showTally();
  }
  if(event.target.id === 'images') {
    return alert('Please select an image.');
  }
  for(var i = 0; i < Product.allProducts.length; i++) {
    if(event.target.id === Product.allProducts[i].name) {
      Product.allProducts[i].votes += 1;
      console.log(event.target.id + ' has ' + Product.allProducts[i].votes + ' votes in ' + Product.allProducts[i].views + ' views.');
    }
  }
  displayPic();
}

//tally products
function showTally() {
  for(var i = 0; i < Product.allProducts.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = Product.allProducts[i].name + ' has ' + Product.allProducts[i].votes + ' votes in ' + Product.allProducts[i].views + ' views.';
    Product.tally.appendChild(liEl);
  }
}

//event listener
Product.container.addEventListener('click', handleClick);
displayPic();