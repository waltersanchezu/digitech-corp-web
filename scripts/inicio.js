// Importar el componente navbar
import './components/navbar.js';

// Carousel functionality
class HeroCarousel {
  constructor() {
    this.currentSlide = 1;
    this.totalSlides = 6;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 5000; // 5 segundos
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.startAutoPlay();
  }
  
  bindEvents() {
    // Controles de navegación
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.prevSlide());
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.nextSlide());
    }
    
    // Indicadores
    const indicators = document.querySelectorAll('.carousel-indicators .indicator');
    indicators.forEach(indicator => {
      indicator.addEventListener('click', (e) => {
        const slideNumber = parseInt(e.target.dataset.slide);
        this.goToSlide(slideNumber);
      });
    });
    
    // Pausar autoplay al hacer hover
    const carousel = document.querySelector('.hero-carousel');
    if (carousel) {
      carousel.addEventListener('mouseenter', () => this.pauseAutoPlay());
      carousel.addEventListener('mouseleave', () => this.startAutoPlay());
    }
    
    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.prevSlide();
      } else if (e.key === 'ArrowRight') {
        this.nextSlide();
      }
    });
  }
  
  goToSlide(slideNumber) {
    // Ocultar slide actual
    const currentSlide = document.querySelector(`.carousel-slide[data-slide="${this.currentSlide}"]`);
    const currentIndicator = document.querySelector(`.indicator[data-slide="${this.currentSlide}"]`);
    
    if (currentSlide) {
      currentSlide.classList.remove('active');
    }
    if (currentIndicator) {
      currentIndicator.classList.remove('active');
    }
    
    // Mostrar nuevo slide
    const newSlide = document.querySelector(`.carousel-slide[data-slide="${slideNumber}"]`);
    const newIndicator = document.querySelector(`.indicator[data-slide="${slideNumber}"]`);
    
    if (newSlide) {
      newSlide.classList.add('active');
    }
    if (newIndicator) {
      newIndicator.classList.add('active');
    }
    
    this.currentSlide = slideNumber;
  }
  
  nextSlide() {
    const nextSlideNumber = this.currentSlide === this.totalSlides ? 1 : this.currentSlide + 1;
    this.goToSlide(nextSlideNumber);
  }
  
  prevSlide() {
    const prevSlideNumber = this.currentSlide === 1 ? this.totalSlides : this.currentSlide - 1;
    this.goToSlide(prevSlideNumber);
  }
  
  startAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
    
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoPlayDelay);
  }
  
  pauseAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }
}

// Inicializar el carousel cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new HeroCarousel();
});
