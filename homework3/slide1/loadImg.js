import { cardsContainerEl, appBgContainerEl } from './script.js';

const cardsImgEl = cardsContainerEl.getElementsByTagName('img');
const appBgImgEl = appBgContainerEl.getElementsByTagName('img');
//call API
function getDogImg() {
    return fetch('https://dog.ceo/api/breeds/image/random')
        .then(res => {
            if (!res.ok) throw new Error("Can't load image");
            return res.json();
        })
        .then(data => data.message)
        .catch(err => console.log(err));
}

// Loop through cardsImgEl
async function loadImgs() {
    try {
        const numImgs = cardsImgEl.length;
        const promises = [];
        for (let i = 0; i < numImgs; i++) {
            promises.push(getDogImg());
      }
      
        const results = await Promise.all(promises);
        for (let i = 0; i < cardsImgEl.length; i++) {
            cardsImgEl[i].src = results[i];
            appBgImgEl[i].src = results[i];
        }
    } catch (err) {
        console.error(err);
    }
}

loadImgs();
