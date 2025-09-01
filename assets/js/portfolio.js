/**
 * Portfolio Modal Functionality
 * Handles portfolio project viewing in modal popup
 */

'use strict';

// Portfolio images mapping
const portfolioImages = {
    'ckcm-project': './assets/images/my-projects/ckcm-project.png',
    'serviamus-project': './assets/images/my-projects/serviamus-project.png',
    'thesis-project': './assets/images/my-projects/thesis-project.png',
    'bot-project': './assets/images/my-projects/bot-project.png'
};

// Portfolio project details
const portfolioDetails = {
    'ckcm-project': {
        title: 'Christ the King Grading System',
        category: 'Web Development',
        description: 'A comprehensive grading system developed for Christ the King College de Maranding, Inc. (CKCM). This system streamlines grade management processes and enhances academic record keeping efficiency for faculty and administrators.',
        technologies: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
        features: ['Grade Management', 'Student Records', 'Faculty Dashboard', 'Report Generation']
    },
    'serviamus-project': {
        title: 'Serviamus Website',
        category: 'Web Development',
        description: 'Modern website development for Serviamus Foundation, focusing on enhancing user experience, optimizing performance, and implementing responsive design solutions.',
        technologies: ['HTML5', 'JavaScript', 'Tailwind CSS', 'PHP'],
        features: ['Responsive Design', 'Modern UI/UX', 'Performance Optimized', 'Cross-browser Compatible']
    },
    'thesis-project': {
        title: 'Thesis Website',
        category: 'Web Development',
        description: 'Academic thesis project website showcasing research and development in web technologies and with junior level design principles.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'MySQL'],
        features: ['Academic Research', 'Modern Design', 'Interactive Elements', 'Documentation']
    },
    'bot-project': {
        title: 'Discord Bots',
        category: 'Bot Development',
        description: 'Custom Discord bots with features like moderation, music, games, and server management. Developed automated solutions that enhance community engagement and streamline server operations.',
        technologies: ['Python', 'Discord.py', 'APIs', 'Cloud Integrations'],
        features: ['Moderation Tools', 'Music Bot', 'Games & Fun', 'Server Management']
    }
};

// Open portfolio modal
function openPortfolioModal(projectId) {
    const modal = document.getElementById('portfolio-modal');
    const modalImage = document.getElementById('modal-portfolio-image');
    const modalTitle = document.getElementById('modal-portfolio-title');
    const modalCategory = document.getElementById('modal-portfolio-category');
    const modalDescription = document.getElementById('modal-portfolio-description');
    const modalTechnologies = document.getElementById('modal-portfolio-technologies');
    const modalFeatures = document.getElementById('modal-portfolio-features');

    if (modal && modalImage && portfolioImages[projectId] && portfolioDetails[projectId]) {
        const project = portfolioDetails[projectId];

        // Set image and basic info
        modalImage.src = portfolioImages[projectId];
        modalImage.alt = project.title;
        modalTitle.textContent = project.title;
        modalCategory.textContent = project.category;
        modalDescription.textContent = project.description;

        // Set technologies
        modalTechnologies.innerHTML = project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('');

        // Set features
        modalFeatures.innerHTML = project.features.map(feature => `<li>${feature}</li>`).join('');

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling

        // Save the current modal state to localStorage
        try {
            localStorage.setItem('portfolioModalState', projectId);
            console.log('Modal state saved:', projectId);
        } catch (e) {
            console.warn('Could not save modal state to localStorage:', e);
        }
    }
}

// Close portfolio modal
function closePortfolioModal() {
    const modal = document.getElementById('portfolio-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling

        // Clear the modal state from localStorage
        try {
            localStorage.removeItem('portfolioModalState');
            console.log('Modal state cleared');
        } catch (e) {
            console.warn('Could not clear modal state from localStorage:', e);
        }
    }
}

// Function to restore modal state from localStorage
function restoreModalState() {
    try {
        const savedProjectId = localStorage.getItem('portfolioModalState');
        console.log('Checking for saved modal state:', savedProjectId);

        if (savedProjectId && portfolioImages[savedProjectId] && portfolioDetails[savedProjectId]) {
            console.log('Restoring modal for project:', savedProjectId);
            // Wait a bit to ensure DOM is fully loaded
            setTimeout(() => {
                openPortfolioModal(savedProjectId);
            }, 500);
        }
    } catch (e) {
        console.warn('Could not restore modal state from localStorage:', e);
    }
}

// Initialize portfolio functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('portfolio-modal');

    if (modal) {
        // Close modal when clicking outside the content
        modal.addEventListener('click', function (event) {
            if (event.target === modal) {
                closePortfolioModal();
            }
        });
    }

    // Close modal when pressing Escape key
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && modal && modal.style.display === 'block') {
            closePortfolioModal();
        }
    });

    // Disable right-click context menu on portfolio images
    const portfolioImages = document.querySelectorAll('.project-img img, #modal-portfolio-image');
    portfolioImages.forEach(function (img) {
        img.addEventListener('contextmenu', function (e) {
            e.preventDefault();
            return false;
        });

        // Disable drag and drop
        img.addEventListener('dragstart', function (e) {
            e.preventDefault();
            return false;
        });
    });

    // Restore modal state if one was saved
    restoreModalState();
});

// Make functions globally available
window.openPortfolioModal = openPortfolioModal;
window.closePortfolioModal = closePortfolioModal;
