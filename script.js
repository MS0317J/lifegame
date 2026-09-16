document.addEventListener("DOMContentLoaded", () => {

// ==============================
// DOM
// ==============================

const moneyEl = document.getElementById("money");
const happinessEl = document.getElementById("happiness");
const jobEl = document.getElementById("job");
const positionEl = document.getElementById("position");

const diceEl = document.getElementById("dice");
const boardEl = document.getElementById("board");

const rollButton = document.getElementById("rollButton");
const restartButton = document.getElementById("restartButton");

const eventVisual = document.getElementById("eventVisual");
const visualMain = document.getElementById("visualMain");
const eventType = document.getElementById("eventType");
const eventTitle = document.getElementById("eventTitle");
const eventText = document.getElementById("eventText");
const moneyChange = document.getElementById("moneyChange");
const happinessChange = document.getElementById("happinessChange");
const jobChange = document.getElementById("jobChange");

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
age: 6
};

let player = { ...initialPlayer };

let moving = false;
let moveTimer = null;

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
{
title: "スタート",
icon: "🚩",
money: 0,
happiness: 0,
text: "人生ゲームスタート！"
},
{
title: "コンビニ",
icon: "🏪",
money: -500,
happiness: 1,
text: "ちょっとお買い物。"
},
{
title: "アルバイト",
icon: "💼",
money: 30000,
happiness: 2,
job: "アルバイト",
text: "アルバイトでお金を稼いだ！"
},
{
title: "遊園地",
icon: "🎢",
money: -5000,
happiness: 10,
text: "遊園地で思いっきり遊んだ！"
},
{
title: "就職",
icon: "👔",
money: 0,
happiness: 0,
text: "いよいよ就職！"
},
{
title: "給料日",
icon: "💴",
money: 300000,
happiness: 3,
text: "給料が入った！"
},
{
title: "旅行",
icon: "✈️",
money: -50000,
happiness: 15,
text: "楽しい旅行に出かけた！"
},
{
title: "宝くじ",
icon: "🎫",
money: 100000,
happiness: 3,
text: "宝くじが当たった！"
},
{
title: "病院",
icon: "🏥",
money: -30000,
happiness: -5,
text: "ちょっと体調を崩してしまった。"
},
{
title: "引っ越し",
icon: "🏠",
money: -100000,
happiness: 8,
text: "新しい家で新生活！"
},
{
title: "昇進",
icon: "📈",
money: 300000,
happiness: 10,
job: "係長",
text: "仕事を頑張って昇進した！"
},
{
title: "結婚",
icon: "💍",
money: -100000,
happiness: 20,
text: "人生の大きなイベント！"
},
{
title: "ボーナス",
icon: "💰",
money: 500000,
happiness: 8,
text: "ボーナスが出た！"
},
{
title: "趣味",
icon: "🎮",
money: -10000,
happiness: 12,
text: "好きなことを思いっきり楽しんだ！"
},
{
title: "臨時収入",
icon: "💵",
money: 100000,
happiness: 5,
text: "思わぬ臨時収入！"
},
{
title: "大出費",
icon: "💸",
money: -200000,
happiness: -8,
text: "大きな出費が発生した……。"
},
{
title: "ペット",
icon: "🐶",
money: -50000,
happiness: 15,
text: "かわいいペットを飼い始めた！"
},
{
title: "幸運",
icon: "🍀",
money: 200000,
happiness: 10,
text: "ラッキー！いいことが起きた！"
},
{
title: "休暇",
icon: "🌴",
money: -30000,
happiness: 20,
text: "ゆっくり休んでリフレッシュ！"
},
{
title: "人生の分かれ道",
icon: "🛣️",
money: 0,
happiness: 0,
text: "ここから人生の行き先が決まる！"
},
{
title: "ゴール",
icon: "🏁",
money: 0,
happiness: 0,
text: "人生ゲーム、ゴール！"
}
];

// ==============================
// キャラクター
// ==============================

function getLifeAppearance() {

```
// 職業が決まった後は職業の姿を優先
const selectedJob = jobs.find(j => j.name === player.job);

if (selectedJob) {
  return selectedJob.appearance;
}

if (player.job === "係長") {
  return "🧑‍💼";
}

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
```

}

// ==============================
// 音
// ==============================

let audioContext = null;
let bgmTimer = null;
let bgmOn = false;
let seOn = true;

function initAudio() {
if (!audioContext) {
const AudioCtx = window.AudioContext || window.webkitAudioContext;

```
  if (AudioCtx) {
    audioContext = new AudioCtx();
  }
}

if (audioContext && audioContext.state === "suspended") {
  audioContext.resume();
}
```

}

function playTone(frequency, duration = 0.08, type = "sine", volume = 0.04) {

```
if (!seOn || !audioContext) return;

try {
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = type;
  oscillator.frequency.value = frequency;

  gain.gain.setValueAtTime(volume, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(
    0.001,
    audioContext.currentTime + duration
  );

  oscillator.connect(gain);
  gain.connect(audioContext.destination);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);
} catch (e) {
  console.log(e);
}
```

}

function playStepSound() {
playTone(520, 0.06, "square", 0.025);
}

function playDiceResultSound() {
playTone(660, 0.08, "sine", 0.04);

```
setTimeout(() => {
  playTone(880, 0.12, "sine", 0.04);
}, 90);
```

}

function playEventSound() {
playTone(523, 0.08, "sine", 0.04);

```
setTimeout(() => {
  playTone(659, 0.08, "sine", 0.04);
}, 90);

setTimeout(() => {
  playTone(784, 0.14, "sine", 0.04);
}, 180);
```

}

// ==============================
// BGM
// ==============================

function startBGM() {

```
if (!audioContext || bgmOn) return;

bgmOn = true;

const notes = [262, 330, 392, 330];

let index = 0;

bgmTimer = setInterval(() => {

  if (!bgmOn) return;

  playTone(notes[index], 0.16, "triangle", 0.012);

  index = (index + 1) % notes.length;

}, 420);
```

}

function stopBGM() {

```
bgmOn = false;

if (bgmTimer) {
  clearInterval(bgmTimer);
  bgmTimer = null;
}
```

}

// ==============================
// サウンドボタン
// ==============================

const bgmButton = document.getElementById("bgmButton");
const seButton = document.getElementById("seButton");

if (bgmButton) {
bgmButton.addEventListener("click", () => {

```
  initAudio();

  if (bgmOn) {
    stopBGM();
    bgmButton.textContent = "🎵 BGM OFF";
  } else {
    startBGM();
    bgmButton.textContent = "🎵 BGM ON";
  }
});
```

}

if (seButton) {
seButton.addEventListener("click", () => {

```
  initAudio();

  seOn = !seOn;

  seButton.textContent = seOn
    ? "🔊 SE ON"
    : "🔇 SE OFF";
});
```

}

// ==============================
// 盤面作成
// ==============================

function createBoard() {

```
boardEl.innerHTML = "";

map.forEach((cell, index) => {

  const cellEl = document.createElement("div");

  cellEl.className = "cell";
  cellEl.dataset.position = index;

  cellEl.innerHTML = `
    <div class="cell-number">${index}</div>
    <div class="cell-icon">${cell.icon}</div>
    <div class="cell-title">${cell.title}</div>
  `;

  boardEl.appendChild(cellEl);
});

updatePlayerPosition(false);
```

}

// ==============================
// UI更新
// ==============================

function updateUI() {

```
moneyEl.textContent =
  player.money.toLocaleString("ja-JP") + "円";

happinessEl.textContent =
  player.happiness;

jobEl.textContent =
  player.job;

positionEl.textContent =
  `${player.position} / 20`;

player.age =
  Math.min(86, 6 + player.position * 4);
```

}

// ==============================
// プレイヤー表示
// ==============================

function updatePlayerPosition(walking = false) {

```
document.querySelectorAll(".player").forEach(el => {
  el.remove();
});

document.querySelectorAll(".cell").forEach(cell => {
  cell.classList.remove("player-here");
});

const cell = document.querySelector(
  `.cell[data-position="${player.position}"]`
);

if (!cell) return;

const playerEl = document.createElement("div");

playerEl.className = "player";

if (walking) {
  playerEl.classList.add("walking");
}

playerEl.textContent = getLifeAppearance();

cell.appendChild(playerEl);

cell.classList.add("player-here");

if (!walking) {
  playerEl.classList.add("arrived");
}
```

}

// ==============================
// イベント表示
// ==============================

function showEvent(
type,
title,
text,
money = 0,
happiness = 0,
job = ""
) {

```
eventType.textContent = type;
eventTitle.textContent = title;
eventText.textContent = text;

moneyChange.textContent =
  money === 0
    ? ""
    : `${money > 0 ? "+" : ""}${money.toLocaleString("ja-JP")}円`;

happinessChange.textContent =
  happiness === 0
    ? ""
    : `${happiness > 0 ? "+" : ""}${happiness}`;

jobChange.textContent =
  job
    ? `職業：${job}`
    : "";

eventVisual.classList.remove("event-pop");

void eventVisual.offsetWidth;

eventVisual.classList.add("event-pop");

visualMain.textContent = map[player.position]?.icon || "🎲";

playEventSound();
```

}

// ==============================
// マスイベント
// ==============================

function triggerEvent(position) {

```
const event = map[position];

if (!event) {
  moving = false;
  rollButton.disabled = false;
  return;
}

// ゴール
if (position === 20) {

  showEvent(
    "🎉 ゴール",
    "人生ゲーム ゴール！",
    `人生おつかれさま！ ${player.age}歳でゴールしました！`,
    0,
    0,
    ""
  );

  rollButton.disabled = true;
  moving = false;

  return;
}

// 就職・分かれ道は専用処理
if (position === 4 || position === 19) {
  return;
}

player.money += event.money;
player.happiness += event.happiness;

if (event.job) {
  player.job = event.job;
}

player.appearance = getLifeAppearance();

updateUI();
updatePlayerPosition(false);

showEvent(
  "📍 イベント",
  event.title,
  event.text,
  event.money,
  event.happiness,
  event.job || ""
);

// 通常イベント終了後は必ず再びサイコロを押せる
setTimeout(() => {
  moving = false;
  rollButton.disabled = false;
}, 900);
```

}

// ==============================
// プレイヤー移動
// ==============================

function movePlayer(steps) {

```
moving = true;
rollButton.disabled = true;

let moved = 0;

moveTimer = setInterval(() => {

  if (moved >= steps) {

    clearInterval(moveTimer);
    moveTimer = null;

    moving = false;

    updateUI();
    updatePlayerPosition(false);

    // 就職
    if (player.position === 4) {
      setTimeout(showJobArrival, 250);
      return;
    }

    // 人生の分かれ道
    if (player.position === 19) {
      setTimeout(showBranchArrival, 250);
      return;
    }

    // ゴール
    if (player.position === 20) {
      triggerEvent(20);
      return;
    }

    triggerEvent(player.position);

    return;
  }

  player.position++;

  moved++;

  player.appearance = getLifeAppearance();

  updateUI();
  updatePlayerPosition(true);

  playStepSound();

}, 400);
```

}

// ==============================
// 通常サイコロ
// ==============================

function rollDice() {

```
if (moving) return;

initAudio();

rollButton.disabled = true;

const result =
  Math.floor(Math.random() * 6) + 1;

diceEl.classList.remove("rolling");

void diceEl.offsetWidth;

diceEl.classList.add("rolling");

diceEl.textContent = "🎲";

setTimeout(() => {

  diceEl.textContent = result;

  playDiceResultSound();

  setTimeout(() => {
    movePlayer(result);
  }, 350);

}, 700);
```

}

// ==============================
// 就職イベント
// ==============================

function showJobArrival() {

```
jobModal.classList.add("show");

jobResult.textContent =
  "サイコロを振って職業を決めよう！";

jobDice.textContent = "🎲";

jobRollButton.disabled = false;

playEventSound();
```

}

function rollJobDice() {

```
initAudio();

jobRollButton.disabled = true;

const result =
  Math.floor(Math.random() * 6) + 1;

jobDice.classList.remove("rolling");

void jobDice.offsetWidth;

jobDice.classList.add("rolling");

setTimeout(() => {

  jobDice.textContent = result;

  const selectedJob =
    jobs[result - 1];

  player.job =
    selectedJob.name;

  player.money +=
    selectedJob.money;

  player.happiness +=
    selectedJob.happiness;

  player.appearance =
    selectedJob.appearance;

  updateUI();
  updatePlayerPosition(false);

  jobResult.innerHTML = `
    <strong>${selectedJob.icon} ${selectedJob.name}</strong><br>
    給料 +${selectedJob.money.toLocaleString("ja-JP")}円<br>
    幸福度 +${selectedJob.happiness}
  `;

  playDiceResultSound();

  showEvent(
    "👔 就職",
    `${selectedJob.icon} ${selectedJob.name}に決定！`,
    "これから新しい人生が始まる！",
    selectedJob.money,
    selectedJob.happiness,
    selectedJob.name
  );

  setTimeout(() => {

    jobModal.classList.remove("show");

    moving = false;
    rollButton.disabled = false;

    updateUI();
    updatePlayerPosition(false);

  }, 1800);

}, 800);
```

}

// ==============================
// 分かれ道
// ==============================

function showBranchArrival() {

```
branchModal.classList.add("show");

branchResult.textContent =
  "運命のサイコロを振ろう！";

branchDice.textContent = "🎲";

branchRollButton.disabled = false;

playEventSound();
```

}

function rollBranchDice() {

```
initAudio();

branchRollButton.disabled = true;

const result =
  Math.floor(Math.random() * 6) + 1;

branchDice.classList.remove("rolling");

void branchDice.offsetWidth;

branchDice.classList.add("rolling");

setTimeout(() => {

  branchDice.textContent = result;

  handleBranchResult(result);

}, 800);
```

}

function handleBranchResult(result) {

```
let message = "";

switch (result) {

  case 1:
    player.position = 20;
    message = "そのままゴールへ！";
    break;

  case 2:
    player.position = 4;
    message = "就職へ戻る！";
    break;

  case 3:
    player.position = 11;
    message = "結婚へ進む！";
    break;

  case 4:
    message = "人生ゲーム終了……！";
    break;

  case 5:
    player.position = 14;
    message = "臨時収入へ！";
    break;

  case 6:
    player.position = 15;
    message = "大出費へ……！";
    break;
}

branchResult.innerHTML = `
  <strong>🎲 ${result}</strong><br>
  ${message}
`;

playDiceResultSound();

updateUI();
updatePlayerPosition(false);

setTimeout(() => {

  branchModal.classList.remove("show");

  // 4 = ゲームオーバー
  if (result === 4) {

    showEvent(
      "💥 GAME OVER",
      "人生ゲーム終了",
      "ここで人生ゲームは終了です。",
      0,
      0,
      ""
    );

    moving = false;
    rollButton.disabled = true;

    return;
  }

  // ゴール
  if (player.position === 20) {
    triggerEvent(20);
    return;
  }

  // 就職
  if (player.position === 4) {
    showJobArrival();
    return;
  }

  // その他
  triggerEvent(player.position);

}, 1200);
```

}

// ==============================
// リスタート
// ==============================

function restart() {

```
initAudio();

if (moveTimer) {
  clearInterval(moveTimer);
  moveTimer = null;
}

player = {
  ...initialPlayer
};

moving = false;

jobModal.classList.remove("show");
branchModal.classList.remove("show");

diceEl.textContent = "🎲";

updateUI();
createBoard();

eventType.textContent = "人生ゲーム";
eventTitle.textContent = "もう一度スタート！";
eventText.textContent =
  "サイコロを振って人生を進もう！";

moneyChange.textContent = "";
happinessChange.textContent = "";
jobChange.textContent = "";

visualMain.textContent = "🚩";

rollButton.disabled = false;
```

}

// ==============================
// ボタン
// ==============================

rollButton.addEventListener("click", rollDice);

restartButton.addEventListener("click", restart);

jobRollButton.addEventListener("click", rollJobDice);

branchRollButton.addEventListener("click", rollBranchDice);

// ==============================
// iPhone Safari対策
// ==============================

document.addEventListener(
"touchstart",
() => {
initAudio();
},
{ once: true }
);

document.addEventListener(
"click",
() => {
initAudio();
},
{ once: true }
);

// ==============================
// 初期化
// ==============================

updateUI();
createBoard();

});
