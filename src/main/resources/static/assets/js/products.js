async function loadProducts() {
    try {
      const response = await fetch('/api/products');
      const products = await response.json();
      const productsList = document.getElementById('productsList');
      productsList.innerHTML = '';
      if (products.length === 0) {
        productsList.innerHTML = '<p class="text-center">Aucun produit trouvé.</p>';
        return;
      }
      products.forEach(product => {
        const col = document.createElement('div');
        col.className = 'col-md-4';
        col.innerHTML = `
          <div class="card shadow-sm">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">${product.description}</p>
              <p class="card-text"><strong>Prix:</strong> ${product.price} €</p>
            </div>
          </div>
        `;
        productsList.appendChild(col);
      });
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error);
    }
  }
  
  document.getElementById('addProductBtn')?.addEventListener('click', () => {
    const addProductModal = new bootstrap.Modal(document.getElementById('addProductModal'));
    addProductModal.show();
  });
  
  document.getElementById('addProductForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('productName').value;
    const description = document.getElementById('productDescription').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description, price })
      });
      if (response.ok) {
        loadProducts();
        const modal = bootstrap.Modal.getInstance(document.getElementById('addProductModal'));
        modal.hide();
      } else {
        const errorMsg = await response.text();
        alert('Erreur lors de l\'ajout du produit: ' + errorMsg);
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du produit:', error);
    }
  });
  
  document.getElementById('searchInput')?.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const cards = document.querySelectorAll('#productsList .card');
    cards.forEach(card => {
      const title = card.querySelector('.card-title').innerText.toLowerCase();
      card.parentElement.style.display = title.includes(query) ? 'block' : 'none';
    });
  });
  