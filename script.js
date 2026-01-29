function openInvitePage() {
  const invite = document.getElementById("invite");
  if (!invite) return;

  invite.hidden = false;

  // Optional: add a class for fade-in if you want
  invite.classList.add("is-visible");

  invite.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Find your existing Circle 22 button element and hook this in.
// If you already have a click handler, just call openInvitePage() at the end.
const circleBtn = document.querySelector('[data-circle22-btn], #circle22Btn, .circle22-btn');
if (circleBtn) {
  circleBtn.addEventListener("click", () => {
    // If you have an elevator-door animation function, keep it.
    // Example: playElevatorOpen();

    // Give the door animation a beat, then reveal the invite page
    setTimeout(openInvitePage, 800);
  });
}
