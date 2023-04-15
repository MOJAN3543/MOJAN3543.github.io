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

농담입니다! HTML로는 프로그래밍 할 수 없습니다. [**HTML**](https://ko.wikipedia.org/wiki/HTML)의 [**ML**](https://ko.wikipedia.org/wiki/%EB%A7%88%ED%81%AC%EC%97%85_%EC%96%B8%EC%96%B4)부터 마크업 언어. 
즉 데이터를 기술하는 언어라고 표기 되어있습니다. 하지만, HTML과 마크업 언어를 보조하는 [**스타일 시트 언어**](https://en.wikipedia.org/wiki/Style_sheet_language)인 [**CSS**](https://ko.wikipedia.org/wiki/CSS)를 같이 사용한다면, 이는 튜링 완전하게 됩니다!   
   
⚠ 주의 : 이 뒤의 내용은 온전히 학부생의 시선으로 수집하고, 작성한 정보입니다. 정보의 내용이나 논리가 완전하지 않을 수 있습니다.
{: .notice--warning}    

## 1. 튜링 완전?
어떤 프로그래밍 언어가 튜링 완전하다고 한다면, 어떤 프로그래밍 언어로 튜링 머신을 동작시킬수 있다는 말과 같습니다.   
### 1.1 튜링 머신?
튜링 머신이란, 엘런 튜링이 제시한, 계산을 할 수 있는 가상의 기계. 즉 오토마타를 말합니다.
#### <sub>1.1.1 오토마타?</sub>
...... 끝이 없겠네요.  
## 2. 간단하게!
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
<div class='BitNot'>
   <div class='tape'>
      <div class='head'>
         .
         <div class='state'>

         </div>
      </div>
      <div class='cell'>

      </div>
      <div class='cell'>

      </div>
      <div class='cell'>

      </div>
      <div class='cell'>

      </div>
      <div class='cell'>

      </div>
      <div class='cell'>

      </div>
      <div class='cell'>

      </div>
      <div class='cell'>

      </div>
      <div class='cell'>

      </div>
      <div class='cell'>

      </div>
      <div class='cell'>

      </div>
      <div class='cell'>

      </div>
      <div class='cell'>

      </div>
      <div class='cell'>

      </div>
      <div class='cell'>

      </div>

   </div>
   <div class='controller'>
      <button class='nextAct'>
         →
      </button>
      <button class='refresh'>
         ↻
      </button>
   </div>
</div>    
위는 **실제로 동작하는** 튜링 머신입니다! 

[^1]: 실제로는 무한한 길이의 테이프를 구현할 수 없으므로, 어떤 기계가 유한한 저장 공간을 가졌지만, 이후에 무한하게 저장 공간을 추가 할 수 있다면, 이 기계를 느슨하게 튜링 완전하다 봅니다.
