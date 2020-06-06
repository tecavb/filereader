var express = require('express');
var router = express.Router();
var fs = require('fs')
var { readFile, writeFile } = require('../util/promiseFs')

router.post('/main', function (req, res, next) {
  let { data: obj, type, id } = req.body;
  let array = [];
  Object.keys(obj).forEach(item => {
    array.push(item)
  })
  let buffer = new ArrayBuffer(array.length)
  let Int8 = new Int8Array(buffer)
  array.forEach((item, index) => {
    Int8[index] = obj[item];
  });
  readFile('./json/order.json').then(data => {
    let Data = JSON.parse(data);
    let ta = new Set(Data)
    ta.add(id)
    writeFile('./json/order.json', JSON.stringify([...ta])).then(() => {
      fs.writeFile('../html/images/' + type + '/' + id + '.png', Int8, (err) => {
      })
    })
  })
  res.send({ code: 0 })
});
router.get('/id', function (req, res, next) {
  let id = req.query.id.toLocaleUpperCase();
  let it = null;
  if (id.length < 4) { it = '0' } else {
    readFile('./json/order.json').then(data => {
      let Data = JSON.parse(data);
      Data.forEach(item => {
        item.includes(id) ? it = item : it = id;
      })
      res.send(it)
    })
  }
})
module.exports = router;
