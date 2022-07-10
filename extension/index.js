'use strict';

const Card = require("./Cards");
const Player = require("./Player");

module.exports = function (nodecg) {
    const potRep = nodecg.Replicant("pot", {defaultValue: 0, persistent: false});
    const smallBlindRep = nodecg.Replicant("small-blind", {defaultValue: 0, persistent: false});
    const bigBlindRep = nodecg.Replicant("big-blind", {defaultValue: 0, persistent: false});
    let pot = 0;
    let chips = {};
    let players = []

    for(let key of Object.keys(nodecg.bundleConfig.players)) {
        players.push(new Player(nodecg.bundleConfig.players[key], key, nodecg))
        chips[key] = {};
        chips[key].bet = 0;
    }

    for(let player of players) {
        player.chips.on("change", (n, o) => {
            chips[player.id] = n;
            console.log(chips)
            
            let total = 0;
            for(let player of Object.keys(chips)) {
                total += chips[player].bet;
            }
            potRep.value = total;
        })
    }

    potRep.on("change", (n, o) => {
        pot = n
        nodecg.log.info(`pot: old: ${o} | new: ${n}`);
    })
    
    smallBlindRep.on("change", (n, o) => {
        nodecg.log.info(`small-blind: old: ${o} | new: ${n}`);
    })

    bigBlindRep.on("change", (n, o) => {
        nodecg.log.info(`big-blind: old: ${o} | new: ${n}`);
    })

    nodecg.listenFor("distribute", (value, ack) => {
        let updatedState = []
        for(let i = 0; i < players.length; i++) {
            let player = players[i];
            let total = chips[player.id].total - chips[player.id].bet
            if (value == player.id) {
                total += pot
            }

            updatedState[i] = {
                bet: 0,
                total: total
            }
            player.hand.value = {
                card1: null,
                card2: null
            }

        }

        for(let i = 0; i < players.length; i++) {
            players[i].chips.value = updatedState[i];
        }

        nodecg.sendMessage("clearInput", null);

        ack(null, value);
    })

    nodecg.listenFor("distribute-override", (data, ack) => {
        let updatedState = {}
        for (let player of players) {
            if (data[player.id] == null) continue

            updatedState[player.id] = {
                bet: 0,
                total: chips[player.id].total - chips[player.id].bet + data[player.id]
            }
        }

        for (let player of players) {
            if (updatedState[player.id] == null) continue

            player.chips.value = updatedState[player.id]
        }

        nodecg.sendMessage("clearInput", null);

        ack(null, data);
    })
};
