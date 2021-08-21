var request = require('request');

//.add(-30).days();



var dateAfter = () => {
    var date = new Date();
    date.setDate(date.getDate() - 30);
    return date.toISOString().split('T')[0];      
}

const  mapping = async (dist) => {
    let hashmap = new Map();

    let arr = [];

    dist.items.forEach(ele => {
        if (!hashmap.has(ele.language)) {
            hashmap.set(ele.language, [ele])
        }else {
         hashmap.get(ele.language).push(ele)

        }

    });

    hashmap.forEach((value, key, map) => {
        arr.push({number_of_repos: value.length, list_of_repos: value})
    });

    return arr;
}

const apiURL = `https://api.github.com/search/repositories?q=created:>${dateAfter()}&sort=stars&order=desc&per_page=100`

var repositories = {

    get: function(req, res, next) {
        
        request({
            uri: apiURL,
            headers: {
                'User-Agent': 'gemography-task'
            },

             }, (error, response, body) => {

            if (!error && response.statusCode == 200) {

                response = JSON.parse(body);

             mapping(response).then((data) => {
                next(null,data)
            });
                
            }else {
                next({error: response.body, status_code: response.statusCode}, null);
            }
        });
    }
}

module.exports = repositories;