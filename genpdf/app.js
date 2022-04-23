const puppeteer = require('puppeteer');

async function generatePDF() {
  for (let i = 39; i < 60; i++) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    console.log(`Going for : ${i + 1}`);
    await page.goto('https://source.unsplash.com/random/2480x3508?sig=1');
    // await page.evaluate(() => {
    //   const div = document.createElement('div');
    //   div.style.cssText = 'position:absolute; z-index:0; margin-top: 300px';
    //   const p = document.createElement('p');
    //   p.innerHTML = 'DigiBlock';
    //   p.style.cssText = 'color:lightgrey; font-size:120px; transform:rotate(300deg); -webkit-transform:rotate(300deg);';
    //   div.append(p);
    //   document.body.appendChild(div);
    // });
    await page.pdf({ path: `pdfs/pdf-${i + 1}.pdf`, format: 'A4' });
    await browser.close();
  }
}

generatePDF()
  .then(() => {
    console.log('Done');
  })
  .catch((err) => {
    console.log(err);
  });
