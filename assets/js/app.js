const initializeGallery = () => {
    const dialog = document.querySelector('#art-dialog');
    if (!dialog || typeof dialog.showModal !== 'function') return;
    const links = [...document.querySelectorAll('.art-open')];
    let current = 0;
    let returnFocus = null;

    const showArtwork = (index) => {
        current = (index + links.length) % links.length;
        const link = links[current];
        const card = link.closest('.sky-art');
        const original = link.querySelector('img');
        const image = dialog.querySelector('#dialog-image');
        image.src = link.href;
        image.alt = original.alt;
        dialog.querySelector('#dialog-title').textContent = card.querySelector('h3').textContent;
        dialog.querySelector('#dialog-caption').textContent = card.querySelector('figcaption').textContent;
        dialog.querySelector('#dialog-position').textContent = `Obra ${current + 1} de ${links.length}`;
        dialog.querySelector('#dialog-source').href = card.querySelector('.art-source').href;
    };

    links.forEach((link, index) => {
        link.addEventListener('click', (event) => {
            // Conservar abrir en otra pestaña mediante Ctrl/Cmd/clic central.
            if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
            event.preventDefault();
            returnFocus = link;
            showArtwork(index);
            dialog.showModal();
        });
    });
    dialog.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
    dialog.querySelector('#previous-art').addEventListener('click', () => showArtwork(current - 1));
    dialog.querySelector('#next-art').addEventListener('click', () => showArtwork(current + 1));
    dialog.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            event.preventDefault();
            showArtwork(current + (event.key === 'ArrowRight' ? 1 : -1));
        }
    });
    dialog.addEventListener('close', () => returnFocus?.focus({ preventScroll: true }));
};

// En pantallas pequeñas, el menú se puede abrir y cerrar con un botón.
const initializeNavigation = () => {
    document.querySelectorAll('.navbar').forEach((navbar) => {
        const toggle = navbar.querySelector('.nav-toggle');
        const list = navbar.querySelector('.nav-list');
        if (!toggle || !list) return;

        navbar.classList.add('has-toggle');
        toggle.hidden = false;
        toggle.addEventListener('click', () => {
            const isOpen = navbar.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', String(isOpen));
            toggle.textContent = isOpen ? 'Cerrar menú' : 'Menú';
        });
        // Enter activa el enlace enfocado y dispara este evento antes de navegar.
        list.addEventListener('click', (event) => {
            if (!event.target.closest('a')) return;
            navbar.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.textContent = 'Menú';
        });
        // Escape cierra el menú sin activar el enlace enfocado.
        navbar.addEventListener('keydown', (event) => {
            if (event.key !== 'Escape' || !navbar.classList.contains('is-open')) return;
            navbar.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.textContent = 'Menú';
            toggle.focus();
        });
    });
};

const initializeThemeToggle = () => {
    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;

    let isDark = document.documentElement.dataset.theme === 'dark';

    const applyTheme = (dark) => {
        document.documentElement.dataset.theme = dark ? 'dark' : 'light';
        toggle.setAttribute('aria-pressed', String(dark));
    };

    applyTheme(isDark);
    toggle.hidden = false;
    toggle.addEventListener('click', () => {
        isDark = !isDark;
        applyTheme(isDark);
        try {
            localStorage.setItem('cielo-theme', isDark ? 'dark' : 'light');
        } catch {
            // La selección se mantiene durante esta visita aunque no pueda guardarse.
        }
    });
};

const initializeBackToTop = () => {
    const link = document.querySelector('.back-to-top');
    if (!link) return;

    const updateVisibility = () => {
        link.hidden = window.scrollY < 500;
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
};

const initializeEclipse = () => {
    const controls = document.querySelector('.eclipse-controls');
    if (!controls) return;
    controls.hidden = false;
    controls.querySelectorAll('button').forEach((button) => {
        button.addEventListener('click', () => {
            const lunar = button.dataset.eclipse === 'lunar';
            controls.querySelectorAll('button').forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
            const middle = document.querySelector('#middle-body');
            const last = document.querySelector('#last-body');
            middle.setAttribute('class', lunar ? 'diagram-earth' : 'diagram-moon');
            middle.setAttribute('r', lunar ? '34' : '20');
            last.setAttribute('class', lunar ? 'diagram-moon' : 'diagram-earth');
            last.setAttribute('r', lunar ? '20' : '34');
            document.querySelector('#middle-label').textContent = lunar ? 'Tierra' : 'Luna';
            document.querySelector('#last-label').textContent = lunar ? 'Luna' : 'Tierra';
            document.querySelector('#shadow-cone').setAttribute('d', lunar ? 'M250 81 L450 90 L450 140 L250 149 Z' : 'M250 95 L430 110 L430 120 L250 135 Z');
            document.querySelector('#diagram-title').textContent = `Alineación de un eclipse ${lunar ? 'lunar' : 'solar'}`;
            document.querySelector('#diagram-description').textContent = lunar ? 'Sol, Tierra y Luna, en ese orden. La Luna entra en la sombra terrestre. Esquema sin escala.' : 'Sol, Luna y Tierra, en ese orden. La sombra lunar alcanza parte de la Tierra. Esquema sin escala.';
            document.querySelector('#eclipse-description').textContent = lunar ? 'Lunar: Sol → Tierra → Luna. La Luna pasa por la sombra de la Tierra.' : 'Solar: Sol → Luna → Tierra. La sombra de la Luna alcanza una parte de la Tierra.';
        });
    });
};

const initializeQuiz = () => {
    const form = document.querySelector('#quiz');
    if (!form) return;
    const result = document.querySelector('#quiz-result');
    const answers = {
        rosetsu: { value: 'moon', text: 'La obra de Rosetsu muestra un paisaje nocturno iluminado por la Luna.' },
        turner: { value: 'moon', text: 'La Luna y las antorchas iluminan la escena de los trabajadores portuarios de Turner.' },
        eclipse: { value: 'observed', text: 'Butler pintó eclipses que observó; Rahu es una figura religiosa asociada a eclipses.' }
    };
    form.querySelector('.quiz-actions').hidden = false;
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const data = new FormData(form);
        let score = 0;
        Object.entries(answers).forEach(([name, answer]) => {
            const correct = data.get(name) === answer.value;
            if (correct) score += 1;
            document.querySelector(`#feedback-${name}`).textContent = `${correct ? 'Correcto.' : 'Para revisar.'} ${answer.text}`;
        });
        result.textContent = `${score} de 3 respuestas correctas. ${score === 3 ? '¡Observaste muy bien las obras!' : 'Leé las explicaciones y volvé a mirar las galerías.'}`;
    });
    const clearFeedback = () => {
        result.textContent = '';
        form.querySelectorAll('.answer-feedback').forEach((feedback) => { feedback.textContent = ''; });
    };
    form.addEventListener('reset', clearFeedback);
    form.addEventListener('change', clearFeedback);
};

initializeNavigation();
initializeThemeToggle();
initializeBackToTop();
initializeGallery();
initializeEclipse();
initializeQuiz();
