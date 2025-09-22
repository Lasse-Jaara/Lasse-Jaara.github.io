document.addEventListener("DOMContentLoaded", function () {
  // Helper to detect iOS
  function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
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

    // Ensure playsinline and muted set as both attributes and properties for mobile compatibility
    video.setAttribute('playsinline', '');
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.muted = true;

    let loaded = false;
    let hls = null;

    video.addEventListener('play', function () {
      if (loaded) return;

      // HLS.js for non-iOS browsers
      if (window.Hls && Hls.isSupported() && !isIOS()) {
        hls = new Hls();
        hls.loadSource(cfg.src);
        hls.attachMedia(video);
        loaded = true;
        // Clean up HLS on pause or end
        video.addEventListener('pause', function () {
          if (hls) hls.detachMedia();
        });
        video.addEventListener('ended', function () {
          if (hls) hls.detachMedia();
        });
      }
      // Native HLS for iOS/Safari
      else if (video.canPlayType('application/vnd.apple.mpegurl') || isIOS()) {
        video.src = cfg.src;
        loaded = true;
        video.muted = true;
        video.playsInline = true;
        // Do NOT call play() here; user already triggered play
      }
    });

    video.addEventListener('error', function (e) {
      console.error('Video error:', e);
    });
  });
});