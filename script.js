const searchInput = document.getElementById('state');
const centresContainer = document.querySelector('.centres');

fetch('https://isro.vercel.app/api/centres')
	.then((response) => response.json())
	.then((data) => {
		let centres = data.centres;

		function displayCentres() {
			centresContainer.innerHTML = '';
			centres
				.filter((centre) =>
					centre.State.toLowerCase().includes(searchInput.value.toLowerCase()),
				)
				.forEach((centre) => {
					const card = document.createElement('div');
					card.classList.add('card');
					const name = document.createElement('h2');
					name.textContent = centre.name;
					const place = document.createElement('p');
					place.textContent = `Place: ${centre.Place}`;
					const state = document.createElement('p');
					state.textContent = `State: ${centre.State}`;
					card.appendChild(name);
					card.appendChild(place);
					card.appendChild(state);
					centresContainer.appendChild(card);
				});
		}

		searchInput.addEventListener('input', displayCentres);
		displayCentres();
	});

// requwest to get launchers
fetch('https://isro.vercel.app/api/launchers')
	.then((response) => response.json())
	.then((data) => {
		const launchers = data.launchers;
		const launsec = document.getElementById('launchers');
		launchers.forEach((launcher) => {
			const section = document.createElement('section');
			const heading = document.createElement('h2');

			heading.textContent = launcher.id;

			section.appendChild(heading);
			launsec.appendChild(section);
		});
	})
	.catch((error) => console.error(error));

// // request for customers staelites
// fetch('https://isro.vercel.app/api/customer_satellites')
// 	.then((response) => response.json())
// 	.then((data) => {
// 		const satellites = data.customer_satellites;
// 		const satellitesContainer = document.getElementById('satellites-container');
// 		satellites.forEach((satellite) => {
// 			const satelliteId = satellite.id;
// 			const satelliteCountry = satellite.country;
// 			const satelliteLaunchDate = satellite.launch_date;
// 			const satelliteElement = document.createElement('div');
// 			satelliteElement.classList.add('satellite');
// 			satelliteElement.innerHTML = `
//         <p>ID: ${satelliteId}</p>
//         <p>Country: ${satelliteCountry}</p>
//         <p>Launch Date: ${satelliteLaunchDate}</p>
//       `;
// 			satellitesContainer.appendChild(satelliteElement);
// 		});
// 	})
// 	.catch((error) => console.error(error));

// Fetch the satellite data
fetch('https://isro.vercel.app/api/customer_satellites')
	.then((response) => response.json())
	.then((data) => {
		const satellites = data.customer_satellites;
		const satellitesContainer = document.getElementById('satellites-container');

		// Render the initial list of satellites
		renderSatellites(satellites);

		// Add an event listener to the search input field
		const searchInput = document.getElementById('country-search');
		searchInput.addEventListener('input', (event) => {
			// Get the search query from the input field
			const query = event.target.value.trim().toLowerCase();

			// Filter the satellite data based on the search query
			const filteredSatellites = satellites.filter((satellite) => {
				const country = satellite.country.toLowerCase();
				return country.includes(query);
			});

			// Render the filtered list of satellites
			renderSatellites(filteredSatellites);
		});
	})
	.catch((error) => console.error(error));

function renderSatellites(satellites) {
	const satellitesContainer = document.getElementById('satellites-container');
	satellitesContainer.innerHTML = '';

	satellites.forEach((satellite) => {
		const satelliteId = satellite.id;
		const satelliteCountry = satellite.country;
		const satelliteLaunchDate = satellite.launch_date;
		const satelliteElement = document.createElement('div');
		satelliteElement.classList.add('satellite');
		satelliteElement.innerHTML = `
      <p>ID: ${satelliteId}</p>
      <p>Country: ${satelliteCountry}</p>
      <p>Launch Date: ${satelliteLaunchDate}</p>
    `;
		satellitesContainer.appendChild(satelliteElement);
	});
}

// // Fetch the launcher data
// fetch('https://isro.vercel.app/api/launchers')
// 	.then((response) => response.json())
// 	.then((data) => {
// 		const launchers = data.launchers;
// 		const launchersContainer = document.getElementById('launchers-container');

// 		// Render the initial list of launchers
// 		renderLaunchers(launchers);

// 		// Add an event listener to the search input field
// 		const searchInput = document.getElementById('launcher-search');
// 		searchInput.addEventListener('input', (event) => {
// 			// Get the search query from the input field
// 			const query = event.target.value.trim().toLowerCase();

// 			// Filter the launcher data based on the search query
// 			const filteredLaunchers = launchers.filter((launcher) => {
// 				const id = launcher.id.toLowerCase();
// 				return id.includes(query);
// 			});

// 			// Render the filtered list of launchers
// 			renderLaunchers(filteredLaunchers);
// 		});
// 	})
// 	.catch((error) => console.error(error));

// function renderLaunchers(launchers) {
// 	const launchersContainer = document.getElementById('launchers-container');
// 	launchersContainer.innerHTML = '';

// 	launchers.forEach((launcher) => {
// 		const launcherId = launcher.id;
// 		const launcherElement = document.createElement('div');
// 		launcherElement.classList.add('launcher');
// 		launcherElement.innerHTML = `
//       <p>ID: ${launcherId}</p>
//     `;
// 		launchersContainer.appendChild(launcherElement);
// 	});
// }
