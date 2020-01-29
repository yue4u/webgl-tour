const puppeter = require("puppeteer");

// type Shader = {
//   title: string;
//   content: string;
// };

module.exports = async function screenshotAll(
  shaders, //: Shader[],
  headless = false
) {
  const browser = await puppeter.launch({
    headless,
    args: ["--no-sandbox", "--disable-web-security"]
  });
  for (let shader of shaders) {
    await screenshot(shader.title, shader.content, browser)
  }
  await browser.close();
}

async function screenshot(
  title,//: string,
  shader,//: string,
  browser,//: puppeter.Browser
) {
  const page = await browser.newPage();
  await page.setContent(`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>Document</title>
      <style>canvas{height: 120px; width: 200px;}</style>
      <script type="text/javascript" src="https://rawgit.com/patriciogonzalezvivo/glslCanvas/master/dist/GlslCanvas.js"></script>
    </head>
    <body>
      <canvas id="gl"></canvas>
      <script>
        const canvas = document.getElementById("gl");
        const sandbox = new GlslCanvas(canvas);
        const string_frag_code = \`${shader}\`;
        sandbox.load(string_frag_code);
      </script>
    </body>
  </html>
  `);
  await new Promise(ok => setTimeout(ok, 1000));
  await page.screenshot({
    clip: {
      x: 8,
      y: 8,
      width: 200,
      height: 120
    },
    path: `./src/thumbnails/${title}.png`
  });
  console.log(`taken thumbnail: ${title}`)
}
