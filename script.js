// Main application script
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
});

function initApp() {
    // Initialize animations
    initAnimations();
    
    // Initialize event listeners
    initEventListeners();
    
    // Initialize user menu
    initUserMenu();
    
    // Initialize quick actions
    initQuickActions();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Simulate data updates
    initDataSimulation();
    
    // Initialize navigation based on current page
    initNavigation();
}

function initAnimations() {
    // Elements appearance animation
    const elements = document.querySelectorAll('.stat-card, .section-card');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function initEventListeners() {
    // Action buttons handlers
    document.querySelectorAll('.section-action').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const action = this.innerText.trim() || this.textContent.trim();
            console.log(`Action: ${action}`);
        });
    });
    
    // Table data loading simulation
    setTimeout(() => {
        const tableRows = document.querySelectorAll('.data-table tr');
        tableRows.forEach((row, index) => {
            setTimeout(() => {
                row.style.opacity = '1';
            }, index * 100);
        });
    }, 300);
    
    // Tabs handlers
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            this.parentElement.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Checkboxes handlers
    const checkboxes = document.querySelectorAll('.checkbox-container input');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const checkmark = this.nextElementSibling;
            if (this.checked) {
                checkmark.style.background = 'var(--accent-color)';
                checkmark.style.borderColor = 'var(--accent-color)';
            } else {
                checkmark.style.background = 'var(--primary-light)';
                checkmark.style.borderColor = 'rgba(255,255,255,0.1)';
            }
        });
    });
}

function initUserMenu() {
    const userProfile = document.querySelector('#user-profile');
    if (userProfile) {
        userProfile.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
        });
    }
    
    // Close user menu when clicking outside
    document.addEventListener('click', function() {
        const userProfile = document.querySelector('#user-profile');
        if (userProfile) userProfile.classList.remove('active');
    });
}

function initQuickActions() {
    // Set CSS variables for quick action buttons
    document.querySelectorAll('.quick-action-btn').forEach(btn => {
        const color = getComputedStyle(btn).getPropertyValue('--color');
        btn.style.setProperty('--color-rgb', hexToRgb(color));
    });
    
    // Add click handlers
    document.querySelectorAll('.quick-action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.getAttribute('data-action') || 
                         this.querySelector('.quick-action-text').textContent.trim().toLowerCase();
            handleQuickAction(action);
        });
    });
}

function initMobileMenu() {
    const menuToggle = document.createElement('div');
    menuToggle.innerHTML = '☰';
    menuToggle.classList.add('menu-toggle');
    document.body.appendChild(menuToggle);
    
    function checkMobile() {
        if (window.innerWidth <= 768) {
            menuToggle.style.display = 'block';
            document.querySelector('.sidebar').classList.remove('active');
        } else {
            menuToggle.style.display = 'none';
            document.querySelector('.sidebar').classList.add('active');
        }
    }
    
    window.addEventListener('resize', checkMobile);
    checkMobile();
    
    menuToggle.addEventListener('click', function() {
        document.querySelector('.sidebar').classList.toggle('active');
    });
}

function initDataSimulation() {
    setInterval(() => {
        const randomValue = Math.floor(Math.random() * 1000) + 500;
        const randomChange = (Math.random() * 5).toFixed(1);
        const isPositive = Math.random() > 0.3;
        
        const statCards = document.querySelectorAll('.stat-card');
        if (statCards.length > 0) {
            statCards[0].querySelector('.stat-value').textContent = `$${randomValue.toLocaleString()}`;
            const changeElement = statCards[0].querySelector('.stat-change');
            changeElement.innerHTML = `<span>${isPositive ? '↑' : '↓'} ${randomChange}%</span> today`;
            changeElement.className = `stat-change ${isPositive ? 'positive' : 'negative'}`;
        }
    }, 5000);
}

function initNavigation() {
    // Highlight current page in menu
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    const pageId = currentPage === 'index' ? 'dashboard' : currentPage;
    
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const activeItem = document.querySelector(`.nav-item[data-page="${pageId}"]`);
    if (activeItem) activeItem.classList.add('active');
    
    // Update page title
    const pageTitles = {
        'dashboard': 'Dashboard',
        'users': 'Users',
        'products': 'Products',
        'finance': 'Finance',
        'settings': 'Settings',
        'reports': 'Reports',
        'security': 'Security',
        'tools': 'Tools'
    };
    
    document.getElementById('page-title').textContent = pageTitles[pageId] || 'Dashboard';
}

function handleQuickAction(action) {
    const actions = {
        'new order': () => showNotification('Creating new order...'),
        'add user': () => window.location.href = 'users.html',
        'create report': () => window.location.href = 'reports.html',
        'system settings': () => window.location.href = 'settings.html'
    };
    
    if (actions[action.toLowerCase()]) {
        actions[action.toLowerCase()]();
    } else {
        showNotification(`Action: ${action}`);
    }
}

function showNotification(message) {
    console.log(message);
    // In a real app, use a proper notification system
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function hexToRgb(hex) {
    // Convert hex color to rgb
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 
        `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` 
        : '110, 69, 226'; // Default purple
}