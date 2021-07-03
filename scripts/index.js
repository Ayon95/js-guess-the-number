// Store the player's difficulty peference in the session storage; e.g. difficulty = "easy"
function saveDifficulty(event) {
	// event bubbling technique; first it will check if the click occurred on a radio button
	if (event.target.type === "radio") {
		const radioButtons = document.getElementsByName("difficulty");
		for (let i = 0; i < radioButtons.length; i++) {
			if (radioButtons[i].checked) {
				sessionStorage.setItem("difficulty", radioButtons[i].value);
				break;
			}
		}
	}
}

document.addEventListener("click", saveDifficulty);
