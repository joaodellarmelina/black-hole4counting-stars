import './style.css'
import Experience from './Experience/Experience.js'

const experience = new Experience({
    targetElement: document.querySelector('.experience')
})


// couting stars
const starsControl = document.querySelector('.stars-control')
const starsCountInput = document.querySelector('#stars-count')
const starsCountNumberInput = document.querySelector('#stars-count-number')
const starsCountValue = document.querySelector('.stars-control__value')
const starsCountBytes = document.querySelector('.stars-control__bytes')

const MIN_STARS = Number(starsCountInput.min) || 1
const MAX_STARS = Number(starsCountInput.max) || 100000
const BYTES_PER_STAR = 28

const clampStarsCount = (count) =>
{
    if(Number.isNaN(count))
        return MIN_STARS

    return Math.min(MAX_STARS, Math.max(MIN_STARS, Math.floor(count)))
}

const formatBytes = (bytes) =>
{
    if(bytes < 1024)
        return `${bytes} B`

    const units = ['KB', 'MB', 'GB']
    let value = bytes
    let unitIndex = -1

    do
    {
        value /= 1024
        unitIndex++
    }
    while(value >= 1024 && unitIndex < units.length - 1)

    return `${value.toFixed(value >= 100 ? 0 : value >= 10 ? 1 : 2)} ${units[unitIndex]}`
}

const syncStarsCount = (count) =>
{
    const nextCount = clampStarsCount(count)

    starsCountInput.value = nextCount
    starsCountNumberInput.value = nextCount
    starsCountValue.value = `Applied: ${nextCount.toLocaleString('en-US')}`
    starsCountValue.textContent = `Applied: ${nextCount.toLocaleString('en-US')}`
    starsCountBytes.value = `Buffer: ${formatBytes(nextCount * BYTES_PER_STAR)}`
    starsCountBytes.textContent = `Buffer: ${formatBytes(nextCount * BYTES_PER_STAR)}`
}

const syncPendingCount = (count) =>
{
    const nextCount = clampStarsCount(count)

    starsCountInput.value = nextCount
    starsCountNumberInput.value = nextCount
    starsCountBytes.value = `Buffer: ${formatBytes(nextCount * BYTES_PER_STAR)}`
    starsCountBytes.textContent = `Buffer: ${formatBytes(nextCount * BYTES_PER_STAR)}`
}

syncStarsCount(experience.getStarsCount())

starsControl.addEventListener('input', (event) =>
{
    if(event.target === starsCountInput)
    {
        syncPendingCount(Number(starsCountInput.value))
        return
    }

    if(event.target === starsCountNumberInput)
    {
        syncPendingCount(Number(starsCountNumberInput.value))
    }
})

starsControl.addEventListener('submit', (event) =>
{
    event.preventDefault()

    const nextCount = clampStarsCount(Number(starsCountNumberInput.value))

    experience.setStarsCount(nextCount)
    syncStarsCount(experience.getStarsCount())
})
