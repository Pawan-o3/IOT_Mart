document.addEventListener("DOMContentLoaded", function () {
    updateCartCount(); // Ensure cart updates on load

    /*** Handle "View" Button Clicks (for both products & projects) ***/
    document.querySelectorAll(".view-btn").forEach(button => {
        button.addEventListener("click", function () {
            let product = this.closest(".product");
            if (product) {
                let productName = product.querySelector("h3").innerText;
                let productPrice = product.querySelector(".price").innerText;
                let productStock = product.querySelector(".stock").innerText;

                // Store product details
                localStorage.setItem("viewedProduct", JSON.stringify({
                    name: productName,
                    price: productPrice,
                    stock: productStock
                }));

                window.location.href = "product-details.html";
            }

            let project = this.closest(".project");
            if (project) {
                let projectName = project.querySelector("h3").innerText;
                window.location.href = `project-details.html?name=${encodeURIComponent(projectName)}`;
            }
        });
    });

    /*** Handle "Add to Cart" Button Clicks ***/
    document.querySelectorAll(".cart-btn").forEach(button => {
        button.addEventListener("click", function () {
            let product = this.closest(".product");
            if (!product) return;

            let productName = product.querySelector("h3").innerText;
            let productPrice = product.querySelector(".price").innerText;
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            let existingProduct = cart.find(item => item.name === productName);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({ name: productName, price: productPrice, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
            alert(`${productName} added to cart!`);
        });
    });

    /*** Handle Search Functionality ***/
    const searchIcon = document.getElementById("search-icon");
    const searchBox = document.getElementById("search-box");
    if (searchIcon && searchBox) {
        searchIcon.addEventListener("click", () => searchBox.style.display = "block");
        searchBox.addEventListener("keyup", function () {
            let searchText = searchBox.value.toLowerCase();
            document.querySelectorAll(".product").forEach(product => {
                let productName = product.querySelector("h3").innerText.toLowerCase();
                product.style.display = productName.includes(searchText) ? "block" : "none";
            });
        });

        document.addEventListener("click", (event) => {
            if (event.target !== searchIcon && event.target !== searchBox) {
                searchBox.style.display = "none";
            }
        });
    }

    /*** Function to Update Cart Count ***/
    function updateCartCount() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        let cartIcon = document.querySelector("#cart-icon");

        if (cartIcon) {
            cartIcon.setAttribute("data-count", cartCount);
            cartIcon.classList.toggle("has-items", cartCount > 0);
        }
    }

    /*** Handle Login/Signup Modal ***/
    const setupModal = (trigger, modal, close, switchTo = null, switchTrigger = null) => {
        if (trigger && modal && close) {
            trigger.addEventListener("click", (e) => { e.preventDefault(); modal.style.display = "flex"; });
            close.addEventListener("click", () => { modal.style.display = "none"; });
            window.addEventListener("click", (e) => { if (e.target === modal) modal.style.display = "none"; });

            if (switchTrigger && switchTo) {
                switchTrigger.addEventListener("click", (e) => {
                    e.preventDefault();
                    modal.style.display = "none";
                    switchTo.style.display = "flex";
                });
            }
        }
    };

    setupModal(
        document.getElementById("shop-now"),
        document.getElementById("login-modal"),
        document.getElementById("close-login"),
        document.getElementById("signup-modal"),
        document.getElementById("open-signup")
    );

    setupModal(
        document.getElementById("open-login-again"),
        document.getElementById("signup-modal"),
        document.getElementById("close-signup"),
        document.getElementById("login-modal"),
        document.getElementById("open-login-again")
    );

    /*** Handle Contact Support Form Submission ***/
    const form = document.getElementById("support-form");
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            if (!name || !email || !message) {
                alert("Please fill in all fields.");
                return;
            }

            alert("Your message has been sent successfully!");
            form.reset();
        });
    }

    /*** Handle FAQ Toggle ***/
    document.querySelectorAll(".faq-question").forEach(faq => {
        faq.addEventListener("click", function () {
            const answer = this.nextElementSibling;
            const icon = this.querySelector("i");

            if (answer.style.display === "block") {
                answer.style.display = "none";
                icon.style.transform = "rotate(0deg)";
            } else {
                answer.style.display = "block";
                icon.style.transform = "rotate(180deg)";
            }
        });
    });

    /*** Handle Customization Form Submission ***/
    const customizationForm = document.getElementById("customization-form");
    if (customizationForm) {
        customizationForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const projectTitle = document.getElementById("project-title").value.trim();
            const description = document.getElementById("description").value.trim();
            const budget = document.getElementById("budget").value;
            const deadline = document.getElementById("deadline").value;
            const confirmationMessage = document.getElementById("confirmation");

            if (!name || !email || !projectTitle || !description || !budget || !deadline) {
                alert("Please fill in all required fields.");
                return;
            }

            localStorage.setItem("projectData", JSON.stringify({ name, email, projectTitle, description, budget, deadline }));

            if (confirmationMessage) {
                confirmationMessage.classList.remove("hidden");
                customizationForm.reset();

                setTimeout(() => {
                    confirmationMessage.classList.add("hidden");
                }, 3000);
            }
        });
    }
});
