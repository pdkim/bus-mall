'use strict';

var maxClicks = 0;
var repeat = false;

//images
Product.allProducts = [];

var prevImages = [];
var currentImages = [];

function Product(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  this.totalClicks = 0;
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

var images = document.getElementById('images');
images.addEventListener('click', randomPic);

// imgEl.addEventListener('click', randomPic);
// imgEl2.addEventListener('click', randomPic);
// imgEl3.addEventListener('click', randomPic);

function randomPic() {
  var imgEl = document.getElementById('image' + (i + 1));
  for(var i = 0; i < 3; i++) {
    var randomIndex = Math.floor(Math.random() * Product.allProducts.length);
    imgEl = document.getElementById('image' + (i + 1));
    imgEl.src = Product.allProducts[randomIndex].filepath;
    if(imgEl === currentImages.imgEl[i]) {
      repeat = true;
    }
    if(imgEl === prevImages.imgEl[i]) {
      repeat = true;
    }
    if(repeat === true) {
      i--;
    }
    else {
      currentImages.push(imgEl.src);
    }
    if(currentImages.length === 3) {
      prevImages = currentImages;
      currentImages = [];
    }
  }
  imgEl.onclick = function (randomIndex) {
    Product.allProducts[randomIndex].totalClicks++;
  };
  if(maxClicks !== 25) {
    reachedClicks();
    render();
  } else {
    maxClicks++;
  }
}

//prevent repeating images within all 3 slots.
// if(randomIndex === randomIndex2 || randomIndex === randomIndex3) {
//   randomPic();
// }
// else if(randomIndex2 === randomIndex || randomIndex2 === randomIndex3) {
//   randomPic();
// }
//attempt to stop back to back images within same column
// prevImages = [imgEl.src, imgEl2.src, imgEl3.src];
// for(var i = 0; i < prevImages[i]; i++) {
//   if(imgEl.src === prevImages.imgEl.src[i] || imgEl2.src === prevImages.imgEl2.src[i] || imgEl3.src === prevImages.imgEl3.src[i]) {
//     randomPic();
//   }
//   else {
//     imgEl.src.push(prevImages);
//     imgEl2.src.push(prevImages);
//     imgEl3.src.push(prevImages);
//   }
// }
//stop after 25 clicks
// function stopClicks() {
// if(maxClicks !== 25) {
//   reachedClicks();
//   render();
// } else {
//   maxClicks++;
// }
// console.log(maxClicks);
// }
// stopClicks();
//}

randomPic();
console.log(randomPic);

//clicks and render functions
function reachedClicks() {
  images.removeEventListener('click', randomPic);
  // imgEl.removeEventListener('click', randomPic, true);
  // imgEl2.removeEventListener('click', randomPic, true);
  // imgEl3.removeEventListener('click', randomPic, true);
}

function render() {
  for(var k = 0; k < Product.allProducts.length; k++) {
    var final = document.getElementById('final');
    var liEl = document.createElement('li');
    liEl.textContent = Product.allProducts[k].name + 'got ' + Product.allProducts[k].totalClicks + ' votes!';
    final.appendChild(liEl);
  }
}