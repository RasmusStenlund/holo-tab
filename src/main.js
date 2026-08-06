const API_KEY = import.meta.env.VITE_NASA_API_KEY;

const container = document.querySelector('#app')

container.innerHTML = '<p>Loading</p>'

fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
  .then(response => response.json())
  .then(data => {
    let media;

    if (data.media_type === "image") {
      media = `<img src = '${data.url}' style = 'height: 400px;'>`;
    } else if (data.url.includes('youtube')) {
      let embed_url = data.url.replace('watch?v=', 'embed/')
      media = `<iframe src = '${embed_url}' style = 'width: 640px; height: 360px;'></iframe> `
    } else {
      media = `<video src = '${data.url}' controls></video>`;
    }

    container.innerHTML = `
      <p>${data.date}</p>
      <h2>${data.title}</h2>
      ${media}
      <P>${data.explanation}</p>
    `;
  })
  .catch(err => {
    container.innerHTML = `<p>Error: ${err.message}</p>>`
  })

