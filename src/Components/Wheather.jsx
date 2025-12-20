import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoSearchOutline } from "react-icons/io5";
import { FaCloudSun } from "react-icons/fa";
import Hourly from "./Hourly";
import Air from "./Air";

import { GiWindsock } from "react-icons/gi";
import { FaDroplet } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { FaTemperatureHigh } from "react-icons/fa";

import { FaCloud } from "react-icons/fa";
import { FaCloudShowersHeavy } from "react-icons/fa6";
import { FaSun } from "react-icons/fa";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { FaCloudSunRain } from "react-icons/fa";
import { FaMoon } from "react-icons/fa6";
import { FaCloudMoon } from "react-icons/fa";
import SevenDay from "./SevenDay";



const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const Wheather = () => {

    const [city, setCity] = useState('Delhi');
    const [input, setInput] = useState("");
    const [cityData, setCityData] = useState(null);
    const [loading, setLoading] = useState(false);


    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/next7days?unitGroup=metric&key=${API_KEY}&contentType=json`);
            setCityData(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [city]);

    function check(val) {
        switch (val) {
            case "Partially cloudy":
                return <FaCloudSun />;
            case "partly-cloudy-day":
                return <FaCloudSun />;
            case "partly-cloudy-night":
                return <FaCloudMoon />;
            case "cloudy":
                return <FaCloud />;
            case "Clear":
                return <FaSun />;
            case "clear-day":
                return <FaSun />;
            case "rain":
                return <FaCloudShowersHeavy />;
            case "Rain":
                return <FaCloudShowersHeavy />;
            case "Rain, Partially cloudy":
                return <FaCloudSunRain />;
            case "Rain, Overcast":
                return <FaCloudSunRain />;
            case "Storm":
                return <BsFillLightningChargeFill />;
            case "clear-night":
                return <FaMoon />;
            default:
                return <FaCloud />;
        }
    }

    function checkColor(val) {
        switch (val) {
            case "Partially cloudy":
                return "text-yellow-300";
            case "partly-cloudy-day":
                return "text-yellow-300";
            case "partly-cloudy-night":
                return "text-[#A5B4FC]";
            case "cloudy":
                return "text-gray-300";
            case "Clear":
                return "text-yellow-300";
            case "clear-day":
                return "text-yellow-300";
            case "rain":
                return "text-[#93C5FD]";
            case "Rain":
                return "text-[#93C5FD]";
            case "Rain, Partially cloudy":
                return "text-[#93C5FD]";
            case "Rain, Overcast":
                return "text-[#93C5FD]";
            case "Storm":
                return "text-yellow-300";
            case "clear-night":
                return "text-gray-400";
            default:
                return "text-[#93C5FD]";
        }
    }

    const now = Math.floor(Date.now() / 1000);

    const next5Hours = cityData?.days
        .flatMap(day => day.hours)
        .filter(hour => hour.datetimeEpoch + 3600 >= now).slice(0, 6);

    const next5Days = cityData?.days.flatMap(day => day).slice(0, 5);




    return <div className=" w-screen min-h-screen flex flex-col gap-2 lg:gap-20 lg:flex-row items-center justify-center " >

        {
            loading && (
                <div className=" fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20 " >
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent"></div>
                </div>
            )
        }

        {/* left */}
        <div className=" w-full pb-2 lg:w-[55%] min-h-170 text-white flex flex-col gap-5 border-[0.5px] bg-[#0F1827] border-gray-600 rounded-4xl">
            <div className=" mt-5 w-[90%] mx-auto gap-5 flex flex-col justify-center items-center sm:gap-0 sm:flex-row  sm:justify-between " >
                <div className=" flex flex-col " >
                    <h1 className=" font-extrabold text-3xl " >WeatherWise</h1>
                    <p className=" text-center sm:pl-2.5 sm:text-start text-gray-300 " >Today: {cityData?.days[0].datetime ?? "--"}</p>
                </div>
                <div className="relative w-60 " >
                    <input className="relative bg-[#0B131E] outline-none px-5 py-2 border border-gray-500 focus:border-gray-200  rounded-full transition-all " placeholder="Search for cities..." value={input} type="text" onChange={(e) => {
                        setInput(e.target.value);
                    }} onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            setCity(input);
                        }
                    }} />
                    <button className=" absolute right-8 top-1.75 text-gray-500  hover:text-white cursor-pointer " onClick={() => setCity(input)} ><IoSearchOutline className=" text-2xl flex items-center " /></button>
                </div>
            </div>
            <div className=" mt-7 w-[90%] mx-auto flex items-center justify-between " >
                <div className=" flex flex-col gap-1 " >
                    <div className=" flex gap-2.5 " >
                        <p className=" text-4xl sm:text-5xl font-bold " >{(cityData?.resolvedAddress ?? "--")}
                        </p>
                        <p className=" text-lg text-gray-200 " >(Now)</p>
                    </div>
                    <p className=" text-7xl sm:text-8xl font-light ">{next5Hours?.[0].temp ?? "--"}&deg;C </p>
                    <p className=" text-gray-300 " >Feels like {next5Hours?.[0].feelslike ?? "--"}&deg;C - High {cityData?.days[0].feelslikemax ?? "--"}&deg;C / Low {cityData?.days[0].feelslikemin ?? "--"}&deg;C </p>

                </div>
                <div className=" mr-5 flex flex-col items-center " >
                    <p className={` text-[100px] sm:text-[150px] ${checkColor(next5Hours?.[0].icon)}`} >{check(next5Hours?.[0].icon)}</p>
                    {/* <p className=" text-gray-300 text-lg " >{cityData?.days[0].conditions}</p> */}
                </div>
            </div>
            <div className=" mt-4 flex flex-col gap-1 w-[90%] mx-auto  " >
                <p className=" font-bold text-2xl " >Hourly Forecast</p>
                <div className=" grid grid-cols-3 gap-1 sm:grid-cols-4 md:gap-0 md:grid-cols-6" >
                    {
                        next5Hours?.map((hour, id) => {
                            const isNow = hour.datetimeEpoch <= now && now < hour.datetimeEpoch + 3600;
                            return <Hourly key={id} time={isNow ? "Now" : hour.datetime}
                                icon={check(hour.icon)} temp={hour.temp}
                                iconcolor={checkColor(hour.icon)} />
                        })
                    }
                </div>
            </div>
            <div className=" mt-2 flex flex-col  gap-1 w-[90%] mx-auto" >
                <p className=" font-bold text-2xl " >Air Conditions</p>
                <div className=" grid grid-cols-2 gap-1 sm:grid-cols-3 md:gap-0  md:grid-cols-4 " >
                    <Air name="Wind" value={`${next5Hours?.[0].windspeed ?? "--"} Km/h`} icon={<GiWindsock />} />
                    <Air name="Humidity" value={`${next5Hours?.[0].humidity ?? "--"}%`} icon={<FaDroplet />} />
                    <Air name="Visibility" value={`${next5Hours?.[0].visibility ?? "--"} Km`} icon={<FaEye />} />
                    <Air name="Pressure" value={`${next5Hours?.[0].pressure ?? "--"} hPa`} icon={<FaTemperatureHigh />} />
                </div>
            </div>
        </div>


        {/* right */}
        <div className=" w-full pb-6 lg:pb-0 lg:w-[28%] flex flex-col gap-8.75 min-h-50 lg:min-h-150  border-[0.5px] bg-[#0F1827] border-gray-600 rounded-4xl">
            <div className=" w-[85%] mx-auto mt-6 flex items-center justify-center lg:justify-start "  >
                <p className=" text-2xl font-bold text-white  " >Next 5-Day Forecast</p>
            </div>

            <div className=" flex flex-col gap-5.5 items-center lg:items-start w-[85%] mx-auto " >
                {
                    next5Days?.map((day, id) => {
                        return <SevenDay key={id} isToday={id === 0} date={day.datetime} icon={check(day.icon)} weather={day.conditions} Maxtemp={day.tempmax} Mintemp={day.tempmin} color={checkColor(day.icon)} />
                    })
                }
            </div>

            <div className=" w-[85%] mx-auto border text-white border-gray-700 p-4 rounded-2xl bg-[#0E1622] flex flex-col gap-2.5 " >
                <p className=" text-lg font-bold  " >Sunrise & Sunset</p>
                <div className=" flex items-center justify-between  " >
                    <div className=" flex gap-1.5 items-center " >
                        <div className=" text-yellow-300 text-4xl " ><FaSun /></div>
                        <div className=" flex flex-col " >
                            <p className="text-gray-300" >Sunrise</p>
                            <p className=" text-xl font-bold " >{cityData?.days[0].sunrise.slice(0, 5) ?? "--"} AM</p>
                        </div>
                    </div>
                    <div className=" flex gap-1.5 items-center " >
                        <div className=" text-gray-500 text-4xl " ><FaMoon /></div>
                        <div className=" flex flex-col " >
                            <p className=" text-gray-300 " >Sunset</p>
                            <p className="text-xl font-bold" >{cityData?.days[0].sunset.slice(0, 5) ?? "--"} PM</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default Wheather;