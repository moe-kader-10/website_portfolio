// Toggle Nav Menu
function toggleNav() {
    const nav = document.getElementById('navbar');
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
}

// Scroll To Top Button
const scrollBtn = document.getElementById('scrollTopBtn');

// Reveal sections already in view
function revealSectionsInView() {
    document.querySelectorAll('.section').forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            section.classList.add('visible');
        }
    });
}

window.onscroll = () => {
    if (window.scrollY > 300) {
        scrollBtn.style.display = 'block';
    } else {
        scrollBtn.style.display = 'none';
    }

    // Reveal sections on scroll
    revealSectionsInView();
};

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Project Gallery Functionality - Updated to open in new tab
document.addEventListener('DOMContentLoaded', function () {
    // Reveal any sections in view immediately on page load
    revealSectionsInView();

    const scrollBtn = document.getElementById('scrollTopBtn');
    if (scrollBtn) {
        scrollBtn.addEventListener('click', scrollToTop);
    }

    // Updated openProjectModal function to open in new tab
    window.openProjectModal = function (projectId) {
        const projectImages = document.getElementById(projectId)?.querySelectorAll('img');

        if (!projectImages || projectImages.length === 0) {
            console.error('No project images found for:', projectId);
            return;
        }

        // Create image URLs array
        const imageUrls = Array.from(projectImages).map(img => ({
            src: img.src,
            alt: img.alt
        }));

        // Create a simple HTML page with the images
        const newPageContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Project Details</title>
                <style>
                    body {
                        background-color: #000;
                        margin: 0;
                        padding: 20px;
                        font-family: 'Outfit', sans-serif;
                        text-align: center;
                        color: white;
                    }
                    .image-container {
                        max-width: 90%;
                        margin: 20px auto;
                        position: relative;
                    }
                    .project-image {
                        max-width: 100%;
                        max-height: 80vh;
                        border: 2px solid #00bfa6;
                        border-radius: 10px;
                        box-shadow: 0 0 20px rgba(0, 191, 166, 0.3);
                    }
                    .copyright {
                        position: absolute;
                        bottom: 10px;
                        left: 0;
                        right: 0;
                        color: white;
                        background-color: rgba(0, 0, 0, 0.7);
                        padding: 5px;
                        font-size: 14px;
                    }
                    .navigation {
                        margin: 20px 0;
                    }
                    .nav-button {
                        background-color: #00bfa6;
                        color: black;
                        border: none;
                        padding: 10px 20px;
                        margin: 0 10px;
                        border-radius: 5px;
                        cursor: pointer;
                        font-weight: bold;
                    }
                    .nav-button:hover {
                        background-color: #00e6c3;
                    }
                    .nav-button:disabled {
                        opacity: 0.5;
                        cursor: not-allowed;
                    }
                    .close-button {
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        background-color: #00bfa6;
                        color: black;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 5px;
                        cursor: pointer;
                        font-weight: bold;
                        z-index: 100;
                    }
                    .image-counter {
                        display: inline-block;
                        margin: 0 10px;
                    }
                </style>
            </head>
            <body>
                <button class="close-button" onclick="window.close()">Close</button>
                <div class="image-container">
                    <img id="project-image" class="project-image" src="${imageUrls[0].src}" alt="${imageUrls[0].alt}" />
                    <div id="copyright" class="copyright">© ${new Date().getFullYear()} Muhammed - All rights reserved</div>
                </div>
                <div class="navigation">
                    <button class="nav-button" onclick="prevImage()" ${imageUrls.length <= 1 ? 'disabled' : ''}>Previous</button>
                    <span class="image-counter">Image 1 of ${imageUrls.length}</span>
                    <button class="nav-button" onclick="nextImage()" ${imageUrls.length <= 1 ? 'disabled' : ''}>Next</button>
                </div>

                <script>
                    const images = ${JSON.stringify(imageUrls)};
                    let currentImageIndex = 0;

                    function loadImage(index) {
                        if (index >= 0 && index < images.length) {
                            currentImageIndex = index;
                            document.getElementById('project-image').src = images[index].src;
                            document.getElementById('project-image').alt = images[index].alt;
                            document.querySelector('.image-counter').textContent = \`Image \${index + 1} of \${images.length}\`;
                        }
                    }

                    function prevImage() {
                        if (currentImageIndex > 0) {
                            loadImage(currentImageIndex - 1);
                        }
                    }

                    function nextImage() {
                        if (currentImageIndex < images.length - 1) {
                            loadImage(currentImageIndex + 1);
                        }
                    }

                    // Disable right-click and other saving methods
                    document.addEventListener('contextmenu', function(e) {
                        e.preventDefault();
                        alert('Image saving is disabled to protect copyright.');
                    });

                    // Disable keyboard shortcuts for saving
                    document.addEventListener('keydown', function(e) {
                        if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
                            e.preventDefault();
                            alert('Image saving is disabled to protect copyright.');
                        }
                        if (e.key === 'ArrowLeft') {
                            prevImage();
                        } else if (e.key === 'ArrowRight') {
                            nextImage();
                        }
                    });

                    document.getElementById('project-image').setAttribute('draggable', 'false');
                    document.getElementById('project-image').style.userSelect = 'none';
                    document.getElementById('project-image').style.webkitUserSelect = 'none';
                    document.getElementById('project-image').style.pointerEvents = 'none';
                </script>
            </body>
            </html>
        `;

        // Open a new window with the content
        const newWindow = window.open('', '_blank');
        newWindow.document.write(newPageContent);
        newWindow.document.close();
    };
});