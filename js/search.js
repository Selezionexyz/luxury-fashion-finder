/**
 * search.js - Moteur de recherche intelligent
 * Luxury Fashion Finder
 */

// Mots-clés et synonymes pour améliorer la recherche
const searchMappings = {
    // Catégories
    'sac': ['sac', 'sacoche', 'bandoulière', 'borse', 'bag'],
    'sweat': ['sweat', 'hoodie', 'pull', 'felpe', 'sweater'],
    'veste': ['veste', 'jacket', 'giacche', 'blazer'],
    'blouson': ['blouson', 'bomber', 'giubbotti', 'doudoune'],
    'pantalon': ['pantalon', 'pants', 'pantaloni', 'jean', 'jeans'],
    'tshirt': ['tshirt', 't-shirt', 'tee', 'maglia'],
    
    // Couleurs
    'noir': ['noir', 'black', 'nero', '094'],
    'blanc': ['blanc', 'white', 'bianco', '098'],
    'gris': ['gris', 'grey', 'gray', 'grigio', '096', '999'],
    
    // Tailles
    'petit': ['petit', 'small', 'xs', 's', 'xxs', 'xxxs'],
    'moyen': ['moyen', 'medium', 'm'],
    'grand': ['grand', 'large', 'big', 'l', 'xl', 'xxl', 'xxxl'],
    
    // Prix
    'pas cher': ['pas cher', 'cheap', 'économique', 'abordable'],
    'luxe': ['luxe', 'luxury', 'premium', 'cher', 'expensive']
};

/**
 * Recherche intelligente avec suggestions
 */
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.toLowerCase().trim();
    
    if (!query) return;
    
    // Analyser la requête
    const searchIntent = analyzeSearchQuery(query);
    
    // Appliquer les filtres selon l'intention
    if (searchIntent.category) {
        // Activer le filtre de catégorie correspondant
        const categoryChip = document.querySelector(`[data-filter="${searchIntent.category}"]`);
        if (categoryChip) {
            categoryChip.click();
        }
    }
    
    if (searchIntent.brand) {
        document.getElementById('brandFilter').value = searchIntent.brand;
        handleBrandFilter({ target: { value: searchIntent.brand } });
    }
    
    if (searchIntent.size) {
        document.getElementById('sizeFilter').value = searchIntent.size;
        handleSizeFilter({ target: { value: searchIntent.size } });
    }
    
    if (searchIntent.maxPrice) {
        document.getElementById('priceRange').value = searchIntent.maxPrice;
        document.getElementById('priceValue').textContent = `${searchIntent.maxPrice} €`;
        handlePriceFilter(searchIntent.maxPrice);
    }
    
    // Si aucun filtre spécifique, faire une recherche textuelle
    if (!searchIntent.category && !searchIntent.brand && !searchIntent.size && !searchIntent.maxPrice) {
        currentFilters.search = query;
        applyFilters();
    }
}

/**
 * Analyse la requête de recherche pour comprendre l'intention
 */
function analyzeSearchQuery(query) {
    const intent = {
        category: null,
        brand: null,
        size: null,
        maxPrice: null,
        keywords: []
    };
    
    const words = query.split(' ');
    
    // Analyser chaque mot
    words.forEach(word => {
        // Vérifier les catégories
        for (const [key, synonyms] of Object.entries(searchMappings)) {
            if (synonyms.some(syn => word.includes(syn))) {
                if (key === 'sac') intent.category = 'Borse a tracolla';
                else if (key === 'sweat') intent.category = 'Felpe';
                else if (key === 'veste') intent.category = 'Giacche';
                else if (key === 'blouson') intent.category = 'Giubbotti e Bomber';
                else if (key === 'pantalon') intent.category = 'Pantaloni';
                else if (key === 'tshirt') intent.category = 'T-shirt';
            }
        }
        
        // Vérifier les marques
        if (word.includes('cp') || word.includes('company')) {
            intent.brand = 'C.P. COMPANY';
        }
        
        // Vérifier les tailles
        const sizePattern = /^(xxxs|xxs|xs|s|m|l|xl|xxl|xxxl|38|40|42|44|46|48|50|52|54)$/i;
        if (sizePattern.test(word)) {
            intent.size = word.toUpperCase();
        }
        
        // Vérifier "taille X"
        if (word === 'taille' && words.indexOf(word) < words.length - 1) {
            const nextWord = words[words.indexOf(word) + 1];
            if (sizePattern.test(nextWord)) {
                intent.size = nextWord.toUpperCase();
            }
        }
        
        // Vérifier les prix
        if (word.includes('€') || word.match(/^\d+$/)) {
            const price = parseInt(word.replace('€', ''));
            if (!isNaN(price) && price > 0 && price < 10000) {
                intent.maxPrice = price;
            }
        }
        
        // Prix avec "moins de"
        if (query.includes('moins de')) {
            const priceMatch = query.match(/moins de (\d+)/);
            if (priceMatch) {
                intent.maxPrice = parseInt(priceMatch[1]);
            }
        }
        
        // Mots-clés généraux
        intent.keywords.push(word);
    });
    
    return intent;
}

/**
 * Suggestions de recherche en temps réel
 */
function setupSearchSuggestions() {
    const searchInput = document.getElementById('searchInput');
    
    // Créer le conteneur de suggestions
    const suggestionsContainer = document.createElement('div');
    suggestionsContainer.className = 'search-suggestions';
    suggestionsContainer.style.display = 'none';
    searchInput.parentElement.appendChild(suggestionsContainer);
    
    // Afficher les suggestions pendant la frappe
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length < 2) {
            suggestionsContainer.style.display = 'none';
            return;
        }
        
        const suggestions = generateSuggestions(query);
        
        if (suggestions.length > 0) {
            suggestionsContainer.innerHTML = suggestions
                .map(s => `<div class="suggestion" onclick="applySuggestion('${s}')">${s}</div>`)
                .join('');
            suggestionsContainer.style.display = 'block';
        } else {
            suggestionsContainer.style.display = 'none';
        }
    });
    
    // Cacher les suggestions quand on clique ailleurs
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
            suggestionsContainer.style.display = 'none';
        }
    });
}

/**
 * Génère des suggestions basées sur la requête
 */
function generateSuggestions(query) {
    const suggestions = [];
    
    // Suggestions de catégories
    const categories = [
        'Sacs bandoulière',
        'Sweats',
        'Vestes',
        'Blousons',
        'Pantalons',
        'T-shirts'
    ];
    
    categories.forEach(cat => {
        if (cat.toLowerCase().includes(query)) {
            suggestions.push(cat);
        }
    });
    
    // Suggestions de marques
    const brands = [...new Set(allProducts.map(p => p.brand))];
    brands.forEach(brand => {
        if (brand.toLowerCase().includes(query)) {
            suggestions.push(brand);
        }
    });
    
    // Suggestions de recherches populaires
    const popularSearches = [
        'Pantalon taille 46',
        'Sweat blanc',
        'Veste grise',
        'Moins de 300€',
        'C.P. Company sac'
    ];
    
    popularSearches.forEach(search => {
        if (search.toLowerCase().includes(query) && !suggestions.includes(search)) {
            suggestions.push(search);
        }
    });
    
    return suggestions.slice(0, 5); // Limiter à 5 suggestions
}

/**
 * Applique une suggestion
 */
function applySuggestion(suggestion) {
    document.getElementById('searchInput').value = suggestion;
    document.querySelector('.search-suggestions').style.display = 'none';
    performSearch();
}

// Initialiser les suggestions au chargement
document.addEventListener('DOMContentLoaded', () => {
    setupSearchSuggestions();
});

// Style pour les suggestions (à ajouter au CSS)
const style = document.createElement('style');
style.textContent = `
    .search-suggestions {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border: 1px solid #ccc;
        border-top: none;
        max-height: 200px;
        overflow-y: auto;
        z-index: 100;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    
    .suggestion {
        padding: 10px 15px;
        cursor: pointer;
        transition: background-color 0.2s;
    }
    
    .suggestion:hover {
        background-color: #f5f5f5;
    }
    
    .search-box {
        position: relative;
    }
`;
document.head.appendChild(style);
