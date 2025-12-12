
async function loadProducts() {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/products`)
        const data = await res.json()
        const container = document.getElementById("products-section")

        data.forEach(item => {
            //  mahsulot kartalaari
            const card = document.createElement("div")

            card.className = "product-card"

            card.innerHTML = `
               <img src="${item.image}" alt="${item.title}"/>
               <h3>${item.title}</h3>
               <p class="category">${item.category}</p>
               <div class="info-section">
                    <p class="price">$${item.price}</p>
                    <div class="rating">
                        <span>${item.rating.rate}</span>
                        <span class="count">(${item.rating.count})</span>
                    </div>
               </div>
               <button class="add-button" data-id="${item.id}">Savatga qo'shish</button>
            `

            container.appendChild(card)

            card.querySelector(".add-button").addEventListener("click", () => {
                const cart = JSON.parse(localStorage.getItem('cart')) || []

                const added = cart.find(cartItem => cartItem.id === item.id)

                if (added) {
                    alert("ushbu tovar allaqachon savatga qoshilgan")
                } else {
                    cart.push({ ...item, added: 1 })
                    localStorage.setItem('cart', JSON.stringify(cart))
                    window.dispatchEvent(new Event("cartUpdated"));
                }
            })
        })
    } catch (error) {
       console.log(`Malumotlarni olishda hatolik`)
    }
}

loadProducts()