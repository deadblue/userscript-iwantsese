// ==UserScript==
// @name         IWantSeSe
// @namespace    http://tampermonkey.net/
// @version      1.1.5
// @author       Tomo Kunagisa
// @description  I want sese, let me sese.
//
// @updateURL    https://github.com/deadblue/userscript-iwantsese/raw/master/i-want-sese.user.js
// @downloadURL  https://github.com/deadblue/userscript-iwantsese/raw/master/i-want-sese.user.js
//
// @match  *://fotokiz.com/*
// @match  *://imgbaron.com/*
// @match  *://imgsen.com/*
// @match  *://imgstar.eu/*
// @match  *://imgsto.com/*
// @match  *://kropic.com/*
// @match  *://kvador.com/*
// @match  *://picbaron.com/*
// @match  *://picdollar.com/*
// @match  *://pics4you.net/*
// @match  *://pixmela.online/*
// @match  *://premalo.com/*
// @match  *://silverpic.com/*
// @match  *://imagetwist.com/*
// @match  *://imgadult.com/*
// @match  *://imgdrive.net/*
// @match  *://imgtaxi.com/*
// @match  *://ai18.pics/*
// @match  *://idol69.net/*
// @match  *://javball.com/*
// @match  *://ovabee.com/*
// @match  *://pig69.com/*
// @match  *://porn4f.com/*
//
// @grant  none
// ==/UserScript==

'use strict';

function handler_type1() {
    const img = document.querySelector('img.pic');
    if(img !== null) {
        location.href = img.src;
    } else {
        const forms = document.querySelectorAll('form');
        if(forms.length > 0) {
            forms[0].submit();
        }
    }
}

function handler_type2() {
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

function handler_type3() {
    const img = document.querySelector('div.big_img_box img');
    if(img === null) { return; }
    if( img.src.startsWith('http')) {
        window.open(img.src, '_self');
        return;
    }
    // Wait for image URL.
    const ob = new MutationObserver((mutations, observer) => {
        for(let mutation of mutations) {
            if(mutation.type === 'attributes' && mutation.attributeName === 'src') {
                observer.disconnect();
                window.open(img.src, '_self');
                return;
            }
        }
    });
    ob.observe(img, {
        attributes: true,
        childList: false,
        subtree: false
    });
}

function handler_type4() {
    const img = document.querySelector('div.fileviewer-file img');
    if(img !== null) {
        window.open(img.src, '_self');
    }
}

(function() {
    const handlerMap = new Map([
        ['fotokiz.com', handler_type1],
        ['imgbaron.com', handler_type1],
        ['imgsen.com', handler_type1],
        ['imgstar.eu', handler_type1],
        ['imgsto.com', handler_type1],
        ['kropic.com', handler_type1],
        ['kvador.com', handler_type1],
        ['picbaron.com', handler_type1],
        ['picdollar.com', handler_type1],
        ['pics4you.net', handler_type1],
        ['premalo.com', handler_type1],
        ['silverpic.com', handler_type1],
        ['imagetwist.com', handler_type1],

        ['imgadult.com', handler_type2],
        ['imgdrive.net', handler_type2],
        ['imgtaxi.com', handler_type2],

        ['pixmela.online', handler_type3],

        ['ai18.pics', handler_type4],
        ['idol69.net', handler_type4],
        ['javball.com', handler_type4],
        ['ovabee.com', handler_type4],
        ['pig69.com', handler_type4],
        ['porn4f.com', handler_type4]
    ]);
    const handler = handlerMap.get(location.host);
    if(handler !== undefined) {
        handler();
    }
})();
