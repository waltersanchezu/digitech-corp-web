/**
 * Carousel JavaScript para página de clientes
 * Funcionalidad completa con auto-play, navegación por dots y swipe
 */

class ClientsCarousel {
    constructor() {
        this.carousel = document.querySelector('.clients-carousel');
        this.carouselContainer = document.querySelector('.clients-carousel-container');
        this.dots = document.querySelectorAll('.carousel-dot');
        this.cards = document.querySelectorAll('.client-carousel-card');
        
        this.currentIndex = 0;
        this.totalCards = this.cards.length;
        this.autoPlayInterval = null;
        this.isAnimating = false;
        
        this.init();
    }
    
    init() {
        if (!this.carousel || !this.carouselContainer || this.dots.length === 0 || this.cards.length === 0) {
            console.error('Carousel elements not found');
            return;
        }
        
        
        this.setupEventListeners();
        this.updateCarousel(0, false);
        this.startAutoPlay();
    }
    
    updateCarousel(index, animate = true) {
        if (this.isAnimating) return;
        
        // Handle infinite scroll
        if (index < 0) {
            index = this.totalCards - 1;
        } else if (index >= this.totalCards) {
            index = 0;
        }
        
        this.currentIndex = index;
        const translateX = -this.currentIndex * 100;
        
        if (animate) {
            this.isAnimating = true;
            this.carouselContainer.style.transition = 'transform 0.3s ease';
            this.carouselContainer.style.transform = `translateX(${translateX}%)`;
            
            setTimeout(() => {
                this.isAnimating = false;
            }, 300);
        } else {
            this.carouselContainer.style.transition = 'none';
            this.carouselContainer.style.transform = `translateX(${translateX}%)`;
        }
        
        this.updateDots();
    }
    
    updateDots() {
        this.dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === this.currentIndex);
        });
    }
    
    setupEventListeners() {
        // Click on dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                if (index !== this.currentIndex) {
                    this.updateCarousel(index);
                }
            });
        });
        
        // Touch/swipe support
        let startX = 0;
        let endX = 0;
        let isDragging = false;
        
        this.carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            this.carouselContainer.style.transition = 'none';
            this.pauseAutoPlay();
        });
        
        this.carousel.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            const currentX = e.touches[0].clientX;
            const diffX = startX - currentX;
            const translateX = -this.currentIndex * 100 - (diffX / this.carousel.offsetWidth) * 100;
            
            this.carouselContainer.style.transform = `translateX(${translateX}%)`;
        });
        
        this.carousel.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            
            isDragging = false;
            endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            const threshold = 50;
            
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    this.updateCarousel(this.currentIndex + 1);
                } else {
                    this.updateCarousel(this.currentIndex - 1);
                }
            } else {
                this.updateCarousel(this.currentIndex);
            }
            
            this.resumeAutoPlay();
        });
        
        // Mouse drag support
        let mouseStartX = 0;
        let mouseIsDragging = false;
        
        this.carousel.addEventListener('mousedown', (e) => {
            mouseStartX = e.clientX;
            mouseIsDragging = true;
            this.carouselContainer.style.transition = 'none';
            this.carousel.style.cursor = 'grabbing';
            this.pauseAutoPlay();
        });
        
        this.carousel.addEventListener('mousemove', (e) => {
            if (!mouseIsDragging) return;
            
            const currentX = e.clientX;
            const diffX = mouseStartX - currentX;
            const translateX = -this.currentIndex * 100 - (diffX / this.carousel.offsetWidth) * 100;
            
            this.carouselContainer.style.transform = `translateX(${translateX}%)`;
        });
        
        this.carousel.addEventListener('mouseup', (e) => {
            if (!mouseIsDragging) return;
            
            mouseIsDragging = false;
            const endX = e.clientX;
            const diffX = mouseStartX - endX;
            const threshold = 50;
            
            this.carousel.style.cursor = 'grab';
            
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    this.updateCarousel(this.currentIndex + 1);
                } else {
                    this.updateCarousel(this.currentIndex - 1);
                }
            } else {
                this.updateCarousel(this.currentIndex);
            }
            
            this.resumeAutoPlay();
        });
        
        this.carousel.addEventListener('mouseleave', () => {
            if (mouseIsDragging) {
                mouseIsDragging = false;
                this.carousel.style.cursor = 'grab';
                this.updateCarousel(this.currentIndex);
                this.resumeAutoPlay();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.updateCarousel(this.currentIndex - 1);
            } else if (e.key === 'ArrowRight') {
                this.updateCarousel(this.currentIndex + 1);
            }
        });
        
        // Pause auto-play on hover
        this.carousel.addEventListener('mouseenter', () => {
            this.pauseAutoPlay();
        });
        
        this.carousel.addEventListener('mouseleave', () => {
            this.resumeAutoPlay();
        });
    }
    
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.updateCarousel(this.currentIndex + 1);
        }, 5000);
    }
    
    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    resumeAutoPlay() {
        if (!this.autoPlayInterval) {
            this.startAutoPlay();
        }
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new ClientsCarousel();
}); 