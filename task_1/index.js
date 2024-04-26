import {encoded, translations} from './data.js'

function makeDecode(encoded, translations) {
    const noEntryKeys = ['groupId', 'service', 'formatSize', 'ca']
    const unique = []
    const decoded = encoded.map((item, i) => {
        const keys = Object.keys(item).filter((key) => !noEntryKeys.includes(key))
        const translationsMap = new Map(Object.entries(translations))
        keys.forEach((key) => {
            const translation = translationsMap.get(item[key])
            if (translation || translation === '') {
                item[key] = translation
            } else {
                unique.push(item[key])
            }
        })
        return item
    })
    console.log(decoded)
    const uniqueSet = new Set(unique)

// Если учитывать null как уникальное, то закоментировать
    uniqueSet.delete(null)
    console.log(`Уникальные id: ${Array.from(uniqueSet)}`)
    return decoded
}

makeDecode(encoded, translations)
