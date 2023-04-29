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

### 1.3 천리길도 `<div>` 부터
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
  
