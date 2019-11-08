
const fetchLatestLaunch = async () => {
  try {
    const response = await fetch('https://api.spacexdata.com/v3/launches/latest')
    return await response.json()
  } catch (err) {
    throw new Error(err)
  }
}

const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const initLatestLaunch = async (latestLaunchElem) => {
  const launchData = await fetchLatestLaunch()
  const figureElem = latestLaunchElem.querySelector('figure')
  const image = figureElem.querySelector('img')
  const flickrImages = launchData.links.flickr_images
  image.setAttribute('src', flickrImages[getRandomInt(0, flickrImages.length - 1)])
  image.setAttribute('alt', `${launchData.mission_name} flickr image`)
  figureElem.querySelector('figcaption').textContent = launchData.details
}

const fetchHistory = async () => {
  try {
    const response = await fetch('https://api.spacexdata.com/v3/history')
    return await response.json()
  } catch (err) {
    throw new Error(err)
  }
}

const getDDMMYYYY = (date) => {
  return `${date.getDay().toString().padStart(2, '0')}/${date.getMonth().toString().padStart(2, '0')}/${date.getFullYear()}`
}

const initHistory = async (historyElement) => {
  const historyData = await fetchHistory()
  const historyEvents = historyElement.querySelector('#history-events')
  historyData.forEach(event => {
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(`${getDDMMYYYY(new Date(event.event_date_utc))} - ${event.details}`))
    historyEvents.appendChild(li)
  })
}

window.onload = () => {
  initLatestLaunch(document.getElementById('latest-launch'))
  initHistory(document.getElementById('history'))
}
