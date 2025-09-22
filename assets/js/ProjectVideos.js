document.addEventListener("DOMContentLoaded", function () {
  // Helper to detect iOS
  function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }

  // Project videos: load HLS only when play is pressed, and support replay
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

    // Set attributes and properties for mobile compatibility
    video.setAttribute('playsinline', '');
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.muted = true;

    video.hlsInstance = null; // Store HLS.js instance per video

    // Always re-initialize on play for replay support
    video.addEventListener('play', function () {
      // Destroy previous HLS.js instance if exists
      if (video.hlsInstance) {
        video.hlsInstance.destroy();
        video.hlsInstance = null;
      }

      if (window.Hls && Hls.isSupported() && !isIOS()) {
        const hls = new Hls();
        hls.loadSource(cfg.src);
        hls.attachMedia(video);
        video.hlsInstance = hls;
        video.currentTime = 0; // Start from beginning
      } else if (video.canPlayType('application/vnd.apple.mpegurl') || isIOS()) {
        video.src = cfg.src;
        video.currentTime = 0;
        video.muted = true;
        video.playsInline = true;
        // Don't call play(); user already triggered
      }
    });

    // Cleanup on ended
    video.addEventListener('ended', function () {
      if (video.hlsInstance) {
        video.hlsInstance.destroy();
        video.hlsInstance = null;
      }
    });

    // Cleanup on pause (optional for memory)
    video.addEventListener('pause', function () {
      if (video.hlsInstance) {
        video.hlsInstance.detachMedia();
      }
    });

    // Error handling
    video.addEventListener('error', function (e) {
      console.error('Video error:', e);
    });
  });
});