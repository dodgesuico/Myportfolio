/**
 * Certificate Modal Functionality
 * Handles certificate image viewing in modal popup
 */

'use strict';

// Certificate images mapping
const certificateImages = {
    'ibpap-psia': './assets/images/my-certificates/Ibpap-psia.png',
    'nc-certificate': './assets/images/my-certificates/nc.png'
};

// Open certificate modal
function openCertificateModal(certificateId) {
    const modal = document.getElementById('certificate-modal');
    const modalImage = document.getElementById('modal-certificate-image');

    if (modal && modalImage && certificateImages[certificateId]) {
        modalImage.src = certificateImages[certificateId];
        modalImage.alt = certificateId.replace('-', ' ').toUpperCase() + ' Certificate';
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

// Close certificate modal
function closeCertificateModal() {
    const modal = document.getElementById('certificate-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Initialize certificate functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('certificate-modal');

    if (modal) {
        // Close modal when clicking outside the image
        modal.addEventListener('click', function (event) {
            if (event.target === modal) {
                closeCertificateModal();
            }
        });
    }

    // Close modal when pressing Escape key
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && modal && modal.style.display === 'block') {
            closeCertificateModal();
        }
    });

    // COMPLETE RIGHT-CLICK PROTECTION
    // Disable right-click on the entire page
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    });

    // Disable specific key combinations
    document.addEventListener('keydown', function (e) {
        // Disable F12 (Dev Tools)
        if (e.key === 'F12') {
            e.preventDefault();
            return false;
        }

        // Disable Ctrl+Shift+I (Dev Tools)
        if (e.ctrlKey && e.shiftKey && e.key === 'I') {
            e.preventDefault();
            return false;
        }

        // Disable Ctrl+Shift+J (Console)
        if (e.ctrlKey && e.shiftKey && e.key === 'J') {
            e.preventDefault();
            return false;
        }

        // Disable Ctrl+U (View Source)
        if (e.ctrlKey && e.key === 'u') {
            e.preventDefault();
            return false;
        }

        // Disable Ctrl+S (Save Page)
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            return false;
        }

        // Disable Ctrl+A (Select All)
        if (e.ctrlKey && e.key === 'a') {
            e.preventDefault();
            return false;
        }

        // Disable Ctrl+P (Print)
        if (e.ctrlKey && e.key === 'p') {
            e.preventDefault();
            return false;
        }
    });

    // Disable text selection on the entire page
    document.addEventListener('selectstart', function (e) {
        e.preventDefault();
        return false;
    });

    // Disable drag on all images
    document.addEventListener('dragstart', function (e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
            return false;
        }
    });

    // Additional protection for certificate images specifically
    function protectCertificateImages() {
        const certificateImages = document.querySelectorAll('.blog-banner-box img, #modal-certificate-image');
        certificateImages.forEach(function (img) {
            // Multiple event listeners for maximum protection
            img.addEventListener('contextmenu', function (e) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            });

            img.addEventListener('dragstart', function (e) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            });

            img.addEventListener('selectstart', function (e) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            });

            img.addEventListener('mousedown', function (e) {
                if (e.button === 2) { // Right mouse button
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
            });

            // Disable pointer events on modal image to prevent any interaction
            if (img.id === 'modal-certificate-image') {
                img.style.pointerEvents = 'none';
            }
        });
    }

    // Apply protection initially
    protectCertificateImages();

    // Reapply protection when modal opens (in case image is dynamically loaded)
    const originalOpenModal = window.openCertificateModal;
    window.openCertificateModal = function (certificateId) {
        originalOpenModal(certificateId);
        setTimeout(protectCertificateImages, 100); // Small delay to ensure image is loaded
    };
});

// Make functions globally available
window.openCertificateModal = openCertificateModal;
window.closeCertificateModal = closeCertificateModal;
