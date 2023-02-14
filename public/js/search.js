const search = document.querySelector('form');

search.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get values from user input
  let zip = document.querySelector('#zipcode').value;
  let item = document.querySelector('#item-search').value;

  try {
    // Fetch to backend to get listing data
    let url = `/api/search/${zip}?zipCode=${zip}`;
    if (item) {
      url += `&item=${item}`;
    }
    const res = await fetch(url);
    // If response is successful, redirect user to search page
    //  if (res.ok) {
    //  window.location.replace(url);
    //  window.location.href= '/search';
    const listings = await res.json();
    
    // Init the map
    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: { lat: listings[0].latitude, lng: listings[0].longitude }
    });

    // Create marker for each listing
    listings.forEach((listing) => {
      const marker = new google.maps.Marker({
        position: { lat: listing.latitude, lng: listing.longitude },
        map,
        title: listing.street_address,
      });

      // Create the info window for map marker
      let infoWindow = new google.maps.InfoWindow({
        content: `
      <div>${listing.address}</div>
      <div>${listing.item_name}</div>
  `
      });
      // Associate the info window with clicking the marker
      marker.addListener('click', function () {
        infoWindow.open(map, marker);
      });
      addListings(listings)
    });
    // }
  } catch (err) {
    console.error(err);
  }
});
function addListings(listings) {
  console.log(listings);
  const projectsDiv = document.getElementById('projectDiv')
  projectsDiv.innerHTML = "";
  listings.forEach((listing) => {
  
    const divEl = document.createElement("div")
    const head = document.createElement("h2")
    const link = document.createElement("a")
      link.textContent = `${listing.item_name}`
      link.href = `/project/${listing.id}`
    const user = document.createElement("p")
      user.textContent =  "Created by ash"
      // `Created by ${listing.user.name}`;
    const description = document.createElement("p");
      description.textContent = `${listing.description}`;
      // description.textContent = listing.description;
      divEl.append(link, user, description)
    projectsDiv.appendChild(divEl);
//     `
  });
}
