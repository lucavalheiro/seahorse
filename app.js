// Global variables
let currentSection = 'home';
let currentCycle = '3-6';
let currentTab = 'milestones';

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeCycleSelector();
    initializeToyFilter();
    initializeEducationTabs();
    initializeBrainStages();
});

// Navigation
function initializeNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            showSection(section);
            
            // Update active nav button
            navButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionId;
    }
    
    // Update navigation
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-section') === sectionId) {
            btn.classList.add('active');
        }
    });
}

// QR Scanner simulation
function simulateScan() {
    const scanBtn = document.querySelector('.scan-btn');
    const scanResult = document.getElementById('scan-result');
    
    // Show loading state
    scanBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Escaneando...';
    scanBtn.disabled = true;
    
    // Simulate scan delay
    setTimeout(() => {
        scanResult.style.display = 'block';
        scanBtn.innerHTML = '<i class="fas fa-check"></i> Escaneado com Sucesso';
        scanBtn.style.background = '#4caf50';
        
        // Add animation
        scanResult.style.animation = 'fadeIn 0.5s ease';
    }, 2000);
}

// Learning Hub - Cycle Selector
function initializeCycleSelector() {
    const cycleButtons = document.querySelectorAll('.cycle-btn');
    
    cycleButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const cycle = this.getAttribute('data-cycle');
            selectCycle(cycle);
            
            // Update active button
            cycleButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function selectCycle(cycle) {
    currentCycle = cycle;
    updateCycleContent(cycle);
}

function updateCycleContent(cycle) {
    const cycleContent = document.getElementById('cycle-content');
    
    const cycleData = {
        '0-3': {
            title: '0-3 meses',
            previous: 'Recém-nascido: Reflexos básicos, sono frequente',
            current: 'Desenvolvimento: Controle da cabeça, primeiros sorrisos, foco visual',
            next: 'Expectativas: Alcançar objetos, rolar, vocalização'
        },
        '3-6': {
            title: '3-6 meses',
            previous: 'Marcos alcançados: Controle da cabeça, primeiros sorrisos, foco visual melhorado',
            current: 'Desenvolvimento: Alcançar objetos, rolar, vocalização aumentada, interação social',
            next: 'Expectativas: Sentar com apoio, transferir objetos, balbucio, ansiedade de separação'
        },
        '6-9': {
            title: '6-9 meses',
            previous: 'Marcos alcançados: Alcançar objetos, rolar, vocalização aumentada',
            current: 'Desenvolvimento: Sentar sem apoio, engatinhar, balbucio, ansiedade de separação',
            next: 'Expectativas: Ficar em pé, primeiras palavras, pinça fina'
        },
        '9-12': {
            title: '9-12 meses',
            previous: 'Marcos alcançados: Sentar sem apoio, engatinhar, balbucio',
            current: 'Desenvolvimento: Ficar em pé, primeiras palavras, pinça fina, imitação',
            next: 'Expectativas: Primeiros passos, vocabulário expandido, independência'
        }
    };
    
    const data = cycleData[cycle];
    
    cycleContent.innerHTML = `
        <div class="cycle-overview">
            <h3>Ciclo Atual: ${data.title}</h3>
            <div class="overview-grid">
                <div class="overview-card">
                    <h4>Ciclo Anterior</h4>
                    <p>${data.previous}</p>
                </div>
                <div class="overview-card current">
                    <h4>Ciclo Atual</h4>
                    <p>${data.current}</p>
                </div>
                <div class="overview-card">
                    <h4>Próximo Ciclo</h4>
                    <p>${data.next}</p>
                </div>
            </div>
        </div>

        <div class="milestones-section">
            <h4>Marcos de Desenvolvimento</h4>
            <div class="milestone-list">
                <div class="milestone-item completed">
                    <i class="fas fa-check-circle"></i>
                    <span>Sustenta a cabeça quando de bruços</span>
                </div>
                <div class="milestone-item completed">
                    <i class="fas fa-check-circle"></i>
                    <span>Sorri responsivamente</span>
                </div>
                <div class="milestone-item in-progress">
                    <i class="fas fa-clock"></i>
                    <span>Alcança e agarra objetos</span>
                </div>
                <div class="milestone-item pending">
                    <i class="fas fa-circle"></i>
                    <span>Rola de bruços para costas</span>
                </div>
            </div>
        </div>
    `;
}

// Toy Activities
function initializeToyFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            filterToys(filter);
            
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function filterToys(filter) {
    const toyCards = document.querySelectorAll('.toy-card');
    
    toyCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function showToyActivities(toyId) {
    const modal = document.getElementById('activity-modal');
    const overlay = document.getElementById('overlay');
    const modalToyName = document.getElementById('modal-toy-name');
    const modalActivities = document.getElementById('modal-activities');
    
    const toyActivities = {
        'rainbow-rattle': {
            name: 'Chocalho Arco-íris',
            activities: [
                {
                    title: 'Estimulação Auditiva Suave',
                    description: 'Balance o chocalho suavemente próximo ao bebê para estimular a audição.',
                    duration: '2-3 minutos',
                    development: 'Auditivo'
                },
                {
                    title: 'Rastreamento Visual',
                    description: 'Mova o chocalho lentamente da esquerda para a direita para o bebê acompanhar.',
                    duration: '1-2 minutos',
                    development: 'Visual'
                },
                {
                    title: 'Alcançar e Agarrar',
                    description: 'Posicione o chocalho ao alcance do bebê para estimular o movimento de alcançar.',
                    duration: '3-5 minutos',
                    development: 'Motor'
                }
            ]
        },
        'texture-blocks': {
            name: 'Blocos de Textura',
            activities: [
                {
                    title: 'Exploração Tátil',
                    description: 'Deixe o bebê tocar diferentes texturas dos blocos.',
                    duration: '5-7 minutos',
                    development: 'Sensorial'
                },
                {
                    title: 'Transferência de Objetos',
                    description: 'Ajude o bebê a passar o bloco de uma mão para outra.',
                    duration: '3-4 minutos',
                    development: 'Motor Fino'
                },
                {
                    title: 'Empilhamento Assistido',
                    description: 'Guie o bebê para empilhar blocos com sua ajuda.',
                    duration: '4-6 minutos',
                    development: 'Cognitivo'
                },
                {
                    title: 'Causa e Efeito',
                    description: 'Mostre como os blocos fazem barulho quando batem.',
                    duration: '2-3 minutos',
                    development: 'Cognitivo'
                }
            ]
        },
        'musical-mobile': {
            name: 'Móbile Musical',
            activities: [
                {
                    title: 'Tempo de Barriga para Baixo',
                    description: 'Use o móbile durante o tempo de bruços para motivar o levantamento da cabeça.',
                    duration: '3-5 minutos',
                    development: 'Motor Grosso'
                },
                {
                    title: 'Relaxamento Musical',
                    description: 'Toque a música suave para acalmar o bebê antes do sono.',
                    duration: '5-10 minutos',
                    development: 'Emocional'
                },
                {
                    title: 'Rastreamento de Movimento',
                    description: 'Observe o bebê seguir os objetos em movimento do móbile.',
                    duration: '2-4 minutos',
                    development: 'Visual'
                }
            ]
        }
    };
    
    const toy = toyActivities[toyId];
    modalToyName.textContent = toy.name;
    
    modalActivities.innerHTML = toy.activities.map(activity => `
        <div class="activity-item">
            <h4>${activity.title}</h4>
            <p>${activity.description}</p>
            <div class="activity-meta">
                <span><i class="fas fa-clock"></i> ${activity.duration}</span>
                <span><i class="fas fa-brain"></i> ${activity.development}</span>
            </div>
            <button class="try-btn" onclick="markActivityTried('${activity.title}')">
                <i class="fas fa-check"></i> Experimentar
            </button>
        </div>
    `).join('');
    
    modal.style.display = 'flex';
    overlay.classList.add('active');
}

function closeActivityModal() {
    const modal = document.getElementById('activity-modal');
    const overlay = document.getElementById('overlay');
    
    modal.style.display = 'none';
    overlay.classList.remove('active');
}

function markActivityTried(activityTitle) {
    alert(`Atividade "${activityTitle}" marcada como experimentada!`);
}

// Education Tabs
function initializeEducationTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.getAttribute('data-tab');
            showTab(tab);
            
            // Update active button
            tabButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function showTab(tabId) {
    // Hide all tab panes
    const tabPanes = document.querySelectorAll('.tab-pane');
    tabPanes.forEach(pane => pane.classList.remove('active'));
    
    // Show target tab pane
    const targetPane = document.getElementById(tabId);
    if (targetPane) {
        targetPane.classList.add('active');
        currentTab = tabId;
    }
}

// Brain Development Stages
function initializeBrainStages() {
    const stages = document.querySelectorAll('.stage');
    
    stages.forEach(stage => {
        stage.addEventListener('click', function() {
            const stageId = this.getAttribute('data-stage');
            
            // Update active stage
            stages.forEach(s => s.classList.remove('active'));
            this.classList.add('active');
            
            // Show stage information (could be expanded)
            console.log(`Showing brain development for stage: ${stageId}`);
        });
    });
}

// Media playback simulation
function playAudio(audioId) {
    const btn = event.target;
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<i class="fas fa-pause"></i> Reproduzindo...';
    btn.disabled = true;
    
    // Simulate audio playback
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Concluído';
        btn.style.background = '#4caf50';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
            btn.style.background = '#4caf50';
        }, 2000);
    }, 3000);
}

function playVideo(videoId) {
    const btn = event.target;
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<i class="fas fa-pause"></i> Reproduzindo...';
    btn.disabled = true;
    
    // Simulate video playback
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Assistido';
        btn.style.background = '#4caf50';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
            btn.style.background = '#4caf50';
        }, 2000);
    }, 4000);
}

// Notifications
function showNotifications() {
    const panel = document.querySelector('.notifications-panel');
    const overlay = document.getElementById('overlay');
    
    panel.classList.add('active');
    overlay.classList.add('active');
}

function hideNotifications() {
    const panel = document.querySelector('.notifications-panel');
    const overlay = document.getElementById('overlay');
    
    panel.classList.remove('active');
    overlay.classList.remove('active');
}

// Close modals when clicking overlay
document.getElementById('overlay').addEventListener('click', function() {
    closeActivityModal();
    hideNotifications();
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeActivityModal();
        hideNotifications();
    }
});

// Simulate notifications
function simulateNotification() {
    // This would be called by a real notification system
    const notification = {
        type: 'activity',
        title: 'Nova Atividade Sugerida',
        message: 'Hora de brincar com o Chocalho Arco-íris!',
        time: 'Agora'
    };
    
    // In a real app, this would add to the notifications list
    console.log('New notification:', notification);
}

// Initialize some demo data
setTimeout(() => {
    // Simulate receiving a notification after 5 seconds
    simulateNotification();
}, 5000);

