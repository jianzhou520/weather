import axios from 'axios'
import md5 from 'blueimp-md5'

/**
 * @description 天气SDK请求签名生成
*/
export function getSignature (url: string) {
  const fullUrl = `${ url.trim() }&t=${ Math.floor(Date.now() / 1000) }&publicid=HE2204141315331436`
  const keys: string[] = []
  const [baseUrl, search] = fullUrl.split('?')
  const parameterObject: {
    [key: string]: string;
  } = {}
  new URLSearchParams(search).forEach((value, key) => {
    parameterObject[key] = value
  })

  Object.keys(parameterObject).forEach((k) => {
    if (k !== 'key' && k !== 'sign' && !/^\s+$/.test(k) && !/^\s+$/.test(parameterObject[k])) {
      keys.push(k)
    }
  })

  keys.sort()

  let str = ''
  Object.values(keys).forEach((k) => {
    if (!/\s+/.test(parameterObject[k])) {
      str += `${ k }=${ parameterObject[k] }&`
    }
  })
  str = `${ str.substring(0, str.length - 1) }a3017c1793454ea1a2bf215f1fe3a547`
  return `${ fullUrl }&sign=${ md5(str) }`
}

/**
 * @description 地理位置信息查询，支持经纬度/地点名称查询
 */
export async function queryLocationInfo (
  /** 经度 */
  longitude?: number,
  /** 纬度 */
  latitude?: number,
  /** 地理位置名称 */
  name?: string,
): Promise<{
  location: {
    /** 地区/城市名称 */
    name: string;
    id: string;
    lat: string;
    lon: string;
    /** 地区/城市所属一级行政区域 */
    adm1: string;
    /** 地区/城市的上级行政区划名称 */
    adm2: string;
    country: string;
    tz: string;
    utcOffset: string;
    isDst: string;
    type: string;
    rank: string;
    fxLink: string;
  }[];
}> {
  return axios.get(
    getSignature(`
      https://geoapi.qweather.com/v2/city/lookup?location=${ name || `${ longitude },${ latitude }` }
    `),
  )
}

export interface WeatherInfo {
  /** 数据观测时间 */
  obsTime: string;
  /** 温度，默认单位：摄氏度 */
  temp: string;
  /** 体感温度，默认单位：摄氏度 */
  feelsLike?: string;
  /** 天气状况和图标的代码 */
  icon: string;
  /** 天气状况的文字描述，包括阴晴雨雪等天气状态的描述 */
  text: string;
  /** 风向360角度 */
  wind360?: string;
  /** 风向 */
  windDir: string;
  /** 风力等级 */
  windScale: string;
  /** 风速，公里/小时 */
  windSpeed: string;
  /** 相对湿度，百分比数值 */
  humidity: string;
  /** 当前小时累计降水量，默认单位：毫米 */
  precip: string;
  /** 大气压强，默认单位：百帕 */
  pressure?: string;
  /** 能见度，默认单位：公里 */
  vis?: string;
  /** 云量，百分比数值。可能为空 */
  cloud?: string;
  /** 露点温度。可能为空 */
  dew?: string;
}

/**
 * @descripiton 查询地理位置实时天气
 * @param { number } longitude 经度
 * @param { number } latitude 纬度
 */
export async function queryLocationWeather (
  longitude: number,
  latitude: number,
): Promise<{
  /** 当前数据的响应式页面，便于嵌入网站或应用 */
  fxLink: string;
  now: WeatherInfo;
}> {
  return axios.get(
    getSignature(`
      https://devapi.qweather.com/v7/weather/now?location=${ longitude },${ latitude }
    `),
  )
}

export interface WeatherHourly extends WeatherInfo {
  /** 预报时间 */
  fxTime: string;
  /** 逐小时预报降水概率，百分比数值 */
  pop?: string;
}

/**
 * @description 查询24小时小时级别天气信息
 * @param { string } location 经度,纬度组合
 */
export async function queryHourlyWeather (
  location: string,
): Promise<{
  hourly: WeatherHourly[];
}> {
  return axios.get(
    getSignature(`
      https://devapi.qweather.com/v7/weather/24h?location=${ location }
    `),
  )
}

export interface WeatherDaily {
  /** 预报日期 */
  fxDate: string;
  /** 周几显示 */
  dayName?: string;
  /** 日出时间 */
  sunrise: string;
  /** 日落时间 */
  sunset: string;
  /** 月升时间 */
  moonrise: string;
  /** 月落时间 */
  moonset: string;
  /** 月相名称 */
  moonPhase: string;
  /** 月相图标代码 */
  moonPhaseIcon: string;
  /** 预报当天最高温度 */
  tempMax: string;
  /** 预报当天最低温度 */
  tempMin: string;
  /** 预报白天天气状况的图标代码 */
  iconDay: string;
  /** 天气图标对应到系统的图标URL */
  iconUrl: string;
  /** 预报白天天气状况文字描述 */
  textDay: string;
  /** 预报夜间天气状况的图标代码 */
  iconNight: string;
  /** 预报晚间天气状况文字描述 */
  textNight: string;
  /** 预报白天风向360角度 */
  wind360Day: string;
  /** 预报白天风向 */
  windDirDay: string;
  /** 预报白天风力等级 */
  windScaleDay: string;
  /** 预报白天风速，公里/小时 */
  windSpeedDay: string;
  /** 预报夜间风向360角度 */
  wind360Night: string;
  /** 预报夜间当天风向 */
  windDirNight: string;
  /** 预报夜间风力等级 */
  windScaleNight: string;
  /** 预报夜间风速，公里/小时 */
  windSpeedNight: string;
  /** 相对湿度，百分比数值 */
  humidity: string;
  /** 预报当天总降水量，默认单位：毫米 */
  precip: string;
  /** 大气压强，默认单位：百帕 */
  pressure: string;
  /** 能见度，默认单位：公里 */
  vis: string;
  /** 云量，百分比数值 */
  cloud?: string;
  /** 紫外线强度指数 */
  uvIndex: string;
}

/**
 * @description 查询近7天天气预报
 * @param { string } location 经度,纬度组合
 */
export async function queryWeeklyWeather (
  location: string,
): Promise<{
  daily: WeatherDaily[];
}> {
  return axios.get(
    getSignature(`
      https://devapi.qweather.com/v7/weather/7d?location=${ location }
    `),
  )
}
