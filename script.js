const surpriseBtn = document.getElementById('surpriseBtn');
const birthdayReveal = document.getElementById('birthdayReveal');
const surpriseMessage = document.getElementById('surpriseMessage');
const secretMessageToggle = document.getElementById('secretMessageToggle');
const birthdayPopup = document.getElementById('birthdayPopup');
const celebrationModal = document.getElementById('celebrationModal');
const closePopupBtn = document.querySelector('.close-popup');
const celebrationCloseBtn = document.querySelector('.celebration-close');
const wishBtn = document.getElementById('wishBtn');
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const galleryGrid = document.getElementById('galleryGrid');
const closeModalButton = document.querySelector('.modal-close');
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');

const galleryImages = ['b.jpeg', 'image.jpeg', 'img.jpeg', 'ks.jpeg', 'pic.jpeg', 'krishna.jpeg'];

const createGallery = () => {
  galleryImages.forEach((image, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'gallery-item';
    button.dataset.image = image;
    button.dataset.title = `Beautiful Memory ${index + 1}`;

    const img = document.createElement('img');
    img.src = image;
    img.alt = `Beautiful Memory ${index + 1}`;
    button.appendChild(img);

    button.addEventListener('click', () => {
      modalImage.src = image;
      modalTitle.textContent = `Beautiful Memory ${index + 1}`;
      imageModal.classList.add('visible');
      imageModal.setAttribute('aria-hidden', 'false');
    });

    galleryGrid.appendChild(button);
  });
};

const burstConfetti = () => {
  const colors = ['#ff8aa5', '#ffb59b', '#ffdfe9', '#ffffff', '#f7a07a', '#ff6fa8', '#f4d03f'];
  const particles = [];

  for (let i = 0; i < 150; i++) {
    particles.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      radius: Math.random() * 7 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedX: (Math.random() - 0.5) * 14,
      speedY: (Math.random() - 0.5) * 14,
      gravity: 0.12 + Math.random() * 0.15,
      alpha: 1,
      rotation: Math.random() * Math.PI * 2
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle, index) => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      particle.speedY += particle.gravity;
      particle.alpha -= 0.0025;
      particle.rotation += particle.speedX * 0.02;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particle.color.replace(')', `, ${particle.alpha})`).replace('rgb', 'rgba');
      ctx.fill();

      if (particle.alpha <= 0) {
        particles.splice(index, 1);
      }
    });

    if (particles.length > 0) {
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  animate();
};

const resizeCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

// Add scroll animation for sections
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'slideUp 0.8s ease forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.glass').forEach(element => {
  element.style.opacity = '0';
  observer.observe(element);
});

surpriseBtn.addEventListener('click', () => {
  const isVisible = birthdayReveal.classList.toggle('visible');
  surpriseMessage.classList.toggle('visible', isVisible);
  surpriseBtn.textContent = isVisible ? 'Hide Surprise' : 'Open Surprise';
  burstConfetti();
});

const closeModal = () => {
  imageModal.classList.remove('visible');
  imageModal.setAttribute('aria-hidden', 'true');
};

closeModalButton.addEventListener('click', closeModal);
imageModal.addEventListener('click', (event) => {
  if (event.target.dataset.close === 'true' || event.target === imageModal) {
    closeModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && imageModal.classList.contains('visible')) {
    closeModal();
  }
});

// Secret Message Toggle
secretMessageToggle.addEventListener('click', function() {
  console.log('Button clicked!');
  console.log('Current classes:', surpriseMessage.className);
  
  surpriseMessage.classList.toggle('revealed');
  
  console.log('After toggle classes:', surpriseMessage.className);
  
  const isRevealed = surpriseMessage.classList.contains('revealed');
  secretMessageToggle.textContent = isRevealed ? '🔓 Hide Secret Message' : '🔒 Unlock Secret Message';
  
  if (isRevealed) {
    burstConfetti();
    // Show birthday popup after 1 second
    setTimeout(() => {
      showBirthdayPopup();
    }, 1000);
  }
});

// Birthday Popup Functions
const showBirthdayPopup = () => {
  birthdayPopup.classList.add('show');
};

const hideBirthdayPopup = () => {
  birthdayPopup.classList.remove('show');
};

const showCelebration = () => {
  celebrationModal.classList.add('show');
  burstConfetti();
  setTimeout(() => {
    // Auto-close after 5 seconds
    hideCelebration();
  }, 5000);
};

const hideCelebration = () => {
  celebrationModal.classList.remove('show');
};

// Popup Event Listeners
closePopupBtn.addEventListener('click', hideBirthdayPopup);
wishBtn.addEventListener('click', () => {
  hideBirthdayPopup();
  setTimeout(() => {
    showCelebration();
  }, 500);
});

celebrationCloseBtn.addEventListener('click', hideCelebration);
birthdayPopup.addEventListener('click', (e) => {
  if (e.target === birthdayPopup) {
    hideBirthdayPopup();
  }
});

createGallery();
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
