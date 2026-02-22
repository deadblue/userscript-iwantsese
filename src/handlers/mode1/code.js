{
    const img = document.querySelector('div.main-content-image>img');
    if(img !== null) {
        location.href = img.src;
    } else {
        const f = document.querySelector('form.form-continue');
        if(f !== null) {
            f.submit();
        }
    }
}