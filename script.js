document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     DOM
  ========================================= */

  const moneyEl = document.getElementById("money");
  const happinessEl = document.getElementById("happiness");
  const jobEl = document.getElementById("job");
  const positionEl = document.getElementById("position");

  const diceEl = document.getElementById("dice");
  const boardEl = document.getElementById("board");

  const rollButton =
    document.getElementById("rollButton");

  const restartButton =
    document.getElementById("restartButton");

  const eventPanel =
    document.getElementById("event-panel");

  const visualMain =
    document.getElementById("visualMain");

  const eventType =
    document.getElementById("eventType");

  const eventTitle =
    document.getElementById("eventTitle");

  const eventText =
    document.getElementById("eventText");

  const moneyChange =
    document.getElementById("moneyChange");

  const happinessChange =
    document.getElementById("happinessChange");

  const jobChange =
    document.getElementById("jobChange");

  const bgmButton =
    document.getElementById("bgmButton");

  const seButton =
    document.getElementById("seButton");

  const jobModal =
    document.getElementById("jobModal");

  const jobDice =
    document.getElementById("jobDice");

  const jobRollButton =
    document.getElementById("jobRollButton");

  const jobResult =
    document.getElementById("jobResult");

  const branchModal =
    document.getElementById("branchModal");

  const branchDice =
    document.getElementById("branchDice");

  const branchRollButton =
    document.getElementById("branchRollButton");

  const branchResult =
    document.getElementById("branchResult");


  /* =========================================
     PLAYER
  ========================================= */

  const initialPlayer = {
    money: 100000,
    happiness: 50,
    job: "未就職",
    position: 0,
    appearance: "🧒",
    age: 6
  };

  let player = { ...initialPlayer };

  let moving = false;
  let moveTimer = null;

  let bgmOn = false;
  let seOn = true;

  let audioContext = null;
  let bgmTimer = null;


  /* =========================================
     JOBS
  ========================================= */

  const jobs = [

    {
      name: "公務員",
      icon: "🏢",
      appearance: "👨‍💼",
      money: 150000,
      happiness: 5
    },

    {
      name: "会社員",
      icon: "💼",
      appearance: "👨‍💼",
      money: 200000,
      happiness: 5
    },

    {
      name: "医師",
      icon: "🩺",
      appearance: "👨‍⚕️",
      money: 300000,
      happiness: 8
    },

    {
      name: "YouTuber",
      icon: "📱",
      appearance: "🧑‍💻",
      money: 250000,
      happiness: 10
    },

    {
      name: "パティシエ",
      icon: "🍰",
      appearance: "👨‍🍳",
      money: 180000,
      happiness: 12
    },

    {
      name: "プロスポーツ選手",
      icon: "⚽",
      appearance: "🏃",
      money: 400000,
      happiness: 15
    }

  ];


  /* =========================================
     MAP
  ========================================= */

  const map = [

    {
      icon: "🚩",
      name: "スタート",
      text: "人生が始まった！",
      money: 0,
      happiness: 0,
      type: "start"
    },

    {
      icon: "🏪",
      name: "コンビニ",
      text: "お菓子を買っちゃった！",
      money: -500,
      happiness: 1,
      type: "normal"
    },

    {
      icon: "💼",
      name: "アルバイト",
      text: "初めてのお仕事！",
      money: 30000,
      happiness: 2,
      type: "work",
      job: "アルバイト"
    },

    {
      icon: "🎢",
      name: "遊園地",
      text: "今日は思いっきり遊んだ！",
      money: -5000,
      happiness: 10,
      type: "fun"
    },

    {
      icon: "👔",
      name: "就職",
      text: "人生の大きな分岐点！",
      money: 0,
      happiness: 0,
      type: "job"
    },

    {
      icon: "💴",
      name: "給料日",
      text: "待ちに待った給料日！",
      money: 300000,
      happiness: 3,
      type: "money"
    },

    {
      icon: "✈️",
      name: "旅行",
      text: "海外旅行へ！最高の思い出！",
      money: -50000,
      happiness: 15,
      type: "fun"
    },

    {
      icon: "🎫",
      name: "宝くじ",
      text: "なんと当選！",
      money: 100000,
      happiness: 3,
      type: "money"
    },

    {
      icon: "🏥",
      name: "病院",
      text: "ちょっと体調を崩した……。",
      money: -30000,
      happiness: -5,
      type: "bad"
    },

    {
      icon: "🏠",
      name: "引っ越し",
      text: "新しい家で新生活！",
      money: -100000,
      happiness: 8,
      type: "life"
    },

    {
      icon: "📈",
      name: "昇進",
      text: "仕事で大活躍！係長になった！",
      money: 300000,
      happiness: 10,
      type: "work",
      job: "係長"
    },

    {
      icon: "💍",
      name: "結婚",
      text: "大切な人と人生を歩むことに！",
      money: -100000,
      happiness: 20,
      type: "love"
    },

    {
      icon: "💰",
      name: "ボーナス",
      text: "ボーナスが入った！",
      money: 500000,
      happiness: 8,
      type: "money"
    },

    {
      icon: "🎮",
      name: "趣味",
      text: "好きなことに没頭！",
      money: -10000,
      happiness: 12,
      type: "fun"
    },

    {
      icon: "💵",
      name: "臨時収入",
      text: "思わぬところからお金が！",
      money: 100000,
      happiness: 5,
      type: "money"
    },

    {
      icon: "💸",
      name: "大出費",
      text: "突然の大きな出費……！",
      money: -200000,
      happiness: -8,
      type: "bad"
    },

    {
      icon: "🐶",
      name: "ペット",
      text: "かわいい家族が増えた！",
      money: -50000,
      happiness: 15,
      type: "love"
    },

    {
      icon: "🍀",
      name: "幸運",
      text: "今日はツイている！",
      money: 200000,
      happiness: 10,
      type: "luck"
    },

    {
      icon: "🌴",
      name: "休暇",
      text: "ゆっくり休んでリフレッシュ！",
      money: -30000,
      happiness: 20,
      type: "fun"
    },

    {
      icon: "🛣️",
      name: "人生の分かれ道",
      text: "ここから先は運命次第……！",
      money: 0,
      happiness: 0,
      type: "branch"
    },

    {
      icon: "🏁",
      name: "ゴール",
      text: "人生のゴール！お疲れさまでした！",
      money: 0,
      happiness: 0,
      type: "goal"
    }

  ];


  /* =========================================
     LIFE APPEARANCE
  ========================================= */

  function getLifeAppearance() {

    /*
      職業が決まっている場合は
      職業の見た目を優先
    */

    if (
      player.job !== "未就職" &&
      player.job !== "アルバイト" &&
      player.job !== "係長"
    ) {

      const selectedJob =
        jobs.find(
          job => job.name === player.job
        );

      if (selectedJob) {
        return selectedJob.appearance;
      }
    }

    /*
      係長
    */

    if (player.job === "係長") {
      return "🧑‍💼";
    }

    /*
      職業決定前の成長
    */

    if (player.position <= 3) {
      return "🧒";
    }

    if (player.position <= 8) {
      return "🧑";
    }

    if (player.position <= 13) {
      return "🧑‍💼";
    }

    if (player.position <= 18) {
      return "🧔";
    }

    return "👴";
  }


  /* =========================================
     AUDIO
  ========================================= */

  function initAudio() {

    if (!audioContext) {

      audioContext =
        new (
          window.AudioContext ||
          window.webkitAudioContext
        )();
    }

    if (
      audioContext.state === "suspended"
    ) {
      audioContext.resume();
    }
  }


  function playTone(
    frequency = 440,
    duration = 0.12,
    type = "sine",
    volume = 0.06
  ) {

    if (!seOn) return;

    initAudio();

    const oscillator =
      audioContext.createOscillator();

    const gain =
      audioContext.createGain();

    oscillator.type = type;
    oscillator.frequency.value =
      frequency;

    gain.gain.setValueAtTime(
      volume,
      audioContext.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + duration
    );

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();

    oscillator.stop(
      audioContext.currentTime + duration
    );
  }


  function playStepSound() {

    playTone(
      330,
      0.07,
      "square",
      0.035
    );

    setTimeout(() => {

      playTone(
        440,
        0.07,
        "square",
        0.03
      );

    }, 50);
  }


  function playDiceResultSound() {

    playTone(523, 0.1);

    setTimeout(() => {
      playTone(659, 0.1);
    }, 100);

    setTimeout(() => {
      playTone(784, 0.16);
    }, 200);
  }


  function playEventSound(type) {

    if (!seOn) return;

    const sounds = {

      money: [660, 880],

      fun: [523, 659, 784],

      love: [392, 523, 659],

      bad: [220, 180],

      luck: [784, 988, 1175],

      work: [440, 550, 660],

      job: [523, 659, 784, 1046],

      life: [440, 554, 659],

      goal: [523, 659, 784, 1046]

    };

    const notes =
      sounds[type] || [440];

    notes.forEach(
      (note, index) => {

        setTimeout(() => {

          playTone(
            note,
            0.13,
            "sine",
            0.06
          );

        }, index * 100);

      }
    );
  }


  /* =========================================
     BGM
  ========================================= */

  function startBGM() {

    if (!bgmOn) return;

    stopBGM();

    let noteIndex = 0;

    const notes = [
      262,
      330,
      392,
      330,
      294,
      349,
      440,
      349
    ];

    bgmTimer =
      setInterval(() => {

        if (!bgmOn) return;

        playTone(
          notes[
            noteIndex %
            notes.length
          ],
          0.18,
          "sine",
          0.015
        );

        noteIndex++;

      }, 350);
  }


  function stopBGM() {

    if (bgmTimer) {

      clearInterval(bgmTimer);

      bgmTimer = null;
    }
  }


  bgmButton.addEventListener(
    "click",
    () => {

      initAudio();

      bgmOn = !bgmOn;

      bgmButton.textContent =
        bgmOn
          ? "🎵 BGM ON"
          : "🎵 BGM OFF";

      if (bgmOn) {
        startBGM();
      } else {
        stopBGM();
      }

    }
  );


  seButton.addEventListener(
    "click",
    () => {

      initAudio();

      seOn = !seOn;

      seButton.textContent =
        seOn
          ? "🔊 SE ON"
          : "🔇 SE OFF";

    }
  );


  /* =========================================
     BOARD
  ========================================= */

  function createBoard() {

    boardEl.innerHTML = "";

    map.forEach(
      (cell, index) => {

        const cellEl =
          document.createElement("div");

        cellEl.className = "cell";

        cellEl.dataset.position =
          index;

        cellEl.innerHTML = `
          <div class="cell-number">
            ${index}
          </div>

          <div class="cell-icon">
            ${cell.icon}
          </div>

          <div class="cell-name">
            ${cell.name}
          </div>
        `;

        boardEl.appendChild(
          cellEl
        );
      }
    );

    updatePlayerPosition(false);
  }


  /* =========================================
     UI
  ========================================= */

  function updateUI() {

    moneyEl.textContent =
      `${player.money.toLocaleString()}円`;

    happinessEl.textContent =
      player.happiness;

    jobEl.textContent =
      player.job;

    positionEl.textContent =
      player.position;

    player.appearance =
      getLifeAppearance();

    updatePlayerPosition(false);
  }


  function updatePlayerPosition(
    walking = false
  ) {

    document
      .querySelectorAll(".cell")
      .forEach(cell => {

        cell.classList.remove(
          "player-here"
        );

        const oldPlayer =
          cell.querySelector(".player");

        if (oldPlayer) {
          oldPlayer.remove();
        }

      });

    const targetCell =
      document.querySelector(
        `.cell[data-position="${player.position}"]`
      );

    if (!targetCell) {
      return null;
    }

    targetCell.classList.add(
      "player-here"
    );

    const playerEl =
      document.createElement("div");

    playerEl.className = "player";

    if (walking) {
      playerEl.classList.add(
        "walking"
      );
    }

    playerEl.textContent =
      player.appearance;

    targetCell.appendChild(
      playerEl
    );

    return playerEl;
  }


  /* =========================================
     EVENT PANEL
  ========================================= */

  function showEvent(
    event,
    money = 0,
    happiness = 0,
    job = ""
  ) {

    eventPanel.classList.remove(
      "show"
    );

    void eventPanel.offsetWidth;

    eventPanel.classList.add(
      "show"
    );

    visualMain.textContent =
      event.icon ||
      player.appearance;

    visualMain.classList.remove(
      "event-animation"
    );

    void visualMain.offsetWidth;

    visualMain.classList.add(
      "event-animation"
    );

    eventType.textContent =
      event.type
        ? event.type.toUpperCase()
        : "LIFE EVENT";

    eventTitle.textContent =
      event.name || "";

    eventText.textContent =
      event.text || "";

    moneyChange.textContent =
      money === 0
        ? ""
        : money > 0
          ? `💰 +${money.toLocaleString()}円`
          : `💸 ${money.toLocaleString()}円`;

    happinessChange.textContent =
      happiness === 0
        ? ""
        : happiness > 0
          ? `😊 幸福度 +${happiness}`
          : `😢 幸福度 ${happiness}`;

    jobChange.textContent =
      job
        ? `💼 ${job}`
        : "";
  }


  /* =========================================
     EVENT
  ========================================= */

  function triggerEvent(position) {

    const event =
      map[position];

    if (!event) {

      /*
        万が一イベントがない場合でも
        サイコロを復活させる
      */

      moving = false;
      rollButton.disabled = false;

      return;
    }


    /* 就職 */

    if (event.type === "job") {

      showEvent(
        event,
        0,
        0,
        ""
      );

      showJobModal();

      return;
    }


    /* 分かれ道 */

    if (event.type === "branch") {

      showEvent(
        event,
        0,
        0,
        ""
      );

      showBranchModal();

      return;
    }


    /* 通常イベント */

    player.money +=
      event.money || 0;

    player.happiness +=
      event.happiness || 0;

    if (event.job) {
      player.job =
        event.job;
    }

    player.appearance =
      getLifeAppearance();

    updateUI();

    playEventSound(
      event.type
    );

    showEvent(
      event,
      event.money || 0,
      event.happiness || 0,
      event.job || ""
    );


    /* ゴール */

    if (event.type === "goal") {

      moving = false;

      rollButton.disabled =
        true;

      setTimeout(() => {

        showEvent(
          {
            icon: "🎉",

            type: "GOAL",

            name: "人生クリア！",

            text:
              `あなたの人生は ${player.age}歳！\n` +
              `所持金 ${player.money.toLocaleString()}円\n` +
              `幸福度 ${player.happiness}！`
          },

          0,
          0,
          player.job
        );

        playEventSound("goal");

      }, 500);

      return;
    }


    /*
      ★★★ 今回の重要ポイント ★★★

      通常イベントが終わったら
      必ず次のサイコロを振れるようにする。
    */

    moving = false;

    rollButton.disabled = false;
  }


  /* =========================================
     PLAYER MOVE
  ========================================= */

  function movePlayer(steps) {

    if (moving) {
      return;
    }

    moving = true;

    rollButton.disabled =
      true;

    let count = 0;

    moveTimer =
      setInterval(() => {

        player.position++;

        count++;


        /*
          1マス = 約4歳
        */

        player.age =
          Math.min(
            86,
            6 +
            player.position * 4
          );


        /*
          成長
        */

        player.appearance =
          getLifeAppearance();


        /*
          歩いているキャラを表示
        */

        const playerEl =
          updatePlayerPosition(true);


        playStepSound();


        if (playerEl) {

          setTimeout(() => {

            playerEl.classList.remove(
              "walking"
            );

          }, 300);

        }


        /*
          ★ マス4
          必ず就職で停止
        */

        if (
          player.position === 4
        ) {

          clearInterval(
            moveTimer
          );

          moveTimer = null;

          moving = false;

          updateUI();

          setTimeout(() => {

            showJobArrival();

          }, 250);

          return;
        }


        /*
          ★ マス19
          必ず分かれ道で停止
        */

        if (
          player.position === 19
        ) {

          clearInterval(
            moveTimer
          );

          moveTimer = null;

          moving = false;

          updateUI();

          setTimeout(() => {

            showBranchArrival();

          }, 250);

          return;
        }


        /*
          ゴール
        */

        if (
          player.position >= 20
        ) {

          clearInterval(
            moveTimer
          );

          moveTimer = null;

          player.position = 20;

          player.age = 86;

          moving = false;

          updateUI();

          setTimeout(() => {

            triggerEvent(20);

          }, 300);

          return;
        }


        /*
          サイコロの歩数が終了
        */

        if (
          count >= steps
        ) {

          clearInterval(
            moveTimer
          );

          moveTimer = null;

          moving = false;

          setTimeout(() => {

            updateUI();

            triggerEvent(
              player.position
            );

          }, 300);
        }

      }, 400);
  }


  /* =========================================
     NORMAL DICE
  ========================================= */

  function rollDice() {

    if (moving) {
      return;
    }

    initAudio();

    const result =
      Math.floor(
        Math.random() * 6
      ) + 1;

    rollButton.disabled =
      true;

    diceEl.classList.add(
      "rolling"
    );

    let animationCount = 0;

    const diceAnimation =
      setInterval(() => {

        const temp =
          Math.floor(
            Math.random() * 6
          ) + 1;

        diceEl.textContent =
          [
            "⚀",
            "⚁",
            "⚂",
            "⚃",
            "⚄",
            "⚅"
          ][temp - 1];

        animationCount++;

        if (
          animationCount >= 8
        ) {

          clearInterval(
            diceAnimation
          );

          diceEl.classList.remove(
            "rolling"
          );

          diceEl.textContent =
            [
              "⚀",
              "⚁",
              "⚂",
              "⚃",
              "⚄",
              "⚅"
            ][result - 1];

          playDiceResultSound();

          setTimeout(() => {

      /*      diceEl.textContent =
              "🎲";  */

            movePlayer(
              result
            );

          }, 250);
        }

      }, 70);
  }


  rollButton.addEventListener(
    "click",
    rollDice
  );


  /* =========================================
     JOB
  ========================================= */

  function showJobArrival() {

    showEvent(
      {
        icon: "👔",
        type: "JOB",
        name: "就職！",
        text:
          "ついに社会人！\n" +
          "職業サイコロを振ろう！"
      },
      0,
      0,
      ""
    );

    jobModal.classList.add(
      "active"
    );

    jobResult.textContent = "";

    jobRollButton.disabled =
      false;
  }


  function rollJobDice() {

    initAudio();

    jobRollButton.disabled =
      true;

    const result =
      Math.floor(
        Math.random() * 6
      ) + 1;

    jobDice.classList.add(
      "rolling"
    );

    let count = 0;

    const timer =
      setInterval(() => {

        const temp =
          Math.floor(
            Math.random() * 6
          ) + 1;

        jobDice.textContent =
          [
            "⚀",
            "⚁",
            "⚂",
            "⚃",
            "⚄",
            "⚅"
          ][temp - 1];

        count++;

        if (
          count >= 8
        ) {

          clearInterval(timer);

          jobDice.classList.remove(
            "rolling"
          );

          jobDice.textContent =
            [
              "⚀",
              "⚁",
              "⚂",
              "⚃",
              "⚄",
              "⚅"
            ][result - 1];


          const selectedJob =
            jobs[result - 1];


          /*
            職業決定
          */

          player.job =
            selectedJob.name;

          player.money +=
            selectedJob.money;

          player.happiness +=
            selectedJob.happiness;


          /*
            ★ 職業の姿へ変身
          */

          player.appearance =
            selectedJob.appearance;


          updateUI();

          playDiceResultSound();

          playEventSound(
            "job"
          );


          jobResult.innerHTML =
            `${selectedJob.icon} <strong>${selectedJob.name}</strong><br>` +
            `💰 +${selectedJob.money.toLocaleString()}円　` +
            `😊 +${selectedJob.happiness}`;


          showEvent(
            {
              icon:
                selectedJob.appearance,

              type: "JOB",

              name:
                selectedJob.name,

              text:
                `あなたの職業が決まった！\n` +
                `${selectedJob.name}として人生を進もう！`
            },

            selectedJob.money,

            selectedJob.happiness,

            selectedJob.name
          );


          /*
            就職モーダルを閉じる
          */

          setTimeout(() => {

            jobModal.classList.remove(
              "active"
            );


            /*
              キャラクターを
              職業姿に更新
            */

            player.appearance =
              selectedJob.appearance;

            updateUI();

            const playerEl =
              updatePlayerPosition(
                false
              );

            if (playerEl) {

              playerEl.classList.add(
                "arrived"
              );

            }


            /*
              ★★★ 超重要 ★★★

              就職が終わったら
              通常サイコロを復活！
            */

            moving = false;

            rollButton.disabled =
              false;


            playTone(
              880,
              0.18,
              "sine",
              0.07
            );

          }, 1800);
        }

      }, 80);
  }


  jobRollButton.addEventListener(
    "click",
    rollJobDice
  );


  /* =========================================
     BRANCH
  ========================================= */

  function showBranchArrival() {

    showEvent(
      {
        icon: "🛣️",
        type: "BRANCH",
        name: "人生の分かれ道",
        text:
          "ここから先は運命次第！\n" +
          "サイコロを振ろう！"
      },

      0,
      0,
      ""
    );

    branchModal.classList.add(
      "active"
    );

    branchResult.textContent = "";

    branchRollButton.disabled =
      false;
  }


  function rollBranchDice() {

    initAudio();

    branchRollButton.disabled =
      true;

    const result =
      Math.floor(
        Math.random() * 6
      ) + 1;

    branchDice.classList.add(
      "rolling"
    );

    let count = 0;

    const timer =
      setInterval(() => {

        const temp =
          Math.floor(
            Math.random() * 6
          ) + 1;

        branchDice.textContent =
          [
            "⚀",
            "⚁",
            "⚂",
            "⚃",
            "⚄",
            "⚅"
          ][temp - 1];

        count++;

        if (
          count >= 8
        ) {

          clearInterval(timer);

          branchDice.classList.remove(
            "rolling"
          );

          branchDice.textContent =
            [
              "⚀",
              "⚁",
              "⚂",
              "⚃",
              "⚄",
              "⚅"
            ][result - 1];

          playDiceResultSound();

          handleBranchResult(
            result
          );
        }

      }, 80);
  }


  branchRollButton.addEventListener(
    "click",
    rollBranchDice
  );


  /* =========================================
     BRANCH RESULT
  ========================================= */

  function handleBranchResult(result) {

    const outcomes = {

      1: {
        title: "ゴールへ！",
        text:
          "運命に導かれてゴールへ向かう！",
        position: 20
      },

      2: {
        title: "就職へ逆戻り！",
        text:
          "もう一度、自分の仕事を見つめ直すことに！",
        position: 4
      },

      3: {
        title: "結婚へ！",
        text:
          "人生の大切な人との時間へ戻る！",
        position: 11
      },

      4: {
        title: "ゲームオーバー",
        text:
          "人生の道がここで途切れてしまった……。",
        position: null
      },

      5: {
        title: "臨時収入！",
        text:
          "思わぬところからお金が入る！",
        position: 14
      },

      6: {
        title: "大出費！",
        text:
          "まさかの大きな出費……！",
        position: 15
      }

    };


    const outcome =
      outcomes[result];


    branchResult.innerHTML =
      `<strong>${outcome.title}</strong><br>` +
      outcome.text;


    showEvent(
      {
        icon:
          result === 4
            ? "💀"
            : "🛣️",

        type: "BRANCH",

        name:
          outcome.title,

        text:
          outcome.text
      },

      0,
      0,
      ""
    );


    playEventSound(
      result === 4
        ? "bad"
        : "luck"
    );


    setTimeout(() => {

      branchModal.classList.remove(
        "active"
      );


      /*
        ゲームオーバー
      */

      if (
        result === 4
      ) {

        moving = false;

        rollButton.disabled =
          true;

        showEvent(
          {
            icon: "💀",

            type: "GAME OVER",

            name: "ゲームオーバー",

            text:
              "あなたの人生はここで終了……！"
          },

          0,
          0,
          player.job
        );

        return;
      }


      /*
        新しい位置へ
      */

      player.position =
        outcome.position;


      player.age =
        Math.min(
          86,
          6 +
          player.position * 4
        );


      player.appearance =
        getLifeAppearance();


      updateUI();


      const playerEl =
        updatePlayerPosition(
          false
        );


      if (playerEl) {

        playerEl.classList.add(
          "arrived"
        );
      }


      setTimeout(() => {

        /*
          ゴール
        */

        if (
          player.position === 20
        ) {

          triggerEvent(20);

          return;
        }


        /*
          就職へ戻った場合
        */

        if (
          player.position === 4
        ) {

          showJobArrival();

          return;
        }


        /*
          それ以外は普通のイベント

          ★ここでイベント後に
          サイコロが復活する
        */

        triggerEvent(
          player.position
        );

      }, 400);

    }, 1200);
  }


  /* =========================================
     RESTART
  ========================================= */

  restartButton.addEventListener(
    "click",
    () => {

      initAudio();

      if (moveTimer) {

        clearInterval(
          moveTimer
        );

        moveTimer = null;
      }

      stopBGM();

      player = {
        ...initialPlayer
      };

      moving = false;

      rollButton.disabled =
        false;

      jobModal.classList.remove(
        "active"
      );

      branchModal.classList.remove(
        "active"
      );

      diceEl.textContent =
        "🎲";

      jobDice.textContent =
        "🎲";

      branchDice.textContent =
        "🎲";

      jobResult.textContent =
        "";

      branchResult.textContent =
        "";

      updateUI();

      showEvent(
        {
          icon: "🚩",

          type: "START",

          name: "人生スタート！",

          text:
            "さあ、あなたの人生が始まる！"
        },

        0,
        0,
        ""
      );

      playEventSound(
        "goal"
      );

      if (bgmOn) {
        startBGM();
      }

    }
  );


  /* =========================================
     iPhone Safari AUDIO
  ========================================= */

  document.addEventListener(
    "touchstart",
    () => {
      initAudio();
    },
    {
      once: true
    }
  );

  document.addEventListener(
    "click",
    () => {
      initAudio();
    },
    {
      once: true
    }
  );


  /* =========================================
     START
  ========================================= */

  createBoard();

  updateUI();

  showEvent(
    {
      icon: "🚩",

      type: "START",

      name: "人生スタート！",

      text:
        "サイコロを振って人生を始めよう！"
    },

    0,
    0,
    ""
  );

});
