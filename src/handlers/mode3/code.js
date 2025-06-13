{
    try {
        wuLu();
    } catch(e) {};
    const img = document.querySelector('div.big_img_box img');
    if(img === null) { return; }
    if( img.src.startsWith('http')) {
        window.open(img.src, '_self');
        return;
    }
}