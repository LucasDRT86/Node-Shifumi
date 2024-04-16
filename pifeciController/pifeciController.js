const Result = require('../model/pifeci.js');

const scoreDisplay = (req, res) => {
    Result.findAll()
    res.send()
};

const cheat = (req, res) => {
    const cheatingStat = {
        win: req.params.wins,
        loose: req.params.loose,
        draw: req.params.draw,
      };
};

const update = (req, res) => {};

const play = (req, res) => {};

module.exports = { play, update, cheat, scoreDisplay };
