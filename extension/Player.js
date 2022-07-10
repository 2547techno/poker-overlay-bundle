class Player {
    constructor(name, id, cg) {
        this.cg = cg;
        this.name = name;
        this.id = id;
        this.hand = cg.Replicant(`${id}-hand`, {
            defaultValue: {
                card1: null,
                card2: null
            },
            persistent: false
        });
        this.hand.on("change", (newVal, oldVal) => {
            cg.log.info(`${id}-hand: old: ${oldVal} | new: ${newVal}`);
        })
        this.chips = cg.Replicant(`${id}-chips`, {
            defaultValue: {
                total: 2500,
                bet: 0
            },
            persistent: false
        })
        this.chips.on("change", (newVal, oldVal) => {
            cg.log.info(`${id}-chips: old: ${oldVal} | new: ${newVal}`);
        })
    }

    setHand(card1, card2) {
        this.hand.value = {
            card1,
            card2
        }
    }

    clearHand() {
        this.hand.value = {
            card1: null,
            card2: null
        }
    }

    setBalance(num) {
        this.balance.value = num;
    }
}

module.exports = Player;