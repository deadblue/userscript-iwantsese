{
    const img = document.querySelector('div.fileviewer-file img');
    if(img !== null) {
        window.open(img.src, '_self');
    }
}