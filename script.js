document.addEventListener('DOMContentLoaded', () => {

    // =================================================================================
    // MOCK DATA (SIMULACIÓN DE BASE DE DATOS)
    // =================================================================================
    let mockData = {
        familyProfiles: [
            {
                id: 'p1',
                name: 'Ana García',
                dob: '1985-05-20',
                relationship: 'Madre',
                photoUrl: 'https://i.pravatar.cc/150?u=p1',
                reminders: [
                    { id: 'r1', profileId: 'p1', title: 'Papanicolaou Anual', date: '2025-10-15', isCompleted: false, type: 'papanicolaou' },
                    { id: 'r2', profileId: 'p1', title: 'Chequeo Dental', date: '2025-11-05', isCompleted: false, type: 'personalizado' },
                ]
            },
            {
                id: 'p2',
                name: 'Carlos García',
                dob: '2018-09-10',
                relationship: 'Hijo',
                photoUrl: 'https://i.pravatar.cc/150?u=p2',
                reminders: [
                    { id: 'r3', profileId: 'p2', title: 'Vacuna de Refuerzo (Sarampión)', date: '2025-10-22', isCompleted: true, type: 'vacuna' },
                    { id: 'r4', profileId: 'p2', title: 'Control Pediátrico', date: '2026-01-15', isCompleted: false, type: 'control_anual' },
                ]
            },
            {
                id: 'p3',
                name: 'María Rodríguez',
                dob: '1955-03-12',
                relationship: 'Abuela',
                photoUrl: 'https://i.pravatar.cc/150?u=p3',
                reminders: [
                     { id: 'r5', profileId: 'p3', title: 'Control de Presión Arterial', date: '2025-10-05', isCompleted: false, type: 'personalizado' },
                ]
            }
        ],
        healthTips: [
            {
                id: 't1',
                title: 'La importancia de la hidratación diaria',
                summary: 'Beber suficiente agua es crucial para el funcionamiento del cuerpo...',
                content: '<p>Mantenerse hidratado es fundamental para la salud. El agua ayuda a regular la temperatura corporal, mantener las articulaciones lubricadas, prevenir infecciones y entregar nutrientes a las células. Se recomienda consumir al menos 8 vasos de agua al día, aunque esta cantidad puede variar según la edad, el clima y el nivel de actividad física.</p><p>Una buena hidratación también mejora la calidad del sueño, la cognición y el estado de ánimo.</p>',
                authorName: 'Dra. Sofía Martínez',
                authorTitle: 'Nutricionista Familiar',
                imageUrl: 'https://via.placeholder.com/300x150'
            },
            {
                id: 't2',
                title: '¿Por qué es vital el Papanicolaou?',
                summary: 'Esta prueba detecta de forma temprana el cáncer de cuello uterino...',
                content: '<p>La prueba de Papanicolaou es un procedimiento para detectar el cáncer de cuello uterino en las mujeres. Permite encontrar células anormales en el cuello uterino antes de que se conviertan en cáncer. Se recomienda que las mujeres comiencen a hacerse la prueba a partir de los 21 años y la repitan cada 3 años si los resultados son normales. Hable con su médico para determinar la frecuencia adecuada para usted.</p>',
                authorName: 'Dr. Alejandro Vargas',
                authorTitle: 'Ginecólogo',
                imageUrl: 'https://via.placeholder.com/300x150'
            }
        ],
        healthCenters: [
            { id: 'hc1', name: 'Hospital Vivian Pellas', type: 'Hospital', address: 'Km 9.8 Carretera a Masaya, Managua', neighborhood: 'Villa Fontana', coordinates: [12.1028, -86.2346], phone: '2255-6900' },
            { id: 'hc2', name: 'Clínica Médica Altamira', type: 'Clínica', address: 'De la Vicky 2c. al sur, Altamira', neighborhood: 'Altamira', coordinates: [12.1225, -86.2620], phone: '2278-0011' },
            { id: 'hc3', name: 'Farmacia Kielsa Linda Vista', type: 'Farmacia', address: 'Plaza Linda Vista, Módulo 5', neighborhood: 'Linda Vista', coordinates: [12.1465, -86.3021], phone: '2266-4545' },
            { id: 'hc4', name: 'Centro de Salud Sócrates Flores', type: 'Centro de Salud', address: 'Costado oeste del mercado Israel Lewites', neighborhood: 'Rubén Darío', coordinates: [12.1388, -86.2977], phone: '2265-1890' }
        ],
        chatbotKB: [
            {
                keywords: ['hola', 'saludos', 'buenos', 'buenas'],
                response: '¡Hola! Soy tu Asistente de IA de CUIDAFAM. Estoy aquí para ayudarte con preguntas sobre salud familiar. ¿En qué puedo ayudarte hoy?'
            },
            {
                keywords: ['gracias', 'agradezco'],
                response: '¡De nada! Estoy para servirte. Si tienes otra pregunta, no dudes en consultarme.'
            },
            {
                keywords: ['papanicolaou', 'pap', 'citologia'],
                response: 'La prueba de <strong>Papanicolaou</strong> (o citología vaginal) es un examen muy importante para detectar de forma temprana el cáncer de cuello uterino. Se recomienda realizarla cada 3 años en mujeres mayores de 21. El procedimiento es rápido y consiste en tomar una pequeña muestra de células del cuello del útero para analizarlas. Es clave para la prevención.'
            },
            {
                keywords: ['vacuna', 'vacunas', 'inmunizacion'],
                response: 'Las <strong>vacunas</strong> son fundamentales para proteger a los niños de enfermedades graves. El esquema de vacunación en Nicaragua es gratuito y cubre enfermedades como sarampión, rubéola, polio y tétanos. Es crucial seguir el calendario de vacunación que te indique el centro de salud para asegurar que tus hijos estén protegidos en cada etapa de su crecimiento.'
            },
            {
                keywords: ['geriatria', 'adulto mayor', 'anciano', 'abuelo'],
                response: 'El cuidado de los <strong>adultos mayores</strong> se enfoca en mantener su calidad de vida. Esto incluye: <ul><li><strong>Prevención de caídas:</strong> Asegurar un hogar sin obstáculos.</li><li><strong>Nutrición balanceada:</strong> Dieta rica en calcio y fibra.</li><li><strong>Actividad física moderada:</strong> Caminatas suaves para mantener la movilidad.</li><li><strong>Control médico regular:</strong> Para monitorear condiciones crónicas como la hipertensión o diabetes.</li></ul>'
            },
            {
                keywords: ['fiebre', 'temperatura', 'niño', 'bebe'],
                response: 'Si un niño tiene fiebre, lo primero es mantenerlo hidratado ofreciéndole líquidos. Puedes usar paños húmedos en la frente para aliviarlo. Si la fiebre es muy alta (superior a 39°C), persistente por más de 2 días, o si el niño se ve muy decaído o tiene otros síntomas preocupantes (dificultad para respirar, convulsiones), debes buscar atención médica de inmediato.'
            }
        ]
    };

    // =================================================================================
    // VARIABLES GLOBALES Y DEL DOM
    // =================================================================================
    const viewContainer = document.getElementById('view-container');
    const navLinks = document.querySelectorAll('.nav-link');
    const modalContainer = document.getElementById('modal-container');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    let currentView = 'dashboard';
    let mapInstance = null; // Para guardar la instancia del mapa

    // =================================================================================
    // FUNCIONES DE RENDERIZADO DE VISTAS
    // =================================================================================

    // --- RENDER DASHBOARD (INICIO) ---
    const renderDashboard = () => {
        // 1. Recolectar y ordenar todos los recordatorios
        let allReminders = [];
        mockData.familyProfiles.forEach(profile => {
            profile.reminders.forEach(reminder => {
                allReminders.push({ ...reminder, profileName: profile.name, profilePhoto: profile.photoUrl });
            });
        });
        allReminders.sort((a, b) => new Date(a.date) - new Date(b.date));

        // 2. Formatear la fecha para que sea más legible
        const formatDate = (dateString) => {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString + 'T00:00:00').toLocaleDateString('es-NI', options);
        };

        // 3. Construir el HTML
        viewContainer.innerHTML = `
            <header class="dashboard-header">
                <img src="logo-cuidafam.jpeg" alt="Logo CUIDAFAM" class="cuidafam-logo">
                <h2>Próximos Recordatorios</h2>
            </header>
            <section class="reminders-list">
                ${allReminders.length > 0 ? allReminders.map(r => `
                    <div class="card reminder-item ${r.isCompleted ? 'completed' : ''}">
                        <input type="checkbox" class="reminder-checkbox" data-reminder-id="${r.id}" data-profile-id="${r.profileId}" ${r.isCompleted ? 'checked' : ''}>
                        <div class="reminder-info">
                            <h3>${r.title}</h3>
                            <p>${formatDate(r.date)} - Para: <strong>${r.profileName}</strong></p>
                        </div>
                    </div>
                `).join('') : '<p>No hay recordatorios pendientes.</p>'}
            </section>
            <button class="fab" id="add-reminder-btn" aria-label="Agregar recordatorio"><i class="fas fa-plus"></i></button>
        `;

        // 4. Añadir Event Listeners
        document.getElementById('add-reminder-btn').addEventListener('click', showAddReminderModal);
        document.querySelectorAll('.reminder-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                toggleReminderStatus(e.target.dataset.reminderId, e.target.dataset.profileId);
            });
        });
    };

    // --- RENDER PERFILES ---
    const renderProfiles = () => {
        viewContainer.innerHTML = `
            <header class="profiles-header">
                <h2>Perfiles Familiares</h2>
                <button class="btn btn-primary" id="add-profile-btn"><i class="fas fa-plus"></i> Agregar</button>
            </header>
            <section>
                ${mockData.familyProfiles.map(p => `
                    <div class="card profile-card">
                        <img src="${p.photoUrl}" alt="Foto de ${p.name}" class="profile-photo">
                        <div class="profile-details">
                            <h3>${p.name}</h3>
                            <p>${p.relationship} - ${new Date(p.dob + 'T00:00:00').toLocaleDateString('es-NI')}</p>
                        </div>
                        <div class="profile-actions">
                            <button class="btn btn-secondary btn-sm" onclick="app.editProfile('${p.id}')">Editar</button>
                            <button class="btn btn-danger btn-sm" onclick="app.deleteProfile('${p.id}')">Borrar</button>
                        </div>
                    </div>
                `).join('')}
            </section>
        `;
        document.getElementById('add-profile-btn').addEventListener('click', () => showProfileFormModal());
    };

    // --- RENDER ASISTENTE IA ---
    const renderAsistenteIA = () => {
        viewContainer.innerHTML = `
            <div class="chat-container">
                <header class="chat-header">
                     <img src="logo-cuidafam.jpeg" alt="Logo CUIDAFAM" class="cuidafam-logo" style="max-width: 120px;">
                </header>
                <div class="chat-messages" id="chat-messages">
                    <div class="chat-bubble assistant-msg">
                        ¡Hola! Soy tu Asistente de IA. Pregúntame sobre vacunas, papanicolaou, cuidados del adulto mayor y más.
                    </div>
                </div>
                <footer class="chat-input-area">
                    <input type="text" id="chat-input" placeholder="Escribe tu pregunta aquí...">
                    <button class="btn btn-primary" id="chat-send-btn"><i class="fas fa-paper-plane"></i></button>
                </footer>
            </div>
        `;

        const sendBtn = document.getElementById('chat-send-btn');
        const chatInput = document.getElementById('chat-input');
        
        const handleSend = () => {
             const userInput = chatInput.value.trim();
            if (userInput) {
                appendChatMessage(userInput, 'user');
                processChatInput(userInput);
                chatInput.value = '';
            }
        }
        sendBtn.addEventListener('click', handleSend);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSend();
            }
        });
    };

    // --- RENDER MAPA ---
    const renderHealthMap = () => {
        viewContainer.innerHTML = `
            <h2>Centros de Salud y Farmacias</h2>
            <div class="map-controls">
                <input type="text" id="map-search" placeholder="Buscar por nombre, barrio...">
                <select id="map-filter">
                    <option value="Todos">Todos los tipos</option>
                    <option value="Hospital">Hospital</option>
                    <option value="Clínica">Clínica</option>
                    <option value="Farmacia">Farmacia</option>
                    <option value="Centro de Salud">Centro de Salud</option>
                </select>
            </div>
            <div id="map"></div>
        `;
        initMap();

        document.getElementById('map-search').addEventListener('input', updateMapMarkers);
        document.getElementById('map-filter').addEventListener('change', updateMapMarkers);
    };

    // --- RENDER CONSEJOS ---
    const renderTips = () => {
        viewContainer.innerHTML = `
            <h2>Consejos de Salud</h2>
            <section>
                ${mockData.healthTips.map(tip => `
                    <article class="card tip-item" data-tip-id="${tip.id}">
                        <div class="tip-header">
                            <div>
                                <h3>${tip.title}</h3>
                                <p>${tip.summary}</p>
                            </div>
                            <i class="fas fa-chevron-down tip-toggle-icon"></i>
                        </div>
                        <div class="tip-content">
                            ${tip.content}
                            <p class="tip-author">Por: ${tip.authorName}, ${tip.authorTitle}</p>
                        </div>
                    </article>
                `).join('')}
            </section>
        `;
        document.querySelectorAll('.tip-item').forEach(item => {
            item.addEventListener('click', () => {
                item.classList.toggle('expanded');
            });
        });
    };

    // =================================================================================
    // LÓGICA DE NAVEGACIÓN
    // =================================================================================
    const navigateTo = (view) => {
        currentView = view;
        if (mapInstance) {
            mapInstance.remove();
            mapInstance = null;
        }
        
        switch (view) {
            case 'dashboard':
                renderDashboard();
                break;
            case 'profiles':
                renderProfiles();
                break;
            case 'asistente':
                renderAsistenteIA();
                break;
            case 'map':
                renderHealthMap();
                break;
            case 'tips':
                renderTips();
                break;
            default:
                renderDashboard();
        }

        navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.view === view);
        });
        window.location.hash = view;
    };
    
    // =================================================================================
    // LÓGICA DEL MODAL
    // =================================================================================
    let onSubmitCallback = null;

    const openModal = (title, formHTML, callback) => {
        modalTitle.textContent = title;
        modalBody.innerHTML = formHTML;
        onSubmitCallback = callback;

        modalContainer.classList.add('active');
        modalContainer.setAttribute('aria-hidden', 'false');

        const form = modalBody.querySelector('form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                if (onSubmitCallback) {
                    onSubmitCallback(new FormData(form));
                }
            });
        }
    };

    const closeModal = () => {
        modalContainer.classList.remove('active');
        modalContainer.setAttribute('aria-hidden', 'true');
        modalBody.innerHTML = '';
        onSubmitCallback = null;
    };

    modalCloseBtn.addEventListener('click', closeModal);
    modalContainer.addEventListener('click', (e) => {
        if (e.target === modalContainer || e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    });

    // =================================================================================
    // LÓGICA DE GESTIÓN DE PERFILES (CRUD)
    // =================================================================================

    // NUEVO: Función para renderizar las prioridades de salud dinámicamente
    const renderHealthPriorities = (relationship) => {
        const container = document.getElementById('health-priorities-container');
        if (!container) return;

        let priorities = [];
        switch (relationship) {
            case 'Hijo':
            case 'Hija':
                priorities = ['Esquema de Vacunación', 'Citas con Pediatra'];
                break;
            case 'Madre':
            case 'Abuela':
                priorities = ['Chequeos Rutinarios', 'Papanicolaou', 'Controles Geriátricos'];
                break;
            case 'Padre':
            case 'Abuelo':
                priorities = ['Chequeos Rutinarios', 'Controles Geriátricos'];
                break;
        }

        if (priorities.length > 0) {
            container.innerHTML = `
                <h4>Prioridades de Salud</h4>
                <p><small>Marca y agrega una fecha para crear un recordatorio automático.</small></p>
                ${priorities.map((priority, index) => `
                    <div class="health-priority">
                        <input type="checkbox" id="priority-${index}" name="priority_check_${index}" value="${priority}">
                        <label for="priority-${index}">${priority}</label>
                        <input type="date" name="priority_date_${index}" style="flex-grow: 1;">
                    </div>
                `).join('')}
            `;
        } else {
            container.innerHTML = '';
        }
    };

    // MODIFICADO: showProfileFormModal ahora incluye el contenedor para prioridades dinámicas
    const showProfileFormModal = (profile = null) => {
        const isEditing = profile !== null;
        const title = isEditing ? 'Editar Perfil' : 'Agregar Nuevo Perfil';

        const formHTML = `
            <form id="profile-form">
                <div class="form-group">
                    <img src="${profile?.photoUrl || 'https://via.placeholder.com/100'}" alt="Vista previa" id="profile-photo-preview">
                    <label for="photoUrl">Fotografía</label>
                    <input type="file" id="photoUrl" name="photoUrl" accept="image/*">
                </div>
                <div class="form-group">
                    <label for="name">Nombre Completo</label>
                    <input type="text" id="name" name="name" value="${profile?.name || ''}" required>
                </div>
                <div class="form-group">
                    <label for="dob">Fecha de Nacimiento</label>
                    <input type="date" id="dob" name="dob" value="${profile?.dob || ''}" required>
                </div>
                <div class="form-group">
                    <label for="relationship">Parentesco</label>
                    <select id="relationship" name="relationship" required>
                        <option value="Hijo" ${profile?.relationship === 'Hijo' ? 'selected' : ''}>Hijo</option>
                        <option value="Hija" ${profile?.relationship === 'Hija' ? 'selected' : ''}>Hija</option>
                        <option value="Madre" ${profile?.relationship === 'Madre' ? 'selected' : ''}>Madre</option>
                        <option value="Padre" ${profile?.relationship === 'Padre' ? 'selected' : ''}>Padre</option>
                        <option value="Abuela" ${profile?.relationship === 'Abuela' ? 'selected' : ''}>Abuela</option>
                        <option value="Abuelo" ${profile?.relationship === 'Abuelo' ? 'selected' : ''}>Abuelo</option>
                        <option value="Otro" ${profile?.relationship === 'Otro' ? 'selected' : ''}>Otro</option>
                    </select>
                </div>

                <div id="health-priorities-container" class="form-group"></div>

                 <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="app.closeModal()">Cancelar</button>
                    <button type="submit" class="btn btn-primary">${isEditing ? 'Guardar Cambios' : 'Crear Perfil'}</button>
                </div>
            </form>
        `;
        
        openModal(title, formHTML, (formData) => saveProfile(formData, profile?.id));

        // Lógica para previsualizar la imagen
        const photoInput = document.getElementById('photoUrl');
        const photoPreview = document.getElementById('profile-photo-preview');
        photoInput.addEventListener('change', () => {
            const file = photoInput.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    photoPreview.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
        
        // NUEVO: Lógica para actualizar las prioridades cuando cambia el parentesco
        const relationshipSelect = document.getElementById('relationship');
        relationshipSelect.addEventListener('change', (e) => renderHealthPriorities(e.target.value));
        
        // Cargar las prioridades iniciales
        renderHealthPriorities(relationshipSelect.value);
    };

    // MODIFICADO: saveProfile ahora crea recordatorios automáticos desde las prioridades
    const saveProfile = (formData, profileId) => {
        const fileInput = document.getElementById('photoUrl');
        const photoPreview = document.getElementById('profile-photo-preview');
        
        const existingReminders = profileId ? mockData.familyProfiles.find(p => p.id === profileId).reminders : [];
        const profileData = {
            name: formData.get('name'),
            dob: formData.get('dob'),
            relationship: formData.get('relationship'),
            reminders: existingReminders
        };

        // NUEVO: Lógica para crear recordatorios desde las prioridades de salud
        for (let i = 0; i < 5; i++) { // Asumimos un máximo de 5 prioridades
            const priorityCheck = formData.get(`priority_check_${i}`);
            const priorityDate = formData.get(`priority_date_${i}`);
            if (priorityCheck && priorityDate) {
                const newReminder = {
                    id: 'r' + Date.now() + i,
                    profileId: profileId || 'temp', // Usamos un ID temporal si es nuevo
                    title: priorityCheck,
                    date: priorityDate,
                    isCompleted: false,
                    type: 'control_anual'
                };
                profileData.reminders.push(newReminder);
            }
        }

        const processSave = (photoUrl) => {
             if (profileId) { // Editando
                const index = mockData.familyProfiles.findIndex(p => p.id === profileId);
                mockData.familyProfiles[index] = { ...mockData.familyProfiles[index], ...profileData, photoUrl };
            } else { // Creando
                const newProfileId = 'p' + Date.now();
                // Asignar el ID correcto a los nuevos recordatorios
                profileData.reminders.forEach(r => {
                    if(r.profileId === 'temp') r.profileId = newProfileId;
                });
                mockData.familyProfiles.push({
                    id: newProfileId,
                    ...profileData,
                    photoUrl
                });
            }
            closeModal();
            // Ir al dashboard para ver los nuevos recordatorios o a perfiles
            navigateTo(currentView === 'profiles' ? 'profiles' : 'dashboard');
        };

        if (fileInput.files[0]) {
             const reader = new FileReader();
             reader.onload = (e) => {
                processSave(e.target.result); // Usa la nueva imagen en base64
             };
             reader.readAsDataURL(fileInput.files[0]);
        } else {
            processSave(photoPreview.src); // Usa la imagen existente (o el placeholder)
        }
    };
    
    const editProfile = (profileId) => {
        const profile = mockData.familyProfiles.find(p => p.id === profileId);
        if (profile) {
            showProfileFormModal(profile);
        }
    };

    const deleteProfile = (profileId) => {
        if (confirm('¿Estás segura de que quieres eliminar este perfil? Esta acción no se puede deshacer.')) {
            mockData.familyProfiles = mockData.familyProfiles.filter(p => p.id !== profileId);
            renderProfiles();
        }
    };

    // =================================================================================
    // LÓGICA DE RECORDATORIOS
    // =================================================================================
    const toggleReminderStatus = (reminderId, profileId) => {
        const profile = mockData.familyProfiles.find(p => p.id === profileId);
        if (profile) {
            const reminder = profile.reminders.find(r => r.id === reminderId);
            if (reminder) {
                reminder.isCompleted = !reminder.isCompleted;
                renderDashboard(); // Re-render para actualizar el estilo
            }
        }
    };
    
    const showAddReminderModal = () => {
        const title = 'Agregar Recordatorio';
        const formHTML = `
            <form id="reminder-form">
                <div class="form-group">
                    <label for="title">Título del Recordatorio</label>
                    <input type="text" id="title" name="title" required>
                </div>
                <div class="form-group">
                    <label for="date">Fecha</label>
                    <input type="date" id="date" name="date" required>
                </div>
                <div class="form-group">
                    <label for="profileId">Asignar a:</label>
                    <select id="profileId" name="profileId" required>
                        ${mockData.familyProfiles.map(p => `<option value="${p.id}">${p.name}</option>`).join('')}
                    </select>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" onclick="app.closeModal()">Cancelar</button>
                    <button type="submit" class="btn btn-primary">Guardar</button>
                </div>
            </form>
        `;
        openModal(title, formHTML, saveReminder);
    };

    const saveReminder = (formData) => {
        const profileId = formData.get('profileId');
        const profile = mockData.familyProfiles.find(p => p.id === profileId);

        if(profile) {
            const newReminder = {
                id: 'r' + Date.now(),
                profileId: profileId,
                title: formData.get('title'),
                date: formData.get('date'),
                isCompleted: false,
                type: 'personalizado'
            };
            profile.reminders.push(newReminder);
            closeModal();
            renderDashboard();
        }
    };


    // =================================================================================
    // LÓGICA DEL ASISTENTE IA
    // =================================================================================
    const appendChatMessage = (message, sender) => {
        const chatMessages = document.getElementById('chat-messages');
        const bubble = document.createElement('div');
        bubble.classList.add('chat-bubble', `${sender}-msg`);
        bubble.innerHTML = message; // Usamos innerHTML para renderizar el formato
        chatMessages.appendChild(bubble);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll
    };

    const processChatInput = (input) => {
        const lowerInput = input.toLowerCase();
        let response = 'Lo siento, no tengo información sobre eso. Intenta reformular tu pregunta. Puedes preguntarme sobre temas como "vacunas", "papanicolaou" o "cuidados para adultos mayores".';
        
        for (const item of mockData.chatbotKB) {
            if (item.keywords.some(keyword => lowerInput.includes(keyword))) {
                response = item.response;
                break;
            }
        }
        
        setTimeout(() => {
            appendChatMessage(response, 'assistant');
        }, 500); // Simula que el asistente está "pensando"
    };

    // =================================================================================
    // LÓGICA DEL MAPA
    // =================================================================================
    let markersLayer = null;

    const initMap = () => {
        if (mapInstance) return;
        
        // Coordenadas de Managua
        mapInstance = L.map('map').setView([12.1364, -86.2514], 13);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapInstance);

        markersLayer = L.layerGroup().addTo(mapInstance);
        updateMapMarkers();
    };

    const updateMapMarkers = () => {
        if (!mapInstance) return;

        markersLayer.clearLayers();
        const searchTerm = document.getElementById('map-search').value.toLowerCase();
        const filterType = document.getElementById('map-filter').value;

        const filteredCenters = mockData.healthCenters.filter(center => {
            const matchesSearch = center.name.toLowerCase().includes(searchTerm) ||
                                  center.address.toLowerCase().includes(searchTerm) ||
                                  center.neighborhood.toLowerCase().includes(searchTerm);
            const matchesFilter = filterType === 'Todos' || center.type === filterType;
            return matchesSearch && matchesFilter;
        });

        filteredCenters.forEach(center => {
            const marker = L.marker(center.coordinates).addTo(markersLayer);
            marker.bindPopup(`<b>${center.name}</b><br>${center.type}<br>${center.address}<br>Tel: ${center.phone || 'N/D'}`);
        });
    };

    // =================================================================================
    // INICIALIZACIÓN DE LA APP
    // =================================================================================
    const initApp = () => {
        // Navegación con la barra inferior
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                navigateTo(link.dataset.view);
            });
        });
        
        // Manejo de la navegación con hash (#) para poder refrescar
        const initialView = window.location.hash.replace('#', '') || 'dashboard';
        navigateTo(initialView);
    };

    // Hacemos algunas funciones globales para poder llamarlas desde el HTML (onclick)
    window.app = {
        editProfile,
        deleteProfile,
        closeModal
    };

    // Arrancar la aplicación
    initApp();
});
