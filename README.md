# 0502 上課筆記
## 第一條指令

```text=
產生一個全螢幕的畫布，背景顏色為黑色
擷取攝影機的影像，正常的顯示在視窗的中間
影像畫面寬高為視窗大小的80%
請把程式碼寫在sketch.js裡面
```
-
說明:
1.setup() 函式：這是 p5.js 的初始化函式，會在程式開始時執行一次。
2.createCanvas(400, 400) 用來建立一個寬 400 像素、高 400 像素的畫布。
3.draw() 函式：這是 p5.js 的主要繪圖迴圈函式，會以每秒 60 次的預設速率重複執行。
4.background(220) 用來設定畫布的背景顏色為灰色，並清除之前的繪圖內容。

-
```javascript=
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

```
## 第二條指令
```
影機顯示的畫面左右顛倒，請調整畫面顯示的方向
```
說明：
1.translate(width, 0)：將畫布的原點移到右上角，為水平翻轉做準備。
2.scale(-1, 1)：水平翻轉畫布，讓影像顯示方向正常。
3.image(capture, ...)：繪製攝影機影像，位置和大小保持不變，但方向已修正。
```javascript=
let capture;

function setup() {
  createCanvas(windowWidth, windowHeight); // 全螢幕畫布
  background(0); // 背景顏色為黑色
  capture = createCapture(VIDEO); // 擷取攝影機影像
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像寬高為視窗大小的80%
  capture.hide(); // 隱藏原始的攝影機影像
}

function draw() {
  background(0); // 確保背景保持黑色
  translate(width, 0); // 將畫布的原點移到右上角
  scale(-1, 1); // 水平翻轉畫布
  image(capture, width * 0.1, height * 0.1, width * 0.8, height * 0.8); // 顯示翻轉後的影像
}

```
## 第三條指令
```
利用creatGraphics指令，產生一個與video視訊畫面一樣的寬高一樣的大小內容，該圖片在視訊畫面的上方
```
說明：
createGraphics()：建立一個與視訊畫面大小相同的圖形內容，您可以在這個圖形上繪製任何內容。
graphics.background()：設定圖形的背景顏色，這裡設為紅色（可根據需求修改）。
graphics.text()：在圖形上繪製文字，這裡顯示 "Overlay Text"。
image(graphics, ...)：將圖形內容顯示在視訊畫面的上方。
```javascript=
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

```
## 第四條指令
```
把graphics的背景顏色為黑色
graphics在寬與高切成每隔20為一個單位
在每個單位內產生一個寬高為15的圓
圓的顏色採用capture相對位置的顏色
```
說明:
1.graphics.background(0)：將圖形的背景顏色設為黑色。
2.使用兩個for迴圈，分別遍歷圖形的寬度和高度，以20為間隔，計算每個單位的座標。
3.在每個單位內，使用capture.get()方法獲取該位置的顏色，並將其存儲在color變數中。
4.使用fill()方法設置圓的顏色，然後使用ellipse()方法在圖形上繪製圓形。
5.最後，使用image()方法將圖形內容顯示在視訊畫面的上方。
```javascript=
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
}

function draw() {
  background(0); // 確保背景保持黑色

  // 水平翻轉攝影機影像
  translate(width, 0);
  scale(-1, 1);
  image(capture, width * 0.1, height * 0.1, width * 0.8, height * 0.8); // 顯示翻轉後的影像

  // 更新 graphics 的內容
  graphics.background(0); // 設定背景為黑色
  for (let x = 0; x < graphics.width; x += 20) {
    for (let y = 0; y < graphics.height; y += 20) {
      let col = capture.get(x, y); // 擷取 capture 中相對應位置的顏色
      graphics.fill(col); // 設定圓的顏色
      graphics.noStroke();
      graphics.ellipse(x + 10, y + 10, 15, 15); // 繪製寬高為 15 的圓
    }
  }

  // 顯示圖形內容在視訊畫面的上方
  translate(width, 0); // 恢復原點
  scale(-1, 1); // 恢復正常方向
  image(graphics, width * 0.1, height * 0.1 - graphics.height); // 將圖形顯示在視訊畫面上方
}

```
