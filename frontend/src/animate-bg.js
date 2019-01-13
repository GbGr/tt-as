const CLOUDS_COUNT = 15;

const cloudUrls = [
  require('./assets/images/clouds/cloud_0.svg'),
  require('./assets/images/clouds/cloud_1.svg'),
  require('./assets/images/clouds/cloud_2.svg'),
  require('./assets/images/clouds/cloud_3.svg'),
  require('./assets/images/clouds/cloud_4.svg'),
  require('./assets/images/clouds/cloud_5.svg'),
];

class Cloud {
  constructor(img, scale = 1, opacity = 0, speed = 1, x = 0, y = 0) {
    this.img = img;
    this.scale = scale;
    this.opacity = opacity;
    this.speed = speed;
    this.x = x;
    this.y = y;
  }

  update(ctx) {
    if (this.x + this.speed < -this.img.width) {
      this.x = ctx.canvas.width + this.img.width;
    } else {
      this.x -= this.speed;
    }
  }

  draw(ctx) {
    ctx.globalAlpha = this.opacity;
    ctx.drawImage(this.img, this.x, this.y, this.img.width * this.scale, this.img.height * this.scale);
    ctx.globalAlpha = 1;
  }
}

function animateBg(canvas) {
  const clouds = [];
  const ctx = canvas.getContext('2d');
  const clientRect = canvas.getBoundingClientRect();
  let width = canvas.width = clientRect.width;
  let height = canvas.height = clientRect.height;

  window.addEventListener('resize', () => {
    const clientRect = canvas.getBoundingClientRect();
    width = canvas.width = clientRect.width;
    height = canvas.height = clientRect.height;
  });

  loadCloudImages().then(cloudImages => {
    for (let i = 0; i < CLOUDS_COUNT; i++) {
      const img = cloudImages[random(0, cloudImages.length - 1)];
      const scale = 0.5 + Math.random();
      const opacity = random(1, 8) / 10;
      const speed = 0.1 + Math.random();
      const x = random(0, width);
      const y = random(0, height - img.height);
      clouds.push(new Cloud(img, scale, opacity, speed, x, y));
    }

    clouds.forEach(cloud => {
      cloud.draw(ctx);
    });

    requestAnimationFrame(function draw() {
      ctx.clearRect(0, 0, width, height);
      clouds.forEach(cloud => {
        cloud.update(ctx);
        cloud.draw(ctx);
      });
      requestAnimationFrame(draw);
    });

  });

}

export default animateBg;


function loadCloudImages() {
  return Promise.all(cloudUrls.map(url => new Promise(resolve => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.src = url;
  })));
}

function random(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}