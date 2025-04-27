let navList;

const defaultPage = 'destination';
const defaultDestination = 'Moon';

// load site data
let siteData = {};

const loadData = async () => {
  const response = await fetch("./data.json");
  siteData = await response.json();
}

const showSection = (targetId) => {
  const body = document.body;
  const sections = document.querySelectorAll(".page-section");

  // main section
  sections.forEach((section) => {
    if (section.id === targetId) {
      section.classList.remove("hidden");
    } else {
      section.classList.add("hidden");
    }
  });

  // background image
  body.classList.remove('home-bg', 'destination-bg', 'crew-bg', 'technology-bg');
  body.classList.add(`${targetId}-bg`);

  // navigation active
  navList.forEach(link => {
    const page = link.getAttribute("data-page");
    if (page === targetId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

const updateDestination = (name) => {
  const destination = siteData.destinations.find(dest => dest.name.toLowerCase() === name.toLowerCase());
  if (destination) {
    document.querySelector('.destination-image').src = destination.images.png;
    document.querySelector('.destination-planet-name').textContent = destination.name;
    document.querySelector('.destination-description').textContent = destination.description;
    document.getElementById('destination-distance').textContent = destination.distance;
    document.getElementById('destination-travel').textContent = destination.travel;
  }
}

const renderDestinationTabs = () => {
  const tabContainer = document.querySelector('.destination-tabs');
  tabContainer.innerHTML = '';

  siteData.destinations.forEach((destination, index) => {
    const li = document.createElement('li');
    const a = document.createElement('a');

    a.href = '#';
    a.textContent = destination.name.toUpperCase();
    a.dataset.planet = destination.name;
    if (index === 0) {
      a.classList.add('active');
    }

    li.appendChild(a);
    tabContainer.appendChild(li);
  });
}

const setupDestinationTabEvents = () => {
  const tabs = document.querySelectorAll('.destination-tabs a');

  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const desName = tab.dataset.planet;
      updateDestination(desName);
    });
  });
}

const initPageData = (page) => {
  if (page === 'destination') {
    renderDestinationTabs();
    setupDestinationTabEvents();
    updateDestination(defaultDestination);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadData();

  navList = document.querySelectorAll(".mobile-nav-list a, .desktop-nav-list a");

  showSection(defaultPage);
  initPageData(defaultPage);

  navList.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // show target section
      const page = link.getAttribute("data-page");
      showSection(page)
      initPageData(page);
    });
  });

  const menu = document.getElementById("mobile-menu");
  const openBtn = document.getElementById("menu-open");
  const closeBtn = document.getElementById("menu-close");

  openBtn.addEventListener("click", () => {
    menu.classList.remove("hidden");
  });

  closeBtn.addEventListener("click", () => {
    menu.classList.add("hidden");
  });
});