var gNextId = 1;
var gImages = [
    {id: gNextId++, url: './img/meme-imgs/1.jpg', keywords: ['happy', 'mountain', 'women', 'gress']},
    {id: gNextId++, url: './img/meme-imgs/2.jpg', keywords: ['happy', 'trump', 'funny', 'engry' , 'usa']},
    {id: gNextId++, url: './img/meme-imgs/3.jpg', keywords: ['happy', 'pets', 'dog', 'puppy', 'cute']},
    {id: gNextId++, url: './img/meme-imgs/4.jpg', keywords: ['happy', 'pets', 'kids', 'dog', 'baby', 'bed']},
    {id: gNextId++, url: './img/meme-imgs/5.jpg', keywords: ['happy', 'funny', 'kids', 'baby', 'cute']},
    {id: gNextId++, url: './img/meme-imgs/6.jpg', keywords: ['happy', 'pets', 'cat', 'sleep']},
    {id: gNextId++, url: './img/meme-imgs/7.jpg', keywords: ['happy', 'funny', 'listening']},
    {id: gNextId++, url: './img/meme-imgs/8.jpg', keywords: ['happy', 'funny', 'kids', 'baby', 'engry']},
    {id: gNextId++, url: './img/meme-imgs/9.jpg', keywords: ['happy', 'funny', 'you']},
    {id: gNextId++, url: './img/meme-imgs/10.jpg', keywords: ['happy', 'funny']},
    {id: gNextId++, url: './img/meme-imgs/11.jpg', keywords: ['happy', 'funny', 'movie']},
    {id: gNextId++, url: './img/meme-imgs/12.jpg', keywords: ['happy', 'funny', 'movie']},
    {id: gNextId++, url: './img/meme-imgs/13.jpg', keywords: ['happy', 'funny', 'kids', 'baby']},
    {id: gNextId++, url: './img/meme-imgs/14.jpg', keywords: ['happy', 'trump', 'funny']},
    {id: gNextId++, url: './img/meme-imgs/15.jpg', keywords: ['happy', 'funny', 'kids', 'baby']},
    {id: gNextId++, url: './img/meme-imgs/16.jpg', keywords: ['happy', 'pets', 'funny', 'dog']},
    {id: gNextId++, url: './img/meme-imgs/17.jpg', keywords: ['happy', 'funny', 'obama']},
    {id: gNextId++, url: './img/meme-imgs/18.jpg', keywords: ['happy', 'funny', 'love']},
    {id: gNextId++, url: './img/meme-imgs/19.jpg', keywords: ['happy', 'funny', 'movie']},
    {id: gNextId++, url: './img/meme-imgs/20.jpg', keywords: ['happy', 'funny']},
    {id: gNextId++, url: './img/meme-imgs/21.jpg', keywords: ['happy', 'funny', 'movie']},
    {id: gNextId++, url: './img/meme-imgs/22.jpg', keywords: ['happy', 'funny', 'movie']},
    {id: gNextId++, url: './img/meme-imgs/23.jpg', keywords: ['happy', 'funny', 'movie']},
    {id: gNextId++, url: './img/meme-imgs/24.jpg', keywords: ['happy', 'putin']},
    {id: gNextId++, url: './img/meme-imgs/25.jpg', keywords: ['happy', 'movie', 'toy']}
];
// var gMeme;
var gMeme = {
    titles: { id: 'solid' },

    text: [
        {
            id: makeId(),
            txt: '',
            font: 'sans-serif',
            size: 16,
            color: 'black',
            pos: {
                x: 20,
                y: 50,
            }
        },
    ],
};


function getGMeme() {
    return gMeme;
}

function createNewTxt() {
    let txt = {
        id: makeId(),
            txt: '',
            font: $('.text-preview').css("font-family"),
            size: $('.text-preview').css("font-size").slice(0,-2),
            color: $('.text-preview').css("color"),
            pos: {
                x: 20,
                y: 50,
            }
    }
    getGMeme().text.push(txt);
}

function getCurrTxt() {
    return gMeme.text[gMeme.text.length - 1];
}

function setImage (imgId) {
    gMeme.img = gImages.find(image => image.id === imgId);
}

function getImgs() {
    return gImages;
}

function getSize() {
    if($( window ).width() > 420 ) return 400;

    return window.innerWidth ; 
}

function createTxtBox(ev, val) {
    let txtBox = $(`<input type='text' data-id='${getCurrTxt().id}' class='txt-box' 
                        onkeydown='createText(event, this)' onfocusout='submitTxt()' onchange='setVal(this.value)' value='${val}'></input>`);

    txtBox.css({
        'position' : 'absolute',
        'top' : ev.clientY -  getCurrTxt().size + 'px',
        'left' : ev.clientX + 'px',
        'width' : (txtBox.val().length + 5) * 5 + 'px',
        'max-width' : calcMaxWidth(ev),
        'font-family' : getCurrTxt().font,
        'font-size' : getCurrTxt().size,
        'color' : getCurrTxt().color
    });

    $('body').append(txtBox);
    if(val !== '') getCurrTxt().txt = val;
    
    txtBox.focus();   
}

function calcMaxWidth(e) {
    let rect = getCanvas().getBoundingClientRect();

    return rect.right - e.clientX + 'px';
}

function getPos(canvas, e) {
    let rect = canvas.getBoundingClientRect();

    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}