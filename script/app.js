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
            container.innerHTML = ''; // Clear previous content

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

    const jerseySize = document.createElement('p');
    jerseySize.textContent = `Sizes: ${product.jersey.size.join(', ')}`;

   


    jerseyDiv.appendChild(jerseyImg);
    jerseyDiv.appendChild(jerseyTeam);
    jerseyDiv.appendChild(jerseyNumber);
    jerseyDiv.appendChild(jerseySize);
    

    container.appendChild(jerseyDiv);
}

function setupAddForm() {
    const addForm = document.querySelector('.add-jersey-form');

    addForm.addEventListener('submit', event => {
        event.preventDefault();

        const formData = new FormData(addForm);
        const newJersey = {
            team: formData.get('team'),
            jersey: {
                image: formData.get('image'),
                number: formData.get('number'), // Capture the number field
                size: formData.get('size').split(',').map(size => size.trim())
            }
        };

        addJersey(newJersey);
    });
}

function addJersey(newJersey) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newJersey)
    })
    .then(response => response.json())
    .then(() => {
        fetchProducts(); // Refresh the product list after adding
        clearAddForm();
        alert('Jersey added successfully!');
    
        
    })
  
}


function clearAddForm() {
    document.querySelector('.add-jersey-form').reset();
}
