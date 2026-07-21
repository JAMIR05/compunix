document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Verificar si hay un tema guardado en el navegador
    const savedTheme = localStorage.getItem('compunix_theme');
    
    // Si hay un tema guardado, aplicarlo
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        updateButtonText(savedTheme);
    }

    // Evento de clic en el botón
    toggleButton.addEventListener('click', () => {
        // Obtener el tema actual
        let currentTheme = htmlElement.getAttribute('data-theme');
        
        // Alternar el tema
        let newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Aplicar los cambios
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('compunix_theme', newTheme);
        updateButtonText(newTheme);
    });

    // Función para actualizar el texto del botón según el modo
    function updateButtonText(theme) {
        if (theme === 'dark') {
            toggleButton.textContent = '☀️ Modo Claro';
        } else {
            toggleButton.textContent = '🌙 Modo Oscuro';
        }
    }
});