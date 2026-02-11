document.addEventListener('DOMContentLoaded', () => {
    // CAROUSEL LOGIC (RETAINED)
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    let currentIndex = 0;

    function moveSlide(index) {
        currentIndex = (index + slides.length) % slides.length;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    nextBtn.addEventListener('click', () => moveSlide(currentIndex + 1));
    prevBtn.addEventListener('click', () => moveSlide(currentIndex - 1));
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => moveSlide(i));
    });
    setInterval(() => moveSlide(currentIndex + 1), 6000);

    // IMPACT COUNTER LOGIC
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const startCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;
                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    const observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting) {
            startCounters();
            observer.disconnect();
        }
    }, { threshold: 0.5 });

    observer.observe(document.querySelector('.impact-section'));
});