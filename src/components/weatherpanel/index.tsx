import { PureComponent } from 'react'
import { useNavigate } from 'react-router-dom'
import { renderIcon } from '@/utils'
import { WeatherInfo } from '@/services/weather'
import styles from './index.module.less'
import { dayName } from '@/constants'

export interface WeatherPanelInfo extends WeatherInfo {
  /** 地理位置名称信息 */
  name: string;
  /** 经度 */
  longitude?: number;
  /** 纬度 */
  latitude?: number;
}

interface WeatherPanelProps {
  data: WeatherPanelInfo;
}

export default function WeatherPanel (props: WeatherPanelProps) {
  const navigate = useNavigate()

  function renderTime () {
    const date = new Date()
    const hours = date.getHours()
    return `${ dayName[date.getDay()] }, ${ hours > 12 ? hours - 12 : hours }${ hours > 12 ? 'pm' : 'am' }`
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
