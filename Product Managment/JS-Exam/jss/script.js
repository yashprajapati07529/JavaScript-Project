// Main State Setup
let products = JSON.parse(localStorage.getItem("products")) || [];
let editId = null;

const productForm = document.getElementById("product-form");
const title = document.getElementById("title");
const price = document.getElementById("price");
const image = document.getElementById("image");
const category = document.getElementById("category");
const submitBtn = document.getElementById("submit-btn");
const formTitle = document.getElementById("form-title");
const productContainer = document.getElementById("product-container");
const search = document.getElementById("search");
const filterCategory = document.getElementById("filter-category");
const sortPrice = document.getElementById("sort-price");

function displayProducts(data) {

    productContainer.innerHTML = "";

    if (data.length === 0) {
        productContainer.innerHTML = `
            <div class="col-12 text-center text-muted my-4">
                <i class="fa-solid fa-box-open fa-3x mb-2"></i>
                <p>No products found.</p>
            </div>`;
        return;
    }

    data.forEach((product) => {
        const imgUrl = product.image ? product.image : "https://placeholder.com";

        productContainer.innerHTML += `
        <div class="col">
            <div class="card h-100 shadow-sm border">
                <img src="${imgUrl}" class="card-img-top p-2" style="height: 200px; width: 100%; object-fit: contain;" alt="${product.title}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title text-truncate fw-semibold">${product.title}</h5>
                    <span class="badge bg-secondary align-self-start mb-2">${product.category}</span>
                    <p class="card-text fs-5 fw-bold text-success mt-auto">\$${Number(product.price).toFixed(2)}</p>
                    <div class="d-flex gap-2 mt-2">
                        <button class="btn btn-outline-primary btn-sm flex-grow-1" onclick="editProduct(${product.id})">
                            <i class="fa-solid fa-pen-to-square"></i> Edit
                        </button>
                        <button class="btn btn-outline-danger btn-sm flex-grow-1" onclick="deleteProduct(${product.id})">
                            <i class="fa-solid fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `;
    });
}

productForm.addEventListener("submit", function (e) {
    e.preventDefault(); 

    if (!title.value.trim() || !price.value.trim() || !category.value) {
        alert("Please fill all required fields (*)");
        return;
    }

    const product = {
        id: editId ? editId : Date.now(),
        title: title.value.trim(),
        price: Number(price.value),
        image: image.value.trim(),
        category: category.value
    };

    if (editId === null) {
        products.push(product);
    } else {
        products = products.map(p => p.id === editId ? product : p);
        editId = null;
        submitBtn.innerText = "Add Product";
        formTitle.innerText = "Add New Product";
    }

    saveAndApply();
    productForm.reset(); 
});

// 3. DELETE PRODUCT
function deleteProduct(id) {
    if (confirm("Are you sure you want to delete this product?")) {
        products = products.filter(p => p.id !== id);
        saveAndApply();
    }
}


function editProduct(id) {
    let product = products.find(p => p.id === id);
    if (!product) return;

    title.value = product.title;
    price.value = product.price;
    image.value = product.image;
    category.value = product.category;

    editId = id;
    submitBtn.innerText = "Update Product";
    formTitle.innerText = "Edit Product Details";

    productForm.scrollIntoView({ behavior: 'smooth' });
}


function applyFilters() {
    let updatedData = [...products];

    
    let searchValue = search.value.toLowerCase().trim();
    if (searchValue) {
        updatedData = updatedData.filter(p => p.title.toLowerCase().includes(searchValue));
    }

    let catValue = filterCategory.value;
    if (catValue !== "all" && catValue !== "") {
        updatedData = updatedData.filter(p => p.category === catValue);
    }

    let sortValue = sortPrice.value;
    if (sortValue === "low-high") {
        updatedData.sort((a, b) => a.price - b.price);
    } else if (sortValue === "high-low") {
        updatedData.sort((a, b) => b.price - a.price);
    }

    displayProducts(updatedData);
}

function saveAndApply() {
    localStorage.setItem("products", JSON.stringify(products));
    applyFilters();
}

search.addEventListener("keyup", applyFilters);
filterCategory.addEventListener("change", applyFilters);
sortPrice.addEventListener("change", applyFilters);

displayProducts(products);
