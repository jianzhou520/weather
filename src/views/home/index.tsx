import { useEffect, useState } from 'react'
import { queryLocationInfo, queryLocationWeather } from '@/services/weather'
import WeatherPanel, { WeatherPanelInfo } from '@/components/weatherpanel/index'
import './index.less'

export default function Home () {
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

  function handleWeatherInfoInit () {
    try {
      setWeatherInfo(JSON.parse(window.localStorage.getItem('weatherInfo') || '{}'))
    } catch (error) {
      console.log('weather info init error')
    }
  }

  /**
   * @description 更新当前位置信息
   * @param { number } longitude 经度
   * @param { number } latitude 维度
  */
  async function handlePositionInfoUpdate (longitude: number, latitude: number) {
    const { location = [] } = await queryLocationInfo(longitude, latitude)
    if (location.length) {
      const { adm1, adm2, name } = location[0]
      setWeatherInfo({
        ...weatherInfo,
        name: `${ name }, ${ adm1 }`,
      })
    }
  }

  /**
   * @description 获取当前地理位置
   * @param { number } longitude 经度
   * @param { number } latitude 纬度
  */
  async function handlePositionWeatherUpdate (longitude: number, latitude: number) {
    const {
      now: {
        temp,
        obsTime,
        text,
        icon,
        windDir,
        windScale,
        windSpeed,
        precip,
        humidity,
      },
    } = await queryLocationWeather(longitude, latitude)
    const info = {
      ...weatherInfo,
      temp,
      obsTime,
      text,
      icon,
      windDir,
      windScale,
      windSpeed,
      precip,
      humidity,
      longitude,
      latitude,
    }
    setWeatherInfo(info)
    window.localStorage.setItem('weatherInfo', JSON.stringify(info))
  }

  useEffect(() => {
    handleWeatherInfoInit()
    // 获取地理位置信息
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const {
        longitude,
        latitude,
      } = (pos && pos.coords) || {}
      if (longitude && latitude) {
        if (weatherInfo.name === '--') {
          handlePositionInfoUpdate(longitude, latitude)
        } else {
          handlePositionWeatherUpdate(longitude, latitude)
        }
      }
    }, (err) => {
      console.error(err)
      const info = window.localStorage.getItem('weatherInfo')
      if (weatherInfo.name === '--' && info) {
        try {
          setWeatherInfo(JSON.parse(info))
        } catch (error) {
          console.log(error)
          window.alert(`获取位置信息失败：${ err.message }`)
        }
      } else {
        window.alert(`获取位置信息失败：${ err.message }`)
      }
    }, { maximumAge: 60000 })
  }, [weatherInfo.name])

  return (
    <div className="view__home">
      <header className="header"></header>
      <main className="main">
        <WeatherPanel data={ weatherInfo } />
      </main>
    </div>
  )
}
