document.addEventListener('DOMContentLoaded', () => {
  const events = [
    {
      id: 'festival-fado-lisboa',
      title: 'Festival de Fado de Lisboa',
      category: 'Música',
      dateLabel: '20 de março às 21:00',
      dateBucket: 'Este mês',
      eventDate: '2026-04-03T21:00:00',
      location: 'Centro Cultural de Belém, Lisboa',
      city: 'Lisboa',
      priceLabel: '€25',
      priceType: 'Pago',
      views: 842,
      image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'auto-barca-inferno',
      title: 'Peça: O Auto da Barca do Inferno',
      category: 'Teatro',
      dateLabel: '18 de março às 19:30',
      dateBucket: 'Esta semana',
      eventDate: '2026-04-01T19:30:00',
      location: 'Teatro Nacional D. Maria II, Lisboa',
      city: 'Lisboa',
      priceLabel: '€18',
      priceType: 'Pago',
      views: 615,
      image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'arte-contemporanea-portuguesa',
      title: 'Exposição: Arte Contemporânea Portuguesa',
      category: 'Arte e Exposições',
      dateLabel: '15 de março às 10:00',
      dateBucket: 'Esta semana',
      eventDate: '2026-04-05T10:00:00',
      location: 'Museu Berardo, Lisboa',
      city: 'Lisboa',
      priceLabel: 'Entrada Gratuita',
      priceType: 'Gratuito',
      views: 974,
      image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'dança-contemporanea',
      title: 'Espetáculo de Dança Contemporânea',
      category: 'Dança',
      dateLabel: '22 de março às 20:00',
      dateBucket: 'Este mês',
      eventDate: '2026-04-08T20:00:00',
      location: 'Casa da Música, Porto',
      city: 'Porto',
      priceLabel: '€15',
      priceType: 'Pago',
      views: 423,
      image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=75'
    },
    {
      id: 'primavera-sound',
      title: 'Festival Primavera Sound',
      category: 'Festivais',
      dateLabel: '28 de março às 16:00',
      dateBucket: 'Este mês',
      eventDate: '2026-05-02T16:00:00',
      location: 'Parque da Cidade, Porto',
      city: 'Porto',
      priceLabel: '€85',
      priceType: 'Pago',
      views: 1188,
      image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=70'
    },
    {
      id: 'rota-gastronomica-alentejo',
      title: 'Rota Gastronómica do Alentejo',
      category: 'Gastronomia',
      dateLabel: '16 de março às 12:00',
      dateBucket: 'Esta semana',
      eventDate: '2026-03-18T12:00:00',
      location: 'Évora Centro Histórico, Alentejo',
      city: 'Alentejo',
      priceLabel: '€45',
      priceType: 'Pago',
      views: 377,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'cinema-ar-livre-classicos',
      title: 'Cinema ao Ar Livre: Clássicos Portugueses',
      category: 'Cinema',
      dateLabel: '19 de março às 21:30',
      dateBucket: 'Este mês',
      eventDate: '2026-04-12T21:30:00',
      location: 'Jardim da Estrela, Lisboa',
      city: 'Lisboa',
      priceLabel: 'Entrada Gratuita',
      priceType: 'Gratuito',
      views: 556,
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'noite-jazz-porto',
      title: 'Noite de Jazz no Porto',
      category: 'Música',
      dateLabel: '25 de março às 22:00',
      dateBucket: 'Este mês',
      eventDate: '2026-04-15T22:00:00',
      location: 'Hot Clube de Portugal, Porto',
      city: 'Porto',
      priceLabel: '€20',
      priceType: 'Pago',
      views: 699,
      image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=74'
    }
  ];

  const accounts = [
    {
      email: 'maria@example.com',
      password: 'user123',
      accountType: 'lambda',
      roleLabel: 'Utilizador (lambda)',
      name: 'Maria Silva'
    },
    {
      email: 'joao@example.com',
      password: 'org123',
      accountType: 'organizador',
      roleLabel: 'Organizador',
      name: 'João Almeida'
    }
  ];

  const organizerEvents = [
    {
      title: 'Festival de Fado de Lisboa',
      category: 'Música',
      date: '20/03/2026',
      location: 'Centro Cultural de Belém',
      status: 'published',
      statusLabel: 'Publicado',
      views: 342
    },
    {
      title: 'Noite de Jazz no Porto',
      category: 'Música',
      date: '25/03/2026',
      location: 'Hot Clube de Portugal',
      status: 'published',
      statusLabel: 'Publicado',
      views: 156
    },
    {
      title: 'Workshop de Fotografia',
      category: 'Arte e Exposições',
      date: '10/04/2026',
      location: 'Espaço Chiado',
      status: 'pending',
      statusLabel: 'Pendente',
      views: 0
    }
  ];

  const sessionKey = 'culturall-session';
  const favoritesKey = 'culturall-favorites';
  const pageType = document.body.dataset.page ?? 'home';
  const iconCalendar = '<svg viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="15" rx="3"></rect><path d="M8 3v4"></path><path d="M16 3v4"></path><path d="M4 9h16"></path></svg>';
  const iconLocation = '<svg viewBox="0 0 24 24"><path d="M12 21s6-5.5 6-11a6 6 0 0 0-12 0c0 5.5 6 11 6 11Z"></path><circle cx="12" cy="10" r="2.2"></circle></svg>';
  const iconLogin = '<svg viewBox="0 0 24 24"><path d="M10 17l5-5-5-5"></path><path d="M15 12H4"></path><path d="M20 4v16"></path></svg>';
  const iconLogout = '<svg viewBox="0 0 24 24"><path d="M14 17l5-5-5-5"></path><path d="M19 12H8"></path><path d="M8 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3"></path></svg>';
  const pageConfig = {
    home: {
      title: 'Mais Populares',
      subtitle: 'eventos mais vistos e em destaque',
      chip: 'Ordenado por visualizações',
      empty: 'Nenhum evento corresponde aos filtros atuais.'
    },
    events: {
      title: 'Eventos Disponíveis',
      subtitle: 'eventos futuros em geral',
      chip: 'Apenas eventos com data futura',
      empty: 'Não existem eventos disponíveis neste momento.'
    },
    favorites: {
      title: 'Favoritos',
      subtitle: 'lista de eventos assinalados',
      chip: 'Marcados com favorito',
      empty: 'Ainda não tens eventos favoritos guardados.'
    }
  };

  const getSession = () => {
    try {
      return JSON.parse(localStorage.getItem(sessionKey)) ?? null;
    } catch {
      return null;
    }
  };

  const setSession = (session) => {
    localStorage.setItem(sessionKey, JSON.stringify(session));
  };

  const clearSession = () => {
    localStorage.removeItem(sessionKey);
  };

  const getFavoriteIds = () => {
    try {
      return JSON.parse(localStorage.getItem(favoritesKey)) ?? [];
    } catch {
      return [];
    }
  };

  const setFavoriteIds = (favoriteIds) => {
    localStorage.setItem(favoritesKey, JSON.stringify(favoriteIds));
  };

  const isFavorite = (eventId) => getFavoriteIds().includes(eventId);

  const toggleFavorite = (eventId) => {
    const favoriteIds = getFavoriteIds();
    const updatedFavoriteIds = favoriteIds.includes(eventId)
      ? favoriteIds.filter((favoriteId) => favoriteId !== eventId)
      : [...favoriteIds, eventId];

    setFavoriteIds(updatedFavoriteIds);
    return updatedFavoriteIds;
  };

  const getEventDateTime = (event) => new Date(event.eventDate).getTime();

  const isUpcomingEvent = (event) => getEventDateTime(event) >= Date.now();

  const getListingEvents = () => {
    const upcomingEvents = events.filter(isUpcomingEvent);

    if (pageType === 'events') {
      return upcomingEvents.sort((firstEvent, secondEvent) => getEventDateTime(firstEvent) - getEventDateTime(secondEvent));
    }

    if (pageType === 'favorites') {
      return getFavoriteIds()
        .map((favoriteId) => events.find((event) => event.id === favoriteId))
        .filter(Boolean);
    }

    return upcomingEvents.sort((firstEvent, secondEvent) => secondEvent.views - firstEvent.views);
  };

  const buildEventCard = (event) => `
    <article class="event-card" data-event-id="${event.id}" data-category="${event.category}" data-date="${event.dateBucket}" data-location="${event.city}" data-price="${event.priceType}" data-title="${event.title.toLowerCase()}">
      <div class="event-media">
        <span class="event-pill">${event.category}</span>
        <button class="favorite-btn${isFavorite(event.id) ? ' active' : ''}" type="button" aria-label="${isFavorite(event.id) ? 'Remover dos favoritos' : 'Guardar evento'}" aria-pressed="${isFavorite(event.id) ? 'true' : 'false'}" data-event-id="${event.id}">
          <svg viewBox="0 0 24 24"><path d="M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.4-7 10-7 10Z"></path></svg>
        </button>
        <img src="${event.image}" alt="${event.title}" loading="lazy" />
      </div>
      <div class="event-body">
        <h2 class="event-title">${event.title}</h2>
        <div class="meta-list">
          <div class="meta-item">${iconCalendar}<span>${event.dateLabel}</span></div>
          <div class="meta-item">${iconLocation}<span>${event.location}</span></div>
        </div>
        <div class="price-row">
          <span class="price ${event.priceType === 'Gratuito' ? 'free' : ''}">${event.priceLabel}</span>
          <span class="tagline">${event.views} visualizações</span>
        </div>
      </div>
    </article>
  `;

  const renderListingPage = () => {
    const cardsGrid = document.getElementById('cardsGrid');
    if (!cardsGrid) {
      return;
    }

    const emptyState = document.getElementById('emptyState');
    const resultsCount = document.getElementById('resultsCount');
    const resultsLabel = document.getElementById('resultsLabel');
    const sectionTitle = document.getElementById('sectionTitle');
    const viewChip = document.getElementById('viewChip');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const dateFilter = document.getElementById('dateFilter');
    const locationFilter = document.getElementById('locationFilter');
    const priceFilter = document.getElementById('priceFilter');
    const loginToggleBtn = document.getElementById('loginToggleBtn');
    const accountChip = document.getElementById('accountChip');
    const filtersShell = document.getElementById('filtersShell');
    const filtersToggleBtn = document.getElementById('filtersToggleBtn');
    const filtersBackdrop = document.getElementById('filtersBackdrop');
    const page = pageConfig[pageType] ?? pageConfig.home;

    if (sectionTitle) {
      sectionTitle.textContent = page.title;
    }

    if (resultsLabel) {
      resultsLabel.textContent = pageType === 'home' ? 'eventos encontrados' : pageType === 'events' ? 'eventos disponíveis' : 'favoritos encontrados';
    }

    if (viewChip) {
      viewChip.textContent = page.chip;
    }

    const renderLoginState = () => {
      const session = getSession();
      if (!loginToggleBtn || !accountChip) {
        return;
      }

      loginToggleBtn.replaceChildren();
      loginToggleBtn.insertAdjacentHTML('afterbegin', session ? iconLogout : iconLogin);
      loginToggleBtn.append(document.createTextNode(session ? 'Sair' : 'Entrar'));

      if (session) {
        accountChip.hidden = false;
        accountChip.textContent = `${session.name}`;
        loginToggleBtn.href = '#';
        loginToggleBtn.setAttribute('aria-label', 'Terminar sessão');
        loginToggleBtn.dataset.logged = 'true';
        return;
      }

      accountChip.hidden = true;
      accountChip.textContent = '';
      loginToggleBtn.href = 'login.html';
      loginToggleBtn.setAttribute('aria-label', 'Entrar');
      loginToggleBtn.dataset.logged = 'false';
    };

    const renderCards = () => {
      const query = searchInput.value.trim().toLowerCase();
      const selectedCategory = categoryFilter?.value ?? 'Todos';
      const selectedDate = dateFilter?.value ?? 'Todos';
      const selectedLocation = locationFilter?.value ?? 'Todos';
      const selectedPrice = priceFilter?.value ?? 'Todos';

      const sourceEvents = getListingEvents();
      const filtered = sourceEvents.filter((event) => {
        const matchesQuery = !query || [event.title, event.category, event.location, event.dateLabel, event.priceLabel].join(' ').toLowerCase().includes(query);
        const matchesCategory = selectedCategory === 'Todos' || event.category === selectedCategory;
        const matchesDate = selectedDate === 'Todos' || event.dateBucket === selectedDate;
        const matchesLocation = selectedLocation === 'Todos' || event.city === selectedLocation;
        const matchesPrice = selectedPrice === 'Todos' || event.priceType === selectedPrice;
        return matchesQuery && matchesCategory && matchesDate && matchesLocation && matchesPrice;
      });

      resultsCount.textContent = filtered.length;
      cardsGrid.innerHTML = filtered.map(buildEventCard).join('');

      if (emptyState) {
        emptyState.hidden = filtered.length > 0;
        emptyState.textContent = page.empty;
      }
    };

    [searchInput, categoryFilter, dateFilter, locationFilter, priceFilter].forEach((element) => {
      if (!element) {
        return;
      }

      element.addEventListener('input', renderCards);
      element.addEventListener('change', renderCards);
    });

    if (filtersToggleBtn && filtersShell && filtersBackdrop) {
      const closeFilters = () => {
        filtersShell.classList.remove('open');
        filtersToggleBtn.setAttribute('aria-expanded', 'false');
        filtersBackdrop.hidden = true;
      };

      const openFilters = () => {
        filtersShell.classList.add('open');
        filtersToggleBtn.setAttribute('aria-expanded', 'true');
        filtersBackdrop.hidden = false;
      };

      filtersToggleBtn.addEventListener('click', () => {
        if (filtersShell.classList.contains('open')) {
          closeFilters();
          return;
        }

        openFilters();
      });

      filtersBackdrop.addEventListener('click', closeFilters);

      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          closeFilters();
        }
      });

      [categoryFilter, dateFilter, locationFilter, priceFilter].forEach((element) => {
        if (!element) {
          return;
        }

        element.addEventListener('change', () => {
          if (window.innerWidth <= 900) {
            closeFilters();
          }
        });
      });
    }

    cardsGrid.addEventListener('click', (event) => {
      const favoriteButton = event.target.closest('.favorite-btn');
      if (!favoriteButton) {
        return;
      }

      const eventId = favoriteButton.dataset.eventId;
      if (!eventId) {
        return;
      }

      toggleFavorite(eventId);
      renderCards();
    });

    if (loginToggleBtn) {
      loginToggleBtn.addEventListener('click', (event) => {
        const session = getSession();
        if (!session) {
          return;
        }

        event.preventDefault();
        clearSession();
        renderLoginState();
      });
    }

    renderLoginState();
    renderCards();
  };

  const renderLoginPage = () => {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) {
      return;
    }

    const authMessage = document.getElementById('authMessage');
    const backHomeBtn = document.getElementById('backHomeBtn');
    const emailInput = document.getElementById('emailInput');
    const passwordInput = document.getElementById('passwordInput');

    const updateAuthMessage = (message) => {
      if (authMessage) {
        authMessage.textContent = message;
      }
    };

    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const email = emailInput.value.trim().toLowerCase();
      const password = passwordInput.value;
      const matchedAccount = accounts.find((account) => account.email === email && account.password === password);

      if (!matchedAccount) {
        updateAuthMessage('Credenciais inválidas. Confere o email e a palavra-passe.');
        return;
      }

      setSession({
        email: matchedAccount.email,
        name: matchedAccount.name,
        roleLabel: matchedAccount.roleLabel,
        accountType: matchedAccount.accountType
      });

      updateAuthMessage(`Sessão iniciada como ${matchedAccount.roleLabel}.`);

      if (matchedAccount.accountType === 'lambda') {
        window.location.href = 'profile.html';
        return;
      }

      window.location.href = 'profile.html';
    });

    if (backHomeBtn) {
      backHomeBtn.addEventListener('click', () => {
        clearSession();
        window.location.href = 'index.html';
      });
    }
  };

  const renderProfilePage = () => {
    const profileRoot = document.getElementById('profileRoot');
    if (!profileRoot) {
      return;
    }

    const session = getSession();
    if (!session) {
      window.location.href = 'login.html';
      return;
    }

    const profileAccountChip = document.getElementById('profileAccountChip');
    const profileLogoutBtn = document.getElementById('profileLogoutBtn');
    const profileMobileNav = document.getElementById('profileMobileNav');
    const profileBrand = document.querySelector('.profile-page .brand-mark');

    if (profileAccountChip) {
      profileAccountChip.textContent = session.name;
    }

    if (profileLogoutBtn) {
      profileLogoutBtn.addEventListener('click', () => {
        clearSession();
        window.location.href = 'index.html';
      });
    }

    if (profileBrand) {
      profileBrand.setAttribute('href', 'profile.html');
    }

    if (session.accountType === 'lambda') {
      const selectedEvent = events[4];
      const initials = session.name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part.charAt(0))
        .join('')
        .toUpperCase();

      const historyItems = [
        {
          title: 'Festival Primavera Sound',
          meta: 'Evento guardado · 28 de março às 16:00',
          status: 'Confirmado'
        },
        {
          title: 'Exposição: Arte Contemporânea Portuguesa',
          meta: 'Visitado · 15 de março às 10:00',
          status: 'Finalizado'
        },
        {
          title: 'Cinema ao Ar Livre: Clássicos Portugueses',
          meta: 'Marcado como favorito · 19 de março às 21:30',
          status: 'Pendente'
        }
      ];

      profileRoot.innerHTML = `
        <div class="page">
          <div class="profile-hero">
            <h1>A Minha Área</h1>
            <p>Gerir os seus eventos guardados e histórico</p>
          </div>

          <div class="profile-tabs" role="tablist" aria-label="Separadores da área pessoal">
            <button class="profile-tab-btn active" type="button" data-profile-tab="wallet">Carteira</button>
            <button class="profile-tab-btn" type="button" data-profile-tab="history">Histórico</button>
          </div>

          <div class="profile-panels">
            <section class="profile-panel active" data-profile-pane="wallet" id="carteira">
              <h2 class="profile-section-title">Eventos Futuros</h2>
              <p class="profile-section-subtitle"><span id="savedEventsCount">1</span> evento guardado</p>

              <div class="profile-grid">
                <div class="saved-event-wrap" id="savedEventCard"></div>

                <div class="profile-summary-card">
                  <div class="profile-summary-row">
                    <div class="profile-avatar" id="profileAvatar">${initials}</div>
                    <div>
                      <strong id="profileName">${session.name}</strong>
                      <p id="profileRole">${session.roleLabel}</p>
                      <p id="profileEmail">${session.email}</p>
                    </div>
                  </div>

                  <div class="profile-stat-grid">
                    <div class="profile-stat">
                      <strong>3</strong>
                      <span>eventos vistos</span>
                    </div>
                    <div class="profile-stat">
                      <strong>1</strong>
                      <span>favorito guardado</span>
                    </div>
                    <div class="profile-stat">
                      <strong>2</strong>
                      <span>check-ins feitos</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section class="profile-panel" data-profile-pane="history" id="historico">
              <h2 class="profile-section-title">Histórico</h2>
              <p class="profile-section-subtitle">Últimas interações na conta</p>

              <div class="profile-history-list" id="historyList"></div>
            </section>
          </div>
        </div>
      `;

      profileMobileNav.innerHTML = `
        <a href="index.html">
          <svg viewBox="0 0 24 24"><path d="M4 11.5 12 4l8 7.5"></path><path d="M6 10.5V20h12v-9.5"></path></svg>
          Início
        </a>
        <a href="events.html">
          <svg viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="15" rx="3"></rect><path d="M8 3v4"></path><path d="M16 3v4"></path><path d="M4 9h16"></path></svg>
          Eventos
        </a>
        <a href="favorites.html">
          <svg viewBox="0 0 24 24"><path d="M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.4-7 10-7 10Z"></path></svg>
          Favoritos
        </a>
        <a class="active" href="profile.html">
          <svg viewBox="0 0 24 24"><path d="M4 20c1.8-4 4.9-6 8-6s6.2 2 8 6"></path><circle cx="12" cy="8" r="4"></circle></svg>
          Perfil
        </a>
      `;

      const savedEventCard = document.getElementById('savedEventCard');
      const historyList = document.getElementById('historyList');
      const tabButtons = Array.from(document.querySelectorAll('[data-profile-tab]'));
      const panes = Array.from(document.querySelectorAll('[data-profile-pane]'));

      if (savedEventCard) {
        savedEventCard.innerHTML = `
          <article class="event-card">
            <div class="event-media">
              <span class="event-pill">${selectedEvent.category}</span>
              <button class="favorite-btn" type="button" aria-label="Guardar evento">
                <svg viewBox="0 0 24 24"><path d="M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.4-7 10-7 10Z"></path></svg>
              </button>
              <img src="${selectedEvent.image}" alt="${selectedEvent.title}" loading="lazy" />
            </div>
            <div class="event-body">
              <h2 class="event-title">${selectedEvent.title}</h2>
              <div class="meta-list">
                <div class="meta-item">${iconCalendar}<span>${selectedEvent.dateLabel}</span></div>
                <div class="meta-item">${iconLocation}<span>${selectedEvent.location}</span></div>
              </div>
              <div class="price-row">
                <span class="price ${selectedEvent.priceType === 'Gratuito' ? 'free' : ''}">${selectedEvent.priceLabel}</span>
                <span class="tagline">Guardado</span>
              </div>
            </div>
          </article>
        `;
      }

      if (historyList) {
        historyList.innerHTML = historyItems.map((item) => `
          <div class="profile-history-item">
            <div class="profile-history-meta">
              <strong>${item.title}</strong>
              <span>${item.meta}</span>
            </div>
            <span class="status-badge">${item.status}</span>
          </div>
        `).join('');
      }

      tabButtons.forEach((button) => {
        button.addEventListener('click', () => {
          tabButtons.forEach((item) => item.classList.toggle('active', item === button));
          panes.forEach((pane) => pane.classList.toggle('active', pane.dataset.profilePane === button.dataset.profileTab));
        });
      });

      return;
    }

    if (session.accountType === 'organizador') {
      const organizerEvents = [
        {
          title: 'Festival de Fado de Lisboa',
          category: 'Música',
          date: '20/03/2026',
          location: 'Centro Cultural de Belém',
          status: 'published',
          statusLabel: 'Publicado',
          views: 342
        },
        {
          title: 'Noite de Jazz no Porto',
          category: 'Música',
          date: '25/03/2026',
          location: 'Hot Clube de Portugal',
          status: 'published',
          statusLabel: 'Publicado',
          views: 156
        },
        {
          title: 'Workshop de Fotografia',
          category: 'Arte e Exposições',
          date: '10/04/2026',
          location: 'Espaço Chiado',
          status: 'pending',
          statusLabel: 'Pendente',
          views: 0
        }
      ];

      profileRoot.innerHTML = `
        <div class="page">
          <div class="organizer-hero">
            <div>
              <h1>Painel do Organizador</h1>
              <p>Gerir os seus eventos culturais</p>
            </div>

            <div class="organizer-actions">
              <button class="organizer-primary-btn" type="button">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>
                Novo Evento
              </button>
            </div>
          </div>

          <div class="organizer-panel" id="eventos-organizador">
            <table class="organizer-table" aria-label="Lista de eventos do organizador">
              <thead>
                <tr>
                  <th>Evento</th>
                  <th>Categoria</th>
                  <th>Data</th>
                  <th>Localização</th>
                  <th>Estado</th>
                  <th>Visualizações</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody id="organizerTableBody"></tbody>
            </table>
          </div>
        </div>
      `;

      profileMobileNav.innerHTML = `
        <a href="index.html">
          <svg viewBox="0 0 24 24"><path d="M4 11.5 12 4l8 7.5"></path><path d="M6 10.5V20h12v-9.5"></path></svg>
          Início
        </a>
        <a href="events.html">
          <svg viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="15" rx="3"></rect><path d="M8 3v4"></path><path d="M16 3v4"></path><path d="M4 9h16"></path></svg>
          Eventos
        </a>
        <a href="favorites.html">
          <svg viewBox="0 0 24 24"><path d="M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.4-7 10-7 10Z"></path></svg>
          Favoritos
        </a>
        <a class="active" href="profile.html">
          <svg viewBox="0 0 24 24"><path d="M4 20c1.8-4 4.9-6 8-6s6.2 2 8 6"></path><circle cx="12" cy="8" r="4"></circle></svg>
          Perfil
        </a>
      `;

      const tableBody = document.getElementById('organizerTableBody');
      if (tableBody) {
        tableBody.innerHTML = organizerEvents.map((event) => `
          <tr>
            <td class="organizer-event-title">${event.title}</td>
            <td>${event.category}</td>
            <td>${event.date}</td>
            <td>${event.location}</td>
            <td><span class="organizer-badge ${event.status}">${event.statusLabel}</span></td>
            <td><span class="organizer-metric"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z"></path></svg>${event.views}</span></td>
            <td>
              <div class="organizer-actions-cell" aria-label="Ações do evento">
                <button type="button" class="icon-btn" aria-label="Ver evento"><svg viewBox="0 0 24 24"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg></button>
                <button type="button" class="icon-btn" aria-label="Editar evento"><svg viewBox="0 0 24 24"><path d="M4 20h4l10-10a2.5 2.5 0 0 0-4-4L4 16v4Z"></path></svg></button>
                <button type="button" class="icon-btn" aria-label="Eliminar evento"><svg viewBox="0 0 24 24"><path d="M4 7h16"></path><path d="M9 7V4h6v3"></path><path d="M6 7l1 13h10l1-13"></path><path d="M10 11v6"></path><path d="M14 11v6"></path></svg></button>
              </div>
            </td>
          </tr>
        `).join('');
      }

      return;
    }

    window.location.href = 'index.html';
  };

  renderListingPage();
  renderLoginPage();
  renderProfilePage();
});
