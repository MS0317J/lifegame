document.addEventListener("DOMContentLoaded", () => {
  // ==============================
  // DOM
  // ==============================
  const moneyEl = document.getElementById("money");
  const happinessEl = document.getElementById("happiness");
  const jobEl = document.getElementById("job");
  const positionEl = document.getElementById("position");
  const ageEl = document.getElementById("age");

  const diceEl = document.getElementById("dice");
  const boardEl = document.getElementById("board");
  const rollButton = document.getElementById("rollButton");
  const restartButton = document.getElementById("restartButton");

  const characterModal = document.getElementById("characterModal");
  const characterOptions = document.querySelectorAll(".character-option");
  const characterStartButton = document.getElementById("characterStartButton");

  const eventPanel = document.getElementById("event-panel");
  const eventVisual = document.getElementById("eventVisual");
  const visualMain = document.getElementById("visualMain");
  const eventType = document.getElementById("eventType");
  const eventTitle = document.getElementById("eventTitle");
  const eventText = document.getElementById("eventText");
  const moneyChange = document.getElementById("moneyChange");
  const happinessChange = document.getElementById("happinessChange");
  const jobChange = document.getElementById("jobChange");

  const bgmButton = document.getElementById("bgmButton");
  const seButton = document.getElementById("seButton");

  const jobModal = document.getElementById("jobModal");
  const jobDice = document.getElementById("jobDice");
  const jobRollButton = document.getElementById("jobRollButton");
  const jobResult = document.getElementById("jobResult");

  const branchModal = document.getElementById("branchModal");
  const branchDice = document.getElementById("branchDice");
  const branchRollButton = document.getElementById("branchRollButton");
  const branchResult = document.getElementById("branchResult");

  // ==============================
  // プレイヤー
  // ==============================
  const initialPlayer = {
    money: 100000,
    happiness: 50,
    job: "未就職",
    position: 0,
    appearance: "🧒",
    age: 6,
    character: "boy"
  };

  let player = { ...initialPlayer };
  let moving = false;
  let moveTimer = null;
  let characterSelected = false;

  // ==============================
  // 職業
  // ==============================
  const jobs = [
    {
      name: "公務員",
      icon: "🏢",
      money: 150000,
      happiness: 5,
      appearance: "👨‍💼"
    },
    {
      name: "会社員",
      icon: "💼",
      money: 200000,
      happiness: 5,
      appearance: "👨‍💼"
    },
    {
      name: "医師",
      icon: "🩺",
      money: 300000,
      happiness: 8,
      appearance: "👨‍⚕️"
    },
    {
      name: "YouTuber",
      icon: "📱",
      money: 250000,
      happiness: 10,
      appearance: "🧑‍💻"
    },
    {
      name: "パティシエ",
      icon: "🍰",
      money: 180000,
      happiness: 12,
      appearance: "👨‍🍳"
    },
    {
      name: "プロスポーツ選手",
      icon: "⚽",
      money: 400000,
      happiness: 15,
      appearance: "🏃"
    }
  ];

  // ==============================
  // マップ
  // ==============================
  const map = [
    { title: "スタート", icon: "🚩", money: 0, happiness: 0, text: "人生ゲームスタート！" },
    { title: "コンビニ", icon: "🏪", money: -500, happiness: 1, text: "ちょっとお買い物。" },
    { title: "アルバイト", icon: "💼", money: 30000, happiness: 2, job: "アルバイト", text: "アルバイトでお金を稼いだ！" },
    { title: "遊園地", icon: "🎢", money: -5000, happiness: 10, text: "遊園地で思いっきり遊んだ！" },
    { title: "就職", icon: "👔", money: 0, happiness: 0, text: "いよいよ就職！" },
    { title: "給料日", icon: "💴", money: 300000, happiness: 3, text: "給料が入った！" },
    { title: "旅行", icon: "✈️", money: -50000, happiness: 15, text: "楽しい旅行に出かけた！" },
    { title: "宝くじ", icon: "🎫", money: 100000, happiness: 3, text: "宝くじが当たった！" },
    { title: "病院", icon: "🏥", money: -30000, happiness: -5, text: "ちょっと体調を崩してしまった。" },
    { title: "引っ越し", icon: "🏠", money: -100000, happiness: 8, text: "新しい家で新生活！" },
    { title: "昇進", icon: "📈", money: 300000, happiness: 10, job: "係長", text: "仕事を頑張って昇進した！" },
    { title: "結婚", icon: "💍", money: -100000, happiness: 20, text: "人生の大きなイベント！" },
    { title: "ボーナス", icon: "💰", money: 500000, happiness: 8, text: "ボーナスが出た！" },
    { title: "趣味", icon: "🎮", money: -10000, happiness: 12, text: "好きなことを思いっきり楽しんだ！" },
    { title: "臨時収入", icon: "💵", money: 100000, happiness: 5, text: "思わぬ臨時収入！" },
    { title: "大出費", icon: "💸", money: -200000, happiness: -8, text: "大きな出費が発生した……。" },
    { title: "ペット", icon: "🐶", money: -50000, happiness: 15, text: "かわいいペットを飼い始めた！" },
    { title: "幸運", icon: "🍀", money: 200000, happiness: 10, text: "ラッキー！いいことが起きた！" },
    { title: "休暇", icon: "🌴", money: -30000, happiness: 20, text: "ゆっくり休んでリフレッシュ！" },
    { title: "人生の分かれ道", icon: "🛣️", money: 0, happiness: 0, text: "ここから人生の行き先が決まる！" },
    { title: "ゴール", icon: "🏁", money: 0, happiness: 0, text: "人生ゲーム、ゴール！" }
  ];

  // ==============================
  // キャラクター
  // ==============================
  const characterTypes = {
    boy: {
      name: "男の子",
      icon: "👦",
      stages: ["👦", "🧑", "👨", "🧔", "👴"]
    },
    girl: {
      name: "女の子",
      icon: "👧",
      stages: ["👧", "👩", "👩‍💼", "👩‍🦰", "👵"]
    },
    neutral: {
      name: "中性的",
      icon: "🧑",
      stages: ["🧑", "🧑", "🧑‍💼", "🧔", "🧓"]
    }
  };

  function getCharacterAppearance() {
    const character = characterTypes[player.character] || characterTypes.boy;

    if (player.position <= 3) return character.stages[0];
    if (player.position <= 8) return character.stages[1];
    if (player.position <= 13) return character.stages[2];
    if (player.position <= 18) return character.stages[3];
    return character.stages[4];
  }

  function getLifeAppearance() {
    const selectedJob = jobs.find((job) => job.name === player.job);

    if (selectedJob) {
      return selectedJob.appearance;
    }

    if (player.job === "係長") {
      return "🧑‍💼";
    }

    return getCharacterAppearance();
  }

  // ==============================
  // 音声
  // iPhone Safari対策
  // ==============================
  let audioContext = null;
  let bgmTimer = null;
  let bgmOn = false;
  let seOn = true;

  function initAudio() {
    try {
      if (!audioContext) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;

        if (AudioCtx) {
          audioContext = new AudioCtx();
        }
      }

      if (audioContext && audioContext.state === "suspended") {
        const result = audioContext.resume();

        if (result && typeof result.catch === "function") {
          result.catch(() => {});
        }
      }
    } catch (error) {
      console.log("Audio initialization error:", error);
    }

    return audioContext;
  }

  function playTone(
    frequency,
    duration = 0.08,
    type = "sine",
    volume = 0.04
  ) {
    if (!seOn) return;

    const ctx = initAudio();

    if (!ctx) return;

    try {
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }

      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();

      oscillator.type = type;
      oscillator.frequency.setValueAtTime(
        frequency,
        ctx.currentTime
      );

      gain.gain.setValueAtTime(
        volume,
        ctx.currentTime
      );

      gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + duration
      );

      oscillator.connect(gain);
      gain.connect(ctx.destination);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch (error) {
      console.log("Tone error:", error);
    }
  }

  function playStepSound() {
    playTone(520, 0.07, "square", 0.025);
  }

  function playDiceResultSound(number) {
    const notes = [330, 392, 440, 494, 523, 659];
    const note = notes[number - 1] || 440;

    playTone(note, 0.18, "triangle", 0.07);

    setTimeout(() => {
      playTone(note * 1.25, 0.12, "triangle", 0.045);
    }, 100);
  }

  function playEventSound(event) {
    if (!seOn) return;

    if (event.money > 0 || event.happiness > 0) {
      playTone(660, 0.12, "triangle", 0.06);
      setTimeout(() => playTone(880, 0.18, "triangle", 0.05), 110);
    } else if (event.money < 0 || event.happiness < 0) {
      playTone(220, 0.16, "sawtooth", 0.035);
      setTimeout(() => playTone(165, 0.22, "sawtooth", 0.025), 130);
    } else {
      playTone(440, 0.12, "sine", 0.04);
    }
  }

  function startBGM() {
    initAudio();

    if (!audioContext || bgmTimer) return;

    bgmOn = true;

    const melody = [392, 440, 523, 440, 392, 330, 392, 523];
    let index = 0;

    const playBgmNote = () => {
      if (!bgmOn || !audioContext) return;

      try {
        if (audioContext.state === "suspended") {
          audioContext.resume().catch(() => {});
        }

        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(
          melody[index % melody.length],
          audioContext.currentTime
        );

        gain.gain.setValueAtTime(
          0.012,
          audioContext.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
          0.001,
          audioContext.currentTime + 0.45
        );

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.45);

        index++;
      } catch (error) {
        console.log("BGM error:", error);
      }
    };

    playBgmNote();
    bgmTimer = setInterval(playBgmNote, 520);
  }

  function stopBGM() {
    bgmOn = false;

    if (bgmTimer) {
      clearInterval(bgmTimer);
      bgmTimer = null;
    }
  }

  // ==============================
  // UI
  // ==============================
  function formatMoney(value) {
    return `${value.toLocaleString("ja-JP")}円`;
  }

  function updateUI() {
    player.age = Math.min(86, 18 + player.position * 1);
  
    moneyEl.textContent = formatMoney(player.money);
    happinessEl.textContent = player.happiness;
    jobEl.textContent = player.job;
    ageEl.textContent = `${player.age}歳`;
    positionEl.textContent = player.position;
  
    updatePlayerPosition(false);
  }

  function updatePlayerPosition(walking = false) {
    document
      .querySelectorAll(".cell.player-here")
      .forEach((cell) => cell.classList.remove("player-here"));

    document
      .querySelectorAll(".player")
      .forEach((el) => el.remove());

    const cell = document.querySelector(
      `.cell[data-position="${player.position}"]`
    );

    if (!cell) return;

    cell.classList.add("player-here");

    const playerEl = document.createElement("div");
    playerEl.className = "player";

    if (walking) {
      playerEl.classList.add("walking");
    }

    playerEl.textContent = getLifeAppearance();
    cell.appendChild(playerEl);

    if (walking) {
      setTimeout(() => {
        playerEl.classList.remove("walking");
        playerEl.classList.add("arrived");
      }, 350);
    }
  }

  // ==============================
  // 盤面
  // ==============================
  function createBoard() {
    boardEl.innerHTML = "";

    map.forEach((event, index) => {
      const cell = document.createElement("div");

      cell.className = "cell";
      cell.dataset.position = index;

      cell.innerHTML = `
        <div class="cell-number">${index}</div>
        <div class="cell-icon">${event.icon}</div>
        <div class="cell-name">${event.title}</div>
      `;

      boardEl.appendChild(cell);
    });

    updatePlayerPosition(false);
  }

  // ==============================
  // イベント表示
  // ==============================
  function showEvent(event, position) {
    eventPanel.classList.remove("show");
    visualMain.classList.remove("event-animation");

    void eventPanel.offsetWidth;
    void visualMain.offsetWidth;

    eventPanel.classList.add("show");
    visualMain.classList.add("event-animation");

    visualMain.textContent = event.icon;
    eventType.textContent =
      position === 20 ? "GOAL" : "LIFE EVENT";

    eventTitle.textContent = event.title;
    eventText.textContent = event.text;

    if (event.money > 0) {
      moneyChange.textContent = `💰 +${formatMoney(event.money)}`;
    } else if (event.money < 0) {
      moneyChange.textContent = `💸 ${formatMoney(event.money)}`;
    } else {
      moneyChange.textContent = "";
    }

    if (event.happiness > 0) {
      happinessChange.textContent = `😊 幸福度 +${event.happiness}`;
    } else if (event.happiness < 0) {
      happinessChange.textContent = `😢 幸福度 ${event.happiness}`;
    } else {
      happinessChange.textContent = "";
    }

    if (event.job) {
      jobChange.textContent = `💼 ${event.job}`;
    } else {
      jobChange.textContent = "";
    }
  }

  // ==============================
  // 通常イベント
  // ==============================
  function triggerEvent(position) {
    const event = map[position];
  
    if (!event) {
      moving = false;
      rollButton.disabled = false;
      return;
    }
  
    player.money += event.money || 0;
    player.happiness += event.happiness || 0;
  
    if (event.job) {
      player.job = event.job;
    }
  
    player.appearance = getLifeAppearance();
  
    updateUI();
    showEvent(event, position);
    playEventSound(event);
  
    // ==============================
    // ゴール
    // ==============================
    if (position === 20) {
      moving = false;
      rollButton.disabled = true;
      rollButton.textContent = "🏁 ゴールしました！";
  
      eventType.textContent = "🎉 GAME CLEAR";
      visualMain.textContent = "🏆";
  
      eventTitle.textContent = "人生ゲームクリア！";
  
      player.age += 50;
      eventText.innerHTML = `
        <strong>あなたの人生がゴールしました！</strong><br><br>
        💰 最終所持金：<strong>${formatMoney(player.money)}</strong><br>
        😊 最終幸福度：<strong>${player.happiness}</strong><br>
        🎂 年齢：<strong>${player.age}歳</strong><br>
        💼 最終職業：<strong>${player.job}</strong>
      `;
  
/*      moneyChange.textContent =
        `💰 最終所持金 ${formatMoney(player.money)}`;
  
      happinessChange.textContent =
        `😊 最終幸福度 ${player.happiness}`;
  
      jobChange.textContent =
        `💼 ${player.job}`;
*/
      playTone(523, 0.15, "triangle", 0.07);
  
      setTimeout(() => {
        playTone(659, 0.15, "triangle", 0.07);
      }, 150);
  
      setTimeout(() => {
        playTone(784, 0.3, "triangle", 0.07);
      }, 300);
  
      return;
    }
  
    // ==============================
    // 通常イベント終了
    // 次のサイコロを振れるようにする
    // ==============================
    moving = false;
    rollButton.disabled = false;
    rollButton.textContent = "🎲 サイコロを振る";
  }

  // ==============================
  // プレイヤー移動
  // ==============================
  function movePlayer(steps) {
    let moved = 0;
  
    moving = true;
    rollButton.disabled = true;
  
    moveTimer = setInterval(() => {
  
      // ==============================
      // 1マス進む
      // ==============================
      player.position++;
      moved++;
  
      // ゴールを超えない
      if (player.position >= 20) {
        player.position = 20;
        moved = steps;
      }
  
      updatePlayerPosition(true);
      updateUI();
      playStepSound();
  
      // ==============================
      // 就職「4」に着いたら必ず停止
      // ==============================
      if (player.position === 4) {
        clearInterval(moveTimer);
        moveTimer = null;
  
        setTimeout(() => {
          showJobArrival();
        }, 350);
  
        return;
      }
  
      // ==============================
      // 人生の分かれ道「19」に着いたら必ず停止
      // ==============================
      if (player.position === 19) {
        clearInterval(moveTimer);
        moveTimer = null;
  
        setTimeout(() => {
          showBranchArrival();
        }, 350);
  
        return;
      }
  
      // ==============================
      // サイコロの歩数を進み終わった
      // ==============================
      if (moved >= steps) {
        clearInterval(moveTimer);
        moveTimer = null;
  
        const currentPosition = player.position;
  
        setTimeout(() => {
          triggerEvent(currentPosition);
        }, 350);
  
        return;
      }
  
    }, 400);
  }
  // ==============================
  // サイコロアニメーション
  // ==============================
  function animateDice(diceElement, callback) {
    diceElement.classList.add("rolling");
  
    let count = 0;
  
    const timer = setInterval(() => {
      const value = Math.floor(Math.random() * 6) + 1;
  
      diceElement.textContent =
        ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"][value - 1];
  
      count++;
  
      if (count >= 8) {
        clearInterval(timer);
  
        diceElement.classList.remove("rolling");
  
        callback(value);
      }
    }, 90);
  }

  // ==============================
  // 通常サイコロ
  // ==============================
  function rollDice() {
    if (moving) return;
  
    initAudio();
  
    moving = true;
    rollButton.disabled = true;
  
    animateDice(diceEl, (result) => {
  
      diceEl.textContent =
        ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"][result - 1];
  
      playDiceResultSound(result);
  
      setTimeout(() => {
        movePlayer(result);
      }, 250);
    });
  }
  // ==============================
  // 就職
  // ==============================
  function showJobArrival() {
    jobModal.classList.add("active");
    jobResult.textContent = "";
    jobDice.textContent = "🎲";
    jobRollButton.disabled = false;

    playTone(523, 0.12, "triangle", 0.05);
  }

  function rollJobDice() {
    initAudio();

    jobRollButton.disabled = true;

    animateDice(jobDice, (result) => {
      jobDice.textContent = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"][result - 1];

      playDiceResultSound(result);

      const selectedJob = jobs[result - 1];

      player.job = selectedJob.name;
      player.money += selectedJob.money;
      player.happiness += selectedJob.happiness;
      player.appearance = selectedJob.appearance;

      updateUI();

      jobResult.textContent =
        `${selectedJob.icon} ${selectedJob.name}に決定！`;

      setTimeout(() => {
        jobModal.classList.remove("active");

        showEvent(
          {
            title: "就職決定！",
            icon: selectedJob.icon,
            text: `${selectedJob.name}として人生をスタート！`,
            money: selectedJob.money,
            happiness: selectedJob.happiness
          },
          4
        );

        moving = false;
        rollButton.disabled = false;
      }, 1500);
    });
  }

  // ==============================
  // 分かれ道
  // ==============================
  function showBranchArrival() {
    branchModal.classList.add("active");
    branchResult.textContent = "";
    branchDice.textContent = "🎲";
    branchRollButton.disabled = false;

    playTone(440, 0.12, "triangle", 0.05);
  }

  function rollBranchDice() {
    initAudio();

    branchRollButton.disabled = true;

    animateDice(branchDice, (result) => {
      branchDice.textContent = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"][result - 1];

      playDiceResultSound(result);

      setTimeout(() => {
        handleBranchResult(result);
      }, 400);
    });
  }

  function handleBranchResult(result) {
    const destinations = {
      1: 20,
      2: 4,
      3: 11,
      4: "gameover",
      5: 14,
      6: 15
    };

    const destination = destinations[result];

    if (destination === "gameover") {
      branchResult.textContent = "💥 ゲームオーバー！";

      playTone(180, 0.4, "sawtooth", 0.05);

      setTimeout(() => {
        branchModal.classList.remove("active");

        eventType.textContent = "GAME OVER";
        visualMain.textContent = "💥";
        eventTitle.textContent = "ゲームオーバー";
        eventText.textContent =
          "人生の分かれ道でゲームオーバーになってしまった……。";
        moneyChange.textContent = "";
        happinessChange.textContent = "";
        jobChange.textContent = "";

        moving = false;
        rollButton.disabled = true;
        rollButton.textContent = "💥 ゲームオーバー";
      }, 1200);

      return;
    }

    branchResult.textContent =
      `➡️ ${map[destination].title}へ！`;

    setTimeout(() => {
      branchModal.classList.remove("active");

      player.position = destination;
      updateUI();
      updatePlayerPosition(true);

      setTimeout(() => {
        if (destination === 4) {
          showJobArrival();
        } else if (destination === 20) {
          triggerEvent(20);
        } else {
          triggerEvent(destination);
        }
      }, 400);
    }, 1000);
  }

  // ==============================
  // キャラクター選択
  // ==============================
  function showCharacterSelection() {
    characterModal.classList.add("active");
    characterStartButton.disabled = true;
    characterSelected = false;

    characterOptions.forEach((option) => {
      option.classList.remove("selected");
    });
  }

  function selectCharacter(type) {
    if (!characterTypes[type]) return;

    player.character = type;
    player.appearance = characterTypes[type].icon;
    characterSelected = true;

    characterOptions.forEach((option) => {
      option.classList.toggle("selected", option.dataset.character === type);
    });

    characterStartButton.disabled = false;
    visualMain.textContent = player.appearance;
  }

  function startGameWithCharacter() {
    if (!characterSelected) return;

    initAudio();
    player.position = 0;
    player.age = 18;
    player.job = "未就職";
    player.appearance = characterTypes[player.character].icon;

    characterModal.classList.remove("active");
    rollButton.disabled = false;
    updateUI();

    visualMain.textContent = player.appearance;
    eventTitle.textContent = "人生スタート！";
    eventText.textContent = `${characterTypes[player.character].name}を選んで人生スタート！`;
    playTone(523, 0.12, "triangle", 0.05);
  }

  // ==============================
  // リスタート
  // ==============================
  function restart() {
    initAudio();

    if (moveTimer) {
      clearInterval(moveTimer);
      moveTimer = null;
    }

    stopBGM();

    player = { ...initialPlayer };
    moving = false;
    characterSelected = false;

    jobModal.classList.remove("active");
    branchModal.classList.remove("active");

    rollButton.disabled = true;
    rollButton.textContent = "🎲 サイコロを振る";

    diceEl.textContent = "🎲";
    jobDice.textContent = "🎲";
    branchDice.textContent = "🎲";

    jobResult.textContent = "";
    branchResult.textContent = "";

    visualMain.textContent = "🧒";
    eventType.textContent = "LIFE EVENT";
    eventTitle.textContent = "人生スタート！";
    eventText.textContent = "サイコロを振って人生を始めよう！";
    moneyChange.textContent = "";
    happinessChange.textContent = "";
    jobChange.textContent = "";

    createBoard();
    updateUI();
    showCharacterSelection();
  }

  // ==============================
  // イベント
  // ==============================
  characterOptions.forEach((option) => {
    option.addEventListener("click", () => {
      initAudio();
      selectCharacter(option.dataset.character);
    });
  });

  characterStartButton.addEventListener("click", () => {
    startGameWithCharacter();
  });

  rollButton.addEventListener("click", () => {
    initAudio();
    rollDice();
  });

  restartButton.addEventListener("click", () => {
    initAudio();
    restart();
  });

  jobRollButton.addEventListener("click", () => {
    initAudio();
    rollJobDice();
  });

  branchRollButton.addEventListener("click", () => {
    initAudio();
    rollBranchDice();
  });

  bgmButton.addEventListener("click", () => {
    initAudio();

    if (bgmOn) {
      stopBGM();
      bgmButton.textContent = "🎵 BGM OFF";
    } else {
      startBGM();
      bgmButton.textContent = "🎵 BGM ON";
    }
  });

  seButton.addEventListener("click", () => {
    initAudio();

    seOn = !seOn;
    seButton.textContent = seOn ? "🔊 SE ON" : "🔇 SE OFF";

    if (seOn) {
      playTone(660, 0.1, "triangle", 0.05);
    }
  });

  // ==============================
  // 初期化
  // ==============================
  createBoard();
  updateUI();
  rollButton.disabled = true;
  showCharacterSelection();
});
