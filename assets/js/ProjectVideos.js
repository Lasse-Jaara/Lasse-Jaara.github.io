// Fast HLS.js Quality Detection & Switching for any video element
// Set your video element ID and quality preference here:
const VIDEO_ID = 'video-quality-controller'; // Change to your video element ID
const VIDEO_SRC = './assets/videos/CrystalCaveProject/CollectedCrystal_master.m3u8'; // Change to your video source
// const QUALITY_PREFERENCE = 'best'; // 'best' or 'worst'

document.addEventListener("DOMContentLoaded", function () {
  var video = document.getElementById(VIDEO_ID);
  if (!video) return;

  video.setAttribute('preload', 'metadata');

  if (window.Hls && Hls.isSupported()) {
    var hls = new Hls();
    hls.loadSource(VIDEO_SRC);
    hls.attachMedia(video);

    hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
      var levels = hls.levels;
      console.log('Available quality levels:', levels.map(l => l.height + 'p'));
      // Auto-select quality
      if (levels.length > 0) {
        if (QUALITY_PREFERENCE === 'best') {
          hls.currentLevel = 0; // Highest quality
        } else if (QUALITY_PREFERENCE === 'worst') {
          hls.currentLevel = levels.length - 1; // Lowest quality
        }
        video.play();
      }
    });

    window.setVideoQuality = function (levelIndex) {
      if (hls.levels && hls.levels[levelIndex]) {
        hls.currentLevel = levelIndex;
        console.log('Switched to quality:', hls.levels[levelIndex].height + 'p');
      }
    };
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = VIDEO_SRC;
    video.setAttribute('preload', 'metadata');
    video.play();
  }
});
// Fast HLS.js Quality Detection & Switching for all project videos
// List your video IDs and sources here:
const VIDEO_CONFIGS = [
  { id: 'video-collected-crystal', src: './assets/videos/CrystalCaveProject/CollectedCrystal_master.m3u8' },
  { id: 'video-hitted-spike', src: './assets/videos/CrystalCaveProject/HittedSpike_master.m3u8' },
  { id: 'video-double-jump', src: './assets/videos/CrystalCaveProject/DoupleJump_master.m3u8' },
  { id: 'video-wall-jump', src: './assets/videos/CrystalCaveProject/WallJump_master.m3u8' },
  { id: 'video-enemy', src: './assets/videos/CrystalCaveProject/Enemy_master.m3u8' }
];
const QUALITY_PREFERENCE = 'best'; // 'best' or 'worst'

document.addEventListener("DOMContentLoaded", function () {
  VIDEO_CONFIGS.forEach(function(cfg) {
    var video = document.getElementById(cfg.id);
    if (!video) return;
    video.setAttribute('preload', 'metadata');

    if (window.Hls && Hls.isSupported()) {
      var hls = new Hls();
      hls.loadSource(cfg.src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
        var levels = hls.levels;
        console.log(cfg.id + ' available quality levels:', levels.map(l => l.height + 'p'));
        if (levels.length > 0) {
          if (QUALITY_PREFERENCE === 'best') {
            hls.currentLevel = 0;
          } else if (QUALITY_PREFERENCE === 'worst') {
            hls.currentLevel = levels.length - 1;
          }
          // video.play(); // Start paused, user must press play
        }
      });

      // Optional: expose a function to change quality for each video
      video.setVideoQuality = function (levelIndex) {
        if (hls.levels && hls.levels[levelIndex]) {
          hls.currentLevel = levelIndex;
          console.log(cfg.id + ' switched to quality:', hls.levels[levelIndex].height + 'p');
        }
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = cfg.src;
      video.setAttribute('preload', 'metadata');
  // video.play(); // Start paused, user must press play
    }
  });
});