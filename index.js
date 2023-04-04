//importa a biblioteca puppeteer para automacao
const puppeteer = require("puppeteer");
//url para navegar
const url = 'https://http.cat/';

//funcao que execcuta o puppeteer
(async () => {
    //abrir navegador
    const browser = await puppeteer.launch();
    //criando nova pagina
    const page = await browser.newPage();
    //navega para pagina
    await page.goto(url);

    //screenshot de elemento
    await screenshot_element(page, '#root > div > ul > li:nth-child(2)', 'files/screenshot_element.png');

    //screenshot de determinada area
    await screenshot_crop(page, { x: 10, y: 20, height: 100, width: 100}, 'files/screenshot_crop.png')

    //fecha o navegador
    await browser.close();
})();

//desc: responsavel por caputrar uma parte do conteudo da pagina recebendo seu identificador como parametro
//params: (page) instancia da pagina, (string) seletor
//return: nenhum
async function screenshot_element(page, selector_in_page, file_name){
    let element = await page.$(selector_in_page)
    await element.screenshot({
        path: file_name,
    })
}

//desc: responsavel por fazer screenshot de determinada area recebendo como parametro a posicao na apgina
//params: (page) instancia da pagina,(obj) posicao na pagina
//return: nennhum
async function screenshot_crop(page, position, file_name){
    //tira sceenshot na pagina
    await page.screenshot({
        path: file_name, //onde salvar a imagem
        clip: position //em que area sera o screenshot
    })
}