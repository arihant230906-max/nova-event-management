const events = [
  {
    id: "future-forward", title: "Future Forward Summit 2026", category: "Technology",
    date: "2026-11-22", day: "22", month: "NOV", time: "10:00 AM onwards",
    venue: "Mayfair Convention, Bhubaneswar", city: "Bhubaneswar, Odisha",
    price: "Free registration", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=85",
    description: "A day of bold ideas, emerging technology and conversations shaping what comes next. Meet curious minds, hear from builders and explore the possibilities of tomorrow."
  },
  {
    id: "soundscape", title: "Soundscape: The Open Air", category: "Music",
    date: "2026-11-18", day: "18", month: "NOV", time: "6:30 PM onwards",
    venue: "Ekamra Haat, Bhubaneswar", city: "Bhubaneswar, Odisha",
    price: "₹299 onwards", image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1000&q=85",
    description: "An open-air evening of live music, independent artists and good energy. Bring your friends, find a spot under the lights and let the music take over."
  },
  {
    id: "design-after-dark", title: "Design After Dark", category: "Art & Design",
    date: "2026-11-18", day: "18", month: "NOV", time: "6:30 PM onwards",
    venue: "Gallery 23, Bhubaneswar", city: "Bhubaneswar, Odisha",
    price: "₹199 onwards", image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1000&q=85",
    description: "A creative gathering for visual thinkers, makers and curious minds. Explore experimental work, meet local creatives and see the city through a different lens."
  },
  {
    id: "mindful-mornings", title: "Mindful Mornings", category: "Lifestyle",
    date: "2026-11-25", day: "25", month: "NOV", time: "7:00 AM onwards",
    venue: "Forest Park, Bhubaneswar", city: "Bhubaneswar, Odisha",
    price: "Free registration", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=85",
    description: "Start your day with movement, breathing and a little room to reset. A relaxed outdoor session for anyone looking to slow down and reconnect."
  },
  {
    id: "code-canvas", title: "Code & Canvas", category: "Technology",
    date: "2026-12-02", day: "02", month: "DEC", time: "11:00 AM onwards",
    venue: "KIIT Innovation Centre, Bhubaneswar", city: "Bhubaneswar, Odisha",
    price: "Free registration", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=85",
    description: "Where creative thinking meets technology. Join workshops and interactive sessions exploring the overlap between digital tools, design and innovation."
  },
  {
    id: "the-makers-market", title: "The Makers Market", category: "Art & Design",
    date: "2026-12-06", day: "06", month: "DEC", time: "12:00 PM onwards",
    venue: "Utkal Convention Centre, Bhubaneswar", city: "Bhubaneswar, Odisha",
    price: "Free entry", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1000&q=85",
    description: "A lively market celebrating independent makers, handmade objects, illustration and local creativity. Browse one-of-a-kind finds and meet the people behind them."
  }
];

const eventsGrid = document.getElementById("eventsGrid");
const eventSearch = document.getElementById("eventSearch");
const categoryFilters = document.getElementById("categoryFilters");
const emptyState = document.getElementById("emptyState");
const resultsCount = document.getElementById("resultsCount");
const eventModal = document.getElementById("eventModal");
const registerModal = document.getElementById("registerModal");
const registrationForm = document.getElementById("registrationForm");
let activeCategory = "All";
let selectedEvent = null;
let toastTimer;

function formatDate(dateString) {
  return new Date(`${dateString}T12:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}
function getCountdown(dateString) {
  const target = new Date(`${dateString}T00:00:00`).getTime();
  const diff = target - Date.now();
  if (diff <= 0) return "Today / started";
  const days = Math.ceil(diff / 86400000);
  return `${days} day${days === 1 ? "" : "s"} to go`;
}
function renderEvents() {
  const query = eventSearch.value.trim().toLowerCase();
  const filtered = events.filter(event => {
    const matchesCategory = activeCategory === "All" || event.category === activeCategory;
    const matchesSearch = `${event.title} ${event.category} ${event.venue} ${event.description}`.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });
  eventsGrid.innerHTML = filtered.map(event => `
    <article class="event-card" tabindex="0" role="button" aria-label="View details for ${event.title}" data-event-id="${event.id}">
      <div class="event-card-image">
        <img src="${event.image}" alt="${event.title}" loading="lazy">
        <div class="card-date"><strong>${event.day}</strong><small>${event.month}</small></div>
        <span class="card-category">${event.category.toUpperCase()}</span>
      </div>
      <div class="event-card-content">
        <h3>${event.title}</h3>
        <p>${event.description}</p>
        <div class="card-footer"><span>⌖ ${event.city}</span><strong>${event.price}</strong><span class="card-arrow">↗</span></div>
      </div>
    </article>`).join("");
  emptyState.classList.toggle("hidden", filtered.length !== 0);
  eventsGrid.classList.toggle("hidden", filtered.length === 0);
  resultsCount.textContent = `Showing ${filtered.length} event${filtered.length === 1 ? "" : "s"}`;
  document.getElementById("allCount").textContent = String(events.length).padStart(2, "0");
}
function setActiveCategory(category) {
  activeCategory = category;
  document.querySelectorAll(".filter-pill").forEach(button => button.classList.toggle("active", button.dataset.category === category));
  renderEvents();
}
function openEvent(eventId) {
  selectedEvent = events.find(event => event.id === eventId);
  if (!selectedEvent) return;
  document.getElementById("modalImage").src = selectedEvent.image;
  document.getElementById("modalImage").alt = selectedEvent.title;
  document.getElementById("modalCategory").textContent = selectedEvent.category.toUpperCase();
  document.getElementById("modalDate").textContent = `${formatDate(selectedEvent.date)}  ·  ${selectedEvent.time}`;
  document.getElementById("modalTitle").textContent = selectedEvent.title;
  document.getElementById("modalDescription").textContent = selectedEvent.description;
  document.getElementById("modalVenue").textContent = selectedEvent.venue;
  document.getElementById("modalTime").textContent = selectedEvent.time;
  document.getElementById("modalPrice").textContent = selectedEvent.price;
  document.getElementById("modalCountdown").textContent = getCountdown(selectedEvent.date);
  showModal(eventModal);
}
function openRegistration(event = selectedEvent) {
  if (!event) return;
  selectedEvent = event;
  document.getElementById("selectedEvent").value = event.id;
  document.getElementById("registerEventName").textContent = event.title;
  registrationForm.reset();
  clearErrors();
  document.getElementById("selectedEvent").value = event.id;
  document.getElementById("registerEventName").textContent = event.title;
  eventModal.classList.add("hidden");
  document.getElementById("registrationForm").classList.remove("hidden");
  document.querySelector(".register-heading").classList.remove("hidden");
  document.getElementById("successState").classList.add("hidden");
  showModal(registerModal);
}
function showModal(modal) {
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  const closeButton = modal.querySelector(".modal-close");
  if (closeButton) closeButton.focus();
}
function closeModal(modal) {
  modal.classList.add("hidden");
  if (eventModal.classList.contains("hidden") && registerModal.classList.contains("hidden")) document.body.style.overflow = "";
}
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}
function clearErrors() {
  ["nameError", "emailError", "phoneError"].forEach(id => document.getElementById(id).textContent = "");
  document.querySelectorAll("#registrationForm input").forEach(input => input.classList.remove("invalid"));
}
function validateForm() {
  clearErrors();
  const name = document.getElementById("fullName");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  let valid = true;
  if (name.value.trim().length < 2) {
    document.getElementById("nameError").textContent = "Please enter your full name (at least 2 characters).";
    name.classList.add("invalid"); valid = false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) {
    document.getElementById("emailError").textContent = "Please enter a valid email address.";
    email.classList.add("invalid"); valid = false;
  }
  const digits = phone.value.replace(/\D/g, "");
  if (!/^\d{10}$/.test(digits)) {
    document.getElementById("phoneError").textContent = "Enter a valid 10-digit phone number.";
    phone.classList.add("invalid"); valid = false;
  }
  return valid;
}
function saveRegistration(registration) {
  const storageKey = "novaRegistrations";
  const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
  saved.push(registration);
  localStorage.setItem(storageKey, JSON.stringify(saved));
}
function handleRegistration(event) {
  event.preventDefault();
  if (!validateForm()) return;
  const registration = {
    id: `NOVA-${Date.now()}`,
    name: document.getElementById("fullName").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.replace(/\D/g, ""),
    eventId: selectedEvent.id,
    eventName: selectedEvent.title,
    registeredAt: new Date().toISOString()
  };
  try {
    saveRegistration(registration);
    document.getElementById("registrationForm").classList.add("hidden");
    document.querySelector(".register-heading").classList.add("hidden");
    document.getElementById("successMessage").textContent = `Thanks, ${registration.name}! Your registration for ${registration.eventName} has been saved in this browser.`;
    document.getElementById("successState").classList.remove("hidden");
  } catch (error) {
    showToast("Unable to save registration. Please check browser storage.");
  }
}

categoryFilters.addEventListener("click", event => {
  const button = event.target.closest(".filter-pill");
  if (button) setActiveCategory(button.dataset.category);
});
eventSearch.addEventListener("input", renderEvents);
eventsGrid.addEventListener("click", event => {
  const card = event.target.closest("[data-event-id]");
  if (card) openEvent(card.dataset.eventId);
});
eventsGrid.addEventListener("keydown", event => {
  if ((event.key === "Enter" || event.key === " ") && event.target.matches("[data-event-id]")) {
    event.preventDefault(); openEvent(event.target.dataset.eventId);
  }
});
document.querySelector("[data-featured-details]").addEventListener("click", () => openEvent("future-forward"));
document.getElementById("modalRegister").addEventListener("click", () => openRegistration());
document.querySelectorAll("[data-close-modal]").forEach(button => button.addEventListener("click", () => closeModal(button.closest(".modal-backdrop"))));
[eventModal, registerModal].forEach(modal => modal.addEventListener("click", event => { if (event.target === modal) closeModal(modal); }));
document.addEventListener("keydown", event => {
  if (event.key === "Escape") { closeModal(eventModal); closeModal(registerModal); }
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); eventSearch.focus(); }
});
registrationForm.addEventListener("submit", handleRegistration);
document.getElementById("successClose").addEventListener("click", () => { closeModal(registerModal); showToast("Registration saved. See you there!"); });
document.getElementById("clearFilters").addEventListener("click", () => { eventSearch.value = ""; setActiveCategory("All"); });
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  const isLight = document.body.classList.contains("light-theme");
  localStorage.setItem("novaTheme", isLight ? "light" : "dark");
  document.getElementById("themeToggle").setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
});
if (localStorage.getItem("novaTheme") === "light") document.body.classList.add("light-theme");
document.getElementById("menuToggle").addEventListener("click", event => {
  const menu = document.getElementById("mobileMenu");
  const isOpen = menu.classList.toggle("open");
  event.currentTarget.setAttribute("aria-expanded", String(isOpen));
});
document.querySelectorAll(".mobile-menu a").forEach(link => link.addEventListener("click", () => {
  document.getElementById("mobileMenu").classList.remove("open");
  document.getElementById("menuToggle").setAttribute("aria-expanded", "false");
}));

renderEvents();
