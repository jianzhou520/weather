import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Canvas,
  Chart,
  Area,
  Axis,
  Line,
  Point,
  TextGuide,
} from '@antv/f2'
import { WeatherPanelInfo } from '@/components/weatherpanel'
import {
  queryHourlyWeather,
  queryWeeklyWeather,
  WeatherDaily,
  WeatherHourly,
} from '@/services/weather'
import { renderIcon } from '@/utils'
import './index.less'
import { dayName } from '@/constants'

export default function Detail () {
  const [weatherInfo, setWeatherInfo] = useState<WeatherPanelInfo>({
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
  const [hourlyWeather, setHourlyWeather] = useState<WeatherHourly[]>([])
  const [dailyWeather, setDailyWeather] = useState<WeatherDaily[]>([])
  const location = decodeURIComponent(useParams().location!)
  const navigate = useNavigate()

  function handleWeatherInfoInit () {
    try {
      setWeatherInfo(JSON.parse(window.localStorage.getItem('weatherInfo') || '{}'))
    } catch (error) {
      console.log('weather info init error')
    }
  }

  function handleNavBack () {
    navigate(-1)
  }

  /**
   * @desription 获取小时制天气
   */
  async function handleHourlyWeatherInit () {
    let hourly: WeatherHourly[] = []
    try {
      const res = await queryHourlyWeather(location)
      hourly = res.hourly
      window.localStorage.setItem('weatherHourly', JSON.stringify(hourly))
    } catch (error) {
      console.log('data from netwook error')
    }
    if (!hourly.length) {
      try {
        hourly = JSON.parse(window.localStorage.getItem('weatherHourly') || '[]')
      } catch (error) {
        console.log('data from storage error')
      }
    }
    setHourlyWeather(hourly)
  }

  /**
   * @description 获取一周天气
   */
  async function handleWeeklyWeatherInit () {
    let weatherDaily: WeatherDaily[] = []
    try {
      const { daily = [] } = await queryWeeklyWeather(location)
      weatherDaily = daily.map((item) => ({
        ...item,
        dayName: dayName[new Date(item.fxDate).getDay()],
        iconUrl: renderIcon(item.iconDay, true),
      }))
      window.localStorage.setItem('weatherDaily', JSON.stringify(weatherDaily))
    } catch (error) {
      console.log('data from network error')
    }
    if (!weatherDaily.length) {
      try {
        weatherDaily = JSON.parse(window.localStorage.getItem('weatherDaily') || '[]')
      } catch (error) {
        console.log('data from storage error')
      }
    }
    setDailyWeather(weatherDaily)
  }

  useEffect(() => {
    handleWeatherInfoInit()
    handleHourlyWeatherInit()
    handleWeeklyWeatherInit()
  }, [])

  useEffect(() => {
    if (hourlyWeather.length) {
      const tempList = hourlyWeather.map((item) => +item.temp)
      const hourlyScale = {
        fxTime: {
          type: 'timeCat',
          tickCount: 24,
          nice: false,
          formatter: (fxTime: number) => {
            const hours = new Date(fxTime).getHours()
            return `${ hours > 12 ? hours - 12 : hours }${ hours > 12 ? 'pm' : 'am' }`
          },
        },
        temp: {
          type: 'linear',
          timkCount: 1,
          min: Math.min(0, Math.floor(Math.min(...tempList)) - 1),
          alias: '温度',
        },
      }
      const context = (document.querySelector('#container') as HTMLCanvasElement).getContext('2d') || undefined
      const HourlyChart = (
        <Canvas context={ context }>
          <Chart data={ hourlyWeather } scale={ hourlyScale }>
            <Axis field="fxTime" style={{ grid: { opacity: 0 }, label: { fontFamily: 'Alegreya Sans', fontWeight: 'bold', fontSize: 14 * window.devicePixelRatio } }} />
            <Axis field="temp" visible={ false } />
            <Line x="fxTime" y="temp" shape="smooth" color="#E9C939" />
            <Area x="fxTime" y="temp" color="rgba(233, 201, 57, 0.25)" />
            <Point x="fxTime" y="temp" color="#E9C939" />
            {
              hourlyWeather.map((item) => (
                <TextGuide
                  records={ [item] }
                  key={ item.fxTime }
                  content={ `${ item.temp }℃` }
                  offsetX={ -12 }
                  offsetY={ -12 }
                />
              ))
            }
          </Chart>
        </Canvas>
      )
      const renderChart = new Canvas(HourlyChart.props)
      renderChart.render()
    }
  }, [hourlyWeather])

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
        <i className="back" onClick={ handleNavBack } />
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
      <section className="weather-hourly">
        <p className="title">Today</p>
        <div className="container-wrapper">
          <canvas id="container"
            style={{
              width: '400vw',
              height: '100%',
            }}
          />
        </div>
      </section>
      <ul className="weather-daily">
        <li className="title">This Week</li>
        {
          dailyWeather.map((item) => (
            <li key={ item.fxDate } className="item">
              <p className="name">{ item.dayName }</p>
              <img className="icon" src={ item.iconUrl } />
              <p className="temp">
                <span className="max value">{ item.tempMax }</span>
                <span className="min value">{ item.tempMin }</span>
              </p>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
