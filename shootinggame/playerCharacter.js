// プレイヤーのキャラクタークラス
// 自機クラス
class PlayerCharacter {
  constructor(game) {
    this.game = game;
    this.x = (FIELD_W / 2) << 8;
    this.y = (FIELD_H / 2) << 8;
    this.speed = 512;
    this.anime = 0;
  }

  // 更新処理
  update() {
    if (key[' '] && this.y <= (FIELD_H << 8) - this.speed) {
      tama.push(new Tama(this.x + (4 << 8), this.y, 0, -2000));
      tama.push(new Tama(this.x - (4 << 8), this.y, 0, -2000));
      this.reload = 4;
      if (++this.relo2 == 4) {
        this.reload = 20;
        this.relo2 = 0;
      }
    }
    if (!key[' ']) this.reload = this.relo2 = 0;

    if (this.reload > 0) this.reload--;

    if (key['ArrowLeft']) {
      this.x -= this.speed;
      if (this.anime > -8) this.anime--;
    } else if (key['ArrowRight'] && this.x <= (FIELD_W << 8) - this.speed) {
      this.x += this.speed;
      if (this.anime < 8) this.anime++;
    } else {
      if (this.anime > 0) this.animSe--;
      if (this.anime < 0) this.anime++;
    }

    if (key['ArrowUp']) {
      this.y -= this.speed;
    }

    if (key['ArrowDown'] && this.y <= (FIELD_H << 8) - this.speed) {
      this.y += this.speed;
    }
  }

  // 描画処理
  draw() {
    // currentSpriteIndexが範囲外になっていないかチェック
    if (currentSpriteIndex >= 0 && currentSpriteIndex < sprites.length) {
      this.game.drawSprite(currentSpriteIndex, this.x, this.y);
    } else {
      console.error('Invalid sprite index:', currentSpriteIndex);
    }
  }
}

//弾クラス
class Tama extends CharacterBase {
  constructor(x, y, vx, vy) {
    super(5, x, y, vx, vy);
    this.w = 4;
    this.h = 6;
  }

  update() {
    super.update();

    for (let i = 0; i < enemy.length; i++) {
      if (!enemy[i].kill) {
        if (
          checkHit(
            this.x,
            this.y,
            this.w,
            this.h,
            enemy[i].x,
            enemy[i].y,
            enemy[i].w,
            enemy[i].h
          )
        ) {
          enemy[i].kill = true;
          this.kill = true;
          break;
        }
      }
    }
  }

  draw() {
    super.draw();
  }
}
