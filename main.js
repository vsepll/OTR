/**
 * OTRelectricidad - Main Application Logic
 * Premium Landing Page Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    lucide.createIcons();

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    const toggleMenu = () => {
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    };

    mobileMenuBtn.addEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', toggleMenu);

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // 4. Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Optional: Stop observing once revealed
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Trigger reveal for elements already in viewport on load
    setTimeout(() => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('active');
            }
        });
    }, 100);

    // 5. Quotation Form Logic -> Generate WhatsApp Link
    const quoteForm = document.getElementById('quote-form');
    // Default Phone Number (can be changed later by the user)
    const WHATSAPP_NUMBER = "543525503704";

    quoteForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get Form Values
        const tipoCliente = document.getElementById('tipoCliente').value;
        const servicioInteres = document.getElementById('servicioInteres').value;
        const dimensiones = document.getElementById('dimensiones').value;
        const detalles = document.getElementById('detalles').value;

        // Construct Message
        const message = `Hola OTRelectricidad, me comunico para solicitar un presupuesto.\n\n` +
            `*Detalles del Proyecto:*\n` +
            `- Ámbito: ${tipoCliente}\n` +
            `- Servicio Requerido: ${servicioInteres}\n` +
            `- Dimensiones: ${dimensiones}\n\n` +
            `*Comentarios adicionales:*\n${detalles}\n\n` +
            `Aguardamos su respuesta.`;

        // Encode Message for URL
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

        // Open WhatsApp in new tab
        window.open(whatsappUrl, '_blank');

        // Optional: Reset form after sending
        quoteForm.reset();
    });
});
