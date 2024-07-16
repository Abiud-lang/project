// URL of the API endpoint
const url = "http://localhost:3000/products";

function fetchProducts() {
  fetch(url)
  .then(res => res.json())
  .then (products => {
    const container = document.querySelector('.jersey-container')
    products.map(product => {
      const jerseyDiv = document.createElement('div');
      jerseyDiv.className = 'jersey';

      const jerseyImg = document.createElement('img');
      jerseyImg.src = product.jersey.image;
      jerseyImg.alt = `${product.team} Jersey`;

      const jerseyTeam = document.createElement('h3');
      jerseyTeam.textContent = product.team;

      const jerseyPrice = document.createElement('p');
      jerseyPrice.textContent = `Price: Ksh ${product.jersey.price.toFixed(2)}`;

      const jerseySize = document.createElement('p');
      jerseySize.textContent = `Sizes: ${product.jersey.size.join(', ')}`;

      const jerseyQuantity =document.createElement('p')
      jerseyQuantity.textContent = 'plus'

      const btn = document.createElement('button')
      btn.textContent = 'Add to cart'

      jerseyDiv.appendChild(jerseyImg);
      jerseyDiv.appendChild(jerseyTeam);
      jerseyDiv.appendChild(jerseyPrice);
      jerseyDiv.appendChild(jerseySize);
      jerseyDiv.appendChild(btn)

      container.appendChild(jerseyDiv);

    } )
    
    
  })
}
fetchProducts()