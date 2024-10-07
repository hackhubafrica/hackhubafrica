document.addEventListener('DOMContentLoaded', function () {

    // Number of posts per page
    const postsPerPage = 6;

    // Get all posts
    const posts = Array.from(document.querySelectorAll('.post'));

    // Calculate total number of pages
    const totalPages = Math.ceil(posts.length / postsPerPage);

    // Get the blog grid and pagination elements
    const blogGrid = document.getElementById('blog-grid');
    const pagination = document.getElementById('pagination');

    // Function to display posts for the current page
    function displayPage(page) {
        // Clear the current posts in the grid
        blogGrid.innerHTML = '';

        // Calculate the starting and ending index of the posts for the current page
        const start = (page - 1) * postsPerPage;
        const end = start + postsPerPage;

        // Slice the posts array to get only the posts for the current page
        const pagePosts = posts.slice(start, end);

        // Append the posts to the blog grid
        pagePosts.forEach(post => {
            blogGrid.appendChild(post);
        });
          // Store the current page in localStorage
        localStorage.setItem('currentPage', page);
    }

    // Function to create pagination links
    function createPagination() {
        // Clear any existing pagination links
        pagination.innerHTML = '';

        // Create pagination links for each page
        for (let i = 1; i <= totalPages; i++) {
            const pageLink = document.createElement('a');
            pageLink.href = '#';
            pageLink.textContent = i;
            pageLink.classList.add('page-link');

            // Add click event listener for the pagination link
            pageLink.addEventListener('click', (e) => {
                e.preventDefault();
                displayPage(i);
                updateActivePage(i);
            });

            pagination.appendChild(pageLink);
        }
    }

    // Function to update the active page styling
    function updateActivePage(activePage) {
        const pageLinks = document.querySelectorAll('.page-link');
        pageLinks.forEach(link => {
            link.classList.remove('active');
        });
        pageLinks[activePage - 1].classList.add('active');
    }

    const storedPage = localStorage.getItem('currentPage');
    const initialPage = storedPage ? parseInt(storedPage, 10) : 1;

    // Initial setup: Display the first page and create pagination
    displayPage(initialPage);
    createPagination();
    updateActivePage(initialPage);
});