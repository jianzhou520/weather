import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { WeatherInfo } from '@/components/weatherpanel'
import { queryHourlyWeather, queryWeeklyWeather } from '@/services/weather'
import { renderIcon } from '@/utils'
import './index.less'

export default function Detail () {
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo>({
    name: '--',
    icon: '',
    temp: '--',
    obsTime: '--',
    text: '--',
    windDir: '--',
    windScale: '--',
    windSpeed: '--',
    precip: '--',
    humidity: '--',
  })
  const location = decodeURIComponent(useParams().location!)

  function handleWeatherInfoInit () {
    try {
      setWeatherInfo(JSON.parse(window.localStorage.getItem('weatherInfo') || '{}'))
    } catch (error) {
      console.log('weather info init error')
    }
  }

  /**
   * @desription 获取小时制天气
   */
  async function handleHourlyWeatherInit () {
    await queryHourlyWeather(location)
  }

  /**
   * @description 获取一周天气
   */
  async function handleWeeklyWeatherInit () {
    await queryWeeklyWeather(location)
  }

  useEffect(() => {
    handleWeatherInfoInit()
    // handleHourlyWeatherInit()
    // handleWeeklyWeatherInit()
  }, [])

  const {
    name,
    temp,
    icon,
    precip,
    humidity,
    windSpeed,
  } = weatherInfo
  return (
    <div className="view__detail">
      <header className="header">
        <div className="weather-base">
          <section className="naming">
            <p className="name">{ name.split(',').join('\n') }</p>
            <p className="value">{ temp }</p>
          </section>
          <img className="icon" src={ renderIcon(icon) } />
        </div>
        <p className="weather-tags">
          <span className="tag-item">{ precip }mm</span>
          <span className="tag-item">{ humidity }%</span>
          <span className="tag-item">{ windSpeed }km/h</span>
        </p>
      </header>
      <section></section>
    </div>
  )
}
