// ===== VERITAS BS - ENHANCED JAVASCRIPT =====

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Main initialization function
function initializeApp() {
    setupNavigation();
    setupSmoothScrolling();
    setupAccessibility();
    setupMicrointeractions();
    setupInteractiveElements();
    setupPerformanceMonitoring();
}

// ===== NAVIGATION =====
function setupNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('.header');
    
    if (hamburger && navMenu) {
        // Mobile menu toggle
        hamburger.addEventListener('click', function() {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            
            hamburger.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = isExpanded ? '' : 'hidden';
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Header scroll effect
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

// ===== SMOOTH SCROLLING =====
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without page jump
                history.pushState(null, null, targetId);
            }
        });
    });
}

// ===== ACCESSIBILITY =====
function setupAccessibility() {
    // Skip link functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.focus();
                target.scrollIntoView();
            }
        });
    }
    
    // Keyboard navigation for mobile menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const navMenu = document.querySelector('.nav-menu');
            const hamburger = document.querySelector('.hamburger');
            
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        }
    });
    
    // Focus management
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.classList.add('focused');
        });
        
        element.addEventListener('blur', function() {
            this.classList.remove('focused');
        });
    });
}

// ===== INTERACTIVE ELEMENTS =====
function setupInteractiveElements() {
    // Question card interactions
    const questionHeaders = document.querySelectorAll('.question-header');
    questionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isExpanded = content.classList.contains('show');
            
            // Close all other question contents
            document.querySelectorAll('.question-content').forEach(content => {
                content.classList.remove('show');
            });
            
            // Toggle current content
            if (!isExpanded) {
                content.classList.add('show');
            }
        });
    });
    
    // Service tab interactions
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
        });
    });
    
    // Stat item hover effects
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Add visual feedback
            this.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Familiar item interactions
    const familiarItems = document.querySelectorAll('.familiar-item');
    familiarItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
        });
    });
    
    // Research item interactions
    const researchItems = document.querySelectorAll('.research-item');
    researchItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
        });
    });
}

// ===== MICROINTERACTIONS =====
function setupMicrointeractions() {
    // Button hover effects
    const buttons = document.querySelectorAll('.btn, .cta-primary, .cta-secondary');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Card hover effects
    const cards = document.querySelectorAll('.service-card, .question-card, .contact-option');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
        });
    });
    
    // Form field focus effects
    const formFields = document.querySelectorAll('input, textarea, select');
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        field.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
    
    // Download tracking
    const downloadLinks = document.querySelectorAll('a[download], a[href*=".pdf"]');
    downloadLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('download_clicked', {
                file: this.getAttribute('href'),
                text: this.textContent.trim()
            });
        });
    });
}

// ===== UTILITY FUNCTIONS =====

// Analytics tracking
function trackEvent(eventName, data = {}) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, data);
    }
    
    // Custom analytics
    console.log('Event tracked:', eventName, data);
}

// Performance monitoring
function setupPerformanceMonitoring() {
    // Track page load time
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        trackEvent('page_load_time', { load_time: loadTime });
    });
    
    // Track user engagement
    let startTime = Date.now();
    let isActive = true;
    
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            isActive = false;
            const sessionTime = Date.now() - startTime;
            trackEvent('session_time', { session_time: sessionTime });
        } else {
            isActive = true;
            startTime = Date.now();
        }
    });
    
    // Track scroll depth
    let maxScrollDepth = 0;
    window.addEventListener('scroll', function() {
        const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollDepth > maxScrollDepth) {
            maxScrollDepth = scrollDepth;
            if (maxScrollDepth % 25 === 0) { // Track at 25%, 50%, 75%, 100%
                trackEvent('scroll_depth', { depth: maxScrollDepth });
            }
        }
    });
}

// ===== HTMX ENHANCEMENTS =====

// Global HTMX event handlers
document.addEventListener('htmx:afterRequest', function(evt) {
    // Handle question detail toggles
    if (evt.detail.pathInfo.requestPath.includes('/question-details/')) {
        const target = evt.detail.target;
        if (target.style.display === 'none') {
            target.style.display = 'block';
        }
        target.classList.add('show');
        
        // Track question interaction
        const questionId = evt.detail.pathInfo.requestPath.split('/').pop();
        trackEvent('question_expanded', { question_id: questionId });
    }
    
    // Handle service tab switching
    if (evt.detail.pathInfo.requestPath.includes('/service-details/')) {
        const serviceType = evt.detail.pathInfo.requestPath.split('/').pop();
        trackEvent('service_tab_clicked', { service_type: serviceType });
    }
    
    // Handle stat detail hover
    if (evt.detail.pathInfo.requestPath.includes('/stat-detail/')) {
        const statType = evt.detail.pathInfo.requestPath.split('/').pop();
        trackEvent('stat_hovered', { stat_type: statType });
    }
    
    // Handle successful form submissions
    if (evt.detail.xhr.status === 200 && evt.detail.pathInfo.requestPath.includes('/contact')) {
        trackEvent('contact_form_submitted', { success: true });
    }
    
    // Handle successful downloads
    if (evt.detail.xhr.status === 200 && evt.detail.pathInfo.requestPath.includes('/download-guide')) {
        trackEvent('guide_downloaded', { success: true });
    }
});

// Handle HTMX errors
document.addEventListener('htmx:responseError', function(evt) {
    console.log('HTMX Error:', evt.detail);
    
    // Show user-friendly error message
    const errorMessage = '<div style="background: #fed7d7; border: 1px solid #feb2b2; color: #c53030; padding: 12px; border-radius: 6px; margin-top: 8px;">Something went wrong. Please try again.</div>';
    evt.detail.target.innerHTML = errorMessage;
    
    // Track error
    trackEvent('htmx_error', {
        path: evt.detail.pathInfo.requestPath,
        status: evt.detail.xhr.status
    });
});

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    trackEvent('javascript_error', {
        message: e.error.message,
        filename: e.filename,
        lineno: e.lineno
    });
});

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeApp,
        trackEvent,
        setupInteractiveElements
    };
} 