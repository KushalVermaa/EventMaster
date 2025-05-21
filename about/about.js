document.addEventListener('DOMContentLoaded', function() {
    // Team member cards
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => {
        card.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.02)';
        });
        card.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Testimonial slider
    const testimonials = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;

    function showNextTestimonial() {
        testimonials[currentTestimonial].style.display = 'none';
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        testimonials[currentTestimonial].style.display = 'block';
    }

    function showPreviousTestimonial() {
        testimonials[currentTestimonial].style.display = 'none';
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        testimonials[currentTestimonial].style.display = 'block';
    }

    // Initialize testimonials
    testimonials.forEach(testimonial => {
        testimonial.style.display = 'none';
    });
    testimonials[0].style.display = 'block';

    // Auto-rotate testimonials
    setInterval(showNextTestimonial, 5000);

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});