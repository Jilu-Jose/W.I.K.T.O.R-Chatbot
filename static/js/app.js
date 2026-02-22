/* static/js/app.js */

document.addEventListener('DOMContentLoaded', () => {
    // --- State & DOM Elements ---
    const themeToggleBtn = document.getElementById('themeToggle');
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const navLinksList = document.getElementById('navLinks');
    const mobileSidebarToggle = document.getElementById('mobileSidebarToggle');
    const chatSidebar = document.getElementById('chatSidebar');
    
    const chatForm = document.getElementById('chatForm');
    const topicInput = document.getElementById('topicInput');
    const questionInput = document.getElementById('questionInput');
    const chatMessages = document.getElementById('chatMessages');
    const historyList = document.getElementById('historyList');
    const clearHistoryBtn = document.getElementById('clearHistoryBtn');
    const sendBtn = document.getElementById('sendBtn');

    let chatHistory = JSON.parse(localStorage.getItem('wiktor_chat_history')) || [];

    // --- Init ---
    initTheme();
    renderChatHistory();

    // --- Routing (SPA) ---
    window.navigateTo = function(sectionId) {
        // Hide all sections
        document.querySelectorAll('.page-section').forEach(sec => {
            sec.classList.remove('active');
        });
        // Show target section
        const target = document.getElementById(sectionId);
        if (target) {
            target.classList.add('active');
        }
        
        // Close mobile nav if open
        navLinksList.classList.remove('active');
    };

    // --- Theming ---
    function initTheme() {
        // Check local storage first
        const savedTheme = localStorage.getItem('wiktor_theme');
        if (savedTheme === 'light') {
            document.body.classList.remove('dark-theme');
            updateThemeIcon(false);
        } else {
            // Default is dark
            document.body.classList.add('dark-theme');
            updateThemeIcon(true);
        }
    }

    themeToggleBtn.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-theme');
        localStorage.setItem('wiktor_theme', isDark ? 'dark' : 'light');
        updateThemeIcon(isDark);
    });

    function updateThemeIcon(isDark) {
        themeToggleBtn.innerHTML = isDark ? "<i class='bx bx-sun'></i>" : "<i class='bx bx-moon'></i>";
    }

    // --- Mobile Nav ---
    hamburgerMenu.addEventListener('click', () => {
        navLinksList.classList.toggle('active');
    });

    // --- Chat Sidebar Toggle (Mobile) ---
    if(mobileSidebarToggle) {
        mobileSidebarToggle.addEventListener('click', () => {
            chatSidebar.classList.toggle('active');
        });
    }

    // --- Chat Logic ---
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const topic = topicInput.value.trim();
        const question = questionInput.value.trim();

        if (!topic || !question) return;

        // 1. Add User Message to UI
        addMessageToChat('user', question);

        // Clear question input, keep topic
        questionInput.value = '';
        sendBtn.disabled = true;

        // 2. Show Typing Indicator
        const typingId = addTypingIndicator();

        try {
            // 3. API Call to FastAPI Backend
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ topic, question })
            });

            removeTypingIndicator(typingId);

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.detail || 'Failed to fetch answer');
            }

            const data = await response.json();
            
            // 4. Add Bot Message to UI
            addMessageToChat('system', data.answer);

            // 5. Save to History
            saveToHistory(topic, question);

        } catch (error) {
            removeTypingIndicator(typingId);
            addMessageToChat('system', `Error: ${error.message}. Please ensure the topic is a valid Wikipedia page title.`);
        } finally {
            sendBtn.disabled = false;
        }
    });

    function addMessageToChat(role, content) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', role === 'system' ? 'system-msg' : 'user-msg');

        const icon = role === 'system' ? "<i class='bx bx-bot'></i>" : "<i class='bx bx-user'></i>";

        msgDiv.innerHTML = `
            <div class="msg-avatar">${icon}</div>
            <div class="msg-content">${escapeHTML(content)}</div>
        `;

        chatMessages.appendChild(msgDiv);
        scrollToBottom();
    }

    function addTypingIndicator() {
        const id = 'typing-' + Date.now();
        const msgDiv = document.createElement('div');
        msgDiv.id = id;
        msgDiv.classList.add('message', 'system-msg');
        msgDiv.innerHTML = `
            <div class="msg-avatar"><i class='bx bx-bot'></i></div>
            <div class="msg-content" style="padding: 5px 15px;">
                <div class="typing-indicator">
                    <span></span><span></span><span></span>
                </div>
            </div>
        `;
        chatMessages.appendChild(msgDiv);
        scrollToBottom();
        return id;
    }

    function removeTypingIndicator(id) {
        const el = document.getElementById(id);
        if (el) {
            el.remove();
        }
    }

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }

    // --- History Management ---
    function saveToHistory(topic, question) {
        const entry = {
            id: Date.now(),
            topic,
            question,
            timestamp: new Date().toISOString()
        };
        
        chatHistory.unshift(entry); // Add to beginning
        
        // Keep max 50 items
        if(chatHistory.length > 50) chatHistory = chatHistory.slice(0, 50);
        
        localStorage.setItem('wiktor_chat_history', JSON.stringify(chatHistory));
        renderChatHistory();
    }

    function renderChatHistory() {
        historyList.innerHTML = '';
        
        if (chatHistory.length === 0) {
            historyList.innerHTML = '<li class="text-secondary" style="text-align:center; padding: 2rem 0; font-size: 0.9rem;">No history yet</li>';
            return;
        }

        chatHistory.forEach(item => {
            const li = document.createElement('li');
            li.classList.add('history-item');
            li.innerHTML = `
                <i class='bx bx-message-square-detail'></i>
                <div>
                    <div style="font-weight: 500; font-size: 0.85rem;">[${escapeHTML(item.topic)}]</div>
                    <div style="font-size: 0.8rem; opacity: 0.8; overflow: hidden; text-overflow: ellipsis; max-width: 200px;">
                        ${escapeHTML(item.question)}
                    </div>
                </div>
            `;
            
            // Allow clicking history to populate topic
            li.addEventListener('click', () => {
                topicInput.value = item.topic;
                // Auto switch to mobile chat layout if sidebar is open
                if(window.innerWidth <= 900) {
                    chatSidebar.classList.remove('active');
                }
            });

            historyList.appendChild(li);
        });
    }

    clearHistoryBtn.addEventListener('click', () => {
        if(confirm('Are you sure you want to clear your chat history?')) {
            chatHistory = [];
            localStorage.removeItem('wiktor_chat_history');
            renderChatHistory();
        }
    });

    // --- Login Form Handling ---
    const loginForm = document.getElementById('loginForm');
    if(loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Mock login successful!');
            navigateTo('chat');
        });
    }
});
