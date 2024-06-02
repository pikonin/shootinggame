// 敵弾クラス
class EnemyTama extends CharacterBase {}

// 敵クラス
class Enemy extends CharacterBase {
  constructor(snum, x, y, vx, vy) {
    super(snum, x, y, vx, vy);
    this.flag = false;
    this.w = 20;
    this.h = 20;
  }

  update() {
    super.update();

    if (!this.flag) {
      if (playerCharacter.x > this.x || playerCharacter.vx < 120) this.vx += 4;
      else if (playerCharacter.x < this.x && playerCharacter.vx > -120)
        this.vx -= 4;
    } else {
      if (playerCharacter.x < this.x || playerCharacter.vx < 400) this.vx += 30;
      else if (playerCharacter.x > this.x && playerCharacter.vx > -400)
        this.vx -= 30;
    }

    if (Math.abs(playerCharacter.y - this.y) < 100 << 8 && !this.flag) {
      this.flag = true;

      let angle, dx, dy;
      // 自分への角度を求めるためにAtanを使う
      angle = Math.atan2(
        playerCharacter.y - this.y,
        playerCharacter.x - this.x
      );

      angle += (rand(-10, 10) * Math.PI) / 180;
      dx = Math.cos(angle) * 1000;
      dy = Math.sin(angle) * 1000;
      enemyTama.push(new EnemyTama(15, this.x, this.y, dx, dy));
    }

    if (this.flag && this.vy > -800) this.vy -= 30;
  }

  draw() {
    super.draw();
  }
}
