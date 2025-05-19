// Quantum Admin - Complete JavaScript Bundle
document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // CORE FUNCTIONALITY
    // ======================
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle') || createMobileToggle();
    
    // Sidebar navigation
    initSidebar();
    
    // Notification system
    initNotifications();
    
    // Dashboard widgets
    if (document.querySelector('.dashboard-content')) {
        new DashboardWidgets();
        initMetrics();
    }
    
    // Team page functionality
    if (document.querySelector('.team-content')) {
        initTeamPage();
    }
    
    // Finance page functionality
    if (document.querySelector('.finance-viz')) {
        initFinancePage();
    }
    
    // Settings page functionality
    if (document.querySelector('.settings-content')) {
        initSettingsPage();
    }
    
    // Initialize all tooltips
    initTooltips();
});

// ======================
// CORE COMPONENTS
// ======================

function createMobileToggle() {
    const toggle = document.createElement('div');
    toggle.className = 'mobile-menu-toggle';
    toggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.main-header').prepend(toggle);
    
    toggle.addEventListener('click', function() {
        document.querySelector('.sidebar').classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    return toggle;
}

function initSidebar() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // Close mobile menu if open
            if (document.body.classList.contains('menu-open')) {
                document.body.classList.remove('menu-open');
                document.querySelector('.sidebar').classList.remove('active');
            }
        });
    });
}

function initNotifications() {
    const notificationBell = document.querySelector('.notification-bell');
    if (!notificationBell) return;
    
    // Mock notifications data
    const notifications = [
        { id: 1, text: 'New user registered', time: '2 min ago', read: false },
        { id: 2, text: 'System update available', time: '1 hour ago', read: false },
        { id: 3, text: 'Completed backup process', time: '3 hours ago', read: true }
    ];
    
    notificationBell.addEventListener('click', function(e) {
        e.stopPropagation();
        const dropdown = document.querySelector('.notifications-dropdown') || createNotificationsDropdown();
        dropdown.classList.toggle('active');
    });
    
    // Close when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.notification-bell')) {
            const dropdown = document.querySelector('.notifications-dropdown');
            if (dropdown) dropdown.classList.remove('active');
        }
    });
}

// ======================
// PAGE-SPECIFIC MODULES
// ======================

// Dashboard Module
class DashboardWidgets {
    constructor() {
        this.widgets = document.querySelectorAll('.metric-card, .chart-card');
        this.init();
    }
    
    init() {
        this.widgets.forEach(widget => {
            // Add settings button
            if (!widget.querySelector('.widget-settings')) {
                const settingsBtn = document.createElement('div');
                settingsBtn.className = 'widget-settings';
                settingsBtn.innerHTML = '<i class="fas fa-cog"></i>';
                widget.appendChild(settingsBtn);
                
                settingsBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.showWidgetSettings(widget);
                });
            }
            
            // Widget focus effect
            widget.addEventListener('click', (e) => {
                if (e.target.closest('.widget-settings')) return;
                this.toggleWidgetFocus(widget);
            });
        });
    }
    
    toggleWidgetFocus(widget) {
        this.widgets.forEach(w => w.classList.remove('focused'));
        widget.classList.add('focused');
    }
    
    showWidgetSettings(widget) {
        // In a real implementation, this would show a settings modal
        console.log('Settings for:', widget.dataset.widgetType || 'generic widget');
    }
}

function initMetrics() {
    // Simulate live data updates
    setInterval(() => {
        const metrics = document.querySelectorAll('.metric-value');
        metrics.forEach(metric => {
            if (metric.dataset.animate) {
                const current = parseInt(metric.textContent.replace(/,/g, ''));
                const change = Math.floor(Math.random() * 20) - 5;
                const newValue = Math.max(0, current + change);
                metric.textContent = newValue.toLocaleString();
                
                // Update trend indicator
                const trend = metric.parentElement.querySelector('.metric-change');
                if (trend) {
                    trend.className = 'metric-change ' + (change > 0 ? 'positive' : change < 0 ? 'negative' : 'neutral');
                    trend.innerHTML = (change > 0 ? '+' : '') + change + ' <i class="fas fa-arrow-' + 
                                    (change > 0 ? 'up' : 'down') + '"></i>';
                }
            }
        });
    }, 5000);
}

// Team Page Module
function initTeamPage() {
    // Member selection
    const checkboxes = document.querySelectorAll('.team-table input[type="checkbox"]');
    const selectAll = document.querySelector('.select-all');
    
    if (selectAll) {
        selectAll.addEventListener('change', function() {
            checkboxes.forEach(checkbox => {
                checkbox.checked = selectAll.checked;
            });
        });
    }
    
    // Action buttons
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.dataset.action;
            const selected = Array.from(checkboxes).filter(c => c.checked);
            
            if (selected.length === 0 && action !== 'add') {
                alert('Please select at least one team member');
                return;
            }
            
            switch(action) {
                case 'edit':
                    console.log('Editing:', selected.map(s => s.value));
                    break;
                case 'delete':
                    if (confirm(`Delete ${selected.length} members?`)) {
                        selected.forEach(checkbox => {
                            checkbox.closest('tr').remove();
                        });
                    }
                    break;
                case 'add':
                    console.log('Add new member');
                    break;
            }
        });
    });
}

// Finance Page Module
function initFinancePage() {
    // Time period filtering
    const periodFilters = document.querySelectorAll('.time-filter');
    periodFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            periodFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            // In a real app, this would reload the chart data
            console.log('Loading data for:', this.dataset.period);
        });
    });
    
    // Transaction filtering
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function() {
            console.log('Searching for:', this.value);
        }, 300));
    }
}

// Settings Page Module
function initSettingsPage() {
    // Tab switching
    const navItems = document.querySelectorAll('.settings-nav-item');
    const panels = document.querySelectorAll('.settings-panel');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const target = this.dataset.target;
            
            navItems.forEach(i => i.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });
    
    // Theme selection
    document.querySelectorAll('.theme-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.theme-option').forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            console.log('Selected theme:', this.dataset.theme);
        });
    });
    
    // Toggle switches
    document.querySelectorAll('.toggle-switch input').forEach(switchEl => {
        switchEl.addEventListener('change', function() {
            const subOption = this.closest('.form-group').querySelector('.sub-option');
            if (subOption) {
                subOption.style.display = this.checked ? 'block' : 'none';
            }
        });
    });
}

// ======================
// UTILITY FUNCTIONS
// ======================

function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

function initTooltips() {
    // Initialize tooltips using data-tooltip attributes
    document.querySelectorAll('[data-tooltip]').forEach(el => {
        el.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.dataset.tooltip;
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = `${rect.left + rect.width/2 - tooltip.offsetWidth/2}px`;
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 5}px`;
            
            this.addEventListener('mouseleave', () => tooltip.remove(), { once: true });
        });
    });
}

function createNotificationsDropdown() {
    const dropdown = document.createElement('div');
    dropdown.className = 'notifications-dropdown';
    
    // Add notification items
    notifications.forEach(notif => {
        const item = document.createElement('div');
        item.className = `notification-item ${notif.read ? 'read' : 'unread'}`;
        item.innerHTML = `
            <div class="notification-text">${notif.text}</div>
            <div class="notification-time">${notif.time}</div>
        `;
        dropdown.appendChild(item);
    });
    
    // Add view all link
    const footer = document.createElement('div');
    footer.className = 'notifications-footer';
    footer.innerHTML = '<a href="#">View all notifications</a>';
    dropdown.appendChild(footer);
    
    document.querySelector('.header-right').appendChild(dropdown);
    return dropdown;
}