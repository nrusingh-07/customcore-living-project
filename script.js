document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.querySelector("#contactForm");
  const statusEl = document.querySelector("#formStatus");

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value
    };

    statusEl.textContent = "⏳ Sending message...";
    statusEl.style.color = "#555";

    try {
      const res = await fetch("https://customcore-living-project-1.onrender.com/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const result = await res.json();

      if (result.success) {
        statusEl.textContent = "✅ Message sent successfully!";
        statusEl.style.color = "green";
        e.target.reset();
      } else {
        statusEl.textContent = "❌ Failed to send message. Try again later.";
        statusEl.style.color = "red";
      }
    } catch (error) {
      console.error("Error:", error);
      statusEl.textContent = "⚠️ Something went wrong. Please try again.";
      statusEl.style.color = "red";
    }
  });
});
