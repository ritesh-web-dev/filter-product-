const buttons = document.querySelectorAll(".btn");

function productFilter(value) {
    buttons.forEach((button) => {
        if (button.innerText.toLowerCase() === value) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    });

    const products = document.querySelectorAll(".product");

    if (value === "all") {
        products.forEach((product) => {
            product.classList.remove("hide");
        });
    } else {
        products.forEach((product) => {
            const productColor = product.getAttribute("data-color");
            
            if (productColor.includes(value)) {
                product.classList.remove("hide");
            } else {
                product.classList.add("hide");
            }
        });
    }
}

// Fetch the product data and display it
fetch("./product.json")
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json(); // Parse the JSON data from the response
    })
    .then((data) => {
        showProduct(data);
    })
    .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
    });

function showProduct(data) {
    const productWrapper = document.querySelector(".product-wrapper");

    data.forEach((product) => {
        let productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.setAttribute("data-color", product.color.toLowerCase());

        let img = document.createElement("img");
        img.src = `${product.img}`;

        let product_name = document.createElement("p");
        product_name.classList.add("product-name");
        product_name.innerText = `${product.name}`;

        let product_price = document.createElement("p");
        product_price.classList.add("price");
        product_price.innerText = `$${product.price}`;

        let addToCartButton = document.createElement("button");
        addToCartButton.classList.add("add-to-cart");
        addToCartButton.id = "add-to-cart";
        addToCartButton.innerText = "Add to cart";

        productDiv.append(img);
        productDiv.append(product_name);
        productDiv.append(product_price);
        productDiv.append(addToCartButton);
        productWrapper.append(productDiv);
    });
}
