// ゲームスピード
const GAME_SPEED = 1000 / 60;

// 画面サイズ
const SCREEN_W = 180;
const SCREEN_H = 320;

// キャンバスサイズ
const CANVAS_W = SCREEN_W * 2;
const CANVAS_H = SCREEN_H * 2;

// フィールドのサイズ
const FIELD_W = SCREEN_W + 120;
const FIELD_H = SCREEN_H + 40;

// 星の数
const STAR_MAX = 300;

// デバックのフラグ
const DEBUG = true;

let drawCount = 0;
let fps = 0;
let lastTime = Date.now();

// スムージング
const SMOOTHING = false;

// ファイルを読み込む
let spriteImage = new Image();
spriteImage.src = 'sprite.png';

// キャンバス
let can = document.getElementById('can');
let con = can.getContext('2d');
can.width = CANVAS_W;
can.height = CANVAS_H;
con.mozimageSmoothingEnagbled = SMOOTHING;
con.webkitimageSmoothingEnabled = SMOOTHING;
con.msimageSmoothingEnabled = SMOOTHING;
con.imageSmoothingEnabled = SMOOTHING;

// フィールド(仮想画面)
let vcan = document.createElement('canvas');
let vcon = vcan.getContext('2d');
vcan.width = FIELD_W;
vcan.height = FIELD_H;

// カメラの座標
let camera_x = 0;
let camera_y = 0;

// 星の実体
let star = [];

// キーボードの状態
let key = {};

// 現在使用中のスプライトインデックス
let currentSpriteIndex = 0;

// object達を定義
let tama = [];
let enemyTama = [];
let enemy = [];

// 自機のインスタンスを生成
let playerCharacter = new PlayerCharacter({ drawSprite });

// ゲーム初期化
function gameInit() {
  for (let i = 0; i < STAR_MAX; i++) star[i] = new Star();
  setInterval(gameLoop, GAME_SPEED);
}

// objectUpdate
function updateObj(obj) {
  for (let i = obj.length - 1; i >= 0; i--) {
    obj[i].update();
    if (obj[i].kill) {
      obj.splice(i, 1);
    }
  }
}

// Movement process
function movementProcess() {
  // 星の処理
  updateObj(star);

  // 敵の処理
  updateObj(enemy);

  // 弾の処理
  updateObj(enemyTama);

  // 弾の処理
  updateObj(tama);

  playerCharacter.update();
}

// Drawing process
function drawingProcess() {
  // 描画の処理
  vcon.fillStyle = 'black';
  vcon.fillRect(0, 0, FIELD_W, FIELD_H);

  // 星の描写
  drawObj(star);

  // 敵の描写
  drawObj(enemy);

  // 弾の描画
  drawObj(enemyTama);

  // 弾の描画
  drawObj(tama);

  // 自機の描画
  playerCharacter.draw();

  // 自機の範囲 0 ～ FIELD_W
  // カメラの範囲 0 ～ (FIELD_W-SCREEN_W)
  camera_x = ((playerCharacter.x >> 8) / FIELD_W) * (FIELD_W - SCREEN_W);
  camera_y = ((playerCharacter.y >> 8) / FIELD_H) * (FIELD_H - SCREEN_H);

  // 仮想画面から実際のキャンバスにコピー
  con.drawImage(
    vcan,
    camera_x,
    camera_y,
    SCREEN_W,
    SCREEN_H,
    0,
    0,
    CANVAS_W,
    CANVAS_H
  );
}

// Information Display
function putInfo() {
  if (DEBUG) {
    drawCount++;
    if (lastTime + 1000 <= Date.now()) {
      fps = drawCount;
      drawCount = 0;
      lastTime = Date.now();
    }

    con.font = "20px 'Impact'";
    con.fillStyle = 'white';
    con.fillText('FPS:' + fps, 20, 20);
    con.fillText('Tama:' + tama.length, 20, 40);
    con.fillText('Enemy:' + enemy.length, 20, 60);
    con.fillText('EnemyTama:' + enemyTama.length, 20, 80);
  }
}

// objectPaint
function drawObj(obj) {
  for (let i = 0; i < obj.length; i++) obj[i].draw();
}

// gameLoop
function gameLoop() {
  //テスト的に敵を出す
  if (rand(0, 10) == 1) {
    enemy.push(new Enemy(39, rand(0, FIELD_W) << 8, 0, 0, rand(300, 1200)));
  }

  // Movement process
  movementProcess();

  // Drawing process
  drawingProcess();

  // Information Display
  putInfo();
}

// onloadでgame開始
window.onload = function () {
  gameInit();
};
