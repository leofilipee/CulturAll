document.addEventListener('DOMContentLoaded', () => {
  const events = [
    {
      id: 'festival-fado-lisboa',
      title: 'Festival de Fado de Lisboa',
      category: 'Concertos',
      dateLabel: '20 de março às 21:00',
      dateBucket: 'Passados',
      eventDate: '2026-03-20T21:00:00',
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
      dateBucket: 'Passados',
      eventDate: '2026-03-18T19:30:00',
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
      dateBucket: 'Passados',
      eventDate: '2026-03-15T10:00:00',
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
      dateBucket: 'Passados',
      eventDate: '2026-03-22T20:00:00',
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
      dateBucket: 'Passados',
      eventDate: '2026-03-28T16:00:00',
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
      dateBucket: 'Passados',
      eventDate: '2026-03-16T12:00:00',
      location: 'Évora Centro Histórico, Alentejo',
      city: 'Évora',
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
      dateBucket: 'Passados',
      eventDate: '2026-03-19T21:30:00',
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
      category: 'Concertos',
      dateLabel: '25 de março às 22:00',
      dateBucket: 'Passados',
      eventDate: '2026-03-25T22:00:00',
      location: 'Hot Clube de Portugal, Porto',
      city: 'Porto',
      priceLabel: '€20',
      priceType: 'Pago',
      views: 699,
      image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=74'
    },
    {
      id: 'concerto-kpop-meo-arena',
      title: 'Concerto K-Pop',
      category: 'Para Famílias',
      dateLabel: '25 de abril às 15:00',
      dateBucket: 'Este mês',
      eventDate: '2026-04-25T15:00:00',
      location: 'MEO Arena, Lisboa',
      city: 'Lisboa',
      priceLabel: '€30',
      priceType: 'Pago',
      views: 901,
      image: 'img/events/concerto-kpop-meoarena.jpeg'
    },
    {
      id: 'noite-do-fado-alfama',
      title: 'Noite do Fado',
      category: 'Concertos',
      dateLabel: 'Todas as sextas',
      dateBucket: 'Periódicos',
      eventDate: '2026-04-24T21:30:00',
      location: 'Alfama, Lisboa',
      city: 'Lisboa',
      priceLabel: '€18',
      priceType: 'Pago',
      views: 775,
      isRecurring: true,
      image: 'img/events/noite-de-fado-almada.jpeg'
    },
    {
      id: 'web-summit-lisboa-2026',
      title: 'Web Summit Lisboa 2026',
      category: 'Outros',
      dateLabel: '9-11 de novembro',
      dateBucket: 'Este ano',
      eventDate: '2026-11-09T09:00:00',
      location: 'FIL, Lisboa',
      city: 'Lisboa',
      priceLabel: '€390',
      priceType: 'Pago',
      views: 1320,
      image: 'img/events/web-summit-lisboa.jpeg'
    },
    {
      id: 'sol-da-caparica-2026',
      title: 'Sol da Caparica 2026',
      category: 'Festivais',
      dateLabel: '13-16 de agosto',
      dateBucket: 'Este ano',
      eventDate: '2026-08-13T16:00:00',
      location: 'Costa da Caparica',
      city: 'Costa da Caparica',
      priceLabel: '€45',
      priceType: 'Pago',
      views: 1104,
      image: 'img/events/sol-caparica-costadacaparica.jpeg'
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
      category: 'Concertos',
      date: '20/03/2026',
      location: 'Centro Cultural de Belém',
      status: 'published',
      statusLabel: 'Publicado',
      views: 342
    },
    {
      title: 'Noite de Jazz no Porto',
      category: 'Concertos',
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
      title: 'Poderá gostar destes eventos',
      subtitle: 'eventos mais vistos e em destaque',
      chip: 'Ordenado por data',
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

  const getDateKey = (date) => {
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return localDate.toISOString().slice(0, 10);
  };

  const getEventDateKey = (event) => getDateKey(new Date(event.eventDate));

  const getSelectedDateKey = (value) => {
    if (!value) {
      return '';
    }

    const parsedDate = new Date(`${value}T00:00:00`);
    return Number.isNaN(parsedDate.getTime()) ? '' : getDateKey(parsedDate);
  };

  const compareEventsByDate = (firstEvent, secondEvent) => {
    const todayKey = getDateKey(new Date());
    const firstDateKey = getEventDateKey(firstEvent);
    const secondDateKey = getEventDateKey(secondEvent);
    const firstIsPast = firstDateKey < todayKey;
    const secondIsPast = secondDateKey < todayKey;

    if (firstIsPast !== secondIsPast) {
      return firstIsPast ? 1 : -1;
    }

    const firstTime = getEventDateTime(firstEvent);
    const secondTime = getEventDateTime(secondEvent);

    if (firstIsPast) {
      return secondTime - firstTime;
    }

    return firstTime - secondTime;
  };

  const addDaysToKey = (dateKey, daysToAdd) => {
    const date = new Date(`${dateKey}T00:00:00`);
    date.setDate(date.getDate() + daysToAdd);
    return getDateKey(date);
  };

  const isSameMonth = (dateKey, referenceKey) => {
    const date = new Date(`${dateKey}T00:00:00`);
    const referenceDate = new Date(`${referenceKey}T00:00:00`);
    return date.getFullYear() === referenceDate.getFullYear() && date.getMonth() === referenceDate.getMonth();
  };

  const isSameYear = (dateKey, referenceKey) => {
    const date = new Date(`${dateKey}T00:00:00`);
    const referenceDate = new Date(`${referenceKey}T00:00:00`);
    return date.getFullYear() === referenceDate.getFullYear();
  };

  const normalizeLocation = (value) => (value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();

  const districtRegionMap = {
    Aveiro: 'centro',
    Beja: 'alentejo',
    Braga: 'norte',
    Bragança: 'norte',
    'Castelo Branco': 'centro',
    Coimbra: 'centro',
    Évora: 'alentejo',
    Faro: 'algarve',
    Guarda: 'centro',
    Leiria: 'centro',
    Lisboa: 'litoral',
    Portalegre: 'alentejo',
    Porto: 'norte',
    Santarém: 'centro',
    Setúbal: 'litoral',
    'Viana do Castelo': 'norte',
    'Vila Real': 'norte',
    Viseu: 'centro',
    Outros: 'outros'
  };

  const districtAliases = [
    { district: 'Aveiro', aliases: ['aveiro'] },
    { district: 'Beja', aliases: ['beja'] },
    { district: 'Braga', aliases: ['braga', 'guimaraes'] },
    { district: 'Bragança', aliases: ['braganca'] },
    { district: 'Castelo Branco', aliases: ['castelo branco', 'covilha'] },
    { district: 'Coimbra', aliases: ['coimbra', 'figueira da foz'] },
    { district: 'Évora', aliases: ['evora'] },
    { district: 'Faro', aliases: ['faro', 'lagos', 'tavira'] },
    { district: 'Guarda', aliases: ['guarda'] },
    { district: 'Leiria', aliases: ['leiria'] },
    { district: 'Lisboa', aliases: ['lisboa', 'loures', 'oeiras', 'alfama'] },
    { district: 'Portalegre', aliases: ['portalegre'] },
    { district: 'Porto', aliases: ['porto', 'maia', 'vila nova de gaia'] },
    { district: 'Santarém', aliases: ['santarem'] },
    { district: 'Setúbal', aliases: ['setubal', 'costa da caparica', 'almada', 'sesimbra'] },
    { district: 'Viana do Castelo', aliases: ['viana do castelo'] },
    { district: 'Vila Real', aliases: ['vila real', 'chaves'] },
    { district: 'Viseu', aliases: ['viseu'] },
    { district: 'Outros', aliases: ['funchal', 'ponta delgada', 'madeira', 'açores', 'azores'] }
  ];

  const getDistrictKey = (value) => {
    const normalizedValue = normalizeLocation(value);
    if (!normalizedValue) {
      return null;
    }

    return districtAliases.find(({ aliases }) => aliases.some((alias) => normalizedValue === alias || normalizedValue.includes(alias)))?.district ?? null;
  };

  const getEventDistrict = (event) => event.district ?? getDistrictKey(`${event.city ?? ''} ${event.location ?? ''}`) ?? 'Outros';

  const isUpcomingEvent = (event) => getEventDateTime(event) >= Date.now();

  const isPastEvent = (event) => getEventDateTime(event) < Date.now();

  const getListingEvents = () => {
    if (pageType === 'favorites') {
      return getFavoriteIds()
        .map((favoriteId) => events.find((event) => event.id === favoriteId))
        .filter(Boolean);
    }

    return [...events];
  };

  const buildEventCard = (event) => `
    <article class="event-card${isPastEvent(event) ? ' is-past' : ''}" data-event-id="${event.id}" data-category="${event.category}" data-date="${event.dateBucket}" data-location="${getEventDistrict(event)}" data-price="${event.priceType}" data-title="${event.title.toLowerCase()}">
      <div class="event-media">
        <span class="event-pill">${event.category}</span>
        <button class="share-btn" type="button" aria-label="Partilhar evento" data-event-id="${event.id}">
          <svg viewBox="0 0 24 24"><path d="M16 8a3 3 0 1 0-2.83-4H13a3 3 0 0 0 3 4Zm-8 4a3 3 0 1 0-2.83-4H5a3 3 0 0 0 3 4Zm8 8a3 3 0 1 0-2.83-4H13a3 3 0 0 0 3 4Z"></path><path d="m7.5 9.5 8 4m-8 1 8-4"></path></svg>
        </button>
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
    const dateCustomControls = document.getElementById('dateCustomControls');
    const datePickerInput = document.getElementById('datePickerInput');
    const openDatePickerBtn = document.getElementById('openDatePickerBtn');
    const applyDateBtn = document.getElementById('applyDateBtn');
    const sortFilter = document.getElementById('sortFilter');
    const locationFilter = document.getElementById('locationFilter');
    const priceFilter = document.getElementById('priceFilter');
    const loginToggleBtn = document.getElementById('loginToggleBtn');
    const accountChip = document.getElementById('accountChip');
    const filtersShell = document.getElementById('filtersShell');
    const filtersToggleBtn = document.getElementById('filtersToggleBtn');
    const filtersBackdrop = document.getElementById('filtersBackdrop');
    const page = pageConfig[pageType] ?? pageConfig.home;
    let appliedSpecificDate = '';
    let activeDateFilter = 'Todos';
    let dateControlsOpen = false;
    const sortChipLabels = {
      views: 'Ordenado por visualizações',
      proximity: 'Ordenado por proximidade',
      date: 'Ordenado por data'
    };

    if (sectionTitle) {
      sectionTitle.textContent = page.title;
    }

    if (resultsLabel) {
      resultsLabel.textContent = pageType === 'home' ? 'eventos encontrados' : pageType === 'events' ? 'eventos disponíveis' : 'favoritos encontrados';
    }

    if (viewChip) {
      viewChip.textContent = page.chip;
    }

    const getUserLocation = () => (getSession()?.location ?? '').trim().toLowerCase();

    const getUserDistrict = () => getDistrictKey(getSession()?.location ?? '') ?? 'Outros';

    const getProximityScore = (event, userLocation) => {
      if (!userLocation) {
        return Number.POSITIVE_INFINITY;
      }

      const userDistrict = getDistrictKey(userLocation);
      if (!userDistrict) {
        return Number.POSITIVE_INFINITY;
      }

      const eventDistrict = getEventDistrict(event);
      if (eventDistrict === userDistrict) {
        return 0;
      }

      const eventRegion = districtRegionMap[eventDistrict] ?? null;
      const userRegion = districtRegionMap[userDistrict] ?? null;
      if (eventRegion && userRegion && eventRegion === userRegion) {
        return 1;
      }

      return 2;
    };

    const getCurrentSort = () => sortFilter?.value ?? 'date';

    const updateSortChip = () => {
      if (!viewChip) {
        return;
      }

      const currentSort = getCurrentSort();
      if (currentSort === 'proximity' && !getUserLocation()) {
        viewChip.textContent = 'Ordenado por proximidade (defina a localização no perfil)';
        return;
      }

      viewChip.textContent = sortChipLabels[currentSort] ?? sortChipLabels.views;
    };

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

    const buildEventShareText = (event) => [
      event.title,
      event.dateLabel,
      event.location,
      `Ver mais: ${window.location.href}`
    ].join('\n');

    const shareEvent = async (eventId) => {
      const eventToShare = events.find((item) => item.id === eventId);
      if (!eventToShare) {
        return;
      }

      const shareData = {
        title: eventToShare.title,
        text: buildEventShareText(eventToShare),
        url: window.location.href
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
          return;
        } catch {
          return;
        }
      }

      const shareText = `${shareData.title}\n${shareData.text}`;
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(shareText);
          return;
        }
      } catch {
        // Fallback abaixo.
      }

      const fallbackField = document.createElement('textarea');
      fallbackField.value = shareText;
      fallbackField.setAttribute('readonly', 'true');
      fallbackField.style.position = 'absolute';
      fallbackField.style.left = '-9999px';
      document.body.appendChild(fallbackField);
      fallbackField.select();
      document.execCommand('copy');
      fallbackField.remove();
    };

    const updateDateControls = () => {
      if (!dateCustomControls || !dateFilter) {
        return;
      }

      const shouldShow = dateFilter.value === 'Escolher data' && dateControlsOpen;
      dateCustomControls.hidden = !shouldShow;
      dateCustomControls.setAttribute('aria-hidden', shouldShow ? 'false' : 'true');
    };

    const openDateControls = () => {
      if (!dateFilter || dateFilter.value !== 'Escolher data') {
        return;
      }

      dateControlsOpen = true;
      updateDateControls();
    };

    const closeDateControls = () => {
      dateControlsOpen = false;
      updateDateControls();
    };

    const matchesDateFilter = (event, selectedDate) => {
      if (selectedDate === 'Todos') {
        return true;
      }

      const eventDateKey = getEventDateKey(event);
      const todayKey = getDateKey(new Date());

      if (selectedDate === 'Hoje') {
        return eventDateKey === todayKey;
      }

      if (selectedDate === 'Passados') {
        return eventDateKey < todayKey;
      }

      if (selectedDate === 'Periódicos') {
        return Boolean(event.isRecurring);
      }

      if (selectedDate === 'Esta semana') {
        return eventDateKey >= todayKey && eventDateKey <= addDaysToKey(todayKey, 6);
      }

      if (selectedDate === 'Este mês') {
        return isSameMonth(eventDateKey, todayKey);
      }

      if (selectedDate === 'Este ano') {
        return isSameYear(eventDateKey, todayKey);
      }

      if (selectedDate === 'Escolher data') {
        return !appliedSpecificDate || eventDateKey === appliedSpecificDate;
      }

      return true;
    };

    const renderCards = () => {
      const query = searchInput.value.trim().toLowerCase();
      const selectedCategory = categoryFilter?.value ?? 'Todos';
      const selectedDate = activeDateFilter;
      const selectedLocation = locationFilter?.value ?? 'Todos';
      const selectedPrice = priceFilter?.value ?? 'Todos';
      const currentSort = getCurrentSort();
      const userLocation = getUserLocation();

      const sourceEvents = getListingEvents();
      const filtered = sourceEvents.filter((event) => {
        const matchesQuery = !query || [event.title, event.category, event.location, event.dateLabel, event.priceLabel].join(' ').toLowerCase().includes(query);
        const matchesCategory = selectedCategory === 'Todos' || event.category === selectedCategory;
        const matchesDate = matchesDateFilter(event, selectedDate);
        const matchesLocation = selectedLocation === 'Todos' || getEventDistrict(event) === selectedLocation;
        const matchesPrice = selectedPrice === 'Todos' || event.priceType === selectedPrice;
        return matchesQuery && matchesCategory && matchesDate && matchesLocation && matchesPrice;
      }).sort((firstEvent, secondEvent) => {
        if (currentSort === 'date') {
          return compareEventsByDate(firstEvent, secondEvent);
        }

        if (currentSort === 'proximity') {
          const firstScore = getProximityScore(firstEvent, userLocation);
          const secondScore = getProximityScore(secondEvent, userLocation);
          if (firstScore !== secondScore) {
            return firstScore - secondScore;
          }

          return secondEvent.views - firstEvent.views;
        }

        return secondEvent.views - firstEvent.views;
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

    if (sortFilter) {
      sortFilter.addEventListener('change', () => {
        updateSortChip();
        renderCards();
      });
    }

    if (dateFilter) {
      dateFilter.addEventListener('change', () => {
        if (dateFilter.value === 'Escolher data') {
          openDateControls();
          return;
        }

        activeDateFilter = dateFilter.value;
        dateControlsOpen = false;
        updateDateControls();

        appliedSpecificDate = '';
        if (datePickerInput) {
          datePickerInput.value = '';
        }

        renderCards();
      });

      dateFilter.addEventListener('focus', () => {
        if (dateFilter.value === 'Escolher data' && !dateControlsOpen) {
          openDateControls();
        }
      });

      dateFilter.addEventListener('click', () => {
        if (dateFilter.value === 'Escolher data' && !dateControlsOpen) {
          requestAnimationFrame(openDateControls);
        }
      });

      updateDateControls();
    }

    const openDatePicker = () => {
      if (!datePickerInput) {
        return;
      }

      if (typeof datePickerInput.showPicker === 'function') {
        datePickerInput.showPicker();
        return;
      }

      datePickerInput.click();
    };

    if (openDatePickerBtn) {
      openDatePickerBtn.addEventListener('click', openDatePicker);
    }

    if (applyDateBtn) {
      applyDateBtn.addEventListener('click', () => {
        if (!datePickerInput?.value) {
          closeDateControls();
          return;
        }

        activeDateFilter = 'Escolher data';
        appliedSpecificDate = getSelectedDateKey(datePickerInput.value);
        closeDateControls();
        renderCards();
      });
    }

    updateSortChip();

    document.addEventListener('click', (event) => {
      if (!dateControlsOpen || dateFilter?.value !== 'Escolher data') {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      if (target.closest('.date-filter-group')) {
        return;
      }

      closeDateControls();
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

      [categoryFilter, dateFilter, locationFilter, priceFilter, sortFilter].forEach((element) => {
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
      const shareButton = event.target.closest('.share-btn');
      if (shareButton) {
        const eventId = shareButton.dataset.eventId;
        if (eventId) {
          void shareEvent(eventId);
        }
        return;
      }

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

      const currentSession = getSession();

      setSession({
        email: matchedAccount.email,
        name: matchedAccount.name,
        roleLabel: matchedAccount.roleLabel,
        accountType: matchedAccount.accountType,
        location: currentSession?.location ?? ''
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

                  <div class="profile-location-box">
                    <label for="profileLocationInput">Localização para proximidade</label>
                    <div class="profile-location-row">
                      <input id="profileLocationInput" type="text" placeholder="Ex.: Lisboa" value="${session.location ?? ''}" />
                      <button id="profileLocationSaveBtn" type="button">Guardar</button>
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
      const profileLocationInput = document.getElementById('profileLocationInput');
      const profileLocationSaveBtn = document.getElementById('profileLocationSaveBtn');
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

      if (profileLocationSaveBtn && profileLocationInput) {
        profileLocationSaveBtn.addEventListener('click', () => {
          const updatedLocation = profileLocationInput.value.trim();
          const updatedSession = { ...session, location: updatedLocation };
          setSession(updatedSession);
          profileLocationSaveBtn.textContent = 'Guardado';
          window.setTimeout(() => {
            profileLocationSaveBtn.textContent = 'Guardar';
          }, 1200);
        });
      }

      return;
    }

    if (session.accountType === 'organizador') {
      const organizerEvents = [
        {
          title: 'Festival de Fado de Lisboa',
          category: 'Concertos',
          date: '20/03/2026',
          location: 'Centro Cultural de Belém',
          status: 'published',
          statusLabel: 'Publicado',
          views: 342
        },
        {
          title: 'Noite de Jazz no Porto',
          category: 'Concertos',
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
