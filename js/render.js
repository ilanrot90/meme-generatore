var meme;
var ctx;
var canvas;

function initCanvas(img) {
    meme = getGMeme();
    canvas = getCanvas();
    ctx = getCtx();

    meme.img = img;
    renderCanvas();
}

function renderCanvas() {
    let size = getSize();
    let img = meme.img;

    canvas.style.position = 'absolute';
    canvas.style.left = 0;

    canvas.width = size;
    canvas.height = img.naturalHeight * (size / img.naturalWidth);

    ctx.drawImage(img, 0, 0, size, img.naturalHeight * (size / img.naturalWidth));
    
    renderStyle();
}

function renderStyle() {
    if(!$('.no-title').prop( "checked" )) addCanvasTemplate(meme.titles.id);

    getGMeme().text.forEach(txt => drowTxt(txt));
}

function setCanvasTemplate(tamplate) {
    let title = $(tamplate).attr('id');
    meme.titles.id = title;

    renderCanvas();
}

function addCanvasTemplate(tamplate) {
    const TITLE_HEIGHT = 50; // in px

    // set titles color
    ctx.fillStyle = $('.title-color').val();

    switch(tamplate){
        case 'top-title':
            ctx.fillRect(0, 0, canvas.width, TITLE_HEIGHT);
            break;
        case 'bottom-title':
            ctx.fillRect(0, canvas.height - TITLE_HEIGHT, canvas.width, TITLE_HEIGHT);
            break;
        case 'double-title':
            ctx.fillRect(0, 0, canvas.width, TITLE_HEIGHT);
            ctx.fillRect(0, canvas.height - TITLE_HEIGHT, canvas.width, TITLE_HEIGHT);
            break;
    }
}


/****** CANVAS SETTINGS RENDERING ******/

function openFontNav(navName) {
    $(navName).addClass('open-nav');
    if (navName === '#color-picker') $('#colorWheel').fadeIn();
}

function closeNav(navName) {
    $(navName).removeClass('open-nav');
    if (navName === '#color-picker') $('#colorWheel').fadeOut();
}

function setStyle(prop) {
    switch (prop) {
        case 'font':
            $('.text-preview').css("font-family", getCurrTxt().font);
            break;
        case 'size':
            let size = getCurrTxt().size / 10;

            $('.text-preview').css("font-size", size + 'rem');
            break;
        case 'color':
            $('.text-preview').css("color", getCurrTxt().color);
            break;
    }
}

function changeFont(elFont) {
    $('.font-style .text').text($(elFont).text());
    getCurrTxt().font = $(elFont).text();

    closeNav('.nav-background');
    setStyle('font');
}

function changeFontSize(sign) {
    if ((+$('.size-val').text() >= 30 && $(sign).hasClass('plus')) || (+$('.size-val').text() <= 10 && $(sign).hasClass('minus'))) return;
    $(sign).hasClass('plus') ? getCurrTxt().size++ : getCurrTxt().size--;

    $('.size-val').text(Math.ceil(getCurrTxt().size));
    setStyle('size');
}

function changeColor(selectedColor) {
    getCurrTxt().color = $(selectedColor).attr('id');
    setStyle('color');
}

//change tamplate color
function changeTColor(colorInput) {
    let color = $(colorInput).attr('id');

    $("#color-input").val(color);
    renderCanvas();
}
// tamplate nav
function openEditor() {
    $('.controllers-panel>*:not(.canvas-style)').addClass('blur-background');

    $('.canvas-style').addClass('open');
    $('.canvas-title').text('Go back')
}

function closeEditor() {
    $('.controllers-panel>*:not(.canvas-style)').removeClass('blur-background open');

    $('.canvas-style').removeClass('open');
    $('.canvas-title').text('more options')
}

function toggleEditor() {
    if ($('.canvas-style').hasClass('open')) {
        closeEditor();
    } else {
        openEditor();
    }
}

function toggleMainNav() {
    if($( window ).width() > 980 ) return;

    $('.controllers-panel').toggleClass('closed__nav');
}




/******** GALLERY RENDERING ********/
function createCard(img) {
    let card = $(`<div id="${img.id}" class="col-lg-3 col-md-4 col-sm-6">
                        <div class="card bg-dark text-white">
                            <img class="card-img" src="${img.url}" alt="Card image" onclick="selectImg(${img.id}, this)" >
                        </div>
                    </div>`)
    card.data('id', img.id);

    $('.album__row').append(card);
}

function createList(images) {
    $('.album__row').html('');

    images.forEach(img => {
        createCard(img);
    });
}

// show side-bar
$(window).scroll(function () {
    if ($(this).scrollTop() > 100 && $("#img").hasClass("active")) {
        // $('.scrollToTop').fadeIn();
        $("#side-nav").addClass("navbar-left");
    } else {
        // $('.scrollToTop').fadeOut();
        $("#side-nav").removeClass("navbar-left");
    }
});

//Click event to scroll to top
$('.scrollToTop').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 800);
    return false;
});

$(window).resize(function(){

    if ($(window).width() <= 960) {  
        $('.bg-video').html('');
    }
});