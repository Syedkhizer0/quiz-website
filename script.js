correctAns = 0;
wrongAns = 0;
function get() {
    fetch('https://opentdb.com/api.php?amount=1')
        .then(response => response.json())
        .then(data => {
    document.querySelector('.load12').style.display='none';
            question = data.results[0].question;
            dataArr = [];
            cAns = data.results[0].correct_answer;
            wAns = data.results[0].incorrect_answers;
            wAns.push(cAns);
            dataArr1 = dataArr.concat(wAns);
            // console.log(dataArr1);

            function shuffleArray(array) {
                for (var i = array.length - 1; i > 0; i--) {
                    // Generate random number
                    var j = Math.floor(Math.random() * (i + 1));
                    var temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                }
                return array;
            }
            dataArr1 = shuffleArray(dataArr1);
            // console.log(dataArr1)

            let b3 = document.querySelector('.options');
            str = "";
            for (let i = 0; i < dataArr1.length; i++) {
                if (dataArr1[i] == cAns) {
                    str += `<div class="opt opt-${i + 1} crt">
                            <span class="span"></span>
                            <h4>${dataArr1[i]}</h4>
                        </div>`;
                }
                else {
                    str += `<div class="opt opt-${i + 1}">
                            <span class="span"></span>
                            <h4>${dataArr1[i]}</h4>
                        </div>`;
                }
            }
            b3.innerHTML = str;
            let b2 = document.querySelector('.ques').children[0].innerHTML = question;

            b1 = document.querySelectorAll('.opt');
            for (i of b1) {
                i.addEventListener('click', function (e) {
                    selected = "";
                    // console.log(e.target);
                    if (e.target.tagName == 'DIV') {
                        if (document.querySelector('.active') != undefined) {
                            document.querySelector('.active').classList.remove('active');
                            document.querySelector('.active1').classList.remove('active1');
                        }
                        e.target.classList.add('active');
                        e.target.children[0].classList.add('active1');
                        // console.log(e.target.children[0]);
                        selected = e.target.children[1].innerText;
                        console.log(selected);
                    }
                    else if (e.target.tagName == 'H4') {
                        if (document.querySelector('.active') != undefined) {
                            document.querySelector('.active').classList.remove('active');
                            document.querySelector('.active1').classList.remove('active1');
                        }
                        e.target.parentNode.classList.add('active');
                        e.target.parentNode.children[0].classList.add('active1');
                        selected = e.target.innerText;
                        console.log(selected);
                    }
                    else {
                        if (document.querySelector('.active') != undefined) {
                            document.querySelector('.active').classList.remove('active');
                            document.querySelector('.active1').classList.remove('active1');
                        }
                        e.target.parentNode.classList.add('active');
                        e.target.classList.add('active1');
                        selected = e.target.nextElementSibling.innerText;
                        console.log(selected);
                    }
                })
            }
        })
}
get();

submit = document.querySelector('.submitBtn');
submit.addEventListener('click', function (e) {
    console.log('submit button is clicked');
    console.log(selected);
    console.log(cAns);
    if (selected == cAns) {
        // document.querySelector('.active').classList.add('.active2');
        correctAns++;
        active = document.querySelector('.active');
        active.style.background = '#2ea92e';
    }
    else {
        wrongAns++;
        crt = document.querySelector('.crt');
        crt.style.background = '#2ea92e';
        active = document.querySelector('.active');
        active.style.background = '#cb3232';
        // document.querySelector('.crt').classList.add('.active2');
        // document.querySelector('.active').classList.add('.active3');
    }
    submit.style.display = 'none';
    next = document.querySelector('.nextQues');
    next.style.display = 'block';
})

next = document.querySelector('.nextQues');
next.addEventListener('click', function () {
    document.querySelector('.load12').style.display='block';
    document.querySelector('.options').innerHTML='';
    document.querySelector('.ques').children[0].innerHTML='';
    get();
    next.style.display = 'none';
    submit = document.querySelector('.submitBtn');
    submit.style.display = 'block';
})

finish = document.querySelector('.finishBtn');
finish.addEventListener('click', function () {
    // console.log(correctAns)
    // console.log(wrongAns);
    sum = correctAns + wrongAns;
    console.log(sum);
    document.querySelector('.box').style.display='none';
    document.querySelector('.finishBox').style.display='block';
    document.querySelector('.correctAns').innerHTML=correctAns;
    document.querySelector('.wrongAns').innerHTML=wrongAns;
    document.querySelector('.score').innerHTML=correctAns+'/'+sum;
})

playAgain=document.querySelector('.playAgain');
playAgain.addEventListener('click',function(){
    console.log('play again is clicked');
    correctAns=0;
    wrongAns=0;
    get();
    document.querySelector('.box').style.display='block';
    document.querySelector('.finishBox').style.display='none';
})