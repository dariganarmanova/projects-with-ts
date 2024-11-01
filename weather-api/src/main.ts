interface Weather {
  temperature: number;
  feelsLike: number;
  humidity: number;
  speed: number;
  city: string;
}

const lat = document.getElementById("lat") as HTMLInputElement;
const lon = document.getElementById("lon") as HTMLInputElement;
const button = document.getElementById("submit") as HTMLButtonElement;
const display = document.getElementById("display") as HTMLDivElement;

async function fetchWeather(
  latitude: string,
  longitude: string
): Promise<Weather | null> {
  try {
    const response = await fetch("http://localhost:5003/city", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ lat: latitude, lon: longitude }),
    });
    if (!response.ok) {
      console.error("Failed to fetch");
      return null;
    }
    const final: Weather = await response.json();
    return final;
  } catch (error) {
    console.log(error);
    return null;
  }
}

function displayWeather(final: Weather | null): void {
  if (!final) {
    display.innerHTML = "Failed to fetch the data";
    return;
  }
  display.innerHTML = `
  <h2>${final.city}</h2>
  <h1>${final.feelsLike}</h1>
  <h1>${final.temperature}</h1>
  `;
}

button.addEventListener("click", async () => {
  const latitude = lat.value;
  const longitude = lon.value;
  const weatherData = await fetchWeather(latitude, longitude);
  displayWeather(weatherData);
});
