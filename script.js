/// Init
const playGround = document.getElementById('ground');
const webDev = ['html', 'css', 'javascript', 'sass', 'webpack', 'react', 'node', 'typescript', 'angular', 'tailwind', 'vue'];
webDev.sort(() => {
    return 0.5 - Math.random();
});
let s = '';
let count = new Array(8).fill(0);
for (let i = 0; i < 16; i++) {
    let ran = Math.floor(Math.random() * 8);

    while (count[ran] == 2) {
        ran = Math.floor(Math.random() * 8);
    };
    count[ran]++;
    // console.log(`${ran} ===> ${webDev[ran]}`);

    s += `
    <div class="card">
                <div class="card--front">❔</div>
                <div class="card--back">
                    <img class="img" src="images/${webDev[ran]}.png">
                </div>
            </div>
    
    `;
}
playGround.innerHTML = s;
/// Get Document Objects
const timer = document.querySelector('.timer');
const seconds = document.getElementById('seconds');
const backCards = document.querySelectorAll('div[class*="back"]');
const frontCards = document.querySelectorAll('div[class*="front"]');
const cards = document.querySelectorAll('.card');
const imgs = document.querySelectorAll('.img');
let pair = [];
let clicks = 0;
let score = 8;
let mmt = 0;
let sec = 0;
let min = 0;
let stopTimer = true;
let highScore = 9999;
if (localStorage.getItem('highScore')) {
    highScore = Number(localStorage.getItem('highScore'));
    highScore == 9999 ? seconds.innerHTML = `0 ` : seconds.innerHTML = `${highScore} `;
} else {
    localStorage.setItem('highScore', highScore);
}
// seconds.innerHTML = `${highScore} `;
// console.log(frontCards);
frontCards.forEach((item, index) => {
    item.addEventListener('click', (e) => {
        stopTimer = false;
        if (clicks < 2) {
            e.target.style.transform = 'perspective(600px) rotateY(-180deg)';
            backCards[index].style.transform = 'perspective(600px) rotateY(0deg)';
            clicks++;
            pair.push(index);
        }
        if (clicks == 2) {
            setTimeout(() => {
                if (imgs[pair[0]].src == imgs[pair[1]].src && pair[0] != pair[1]) {
                    cards[pair[0]].style.opacity = '0';
                    cards[pair[1]].style.opacity = '0';
                    score--;
                    if (!score) {
                        stopTimer = true;
                        sec += (min * 60) + mmt / 100;
                        if (highScore > sec) {
                            highScore = sec;
                            localStorage.setItem('highScore', highScore);
                            seconds.innerHTML = `${highScore} `;
                        }

                    }

                } else {
                    frontCards[pair[0]].style.transform = 'perspective(600px) rotateY(0deg)';
                    backCards[pair[0]].style.transform = 'perspective(600px) rotateY(180deg)';
                    frontCards[pair[1]].style.transform = 'perspective(600px) rotateY(0deg)';
                    backCards[pair[1]].style.transform = 'perspective(600px) rotateY(180deg)';
                }
                pair = [];
                clicks = 0;

            }, 350);
        }


    });
});

///Utility Functions 
(function timerCycle() {
    if (stopTimer == false) {
        mmt = parseInt(mmt);
        sec = parseInt(sec);
        min = parseInt(min);

        mmt++;

        if (mmt == 100) {
            sec++;
            mmt = 0;
        }
        if (sec == 60) {
            min++;
            sec = 0;
            mmt = 0;
        }
        if (mmt < 10) {
            mmt = '0' + mmt;
        }
        if (sec < 10 || sec == 0) {
            sec = '0' + sec;
        }
        if (min < 10 || min == 0) {
            min = '0' + min;
        }


        timer.innerHTML = min + ':' + sec + ':' + mmt;


    }
    setTimeout(timerCycle, 10);
})();