const uniqueCities = (data) => {
    let cities = []
    data.forEach((item) => {
        if(!cities.includes(item?.address?.city)) {
            cities.push(item?.address?.city)
        }
    })
    return cities
} 

const percentage = (data,cities) => {
    let result = []
    cities.forEach((item) => {
        result.push({city: item,people: 0})
    })
    data.forEach((item) => {
        const ind = cities.indexOf(item?.address?.city)
        result[ind].people += 1
    })
    let peopleCount = parseInt(data.length)
    result = result.map((item) => {
        item.percentage = ((item.people / peopleCount) * 100).toFixed(0)
        return item
    })
    return result
}

module.exports =  {uniqueCities,percentage}