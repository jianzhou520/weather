/**
 * @description 根据天气图标icon值返回具体图标
 */
export function renderIcon (iconCode: string, day?: boolean) {
  const date = new Date()
  const isNight = !day && date.getHours() > 19
  if (!iconCode) {
    return ''
  }
  switch (iconCode) {
    /** 晴天 */
    case '100':
    case '150':
    case '800':
    case '801':
    case '802':
    case '803':
    case '804':
    case '805':
    case '806':
    case '807':
      return `/src/icon/${ isNight ? 'night' : 'day' }_sun.png`
    /** 雨天 */
    case '300':
    case '301':
    case '305':
    case '306':
    case '307':
    case '308':
    case '309':
    case '310':
    case '311':
    case '312':
    case '313':
    case '314':
    case '315':
    case '316':
    case '317':
    case '318':
    case '350':
    case '351':
    case '399':
      return `/src/icon/${ isNight ? 'night' : 'day' }_rain.png`
    /** 多云 */
    case '101':
    case '102':
    case '103':
    case '104':
    case '151':
    case '152':
    case '153':
    case '154':
    case '500':
    case '501':
    case '502':
    case '503':
    case '504':
    case '509':
    case '510':
    case '511':
    case '512':
    case '513':
    case '514':
    case '515':
      return `/src/icon/${ isNight ? 'night' : 'day' }_clouds.png`
    /** 大风 */
    case '507':
    case '508':
      return `/src/icon/${ isNight ? 'night' : 'day' }_wind.png`
    /** 下雪 */
    case '400':
    case '401':
    case '402':
    case '403':
    case '404':
    case '405':
    case '406':
    case '407':
    case '408':
    case '409':
    case '410':
    case '456':
    case '457':
    case '499':
      return `/src/icon/${ isNight ? 'night' : 'day' }_snow.png`
    /** 打雷 */
    case '302':
    case '303':
    case '304':
      return `/src/icon/${ isNight ? 'night' : 'day' }_storm.png`
    default: return `/src/icon/${ isNight ? 'night' : 'day' }_sun.png`
  }
}
