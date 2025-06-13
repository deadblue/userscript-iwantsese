{
    const img = document.querySelector('div.showcase img');
    if(img !== null) {
        window.open(img.src, '_self');
        return;
    }
    if(location.pathname.endsWith('.html')) {
        fetch(location.href, {
            'method': 'POST',
            'body': new URLSearchParams({
                'cti': '1',
                'ref': '-',
                'rc': '1',
                'rp': '0',
                'bt': '0',
                'bw': 'webkit',
                'ic': '1'
            })
        }).then(resp => {
            window.open(location.href, '_self');
        }).catch(reason => {
            console.log(`Submit form failed: ${reason}`);
        });
    }
}