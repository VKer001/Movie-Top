// 使 node.js 可使用 let const
"use strict"

const request = require("request")
const fs = require("fs")
const cheerio = require("cheerio")

// 存储 电影名  排名  年代  国家  类型  评分
const Movie = function(){
    this.name = ''
    this.rank = 0
    this.year = 0
    this.country = ''
    this.type = ''
    this.score = 0
}

const movieFromDiv = function(div) {
    var movie = new Movie()
    var $ = cheerio.load(div)

    movie.name = $(".title").text()
    movie.rank = $('.pic').find('em').text()
    movie.score = $('.rating_num').text()

    var movieInformation = $(".info").find('p').text()
    var movieNbsp = movieInformation.replace(/\s+/g, "")
    var num = numberIndex(movieNbsp)
    var movieNewinfo = movieNbsp.slice(num)
    var movieInfo = movieNewinfo.split('/')

    movie.year = movieInfo[0]
    movie.country = movieInfo[1]
    movie.type = movieInfo[2].slice(0, 2)

    return movie
}

const saveMovies = function(movies) {
    var fs = require("fs")
    var path = 'douban.json'
    // 第二个参数是 null
    // 第三个参数是 缩进层次
    var s = JSON.stringify(movies, null, 2)
    fs.appendFile(path, s, function(error) {
        if (error !== null) {
            console.log('--- 写入文件错误', error)
        } else {
            console.log('--- 保存成功')
        }
    })
}

const moviesFromUrl = function(url) {
    request(url, function(error, response, body) {
        // 回调函数的三个参数分别是  错误, 响应, 响应数据
        if (error === null && response.statusCode == 200) {
            var $ = cheerio.load(body)
            var movies = []
            var movieDivs = $('.item')
            for (var i = 0; i < movieDivs.length; i++) {
                var div = $(movieDivs[i]).html()
                var m = movieFromDiv(div)
                movies.push(m)
            }
            saveMovies(movies)
        } else {
            console.log('---Error 请求失败', error);
        }
    })
}

const numberIndex = function(data) {
    var number = '1234567890'
    for (var i = 0; i < data.length; i++) {
        if (number.includes(data[i])) {
            return i
        }
    }
}

const changeData = function () {
    var fs = require('fs')
    // 异步读取
    fs.readFile('douban.json', function (err, data) {
        if (err) {
            return console.error(err);
        } else {
            var txtData = data.toString()
            var douban = txtData.split("][").join(',')
            fs.writeFile('douban.json', douban, function(error) {
                if (error !== null) {
                    console.log('--- 写入文件错误', error)
                } else {
                    console.log('--- 修改成功')
                }
            })
        }
    })
}

const _main = function () {
    for (var i = 0; i < 10; i++) {
        var l = i * 25
        var url = 'https://movie.douban.com/top250?start=' + l +'&filter='
        moviesFromUrl(url)
    }
    setTimeout(changeData, 2000, "开始转换")
}

_main()
