// 共通関数、その他

// キャラクタのベースクラス
// TODO これは親クラスとなるので後でそれ専用のクラスとして分ける
class CharacterBase {
  constructor(snum, x, y, vx, vy) {
    this.sn = snum;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.kill = false;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    // 範囲
    if (
      this.x < 0 ||
      this.x > FIELD_W << 8 ||
      this.y < 0 ||
      this.y > FIELD_H << 8
    )
      this.kill = true;
  }

  draw() {
    drawSprite(this.sn, this.x, this.y);
  }
}

/**
 * 矩形同士の当たり判定を行う関数
 * @param {number} x1 - 矩形1の左上隅のx座標
 * @param {number} y1 - 矩形1の左上隅のy座標
 * @param {number} w1 - 矩形1の幅
 * @param {number} h1 - 矩形1の高さ
 * @param {number} x2 - 矩形2の左上隅のx座標
 * @param {number} y2 - 矩形2の左上隅のy座標
 * @param {number} w2 - 矩形2の幅
 * @param {number} h2 - 矩形2の高さ
 * @returns {boolean} - 当たっているかどうかの結果
 */
function checkHit(x1, y1, w1, h1, x2, y2, w2, h2) {
  // 短形同士の当たり判定
  let left1 = x1 >> 8;
  let right1 = left1 + w1;
  let top1 = y1 >> 8;
  let bottom1 = top1 + h1;

  let left2 = x2 >> 8;
  let right2 = left2 + w2;
  let top2 = y2 >> 8;
  let bottom2 = top2 + h2;

  // 矩形が重なっていない条件をチェック
  const noOverlap =
    right1 <= left2 || // 矩形1が矩形2の左にある
    right2 <= left1 || // 矩形2が矩形1の左にある
    bottom1 <= top2 || // 矩形1が矩形2の上にある
    bottom2 <= top1; // 矩形2が矩形1の上にある

  // 矩形が重なっていない場合はfalse、そうでない場合はtrue
  return !noOverlap;
}

// ↓　星関係
// 背景の星用の乱数
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 背景の星の出力
class Star {
  constructor() {
    this.x = rand(0, FIELD_W) << 8;
    this.y = rand(0, FIELD_H) << 8;
    this.vx = 0;
    this.vy = rand(30, 200);
    this.sz = rand(1, 2);
  }

  // 星の描画
  draw() {
    let x = this.x >> 8;
    let y = this.y >> 8;
    if (
      (x < camera_x || x >= camera_x + SCREEN_W) &&
      (y < camera_y || y >= camera_y + SCREEN_H)
    ) {
      return;
    }
    vcon.fillStyle = rand(0, 2) != 0 ? '#66f' : '#aef';
    vcon.fillRect(x, y, this.sz, this.sz);
  }

  // フレームごとの更新処理
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.y > FIELD_H << 8) {
      this.x = rand(0, FIELD_W) << 8;
      this.y = 0;
    }
  }
}

// キーボードが押されたとき
document.onkeydown = function (e) {
  key[e.key] = true;

  // キーに基づいてスプライトを変更
  switch (e.key) {
    case 'ArrowLeft':
      currentSpriteIndex = 0;
      break;
    case 'ArrowUp':
      currentSpriteIndex = 3;
      break;
    case 'ArrowRight':
      currentSpriteIndex = 4;
      break;
    case 'ArrowDown':
      currentSpriteIndex = 3;
      break;
    default:
      currentSpriteIndex = 3; // デフォルトのスプライトを設定
      break;
  }
};

// キーボードが離されたとき
document.onkeyup = function (e) {
  key[e.key] = false;
};
