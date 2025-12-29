let allPrompts = [];
let filteredPrompts = [];

// Category display names
const categoryNames = {
    'code-generation': 'Code Generation',
    'code-review': 'Code Review',
    'refactoring': 'Refactoring',
    'documentation': 'Documentation',
    'testing': 'Testing',
    'debugging': 'Debugging',
    'architecture': 'Architecture'
};

// Load prompts from JSON
async function loadPrompts() {
    try {
        const response = await fetch('prompts.json');
        const data = await response.json();
        
        // Flatten the nested structure
        allPrompts = [];
        Object.keys(data.categories).forEach(category => {
            Object.keys(data.categories[category]).forEach(key => {
                const prompt = data.categories[category][key];
                allPrompts.push({
                    ...prompt,
                    category: category,
                    id: `${category}-${key}`
                });
            });
        });
        
        filteredPrompts = [...allPrompts];
        renderPrompts();
        updateStats();
    } catch (error) {
        console.error('Error loading prompts:', error);
        document.getElementById('promptsContainer').innerHTML = 
            '<div class="no-results"><p>Error loading prompts. Make sure prompts.json is available.</p></div>';
    }
}

// Render prompts to the DOM
function renderPrompts() {
    const container = document.getElementById('promptsContainer');
    const noResults = document.getElementById('noResults');
    
    if (filteredPrompts.length === 0) {
        container.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }
    
    container.style.display = 'grid';
    noResults.style.display = 'none';
    
    container.innerHTML = filteredPrompts.map(prompt => `
        <div class="prompt-card">
            <div class="prompt-header">
                <div>
                    <div class="prompt-category">${categoryNames[prompt.category] || prompt.category}</div>
                    <div class="prompt-title">${prompt.title}</div>
                </div>
            </div>
            <div class="prompt-tags">
                ${prompt.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <div class="prompt-content">${escapeHtml(prompt.prompt)}</div>
            <button class="copy-btn" onclick="copyPrompt('${prompt.id}')">
                <span>📋</span> Copy Prompt
            </button>
        </div>
    `).join('');
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Update stats
function updateStats() {
    document.getElementById('promptCount').textContent = filteredPrompts.length;
}

// Filter prompts
function filterPrompts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const activeCategory = document.querySelector('.filter-btn.active')?.dataset.category || 'all';
    
    filteredPrompts = allPrompts.filter(prompt => {
        // Category filter
        const categoryMatch = activeCategory === 'all' || prompt.category === activeCategory;
        
        // Search filter
        const searchMatch = !searchTerm || 
            prompt.title.toLowerCase().includes(searchTerm) ||
            prompt.prompt.toLowerCase().includes(searchTerm) ||
            prompt.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        
        return categoryMatch && searchMatch;
    });
    
    renderPrompts();
    updateStats();
}

// Copy prompt to clipboard
async function copyPrompt(promptId) {
    const prompt = allPrompts.find(p => p.id === promptId);
    if (!prompt) return;
    
    try {
        await navigator.clipboard.writeText(prompt.prompt);
        showToast('✅ Prompt copied to clipboard!');
        
        // Update button state
        const buttons = document.querySelectorAll('.copy-btn');
        buttons.forEach(btn => {
            if (btn.textContent.includes('Copied')) {
                btn.classList.remove('copied');
                btn.innerHTML = '<span>📋</span> Copy Prompt';
            }
        });
        
        const button = event.target.closest('.copy-btn');
        if (button) {
            button.classList.add('copied');
            button.innerHTML = '<span>✅</span> Copied!';
            setTimeout(() => {
                button.classList.remove('copied');
                button.innerHTML = '<span>📋</span> Copy Prompt';
            }, 2000);
        }
    } catch (error) {
        console.error('Failed to copy:', error);
        showToast('❌ Failed to copy. Please try again.');
    }
}

// Show toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Event listeners
document.getElementById('searchInput').addEventListener('input', filterPrompts);

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterPrompts();
    });
});

// Load prompts on page load
loadPrompts();

