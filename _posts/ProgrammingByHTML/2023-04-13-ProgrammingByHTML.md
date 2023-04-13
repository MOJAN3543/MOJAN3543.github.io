---
title: 저는 HTML로 프로그래밍 해요
toc: true
toc_sticky: true
last_modified_at: 2023-04-13
---
![저는HTML로프로그래밍해요](https://github.com/MOJAN3543/MOJAN3543.github.io/blob/main/_posts/ProgrammingByHTML/HTMLisnotProgrammingLang.jpg?raw=true "저는HTML로 프로그래밍해요")
{: .text-center}    

농담입니다! HTML로는 프로그래밍 할 수 없습니다. [**HTML**](https://ko.wikipedia.org/wiki/HTML)의 [**ML**](https://ko.wikipedia.org/wiki/%EB%A7%88%ED%81%AC%EC%97%85_%EC%96%B8%EC%96%B4)부터 마크업 언어. 
즉 데이터를 기술하는 언어라고 표기 되어있습니다. 하지만, HTML과 마크업 언어를 보조하는 [**스타일 시트 언어**](https://en.wikipedia.org/wiki/Style_sheet_language)인 [**CSS**](https://ko.wikipedia.org/wiki/CSS)를 같이 사용한다면, 이는 튜링 완전하게 됩니다!   
   
이 뒤의 내용은 온전히 학부생의 시선으로 수집하고, 작성한 정보입니다. 완전하지 않을 수 있습니다.{: .notice--warning}
## 1. 튜링 완전?
어떤 프로그래밍 언어가 튜링 완전하다고 한다면, 어떤 프로그래밍 언어로 튜링 머신을 동작시킬수 있다는 말과 같습니다.   
### 1.1 튜링 머신?
튜링 머신이란, 엘런 튜링이 제시한, 계산을 할 수 있는 가상의 기계. 즉 오토마타를 말합니다.
#### 1.1.1 오토마타?
...... 끝이 없겠네요.  
## 2. 간단하게!
일단. 태초에 [**튜링 머신**](https://ko.wikipedia.org/wiki/%ED%8A%9C%EB%A7%81_%EA%B8%B0%EA%B3%84)이 있었습니다.  

![TuringMachine](https://github.com/MOJAN3543/MOJAN3543.github.io/blob/main/_posts/ProgrammingByHTML/TuringMachine.jpeg?raw=true "TuringMachine")
{: .text-center}  
  
튜링 머신은 간단하게 2가지 요소로 이루어져 있습니다. 저장장치 역할을 하는 테이프[^1]와, 여러가지 행동을 하는 장치로 나뉘어집니다.   
   
*여기에 인터렉티브 입력*
https://www.geeksforgeeks.org/turing-machine-addition/?ref=lbp ~!~

[^1]: 정확하게는 무한한 길이의 테이프 입니다. 하지만, 실제로는 무한한 길이의 테이프를 구현할 수 없으므로, 유한한 저장 공간이나, 이후에 무한하게 저장 공간을 추가 할 수 있다면, 느슨한 튜링 완전성이라고 봅니다.
