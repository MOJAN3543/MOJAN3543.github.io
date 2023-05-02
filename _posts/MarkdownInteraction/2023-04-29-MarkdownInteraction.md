---
title: 마크다운에 상호작용 콘텐츠 넣는법 (w/ Minimal Mistakes)
toc: true
toc_sticky: true
last_modified_at: 2023-04-29
---
이 포스팅에서는 [**저는 HTML로 프로그래밍 해요**](https://mojan3543.github.io/ProgrammingByHTML/)에서 사용된 인터랙티브 콘텐츠를 삽입 하는 법에 대해서 설명드리겠습니다.   
   
⚠ 주의 : 이 포스팅에 나오는 소스 코드나 코딩 방식은 굉장히 비효율적일 가능성이 높습니다. 최대한 적은 곳에 작은 규모로 사용해주세요!
{: .notice--warning}    
## 1. 인터렉티브 콘텐츠 만들기
포스팅에 콘텐츠를 넣어야 하니, 우선 인터랙티브 콘텐츠를 만들도록 하겠습니다!   
   
![YachtDice](https://github.com/MOJAN3543/MOJAN3543.github.io/blob/main/_posts/MarkdownInteraction/Yachtdice.jpg?raw=true"YachtDice") 
{:.text-center}

이번 포스팅에 예제로 만드는 인터랙티브 콘텐츠는 [**Yacht Dice**](https://en.wikipedia.org/wiki/Yacht_(dice_game)) 1인 게임을 제작해 보겠습니다.

### 1.1. 알고 있어야 할것:
인터랙티브 요소를 위해서는, 마크다운 상에서 HTML 요소를 펼쳐 놓는것이 아닌, `<div>` 요소만 삽입 후, JavaScript로 문서 객체를 동적으로 생산 해야합니다. HTML 요소를 펼쳐 놓는다면, 요소들이 정상적으로 동작하지 않습니다. 이러한 개념을 'JavaScript로 [**DOM**](https://developer.mozilla.org/ko/docs/Web/API/Document_Object_Model/Introduction)을 조작한다'라고 합니다.  

### 1.2. 설계 먼저
일단 기본적인 디자인은 다들 아시는 [**51 Worldwide Games**](https://store.nintendo.co.kr/70010000029718)의 디자인을 차용했습니다!   
   
![MentalModel](https://github.com/MOJAN3543/MOJAN3543.github.io/blob/main/_posts/MarkdownInteraction/MentelModel.png?raw=true"MentalModel") 
{:.text-center} 

제가 떠올린 요트 다이스의 구성 요소는 이렇게 생겼습니다. 위 사진에서 알 수 있듯, 점수표와 플레이 부분을 다른 요소로 분리 한다는것이 이번 요트 다이스 구현의 핵심입니다.

### 1.3. 천리길도 `<div>` 부터
```
{% raw %}<!DOCTYPE html>
<html lang="ko">
	<head>
		<meta charset="UTF-8">
		<title>Yacht!</title>
	</head>
	<body>
		<div class='Yacht'>
			<div class='Score'>
				...
			</div>
			<div class='Play'>
				<div class='Dice'>
					...
				</div>
				<div class='Controller'>
					...
				</div>
			</div>
		</div>
	</body>
</html>{% endraw %}
```
일단 기초 `<div>` 구성은 이렇습니다! 점수표와 플레이 요소, 플레이 요소는 또 주사위 표시부와 조작부로 분리됩니다.  
  
![NoCSS](https://github.com/MOJAN3543/MOJAN3543.github.io/blob/main/_posts/MarkdownInteraction/NoCSS.png?raw=true "NoCSS") 
{:.text-center} 

기초적인 골격만 다져놓은 모습입니다. 여기에 추가적인 CSS 작업을 거치면....

![WithCSS](https://github.com/MOJAN3543/MOJAN3543.github.io/blob/main/_posts/MarkdownInteraction/WithCSS.png?raw=true "WithCSS") 
{:.text-center} 
 
역시 CSS의 힘이네요.   

### 1.4. JavaScript 넣기
이를 동작시켜줄 JavaScript도 적용시켜 줍니다.
<details>
<summary>HTML 코드 보기</summary>
<div markdown="1">

```
{% raw %}<!DOCTYPE html>
<html lang="ko">
	<head>
		<meta charset="UTF-8">
		<link rel="stylesheet" href="style.css">
		<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap" rel="stylesheet">
		<title>Yacht!</title>
		<script>
			function Reroll(){
				let DiceList = document.querySelectorAll('div.Dice > div');
				let RerollDiceCount = 0;
				for(let index=0; index<5; index++)
					RerollDiceCount += DiceList[index].classList.contains("Reroll") ? 1 : 0;
				if(RerollCount != 3 && RerollDiceCount){
					const DiceDict = {1: '⚀', 2:'⚁', 3:'⚂', 4:'⚃', 5:'⚄', 6:'⚅'};
					let DiceResult = [];
					for(let index=0; index<5; index++){
						DiceResult.push(Math.floor((Math.random()*6+1)));
					}
					for(let index=0; index<5; index++){
						if(DiceList[index].classList.contains("Reroll")){
							DiceList[index].innerHTML = DiceDict[DiceResult[index]];
							DiceRotate(index);
						}
					}
					RerollUncheck();
					UpdateScoreTable();
					RerollCountUp();
				}
			}
			function DiceEval(){
				const DiceDict = {'⚀':1, '⚁':2, '⚂':3, '⚃':4, '⚄':5, '⚅':6};
				let DiceList = document.querySelectorAll('div.Dice > div');
				let DiceResult = [0, 0, 0, 0, 0, 0];
				let EvalList = [];
				for(let index=0; index<5; index++)
					DiceResult[DiceDict[DiceList[index].innerHTML]-1]++;
				for(let index=0; index<6; index++) // Aces ~ Sixes
					EvalList.push(DiceResult[index]*(index+1));
				EvalList.push(EvalList.slice(0, 6).reduce(function add(sum, currValue){return sum+currValue;}, 0)); // Choice
				EvalList.push(DiceResult.includes(4)||DiceResult.includes(5) ? EvalList[6] : 0); // 4 of a Kind
				EvalList.push(DiceResult.includes(2)&&DiceResult.includes(3) ? EvalList[6] : 0); // Full House
				let DiceBoolList = [];
				for(let index=0; index<6; index++)
					DiceBoolList.push(!!DiceResult[index] ? 1 : 0);
				EvalList.push(JSON.stringify(DiceBoolList.slice(0, 4)) === "[1,1,1,1]"||JSON.stringify(DiceBoolList.slice(1, 5)) === "[1,1,1,1]"||JSON.stringify(DiceBoolList.slice(2, 6)) === "[1,1,1,1]" ? 15 : 0); // Small Straight;
				EvalList.push(JSON.stringify(DiceResult) === "[0,1,1,1,1,1]" || JSON.stringify(DiceResult) === "[1,1,1,1,1,0]" ? 30 : 0); // Large Straight;
				EvalList.push(DiceResult.includes(5) ? 50 : 0); // Yacht
				return EvalList;
			}
			function UpdateScoreTable(){
				let ScoreList = document.querySelectorAll('div.ScoreElement');
				let EvalList = DiceEval();
				for(let index=0; index<12; index++)
					if(!ScoreList[index].classList.contains('Fixed') && !ScoreList[index].classList.contains('Bonus'))
						ScoreList[index].querySelector('button').innerHTML = EvalList[index];
			}
			function UpdateTotal(){
				let Sum = 0;
				let AcetoSixCount = 0;
				let ScoreList = document.querySelectorAll('div.ScoreElement');
				let Bonus = document.querySelectorAll('div.Bonus > div');
				for(let index=0; index<12; index++){
					if(ScoreList[index].classList.contains('Fixed')){
						Sum += Number(ScoreList[index].querySelector('button').innerHTML);
						if(index <= 5)
							AcetoSixCount++;
					}
					if(index == 5){
						Bonus[0].innerHTML = Sum + ' / 63';
						if(Sum>=63){
							Bonus[1].innerHTML = "+ 35";
							Sum += 35;
						}
						else if(AcetoSixCount == 6)
							Bonus[1].innerHTML = "+ 0";
					}
					else if(index == 11)
						ScoreList[12].querySelector('button').innerHTML = Sum;
				}
			}
			function RoundCountUp(){
				let Counter = document.querySelectorAll('div.Round > div')[1];
				RoundCount++;
				if(RoundCount != 13)
					Counter.innerHTML = '■'.repeat(RoundCount) + '□'.repeat(12-RoundCount);
			}
			function RerollCountUp(){
				let Counter = document.querySelector('div.Controller > div');
				RerollCount++;
				Counter.innerHTML = '● '.repeat(RerollCount) + '○ '.repeat(3-RerollCount);
			}
			function RerollUncheck(){
				let DiceList = document.querySelectorAll('div.Dice > div');
				for(let index=0; index<5; index++){
					if(DiceList[index].classList.contains('Reroll')){
						DiceList[index].classList.remove('Reroll');
						DiceList[index].animate({transform: 'translate(0, -10rem)'}, {duration: 500, easing: 'ease', fill: 'forwards'});
					}
				}
			}
			function QuickReroll(){
				let DiceList = document.querySelectorAll('div.Dice > div');
				for(let index=0; index<5; index++){
					DiceList[index].classList.add('Reroll');
					DiceList[index].animate({transform: 'translate(0, 20rem)'}, {duration: 400, easing: 'ease', fill: 'forwards'});
					DiceList[index].animate({transform: 'translate(0, 0)'}, {duration: 2400, easing: 'ease-out', fill: 'forwards'});
				}
			}
			function RerollToggle(index){
				if(RerollCount != 3){
					let DiceList = document.querySelectorAll('div.Dice > div');
					if(DiceList[index].classList.contains('Reroll')){
						DiceList[index].classList.remove('Reroll');
						DiceList[index].animate({transform: 'translate(0, -10rem)'}, {duration: 500, easing: 'ease', fill: 'forwards'});
					}
					else{
						DiceList[index].classList.add('Reroll');
						DiceList[index].animate({transform: 'translate(0, 0)'}, {duration: 500, easing: 'ease', fill: 'forwards'});
					}
				}
			}
			function ScoreCheck(index){
				let ScoreList = document.querySelectorAll('div.ScoreElement');
				if(!ScoreList[index].classList.contains('Fixed')){
					ScoreList[index].classList.add('Fixed');
					NewRound();
				}
			}
			function NewRound(){
				RerollCount = 0;
				UpdateTotal();
				RoundCountUp();
				if(RoundCount==13){
					RerollCount = 3;
					let Resetbutton = document.querySelector('div.Controller > button');
					Resetbutton.innerHTML = "Game Over : Restart";
					Resetbutton.onclick = Reset;
				}
				else{
					QuickReroll();
					Reroll();
				}
			}
			function Reset(){
				RerollCount = 0;
				RoundCount = 0;
				let ScoreList = document.querySelectorAll('div.ScoreElement');
				let Bonus = document.querySelectorAll('div.Bonus > div');
				let Resetbutton = document.querySelector('div.Controller > button');
				Resetbutton.innerHTML = "🎲";
				Resetbutton.onclick = Reroll;
				for(let index=0; index<12; index++){
					if(ScoreList[index].classList.contains('Fixed'))
						ScoreList[index].classList.remove('Fixed');
					ScoreList[index].querySelector('button').innerHTML = '';
				}
				Bonus[0].innerHTML = '0 / 63';
				Bonus[1].innerHTML = '';
				ScoreList[12].querySelector('button').innerHTML = '';
				NewRound();
			}
			function DiceRotate(index){
				let DiceList = document.querySelectorAll('div.Dice > div');
				let TurnRandom = Math.round(Math.random());
				if(TurnRandom)
					DiceList[index].animate([{transform: 'rotate(0deg)'}, {transform: 'rotate(2160deg)'}], {duration: 1000, easing: 'linear', fill: 'both'});
				else
					DiceList[index].animate([{transform: 'rotate(0deg)'}, {transform: 'rotate(-2160deg)'}], {duration: 1000, easing: 'linear', fill: 'both'});
			}
			let RerollCount = 0;
			let RoundCount = 0;
		</script>
	</head>
	<body onload="NewRound()">
		<div class='Yacht'>
			<div class='Score'>
				<div class='Round'>
					<div>
						Rounds
					</div>
					<div>
						□□□□□□□□□□□□
					</div>
				</div>
				<div class='ScoreElement' onclick="ScoreCheck(0)">
					<div class="DiceMark">
						⚀
					</div>
					Aces
					<button>
						
					</button>
				</div>
				<div class='ScoreElement' onclick="ScoreCheck(1)">
					<div class="DiceMark">
						⚁
					</div>
					Deuces
					<button>
						
					</button>
				</div>
				<div class='ScoreElement' onclick="ScoreCheck(2)">
					<div class="DiceMark">
						⚂
					</div>
					Threes
					<button>
						
					</button>
				</div>
				<div class='ScoreElement' onclick="ScoreCheck(3)">
					<div class="DiceMark">
						⚃
					</div>
					Fours
					<button>
						
					</button>
				</div>
				<div class='ScoreElement' onclick="ScoreCheck(4)">
					<div class="DiceMark">
						⚄
					</div>
					Fives
					<button>
						
					</button>
				</div>
				<div class='ScoreElement' onclick="ScoreCheck(5)">
					<div class="DiceMark">
						⚅
					</div>
					Sixes
					<button>
						
					</button>
				</div>
				<div class='Bonus'>
					Subtotal
					<div>
						0 / 63
					</div>
				</div>
				<div class='Bonus'>
					+35 Bonus
					<div>
						
					</div>
				</div>
				<div class='ScoreElement' onclick="ScoreCheck(6)">
					<div class="DiceMark">
						
					</div>
					Choice
					<button>
						
					</button>
				</div>
				<div class='ScoreElement' onclick="ScoreCheck(7)">
					<div class="DiceMark">
						⚃⚃⚃⚃
					</div>
					4 of a Kind
					<button>
						
					</button>
				</div>
				<div class='ScoreElement' onclick="ScoreCheck(8)">
					<div class="DiceMark">
						⚁⚁⚂⚂⚂
					</div>
					Full House
					<button>
						
					</button>
				</div>
				<div class='ScoreElement' onclick="ScoreCheck(9)">
					<div class="DiceMark">
						⚁⚂⚃⚄
					</div>
					Small Straight
					<button>
						
					</button>
				</div>
				<div class='ScoreElement' onclick="ScoreCheck(10)">
					<div class="DiceMark">
						⚀⚁⚂⚃⚄
					</div>
					Large Straight
					<button>
						
					</button>
				</div>
				<div class='ScoreElement' onclick="ScoreCheck(11)">
					<div class="DiceMark">
						⚅⚅⚅⚅⚅
					</div>
					Yacht
					<button>
						
					</button>
				</div>
				<div class='ScoreElement Total'>
					Total
					<button>
						
					</button>
				</div>
			</div>
			<div class='Play'>
				<div class='Dice'>
					<div class='Reroll' onclick='RerollToggle(0)'>
						⚀
					</div>
					<div class='Reroll' onclick='RerollToggle(1)'>
						⚀
					</div>
					<div class='Reroll' onclick='RerollToggle(2)'>
						⚀
					</div>
					<div class='Reroll' onclick='RerollToggle(3)'>
						⚀
					</div>
					<div class='Reroll' onclick='RerollToggle(4)'>
						⚀
					</div>
				</div>
				<div class='Line'>
					<div>
						Hold
					</div>
					<div>
						Reroll
					</div>
				</div>
				<div class='Controller'>
					<button onclick='Reroll()'>
						🎲
					</button>
					<div>
						○ ○ ○
					</div>
				</div>
			</div>
		</div>
	</body>
</html>{% endraw %}
```
</div>
</details>

대충 이렇게 구현이 완료되었습니다! 이대로 웹 사이트에 게시하면 Yacht Dice를 즐길 수 있습니다!   
  
하지만, 이 글의 목적은 Markdown 환경에서 인터렉티브 요소로써 이를 게시 하는것이기 때문에, 추가 과정을 거쳐야 합니다!
	
## 2. 인터렉티브 콘텐츠를 수정하기
위에서 서술 했듯, 이 요소들을 그대로 Markdown에 넣는 것이 아닌, JavaScript를 이용해 DOM 요소를 조작, 이후에 해당 콘텐츠를 생산해야 합니다. 이를 위한 수정을 해봅시다.
	
## 2.1. 너저분한 함수들을 Class화
여기저기 나뉘어진 함수를 한 Class로 묶어놓습니다. 어차피 한 게임에 관련된 내용이니 Class에 다 넣으면 보기 좋잖아요!
