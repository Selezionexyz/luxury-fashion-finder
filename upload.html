/**
 * catalog-excel.js - Module d'intégration Excel pour Luxury Fashion Finder
 * Gère l'import, la conversion et la recherche dans les catalogues Excel
 */

class ExcelCatalogManager {
    constructor() {
        this.storageKey = 'luxuryProducts';
        this.historyKey = 'importHistory';
        this.brandMappings = {
            'GUCCI': ['gucci', 'guccio gucci'],
            'LOUIS_VUITTON': ['louis vuitton', 'lv', 'vuitton'],
            'HERMES': ['hermès', 'hermes'],
            'CHANEL': ['chanel', 'coco chanel'],
            'DIOR': ['dior', 'christian dior'],
            'PRADA': ['prada'],
            'BALENCIAGA': ['balenciaga'],
            'SAINT_LAURENT': ['saint laurent', 'ysl', 'yves saint laurent'],
            'CP_COMPANY': ['cp company', 'c.p. company', 'cp'],
            'STONE_ISLAND': ['stone island', 'stone'],
            'MONCLER': ['moncler']
        };
    }

    /**
     * Charge tous les produits depuis le localStorage et les fichiers JSON
     */
    async loadAllProducts() {
        const products = [];
        
        // 1. Charger les produits depuis les fichiers JSON existants
        try {
            const jsonProducts = await this.loadJSONProducts();
            products.push(...jsonProducts);
        } catch (error) {
            console.error('Erreur lors du chargement des fichiers JSON:', error);
        }
        
        // 2. Charger les produits depuis le localStorage (imports Excel)
        const storedData = this.getStoredProducts();
        Object.values(storedData).forEach(brandData => {
            if (brandData.products) {
                products.push(...brandData.products);
            }
        });
        
        return products;
    }

    /**
     * Charge les produits depuis les fichiers JSON
     */
    async loadJSONProducts() {
        const products = [];
        const dataFiles = ['data/cp-company.json'];
        
        const promises = dataFiles.map(file => 
            fetch(file)
                .then(response => response.json())
                .catch(error => {
                    console.error(`Erreur lors du chargement de ${file}:`, error);
                    return null;
                })
        );
        
        const results = await Promise.all(promises);
        
        results.forEach(data => {
            if (data && data.products) {
                data.products.forEach(product => {
                    products.push({
                        ...product,
                        brand: data.brand,
                        source: 'json'
                    });
                });
            }
        });
        
        return products;
    }

    /**
     * Récupère les produits stockés dans le localStorage
     */
    getStoredProducts() {
        return JSON.parse(localStorage.getItem(this.storageKey) || '{}');
    }

    /**
     * Recherche intelligente dans les produits
     */
    searchProducts(query, products) {
        const searchTerms = query.toLowerCase().split(' ');
        const results = [];
        
        products.forEach(product => {
            let score = 0;
            
            // Vérifier chaque terme de recherche
            searchTerms.forEach(term => {
                // Recherche dans le nom
                if (product.name && product.name.toLowerCase().includes(term)) {
                    score += 10;
                }
                
                // Recherche dans la référence
                if (product.reference && product.reference.toLowerCase().includes(term)) {
                    score += 8;
                }
                
                // Recherche dans la catégorie
                if (product.category && product.category.toLowerCase().includes(term)) {
                    score += 5;
                }
                if (product.category_fr && product.category_fr.toLowerCase().includes(term)) {
                    score += 5;
                }
                
                // Recherche dans la marque
                if (product.brand && product.brand.toLowerCase().includes(term)) {
                    score += 7;
                }
                
                // Recherche dans la couleur
                if (product.color && product.color.toLowerCase().includes(term)) {
                    score += 3;
                }
                if (product.color_name && product.color_name.toLowerCase().includes(term)) {
                    score += 3;
                }
                
                // Recherche de marque avec synonymes
                Object.entries(this.brandMappings).forEach(([brand, synonyms]) => {
                    if (synonyms.some(syn => syn.includes(term))) {
                        if (product.brand === brand) {
                            score += 7;
                        }
                    }
                });
            });
            
            if (score > 0) {
                results.push({ product, score });
            }
        });
        
        // Trier par score décroissant
        results.sort((a, b) => b.score - a.score);
        
        return results.map(r => r.product);
    }

    /**
     * Recherche par question naturelle
     */
    answerQuestion(question, products) {
        const q = question.toLowerCase();
        
        // Patterns de questions
        const patterns = {
            // Y a-t-il X ?
            existence: /(?:y a-t-il|avez-vous|existe-t-il|as-tu|est-ce qu'il y a)/i,
            // Combien de X ?
            count: /(?:combien|nombre|quantité)/i,
            // Quel est le prix de X ?
            price: /(?:prix|coût|combien coûte|tarif)/i,
            // Quelles tailles pour X ?
            sizes: /(?:taille|size|pointure)/i,
            // Quelle couleur pour X ?
            colors: /(?:couleur|color|teinte)/i
        };
        
        let response = {
            found: false,
            message: '',
            products: []
        };
        
        // Détecter le type de question
        if (patterns.existence.test(q)) {
            // Extraire le produit recherché
            const productMatch = q.match(/(?:y a-t-il|avez-vous|existe-t-il|as-tu|est-ce qu'il y a)\s+(?:un|une|des|de la|du)?\s*(.+?)(?:\s*\?|$)/i);
            
            if (productMatch) {
                const searchTerm = productMatch[1].trim();
                const results = this.searchProducts(searchTerm, products);
                
                if (results.length > 0) {
                    response.found = true;
                    response.products = results;
                    
                    if (results.length === 1) {
                        const p = results[0];
                        response.message = `Oui, nous avons ${p.name} de ${p.brand} en stock. Prix: ${p.price_cost || p.price_retail}€`;
                    } else {
                        response.message = `Oui, nous avons ${results.length} produits correspondant à "${searchTerm}".`;
                    }
                } else {
                    response.message = `Désolé, nous n'avons pas de "${searchTerm}" en stock actuellement.`;
                }
            }
        } else if (patterns.count.test(q)) {
            // Compter les produits
            const categoryMatch = q.match(/combien\s+(?:de|d')?\s*(.+?)(?:\s*\?|$)/i);
            
            if (categoryMatch) {
                const searchTerm = categoryMatch[1].trim();
                const results = this.searchProducts(searchTerm, products);
                
                response.found = results.length > 0;
                response.products = results;
                response.message = `Nous avons ${results.length} ${searchTerm} en stock.`;
            }
        } else if (patterns.price.test(q)) {
            // Prix d'un produit
            const productMatch = q.match(/prix\s+(?:de|du|des|d')?\s*(.+?)(?:\s*\?|$)/i);
            
            if (productMatch) {
                const searchTerm = productMatch[1].trim();
                const results = this.searchProducts(searchTerm, products);
                
                if (results.length > 0) {
                    response.found = true;
                    response.products = results;
                    
                    if (results.length === 1) {
                        const p = results[0];
                        response.message = `Le prix de ${p.name} est de ${p.price_cost || p.price_retail}€.`;
                    } else {
                        const prices = results.map(p => p.price_cost || p.price_retail);
                        const minPrice = Math.min(...prices);
                        const maxPrice = Math.max(...prices);
                        response.message = `Les prix varient de ${minPrice}€ à ${maxPrice}€ pour "${searchTerm}".`;
                    }
                }
            }
        } else {
            // Recherche générale
            const results = this.searchProducts(q, products);
            
            if (results.length > 0) {
                response.found = true;
                response.products = results;
                response.message = `J'ai trouvé ${results.length} produit(s) correspondant à votre recherche.`;
            } else {
                response.message = `Je n'ai pas trouvé de produits correspondant à "${q}".`;
            }
        }
        
        return response;
    }

    /**
     * Convertit les données Excel importées au format standard
     */
    normalizeExcelData(excelData, brand) {
        // Détection automatique du format
        const format = this.detectExcelFormat(excelData);
        
        switch (format) {
            case 'standard':
                return this.convertStandardFormat(excelData, brand);
            case 'custom':
                return this.convertCustomFormat(excelData, brand);
            default:
                throw new Error('Format de fichier non reconnu');
        }
    }

    /**
     * Détecte le format du fichier Excel
     */
    detectExcelFormat(data) {
        if (!data || data.length < 2) return 'unknown';
        
        const headers = data[0].map(h => h ? h.toString().toLowerCase() : '');
        
        // Format standard : référence, nom, catégorie, prix
        if (headers.some(h => h.includes('référence')) && 
            headers.some(h => h.includes('nom')) &&
            headers.some(h => h.includes('prix'))) {
            return 'standard';
        }
        
        // Format personnalisé : à adapter selon vos besoins
        return 'custom';
    }

    /**
     * Convertit le format standard
     */
    convertStandardFormat(data, brand) {
        const headers = data[0].map(h => h ? h.toString().toLowerCase() : '');
        const products = [];
        
        // Mapper les colonnes
        const columnMap = {
            reference: headers.findIndex(h => h.includes('référence') || h.includes('ref') || h.includes('sku')),
            name: headers.findIndex(h => h.includes('nom') || h.includes('name') || h.includes('produit') || h.includes('article')),
            category: headers.findIndex(h => h.includes('catégorie') || h.includes('category') || h.includes('type')),
            price_retail: headers.findIndex(h => h.includes('prix achat') || h.includes('prix revient') || h.includes('cost')),
            price_cost: headers.findIndex(h => h.includes('prix vente') || h.includes('prix') || h.includes('price')),
            color: headers.findIndex(h => h.includes('couleur') || h.includes('color')),
            sizes: headers.findIndex(h => h.includes('taille') || h.includes('size')),
            quantity: headers.findIndex(h => h.includes('quantité') || h.includes('quantity') || h.includes('stock'))
        };
        
        // Parcourir les lignes
        for (let i = 1; i < data.length; i++) {
            const row = data[i];
            if (!row || row.length === 0) continue;
            
            const product = {
                id: `${brand}_EXCEL_${i}`,
                brand: brand,
                reference: row[columnMap.reference] || `${brand}_${i}`,
                name: row[columnMap.name] || 'Produit sans nom',
                category: row[columnMap.category] || 'Non catégorisé',
                category_fr: this.translateCategory(row[columnMap.category]),
                price_retail: parseFloat(row[columnMap.price_retail]) || 0,
                price_cost: parseFloat(row[columnMap.price_cost]) || 0,
                currency: 'EUR',
                color_name: row[columnMap.color] || '',
                sizes_available: this.parseSizes(row[columnMap.sizes]),
                quantity_total: parseInt(row[columnMap.quantity]) || 0,
                source: 'excel',
                active: true,
                imported_at: new Date().toISOString()
            };
            
            // Valider le produit
            if (product.reference && product.name !== 'Produit sans nom') {
                products.push(product);
            }
        }
        
        return products;
    }

    /**
     * Parse les tailles
     */
    parseSizes(sizeString) {
        if (!sizeString) return ['UNI'];
        
        const sizes = sizeString.toString()
            .split(/[,;\/]/)
            .map(s => s.trim())
            .filter(s => s);
        
        return sizes.length > 0 ? sizes : ['UNI'];
    }

    /**
     * Traduit les catégories
     */
    translateCategory(category) {
        if (!category) return 'Non catégorisé';
        
        const translations = {
            'bag': 'Sacs',
            'bags': 'Sacs',
            'sac': 'Sacs',
            'sweat': 'Sweats',
            'sweater': 'Sweats',
            'hoodie': 'Sweats',
            'jacket': 'Vestes',
            'veste': 'Vestes',
            'coat': 'Manteaux',
            'pants': 'Pantalons',
            'pantalon': 'Pantalons',
            'jeans': 'Jeans',
            'shirt': 'Chemises',
            'tshirt': 'T-shirts',
            't-shirt': 'T-shirts',
            'shoes': 'Chaussures',
            'sneakers': 'Baskets',
            'accessories': 'Accessoires'
        };
        
        const categoryLower = category.toLowerCase();
        
        for (const [key, value] of Object.entries(translations)) {
            if (categoryLower.includes(key)) {
                return value;
            }
        }
        
        return category;
    }

    /**
     * Exporte les produits au format Excel
     */
    exportToExcel(brand = null) {
        const products = brand ? 
            this.getStoredProducts()[brand]?.products || [] :
            Object.values(this.getStoredProducts()).flatMap(b => b.products || []);
        
        if (products.length === 0) {
            alert('Aucun produit à exporter');
            return;
        }
        
        // Créer les données pour Excel
        const headers = [
            'Référence', 'Nom', 'Marque', 'Catégorie', 
            'Prix Revient', 'Prix Vente', 'Couleur', 
            'Tailles', 'Quantité'
        ];
        
        const rows = products.map(p => [
            p.reference,
            p.name,
            p.brand,
            p.category_fr || p.category,
            p.price_retail,
            p.price_cost,
            p.color_name || p.color,
            Array.isArray(p.sizes_available) ? p.sizes_available.join(', ') : p.sizes_available,
            p.quantity_total
        ]);
        
        // Créer le workbook
        const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Produits');
        
        // Télécharger le fichier
        const fileName = brand ? `catalogue_${brand}_${new Date().toISOString().split('T')[0]}.xlsx` : 
                                `catalogue_complet_${new Date().toISOString().split('T')[0]}.xlsx`;
        XLSX.writeFile(wb, fileName);
    }
}

// Intégration avec le système existant
const excelManager = new ExcelCatalogManager();

// Override de la fonction loadProducts existante
const originalLoadProducts = window.loadProducts;
window.loadProducts = async function() {
    try {
        // Charger tous les produits (JSON + Excel)
        allProducts = await excelManager.loadAllProducts();
        filteredProducts = [...allProducts];
        
        console.log(`${allProducts.length} produits chargés (JSON + Excel)`);
        
        // Mettre à jour les options de marque
        updateBrandOptions();
        
    } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
        showNoResults('Erreur lors du chargement des produits');
    }
};

// Ajouter la fonction de recherche par question
window.answerProductQuestion = function(question) {
    const response = excelManager.answerQuestion(question, allProducts);
    
    if (response.found) {
        // Afficher les produits trouvés
        filteredProducts = response.products;
        renderProducts();
        
        // Afficher le message
        const resultsTitle = document.getElementById('resultsTitle');
        resultsTitle.textContent = response.message;
    } else {
        // Afficher le message d'erreur
        showNoResults(response.message);
    }
    
    return response;
};

// Export des fonctions pour utilisation externe
window.ExcelCatalogManager = ExcelCatalogManager;
window.excelManager = excelManager;
