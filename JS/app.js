/* ---- Get API data ---- */

const API_URL = 'https://api.wheretheiss.at/v1/satellites/25544';
const lonInfo = document.getElementById('longitude');
const latInfo = document.getElementById('latitude');
const altInfo = document.getElementById('altitude');
const velInfo = document.getElementById('velocity');
const visInfo = document.getElementById('visibility');

const getData = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  const { longitude, latitude, altitude, velocity, visibility } = data;
  marker.setLatLng([latitude, longitude]).addTo(map);
  lonInfo.innerText = longitude;
  latInfo.innerText = -latitude;
  altInfo.innerText = `${Math.floor(altitude)} km`;
  velInfo.innerText = `${Math.floor(velocity)} km/h`;
  visInfo.innerText = visibility;
};
getData();

/* ---- Refresh Button ---- */

const btn = document.querySelector('.btn');
btn.addEventListener('click', () => getData());

/* ---- Map configuration ---- */
const map = L.map('map').setView([0, 30], 1);
const issIcon = L.icon({
  iconUrl: './assets/iss-transparent.png',
  shadowUrl: './assets/shadow-ISS.png',
  iconSize: [70, 40],
  shadowSize: [40, 50],
});
const marker = L.marker([0, 0], { icon: issIcon });
const tiles = L.tileLayer(
  'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiM3ZpbGJvbm9ibyIsImEiOiJja3l2bnM2eW0wMGR3MnhzM3JvMzlwd3hxIn0.JGAscOH3d2jLZzWF9DgKlQ',
  {
    attribution:
      'Map data &copy; <a  target=”_blank” href="https://www.openstreetmap.org/copyright"  >OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/" target=”_blank” >Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/satellite-v9',
    tileSize: 512,
    zoomOffset: -1,
  }
).addTo(map);

/* ---- Shooting stars animation with GSAP ---- */

const masterTL = gsap.timeline();

function shootingStars() {
  const starTL = gsap.timeline({
    repeat: 5,
    repeatDelay: 8,
    startAt: { opacity: 0 },
  });
  starTL
    .fromTo('#star', { x: 500, y: -200 }, { x: -1300, y: 1300, duration: 3 })
    .fromTo(
      '#star',
      { x: 1000, y: -100 },
      { x: -450, y: 1150, duration: 1.1, delay: 8 }
    )
    .fromTo(
      '#star',
      { x: 1200, y: -1050 },
      { x: -1150, y: 900, duration: 1, delay: 15 }
    )
    .fromTo(
      '#star',
      { x: 0, y: -500 },
      { x: -1400, y: 650, duration: 1.1, delay: 18 }
    )
    .fromTo(
      '#star',
      { x: 500, y: -200 },
      { x: -1300, y: 1300, duration: 2, delay: 15 }
    )
    .fromTo(
      '#star',
      { x: 500, y: -200 },
      { x: -1300, y: 1300, duration: 2, delay: 10 }
    )
    .fromTo(
      '#star',
      { x: 200, y: -200 },
      { x: -1300, y: 1300, duration: 2, delay: 13 }
    );

  return starTL;
}

masterTL.add(shootingStars());
