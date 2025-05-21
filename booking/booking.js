let events = [];
let editingId = null;

// Load saved events
function loadSavedEvents() {
  const savedEvents = localStorage.getItem("events");
  if (savedEvents) {
    events = JSON.parse(savedEvents);
    renderEvents();
  }
}

function renderEvents() {
  const container = document.getElementById("eventsContainer");
  container.innerHTML = "";

  events.forEach((event) => {
    const eventCard = document.createElement("div");
    eventCard.className = "event-card";
    eventCard.innerHTML = `
            <div class="event-header">
                <h3>${event.title}</h3>
                <div class="event-actions">
                    <button class="edit-btn" onclick="editEvent('${event.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-btn" onclick="deleteEvent('${
                      event.id
                    }')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="event-details">
                <p><strong>Date:</strong> ${new Date(
                  event.date
                ).toLocaleDateString()}</p>
                <p><strong>Location:</strong> ${event.location}</p>
                <p><strong>Category:</strong> ${event.category}</p>
                <p class="description">${event.description}</p>
            </div>
        `;
    container.appendChild(eventCard);
  });
}

function showForm() {
  const form = document.getElementById("eventForm");
  const formTitle = document.getElementById("formTitle");
  form.reset();
  formTitle.textContent = "Add New Event";
  editingId = null;
  form.style.display = "block";
}

function saveEvent(e) {
  e.preventDefault();
  const formData = {
    id: editingId || Date.now().toString(),
    title: document.getElementById("title").value,
    date: document.getElementById("date").value,
    location: document.getElementById("location").value,
    category: document.getElementById("category").value,
    description: document.getElementById("description").value,
  };

  if (editingId) {
    const index = events.findIndex((event) => event.id === editingId);
    events[index] = formData;
  } else {
    events.push(formData);
  }

  // Save to localStorage
  localStorage.setItem("events", JSON.stringify(events));

  renderEvents();
  document.getElementById("eventForm").style.display = "none";
  alert("Event saved successfully!");
}

function editEvent(id) {
  const event = events.find((event) => event.id === id);
  if (event) {
    document.getElementById("title").value = event.title;
    document.getElementById("date").value = event.date;
    document.getElementById("location").value = event.location;
    document.getElementById("category").value = event.category;
    document.getElementById("description").value = event.description;
    document.getElementById("formTitle").textContent = "Edit Event";
    editingId = id;
    document.getElementById("eventForm").style.display = "block";
  }
}

function deleteEvent(id) {
  events = events.filter((event) => event.id !== id);
  localStorage.setItem("events", JSON.stringify(events));
  renderEvents();
  alert("Event deleted successfully!");
}

// Search functionality
document.getElementById("searchInput").addEventListener("input", function (e) {
  const searchTerm = e.target.value.toLowerCase();
  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm) ||
      event.description.toLowerCase().includes(searchTerm)
  );
  renderFilteredEvents(filteredEvents);
});

function renderFilteredEvents(filteredEvents) {
  const container = document.getElementById("eventsContainer");
  container.innerHTML = "";

  filteredEvents.forEach((event) => {
    const eventCard = document.createElement("div");
    eventCard.className = "event-card";
    eventCard.innerHTML = `
            <div class="event-header">
                <h3>${event.title}</h3>
                <div class="event-actions">
                    <button class="edit-btn" onclick="editEvent('${event.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-btn" onclick="deleteEvent('${
                      event.id
                    }')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="event-details">
                <p><strong>Date:</strong> ${new Date(
                  event.date
                ).toLocaleDateString()}</p>
                <p><strong>Location:</strong> ${event.location}</p>
                <p><strong>Category:</strong> ${event.category}</p>
                <p class="description">${event.description}</p>
            </div>
        `;
    container.appendChild(eventCard);
  });
}

// Initialize the app
window.onload = function () {
  loadSavedEvents();
};
s;
