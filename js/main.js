var gCanvas;
var gCtx;
var gMeme;

function init() {
    createList(getImgs());

    gCanvas =  document.querySelector('.dynamic-canvas');
    gCtx = gCanvas.getContext('2d');
    gMeme = getGMeme();
}

// go to selected page
function handlePage(pageClass, elLink) {
    removeDisplayPrev();

    $(elLink).addClass('active');
    $(`.${pageClass}`).removeClass('d-none');
}
// remove active from a
function removeDisplayPrev() {
    let allPages = $('.card-body');
    let navLinks = $('.nav-link');

    for (page of allPages) {
        $(page).addClass('d-none');
    }

    for (link of navLinks) {
        $(link).removeClass('active');
    }
}

//change step
function nextPage(next, id) {
    let elLink = document.querySelector(`#${id}`);

    handlePage(next, elLink);
}

//select image
function selectImg(id, image) {
    $('.selected').removeClass("selected");

    $('#' + id).addClass("selected");

    var img = new Image();
    img.onload = initCanvas.bind(null, img);
    img.src = $(image).attr('src');

    $('#template').trigger("click");
}
// create new text box
function drow(e) {
    let typeTouch = (e.changedTouches) ? e.changedTouches[0] : e;
    let pos = getPos(gCanvas, typeTouch);
    let val = getClickedMeme(pos);

    getCurrTxt().pos = pos;
    createTxtBox(typeTouch, val);
}

// if clicked position meme
function getClickedMeme(pos) {
    let value = '';
    let index = getGMeme().text.findIndex(txt => {
                let txtWidth = ctx.measureText(txt.txt).width + txt.pos.x;

                return txt.pos.x <= pos.x && pos.x <= txtWidth && txt.pos.y >= pos.y && pos.y <= (pos.y + txt.size)               
    });

    if (index !== -1){
        value = getGMeme().text[index].txt;
        editTxtBox(index);
    }

    return value;
}

function editTxtBox(index) {
    let currTxt = getCurrTxt();

    currTxt = getGMeme().text[index];
    getGMeme().text = getGMeme().text.filter((txt, idx) => index !== idx);

    renderCanvas();
}
// add text 
function createText(e, input) {
    $(input).css('width', (($(input).val().length + 5) * 8) + 'px');

    switch(e.keyCode) {
        case 27: 
            renderCanvas();
            break;
        case 13:
            $('.txt-box').blur();
            break;
        default:
            break;
    }
}

function setVal(value) {
    getCurrTxt().txt = value;
}

function submitTxt() {
    $('.txt-box').remove();

    if(getCurrTxt().txt !== '') {
        drowTxt(getCurrTxt());
        createNewTxt();
    }
}

function drowTxt(txt) {
    gCtx.font = `${txt.size}px ${txt.font}`;
    gCtx.fillStyle = txt.color;
    gCtx.fillText(`${txt.txt}`,txt.pos.x, txt.pos.y);
}

// CANVAS & CTX GET&SET
function getCanvas() {
    return gCanvas;
}

function getCtx() {
    return gCtx;
}

// upload image

function onFileInputChange(ev) {
    handleImageFromInput(ev, initCanvas);
    $('#template').trigger("click");
}

function downloadImg(elLink) {
    var memeContent = gCanvas.toDataURL('image/jpg');
    elLink.href = memeContent; //bgImgContent + userContent.substring(22);
}