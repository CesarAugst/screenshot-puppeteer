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
    await page.goto(url, { waitUntil: 'load' });

    //screenshot de elemento
    await screenshot_element(page, '#root > div > ul > li:nth-child(2)', 'files/screenshot_element.png');

    //screenshot de determinada area
    await screenshot_crop(page, { x: 10, y: 20, height: 100, width: 100}, 'files/screenshot_crop.png')

    //dimensoes de elemento na pagina
    const dimensions = await element_dimensions(page, '#root > div > ul > li:nth-child(2)');
    console.log(dimensions);

    //fecha o navegador
    await browser.close();
})();

//desc: responsavel por devolver altura e largura de determinado elemento na pagina
//params: (page) instancia da pagina, (string) seletor do elemento
//return: (obj) altura e alrgura do elemento
async function element_dimensions(page, selector_in_page){
    //busca na pagina o elemento
    const element = await page.$(selector_in_page);

    //se encontrou elemento
    if(element){
        //abre um console para executar o trecho abaixo
        return await page.evaluate((selector_in_page) => {
            //constante com o elemento
            const element = document.querySelector(selector_in_page);
            //retorna as dimensoes
            return {
                "height": element.getBoundingClientRect().height, //altura
                "width": element.getBoundingClientRect().width //largura
            };
        }, selector_in_page);// passa para o console uma variavel local
    }
    //retorna nulo se nao encontrou elemento
    return null;
}

//desc: responsavel por caputrar uma parte do conteudo da pagina recebendo seu identificador como parametro
//params: (page) instancia da pagina, (string) seletor do elemento
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