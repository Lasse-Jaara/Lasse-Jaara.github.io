document.addEventListener("DOMContentLoaded", function () {
  // Background video (autoplays as before)
  var bgVideo = document.getElementById('bg-video');
  var bgHlsSource = "./assets/videos/CrystalCaveProject/Banner_master.m3u8";
  if (window.Hls && Hls.isSupported()) {
    var hlsBg = new Hls();
    hlsBg.loadSource(bgHlsSource);
    hlsBg.attachMedia(bgVideo);
    hlsBg.on(Hls.Events.MANIFEST_PARSED, function () {
      bgVideo.play();
    });
  } else if (bgVideo && bgVideo.canPlayType('application/vnd.apple.mpegurl')) {
    bgVideo.src = bgHlsSource;
    bgVideo.play();
  }

  // Project videos: load HLS only when play is pressed
  const videoConfigs = [
    { id: 'video-collected-crystal', src: './assets/videos/CrystalCaveProject/CollectedCrystal_master.m3u8' },
    { id: 'video-hitted-spike', src: './assets/videos/CrystalCaveProject/HittedSpike_master.m3u8' },
    { id: 'video-double-jump', src: './assets/videos/CrystalCaveProject/DoupleJump_master.m3u8' },
    { id: 'video-wall-jump', src: './assets/videos/CrystalCaveProject/WallJump_master.m3u8' },
    { id: 'video-enemy', src: './assets/videos/CrystalCaveProject/Enemy_master.m3u8' }
  ];
  videoConfigs.forEach(function(cfg) {
    var video = document.getElementById(cfg.id);
    if (!video) return;
    var loaded = false;
    video.addEventListener('play', function () {
      if (loaded) return;
      if (window.Hls && Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource(cfg.src);
        hls.attachMedia(video);
        // HLS.js will automatically select the best quality and allow switching
        loaded = true;
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = cfg.src;
        loaded = true;
      }
    });
  });
});