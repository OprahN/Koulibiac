document.addEventListener("DOMContentLoaded", () => {
    fetch('ingredients.json')
        .then(res => {
            if (!res.ok) throw new Error('Erreur chargement JSON');
            return res.json();
        })
        .then(data => {
            const container = document.getElementById('ingredient');
            container.innerHTML = '';
        
            let nutriTotal = 0;
            let nutriCount = 0;
        
            data.forEach(product => {
                const box = document.createElement('div');
                box.className = 'ingredient-box';
        
                const img = document.createElement('img');
                img.src = product.image_url;
                img.alt = product.product_name;
        
                const name = document.createElement('h2');
                name.textContent = product.product_name;
        
                const nutri = document.createElement('img');
                const nutriscore = (product.nutriscore_grade && product.nutriscore_grade !== "not-applicable" && product.nutriscore_grade !== "unknown")
                    ? product.nutriscore_grade
                    : "unknown";
        
                nutri.src = `https://static.openfoodfacts.org/images/attributes/dist/nutriscore-${nutriscore}.svg`;
                nutri.alt = `Nutriscore ${nutriscore}`;
        
                // Convertir le nutriscore lettre en chiffre si applicable
                const score = product.nutriscore_score;
                nutriTotal += score;
                nutriCount++;
                
                box.appendChild(img);
                box.appendChild(name);
                box.appendChild(nutri);
        
                container.appendChild(box);
            });
        
            // Calcul et affichage du Nutri-score moyen
            const moyenneContainer = document.getElementById('nutriscore-affichage');
            if (nutriCount > 0) {
                const moyenne = Math.round(nutriTotal / nutriCount);
                
                let lettre;
                if (moyenne <= -1) lettre = 'A';
                else if (moyenne <= 2) lettre = 'B';
                else if (moyenne <= 10) lettre = 'C';
                else if (moyenne <= 18) lettre = 'D';
                else lettre = 'E';

                // Créer la section Nutri-score moyen
                const averageSection = document.createElement('div');
                averageSection.className = 'container text-center'; // centrage du contenu

                // Titre centré et en gras
                const title = document.createElement('h2');
                title.innerHTML = '<strong>Nutri-score moyen</strong>'; // gras avec <strong>

                // Image centrée
                const averageImg = document.createElement('img');
                averageImg.src = `https://static.openfoodfacts.org/images/attributes/dist/nutriscore-${lettre.toLowerCase()}.svg`;
                averageImg.alt = `Nutri-score ${lettre}`;
                averageImg.style.height = '100px';
                averageImg.className = 'd-block mx-auto'; // centrage image Bootstrap

                // Ajouter les éléments à la section
                averageSection.appendChild(title);
                averageSection.appendChild(averageImg);

                // Insertion dans la page
                const ingredientsContainer = document.getElementById('nutriscore-moyen');
                ingredientsContainer.parentNode.insertBefore(averageSection, ingredientsContainer);
            } else {
                moyenneContainer.textContent = "Aucun Nutri-score disponible pour les ingrédients.";
            }
        })
        .catch(err => {
            console.error("Erreur :", err);
        });
});
