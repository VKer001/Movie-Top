var moviesYear = {
    year70 : 0,
    year80 : 0,
    year90 : 0,
    year00 : 0,
    year10 : 0,
}

var moviesType = {
    typejuqing : 0,
    typefanzui : 0,
    typedonghua : 0,
    typeaiqing : 0,
    typexiju : 0,
    typedongzuo : 0,
    typeqita : 0,
}

var moviesCountry = {
    HongKong : 0,
    China : 0,
    Korea : 0,
    America : 0,
    Germany : 0,
    England : 0,
    India : 0,
    Japan : 0,
    France : 0,
    otherCountry : 0,
}

// 年代数据分析
var yearAnalysis = function() {
    for (var i = 0; i < movieJson.length; i++) {
        var movieYear = parseInt(movieJson[i].year)
        if (2009 < movieYear && movieYear < 2020) {
            moviesYear.year10 += 1
        }
        if (1999 < movieYear && movieYear < 2010) {
            moviesYear.year00 += 1
        }
        if (1989 < movieYear && movieYear < 2000) {
            moviesYear.year90 += 1
        }
        if (1979 < movieYear && movieYear < 1990) {
            moviesYear.year80 += 1
        }
        if (movieYear < 1980) {
            moviesYear.year70 += 1
        }
    }
}

// 类型数据分析
var typeAnalysis = function() {
    for (var i = 0; i < movieJson.length; i++) {
        var movieType = movieJson[i].type
        if (movieType == '剧情') {
            moviesType.typejuqing += 1
        } else if (movieType == '犯罪') {
            moviesType.typefanzui += 1
        } else if (movieType == '动画') {
            moviesType.typedonghua += 1
        } else if (movieType == '喜剧') {
            moviesType.typexiju += 1
        } else if (movieType == '爱情') {
            moviesType.typeaiqing += 1
        } else if (movieType == '动作') {
            moviesType.typedongzuo += 1
        } else {
            moviesType.typeqita += 1
        }
    }
}

// 国家数据分析
var countryAnalysis = function() {
    for (var i = 0; i < movieJson.length; i++) {
        var movieCountry = movieJson[i].country
        if (movieCountry.includes('香港')) {
            moviesCountry.HongKong += 1
        } else if (movieCountry.includes('中国大陆')) {
            moviesCountry.China += 1
        } else if (movieCountry.includes('韩国')) {
            moviesCountry.Korea += 1
        } else if (movieCountry.includes('美国')) {
            moviesCountry.America += 1
        } else if (movieCountry.includes('德国')) {
            moviesCountry.Germany += 1
        } else if (movieCountry.includes('英国')) {
            moviesCountry.England += 1
        } else if (movieCountry.includes('印度')) {
            moviesCountry.India += 1
        } else if (movieCountry.includes('日本')) {
            moviesCountry.Japan += 1
        } else if (movieCountry.includes('法国')) {
            moviesCountry.France += 1
        } else {
            moviesCountry.otherCountry += 1
        }
    }
}

// 排名数据分析
var rankAnalysis = function() {
    var topName = []
    for (var i = 0; i < movieJson.length; i++) {
        var rankCountry = movieJson[i].rank
        if (rankCountry < 11) {
            var m = [movieJson[i]]
            topName.push(m)
        }
    }
    return topName
}

var _main = function () {
    yearAnalysis()
    typeAnalysis()
    countryAnalysis()
    rankAnalysis()
}

_main()
