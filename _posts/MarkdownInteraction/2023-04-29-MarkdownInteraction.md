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
	
### 2.1. 너저분한 함수들을 Class화
여기저기 나뉘어진 함수를 한 Class로 묶어놓습니다. 어차피 한 게임에 관련된 내용이니 Class에 다 넣으면 보기 좋잖아요!  
<details>
<summary>JavaScript 코드 보기</summary>
<div markdown="1">
```
class YachtDice{
	constructor(){
		this.RerollCount = 0;
		this.RoundCount = 0;
	}
	Reroll(){
		let DiceList = document.querySelectorAll('div.Dice > div');
		let RerollDiceCount = 0;
		for(let index=0; index<5; index++)
			RerollDiceCount += DiceList[index].classList.contains("Reroll") ? 1 : 0;
		if(this.RerollCount != 3 && RerollDiceCount){
			const DiceDict = {1: '⚀', 2:'⚁', 3:'⚂', 4:'⚃', 5:'⚄', 6:'⚅'};
			let DiceResult = [];
			for(let index=0; index<5; index++){
				DiceResult.push(Math.floor((Math.random()*6+1)));
			}
			for(let index=0; index<5; index++){
				if(DiceList[index].classList.contains("Reroll")){
					DiceList[index].innerHTML = DiceDict[DiceResult[index]];
					this.DiceRotate(index);
				}
			}
			this.RerollUncheck();
			this.UpdateScoreTable();
			this.RerollCountUp();
		}
	}
	DiceEval(){
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
	UpdateScoreTable(){
		let ScoreList = document.querySelectorAll('div.ScoreElement');
		let EvalList = this.DiceEval();
		for(let index=0; index<12; index++)
			if(!ScoreList[index].classList.contains('Fixed') && !ScoreList[index].classList.contains('Bonus'))
				ScoreList[index].querySelector('button').innerHTML = EvalList[index];
	}
	UpdateTotal(){
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
	RoundCountUp(){
		let Counter = document.querySelectorAll('div.Round > div')[1];
		this.RoundCount++;
		if(this.RoundCount != 13)
			Counter.innerHTML = '■'.repeat(this.RoundCount) + '□'.repeat(12-this.RoundCount);
	}
	RerollCountUp(){
		let Counter = document.querySelector('div.Controller > div');
		this.RerollCount++;
		Counter.innerHTML = '● '.repeat(this.RerollCount) + '○ '.repeat(3-this.RerollCount);
	}
	RerollUncheck(){
		let DiceList = document.querySelectorAll('div.Dice > div');
		for(let index=0; index<5; index++){
			if(DiceList[index].classList.contains('Reroll')){
				DiceList[index].classList.remove('Reroll');
				DiceList[index].animate({transform: 'translate(0, -10rem)'}, {duration: 500, easing: 'ease', fill: 'forwards'});
			}
		}
	}
	QuickReroll(){
		let DiceList = document.querySelectorAll('div.Dice > div');
		for(let index=0; index<5; index++){
			DiceList[index].classList.add('Reroll');
			DiceList[index].animate({transform: 'translate(0, 20rem)'}, {duration: 400, easing: 'ease', fill: 'forwards'});
			DiceList[index].animate({transform: 'translate(0, 0)'}, {duration: 2400, easing: 'ease-out', fill: 'forwards'});
		}
	}
	RerollToggle(index){
		if(this.RerollCount != 3){
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
	ScoreCheck(index){
		let ScoreList = document.querySelectorAll('div.ScoreElement');
		if(!ScoreList[index].classList.contains('Fixed')){
			ScoreList[index].classList.add('Fixed');
			this.NewRound();
		}
	}
	NewRound(){
		this.RerollCount = 0;
		this.UpdateTotal();
		this.RoundCountUp();
		if(this.RoundCount==13){
			this.RerollCount = 3;
			let Resetbutton = document.querySelector('div.Controller > button');
			Resetbutton.innerHTML = "Game Over : Restart";
			Resetbutton.onclick = Reset;
		}
		else{
			this.QuickReroll();
			this.Reroll();
		}
	}
	Reset(){
		this.RerollCount = 0;
		this.RoundCount = 0;
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
		this.NewRound();
	}
	DiceRotate(index){
		let DiceList = document.querySelectorAll('div.Dice > div');
		let TurnRandom = Math.round(Math.random());
		if(TurnRandom)
			DiceList[index].animate([{transform: 'rotate(0deg)'}, {transform: 'rotate(2160deg)'}], {duration: 1000, easing: 'linear', fill: 'both'});
		else
			DiceList[index].animate([{transform: 'rotate(0deg)'}, {transform: 'rotate(-2160deg)'}], {duration: 1000, easing: 'linear', fill: 'both'});
	}
}
```
</div>
</details>
   
이러면 훨씬 깔끔합니다! 그리고, Yacht Dice 게임을 만약 여러개 게시한다면, `new YachtDice()`로 추가적으로 게시 하면 됩니다.
### 2.2. DOM 생산을 위한 함수 작성
DOM 요소 생산을 위해서, 함수 작성과 코드 수정을 해줍니다. 게시 환경이 어떻게 될지 모르니, HTML 파일 전체에서 검색했던 `querySelector`를 `div` 내부에서만 검색하도록 변경해줍니다. 그리고 Class에서 선언했던 함수들 중, `onclick`으로 불러지는 함수가 있다면, `onclick`에 this를 바인딩 해줍니다. 마치 이런식입니다  
<details>
<summary>JavaScript 코드 보기</summary>
<div markdown="1">

```
HTMLconstruct(){
	let ScoreModel = document.createElement('div');
	ScoreModel.className = 'Score';
	let RoundModel = document.createElement('div');
	RoundModel.className = 'Round';
	let RoundDiv1Model = document.createElement('div');
	RoundDiv1Model.innerHTML = 'Rounds';
	RoundModel.appendChild(RoundDiv1Model);
	let RoundDiv2Model = document.createElement('div');
	RoundDiv2Model.innerHTML = '□□□□□□□□□□□□';
	RoundModel.appendChild(RoundDiv2Model);
	ScoreModel.appendChild(RoundModel);
	const ScoreString = [['⚀', 'Aces'], ['⚁', 'Deuces'], ['⚂', 'Threes'], ['⚃', 'Fours'], ['⚄', 'Fives'], ['⚅', 'Sixes'], ['', 'Choice'], ['⚃⚃⚃⚃', '4 of a Kind'], ['⚁⚁⚂⚂⚂', 'Full House'], ['⚁⚂⚃⚄', 'Small Straight'], ['⚀⚁⚂⚃⚄', 'Large Straight'], ['⚅⚅⚅⚅⚅',' Yacht']];
	for(let index=0; index<12; index++){
		let ScoreElementModel = document.createElement('div');
		ScoreElementModel.className = 'ScoreElement';
		let DiceMarkModel = document.createElement('div');
		DiceMarkModel.className = 'DiceMark';
		DiceMarkModel.innerHTML = ScoreString[index][0];
		ScoreElementModel.appendChild(DiceMarkModel);
		ScoreElementModel.innerHTML += ScoreString[index][1];
		let ButtonModel = document.createElement('button');
		ButtonModel.innerHTML = 0;
		ButtonModel.onclick = () => this.ScoreCheck(index);
		ScoreElementModel.appendChild(ButtonModel);
		ScoreModel.appendChild(ScoreElementModel);
		if(index==5){
			let Bonus1Model = document.createElement('div');
			Bonus1Model.className = 'Bonus';
			Bonus1Model.innerHTML = 'Subtotal';
			let Bonus1divModel = document.createElement('div');
			Bonus1divModel.innerHTML = '0 / 63';
			Bonus1Model.appendChild(Bonus1divModel);
			let Bonus2Model = document.createElement('div');
			Bonus2Model.className = 'Bonus';
			Bonus2Model.innerHTML = '+35 Bonus';
			let Bonus2divModel = document.createElement('div');
			Bonus2Model.appendChild(Bonus2divModel);
			ScoreModel.appendChild(Bonus1Model);
			ScoreModel.appendChild(Bonus2Model);
		}
	}
	let TotalModel = document.createElement('div');
	TotalModel.className = 'ScoreElement Total';
	TotalModel.innerHTML = 'Total';
	let TotalButtonModel = document.createElement('button');
	TotalButtonModel.innerHTML = '0';
	TotalModel.appendChild(TotalButtonModel);
	ScoreModel.appendChild(TotalModel);
	this.MainHTML.appendChild(ScoreModel);
	let PlayModel = document.createElement('div');
	PlayModel.className = 'Play';
	let DiceModel = document.createElement('div');
	DiceModel.className = 'Dice';
	for(let index=0; index<5; index++){
		let DicedivModel = document.createElement('div');
		DicedivModel.innerHTML = '⚀';
		DicedivModel.onclick = () => this.RerollToggle(index);
		DiceModel.appendChild(DicedivModel);
	}
	PlayModel.appendChild(DiceModel);
	let LineModel = document.createElement('div');
	LineModel.className = 'Line';
	let Linediv1Model = document.createElement('div');
	Linediv1Model.innerHTML = 'Hold';
	LineModel.appendChild(Linediv1Model);
	let Linediv2Model = document.createElement('div');
	Linediv2Model.innerHTML = 'Reroll';
	LineModel.appendChild(Linediv2Model);
	PlayModel.appendChild(LineModel);
	let ControllerModel = document.createElement('div');
	ControllerModel.className = 'Controller';
	let RerollModel = document.createElement('button');
	RerollModel.innerHTML = '🎲';
	RerollModel.onclick = this.Reroll.bind(this);
	ControllerModel.appendChild(RerollModel);
	let ControllerdivModel = document.createElement('div');
	ControllerdivModel.innerHTML = '○ ○ ○';
	ControllerModel.appendChild(ControllerdivModel);
	PlayModel.appendChild(ControllerModel);
	this.MainHTML.appendChild(PlayModel);
	}
```
</div>
</details>
  
이렇게 함수를 적용시킨다면, JavaScript에 `let Game = new YachtDice('div.Yacht'); Game.HTMLconstruct();` 이것으로 Yacht Dice 게임을 생산해냅니다!

## 3. Markdown에 적용시키기
이제 만든 게임을 Markdown에 적용 시키도록 합시다.

### 3.1. 냅다 `<div>` 만들기
원하는 위치에 그냥 `<div>`를 만들어 줍니다! 혹시 모르니 주변 글과는 한칸씩 띄어서 쓰도록 합시다.
```
<div class='Yacht'></div>
```

### 3.2. JavaScript & CSS 적용
`<div>`에 들어갈 내용을 생산해줄 JavaScript와 CSS를 적용해야 합니다. 적용 방법은 대략 2가지가 있습니다.   
  
* `<script>`와 `<style>`을 통채로 입력해서 적용하기
* 글 외부에 작성 후 불러오기
  
쉬운 방법은 전자의 방법이지만, 블로그 글이 깔끔하고, 유지보수 측면에서 유리한 후자의 방법을 적용하겠습니다.  
   
일단 다른곳에 위의 JavaScript와 CSS를 저장해줍니다. 저는 [**JavaScript**](https://github.com/MOJAN3543/MOJAN3543.github.io/blob/main/assets/post-script/MarkdownInteraction/Yacht.js)와 [**CSS**](https://github.com/MOJAN3543/MOJAN3543.github.io/blob/main/assets/post-style/MarkdownInteraction/style.css)를 독립된 폴더에 저장했습니다.  
   
그리고 위의 JavaScript와 CSS를 적용 시키기 위해, 글의 최하단에 다음과 같이 작성합니다.  
```
<script src="/assets/post-script/MarkdownInteraction/Yacht.js"></script>

<link rel="stylesheet" href="/assets/post-style/MarkdownInteraction/style.css" type="text/css">
```
만약에 후자의 방법을 하지 않고, 전자의 방법을 사용 한다면, 글의 최하단에 다음과 같은 방식으로 작성하면 됩니다.  
```
<script> ... </script>
<style> ... </style>
```

### 3.3. 모바일 환경 고려하기
이렇게 마무리 지으면 PC 환경에서는 잘 작동 하지만, 모바일 환경에서는 블로그 너비가 늘어납니다.  
![Mobile](https://github.com/MOJAN3543/MOJAN3543.github.io/blob/main/_posts/MarkdownInteraction/moblie.png?raw=true "Mobile") 
{:.text-center} 

그래서, `.Yacht` 요소에 `.Game` 요소를 씌우고 다음과 같은 CSS를 적용 시킵니다.
```
.Game{
	overflow-x: auto;
	-ms-overflow-style: none;
	-webkit-scrollbar { display: none;}	
}
```
	
## 4. 끝!

<div class='Game'>
	<div class='Yacht'></div>
</div>
	
다음과 같이 진행 했다면, 여기 결과물입니다! 재밌게 즐기세요~[^1]

	
[^1]: 약간 TMI이긴 하지만,[ **Yacht Dice AI**](https://github.com/ho94949/yacht-dice)에 의하면, AI가 가장 최적의 플레이를 한다면 평균 191.77점을 낸다고 합니다. 이를 기준으로 도전해보세요!
	
<script src="/assets/post-script/MarkdownInteraction/Yacht.js"></script>

<link rel="stylesheet" href="/assets/post-style/MarkdownInteraction/style.css" type="text/css">
