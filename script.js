const getUsers = async () => {
  const success = document.getElementById('success');
  success.innerHTML = "Loading...";
  success.classList.remove("success");
  const users = await fetch('https://randomuser.me/api?results=5')
    .then(response => response.json())
    .then(data => data.results.map((element) => {
      return {
        picture: element.picture,
        cell: element.cell,
        country: element.location.country,
        email: element.email,
        coordinates: element.location.coordinates
      }
    }));
  return users;
}

const Card = (picture, cell, country, email, coordinates) => {
  const div = document.createElement('div');
  div.classList.add("card");
  div.innerHTML = `
  <img src=${picture} />
  <div class="card-info">
    <div> Cell: ${cell} </div>
    <div> Country: ${country} </div>
    <div> Email: ${email} </div>
    <div> Coordinates: </div>
    <div> Latitude: ${coordinates.latitude} </div>
    <div> Longitude: ${coordinates.longitude} </div>
  </div>
  `;
  return div
}

const addUsers = async () => {
  const main = document.getElementById('main');
  main.innerHTML = '';
  const users = await getUsers();
  users.forEach(user => {
    main.appendChild(Card(user.picture.medium,
                          user.cell,
                          user.country,
                          user.email,
                          user.coordinates));
  });
  const success = document.getElementById('success');
  success.innerHTML = "Success :)";
}
