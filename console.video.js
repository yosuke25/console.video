'use strict';

(() => {

  console.video = (video) => {
    let player = document.createElement('video');
    player.autoplay = true;
    player.muted = true;
    player.style.width = '0px';
    player.style.height = '0px';
    document.body.appendChild(player);
    setVideo(video, player);
  };

  function setVideo (video, player) {
    let intervalID;

    player.addEventListener('play', () => {
      let canvas = document.createElement('canvas');
      canvas.width = player.videoWidth;
      canvas.height = player.videoHeight;
      let context = canvas.getContext('2d');
      let conter = 0;
      intervalID = setInterval(() => {
        conter++;
        if (conter === 20) {
          console.clear();
          conter = 0;
        }
        draw(player, canvas, context);
      }, 100);
    }, false);

    player.addEventListener('ended', () => {
      clearInterval(intervalID);
      console.clear();
    }, false);

    player.src = video;
  }

  function draw (player, canvas, context) {
    context.drawImage(player, 0, 0);
    let image = canvas.toDataURL('image/png');
    console.log('%c+',
      `font-size: 0px;
      padding: calc((100vh - 91px) / 2) ${canvas.width / 2}px;
      background-image: url(${image});
      background-repeat: no-repeat;`
    );
  }

})();
