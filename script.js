class ProcrastinationGenerator {
    constructor() {
        this.excuses = {
            work: [
                "I need to organize my desk first. A cluttered workspace leads to cluttered thinking!",
                "I should check my emails one more time to make sure I'm not missing anything urgent.",
                "I need to research the best productivity techniques before I start working.",
                "My computer needs to update first. Can't work on an outdated system!",
                "I should make a detailed plan before diving in. Proper planning prevents poor performance!",
                "I need to find the perfect background music for maximum productivity.",
                "My workspace lighting isn't optimal. I need to adjust it for better focus.",
                "I should clear my browser cache first. A clean browser means a clean mind!",
                "I need to backup my files before starting anything important.",
                "I should check if there are any new industry trends I need to know about first."
            ],
            exercise: [
                "I need to research the perfect workout routine first. No point doing it wrong!",
                "I should wait until I have the proper workout clothes. Image matters!",
                "I need to finish this episode first. Can't leave a cliffhanger hanging!",
                "I should eat something light first. Can't exercise on an empty stomach... or too full!",
                "I need to find the perfect workout playlist. Music is 90% of the motivation!",
                "I should check the weather first. Indoor or outdoor workout decisions are crucial!",
                "I need to stretch properly first. This stretching session might take an hour...",
                "I should read about proper form first. Safety first, gains second!",
                "I need to charge my fitness tracker. If it's not tracked, did it really happen?",
                "I should wait for my pre-workout to kick in... in about 2 hours."
            ],
            cleaning: [
                "I need to buy better cleaning supplies first. Can't clean properly with subpar tools!",
                "I should watch a few cleaning tutorials first to do it right.",
                "I need to declutter before I clean. But first, I need to organize the decluttering...",
                "I should put on some good music first. Cleaning without music is just suffering.",
                "I need to move everything out first, but where will I put it all?",
                "I should clean room by room, but I need to decide the optimal order first.",
                "I need to take 'before' photos for that satisfying transformation post!",
                "I should wait until I have a full day free. No point doing a half job!",
                "I need to research the best cleaning methods for each surface type.",
                "I should get some snacks first. Cleaning is exhausting work!"
            ],
            studying: [
                "I need to create the perfect study environment first. Ambiance is everything!",
                "I should organize all my notes before I start studying them.",
                "I need to find the perfect study method. There are so many to choose from!",
                "I should make flashcards first. But first, I need to find the best flashcard app...",
                "I need to take a power nap first. Can't study with a tired brain!",
                "I should create a detailed study schedule first. Time management is key!",
                "I need to gather all my materials first. This might take a while...",
                "I should find a study buddy first. Everything's better with friends!",
                "I need to clear my mind with some meditation first. Inner peace leads to outer success!",
                "I should reward myself with something first to get motivated. Positive reinforcement!"
            ],
            general: [
                "I need to check social media first to see what's happening in the world.",
                "I should have a snack first. Can't think on an empty stomach!",
                "I need to use the bathroom first. Better safe than sorry!",
                "I should check the time first... oh look, it's almost lunch time!",
                "I need to pet my cat/dog first. They look lonely and need attention.",
                "I should check the weather first. It might affect my mood and productivity.",
                "I need to drink some water first. Hydration is important for brain function!",
                "I should stretch first. Sitting too long is bad for posture.",
                "I need to check my phone for important messages first.",
                "I should make some tea/coffee first. Caffeine is essential for productivity!"
            ]
        };

        this.stats = {
            totalExcuses: parseInt(localStorage.getItem('totalExcuses')) || 0,
            favoriteCount: parseInt(localStorage.getItem('favoriteCount')) || 0,
            timeWasted: parseInt(localStorage.getItem('timeWasted')) || 0
        };

        this.history = JSON.parse(localStorage.getItem('excuseHistory')) || [];
        this.favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        this.init();
    }

    init() {
        this.updateStats();
        this.bindEvents();
        this.loadAudio();
    }

    loadAudio() {
        this.popSound = new Audio('assets/pop.mp3');
        this.popSound.volume = 0.5;
    }

    bindEvents() {
        const generateBtn = document.getElementById('generateBtn');
        const shareBtn = document.getElementById('shareBtn');
        const historyBtn = document.getElementById('historyBtn');
        const favoriteBtn = document.getElementById('favoriteBtn');
        const closeModal = document.getElementById('closeModal');
        const historyModal = document.getElementById('historyModal');

        generateBtn.addEventListener('click', () => this.generateExcuse());
        shareBtn.addEventListener('click', () => this.shareExcuse());
        historyBtn.addEventListener('click', () => this.showHistory());
        favoriteBtn.addEventListener('click', () => this.toggleFavorite());
        closeModal.addEventListener('click', () => this.closeModal());
        
        historyModal.addEventListener('click', (e) => {
            if (e.target === historyModal) {
                this.closeModal();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                    e.preventDefault();
                    this.generateExcuse();
                }
            }
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    generateExcuse() {
        const categories = Object.keys(this.excuses);
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        const categoryExcuses = this.excuses[randomCategory];
        const randomExcuse = categoryExcuses[Math.floor(Math.random() * categoryExcuses.length)];

        const excuseText = document.getElementById('excuseText');
        const excuseCategory = document.getElementById('excuseCategory');
        const excuseIcon = document.querySelector('.excuse-icon');

        // Play pop sound
        if (this.popSound) {
            this.popSound.currentTime = 0;
            this.popSound.play().catch(e => console.log('Audio play failed:', e));
        }

        // Animate the card
        const excuseCard = document.querySelector('.excuse-card');
        excuseCard.style.transform = 'scale(0.95)';
        setTimeout(() => {
            excuseCard.style.transform = 'scale(1)';
        }, 150);

        // Update content with animation
        excuseText.style.opacity = '0';
        setTimeout(() => {
            excuseText.textContent = randomExcuse;
            excuseCategory.textContent = `Category: ${randomCategory.charAt(0).toUpperCase() + randomCategory.slice(1)}`;
            excuseText.style.opacity = '1';
            
            // Change icon based on category
            const icons = {
                work: '💼',
                exercise: '🏃‍♂️',
                cleaning: '🧹',
                studying: '📚',
                general: '🤔'
            };
            excuseIcon.textContent = icons[randomCategory] || '🤔';
        }, 200);

        // Update stats
        this.stats.totalExcuses++;
        this.stats.timeWasted += Math.floor(Math.random() * 30) + 5; // Random time between 5-35 minutes
        
        // Add to history
        const historyItem = {
            excuse: randomExcuse,
            category: randomCategory,
            timestamp: new Date().toLocaleString(),
            id: Date.now()
        };
        this.history.unshift(historyItem);
        
        // Keep only last 50 excuses
        if (this.history.length > 50) {
            this.history = this.history.slice(0, 50);
        }

        this.currentExcuse = historyItem;
        this.saveData();
        this.updateStats();
    }

    shareExcuse() {
        if (!this.currentExcuse) {
            alert('Generate an excuse first!');
            return;
        }

        const shareText = `My excuse for procrastinating: "${this.currentExcuse.excuse}" 😄\n\nGenerated by ProcrastiNation - The Art of Creative Delays!`;
        
        if (navigator.share) {
            navigator.share({
                title: 'My Procrastination Excuse',
                text: shareText,
                url: window.location.href
            });
        } else {
            // Fallback to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                this.showNotification('Excuse copied to clipboard!');
            }).catch(() => {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = shareText;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                this.showNotification('Excuse copied to clipboard!');
            });
        }
    }

    toggleFavorite() {
        if (!this.currentExcuse) {
            alert('Generate an excuse first!');
            return;
        }

        const favoriteBtn = document.getElementById('favoriteBtn');
        const existingIndex = this.favorites.findIndex(fav => fav.id === this.currentExcuse.id);
        
        if (existingIndex > -1) {
            this.favorites.splice(existingIndex, 1);
            favoriteBtn.textContent = '🤍 Favorite';
            this.stats.favoriteCount--;
            this.showNotification('Removed from favorites');
        } else {
            this.favorites.push(this.currentExcuse);
            favoriteBtn.textContent = '❤️ Favorited';
            this.stats.favoriteCount++;
            this.showNotification('Added to favorites!');
        }

        this.saveData();
        this.updateStats();
    }

    showHistory() {
        const historyModal = document.getElementById('historyModal');
        const historyList = document.getElementById('historyList');
        
        if (this.history.length === 0) {
            historyList.innerHTML = '<p class="empty-history">No excuses generated yet. Start procrastinating!</p>';
        } else {
            historyList.innerHTML = this.history.map(item => `
                <div class="history-item">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                        <span class="excuse-category" style="margin: 0;">${item.category}</span>
                        <small style="color: #a0aec0;">${item.timestamp}</small>
                    </div>
                    <p style="margin: 0; line-height: 1.5;">${item.excuse}</p>
                </div>
            `).join('');
        }
        
        historyModal.style.display = 'block';
    }

    closeModal() {
        const historyModal = document.getElementById('historyModal');
        historyModal.style.display = 'none';
    }

    updateStats() {
        document.getElementById('totalExcuses').textContent = this.stats.totalExcuses;
        document.getElementById('favoriteCount').textContent = this.stats.favoriteCount;
        document.getElementById('timeWasted').textContent = this.stats.timeWasted;
    }

    saveData() {
        localStorage.setItem('totalExcuses', this.stats.totalExcuses);
        localStorage.setItem('favoriteCount', this.stats.favoriteCount);
        localStorage.setItem('timeWasted', this.stats.timeWasted);
        localStorage.setItem('excuseHistory', JSON.stringify(this.history));
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }

    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 1001;
            font-weight: 600;
            animation: slideInRight 0.3s ease;
        `;

        // Add animation keyframes
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProcrastinationGenerator();
});

// Add some fun easter eggs
document.addEventListener('keydown', (e) => {
    // Konami code easter egg
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    if (!window.konamiProgress) window.konamiProgress = 0;
    
    if (e.keyCode === konamiCode[window.konamiProgress]) {
        window.konamiProgress++;
        if (window.konamiProgress === konamiCode.length) {
            document.body.style.animation = 'rainbow 2s infinite';
            setTimeout(() => {
                document.body.style.animation = '';
                window.konamiProgress = 0;
            }, 10000);
        }
    } else {
        window.konamiProgress = 0;
    }
});

// Add rainbow animation for easter egg
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);
