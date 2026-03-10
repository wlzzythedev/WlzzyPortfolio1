const sections = document.querySelectorAll('section, footer');
const navLinks = document.querySelectorAll('.TopBar_Button');
const viewer = document.getElementById('image-viewer');
const fullImg = document.getElementById('full-image');
const images = document.querySelectorAll('.Project_Image');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');

        } else {
            entry.target.classList.remove('section-visible');
        }
    });
}, { threshold: 0.15 });

sections.forEach(section => {
    section.classList.add('section-hidden');
    observer.observe(section);
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

function copyText(text, button) {
    if (button.classList.contains('copy-success')) return;

    navigator.clipboard.writeText(text).then(() => {
        const originalText = button.innerText;
        button.innerText = "Copied";
        button.classList.add('copy-success');

        setTimeout(() => {
            button.innerText = originalText;
            button.classList.remove('copy-success');
        }, 2000);

    }).catch(err =>
        console.error("Failed to copy", err),
    );
}

images.forEach(img => {
    img.addEventListener('click', () => {
        console.log('Image clicked:', img.src);
        viewer.style.display = 'block';
        fullImg.src = img.src;
    });
});

viewer.addEventListener('click', () => {
    viewer.style.display = 'none';
});