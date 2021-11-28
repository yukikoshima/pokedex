const suteganaMap = [
  'ァ',
  'ィ',
  'ゥ',
  'ェ',
  'ォ',
  'ヵ',
  'ㇰ',
  'ヶ',
  'ㇱ',
  'ㇲ',
  'ッ',
  'ㇳ',
  'ㇴ',
  'ㇵ',
  'ㇶ',
  'ㇷ',
  'ㇷ゚',
  'ㇸ',
  'ㇹ',
  'ㇺ',
  'ャ',
  'ュ',
  'ョ',
  'ㇻ',
  'ㇼ',
  'ㇽ',
  'ㇾ',
  'ㇿ',
  'ヮ',
]

const kanaMap = [
  'ア',
  'イ',
  'ウ',
  'エ',
  'オ',
  'カ',
  'ク',
  'ケ',
  'シ',
  'ス',
  'ツ',
  'ト',
  'ヌ',
  'ハ',
  'ヒ',
  'フ',
  'プ',
  'ヘ',
  'ホ',
  'ム',
  'ヤ',
  'ユ',
  'ヨ',
  'ラ',
  'リ',
  'ル',
  'レ',
  'ロ',
  'ワ',
]

const isSutegana = (name: string): boolean => {
  const isKana = suteganaMap.some((kana) => name.endsWith(kana))
  return isKana
}

const getSuteganaMapIndex = (name: string): number => {
  return suteganaMap.findIndex((kana) => name.endsWith(kana))
}

const processingIfNeeded = (pokeName: string): string => {
  let processingName = ''
  // 末尾が長音の場合
  if (pokeName.endsWith('ー')) {
    processingName = pokeName.slice(0, -1)
    if (!isSutegana(processingName)) return processingName

    // 末尾が長音かつ末尾から2文字目が、すてがなの場合...例: カイリューとか
    const idx = getSuteganaMapIndex(processingName)
    return idx !== -1
      ? processingName.replace(suteganaMap[idx], kanaMap[idx])
      : processingName
  }
  // 末尾がすてがなの場合
  if (isSutegana(pokeName)) {
    const idx = getSuteganaMapIndex(pokeName)
    return idx !== -1
      ? pokeName.replace(suteganaMap[idx], kanaMap[idx])
      : pokeName
  }
  // ニドラン♂の場合
  if (pokeName.endsWith('♂')) {
    return pokeName.replace(/♂/g, 'オス')
  }
  // ニドラン♀の場合
  if (pokeName.endsWith('♀')) {
    return pokeName.replace(/♀/g, 'メス')
  }

  return pokeName
}

export default (_, inject) => {
  inject('processingIfNeeded', processingIfNeeded)
}
