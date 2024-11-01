const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('../db')
const axios = require('axios')

app.use(cors())
app.use(express.json())

app.post('/city', async (req, res) => {
    try {
        const { lat, lon } = req.body
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                lat: lat,
                lon: lon,
                appid: '99ac6437b189e55fcdfaa8f3735a32e0',
                units: 'metric'
            }
        })

        const weatherData = response.data
        console.log(weatherData)
        const filteredData = {
            temperature: weatherData.main.temp,
            feelsLike: weatherData.main.feels_like,
            humidity: weatherData.main.humidity,
            speed: weatherData.wind.speed,
            city: weatherData.name
        }
        res.json(filteredData)
    } catch (error) {
        res.status(500).json({ message: "Error in the server", error: error.message })

    }
})

module.exports = app
//API_KEY = "99ac6437b189e55fcdfaa8f3735a32e0"