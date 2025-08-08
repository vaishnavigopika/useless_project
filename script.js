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
        this.selectedCategory = 'all';

        this.init();
    }

    init() {
        this.updateStats();
        this.bindEvents();
        this.bindCategoryEvents();
        this.loadAudio();
    }

    loadAudio() {
        this.popSound = new Audio('assets/pop.mp3');
        this.popSound.volume = 0.5;
    }

    bindEvents() {
        const generateBtn = document.getElementById('generateBtn');
        const shareBtn = document.getElementById('shareBtn');
        const favoritesBtn = document.getElementById('favoritesBtn');
        const favoriteBtn = document.getElementById('favoriteBtn');
        const closeModal = document.getElementById('closeModal');
        const favoritesModal = document.getElementById('favoritesModal');

        generateBtn.addEventListener('click', () => this.generateExcuse());
        shareBtn.addEventListener('click', () => this.shareExcuse());
        favoritesBtn.addEventListener('click', () => this.showFavorites());
        favoriteBtn.addEventListener('click', () => this.toggleFavorite());
        closeModal.addEventListener('click', () => this.closeModal());
        
        favoritesModal.addEventListener('click', (e) => {
            if (e.target === favoritesModal) {
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

    bindCategoryEvents() {
        const categoryBtns = document.querySelectorAll('.category-btn');
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Remove active class from all buttons
                categoryBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                e.target.classList.add('active');
                // Update selected category
                this.selectedCategory = e.target.dataset.category;
            });
        });
    }

    generateExcuse() {
        let availableCategories;
        
        if (this.selectedCategory === 'all') {
            availableCategories = Object.keys(this.excuses);
        } else {
            availableCategories = [this.selectedCategory];
        }
        
        const randomCategory = availableCategories[Math.floor(Math.random() * availableCategories.length)];
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

        // Trigger confetti celebration
        this.triggerConfetti();

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
        this.stats.timeWasted += Math.floor(Math.random() * 30) + 5;
        
        // Add to history
        const historyItem = {
            excuse: randomExcuse,
            category: randomCategory,
            timestamp: new Date().toLocaleString(),
            id: Date.now()
        };
        this.history.unshift(historyItem);
        
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

    showFavorites() {
        const favoritesModal = document.getElementById('favoritesModal');
        const favoritesList = document.getElementById('favoritesList');
        
        if (this.favorites.length === 0) {
            favoritesList.innerHTML = '<p class="empty-favorites">No favorite excuses yet. Generate some and add them to favorites!</p>';
        } else {
            favoritesList.innerHTML = this.favorites.map(item => `
            <div class="favorite-item">
                <button class="remove-favorite" onclick="procrastinationApp.removeFavorite(${item.id})" title="Remove from favorites">×</button>
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                    <span class="excuse-category" style="margin: 0;">${item.category}</span>
                    <small style="color: #a0aec0;">${item.timestamp}</small>
                </div>
                <p style="margin: 0; line-height: 1.5; padding-right: 30px;">${item.excuse}</p>
            </div>
        `).join('');
        }
        
        favoritesModal.style.display = 'block';
    }

    removeFavorite(id) {
        this.favorites = this.favorites.filter(fav => fav.id !== id);
        this.stats.favoriteCount = this.favorites.length;
        this.saveData();
        this.updateStats();
        this.showFavorites(); // Refresh the favorites display
        this.showNotification('Removed from favorites');
    }

    triggerConfetti() {
        const canvas = document.getElementById('confetti-canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const confetti = [];
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];
        
        // Create confetti pieces
        for (let i = 0; i < 50; i++) {
            confetti.push({
                x: Math.random() * canvas.width,
                y: -10,
                vx: (Math.random() - 0.5) * 4,
                vy: Math.random() * 3 + 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 8 + 4,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 10
            });
        }
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = confetti.length - 1; i >= 0; i--) {
                const piece = confetti[i];
                
                // Update position
                piece.x += piece.vx;
                piece.y += piece.vy;
                piece.rotation += piece.rotationSpeed;
                
                // Apply gravity
                piece.vy += 0.1;
                
                // Draw confetti piece
                ctx.save();
                ctx.translate(piece.x, piece.y);
                ctx.rotate(piece.rotation * Math.PI / 180);
                ctx.fillStyle = piece.color;
                ctx.fillRect(-piece.size/2, -piece.size/2, piece.size, piece.size);
                ctx.restore();
                
                // Remove confetti that's off screen
                if (piece.y > canvas.height + 10) {
                    confetti.splice(i, 1);
                }
            }
            
            if (confetti.length > 0) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }

    closeModal() {
        const historyModal = document.getElementById('historyModal');
        const favoritesModal = document.getElementById('favoritesModal');
        if(historyModal) historyModal.style.display = 'none';
        if(favoritesModal) favoritesModal.style.display = 'none';
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

// Make the app globally accessible for remove favorite functionality
let procrastinationApp;

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    procrastinationApp = new ProcrastinationGenerator();
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
