'use strict';

Product.allProducts = [];
Product.container = document.getElementById('images');
Product.justViewed = [];
Product.pics = [document.getElementById('img1'), document.getElementById('img2'), document.getElementById('img3')];
Product.tally = document.getElementById('final');
Product.totalClicks = 0;

//data array for chart
var voteData = [];
var viewData = [];
var dataNames = [];

function Product(name, filepath) {
  this.name = name;
  this.path = filepath;
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
  var currentlyShowing = [];
  //img1 check
  currentlyShowing[0] = makeRandom();
  while(Product.justViewed.indexOf(currentlyShowing[0]) !== -1) {
    console.error('duplicate, re-run');
    currentlyShowing[0] = makeRandom();
  }
  //img2 check
  currentlyShowing[1] = makeRandom();
  while(currentlyShowing[0] === currentlyShowing[1] || Product.justViewed.indexOf(currentlyShowing[1]) !== -1) {
    console.error('duplicate, re-run');
    currentlyShowing[1] = makeRandom();
  }
  //img3 check
  currentlyShowing[2] = makeRandom();
  while(currentlyShowing[0] === currentlyShowing[2] || currentlyShowing[1] === currentlyShowing[2] || Product.justViewed.indexOf(currentlyShowing[2]) !== -1) {
    console.error('duplicate, re-run');
    currentlyShowing[2] = makeRandom();
  }
  //DOM
  for(var i = 0; i < 3; i++) {
    Product.pics[i].src = Product.allProducts[currentlyShowing[i]].path;
    Product.pics[i].id = Product.allProducts[currentlyShowing[i]].name;
    Product.allProducts[currentlyShowing[i]].views += 1;
    Product.justViewed[i] = currentlyShowing[i];
  }
}

function handleClick(event) {
  console.log(Product.totalClicks, 'total clicks');
  Product.totalClicks += 1;
  if(Product.totalClicks > 24) {
    Product.container.removeEventListener('click', handleClick);
    showTally();
    makeChart();
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
  //set local storage data
  var strProducts = JSON.stringify(Product.allProducts);
  localStorage.setItem('products', strProducts);
  displayPic();
}

//function to make chart
function makeChart() {
  for(var i = 0; i < Product.allProducts.length; i++) {
    //add data to chart data array
    dataNames.push(Product.allProducts[i].name);
    voteData.push(Product.allProducts[i].votes);
    viewData.push(Product.allProducts[i].views);
  }
  var ctx = document.getElementById('bars').getContext('2d');

  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',
    // The data for our dataset
    data: {
      labels: dataNames,
      datasets: [{
        label: 'Number of Votes',
        backgroundColor: '#7cff71',
        borderColor: '#403e36',
        data: voteData,
      },
      {
        label: 'Number of Views',
        backgroundColor: '#ffc875',
        borderColor: '#403e36',
        data: viewData,
      }]
    },
    // Configuration options go here
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
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

//get storage data
(function getLocalStorage() {
  if(localStorage.products) {
    var strProducts = localStorage.getItem('products');
    var products = JSON.parse(strProducts);
    console.log(products);
  }
})();

displayPic();