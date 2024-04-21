const Result = require('../model/pifeci');
const controller = {};

controller.scoreDisplay = (req, res) => {
    Result.findAll().then((score) => res.json(score));
};

controller.cheat = async (req, res) => {
    const cheatingStat = await Result.findOne();
    cheatingStat.win = parseInt(req.params.wins);
    cheatingStat.loose = parseInt(req.params.loose)
    cheatingStat.draw = parseInt(req.params.draw)
    
    await cheatingStat.save();  
    res.json({ message: "C'est pas bien de tricher" });
};

controller.reset = async (req, res) => {

    const resetStat = await Result.findOne();

    resetStat.win = 0;
    resetStat.loose = 0;
    resetStat.draw = 0;

    await resetStat.save();  

    res.json({ message: "Le score a été réinitialisé avec succès." });
};

randomChoice = () => {
    const choices = ['pierre', 'feuille', 'ciseaux'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

controller.play = async (req, res) => {

    const playerChoice = req.params.choice;
    const serverChoice = randomChoice();

    let gameResult = await Result.findOne();    

    if (!gameResult) {
        gameResult = await Result.create({ win: 0, loose: 0, draw: 0 });
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

    await gameResult.save(); 

};

module.exports = controller;
