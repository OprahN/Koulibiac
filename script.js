document.addEventListener("DOMContentLoaded", () => {
    fetch('ingredients.json')
        .then(res => {
            if (!res.ok) throw new Error('Erreur chargement JSON');
            return res.json();
        })
        .then(data => {
            const container = document.getElementById('ingredient');
            container.innerHTML = ''; // On vide ce qu'il y avait avant

            data.forEach(product => {
                const box = document.createElement('div');
                box.className = 'ingredient-box';

                // Image de l'ingrédient
                const img = document.createElement('img');
                img.src = product.image_url;
                img.alt = product.product_name;

                // Nom du produit
                const name = document.createElement('h2');
                name.textContent = product.product_name;

                // Image du nutriscore
                const nutri = document.createElement('img');
                const nutriscore = (product.nutriscore_grade && product.nutriscore_grade !== "not-applicable" && product.nutriscore_grade !== "unknown")
                    ? product.nutriscore_grade
                    : "unknown";
                nutri.src = `https://static.openfoodfacts.org/images/attributes/dist/nutriscore-${nutriscore}.svg`;
                nutri.alt = `Nutriscore ${nutriscore}`;

                // Ajout dans la boîte
                box.appendChild(img);
                box.appendChild(name);
                box.appendChild(nutri);

                // Ajout dans le container
                container.appendChild(box);
            });
        })
        .catch(err => {
            console.error("Erreur :", err);
        });
});
