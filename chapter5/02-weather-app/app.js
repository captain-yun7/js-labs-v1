// 날씨 애플리케이션 JavaScript 코드

// API 키 (실제 프로젝트에서는 환경 변수나 서버 사이드에서 관리하는 것이 좋습니다)
const API_KEY = 'YOUR_OPENWEATHER_API_KEY';

// DOM 요소 참조
const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const cityNameElement = document.getElementById('cityName');
const countryElement = document.getElementById('country');
const dateTimeElement = document.getElementById('dateTime');
const temperatureElement = document.getElementById('temperature');
const weatherIconElement = document.getElementById('weatherIcon');
const weatherDescriptionElement = document.getElementById('weatherDescription');
const windSpeedElement = document.getElementById('windSpeed');
const humidityElement = document.getElementById('humidity');
const feelsLikeElement = document.getElementById('feelsLike');
const forecastElement = document.getElementById('forecast');
const errorMessageElement = document.getElementById('errorMessage');

// 페이지 로드 시 기본 도시의 날씨 정보 가져오기
document.addEventListener('DOMContentLoaded', () => {
    getWeather('Seoul');
});

// 검색 버튼 클릭 이벤트
searchButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city !== '') {
        getWeather(city);
    }
});

// 입력 필드에서 엔터 키 누를 때 이벤트
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city !== '') {
            getWeather(city);
        }
    }
});

// 현재 날씨 정보 가져오기
async function getWeather(city) {
    try {
        // 에러 메시지 초기화
        errorMessageElement.style.display = 'none';
        
        // 현재 날씨 데이터 가져오기
        const currentWeatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=kr`
        );
        
        if (!currentWeatherResponse.ok) {
            throw new Error('도시를 찾을 수 없습니다. 다른 도시 이름을 입력해주세요.');
        }
        
        const currentWeatherData = await currentWeatherResponse.json();
        
        // 5일 예보 데이터 가져오기
        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=kr`
        );
        
        if (!forecastResponse.ok) {
            throw new Error('일기 예보 데이터를 가져올 수 없습니다.');
        }
        
        const forecastData = await forecastResponse.json();
        
        // 날씨 데이터 표시
        displayCurrentWeather(currentWeatherData);
        displayForecast(forecastData);
        
        // 입력 필드 초기화
        cityInput.value = '';
        
    } catch (error) {
        showError(error.message);
    }
}

// 현재 날씨 정보 표시
function displayCurrentWeather(data) {
    // 도시 및 국가 정보
    cityNameElement.textContent = data.name;
    countryElement.textContent = data.sys.country;
    
    // 날짜 및 시간 설정
    const localTime = getLocalTime(data.dt, data.timezone);
    dateTimeElement.textContent = localTime;
    
    // 온도 및 날씨 정보
    temperatureElement.textContent = Math.round(data.main.temp);
    weatherIconElement.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIconElement.alt = data.weather[0].description;
    weatherDescriptionElement.textContent = data.weather[0].description;
    
    // 상세 정보
    windSpeedElement.textContent = data.wind.speed.toFixed(1);
    humidityElement.textContent = data.main.humidity;
    feelsLikeElement.textContent = Math.round(data.main.feels_like);
}

// 5일 예보 표시
function displayForecast(data) {
    forecastElement.innerHTML = '';
    
    // 3시간 간격 데이터에서 매일 정오(12:00) 데이터만 필터링
    const dailyData = data.list.filter(item => {
        const date = new Date(item.dt * 1000);
        return date.getUTCHours() === 12;
    });
    
    // 최대 5일 예보 표시
    dailyData.slice(0, 5).forEach(item => {
        const date = new Date(item.dt * 1000);
        const dayName = getDayName(date);
        const temp = Math.round(item.main.temp);
        const icon = item.weather[0].icon;
        const description = item.weather[0].description;
        
        // 일기 예보 항목 생성
        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';
        forecastItem.innerHTML = `
            <div class="forecast-day">${dayName}</div>
            <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}">
            <div class="forecast-temp">${temp}°C</div>
        `;
        
        forecastElement.appendChild(forecastItem);
    });
}

// 요일 이름 가져오기
function getDayName(date) {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return days[date.getDay()];
}

// 지역 시간 계산 (타임존 오프셋 적용)
function getLocalTime(timestamp, timezone) {
    const date = new Date((timestamp + timezone) * 1000);
    
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    
    const ampm = hours >= 12 ? '오후' : '오전';
    const formattedHours = hours % 12 || 12; // 12시간제로 변환
    
    return `${year}년 ${month}월 ${day}일 ${ampm} ${formattedHours}:${minutes}`;
}

// 에러 메시지 표시
function showError(message) {
    errorMessageElement.textContent = message;
    errorMessageElement.style.display = 'block';
} 