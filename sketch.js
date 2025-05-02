let capture;
let graphics;

function setup() {
  createCanvas(windowWidth, windowHeight); // 全螢幕畫布
  background(0); // 背景顏色為黑色
  capture = createCapture(VIDEO); // 擷取攝影機影像
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像寬高為視窗大小的80%
  capture.hide(); // 隱藏原始的攝影機影像

  // 建立與視訊畫面大小相同的圖形內容
  graphics = createGraphics(windowWidth * 0.8, windowHeight * 0.8);
  graphics.background(255, 0, 0); // 設定圖形背景為紅色（可自行修改）
  graphics.fill(255); // 設定文字顏色為白色
  graphics.textSize(32); // 設定文字大小
  graphics.textAlign(CENTER, CENTER); // 文字置中
  graphics.text('Overlay Text', graphics.width / 2, graphics.height / 2); // 在圖形中顯示文字
}

function draw() {
  background(0); // 確保背景保持黑色

  // 水平翻轉攝影機影像
  translate(width, 0);
  scale(-1, 1);
  image(capture, width * 0.1, height * 0.1, width * 0.8, height * 0.8); // 顯示翻轉後的影像

  // 顯示圖形內容在視訊畫面的上方
  translate(width, 0); // 恢復原點
  scale(-1, 1); // 恢復正常方向
  image(graphics, width * 0.1, height * 0.1 - graphics.height); // 將圖形顯示在視訊畫面上方
}
