const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

const ageMiddleware = (req, res, next) => {
  if (req.query.age === '') {
    return res.redirect('/')
  } else {
    return next()
  }
}

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

app.get('/', (req, res) => {
  return res.render('age')
})

app.post('/check', (req, res) => {
  if (req.body.age >= 18) {
    return res.redirect(`/major?age=${req.body.age}`)
  } else {
    return res.redirect(`/minor?age=${req.body.age}`)
  }
})

app.get('/major', ageMiddleware, (req, res) => {
  return res.render('major', { age: req.query.age })
})

app.get('/minor', ageMiddleware, (req, res) => {
  return res.render('minor', { age: req.query.age })
})

app.listen('3000')
