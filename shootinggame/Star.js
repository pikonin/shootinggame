// Star.js
// 星の描写を行っている。

export class Star {
  constructor(fieldW, fieldH, screenW, screenH, randFn) {
    this.FIELD_W = fieldW;
    this.FIELD_H = fieldH;
    this.SCREEN_W = screenW;
    this.SCREEN_H = screenH;
    this.rand = randFn; // 乱数生成関数を受け取る
    this.x = this.rand(0, this.FIELD_W) << 8;
    this.y = this.rand(0, this.FIELD_H) << 8;
    this.vx = 0;
    this.vy = this.rand(30, 200);
    this.sz = this.rand(1, 2);
  }

  // 星の描画
  draw(vcon, camera_x, camera_y) {
    let x = this.x >> 8;
    let y = this.y >> 8;
    if (
      x < camera_x ||
      x >= camera_x + this.SCREEN_W ||
      y < camera_y ||
      y >= camera_y + this.SCREEN_H
    ) {
      return;
    }
    vcon.fillStyle = this.rand(0, 2) != 0 ? '#66f' : '#8af';
    vcon.fillRect(x, y, this.sz, this.sz);
  }

  // フレームごとの更新処理
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.y > this.FIELD_H << 8) {
      this.x = this.rand(0, this.FIELD_W) << 8;
      this.y = 0;
    }
  }
}
