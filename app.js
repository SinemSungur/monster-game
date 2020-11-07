new Vue({
  el: "#app",
  data: {
    playerHeal: 100,
    monsterHeal: 100,
    gameIsOn: false,
    logs: [],
  },
  methods: {
    startGame: function () {
      this.gameIsOn = true;
    },
    attack: function () {
      var point = Math.floor(Math.random() * 10);
      this.monsterHeal -= point;
      this.monsterAttack();
      this.addToLog({
        turn: "player",
        text: "player kicked (" + point + ")",
      });
    },
    monsterAttack: function () {
      var point = Math.floor(Math.random() * 10);
      this.playerHeal -= point;
      this.addToLog({
        turn: "monster",
        text: "monster kicked (" + point + ")",
      });
    },
    specialAttack: function () {
      var point = Math.floor(Math.random() * 25);
      this.monsterHeal -= point;
      this.monsterAttack();
      this.addToLog({
        turn: "player",
        text: "player special kick (" + point + ")",
      });
    },
    healUp: function () {
      var point = Math.floor(Math.random() * 20);
      this.playerHeal += point;
      this.monsterAttack();
      this.addToLog({ turn: "player", text: "healing (" + point + ")" });
    },
    giveUp: function () {
      this.playerHeal = 0;
      this.addToLog({ turn: "player", text: "give up! (" + point + ")" });
    },
    addToLog: function (log) {
      this.logs.push(log);
    },
  },
  watch: {
    playerHeal: function (value) {
      if (value <= 0) {
        this.playerHeal = 0;
        if (confirm("Game Over. Try again!")) {
          this.playerHeal = 100;
          this.monsterHeal = 100;
          this.logs = [];
        }
      } else if (value > 100) {
        this.playerHeal = 100;
      }
    },
    monsterHeal: function (value) {
      if (value <= 0) {
        this.monsterHeal = 0;
        if (confirm("YOU WIN! Try again!")) {
          this.playerHeal = 100;
          this.monsterHeal = 100;
          this.logs = [];
        }
      } else if (value > 100) {
        this.monsterHeal = 100;
      }
    },
  },
});
