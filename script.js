let latitude = null;
let longitude = null;

const preview = document.getElementById("preview");
const imageInput = document.getElementById("imageInput");
const locationText = document.getElementById("locationText");
const loader = document.getElementById("loader");
const submitBtn = document.getElementById("submitBtn");

// Image preview
imageInput.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    preview.src = URL.createObjectURL(file);
    preview.style.display = "block";
  }
});

// Detect user location
function detectLocation() {
  if (!navigator.geolocation) {
    locationText.innerHTML = "❌ Geolocation not supported in this browser.";
    return;
  }

  locationText.innerHTML = "⏳ Detecting location...";

  navigator.geolocation.getCurrentPosition(
    (position) => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;

      locationText.innerHTML = `
        ✅ Location Detected<br>
        📍 Latitude: ${latitude.toFixed(5)} <br>
        📍 Longitude: ${longitude.toFixed(5)}
      `;

      submitBtn.disabled = false; // Enable dispatch
    },
    () => {
      locationText.innerHTML = "❌ Location access denied.";
    }
  );
}

// Show success modal
function showSuccessModal() {
  document.getElementById("successModal").style.display = "flex";
}

// Close modal
function closeModal() {
  document.getElementById("successModal").style.display = "none";
}

// Submit report
async function submitReport() {
  if (!latitude || !longitude) {
    alert("Please detect location first.");
    return;
  }

  loader.classList.remove("hidden");
  submitBtn.disabled = true;

  const formData = new FormData();
  formData.append("latitude", latitude);
  formData.append("longitude", longitude);

  if (imageInput.files[0]) {
    formData.append("image", imageInput.files[0]);
  }

  try {
    const response = await fetch("/api/report-cow", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log("Server Response:", data);

    showSuccessModal();

    // Reset form
    preview.src = "";
    preview.style.display = "none";
    imageInput.value = "";
    locationText.innerHTML = "";
    latitude = null;
    longitude = null;

  } catch (error) {
    alert("❌ Server error. Is backend running?");
    console.error(error);
  }

  loader.classList.add("hidden");
}