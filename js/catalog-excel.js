/**
 * catalog-excel.js - Module d'intégration Excel pour Luxury Fashion Finder
 * Gère l'import, la conversion et la recherche dans les catalogues Excel
 */

class ExcelCatalogManager {
    constructor() {
        this.storageKey = 'luxuryProducts';
        this.historyKey = 'importHistory';
        this.brandMappings = {
            // Haute Couture
            'CHANEL': ['chanel', 'coco chanel'],
            'DIOR': ['dior', 'christian dior', 'cd'],
            'HERMES': ['hermès', 'hermes'],
            'LOUIS_VUITTON': ['louis vuitton', 'lv', 'vuitton', 'louis v'],
            'GUCCI': ['gucci', 'guccio gucci', 'gg'],
            'PRADA': ['prada'],
            'SAINT_LAURENT': ['saint laurent', 'ysl', 'yves saint laurent', 'sl'],
            'CELINE': ['céline', 'celine'],
            'GIVENCHY': ['givenchy'],
            'VALENTINO': ['valentino', 'vltn'],
            'VERSACE': ['versace'],
            'ARMANI': ['armani', 'giorgio armani', 'emporio armani', 'ga'],
            'DOLCE_GABBANA': ['dolce & gabbana', 'd&g', 'dolce gabbana', 'dg'],
            'FENDI': ['fendi', 'ff'],
            'BURBERRY': ['burberry'],
            
            // Streetwear & Contemporary
            'BALENCIAGA': ['balenciaga', 'blncg'],
            'OFF_WHITE': ['off-white', 'off white', 'ow', 'offwhite'],
            'VETEMENTS': ['vetements'],
            'PALM_ANGELS': ['palm angels', 'pa'],
            'FEAR_OF_GOD': ['fear of god', 'fog', 'essentials'],
            'AMIRI': ['amiri'],
            'RHUDE': ['rhude'],
            'SUPREME': ['supreme', 'sup'],
            'BAPE': ['bape', 'a bathing ape', 'bathing ape'],
            'KITH': ['kith'],
            
            // Sportswear Premium
            'MONCLER': ['moncler'],
            'CANADA_GOOSE': ['canada goose', 'cg'],
            'STONE_ISLAND': ['stone island', 'si', 'stone'],
            'CP_COMPANY': ['cp company', 'c.p. company', 'cp', 'c.p.'],
            'MACKAGE': ['mackage'],
            'WOOLRICH': ['woolrich'],
            'PARAJUMPERS': ['parajumpers', 'pjs'],
            
            // Designers Avant-Garde
            'RICK_OWENS': ['rick owens', 'ro', 'drkshdw'],
            'YOHJI_YAMAMOTO': ['yohji yamamoto', 'y-3', 'yohji'],
            'COMME_DES_GARCONS': ['comme des garcons', 'cdg', 'comme des garçons'],
            'ISSEY_MIYAKE': ['issey miyake', 'pleats please', 'homme plissé'],
            'MAISON_MARGIELA': ['maison margiela', 'mm6', 'margiela', 'martin margiela'],
            'ANN_DEMEULEMEESTER': ['ann demeulemeester'],
            'JULIUS': ['julius'],
            'BORIS_BIDJAN_SABERI': ['boris bidjan saberi', 'bbs', '11'],
            
            // Accessoires & Maroquinerie
            'BOTTEGA_VENETA': ['bottega veneta', 'bv', 'bottega'],
            'LOEWE': ['loewe'],
            'CHLOE': ['chloé', 'chloe'],
            'MULBERRY': ['mulberry'],
            'GOYARD': ['goyard'],
            'MOYNAT': ['moynat'],
            'DELVAUX': ['delvaux'],
            'JUDITH_LEIBER': ['judith leiber'],
            
            // Chaussures de Luxe
            'CHRISTIAN_LOUBOUTIN': ['christian louboutin', 'louboutin', 'cl'],
            'JIMMY_CHOO': ['jimmy choo', 'jc'],
            'MANOLO_BLAHNIK': ['manolo blahnik', 'manolo'],
            'GIUSEPPE_ZANOTTI': ['giuseppe zanotti', 'gz'],
            'RENE_CAOVILLA': ['rené caovilla', 'rene caovilla'],
            'AQUAZZURA': ['aquazzura'],
            'GIANVITO_ROSSI': ['gianvito rossi'],
            'ROGER_VIVIER': ['roger vivier', 'rv'],
            
            // Bijoux & Horlogerie
            'CARTIER': ['cartier'],
            'BULGARI': ['bulgari', 'bvlgari'],
            'VAN_CLEEF': ['van cleef & arpels', 'vca', 'van cleef'],
            'TIFFANY': ['tiffany & co', 'tiffany', 'tiffany & co.'],
            'CHOPARD': ['chopard'],
            'BOUCHERON': ['boucheron'],
            'PIAGET': ['piaget'],
            'ROLEX': ['rolex'],
            'PATEK_PHILIPPE': ['patek philippe', 'patek'],
            'AUDEMARS_PIGUET': ['audemars piguet', 'ap', 'royal oak'],
            
            // Marques Émergentes
            'JACQUEMUS': ['jacquemus'],
            'GANNI': ['ganni'],
            'STAUD': ['staud'],
            'NANUSHKA': ['nanushka'],
            'REJINA_PYO': ['rejina pyo'],
            'ROTATE': ['rotate'],
            'RIXO': ['rixo'],
            'THE_ATTICO': ['the attico', 'attico'],
            
            // Mode Homme
            'TOM_FORD': ['tom ford', 'tf'],
            'BERLUTI': ['berluti'],
            'BRUNELLO_CUCINELLI': ['brunello cucinelli', 'bc'],
            'KITON': ['kiton'],
            'LORO_PIANA': ['loro piana', 'lp'],
            'BRIONI': ['brioni'],
            'ZEGNA': ['ermenegildo zegna', 'zegna', 'ez'],
            'CANALI': ['canali'],
            'CORNELIANI': ['corneliani'],
            
            // Américaines
            'RALPH_LAUREN': ['ralph lauren', 'rl', 'polo ralph lauren', 'polo'],
            'CALVIN_KLEIN': ['calvin klein', 'ck'],
            'TOMMY_HILFIGER': ['tommy hilfiger', 'tommy', 'th'],
            'MICHAEL_KORS': ['michael kors', 'mk', 'kors'],
            'MARC_JACOBS': ['marc jacobs', 'mj'],
            'COACH': ['coach'],
            'KATE_SPADE': ['kate spade', 'ks'],
            'TORY_BURCH': ['tory burch', 'tb'],
            
            // Autres Marques Premium
            'ALEXANDER_MCQUEEN': ['alexander mcqueen', 'mcqueen', 'amq'],
            'STELLA_MCCARTNEY': ['stella mccartney'],
            'KENZO': ['kenzo'],
            'ACNE_STUDIOS': ['acne studios', 'acne'],
            'ISABEL_MARANT': ['isabel marant', 'im'],
            'BALMAIN': ['balmain'],
            'DSQUARED2': ['dsquared2', 'dsquared', 'd2'],
            'GOLDEN_GOOSE': ['golden goose', 'ggdb'],
            'MIUMIU': ['miu miu', 'miumiu'],
            'ETRO': ['etro'],
            'MISSONI': ['missoni'],
            'ROBERTO_CAVALLI': ['roberto cavalli', 'cavalli'],
            'PHILIPP_PLEIN': ['philipp plein', 'pp'],
            'MCM': ['mcm', 'mode creation munich'],
            'FURLA': ['furla']
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
            case 'grouped-format':
                return this.convertGroupedFormat(excelData, brand);
            case 'standard':
                return this.convertStandardFormat(excelData, brand);
            case 'italian':
                return this.convertItalianFormat(excelData, brand);
            case 'custom':
                return this.convertCustomFormat(excelData, brand);
            default:
                // Essayer la conversion standard par défaut
                return this.convertStandardFormat(excelData, brand);
        }
    }
    
    /**
     * Convertit le format groupé (Stone Island, etc.)
     */
    convertGroupedFormat(data, brand) {
        const products = [];
        let currentProduct = null;
        let productId = 1;
        
        // Parcourir toutes les lignes
        for (let i = 0; i < data.length; i++) {
            const row = data[i];
            if (!row || row.length === 0) continue;
            
            // Chercher les indicateurs de produit
            const firstCell = row[0] ? row[0].toString() : '';
            
            // Nouveau produit commence par "Brand:"
            if (firstCell.toLowerCase().includes('brand:')) {
                // Sauvegarder le produit précédent s'il existe
                if (currentProduct && currentProduct.reference) {
                    products.push(currentProduct);
                }
                
                // Extraire les informations du produit
                currentProduct = {
                    id: `${brand}_EXCEL_${productId++}`,
                    brand: brand,
                    reference: '',
                    name: '',
                    category: '',
                    category_fr: '',
                    price_retail: 0,
                    price_cost: 0,
                    currency: 'EUR',
                    color_name: '',
                    sizes_available: [],
                    quantity_total: 0,
                    quantity_by_size: {},
                    source: 'excel',
                    active: true,
                    imported_at: new Date().toISOString()
                };
                
                // Parcourir les lignes suivantes pour ce produit
                let j = i;
                while (j < data.length && (!data[j][0] || !data[j][0].toString().toLowerCase().includes('brand:'))) {
                    const currentRow = data[j];
                    if (!currentRow) {
                        j++;
                        continue;
                    }
                    
                    const firstCol = currentRow[0] ? currentRow[0].toString().toLowerCase() : '';
                    
                    // Extraire Code/Codice
                    if (firstCol.includes('code:') || firstCol.includes('codice:')) {
                        currentProduct.reference = currentRow[1] || '';
                    }
                    
                    // Extraire Description/Descrizione
                    if (firstCol.includes('description:') || firstCol.includes('descrizione:')) {
                        currentProduct.name = currentRow[1] || '';
                        currentProduct.category_fr = this.translateCategory(currentRow[1]);
                    }
                    
                    // Extraire Prix (Costo/Cost/Prix)
                    if (firstCol.includes('costo:') || firstCol.includes('cost:') || firstCol.includes('prix:')) {
                        const price = parseFloat(currentRow[1]) || 0;
                        currentProduct.price_retail = price;
                        
                        // Chercher le prix de vente (Retail)
                        if (currentRow[2] && currentRow[2].toString().toLowerCase().includes('retail:')) {
                            currentProduct.price_cost = parseFloat(currentRow[3]) || price * 1.3;
                        } else {
                            // Sinon ajouter une marge par défaut
                            currentProduct.price_cost = Math.round(price * 1.3);
                        }
                    }
                    
                    // Extraire Couleur (dans différentes positions possibles)
                    for (let k = 0; k < currentRow.length; k++) {
                        if (currentRow[k] && currentRow[k].toString().toLowerCase().includes('color:')) {
                            if (k + 1 < currentRow.length) {
                                currentProduct.color_name = currentRow[k + 1] || '';
                            }
                            break;
                        }
                    }
                    
                    // Extraire Tailles et Quantités
                    if (firstCol.includes('size:') || firstCol.includes('taglia:')) {
                        const sizes = [];
                        const quantities = {};
                        let totalQty = 0;
                        
                        // Parcourir les colonnes pour trouver les tailles
                        for (let k = 1; k < currentRow.length; k++) {
                            if (currentRow[k] && currentRow[k] !== 'UNICA' && currentRow[k] !== 'UNI') {
                                sizes.push(currentRow[k].toString());
                            } else if (currentRow[k] === 'UNICA' || currentRow[k] === 'UNI') {
                                sizes.push('UNI');
                            }
                        }
                        
                        // Chercher la ligne Qty
                        if (j + 1 < data.length) {
                            const nextRow = data[j + 1];
                            if (nextRow && nextRow[0] && nextRow[0].toString().toLowerCase().includes('qty:')) {
                                for (let k = 1; k < nextRow.length && k - 1 < sizes.length; k++) {
                                    if (nextRow[k]) {
                                        const qty = parseInt(nextRow[k]) || 0;
                                        if (qty > 0) {
                                            quantities[sizes[k - 1]] = qty;
                                            totalQty += qty;
                                        }
                                    }
                                }
                            }
                        }
                        
                        if (sizes.length > 0) {
                            currentProduct.sizes_available = sizes;
                            currentProduct.quantity_by_size = quantities;
                            currentProduct.quantity_total = totalQty;
                        }
                    }
                    
                    // Extraire Q.Tot (quantité totale alternative)
                    if (firstCol.includes('q.tot:') || firstCol.includes('total:')) {
                        const qty = parseInt(currentRow[1]) || 0;
                        if (qty > 0 && currentProduct.quantity_total === 0) {
                            currentProduct.quantity_total = qty;
                        }
                    }
                    
                    j++;
                }
                
                // Mettre à jour l'index pour continuer après ce produit
                i = j - 1;
            }
        }
        
        // Ajouter le dernier produit
        if (currentProduct && currentProduct.reference) {
            products.push(currentProduct);
        }
        
        return products;
    }
    
    /**
     * Convertit le format italien
     */
    convertItalianFormat(data, brand) {
        // Utiliser la conversion standard avec les bons mappings
        return this.convertStandardFormat(data, brand);
    }

    /**
     * Détecte le format du fichier Excel
     */
    detectExcelFormat(data) {
        if (!data || data.length < 2) return 'unknown';
        
        const headers = data[0].map(h => h ? h.toString().toLowerCase() : '');
        
        // Format groupé (Stone Island, etc.) : Brand, Code, Description en colonnes fixes
        if (data.some(row => row && row[0] && row[0].toString().toLowerCase().includes('brand:'))) {
            return 'grouped-format';
        }
        
        // Format standard : référence, nom, catégorie, prix en headers
        if (headers.some(h => h.includes('référence') || h.includes('reference') || h.includes('ref')) && 
            headers.some(h => h.includes('nom') || h.includes('name') || h.includes('produit')) &&
            headers.some(h => h.includes('prix') || h.includes('price'))) {
            return 'standard';
        }
        
        // Format avec colonnes italiennes
        if (headers.some(h => h.includes('codice') || h.includes('articolo')) && 
            headers.some(h => h.includes('prezzo') || h.includes('costo'))) {
            return 'italian';
        }
        
        // Format personnalisé : utiliser la détection intelligente
        return 'custom';
    }

    /**
     * Validation des données Excel
     */
    validateExcelData(data) {
        if (!data || data.length < 2) {
            return { valid: false, message: 'Le fichier est vide ou ne contient pas de données' };
        }
        
        // Récupérer les headers et les normaliser
        const headers = data[0].map(h => h ? h.toString().toLowerCase().trim() : '');
        
        // Différentes variations possibles des noms de colonnes
        const columnVariations = {
            reference: ['référence', 'reference', 'ref', 'sku', 'code', 'codice', 'articolo', 'modello', 'cod', 'item'],
            name: ['nom', 'name', 'produit', 'product', 'article', 'descrizione', 'description', 'modello', 'nome', 'libellé'],
            category: ['catégorie', 'category', 'type', 'tipo', 'famille', 'gamme', 'collection', 'linea'],
            price: ['prix', 'price', 'prezzo', 'cost', 'coût', 'tarif', 'montant', 'valore', 'euro', 'eur', '€']
        };
        
        // Vérifier qu'on a au moins une colonne de chaque type requis
        const missingTypes = [];
        
        for (const [type, variations] of Object.entries(columnVariations)) {
            const found = headers.some(h => 
                variations.some(v => h.includes(v))
            );
            
            if (!found) {
                missingTypes.push(type);
            }
        }
        
        // Si on a au moins référence/nom et prix, c'est suffisant
        const hasMinimum = (
            headers.some(h => columnVariations.reference.some(v => h.includes(v))) ||
            headers.some(h => columnVariations.name.some(v => h.includes(v)))
        ) && headers.some(h => columnVariations.price.some(v => h.includes(v)));
        
        if (!hasMinimum) {
            // Afficher les colonnes trouvées pour aider l'utilisateur
            console.log('Colonnes trouvées:', headers);
            
            return { 
                valid: false, 
                message: `Format non reconnu. Colonnes trouvées: ${headers.filter(h => h).join(', ')}. 
                         Assurez-vous d'avoir au moins une colonne pour l'identifiant (référence, code, SKU...) 
                         et une colonne pour le prix.` 
            };
        }
        
        return { valid: true };
    }

    /**
     * Convertit le format standard
     */
    convertStandardFormat(data, brand) {
        const headers = data[0].map(h => h ? h.toString().toLowerCase().trim() : '');
        const products = [];
        
        // Mapper les colonnes avec plus de flexibilité
        const columnMap = {
            reference: this.findColumnIndex(headers, ['référence', 'reference', 'ref', 'sku', 'code', 'codice', 'articolo', 'modello', 'cod', 'item', 'codpro']),
            name: this.findColumnIndex(headers, ['nom', 'name', 'produit', 'product', 'article', 'descrizione', 'description', 'modello', 'nome', 'libellé', 'designation']),
            category: this.findColumnIndex(headers, ['catégorie', 'category', 'type', 'tipo', 'famille', 'gamme', 'collection', 'linea', 'gruppo']),
            price_retail: this.findColumnIndex(headers, ['prix achat', 'prix revient', 'cost', 'costo', 'buy', 'wholesale']),
            price_cost: this.findColumnIndex(headers, ['prix vente', 'prix', 'price', 'prezzo', 'sell', 'retail', 'pvp', 'euro', 'eur', '€']),
            color: this.findColumnIndex(headers, ['couleur', 'color', 'colore', 'teinte', 'coloris', 'col']),
            sizes: this.findColumnIndex(headers, ['taille', 'size', 'taglia', 'misura', 'pointure']),
            quantity: this.findColumnIndex(headers, ['quantité', 'quantity', 'qté', 'qty', 'stock', 'disponible', 'disponibilità', 'giacenza', 'qta'])
        };
        
        // Si on n'a pas trouvé de colonne prix vente, chercher n'importe quelle colonne avec un nombre
        if (columnMap.price_cost === -1) {
            // Parcourir la première ligne de données pour trouver une colonne avec des nombres
            if (data.length > 1) {
                const firstDataRow = data[1];
                for (let i = 0; i < headers.length; i++) {
                    const value = firstDataRow[i];
                    if (value && !isNaN(parseFloat(value))) {
                        // C'est probablement une colonne de prix
                        columnMap.price_cost = i;
                        console.log(`Colonne prix détectée automatiquement: ${headers[i]}`);
                        break;
                    }
                }
            }
        }
        
        // Parcourir les lignes
        for (let i = 1; i < data.length; i++) {
            const row = data[i];
            if (!row || row.length === 0 || row.every(cell => !cell)) continue;
            
            // Créer un identifiant unique si pas de référence
            const reference = columnMap.reference !== -1 ? 
                row[columnMap.reference] : 
                `${brand}_${Date.now()}_${i}`;
            // Nom par défaut si pas trouvé
            const name = columnMap.name !== -1 ? 
                row[columnMap.name] : 
                `Produit ${i}`;
            
            const product = {
                id: `${brand}_EXCEL_${i}`,
                brand: brand,
                reference: reference || `${brand}_${i}`,
                name: name || 'Produit sans nom',
                category: columnMap.category !== -1 ? row[columnMap.category] : 'Non catégorisé',
                category_fr: columnMap.category !== -1 ? this.translateCategory(row[columnMap.category]) : 'Non catégorisé',
                price_retail: columnMap.price_retail !== -1 ? parseFloat(row[columnMap.price_retail]) || 0 : 0,
                price_cost: columnMap.price_cost !== -1 ? parseFloat(row[columnMap.price_cost]) || 0 : 0,
                currency: 'EUR',
                color_name: columnMap.color !== -1 ? row[columnMap.color] : '',
                sizes_available: columnMap.sizes !== -1 ? this.parseSizes(row[columnMap.sizes]) : ['UNI'],
                quantity_total: columnMap.quantity !== -1 ? parseInt(row[columnMap.quantity]) || 0 : 0,
                source: 'excel',
                active: true,
                imported_at: new Date().toISOString()
            };
            
            // Si pas de prix de vente, utiliser le prix d'achat
            if (product.price_cost === 0 && product.price_retail > 0) {
                product.price_cost = product.price_retail;
            }
            
            // Valider le produit (plus flexible)
            if ((product.reference && product.reference !== `${brand}_${i}`) || 
                (product.name && product.name !== 'Produit sans nom' && product.name !== `Produit ${i}`)) {
                products.push(product);
            }
        }
        return products;
    }
    
    /**
     * Trouve l'index d'une colonne en testant plusieurs variations
     */
    findColumnIndex(headers, variations) {
        for (let i = 0; i < headers.length; i++) {
            const header = headers[i];
            if (variations.some(v => header.includes(v))) {
                return i;
            }
        }
        return -1;
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
            'cap': 'Casquettes',
            'cappello': 'Casquettes',
            'baseball cap': 'Casquettes',
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
            't-shirt': 'T-shirts',
            'tshirt': 'T-shirts',
            'tee': 'T-shirts',
            'shoes': 'Chaussures',
            'sneakers': 'Baskets',
            'accessories': 'Accessoires',
            'polo': 'Polos'
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
     * Fonction de conversion personnalisée (fallback)
     */
    convertCustomFormat(data, brand) {
        // Utiliser la conversion standard comme fallback
        return this.convertStandardFormat(data, brand);
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
                             
