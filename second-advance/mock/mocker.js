module.exports = {
  'GET /api/info': {name: 'you you you'},
  'POST /login': (req, res) => {
    return res.send({
      status: 'ok',
      code: 0,
      data: {id: 1, sex: '1'}
    })
  }
}