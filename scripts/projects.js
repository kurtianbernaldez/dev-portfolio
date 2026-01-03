// Projects Data Array
const projects = [
    {
        name: "A&G POS & Inventory Management System",
        image: "images/projects/ag.png",
        description: "A comprehensive full-stack POS and inventory management system with multi-instance architecture, secure authentication, and advanced business modules including sales, purchases, and analytics.",
        tech: ["Next.js 16", "React 19", "TypeScript", "Node.js", "PostgreSQL"],
        link: "" // Add your project URL here
    },
    {
        name: "TeaNuma",
        image: "images/projects/teanuma.png",
        description: "An online therapy marketplace platform with custom theme extensions, therapist/client profiles, subscription management, and messaging features.",
        tech: ["WordPress", "Elementor", "PHP", "WooCommerce", "Paid Memberships Pro"],
        link: "https://teanuma.com/" // Add your project URL here
    },
    {
        name: "DateVoo",
        image: "images/projects/datevoo.png",
        description: "A comprehensive dating platform with advanced membership systems, multi-tier subscriptions, and custom user verification workflows.",
        tech: ["WordPress", "WooCommerce", "Paid Memberships Pro"],
        link: "" // Add your project URL here
    },
    {
        name: "Social Link Website",
        image: "images/projects/social-link.png",
        description: "A simple, clean social link website built for an artist, serving as a central hub for their online profiles, links, and contact information, making it easy for fans and collaborators to connect and stay in touch.",
        tech: ["WordPress", "PHP", "CSS", "JavaScript", "SEO"],
        link: "https://wetsoggy.42web.io/?i=1" // Add your project URL here
    },
    {
        name: "FoodPrep Pro",
        image: "images/projects/foodprep.png",
        description: "Led the end-to-end development of an Admin and Staff management portal for a local food service startup, streamlining workflows and significantly improving operational efficiency.",
        tech: ["React", "Firebase", "PayMongo"],
        link: "" // Add your project URL here
    },
    {
        name: "SSGC Group",
        image: "images/projects/ssgc.png",
        description: "Redesigned and optimized the company WordPress website for brand presentation, SEO, and better user interaction.",
        tech: ["WordPress", "PHP", "CSS", "JavaScript", "SEO"],
        link: "" // Add your project URL here
    }
];

// Mockups Data Array (separate from projects)
const mockups = [
    {
        name: "Aprilia RSV4 Factory 1100 - Landing Page Mockup",
        image: "images/projects/mockups/mockup-1.png",
        description: "A visually driven landing page mockup highlighting the performance and racing identity of the Aprilia RSV4 Factory 1100 through bold layouts and modern UI design.",
        link: "https://www.figma.com/design/qpyJOoWdomsfnEDmQfnh3H/RSV4-Landing-Page?node-id=0-1&t=IqPNbV1lEOuDc8Mv-1" 
    },
    {
        name: "Ka'Chava - Homepage Redesign",
        image: "images/projects/mockups/mockup-2.png",
        description: "A homepage redesign concept focused on improving user experience, content clarity, and conversion through clean, modern design.",
        link: "https://www.figma.com/design/uK1K3j7dJtIgjfFszCb6IS/Ka-Chava-Redesign?node-id=0-1&t=lfhqPc9jXh352U9C-1" 
    }
    // Add more mockups here as needed
];

// Global variable to track current view mode
let showMockups = false;

// Function to generate project card HTML
function generateProjectCard(project) {
    const techTags = project.tech.map(tech => 
        `<span class="tech-tag">${tech}</span>`
    ).join('');

    // Use image if provided, otherwise show placeholder
    const imageHTML = project.image 
        ? `<img src="${project.image}" alt="${project.name}" class="project-img">`
        : `<div class="project-placeholder">Project Image</div>`;

    // Only show button if link exists
    const buttonHTML = project.link 
        ? `<a href="${project.link}" target="_blank" rel="noopener noreferrer" class="visit-site-btn">
               <span>Visit Site</span>
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
               </svg>
           </a>`
        : '';

    return `
        <div class="project-card">
            <div class="project-image">
                ${imageHTML}
            </div>
            <div class="project-content">
                <h3 class="project-name">${project.name}</h3>
                <div class="project-tech">
                    ${techTags}
                </div>
                <p class="project-description">${project.description}</p>
                <div class="project-footer">
                    ${buttonHTML}
                </div>
            </div>
        </div>
    `;
}

// Function to generate mockup card HTML
function generateMockupCard(mockup) {
    // Always show a placeholder div that can display the image or a placeholder
    const imageHTML = `
        <div class="mockup-image-wrapper">
            <img src="${mockup.image}" alt="${mockup.name}" class="project-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="project-placeholder" style="display: none;">
                <span>${mockup.name}</span>
            </div>
        </div>
    `;

    // Only show button if link exists
    const buttonHTML = mockup.link 
        ? `<a href="${mockup.link}" target="_blank" rel="noopener noreferrer" class="visit-site-btn">
               <span>Visit Site</span>
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
               </svg>
           </a>`
        : '';

    return `
        <div class="project-card" style="opacity: 1; transform: translateY(0);">
            <div class="project-image">
                ${imageHTML}
            </div>
            <div class="project-content">
                <h3 class="project-name">${mockup.name}</h3>
                <p class="project-description">${mockup.description}</p>
                <div class="project-footer">
                    ${buttonHTML}
                </div>
            </div>
        </div>
    `;
}

// Function to render projects
function renderProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) {
        console.error('Projects grid container not found');
        return;
    }

    // Clear existing content
    projectsGrid.innerHTML = '';

    // Generate and append project cards
    projects.forEach(project => {
        const cardHTML = generateProjectCard(project);
        projectsGrid.insertAdjacentHTML('beforeend', cardHTML);
    });

    // Make cards visible immediately (reset animation state)
    const cards = projectsGrid.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    });
}

// Function to render mockups
function renderMockups() {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) {
        console.error('Projects grid container not found');
        return;
    }

    // Clear existing content
    projectsGrid.innerHTML = '';

    // Generate and append mockup cards
    mockups.forEach(mockup => {
        const cardHTML = generateMockupCard(mockup);
        projectsGrid.insertAdjacentHTML('beforeend', cardHTML);
    });

    // Cards are already visible (inline styles set in generateMockupCard)
}

// Function to toggle between projects and mockups
function toggleView() {
    showMockups = !showMockups;
    
    if (showMockups) {
        renderMockups();
    } else {
        renderProjects();
    }
    
    // Update button text
    const toggleBtn = document.getElementById('view-toggle');
    const toggleText = toggleBtn.querySelector('.toggle-text');
    toggleText.textContent = showMockups ? 'Show Projects' : 'Show Mockups';
    
    // Update button class for styling
    toggleBtn.classList.toggle('active', showMockups);
}

// Initialize projects when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        renderProjects();
        // Add event listener to toggle button
        const toggleBtn = document.getElementById('view-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', toggleView);
        }
    });
} else {
    renderProjects();
    // Add event listener to toggle button
    const toggleBtn = document.getElementById('view-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleView);
    }
}
