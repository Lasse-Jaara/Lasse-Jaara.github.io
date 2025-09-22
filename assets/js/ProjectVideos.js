document.addEventListener("DOMContentLoaded", function () {
  // Helper to detect iOS
  function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }

  // Background video (autoplays as before)
  var bgVideo = document.getElementById('bg-video');
  var bgHlsSource = "./assets/videos/CrystalCaveProject/Banner_master.m3u8";
  if (bgVideo) {
    bgVideo.setAttribute('playsinline', '');
    bgVideo.setAttribute('muted', '');
    if (window.Hls && Hls.isSupported() && !isIOS()) {
      var hlsBg = new Hls();
      hlsBg.loadSource(bgHlsSource);
      hlsBg.attachMedia(bgVideo);
      hlsBg.on(Hls.Events.MANIFEST_PARSED, function () {
        bgVideo.play();
      });
    } else if (bgVideo.canPlayType('application/vnd.apple.mpegurl') || isIOS()) {
      bgVideo.src = bgHlsSource;
      bgVideo.play();
    }
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
    video.setAttribute('playsinline', '');
    video.setAttribute('muted', '');
    var loaded = false;
    video.addEventListener('play', function () {
      if (loaded) return;
      if (window.Hls && Hls.isSupported() && !isIOS()) {
        var hls = new Hls();
        hls.loadSource(cfg.src);
        hls.attachMedia(video);
        loaded = true;
      } else if (video.canPlayType('application/vnd.apple.mpegurl') || isIOS()) {
        video.src = cfg.src;
        loaded = true;
      }
    });
  });
});