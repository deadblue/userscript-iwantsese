{
    const img = document.querySelector('body>img.pic');
    if(img !== null) {
        location.href = img.src;
    } else {
        const form = document.querySelector('body>form');
        if(form !== null) {
            form.submit();
        }
    }
}