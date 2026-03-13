// responsive.js

// Create a <style> element
const style = document.createElement('style');
style.innerHTML = `
/* Base styles (mobile-first) */
body {
    font-family: 'Segoe UI', sans-serif;
    margin: 0;
    padding: 0;
}

/* Navbar */
nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 5%;
}

nav ul {
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;
    padding: 0;
    margin: 0;
    list-style: none;
}

nav a.magnetic {
    padding: 8px 16px;
    font-size: 14px;
    margin: 0;
}

/* Sections */
.section {
    padding: 60px 5%;
}

.section h2 {
    font-size: 28px;
}

/* Cards */
.card, .glass-card, .project-card {
    width: 90%;
    margin: 20px auto;
    padding: 20px;
}

.stats-container, .projects-container {
    flex-direction: column;
    gap: 20px;
    align-items: center;
    display: flex;
}

/* Hero */
.hero h1 {
    font-size: 36px;
    text-align: center;
}

.hero p {
    font-size: 16px;
    text-align: center;
}

/* Moon & spaceship */
.moon {
    width: 90px;
    height: 90px;
    top: 100px !important;
    right: 60px !important;
}

.spaceship {
    width: 40px;
}

/* Forms */
form {
    width: 90%;
    margin: 0 auto;
    padding: 15px;
}

form input, form textarea, form button {
    width: 100%;
    padding: 12px;
    font-size: 14px;
}

body {
    cursor: auto;
}

/* Tablet adjustments (768px - 1023px) */
@media (min-width: 768px) {
    nav {
        flex-direction: row;
        justify-content: center;
    }

    nav ul {
        flex-direction: row;
        gap: 25px;
    }

    nav a.magnetic {
        font-size: 16px;
        padding: 10px 18px;
    }

    .stats-container, .projects-container {
        flex-direction: row;
    }

    .section {
        padding: 80px 5%;
    }

    .hero h1 {
        font-size: 48px;
    }

    .hero p {
        font-size: 18px;
    }
}

/* Desktop adjustments (1024px+) */
@media (min-width: 1024px) {
    .card, .glass-card, .project-card {
        width: 60%;
        padding: 30px;
    }

    .hero h1 {
        font-size: 60px;
    }

    .hero p {
        font-size: 20px;
    }

    .section {
        padding: 120px 10%;
    }
}
`;

// Append the style to <head>
document.head.appendChild(style);
