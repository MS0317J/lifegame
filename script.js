"use strict";

/* =====================================================
   超簡単！人生ゲーム
   完全版 JavaScript
===================================================== */


/* =====================================================
   ゲームデータ
===================================================== */

const GOAL = 20;

const initialPlayer = {
  position: 0,
  money: 1000000,
  happiness: 50,
  job: "無職"
};

let player = { ...initialPlayer };

let isMoving = false;
let bgmEnabled = false;
let seEnabled = true;

let audioContext = null;
let bgmTimer = null;


/* =====================================================
   マップ
===================================================== */

const map = [

  {
    position: 0,
    name: "スタート",
    icon: "🚩",
    type: "start",
    visual: "fun",
    sound: "goal"
  },

  {
    position: 1,
    name: "コンビニ",
    icon: "🏪",
    money: -500,
    happiness: 1,
    visual: "fun",
    sound: "shop"
  },

  {
    position: 2,
    name: "アルバイト",
    icon: "💼",
    money: 30000,
    happiness: 2,
    visual: "job",
    sound: "job",
    job: "アルバイト"
  },

  {
    position: 3,
    name: "遊園地",
    icon: "🎢",
    money: -5000,
    happiness: 10,
    visual: "amusement",
    sound: "amusement"
  },

  {
    position: 4,
    name: "就職",
    icon: "👔",
    type: "job",
    visual: "job",
    sound: "job"
  },

  {
    position: 5,
    name: "給料日",
    icon: "💴",
    money: 300000,
    happiness: 3,
    visual: "money",
    sound: "salary"
  },

  {
    position: 6,
    name: "旅行",
    icon: "✈️",
    money: -50000,
    happiness: 15,
    visual: "travel",
    sound: "travel"
  },

  {
    position: 7,
    name: "宝くじ",
    icon: "🎫",
    money: 100000,
    happiness: 3,
    visual: "money",
    sound: "lucky"
  },

  {
    position: 8,
    name: "病院",
    icon: "🏥",
    money: -30000,
    happiness: -5,
    visual: "hospital",
    sound: "hospital"
  },

  {
    position: 9,
    name: "引っ越し",
    icon: "🏠",
    money: -100000,
    happiness: 8,
    visual: "house",
    sound: "house"
  },

  {
    position: 10,
    name: "昇進",
    icon: "📈",
    money: 300000,
    happiness: 10,
    visual: "job",
    sound: "promotion",
    job: "係長"
  },

  {
    position: 11,
    name: "結婚",
    icon: "💍",
    money: -100000,
    happiness: 20,
    visual: "marriage",
    sound: "marriage"
  },

  {
    position: 12,
    name: "ボーナス",
    icon: "💰",
    money: 500000,
    happiness: 8,
    visual: "money",
    sound: "bonus"
  },

  {
    position: 13,
    name: "趣味",
    icon: "🎮",
    money: -10000,
    happiness: 12,
    visual: "fun",
    sound: "fun"
  },

  {
    position: 14,
    name: "臨時収入",
    icon: "💵",
    money: 100000,
    happiness: 5,
    visual: "money",
    sound: "bonus"
  },

  {
    position: 15,
    name: "大出費",
    icon: "💸",
    money: -200000,
    happiness: -8,
    visual: "money",
    sound: "bad"
  },

  {
    position: 16,
    name: "ペット",
    icon: "🐶",
    money: -50000,
    happiness: 15,
    visual: "pet",
    sound: "pet"
  },

  {
    position: 17,
    name: "幸運",
    icon: "🍀",
    money: 200000,
    happiness: 10,
    visual: "lucky",
    sound: "lucky"
  },

  {
    position: 18,
    name: "休暇",
    icon: "🌴",
    money: -30000,
    happiness: 20,
    visual: "travel",
    sound: "travel"
  },

  {
    position: 19,
    name: "人生の分かれ道",
    icon: "🛣️",
    type: "branch",
    visual: "fun",
    sound: "fun"
  },

  {
    position: 20,
    name: "ゴール",
    icon: "🏁",
    type: "goal",
    visual: "lucky",
    sound: "goal"
  }

];


/* =====================================================
   職業
===================================================== */

const jobs = [

  {
    name: "公務員",
    icon: "🏢",
    money: 150000,
    happiness: 5
  },

  {
    name: "会社員",
    icon: "💼",
    money: 200000,
    happiness: 5
  },

  {
    name: "医師",
    icon: "🩺",
    money: 300000,
    happiness: 8
  },

  {
    name: "YouTuber",
    icon: "📱",
    money: 250000,
    happiness: 10
  },

  {
    name: "パティシエ",
    icon: "🍰",
    money: 180000,
    happiness: 12
  },

  {
    name: "プロスポーツ選手",
    icon: "⚽",
    money: 400000,
    happiness: 15
  }

];


/* =====================================================
   DOM
===================================================== */

let board;
let moneyElement;
let happinessElement;
let jobElement;
let positionText;

let dice;
let rollButton;
let restartButton;

let eventVisual;
let visualMain;
let eventType;
let eventTitle;
let eventText;

let moneyChangeElement;
let happinessChangeElement;
let jobChangeElement;

let bgmButton;
let seButton;

let jobModal;
let jobDice;
let jobRollButton;
let jobResult;

let branchModal;
let branchDice;
let branchRollButton;
let branchResult;


/* =====================================================
   初期化
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  board = document.getElementById("board");

  moneyElement = document.getElementById("money");
  happinessElement = document.getElementById("happiness");
  jobElement = document.getElementById("job");
  positionText = document.getElementById("positionText");

  dice = document.getElementById("dice");
  rollButton = document.getElementById("rollButton");
  restartButton = document.getElementById("restartButton");

  eventVisual = document.getElementById("eventVisual");
  visualMain = document.getElementById("visualMain");
  eventType = document.getElementById("eventType");
  eventTitle = document.getElementById("eventTitle");
  eventText = document.getElementById("eventText");

  moneyChangeElement = document.getElementById("moneyChange");
  happinessChangeElement = document.getElementById("happinessChange");
  jobChangeElement = document.getElementById("jobChange");

  bgmButton = document.getElementById("bgmButton");
  seButton = document.getElementById("seButton");

  jobModal = document.getElementById("jobModal");
  jobDice = document.getElementById("jobDice");
  jobRollButton = document.getElementById("jobRollButton");
  jobResult = document.getElementById("jobResult");

  branchModal = document.getElementById("branchModal");
  branchDice = document.getElementById("branchDice");
  branchRollButton = document.getElementById("branchRollButton");
  branchResult = document.getElementById("branchResult");


  createBoard();
  updateUI();

  rollButton.addEventListener("click", rollNormalDice);
  restartButton.addEventListener("click", restartGame);

  bgmButton.addEventListener("click", toggleBGM);
  seButton.addEventListener("click", toggleSE);

  jobRollButton.addEventListener("click", rollJobDice);
  branchRollButton.addEventListener("click", rollBranchDice);

  showWelcome();

});


/* =====================================================
   盤面作成
===================================================== */

function createBoard() {

  board.innerHTML = "";

  map.forEach(cell => {

    const div = document.createElement("div");

    div.className = "cell";
    div.dataset.position = cell.position;

    div.innerHTML = `
      <span class="cell-number">${cell.position}</span>
      <div class="cell-icon">${cell.icon}</div>
      <div class="cell-name">${cell.name}</div>
    `;

    board.appendChild(div);

  });

}


/* =====================================================
   UI更新
===================================================== */

function updateUI() {

  moneyElement.textContent =
    `${player.money.toLocaleString("ja-JP")}円`;

  happinessElement.textContent =
    player.happiness;

  jobElement.textContent =
    player.job;

  const currentCell = map[player.position];

  positionText.textContent =
    currentCell ? currentCell.name : "";

  document.querySelectorAll(".cell").forEach(cell => {

    cell.classList.remove("current");

    const oldPlayer =
      cell.querySelector(".player");

    if (oldPlayer) {
      oldPlayer.remove();
    }

  });


  const current =
    document.querySelector(
      `.cell[data-position="${player.position}"]`
    );

  if (current) {

    current.classList.add("current");

    const playerIcon =
      document.createElement("div");

    playerIcon.className = "player player-step";
    playerIcon.textContent = "🚗";

    current.appendChild(playerIcon);

  }

}


/* =====================================================
   ウェルカム
===================================================== */

function showWelcome() {

  showEvent(
    map[0],
    0,
    0,
    "サイコロを振って人生をスタートしよう！"
  );

}


/* =====================================================
   通常サイコロ
===================================================== */

async function rollNormalDice() {

  if (isMoving) {
    return;
  }

  if (player.position >= GOAL) {
    return;
  }

  isMoving = true;
  rollButton.disabled = true;

  startAudio();

  const result =
    await rollDiceAnimation(dice);

  await movePlayer(result);

}


/* =====================================================
   サイコロアニメーション
===================================================== */

function rollDiceAnimation(targetDice) {

  return new Promise(resolve => {

    targetDice.classList.add("rolling");

    playDiceSound();

    let count = 0;

    const timer =
      setInterval(() => {

        const random =
          Math.floor(Math.random() * 6) + 1;

        targetDice.textContent =
          diceFace(random);

        count++;

        if (count >= 12) {

          clearInterval(timer);

          const finalNumber =
            Math.floor(Math.random() * 6) + 1;

          targetDice.textContent =
            diceFace(finalNumber);

          targetDice.classList.remove("rolling");

          playDiceResultSound();

          setTimeout(() => {
            resolve(finalNumber);
          }, 300);

        }

      }, 80);

  });

}


/* =====================================================
   サイコロ絵文字
===================================================== */

function diceFace(number) {

  const faces = [
    "",
    "⚀",
    "⚁",
    "⚂",
    "⚃",
    "⚄",
    "⚅"
  ];

  return faces[number] || "🎲";

}


/* =====================================================
   コマ移動
===================================================== */

async function movePlayer(steps) {

  const targetPosition =
    Math.min(
      player.position + steps,
      GOAL
    );


  while (player.position < targetPosition) {

    player.position++;

    updateUI();

    playStepSound();

    await wait(400);

    /*
      就職マスは必ずここで停止
    */

    if (player.position === 4) {

      await showJobArrival();

      return;
    }


    /*
      分かれ道も必ずここで停止
    */

    if (player.position === 19) {

      await showBranchArrival();

      return;
    }

  }


  /*
    ゴール
  */

  if (player.position >= GOAL) {

    triggerEvent();

    finishGame();

    return;
  }


  /*
    通常マス
  */

  triggerEvent();

  unlockNormalGame();

}


/* =====================================================
   就職到着
===================================================== */

async function showJobArrival() {

  const cell = map[4];

  showEvent(
    cell,
    0,
    0,
    "ここでは職業サイコロを振って職業を決めよう！"
  );

  await wait(500);

  playEventSound("job");

  openJobModal();

}


/* =====================================================
   就職モーダル
===================================================== */

function openJobModal() {

  jobModal.classList.add("show");

  jobDice.textContent = "🎲";

  jobResult.textContent = "";

  jobRollButton.disabled = false;

}


/* =====================================================
   職業サイコロ
===================================================== */

async function rollJobDice() {

  if (jobRollButton.disabled) {
    return;
  }

  startAudio();

  jobRollButton.disabled = true;

  const result =
    await rollDiceAnimation(jobDice);

  const selectedJob =
    jobs[result - 1];


  const oldMoney =
    player.money;

  const oldHappiness =
    player.happiness;

  player.job =
    selectedJob.name;

  player.money +=
    selectedJob.money;

  player.happiness +=
    selectedJob.happiness;


  updateUI();


  jobResult.innerHTML = `
    ${selectedJob.icon} <strong>${selectedJob.name}</strong><br>
    <span>
      💰 +${selectedJob.money.toLocaleString("ja-JP")}円
      ／
      😊 +${selectedJob.happiness}
    </span>
  `;


  showEvent(
    map[4],
    player.money - oldMoney,
    player.happiness - oldHappiness,
    `職業が「${selectedJob.name}」に決まった！`
  );


  await wait(1800);


  jobModal.classList.remove("show");

  unlockNormalGame();

}


/* =====================================================
   分かれ道到着
===================================================== */

async function showBranchArrival() {

  const cell = map[19];

  showEvent(
    cell,
    0,
    0,
    "ここから人生の運命が分かれる！"
  );

  await wait(500);

  playEventSound("fun");

  openBranchModal();

}


/* =====================================================
   分かれ道モーダル
===================================================== */

function openBranchModal() {

  branchModal.classList.add("show");

  branchDice.textContent = "🎲";

  branchResult.textContent = "";

  branchRollButton.disabled = false;

}


/* =====================================================
   運命サイコロ
===================================================== */

async function rollBranchDice() {

  if (branchRollButton.disabled) {
    return;
  }

  startAudio();

  branchRollButton.disabled = true;

  const result =
    await rollDiceAnimation(branchDice);

  await handleBranchResult(result);

}


/* =====================================================
   分岐処理
===================================================== */

async function handleBranchResult(result) {

  switch (result) {

    /*
      1 → ゴール
    */

    case 1:

      branchResult.className =
        "modal-result goal";

      branchResult.innerHTML =
        "🏁 ゴールへ進む！";

      await wait(1200);

      branchModal.classList.remove("show");

      player.position = GOAL;

      updateUI();

      triggerEvent();

      finishGame();

      break;


    /*
      2 → 就職
    */

    case 2:

      branchResult.className =
        "modal-result return";

      branchResult.innerHTML =
        "👔 就職へ戻る！";

      await wait(1200);

      branchModal.classList.remove("show");

      player.position = 4;

      updateUI();

      await showJobArrival();

      break;


    /*
      3 → 結婚
    */

    case 3:

      branchResult.className =
        "modal-result return";

      branchResult.innerHTML =
        "💍 結婚へ戻る！";

      await wait(1200);

      branchModal.classList.remove("show");

      player.position = 11;

      updateUI();

      triggerEvent();

      unlockNormalGame();

      break;


    /*
      4 → 死亡
    */

    case 4:

      branchResult.className =
        "modal-result dead";

      branchResult.innerHTML =
        "💀 残念……人生ここで終了。";

      await wait(1500);

      branchModal.classList.remove("show");

      gameOver();

      break;


    /*
      5 → 臨時収入
    */

    case 5:

      branchResult.className =
        "modal-result goal";

      branchResult.innerHTML =
        "💵 臨時収入へ戻る！";

      await wait(1200);

      branchModal.classList.remove("show");

      player.position = 14;

      updateUI();

      triggerEvent();

      unlockNormalGame();

      break;


    /*
      6 → 大出費
    */

    case 6:

      branchResult.className =
        "modal-result dead";

      branchResult.innerHTML =
        "💸 大出費へ戻る！";

      await wait(1200);

      branchModal.classList.remove("show");

      player.position = 15;

      updateUI();

      triggerEvent();

      unlockNormalGame();

      break;

  }

}


/* =====================================================
   イベント発生
===================================================== */

function triggerEvent() {

  const cell =
    map[player.position];

  if (!cell) {
    return;
  }


  if (cell.type === "start") {

    showEvent(
      cell,
      0,
      0,
      "人生ゲームスタート！"
    );

    return;
  }


  if (cell.type === "goal") {

    showEvent(
      cell,
      0,
      0,
      "人生のゴールに到着！"
    );

    return;
  }


  if (cell.type === "job") {

    return;
  }


  if (cell.type === "branch") {

    return;
  }


  const oldMoney =
    player.money;

  const oldHappiness =
    player.happiness;

  const oldJob =
    player.job;


  player.money +=
    cell.money || 0;

  player.happiness +=
    cell.happiness || 0;


  if (cell.job) {
    player.job =
      cell.job;
  }


  updateUI();


  const moneyChange =
    player.money - oldMoney;

  const happinessChange =
    player.happiness - oldHappiness;

  const jobChanged =
    player.job !== oldJob;


  playEventSound(cell.sound);


  showEvent(
    cell,
    moneyChange,
    happinessChange,
    getEventMessage(cell),
    jobChanged
  );

}


/* =====================================================
   イベントメッセージ
===================================================== */

function getEventMessage(cell) {

  const messages = {

    "コンビニ":
      "ちょっと買い物。小さな幸せ！",

    "アルバイト":
      "アルバイトでお金を稼いだ！",

    "遊園地":
      "遊園地で思いっきり遊んだ！",

    "給料日":
      "待ちに待った給料日！",

    "旅行":
      "旅行に行ってリフレッシュ！",

    "宝くじ":
      "宝くじをゲット！",

    "病院":
      "病院でしっかり休もう。",

    "引っ越し":
      "新しい家で新生活！",

    "昇進":
      "仕事で評価されて昇進！",

    "結婚":
      "人生の大きなイベント！",

    "ボーナス":
      "うれしいボーナス！",

    "趣味":
      "好きなことを楽しもう！",

    "臨時収入":
      "突然の臨時収入！",

    "大出費":
      "うわっ……大きな出費！",

    "ペット":
      "かわいい家族が増えた！",

    "幸運":
      "今日は運がいい！",

    "休暇":
      "ゆっくり休んでリフレッシュ！"

  };


  return messages[cell.name]
    || `${cell.name}に止まった！`;

}


/* =====================================================
   イベント表示
===================================================== */

function showEvent(
  cell,
  moneyChange,
  happinessChange,
  text,
  jobChanged = false
) {

  visualMain.textContent =
    cell.icon;

  eventType.textContent =
    getEventType(cell);

  eventTitle.textContent =
    cell.name;

  eventText.textContent =
    text;


  setChange(
    moneyChangeElement,
    moneyChange,
    "money"
  );

  setChange(
    happinessChangeElement,
    happinessChange,
    "happiness"
  );


  if (jobChanged) {

    jobChangeElement.textContent =
      player.job;

  } else {

    jobChangeElement.textContent =
      "変化なし";

  }


  eventVisual.className =
    "event-visual";

  void eventVisual.offsetWidth;

  eventVisual.classList.add(
    `visual-${cell.visual || "fun"}`
  );

  eventVisual.classList.add(
    "event-refresh"
  );

  setTimeout(() => {
    eventVisual.classList.remove(
      "event-refresh"
    );
  }, 500);

}


/* =====================================================
   イベントタイプ
===================================================== */

function getEventType(cell) {

  if (cell.type === "start") {
    return "START";
  }

  if (cell.type === "goal") {
    return "GOAL";
  }

  if (cell.type === "job") {
    return "JOB EVENT";
  }

  if (cell.type === "branch") {
    return "DESTINY";
  }

  return "LIFE EVENT";

}


/* =====================================================
   数値変化表示
===================================================== */

function setChange(element, value, type) {

  element.classList.remove(
    "positive",
    "negative",
    "neutral"
  );


  if (value > 0) {

    element.textContent =
      `+${value.toLocaleString("ja-JP")}${type === "money" ? "円" : ""}`;

    element.classList.add(
      "positive"
    );

  } else if (value < 0) {

    element.textContent =
      `${value.toLocaleString("ja-JP")}${type === "money" ? "円" : ""}`;

    element.classList.add(
      "negative"
    );

  } else {

    element.textContent =
      type === "money"
        ? "±0円"
        : "±0";

    element.classList.add(
      "neutral"
    );

  }

}


/* =====================================================
   ゲーム状態解除
===================================================== */

function unlockNormalGame() {

  isMoving = false;

  if (player.position < GOAL) {
    rollButton.disabled = false;
  }

}


/* =====================================================
   ゴール
===================================================== */

function finishGame() {

  isMoving = true;

  rollButton.disabled = true;

  showEvent(
    map[GOAL],
    0,
    0,
    "🎉 人生ゲームクリア！おめでとう！"
  );


  setTimeout(() => {

    alert(
      `🎉 ゴール！\n\n` +
      `💰 所持金：${player.money.toLocaleString("ja-JP")}円\n` +
      `😊 幸福度：${player.happiness}\n` +
      `💼 職業：${player.job}`
    );

  }, 500);

}


/* =====================================================
   ゲームオーバー
===================================================== */

function gameOver() {

  isMoving = true;

  rollButton.disabled = true;

  showEvent(
    map[19],
    0,
    0,
    "💀 人生ゲームオーバー……"
  );


  setTimeout(() => {

    alert(
      `💀 GAME OVER\n\n` +
      `💰 所持金：${player.money.toLocaleString("ja-JP")}円\n` +
      `😊 幸福度：${player.happiness}\n` +
      `💼 職業：${player.job}`
    );

  }, 500);

}


/* =====================================================
   リスタート
===================================================== */

function restartGame() {

  player = {
    ...initialPlayer
  };

  isMoving = false;

  dice.textContent = "🎲";

  jobModal.classList.remove("show");
  branchModal.classList.remove("show");

  rollButton.disabled = false;

  updateUI();

  showWelcome();

}


/* =====================================================
   待機
===================================================== */

function wait(ms) {

  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });

}


/* =====================================================
   AUDIO
===================================================== */

function startAudio() {

  if (!audioContext) {

    const AudioContext =
      window.AudioContext ||
      window.webkitAudioContext;

    if (!AudioContext) {
      return;
    }

    audioContext =
      new AudioContext();

  }


  if (audioContext.state === "suspended") {

    audioContext.resume();

  }

}


/* =====================================================
   単音
===================================================== */

function playTone(
  frequency,
  duration,
  volume = 0.05,
  type = "sine",
  delay = 0
) {

  if (!seEnabled) {
    return;
  }

  startAudio();

  if (!audioContext) {
    return;
  }


  const oscillator =
    audioContext.createOscillator();

  const gain =
    audioContext.createGain();


  oscillator.type =
    type;

  oscillator.frequency.value =
    frequency;


  const startTime =
    audioContext.currentTime + delay;

  const endTime =
    startTime + duration;


  gain.gain.setValueAtTime(
    0.0001,
    startTime
  );

  gain.gain.exponentialRampToValueAtTime(
    volume,
    startTime + 0.01
  );

  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    endTime
  );


  oscillator.connect(gain);
  gain.connect(audioContext.destination);


  oscillator.start(startTime);
  oscillator.stop(endTime + 0.02);

}


/* =====================================================
   1マス移動音
===================================================== */

function playStepSound() {

  if (!seEnabled) {
    return;
  }

  playTone(
    520,
    0.08,
    0.07,
    "sine",
    0
  );

  playTone(
    780,
    0.08,
    0.05,
    "sine",
    0.08
  );

}


/* =====================================================
   サイコロ音
===================================================== */

function playDiceSound() {

  if (!seEnabled) {
    return;
  }

  for (let i = 0; i < 8; i++) {

    playTone(
      300 + Math.random() * 250,
      0.035,
      0.025,
      "square",
      i * 0.07
    );

  }

}


/* =====================================================
   サイコロ決定音
===================================================== */

function playDiceResultSound() {

  if (!seEnabled) {
    return;
  }

  playTone(
    500,
    0.1,
    0.07,
    "sine",
    0
  );

  playTone(
    750,
    0.15,
    0.08,
    "sine",
    0.12
  );

}


/* =====================================================
   マスごとの音
===================================================== */

function playEventSound(type) {

  if (!seEnabled) {
    return;
  }

  const sounds = {

    shop: [
      [700, 0.08],
      [900, 0.12]
    ],

    job: [
      [400, 0.1],
      [600, 0.15]
    ],

    amusement: [
      [523, 0.1],
      [659, 0.1],
      [784, 0.18]
    ],

    salary: [
      [700, 0.08],
      [900, 0.08],
      [1100, 0.15]
    ],

    bonus: [
      [523, 0.08],
      [659, 0.08],
      [784, 0.08],
      [1046, 0.2]
    ],

    travel: [
      [440, 0.1],
      [554, 0.1],
      [659, 0.18]
    ],

    hospital: [
      [500, 0.15],
      [350, 0.25]
    ],

    house: [
      [392, 0.1],
      [523, 0.2]
    ],

    promotion: [
      [523, 0.08],
      [659, 0.08],
      [880, 0.2]
    ],

    marriage: [
      [523, 0.08],
      [659, 0.08],
      [784, 0.08],
      [1046, 0.25]
    ],

    fun: [
      [600, 0.1],
      [800, 0.18]
    ],

    pet: [
      [700, 0.08],
      [900, 0.1],
      [700, 0.18]
    ],

    lucky: [
      [660, 0.08],
      [880, 0.08],
      [1320, 0.25]
    ],

    bad: [
      [300, 0.18],
      [180, 0.3]
    ],

    goal: [
      [523, 0.1],
      [659, 0.1],
      [784, 0.1],
      [1046, 0.3]
    ]

  };


  const sequence =
    sounds[type] || sounds.fun;


  sequence.forEach(
    ([frequency, duration], index) => {

      playTone(
        frequency,
        duration,
        0.06,
        type === "bad"
          ? "sawtooth"
          : "sine",
        index * 0.12
      );

    }
  );

}


/* =====================================================
   BGM
===================================================== */

const bgmNotes = [
  261.63,
  329.63,
  392.00,
  329.63,
  293.66,
  349.23,
  440.00,
  349.23
];

let bgmIndex = 0;


function startBGM() {

  if (!bgmEnabled) {
    return;
  }

  stopBGM();

  bgmIndex = 0;

  bgmTimer =
    setInterval(() => {

      if (!bgmEnabled) {
        return;
      }

      playBgmNote();

    }, 600);

}


function playBgmNote() {

  if (!audioContext) {
    startAudio();
  }

  if (!audioContext) {
    return;
  }


  const oscillator =
    audioContext.createOscillator();

  const gain =
    audioContext.createGain();


  oscillator.type =
    "sine";

  oscillator.frequency.value =
    bgmNotes[
      bgmIndex % bgmNotes.length
    ];


  const now =
    audioContext.currentTime;


  gain.gain.setValueAtTime(
    0.0001,
    now
  );

  gain.gain.exponentialRampToValueAtTime(
    0.018,
    now + 0.05
  );

  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    now + 0.5
  );


  oscillator.connect(gain);
  gain.connect(audioContext.destination);


  oscillator.start(now);
  oscillator.stop(now + 0.55);


  bgmIndex++;

}


function stopBGM() {

  if (bgmTimer) {

    clearInterval(
      bgmTimer
    );

    bgmTimer = null;

  }

}


/* =====================================================
   BGM ON/OFF
===================================================== */

function toggleBGM() {

  startAudio();

  bgmEnabled =
    !bgmEnabled;


  if (bgmEnabled) {

    bgmButton.textContent =
      "🎵 BGM ON";

    startBGM();

  } else {

    bgmButton.textContent =
      "🎵 BGM OFF";

    stopBGM();

  }

}


/* =====================================================
   SE ON/OFF
===================================================== */

function toggleSE() {

  seEnabled =
    !seEnabled;


  seButton.textContent =
    seEnabled
      ? "🔊 効果音 ON"
      : "🔇 効果音 OFF";

}
