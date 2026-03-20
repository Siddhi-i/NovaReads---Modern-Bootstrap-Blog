document.addEventListener("DOMContentLoaded", function() {
    
    const filterButtons = document.querySelectorAll(".filter-btn");
    const blogItems = document.querySelectorAll(".blog-item");
    const searchInput = document.getElementById("search-input");
    const noResultsMsg = document.getElementById("no-results");

    // Function to filter blogs
    function filterBlogs() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const activeFilter = document.querySelector(".filter-btn.active").getAttribute("data-filter");
        
        let visibleCount = 0;

        blogItems.forEach(item => {
            const title = item.querySelector(".card-title").textContent.toLowerCase();
            const category = item.getAttribute("data-category");
            
            // Check matches
            const matchesSearch = title.includes(searchTerm);
            const matchesFilter = activeFilter === "all" || category === activeFilter;

            if (matchesSearch && matchesFilter) {
                // Show item
                item.style.display = "block";
                // Slight delay for animation reset after display block
                setTimeout(() => {
                    item.style.opacity = "1";
                    item.style.transform = "scale(1)";
                }, 10);
                visibleCount++;
            } else {
                // Hide item
                item.style.opacity = "0";
                item.style.transform = "scale(0.95)";
                setTimeout(() => {
                    if(!matchesSearch || !matchesFilter) {
                        item.style.display = "none";
                    }
                }, 400); // match css transition delay
            }
        });

        // Show/hide empty state message
        setTimeout(() => {
            if (visibleCount === 0) {
                noResultsMsg.classList.remove("d-none");
            } else {
                noResultsMsg.classList.add("d-none");
            }
        }, 400); // check after hiding animations complete
    }

    // Category Filter Event Listeners
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove active class from all
            filterButtons.forEach(btn => btn.classList.remove("active"));
            // Add active class to clicked
            button.classList.add("active");
            
            filterBlogs();
        });
    });

    // Search input Event Listener
    searchInput.addEventListener("input", filterBlogs);

    // Initial check (in case browser caches search input value after reload)
    filterBlogs();
});
