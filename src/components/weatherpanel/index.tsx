import { PureComponent } from 'react'
import { useNavigate } from 'react-router-dom'
import { renderIcon } from '@/utils'
import styles from './index.module.less'

export interface WeatherInfo {
  /** 地理位置名称信息 */
  name: string;
  /** 天气状况和图标的代码 */
  icon: string;
  /** 温度，默认单位：摄氏度 */
  temp: string;
  /** 数据观测时间 */
  obsTime: string;
  /** 天气状况的文字描述，包括阴晴雨雪等天气状态的描述 */
  text: string;
  /** 风向 */
  windDir: string;
  /** 风力等级 */
  windScale: string;
  /** 风速，公里/小时 */
  windSpeed: string;
  /** 当前小时累计降水量，默认单位：毫米 */
  precip: string;
  /** 相对湿度，百分比数值 */
  humidity: string;
  /** 经度 */
  longitude?: number;
  /** 纬度 */
  latitude?: number;
}

interface WeatherPanelProps {
  data: WeatherInfo;
}

export default function WeatherPanel (props: WeatherPanelProps) {
  const navigate = useNavigate()

  function renderTime () {
    const date = new Date()
    const hours = date.getHours()
    const dayName = [
      '周一',
      '周二',
      '周三',
      '周四',
      '周五',
      '周六',
      '周日',
    ]
    return `${ dayName[date.getDay() - 1] }, ${ hours > 12 ? hours - 12 : hours }${ hours > 12 ? 'pm' : 'am' }`
  }

  function handleDetailView (longitude: number, latitude: number) {
    navigate(`/detail/${ encodeURIComponent(`${ longitude },${ latitude }`) }`)
  }

  const {
    name,
    icon,
    temp,
    text,
    windDir,
    windScale,
    precip,
    humidity,
    windSpeed,
    longitude,
    latitude,
  } = props.data
  return (
    <div className={ styles.component }>
      {
        icon
          ? <img className={ styles.icon } src={ renderIcon(icon) } />
          : null
      }
      <p className={ styles.name }>{ name }</p>
      <section className={ styles.weather }>
        <div className={ styles['weather-temp'] }>
          <p className={ styles['temp-value'] }>{ temp }</p>
          <p className={ styles['temp-time'] }>{ renderTime() }</p>
        </div>
        <div className={ styles['weather-info'] }>
          <p className={ styles['weather-tag-wrapper'] }>
            <span className={ styles['weather-tag'] }>{ windDir }{ windScale }级</span>
          </p>
          <p className={ styles['weather-tag-wrapper'] }>
            <span className={ styles['weather-tag'] } style={{ background: 'rgba(106, 117, 186, 0.5)' }}>{ text }</span>
          </p>
        </div>
      </section>
      <button disabled={ !latitude || !longitude }
        className={ styles.btn } onClick={ handleDetailView.bind(null, longitude!, latitude!) }
      >详情</button>
      <aside className={ styles.addition }>
        <dl className={ styles['addition-item'] }>
          <dt className={ styles['addition-label'] }>降水量</dt>
          <dd className={ styles['addition-value'] }>{ precip }mm</dd>
        </dl>
        <dl className={ styles['addition-item'] }>
          <dt className={ styles['addition-label'] }>湿度</dt>
          <dd className={ styles['addition-value'] }>{ humidity }%</dd>
        </dl>
        <dl className={ styles['addition-item'] }>
          <dt className={ styles['addition-label'] }>风速</dt>
          <dd className={ styles['addition-value'] }>{ windSpeed }km/h</dd>
        </dl>
      </aside>
    </div>
  )
}
