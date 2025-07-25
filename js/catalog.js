/**
 * catalog.js - Gestion du catalogue de produits
 * Luxury Fashion Finder
 */

// État global de l'application
let allProducts = [];
let filteredProducts = [];
let currentFilters = {
    search: '',
    category: 'all',
    brand: '',
    size: '',
    maxPrice: 2000
};

// Au chargement de la page
document.addEventListener('DOMContentLoaded', async () => {
    await loadProducts();
    setupEventListeners();
    renderProducts();
});

/**
 * Charge tous les produits depuis les fichiers JSON
 */
async function loadProducts() {
    try {
        // Liste des fichiers de données à charger
        const dataFiles = [
            'data/cp-company.json'
            // Ajoutez d'autres marques ici : 'data/gucci.json', etc.
        ];
        
        // Charger tous les fichiers en parallèle
        const promises = dataFiles.map(file => 
            fetch(file)
                .then(response => response.json())
                .catch(error => {
                    console.error(`Erreur lors du chargement de ${file}:`, error);
                    return null;
                })
        );
        
        const results = await Promise.all(promises);
        
        // Combiner tous les produits
        allProducts = [];
        results.forEach(data => {
            if (data && data.products) {
                data.products.forEach(product => {
                    allProducts.push({
                        ...product,
                        brand: data.brand
                    });
                });
            }
        });
        
        filteredProducts = [...allProducts];
        console.log(`${allProducts.length} produits chargés`);
        
        // Mettre à jour les options de marque
        updateBrandOptions();
        
    } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
        showNoResults('Erreur lors du chargement des produits');
    }
}

/**
 * Configure les écouteurs d'événements
 */
function setupEventListeners() {
    // Recherche
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', debounce(handleSearch, 300));
    
    // Filtres rapides (catégories)
    document.querySelectorAll('.filter-chip').forEach(chip => {
        chip.addEventListener('click', handleCategoryFilter);
    });
    
    // Filtre marque
    document.getElementById('brandFilter').addEventListener('change', handleBrandFilter);
    
    // Filtre taille
    document.getElementById('sizeFilter').addEventListener('change', handleSizeFilter);
    
    // Filtre prix
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    priceRange.addEventListener('input', (e) => {
        priceValue.textContent = `${e.target.value} €`;
        handlePriceFilter(e.target.value);
    });
}

/**
 * Gère la recherche
 */
function handleSearch(e) {
    currentFilters.search = e.target.value.toLowerCase();
    applyFilters();
}

/**
 * Gère le filtre par catégorie
 */
function handleCategoryFilter(e) {
    // Retirer la classe active de tous les chips
    document.querySelectorAll('.filter-chip').forEach(chip => {
        chip.classList.remove('active');
    });
    
    // Ajouter la classe active au chip cliqué
    e.target.classList.add('active');
    
    currentFilters.category = e.target.dataset.filter;
    applyFilters();
}

/**
 * Gère le filtre par marque
 */
function handleBrandFilter(e) {
    currentFilters.brand = e.target.value;
    applyFilters();
}

/**
 * Gère le filtre par taille
 */
function handleSizeFilter(e) {
    currentFilters.size = e.target.value;
    applyFilters();
}

/**
 * Gère le filtre par prix
 */
function handlePriceFilter(maxPrice) {
    currentFilters.maxPrice = parseInt(maxPrice);
    applyFilters();
}

/**
 * Applique tous les filtres actifs
 */
function applyFilters() {
    filteredProducts = allProducts.filter(product => {
        // Filtre de recherche
        if (currentFilters.search) {
            const searchTerm = currentFilters.search;
            const matchesSearch = 
                product.name.toLowerCase().includes(searchTerm) ||
                product.reference.toLowerCase().includes(searchTerm) ||
                product.category_fr.toLowerCase().includes(searchTerm) ||
                product.brand.toLowerCase().includes(searchTerm);
            
            if (!matchesSearch) return false;
        }
        
        // Filtre de catégorie
        if (currentFilters.category !== 'all') {
            if (product.category !== currentFilters.category) return false;
        }
        
        // Filtre de marque
        if (currentFilters.brand) {
            if (product.brand !== currentFilters.brand) return false;
        }
        
        // Filtre de taille
        if (currentFilters.size) {
            if (!product.sizes_available.includes(currentFilters.size)) return false;
        }
        
        // Filtre de prix
        if (product.price_cost > currentFilters.maxPrice) return false;
        
        return true;
    });
    
    renderProducts();
}

/**
 * Affiche les produits filtrés
 */
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    const count = document.getElementById('resultsCount');
    const title = document.getElementById('resultsTitle');
    
    // Mettre à jour le compte
    count.textContent = `${filteredProducts.length} produit${filteredProducts.length > 1 ? 's' : ''}`;
    
    // Mettre à jour le titre
    if (currentFilters.search) {
        title.textContent = `Résultats pour "${currentFilters.search}"`;
    } else if (currentFilters.category !== 'all') {
        const categoryName = document.querySelector(`[data-filter="${currentFilters.category}"]`).textContent;
        title.textContent = categoryName;
    } else {
        title.textContent = 'Tous les produits';
    }
    
    // Vider la grille
    grid.innerHTML = '';
    
    // Afficher les produits ou un message
    if (filteredProducts.length === 0) {
        showNoResults();
    } else {
        hideNoResults();
        filteredProducts.forEach(product => {
            grid.appendChild(createProductCard(product));
        });
    }
}

/**
 * Crée une carte produit
 */
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.onclick = () => showProductModal(product);
    
    // Image placeholder si pas d'image
    const imageUrl = product.image_url || 'images/placeholder.jpg';
    
    card.innerHTML = `
        <img src="${imageUrl}" alt="${product.name}" class="product-image" onerror="this.src='images/placeholder.jpg'">
        <div class="product-info">
            <div class="product-brand">${product.brand}</div>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-reference">${product.reference}</p>
            <p class="product-price">${product.price_cost} €</p>
            <p class="product-sizes">Tailles: ${product.sizes_available.join(', ')}</p>
        </div>
    `;
    
    return card;
}

/**
 * Affiche la modal avec les détails du produit
 */
function showProductModal(product) {
    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');
    
    const imageUrl = product.image_url || 'images/placeholder.jpg';
    
    modalBody.innerHTML = `
        <div class="modal-grid">
            <div class="modal-image-container">
                <img src="${imageUrl}" alt="${product.name}" class="modal-image" onerror="this.src='images/placeholder.jpg'">
            </div>
            <div class="modal-details">
                <h2>${product.name}</h2>
                <div class="detail-row">
                    <span class="detail-label">Marque</span>
                    <span>${product.brand}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Référence</span>
                    <span>${product.reference}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Catégorie</span>
                    <span>${product.category_fr}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Code couleur</span>
                    <span>${product.color_code} ${product.color_name ? `- ${product.color_name}` : ''}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Prix de revient</span>
                    <span>${product.price_retail} €</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Prix de vente</span>
                    <span style="color: var(--color-gold); font-weight: 600;">${product.price_cost} €</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Tailles disponibles</span>
                    <span>${product.sizes_available.join(', ')}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Quantité totale</span>
                    <span>${product.quantity_total}</span>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
}

/**
 * Ferme la modal
 */
function closeModal() {
    document.getElementById('productModal').style.display = 'none';
}

// Fermer la modal en cliquant en dehors
window.onclick = function(event) {
    const modal = document.getElementById('productModal');
    if (event.target === modal) {
        closeModal();
    }
}

/**
 * Réinitialise tous les filtres
 */
function resetFilters() {
    // Réinitialiser l'état
    currentFilters = {
        search: '',
        category: 'all',
        brand: '',
        size: '',
        maxPrice: 2000
    };
    
    // Réinitialiser l'interface
    document.getElementById('searchInput').value = '';
    document.getElementById('brandFilter').value = '';
    document.getElementById('sizeFilter').value = '';
    document.getElementById('priceRange').value = 2000;
    document.getElementById('priceValue').textContent = '2000 €';
    
    // Réinitialiser les chips de catégorie
    document.querySelectorAll('.filter-chip').forEach(chip => {
        chip.classList.remove('active');
        if (chip.dataset.filter === 'all') {
            chip.classList.add('active');
        }
    });
    
    applyFilters();
}

/**
 * Met à jour les options de marque disponibles
 */
function updateBrandOptions() {
    const brandFilter = document.getElementById('brandFilter');
    const brands = [...new Set(allProducts.map(p => p.brand))].sort();
    
    // Garder l'option par défaut
    brandFilter.innerHTML = '<option value="">Toutes les marques</option>';
    
    // Ajouter les marques
    brands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand;
        option.textContent = brand;
        brandFilter.appendChild(option);
    });
}

/**
 * Affiche le message "aucun résultat"
 */
function showNoResults(message = 'Aucun produit ne correspond à votre recherche.') {
    document.getElementById('productsGrid').style.display = 'none';
    const noResults = document.getElementById('noResults');
    noResults.querySelector('p').textContent = message;
    noResults.style.display = 'block';
}

/**
 * Cache le message "aucun résultat"
 */
function hideNoResults() {
    document.getElementById('productsGrid').style.display = 'grid';
    document.getElementById('noResults').style.display = 'none';
}

/**
 * Fonction utilitaire pour limiter la fréquence d'appel
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
