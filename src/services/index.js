import axios from "axios";

const getOneCallReq = (lat, lon, setOneCallData) => {
    axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_KEY}&units=metric`)
        .then(res => {
            console.log("yayy : ", res.data);
            setOneCallData(res.data);
        })
        .catch(err => {
            console.log("error: ", err);
        })
}

export const handleClick = (setOneCallData, city) => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_KEY}&units=metric`)
        .then(res => {
            getOneCallReq(res.data.coord.lat, res.data.coord.lon, setOneCallData)
        })
        .catch(err => {
            setOneCallData(null)
            console.log("error: ", err)
        })
}

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export let currentWeek = []
export const getCurrentWeek = () => {
    for (let i = 0; i <= 6; i++) {
        currentWeek.push(weekday[(new Date().getDay()) + i])
    }
}

export const handleKeypress = (e,setOneCallData,city) => {
    if (e.keyCode === 13) {
        handleClick(setOneCallData, city);
    }
};

export const handleChange = (event,setCity) => {
    event.preventDefault();
    setCity(event.target.value)
}