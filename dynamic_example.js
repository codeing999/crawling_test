// puppeteer을 가져온다.
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

(async () => {
  // 브라우저를 실행한다.
  // 옵션으로 headless모드를 끌 수 있다.
  const browser = await puppeteer.launch({
    headless: false,
  });

  // 새로운 페이지를 연다.
  const page = await browser.newPage();
  // 페이지의 크기를 설정한다.
  await page.setViewport({
    width: 1366,
    height: 768,
  });
  // "https://www.goodchoice.kr/product/search/2" URL에 접속한다. (여기어때 호텔 페이지)
  await page.goto("https://place.map.kakao.com/1770731230");
  await page
    .waitForSelector(".link_photo", { timeout: 10000 })
    .catch(() => console.log("Wait for my-selector timed out"));

  // 페이지의 HTML을 가져온다.
  const content = await page.content();
  // $에 cheerio를 로드한다.
  const $ = cheerio.load(content);
  // 복사한 리스트의 Selector로 리스트를 모두 가져온다.
  const lists = $(".link_photo");
  //모든 리스트를 순환한다.
  console.log(lists);
  //for (let i of lists) console.log(lists[i].attribs.style);
  //   lists.each((index, list) => {
  //     console.log(index);
  //   });
  // 브라우저를 종료한다.
  browser.close();
})();
