let capture;

function setup() {
  createCanvas(windowWidth, windowHeight); // 全螢幕畫布
  background("#ECECFF"); // 背景顏色為黑色
  capture = createCapture(VIDEO); // 擷取攝影機影像
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像寬高為視窗大小的80%
  capture.hide(); // 隱藏原始的攝影機影像
}

function draw() {
  background("#ECECFF"); // 確保背景保持黑色
  image(capture, width * 0.1, height * 0.1, width * 0.8, height * 0.8); // 將影像顯示在視窗中間
}
