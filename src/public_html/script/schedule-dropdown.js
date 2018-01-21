let currPartial = null;
let dropdown = document.getElementById("schedule-dropdown");

dropdown.onchange = function() {
	if (currPartial !== null) {
		currPartial.style.display = 'none';
	}
	
	let selectedDropdown = dropdown.options[dropdown.selectedIndex];
	if (selectedDropdown.value !== "") {
		currPartial = document.querySelector(".partial." + selectedDropdown.value);
		currPartial.style.display = 'inherit';
	}
};