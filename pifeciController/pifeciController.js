const Result = require('../model/pifeci');
const controller = {};

controller.scoreDisplay = (req, res) => {
    console.log(`test`);
    Result.findAll().then((score) => res.json(score));
};

controller.cheat = (req, res) => {
    const cheatingStat = {
        win: parseInt(req.params.wins),
        loose: parseInt(req.params.loose),
        draw: parseInt(req.params.draw),
      };
    res.send(cheatingStat);
    res.json({ message: "C'est pas bien de tricher" });
};

controller.reset = (req, res) => {

    const resetStat = Result.findOne();

    resetStat.win = 0;
    resetStat.loose = 0;
    resetStat.draw = 0;

    resetStat.save();  

    res.json({ message: "Le score a été réinitialisé avec succès." });
    Result.findAll().then((score) => res.json(score));
};

randomChoice = () => {
    const choices = ['pierre', 'feuille', 'ciseaux'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

controller.play = (req, res) => {

    const playerChoice = req.params.choice;
    const serverChoice = randomChoice();

    let gameResult = Result.findOne();    

    if (!gameResult) {
        gameResult = Result.create({ win: 0, loose: 0, draw: 0 });
    }

    if (playerChoice === serverChoice) {
        res.json({ message: `le serveur à choisie : ${serverChoice}, vous avez choisie ${playerChoice}, il y a égalité` });
        gameResult.draw++;        
    } else if (
        (playerChoice === 'ciseaux' && serverChoice === 'feuille') ||
        (playerChoice === 'feuille' && serverChoice === 'pierre') ||
        (playerChoice === 'pierre' && serverChoice === 'ciseaux')
    ) {
        res.json({ message: `le serveur à choisie : ${serverChoice}, vous avez choisie ${playerChoice}, vous avez gagné !`});
        gameResult.win++;
    } else {
        res.json({ message: `le serveur à choisie : ${serverChoice}, vous avez choisie ${playerChoice}, le serveur à gagné`});
        gameResult.loose++;
    }

    Result.create(gameResult)
    .then((gameResult) => {
      res.send(gameResult);
    })
    .catch((err) => {
        res.send(err);
      });
    //gameResult.save();

};

module.exports = controller;
