let navList;

const defaultPage = 'crew';

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
  const tabs = document.querySelectorAll('.destination-tabs a');
  tabs.forEach(tab => {
    tab.classList.remove('active');
    if (tab.dataset.planet.toLowerCase() === name.toLowerCase()) {
      tab.classList.add('active');
    }
  });

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
      updateDestination(tab.dataset.planet);
    });
  });
}

const renderCrewSection = () => {
  const crewTrack = document.querySelector('#crew .crew-track');
  crewTrack.innerHTML = '';

  const crewDots = document.querySelector('#crew .crew-dots');
  crewDots.innerHTML = '';
  
  siteData.crew.forEach((item, index) => {
    const dot = document.createElement('button');
    dot.classList.add('dot');

    const memberDiv = document.createElement('div');
    memberDiv.classList.add('crew-member');
    if (index === 0) {
      memberDiv.classList.add('active');
      dot.classList.add('active');
    }

    const infoDiv = document.createElement('div');
    infoDiv.classList.add('crew-info');

    const roleP = document.createElement('p');
    roleP.classList.add("crew-role");
    roleP.textContent = item.role;

    const h3Name = document.createElement('h3');
    h3Name.classList.add('crew-name');
    h3Name.textContent = item.name;

    const descriptionP = document.createElement('p');
    descriptionP.classList.add("crew-description");
    descriptionP.textContent = item.bio;

    infoDiv.appendChild(roleP);
    infoDiv.appendChild(h3Name);
    infoDiv.appendChild(descriptionP);

    const portraitDiv = document.createElement('div');
    portraitDiv.classList.add('crew-portrait-wrapper');

    const img = document.createElement('img');
    img.src = item.images.png;
    img.alt = 'crew portrait';
    img.classList.add('crew-portrait');

    portraitDiv.appendChild(img);

    memberDiv.appendChild(infoDiv);
    memberDiv.appendChild(portraitDiv);

    crewTrack.appendChild(memberDiv);
    crewDots.append(dot);
  });
}

const setupCrewPaginationEvents = () => {
  document.querySelector('.crew-dots').addEventListener('click', (e) => {
    if (!e.target.classList.contains('dot')) {
      return;
    }

    const clickedDot = e.target;
    const index = [...clickedDot.parentElement.children].indexOf(clickedDot);

    const members = document.querySelectorAll(".crew-member");

    document.querySelectorAll(".dot").forEach(d => d.classList.remove("active"));
    members.forEach(m => m.classList.remove("active"));

    clickedDot.classList.add('active');
    members[index].classList.add('active');
  });
}

const initPageData = (page) => {
  if (page === 'destination') {
    renderDestinationTabs();
    setupDestinationTabEvents();
    updateDestination(siteData.destinations[0].name);
  } else if (page === 'crew') {
    renderCrewSection();
    setupCrewPaginationEvents();
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadData();

  navList = document.querySelectorAll(".mobile-nav-list a, .desktop-nav-list a");

  showSection(defaultPage);
  initPageData(defaultPage);

  // navigation
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

  // crew
  
});