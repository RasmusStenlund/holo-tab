const API_KEY = import.meta.env.VITE_NASA_API_KEY;

const container = document.querySelector('#app')
const title_container = document.getElementById('nasa-title')
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

    loading.classList.add('hidden')

    title_container.innerHTML = `<h2>${data.title}</h2>`;
    image_container.innerHTML = `${media}`;
    explanation_container.innerHTML = `<p>${data.explanation}</p>`;
  })
  .catch(err => {
    container.innerHTML = `<p>Error: ${err.message}</p>>`
  })

