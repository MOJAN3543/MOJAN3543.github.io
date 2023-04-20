---
title: 저는 HTML로 프로그래밍 해요
toc: true
toc_sticky: true
last_modified_at: 2023-04-13
style: "/assets/post-style/ProgrammingByHTML/style.css"
script: "/assets/post-script/ProgrammingByHTML/TuringMachine.js"
---
![저는HTML로프로그래밍해요](https://github.com/MOJAN3543/MOJAN3543.github.io/blob/main/_posts/ProgrammingByHTML/HTMLisnotProgrammingLang.jpg?raw=true "저는HTML로 프로그래밍해요")
{: .text-center}    

농담입니다! HTML로는 프로그래밍 할 수 없습니다.   
    
애초에 [**HTML**](https://ko.wikipedia.org/wiki/HTML)을 풀어쓴다면 **HyperText Markup Language**. 즉 [**마크업 언어**](https://ko.wikipedia.org/wiki/%EB%A7%88%ED%81%AC%EC%97%85_%EC%96%B8%EC%96%B4)입니다.  
   
하지만, HTML과 마크업 언어를 보조하는 [**스타일 시트 언어**](https://en.wikipedia.org/wiki/Style_sheet_language)인 [**CSS**](https://ko.wikipedia.org/wiki/CSS)를 같이 사용한다면, 이는 튜링 완전하게 됩니다!   
   
⚠ 주의 : 이 뒤의 내용은 온전히 학부생의 시선으로 수집하고, 작성한 정보입니다. 정보의 내용이나 논리가 완전하지 않을 수 있습니다.
{: .notice--warning}    
⚠ 주의 : 이 포스트에는 사용자가 조작하는 인터렉티브 요소가 포함되어 있습니다. PC 크롬 환경에 최적화 되어, 모바일에서는 온전한 기능을 못할 수도 있습니다.
{: .notice--warning}   

## 1. 튜링 완전?
어떤 프로그래밍 언어가 튜링 완전하다고 한다면, 어떤 프로그래밍 언어로 튜링 머신을 동작시킬수 있다는 말과 같습니다.   
### 1.1 튜링 머신?
튜링 머신이란, 엘런 튜링이 제시한, 계산을 할 수 있는 가상의 기계. 즉 오토마타를 말합니다.
#### <sub>1.1.1 오토마타?</sub>
...... 끝이 없겠네요.  
## 2. 일단 튜링 머신부터 차근차근
일단. 태초에 [**튜링 머신**](https://ko.wikipedia.org/wiki/%ED%8A%9C%EB%A7%81_%EA%B8%B0%EA%B3%84)이 있었습니다.  

![TuringMachine](https://github.com/MOJAN3543/MOJAN3543.github.io/blob/main/_posts/ProgrammingByHTML/TuringMachine.jpeg?raw=true "TuringMachine")
{: .text-center}  
  
튜링 머신은 1936년 앨런 튜링이 제시한 가상의 장치입니다. 이 장치는 테이프에 적힌 정보를 읽고, 읽은 정보와 현재 상태에 따라, 정해진 행동표에 따라서 행동하는 기계입니다. 조금만 더 분해해 볼까요?    
    
![TuringMachineDetail](https://github.com/MOJAN3543/MOJAN3543.github.io/blob/main/_posts/ProgrammingByHTML/TuringMachineDetail.png?raw=true "TurnigMachineDetail")
{: .text-center}  
    
튜링 머신은 위와 같이 4가지로 나눌 수 있습니다.
* 테이프 : 무한한 길이의 종이 테이프[^1]입니다. 셀 단위로 나뉘어져 있으며, 셀 한칸에 숫자나 문자같은 기호가 적혀있거나, 비어있습니다.
* 헤드 : 테이프의 한 셀을 읽습니다. 좌, 우로 한칸씩 이동이 가능합니다.
* 행동표 : 현재 상태와 읽은 기호에 따라서 다음에 어떤 행동을 할지 쓰여진 표입니다.
* 상태 기록기 : 현재 상태를 기록합니다.

### 2.1 얘가 뭘 한다는 거에요?
일단 이런게 있다는건 알겠는데, 대체 얘가 뭘 한다는거죠?   
<div class='BitNot'></div>

위는 **실제로 동작하는** 튜링 머신입니다! **→**로 다음 행동을 할 수 있고, **↻**로 튜링 머신을 초기화 할 수 있습니다.   
    
저는 여기에 다음과 같은 행동표를 삽입했습니다.   
    
| 현재 상태 | 읽혀진 기호 | 쓰이는 기호 | 이동 종류 | 다음 상태 | 5-튜플 표현 |
|:--------|:--------|:--------|:--------|:--------|:--------|
| A | 0 | 1 | R | A | (A, 0, 1, R, A) |
| A | 1 | 0 | R | A | (A, 1, 0, R, A) |
| A | B | B | N | B | (A, B, B, N, B) |
| B | B | B | N | B | (B, B, B, N, B) |
   
차근차근 설명하겠습니다.    
    
우선 제가 구현한 튜링머신은 초기 상태로 `A`를 가지고 있습니다. 행동표에 따라, `A` 상태일때 `0`을 읽으면 `1`을 테이프에 쓰고 오른쪽<sub>R</sub>으로 이동 후 `A` 상태가 됩니다. 그리고 `A`상태일때 `1`을 읽으면 `0`을 테이프에 쓰고 오른쪽<sub>R</sub>으로 이동 후 `A` 상태가 됩니다.    
    
만약에 `A`상태일때 `ㅤ`을 만나면. 즉 공백<sub>B</sub>을 만나면 어떻게 될까요? 위의 행동표를 보면 알겠지만, 공백<sub>B</sub>을 작성 후 움직이지 않고<sub>N</sub> `B`상태가 됩니다. 그리고 `B`상태에서는 공백<sub>B</sub>을 만나면, 공백<sub>B</sub>을 작성. 움직이지 않습니다<sub>N</sub>. 즉, `B` 상태가 되면 튜링 머신이 정지합니다.    
    
그리고 눈치 채셨겠지만, 이는 NOT 비트 연산을 구현한 튜링 머신입니다!
### 2.2 조금 더 업그레이드 버전
앨런 튜링은 여기서 조금 더 나아가서, 해당 튜링 머신이, 테이프의 내용만 입력받는것이 아닌, 튜링 머신이 동작하는 방식도 입력 받아서, 한 장치가 여러가지 일을 할 수 있게 만든 **범용 튜링 머신**을 고안합니다.   
<div class='Universal'></div>

위는 실제로 동작하는 **범용 튜링 머신**입니다! `5-Tuple Action`과 `Tape`에 입력하고 **⇁**로 튜링 머신에 적용할 수 있습니다. 입력시에는 다음과 같은 규칙을 지키면 됩니다.

5-Tuple Action   
* 입력은 행동표의 5-튜플 표현과 같은 방식으로 이루어집니다. (현재 상태,읽혀진 기호,쓰이는 기호,이동 종류,다음 상태)를 입력합니다.
* 튜플의 기호와 기호 사이에는 콜론만 입력되어야 합니다. 띄어쓰기를 허용하지 않습니다.
* 튜플의 기호에는 한글자씩 입력되어야 합니다. 즉, 현재 상태나 읽혀진 기호에도 두글자 이상 사용되면 안됩니다.
* 튜플의 상태<sub>(1, 5번째 인자)</sub>는 모두 대문자 알파벳입니다. 소문자 알파벳 또는 숫자를 허용하지 않습니다.
* 공백을 입력하거나, 읽고 싶다면, `B`를 입력하면 됩니다. 다시 말해서, `B`를 테이프에 작성 하거나 읽을 수 없습니다.
* 튜플의 이동 종류<sub>(4번째 인자)</sub>는 'L'<sub>왼쪽 이동</sub>, 'N'<sub>이동하지 않음</sub>, 'R'<sub>오른쪽 이동</sub>중 하나여야 합니다.
* 헤드가 테이프의 0번 인덱스에서 왼쪽으로 가거나, 14번 인덱스에서 오른쪽으로 가는 행동은 실행되지 않습니다.
* 튜플과 튜플 사이에는 세미콜론<sub>;</sub>이 있어야 합니다. 단, 마지막 튜플 뒤에는 세미콜론을 붙이지 않습니다.
    
Tape
* 입력은 테이프에 들어갈 15개의 기호를 문자열 형태로 작성합니다.
* 테이프가 15칸이므로, 15칸 이상의 입력을 받지 않습니다.
* 공백을 테이프에 넣고싶다면, `B`를 입력하면 됩니다. 띄어쓰기 입력시, 공백이 아닌 띄어쓰기를 입력합니다. 오류가 날 수 있습니다.
* 입력이 15자가 되지 않는다면, 자동으로 남은 칸을 공백으로 채웁니다.


대략 이런 규칙을 지킨다면, [**2.1 얘가 뭘 한다는 거에요?**](https://mojan3543.github.io/ProgrammingByHTML/#21-%EC%96%98%EA%B0%80-%EB%AD%98-%ED%95%9C%EB%8B%A4%EB%8A%94-%EA%B1%B0%EC%97%90%EC%9A%94)의 NOT 비트 연산과 같은, 여러가지 튜링 머신을 구현 할 수 있습니다!
   
```
5-Tuple Action : (A,0,1,R,A);(A,1,0,R,A);(A,B,B,N,B);(B,B,B,N,B)
Tape : 110110101
```   
위는 NOT 비트 연산을 5-Tuple 형식으로 변환한 문자열입니다! 이를 입력해보고, 실행해보세요!   
```
5-Tuple Action : (A,0,X,R,B);(A,C,B,R,F);(B,0,0,R,B);(B,C,C,R,C);(C,0,0,R,C);(C,B,0,L,D);(D,0,0,L,D);(D,C,C,L,E);(E,0,0,L,E);(E,X,X,R,A);(F,0,0,N,F)
Tape : 0000C00000
```   
NOT 비트 연산 뿐만 아니라, 조금 더 복잡한 계산도 가능합니다. 위는 `0`과 `C`로 구분된 일종의 덧셈 식을 계산하는 연산 장치입니다.   
```
5-Tuple Action : (A,B,B,R,B);(B,0,0,R,B);(B,1,1,R,B);(B,B,C,L,C);(C,0,0,L,C);(C,1,1,L,C);(C,B,B,R,D);(D,0,Y,R,E);(D,1,X,R,I);(D,C,C,L,M);(E,0,0,R,E);(E,1,1,R,E);(E,C,C,R,F);(F,0,0,R,F);(F,1,1,R,F);(F,B,0,L,G);(G,0,0,L,G);(G,1,1,L,G);(G,C,C,L,H);(H,0,0,L,H);(H,1,1,L,H);(H,Y,Y,R,D);(I,0,0,R,I);(I,1,1,R,I);(I,C,C,R,J);(J,0,0,R,J);(J,1,1,R,J);(J,B,1,L,K);(K,0,0,L,K);(K,1,1,L,K);(K,C,C,L,L);(L,0,0,L,L);(L,1,1,L,L);(L,X,X,R,D);(M,X,1,L,M);(M,Y,0,L,M);(M,B,B,N,N);(N,B,B,N,N)
Tape : B101001B
```
이렇게 많은 행동표를 작성하면, 더 복잡한 계산이 가능합니다! 위는 이진수 형태의 문자열을 `C`를 간격을 두고 복사하는 연산 장치입니다.   

잡설이 길었지만, 이를 보면 범용 튜링 머신은 원시적이긴 하지만, 프로그래밍 가능하다는 것을 볼 수 있습니다!   
   
이렇게, 프로그래밍이 가능한 범용 튜링 머신은 폰 노이만에 의해, [**폰 노이만 아키텍쳐**](https://ko.wikipedia.org/wiki/%ED%8F%B0_%EB%85%B8%EC%9D%B4%EB%A7%8C_%EA%B5%AC%EC%A1%B0)가 되었습니다. 폰 노이만 아키텍쳐 이전에는 한 기계의 동작 방식을 변경하려면 전선을 빼고 끼우는 작업을 해야 했지만, 폰 노이만이 프로그램의 개념을 개발했고, 현재의 대부분의 컴퓨터가 프로그램에 의해서 동작되고 있습니다.  
   
폰 노이만 아키텍쳐를 채택한 대부분의 컴퓨터가 할 수 있는 일은 단일 테이프 튜링 머신으로 동작 가능합니다[^2]. 즉, 위와 같은 튜링 머신이 충분한 시간과 테이프만 주어진다면 우리가 알고있는 모든 프로그램을 구동 시킬수 있다는 이야기 입니다! 물론, [**DOOM도 구동 될겁니다.**](https://twitter.com/emollick/status/1643839257348386817)
## 3. 튜링 완전 증명
튜링 머신을 동작 시킨다면 튜링 완전 하다는 것은 이제 이해 됐습니다. 그러면, 어떤 언어의 튜링 완전을 증명하려면, 어떤 언어로 튜링 머신을 직접 만들면 되겠죠?   
   
굳이 그렇지는 않습니다! 이미 튜링 완전성이 증명된 어떤 언어(또는 오토마타)를 동작 시키면 되거든요.   
   
예를 들어 이런식입니다. Python이 튜링 완전하다는건 자명한 사실입니다[^3]. 그리고 C로 Python을 구동시키는 CPython라는 것이 있습니다. 즉, C는 Python을 구동 시키기 때문에, 저절로 C는 튜링 완전하게 됩니다!   
   
이런 튜링 등가로 인해서 튜링 완전성이 증명된 아주 간단한 언어를 동작시켜, 특정 언어가 튜링 완전하다는것을 증명시키곤 합니다. 주로 만들어지는 대상은 [**Rule 110**](https://en.wikipedia.org/wiki/Rule_110)입니다.

### 3.1 Rule 110
Rule 110은 일차원 **세포 자동자**의 종류중 하나입니다. 일렬로 배열된 세포의 주변 상태에 따라, 다음 세대의 상태가 결정되는 오토마타입니다.

*여기에 Rule110 입력*

순환 태그 시스템 -> 2태그 시스템 https://medium.com/@barvinograd1/cyclic-tag-system-1-line-of-turing-complete-code-cebe8e18658f
2태그 시스템 - > 튜링 머신 https://dl.acm.org/doi/epdf/10.1145/321203.321206

[^1]: 실제로는 무한한 길이의 테이프를 구현할 수 없으므로, 어떤 기계가 유한한 저장 공간을 가졌지만, 이후에 무한하게 저장 공간을 추가 할 수 있다면, 이 기계를 느슨하게 튜링 완전하다 봅니다.
[^2]: 이는 단일 테이프 튜링 머신을 다중 테이프 튜링 머신으로 확장 시키고, 업 다운 카운터로 단순화, 카운터 머신으로 단순화, 그리고 이 카운터 머신을 현재 컴퓨터에 가까운 레지스터 머신으로 확장 함에 증명되었습니다. 정확한 내용은 [**처치-튜링 명제**](https://en.wikipedia.org/wiki/Church%E2%80%93Turing_thesis)를 살펴보세요.
[^3]: 어떤 명령형 언어가 튜링 완전하기 위해서는, 조건부 반복(Python의 `while`)과 변수의 [**CRUD**](https://ko.wikipedia.org/wiki/CRUD)의 기능이 있으면 됩니다. 

<style>
*{
	font-family: 'Noto Sans KR', sans-serif;
}
.tape {
	position: relative;
	display: grid;
	grid-template: 2rem / repeat(15, 2rem);
	place-items: stretch;
	place-content: center space-evenly;
	margin: auto;
	outline: none;
	width: 34rem;
	height: 2.5rem;
	background-color: #f0f0f0;
	font-weight: bold;
	text-align: center;
	font-size: 1.5rem;
	line-height: 2rem;
}
.cell {
	z-index: 1;
	background-color : #ffffff;
}
.head {
	position: absolute;
	background-color : #000000;
	width: 2.5rem;
	height:4.75rem;
	left: 4.5rem;
}
.state {
	margin: auto;
	width: 2rem;
	height : 2.5rem;
	background-color : #ffffff;
	line-height: 3rem;
}
.inputtray {
	border: none;
	box-shadow: none;
	background-color: #ffffff;
	padding: 0.5rem;
	margin: auto;
	display: flex;
	flex-flow: column wrap;
	place-content: center;
	align-items: flex-end;
	font-weight: bold;
	text-align: center;
	font-size: 1.2rem;
}
.inputandcommit{
	margin-top: auto;
}
.inputtext{
	margin-left: 1rem;
	width: 15rem;
}
.commitbutton{
	margin-left: 1.5rem;
	border: none;
	box-shadow: none;
	background-color: #ffffff;
	font-weight: bold;
	font-size: 1.5rem;
	text-align: center;
}
.commitbutton:hover{
	transform: rotate(130deg) translatex(0.5rem);
	transition: 0.4s;
}
.commitbutton:active{
	color: #088A08;
	transform: rotate(130deg) translatex(0.5rem) scale(1.1);
	transition: 0.1s;
}
.controller {
	border: none;
	box-shadow: none;
	background-color: #ffffff;
	padding: 0.5rem;
	margin-top: 2.5rem;
	display: flex;
	flex-flow: row wrap;
	place-content: center;
	font-weight: bold;
	text-align: center;
	font-size: 2rem;
}
.nextAct {
	border: none;
	box-shadow: none;
	background-color: #ffffff;
	padding: 0.1rem;
	margin: auto;
	font-weight: bold;
	text-align: center;
	font-size: 2rem;
}
.nextAct:hover{
	transform: translatex(-0.4rem) rotate(-20deg);
	transition: 0.7s;
}
.nextAct:active{
	transform: translatex(0.3rem) rotate(10deg);
	transition: 0.2s;
}
.refresh {
	outline: none;
	border: none;
	box-shadow: none;
	background-color: #ffffff;
	padding: 0.1rem;
	margin: auto;
	font-weight: bold;
	text-align: center;
	font-size: 2rem;
}
.refresh:hover{
	transform: rotate(360deg);
	transition: 0.5s;
}
.refresh:active{
	transform: scale(1.2);
	transition: 0.1s;
}
.autoAct {
	border: none;
	box-shadow: none;
	background-color: #ffffff;
	padding: 0.1rem;
	margin: auto;
	display: flex;
	font-weight: bold;
	text-align: center;
	font-size: 2rem;
}
.autoAct:hover{
	transform: rotate(360deg);
	transform-origin: 52.5% 52.5%;
	transition: 2s;
}
.automata {
	position: relative;
	display: grid;
	grid-template: repeat(4, 2rem) / repeat(15, 2rem);
	place-items: stretch;
	place-content: space-evenly;
	margin: auto;
	outline: none;
	width: 34rem;
	height: 9.25rem;
	background-color: #f0f0f0;
	font-weight: bold;
	text-align: center;
	font-size: 1.5rem;
	line-height: 2rem;
}
.rule {

	position: relative;
	display: grid;
	grid-template: 3.375rem / repeat(8, 5.0625rem);
	place-items: stretch;
	place-content: space-evenly;
	margin: auto;
	margin-top: 1rem;
	margin-bottom: 1rem;
	outline: none;
	width: 47.25rem;
	height: 3rem;
}
.ruleElement {
	position: relative;
	display: grid;
	grid-template: repeat(2, 1.5rem)/ repeat(3, 1.5rem);
	place-items: stretch;
	place-content: space-evenly;
	margin: auto;
	outline: none;
	width: 5.0625rem;
	height: 3.375rem;
	background-color: #f0f0f0;
}
.BitNot {
	overflow-x: auto;
}
.Universal {
	overflow-x: auto;
}
</style>

<script>
	class TuringMachine{
		constructor(query, preset, firstState){
			this.HeadIndex = 0;
			this.presetState = firstState;
			this.NowState = firstState;
			this.ActTable = {};
			this.presetList = Object.assign([], preset);
			this.MainHTML = document.querySelector(query);
			this.HTMLconstruct();
			if(query == 'div.Universal'){
				this.Universalconstruct();
				this.MainHTML.querySelectorAll('button')[2].onclick = this.TextToTuple.bind(this);
				this.MainHTML.querySelectorAll('button')[3].onclick = this.TextToPreset.bind(this);
			}
			this.ButtonHTML = this.MainHTML.querySelectorAll('Button');
			this.headHTML = this.MainHTML.querySelector('div.tape > div.head');
			this.headStateHTML = this.headHTML.querySelector('div.state');
			this.cellHTML = this.MainHTML.querySelectorAll('div.tape > div.cell');
			this.ButtonHTML[0].onclick = this.Act.bind(this);
			this.ButtonHTML[1].onclick = this.Refresh.bind(this);
			this.cell = [];
			for(let i=0; i<preset.length; i++){
				switch(preset[i]){
					case 'B':
						this.cell[i] = '';
						break;
					case -1:
						this.cell[i] = Math.round(Math.random());
						break;
					default:
						this.cell[i] = preset[i];
						break;
				}
			}
			for(let i=preset.length; i<this.cellHTML.length; i++){
				this.presetList.push('');
				this.cell.push('');
			}
			
		}
		HTMLconstruct(){
			let TapeModel = document.createElement('div');
			TapeModel.className = 'tape';
			this.MainHTML.appendChild(TapeModel);
			let HeadModel = document.createElement('div');
			HeadModel.className = 'head';
			HeadModel.innerHTML = '.';
			TapeModel.appendChild(HeadModel);
			let stateModel = document.createElement('div');
			stateModel.className = 'state';
			HeadModel.appendChild(stateModel);
			for(let i=0; i<15; i++){
				let CellModel = document.createElement("div");
				CellModel.className = 'cell';
				TapeModel.appendChild(CellModel);
			}
			let ControllerModel = document.createElement("div");
			ControllerModel.className = 'controller';
			this.MainHTML.appendChild(ControllerModel);
			let ActModel = document.createElement("button");
			ActModel.className = 'nextAct';
			ActModel.innerHTML = '→'
			ControllerModel.appendChild(ActModel);
			let refreshModel = document.createElement("button");
			refreshModel.className = 'refresh';
			refreshModel.innerHTML = '↻';
			ControllerModel.appendChild(refreshModel);
		}
		Universalconstruct(){
			let inputtrayModel = document.createElement("div");
			inputtrayModel.className = 'inputtray';
			this.MainHTML.appendChild(inputtrayModel);
			let Names = ['5-Tuple Action', 'Tape'];
			for(let i=0; i<2; i++){
				let inputandcommitModel = document.createElement("div");
				inputandcommitModel.className = 'inputandcommit';
				inputandcommitModel.innerHTML = Names[i];
				inputtrayModel.appendChild(inputandcommitModel);
				let inputtextModel = document.createElement("input");
				inputtextModel.className = 'inputtext';
				inputtextModel.type = 'text';
				inputandcommitModel.appendChild(inputtextModel);
				let buttonModel = document.createElement("button");
				buttonModel.className = 'commitbutton';
				buttonModel.innerHTML = '⇁';
				inputandcommitModel.appendChild(buttonModel);
			}
			
		}
		CellUpdate(){
			for(let i=0; i<this.cellHTML.length; i++){
				this.cellHTML[i].innerHTML = this.cell[i];
			}
		}
		Refresh(){
			this.HeadIndex = 0;
			this.NowState = this.presetState;
			for(let i=0; i<this.presetList.length; i++){
				switch(this.presetList[i]){
					case 'B':
						this.cell[i] = '';
						break;
					case -1:
						this.cell[i] = Math.round(Math.random());
						break;
					default:
						this.cell[i] = this.presetList[i];
						break;
				}
			}
			for(let i=this.presetList.length; i<this.cellHTML.length; i++){
				this.cell[i] = '';
			}
			this.HeadDisplayUpdate();
			this.HeadUpdate();
			this.CellUpdate();
		}
		HeadDisplayUpdate(){
			this.headStateHTML.innerHTML = this.NowState;
		}
		HeadUpdate(){
			this.headHTML.style.left = this.HeadIndex*2.25+'rem';
		}
		HeadWrite(celldata){
			if(celldata == 'B')
				this.cell[this.HeadIndex] = '';
			else
				this.cell[this.HeadIndex] = celldata;
			this.CellUpdate();
		}
		HeadLeft(){
			if(--this.HeadIndex<0)
				this.HeadIndex = 0;
			this.HeadUpdate();
		}
		HeadRight(){
			if(++this.HeadIndex>=this.cellHTML.length)
				this.HeadIndex = this.cellHTML.length-1;
			this.HeadUpdate();
		}
		//(State, Read, Write, Move, NextState)
		TupletoActTable(Tuple){
			if(!(Tuple[0] in this.ActTable))
				this.ActTable[Tuple[0]] = {};
			if(!(Tuple[1] in this.ActTable[Tuple[0]]))
				this.ActTable[Tuple[0]][Tuple[1]] = {};
			this.ActTable[Tuple[0]][Tuple[1]] = [Tuple[2], Tuple[3], Tuple[4]];
		}
		Act(){
			let State = this.NowState;
			let Read = this.cell[this.HeadIndex];
			if(Read === '')
				Read = 'B';
			try {
				if(!(State in this.ActTable)||!(Read in this.ActTable[State]))
					throw 'NoStateReadError';
				let Write = this.ActTable[State][Read][0];
				let Move = this.ActTable[State][Read][1];
				let NextState = this.ActTable[State][Read][2];
				if((Move == 'L' && this.HeadIndex == 0)||(Move == 'R' && this.HeadIndex == 14))
					throw 'OutOfBound';
				this.HeadWrite(Write);
				switch(Move){
					case 'L':
						this.HeadLeft();
						break;
					case 'R':
						this.HeadRight();
						break;
				}
				this.NowState = NextState;
				this.HeadDisplayUpdate();
			}
			catch(err){
				switch(err){
					case 'NoStateReadError':
						alert("현재 상태가 행동표에 정의되지 않았습니다.");
						break;
					case 'OutOfBound':
						alert("헤드가 움직일 공간이 없습니다.");
						break;
						
				}
			}
		}
		TextToTuple(){
			try{
				let text = this.MainHTML.querySelectorAll('input')[0].value;
				let tuplelist = text.split(';');
				let CommandList = [];
				tuplelist.forEach(function(tuple){
					if(tuple[0] != '(' || tuple[tuple.length-1] != ')')
						throw "UndueTupleString";
					let Command = tuple.slice(1, tuple.length-1).split(',');
					if(Command.length != 5)
						throw "TupleLengthError";
					if('A' > Command[0] || Command[0] > 'Z')
						throw "StateIndexError";
					if('A' > Command[4] || Command[4] > 'Z')
						throw "NextIndexError";
					if(Command[3] != 'L' && Command[3] != 'N' && Command[3] != 'R')
						throw "MoveIndexNotLRN";
					Command.forEach(function(Com){
						if(Com.length != 1)
							throw "CommandLengthError";
					});
					CommandList.push(Command);
				});
				CommandList.forEach(Command => this.TupletoActTable(Command))
				this.Refresh();
			}
			catch(err){
				switch(err){
					case 'UndueTupleString':
						alert("작성된 튜플의 양식이 적절하지 않습니다.");
						break;
					case 'TupleLengthError':
						alert("튜플의 길이가 5가 아닙니다.");
						break;
					case 'MoveIndexNotLRN':
						alert("튜플의 4번째 인자가 L, R, N중 하나가 아닙니다.");
						break;
					case 'CommandLengthError':
						alert("튜플의 인자의 길이가 한글자가 아닙니다.");
						break;
					case 'StateIndexError':
						alert("튜플의 1번째 인자가 대문자 알파벳이 아닙니다.");
						break;
					case 'NextIndexError':
						alert("튜플의 5번째 인자가 대문자 알파벳이 아닙니다.");
						break;
					default:
						alert(err);
						break;
				}	
			}
		}
		TextToPreset(){
			try{
				let text = this.MainHTML.querySelectorAll('input')[1].value;
				if(text.length>15)
					throw "TextLengthError";
				this.presetList = [];
				text.split('').forEach(textElement => this.presetList.push(textElement))
				this.Refresh();
			}
			catch(err){
				switch(err){
					case 'TextLengthError':
						alert("작성된 테이프의 길이가 16자 이상입니다.");
						break;
					default:
						alert(err);
				}
			}
		}
	}
	let BitNotdiv = new TuringMachine('div.BitNot', [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 'A');
	BitNotdiv.CellUpdate();
	BitNotdiv.HeadUpdate();
	BitNotdiv.HeadDisplayUpdate();
	BitNotdiv.TupletoActTable(['A', '0', '1', 'R', 'A']);
	BitNotdiv.TupletoActTable(['A', '1', '0', 'R', 'A']);
	BitNotdiv.TupletoActTable(['A', 'B', 'B', 'N', 'B']);
	BitNotdiv.TupletoActTable(['B', 'B', 'B', 'N', 'B']);
	
	let UniversalTuringMachine = new TuringMachine('div.Universal', [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], 'A');
	UniversalTuringMachine.CellUpdate();
	UniversalTuringMachine.HeadUpdate();
	UniversalTuringMachine.HeadDisplayUpdate();
</script>
