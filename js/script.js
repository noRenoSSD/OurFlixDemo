document.addEventListener('DOMContentLoaded', function() {
    
    // BAGIAN 1: KODE UNTUK MENU MOBILE
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => { mobileMenu.classList.toggle('hidden'); });
    }

    // BAGIAN 2: KODE UNTUK BACKGROUND SLIDESHOW DI HALAMAN JOURNEY
    const journeyBg = document.querySelector('.journey-background');
    if (journeyBg) {
        const images = ['https://picsum.photos/1920/1080?random=30', 'https://picsum.photos/1920/1080?random=31', 'https://picsum.photos/1920/1080?random=32', 'https://picsum.photos/1920/1080?random=33', 'https://picsum.photos/1920/1080?random=34'];
        let currentIndex = 0;
        function changeBackground() {
            const nextImage = new Image();
            nextImage.src = images[(currentIndex + 1) % images.length];
            journeyBg.style.backgroundImage = `url('${images[currentIndex]}')`;
            currentIndex = (currentIndex + 1) % images.length;
        }
        changeBackground();
        setInterval(changeBackground, 7000);
    }

    // BAGIAN 3: LOGIKA UNTUK EFEK BLUR SAAT POPUP AKTIF
    const pageWrapper = document.getElementById('page-wrapper');
    if (pageWrapper) {
        function handleHashChange() {
            if (window.location.hash.startsWith('#popup-')) {
                pageWrapper.classList.add('blur-active');
            } else {
                pageWrapper.classList.remove('blur-active');
            }
        }
        handleHashChange();
        window.addEventListener('hashchange', handleHashChange);
    }
    
    // BAGIAN 4: LOGIKA UNTUK TRANSISI ROKET
    const rocketButton = document.getElementById('rocket-transition');
    if (rocketButton && pageWrapper) {
        rocketButton.addEventListener('click', function(event) {
            event.preventDefault();
            const destinationUrl = this.href;
            pageWrapper.classList.add('page-lifting-off');
            rocketButton.classList.add('launching');
            setTimeout(() => { window.location.href = destinationUrl; }, 1500);
        });
    }

    // BAGIAN 5: LOGIKA UNTUK KURSOR DENGAN BUNTUT
    const followers = document.querySelectorAll('.cursor-follower');
    if (followers.length > 0) {
        const positions = Array(followers.length).fill(null).map(() => ({ x: 0, y: 0 }));
        window.addEventListener('mousemove', function(e) {
            let mouseX = e.clientX;
            let mouseY = e.clientY;
            positions[0] = { x: mouseX, y: mouseY };
            followers[0].style.transform = `translate(${mouseX}px, ${mouseY}px)`;
            for (let i = 1; i < followers.length; i++) {
                positions[i].x += (positions[i - 1].x - positions[i].x) * 0.5;
                positions[i].y += (positions[i - 1].y - positions[i].y) * 0.5;
                followers[i].style.transform = `translate(${positions[i].x}px, ${positions[i].y}px)`;
                const scale = (followers.length - i) / followers.length;
                followers[i].style.transform += ` scale(${scale})`;
            }
        });
    }

    // BAGIAN 6: LOGIKA UNTUK GALERI FOTO DENGAN FLIP CARD
    const galleryGrid = document.getElementById('photo-gallery-grid');
    if (galleryGrid) {
        // ==> PENTING: LENGKAPI DAFTAR INI DENGAN SEMUA NAMA FILE FOTOMU!
        const allImageFiles = [
            'https://picsum.photos/300/200?random=10',
            'https://picsum.photos/300/200?random=11',
            'https://picsum.photos/300/200?random=12',
            'https://picsum.photos/300/200?random=13',
            'https://picsum.photos/300/200?random=14',
            'https://picsum.photos/300/200?random=15',
            'https://picsum.photos/300/200?random=16',
            'https://picsum.photos/300/200?random=17',
            'https://picsum.photos/300/200?random=18',
            'https://picsum.photos/300/200?random=19',
            'https://picsum.photos/300/200?random=20',
            'https://picsum.photos/300/200?random=21',
            'https://picsum.photos/300/200?random=22',
            'https://picsum.photos/300/200?random=23',
            'https://picsum.photos/300/200?random=24',
            'https://picsum.photos/300/200?random=25',
            'https://picsum.photos/300/200?random=26',
            'https://picsum.photos/300/200?random=27',
            'https://picsum.photos/300/200?random=28',
            'https://picsum.photos/300/200?random=29'
        ];

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        const flipCards = document.querySelectorAll('.flip-card');
        const shuffledImages = shuffleArray([...allImageFiles]);

        flipCards.forEach((card, index) => {
            const imgElement = card.querySelector('.gallery-image-slot');
            if (shuffledImages[index]) {
                imgElement.src = shuffledImages[index];
            } else {
                imgElement.src = shuffledImages[index % shuffledImages.length];
            }
        });
        
        function updateRandomCard() {
            if (flipCards.length === 0 || allImageFiles.length < 2) return;
            const randomCardIndex = Math.floor(Math.random() * flipCards.length);
            const targetCard = flipCards[randomCardIndex];
            const targetImageElement = targetCard.querySelector('.gallery-image-slot');
            let newImageSrc;
            do {
                const randomImageFile = allImageFiles[Math.floor(Math.random() * allImageFiles.length)];
                newImageSrc = randomImageFile;
            } while (targetImageElement.src.includes(newImageSrc));
            targetCard.classList.add('is-flipping');
            setTimeout(() => {
                targetImageElement.src = newImageSrc;
            }, 400);
            setTimeout(() => {
                targetCard.classList.remove('is-flipping');
            }, 800);
        }

        function scheduleNextFlip() {
            updateRandomCard();
            const randomInterval = Math.random() * 4000 + 2000;
            setTimeout(scheduleNextFlip, randomInterval);
        }

        scheduleNextFlip();
        scheduleNextFlip();
    }
});