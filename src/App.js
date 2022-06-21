import {useEffect, useRef, useState} from "react";
import Button from 'react-bootstrap/Button';
import {getCurrentWeek, handleClick, currentWeek, handleKeypress, handleChange} from "./services";
import {Container} from "react-bootstrap";

function App() {
    const [city, setCity] = useState('')
    const [oneCallData, setOneCallData] = useState(null)
    const [dayIndex, setDayIndex] = useState(0)
    const inputRef = useRef(null);

    const loopInterval = 1000 * 60 * 5;

    useEffect(() => {
        inputRef.current.focus();
        getCurrentWeek(currentWeek)
    }, [])

    useEffect(() => {
        if (oneCallData) {
            // This will run every 5 minutes
            const interval = setInterval(() => {
                handleClick(setOneCallData, city)
            }, loopInterval);
            return () => clearInterval(interval);
        }
    }, [oneCallData])

    return (
        <Container className='d-flex flex-column align-items-center p-4'>
            <div className='d-flex mb-5' style={{height: '40px'}}>
                <input onKeyDown={(e)=>handleKeypress(e,setOneCallData,city)} ref={inputRef} className='h-100' style={{marginRight: '10px'}} type="text" onChange={(e) => handleChange(e, setCity)}/>
                <Button className='h-100' onClick={() => handleClick(setOneCallData, city)}>Search City</Button>
            </div>

            {oneCallData &&
            <>
                <div className='d-flex justify-content-between' style={{minWidth:'200px'}}>
                    <p>{oneCallData && city}</p>
                    <p>{dayIndex === 0 ? 'Today' : currentWeek[dayIndex]}</p>
                </div>
                {oneCallData?.daily &&
                <img src={`http://openweathermap.org/img/wn/${oneCallData?.daily[dayIndex]?.weather[0]?.icon}@2x.png`}/>}
                <p>weather description: {oneCallData?.daily && oneCallData?.daily[dayIndex]?.weather[0]?.description}</p>

                {dayIndex === 0 && <p>Temperature: {oneCallData?.current?.temp}</p>}
                {dayIndex !== 0 && <p>Average
                    Temperature: {Math.round(((oneCallData?.daily[dayIndex]?.temp?.max + oneCallData?.daily[dayIndex]?.temp?.min) / 2) * 10) / 10}</p>}
                <p>Maximum Temperature: {oneCallData?.daily[dayIndex]?.temp?.max}</p>
                <p>Minimum Temperature: {oneCallData?.daily[dayIndex]?.temp?.min}</p>
                <p>Humidity: {oneCallData?.daily[dayIndex]?.humidity}</p>
                <p>Wind speed: {oneCallData?.daily[dayIndex]?.wind_speed} meters/second</p>
                <div className='mt-5 w-100 d-flex justify-content-between justify-content-md-start justify-content-lg-between  flex-wrap'>
                        {oneCallData?.daily?.map((item, index) => {
                                if (index < 7) {
                                    return (
                                        <div onClick={() => setDayIndex(index)} key={item} className='d-flex align-items-center justify-content-center flex-column'>
                                            {console.log("item", item)}
                                            <p>{currentWeek[index]}</p>
                                            {item?.weather &&
                                            <img src={`http://openweathermap.org/img/wn/${item?.weather[0]?.icon}@2x.png`}/>}
                                            <p>min temp: {item.temp.min}</p>
                                            <p>max temp: {item.temp.max}</p>
                                        </div>)
                                }
                            }
                        )
                        }
                    </div>
            </>
            }
        </Container>
    );
}

export default App;
