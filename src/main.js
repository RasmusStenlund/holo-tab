const API_KEY = import.meta.env.VITE_NASA_API_KEY;

const current_date = document.getElementById('current-date')

function update_time() {
  const now = new Date()

  const date = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  const time = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })

  current_date.textContent = `${date} ${time}`;
}

update_time()
setInterval(update_time, 1000)

const error_container = document.getElementById('nasa-error')
const title_container = document.getElementById('nasa-title')
const date_container = document.getElementById('nasa-date')
const image_container = document.getElementById('nasa-image')
const explanation_container = document.getElementById('nasa-explanation')
const loading = document.getElementById('nasa-loading')

fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
.then(response => response.json())
.then(data => {
  let media;

  if (data.media_type === "image") {
    media = `<img src = '${data.url}'>`;
  } else if (data.url.includes('youtube')) {
    let embed_url = data.url.replace('watch?v=', 'embed/')
    media = `<iframe src = '${embed_url}' style = 'width: 640px; height: 360px;'></iframe> `
  } else {
    media = `<video src = '${data.url}' controls></video>`;
  }

  loading.classList.add('hidden');
  error_container.classList.add('hidden');

  title_container.innerHTML = `<h2>${data.title}</h2>`;
  date_container.innerHTML = `<p>${data.date}</p>`;
  image_container.innerHTML = `${media}`;
  explanation_container.innerHTML = `<p>${data.explanation}</p>`;
  title_container.classList.remove('hidden');
  date_container.classList.remove('hidden');
  image_container.classList.remove('hidden');
  explanation_container.classList.remove('hidden');
})
.catch(err => {
  loading.classList.add('hidden');
  error_container.innerHTML = `<p>Error: ${err.message}</p>>`
  error_container.classList.remove('hidden')
})

const date_input = document.getElementById('date-picker')

const today = new Date().toISOString().split('T')[0]

date_input.max = today;
date_input.value = today;

const confirm_date = document.getElementById('confirm-date')

confirm_date.addEventListener('click', function () {
  loading.classList.remove('hidden');
  error_container.classList.add('hidden');
  title_container.classList.add('hidden');
  date_container.classList.add('hidden');
  image_container.classList.add('hidden');
  explanation_container.classList.add('hidden');

  fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date_input.value}`)
  .then(response => response.json())
  .then(data => {
    let media;

    if (data.media_type === "image") {
      media = `<img src = '${data.url}'>`;
    } else if (data.url.includes('youtube')) {
      let embed_url = data.url.replace('watch?v=', 'embed/')
      media = `<iframe src = '${embed_url}' style = 'width: 640px; height: 360px;'></iframe> `;
    } else {
      media = `<video src = '${data.url}' controls></video>`;
    }

    loading.classList.add('hidden');
    error_container.classList.add('hidden');

    title_container.innerHTML = `<h2>${data.title}</h2>`;
    date_container.innerHTML = `<p>${data.date}</p>`;
    image_container.innerHTML = `${media}`;
    explanation_container.innerHTML = `<p>${data.explanation}</p>`;
    title_container.classList.remove('hidden');
    date_container.classList.remove('hidden')
    image_container.classList.remove('hidden');
    explanation_container.classList.remove('hidden');
  })
  .catch(err => {
    loading.classList.add('hidden');
    error_container.innerHTML = `<p>Error: ${err.message}</p>>`;
    error_container.classList.remove('hidden');
  })
})

