document.addEventListener('DOMContentLoaded', () => {
    const emails = document.querySelectorAll('.contact-card p strong');

    emails.forEach(email => {
        email.addEventListener('click', () => {
            alert(`Deseja enviar um e-mail para ${email.textContent}?`);
        });
    });
});
