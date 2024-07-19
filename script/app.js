const url = "https://phase-1-project-self.vercel.app/products";

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    setupAddForm();
});

function fetchProducts() {
    fetch(url)
        .then(res => res.json())
        .then(products => {
            const container = document.querySelector('.jersey-container');
            container.innerHTML = ''; 

            products.map(product => {
                renderJersey(product, container);
            });
        })
        
}

function renderJersey(product, container) {
    const jerseyDiv = document.createElement('div');
    jerseyDiv.className = 'jersey';

    const jerseyImg = document.createElement('img');
    jerseyImg.src = product.jersey.image;
    jerseyImg.alt = `${product.team} Jersey`;

    const jerseyTeam = document.createElement('h3');
    jerseyTeam.textContent = product.team;

    const jerseyNumber = document.createElement('p');
    jerseyNumber.textContent = `Number: ${product.jersey.number}`;


    jerseyDiv.appendChild(jerseyImg);
    jerseyDiv.appendChild(jerseyTeam);
    jerseyDiv.appendChild(jerseyNumber);


    container.appendChild(jerseyDiv);
}

function setupAddForm() {
    const addForm = document.querySelector('.add-jersey-form');

    addForm.addEventListener('submit', event => {
        event.preventDefault();
        

        const newJersey = {
            team: document.getElementById('team').value,
            jersey: {
                image: document.getElementById('image').value,
                number: document.getElementById('number').value
            }
        };

        addJersey(newJersey);
        addForm.reset();
         
    });
}

function addJersey( newJersey) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newJersey)
    })
    .then(response => response.json())
    .then(() => {
        fetchProducts();
        
        
       
    
        
    })
  
}



