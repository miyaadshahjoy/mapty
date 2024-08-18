'use strict';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// creating class Workout
class Workout {
  id;
  date;
  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
    this.#createId();
    this.#calcDate();
  }
  #createId() {
    this.id = Date.now() + ''.slice(-10);
  }
  #calcDate() {
    this.date = new Date();
  }
  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.description = `${this.name[0].toUpperCase() + this.name.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
}

// creating Running class
class Running extends Workout {
  name = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.#calcPace();
    this._setDescription();
  }
  #calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
  }
}

// creating Running class
class Cycling extends Workout {
  name = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.#calcSpeed();
    this._setDescription();
  }
  #calcSpeed() {
    // km / h
    this.speed = this.distance / (this.duration / 60);
  }
}

////////////////////////////////////////////////////////////////////////////////////////////
// ARCHITECTURE

class App {
  #map;
  #mapEv;
  #workouts = [];
  constructor() {
    // load workouts from local storage

    this.#getPosition();
    this.#getDataFromLocalStorage();

    // Event handlers
    inputType.addEventListener('change', this.#toggleElevationField);
    form.addEventListener('submit', this.#newWorkout.bind(this));
    containerWorkouts.addEventListener('click', this.#moveToPopup.bind(this));
  }
  #getPosition() {
    navigator.geolocation.getCurrentPosition(this.#loadMap.bind(this), error =>
      console.log("We couldn't get the position")
    );
  }
  #loadMap(position) {
    const { latitude, longitude } = position.coords;
    const coords = [latitude, longitude];
    // Render map on current location

    this.#map = L.map('map').setView(coords, 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);
    this.#map.on('click', this.#showForm.bind(this));

    this.#workouts.forEach(work => {
      this.#renderWorkoutMarker(work);
    });
  }
  #showForm(mapE) {
    this.#mapEv = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }
  #hideForm() {
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }
  #toggleElevationField() {
    inputCadence.parentElement.classList.toggle('form__row--hidden');
    inputElevation.parentElement.classList.toggle('form__row--hidden');
  }

  #renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.name}-popup`,
        }).setContent(`${workout.description}`)
      )
      .openPopup();
  }
  #renderWorkout(workout) {
    if (workout.name === 'running') {
      const html = ` <li class="workout workout--running" data-id="${
        workout.id
      }">
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">🏃‍♂️</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>`;
      form.insertAdjacentHTML('afterend', html);
    }

    if (workout.name === 'cycling') {
      const html = ` <li class="workout workout--cycling" data-id="${
        workout.id
      }">
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">🚴‍♀️</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>`;
      form.insertAdjacentHTML('afterend', html);
    }
  }

  #newWorkout(e) {
    e.preventDefault();
    document.querySelector('.remove__workout--btn').classList.remove('hidden');
    // helper function
    const isNumber = function (...nums) {
      return nums.every(num => isFinite(num));
    };
    const isPositive = function (...nums) {
      return nums.every(num => num > 0);
    };

    let workout;
    // Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;

    const { lat, lng } = this.#mapEv.latlng;
    const coords = [lat, lng];
    // creating running object
    if (type === 'running') {
      const cadence = +inputCadence.value;
      // check if data is valid

      if (
        !isNumber(distance, duration, cadence) ||
        !isPositive(distance, duration, cadence)
      )
        return alert('Inputs have to be positive numbers');
      workout = new Running(coords, distance, duration, cadence);
      console.log(workout);
      this.#workouts.push(workout);
    }

    // creating cycling object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      // check if data is valid

      if (
        !isNumber(distance, duration, elevation) ||
        !isPositive(distance, duration)
      )
        return alert('Inputs have to be positive numbers');
      workout = new Cycling(coords, distance, duration, elevation);
      console.log(workout);
      this.#workouts.push(workout);
    }
    console.log(this.#workouts);

    // render workout on map
    this.#renderWorkoutMarker(workout);

    // render workout on list
    this.#renderWorkout(workout);

    // hide form
    this.#hideForm();

    // set workout in local storage
    this.#setLocalStorage();
  }
  #moveToPopup(e) {
    const clickedEl = e.target.closest('.workout');
    if (!clickedEl) return;
    const workout = this.#workouts.find(workout => {
      return workout.id === clickedEl.dataset.id;
    });
    this.#map.setView(workout.coords, 13);
  }
  #setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }
  #getDataFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));
    if (!data) return;
    this.#workouts = data;
    this.#workouts.forEach(work => {
      this.#renderWorkout(work);
    });
    document.querySelector('.remove__workout--btn').classList.remove('hidden');
  }
  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }
}

const app = new App();

document
  .querySelector('.remove__workout--btn')
  .addEventListener('click', app.reset);
