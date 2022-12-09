exports.getBio = function(callback) {
  const rp = require('request-promise');
  const cheerio = require('cheerio');
  const url = 'https://biolinky.co/istdehuk';
  const captions = [];
  const links = [];
  const captionsDict = {};

  rp(url).then(function(html) {
    const $ = cheerio.load(html);
    let p = $('.page__links__linklist__item__text');

    p.each(function(i, p) {
      captionsDict[$(this).text()] = $('a')[i].attribs.href;
    });
  }).finally(() => {
    callback(captionsDict)
  })
};
