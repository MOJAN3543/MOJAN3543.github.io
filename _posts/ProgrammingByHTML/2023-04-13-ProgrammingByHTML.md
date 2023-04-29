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
### 1.1. 튜링 머신?
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

### 2.1. 튜링 머신이 할 수 있는 일
할 수 있는거라곤 테이프에서 움직이고, 테이프를 읽고 쓰는 이 기계가 뭘 할 수 있을까요?   
<div class='BitNot'></div>

위는 실제로 동작하는 **튜링 머신**입니다! **→**로 다음 행동을 할 수 있고, **↻**로 튜링 머신을 초기화 할 수 있습니다.   
    
저는 여기에 다음과 같은 행동표를 삽입했습니다.   
    
| 현재 상태 | 읽혀진 기호 | 쓰이는 기호 | 이동 종류 | 다음 상태 | 5-튜플 표현 |
|:--------|:--------|:--------|:--------|:--------|:--------|
| A | 0 | 1 | R | A | (A, 0, 1, R, A) |
| A | 1 | 0 | R | A | (A, 1, 0, R, A) |
| A | B | B | N | B | (A, B, B, N, B) |
| B | B | B | N | B | (B, B, B, N, B) |
   
차근차근 설명하겠습니다.    
    
우선 제가 구현한 튜링머신은 초기 상태로 `A`를 가지고 있습니다. 행동표에 따라, `A` 상태일때 `0`을 읽으면 `1`을 테이프에 쓰고 오른쪽<sub>R</sub>으로 이동 후 `A` 상태가 됩니다. 그리고 `A`상태일때 `1`을 읽으면 `0`을 테이프에 쓰고 오른쪽<sub>R</sub>으로 이동 후 `A` 상태가 됩니다.    
    
만약에 `A`상태일때 `ㅤ`을 만나면, 즉 공백<sub>B</sub>을 만나면 어떻게 될까요? 위의 행동표를 보면 알겠지만, 공백<sub>B</sub>을 작성 후 움직이지 않고<sub>N</sub> `B`상태가 됩니다. 그리고 `B`상태에서는 공백<sub>B</sub>을 만나면, 공백<sub>B</sub>을 작성. 움직이지 않습니다<sub>N</sub>. 즉, `B` 상태가 되면 튜링 머신이 정지합니다.    
    
그리고 눈치 채셨겠지만, 이는 0을 1로 만들고, 1을 0으로 만드는 NOT 비트 연산을 구현한 튜링 머신입니다!
### 2.2. 조금 더 업그레이드 버전
앨런 튜링은 여기서 조금 더 나아가서, 해당 튜링 머신이, 테이프의 내용만 입력받는것이 아닌, 튜링 머신이 동작하는 방식도 입력 받아서, 한 장치가 여러가지 일을 할 수 있게 만든 **범용 튜링 머신**을 고안합니다[^2].   
<div class='Universal'></div>

위는 실제로 동작하는 **범용 튜링 머신**입니다! `5-Tuple Action`과 `Tape`에 입력하고 **⇁**로 튜링 머신에 적용할 수 있습니다. 입력시에는 다음과 같은 규칙을 지키면 됩니다.

5-Tuple Action   
* 입력은 행동표의 5-튜플 표현과 같은 방식으로 이루어집니다. `(현재 상태,읽혀진 기호,쓰이는 기호,이동 종류,다음 상태)`를 입력합니다.
* 튜플의 기호와 기호 사이에는 <sub>,</sub>만 입력되어야 합니다. 띄어쓰기를 허용하지 않습니다.
* 튜플의 기호에는 한글자씩 입력되어야 합니다. 즉, 현재 상태에 사용되는 상태 기호나 테이프에 사용되는 기호에도 두글자 이상 사용되면 안됩니다.
* 튜플의 상태<sub>(1, 5번째 인자)</sub>는 모두 대문자 알파벳입니다. 소문자 알파벳 또는 숫자를 허용하지 않습니다.
* 공백을 입력하거나, 읽고 싶다면, `B`를 입력하면 됩니다. 다시 말해서, `B`를 테이프에 작성 하거나 읽을 수 없습니다.
* 튜플의 이동 종류<sub>(4번째 인자)</sub>는 L<sub>왼쪽 이동</sub>, N<sub>이동하지 않음</sub>, R<sub>오른쪽 이동</sub>중 하나여야 합니다.
* 헤드가 테이프의 0번 인덱스에서 왼쪽으로 가거나, 14번 인덱스에서 오른쪽으로 가는 행동은 실행되지 않습니다.
* 튜플과 튜플 사이에는 세미콜론<sub>;</sub>이 있어야 합니다. 단, 마지막 튜플 뒤에는 세미콜론을 붙이지 않습니다.
    
Tape
* 입력은 테이프에 들어갈 15개의 기호를 문자열 형태로 작성합니다.
* 테이프가 15칸이므로, 15칸 이상의 입력을 받지 않습니다.
* 공백을 테이프에 넣고싶다면, `B`를 입력하면 됩니다. 띄어쓰기 입력시, 공백이 아닌 띄어쓰기를 입력합니다. 오류가 날 수 있습니다.
* 입력이 15자가 되지 않는다면, 자동으로 남은 칸을 공백으로 채웁니다.


대략 이런 규칙을 지킨다면, [**2.1 튜링 머신이 할 수 있는 일**](https://mojan3543.github.io/ProgrammingByHTML/#21-%ED%8A%9C%EB%A7%81-%EB%A8%B8%EC%8B%A0%EC%9D%B4-%ED%95%A0-%EC%88%98-%EC%9E%88%EB%8A%94-%EC%9D%BC)의 NOT 비트 연산과 같은, 여러가지 튜링 머신을 구현 할 수 있습니다!
   
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
   
이후 시간이 흘러 프로그래밍이 가능한 범용 튜링 머신은 폰 노이만에 의해, [**폰 노이만 아키텍쳐**](https://ko.wikipedia.org/wiki/%ED%8F%B0_%EB%85%B8%EC%9D%B4%EB%A7%8C_%EA%B5%AC%EC%A1%B0)로 발전 되었습니다. 폰 노이만 아키텍쳐 이전에는 한 기계의 동작 방식을 변경하려면 전선을 빼고 끼우는 작업을 해야 했지만, 폰 노이만이 프로그램의 개념을 개발했고, 현재의 대부분의 컴퓨터가 프로그램에 의해서 동작되고 있습니다.  
   
폰 노이만 아키텍쳐를 채택한 컴퓨터가 할 수 있는 일은 단일 테이프 튜링 머신으로 동작 가능합니다[^3]. 즉, 위에 서술된 튜링 머신이 충분한 시간과 테이프만 주어진다면 우리가 알고있는 모든 프로그램을 구동 시킬수 있다는 이야기 입니다! 물론, [**DOOM도 구동 될겁니다.**](https://twitter.com/emollick/status/1643839257348386817)
## 3. 튜링 완전 증명
"프로그래밍 언어가 튜링 머신을 동작 시킨다면 그것은 튜링 완전 하다"는 것은 이제 이해 됐습니다. 그러면, 특정 언어의 튜링 완전을 증명하려면, 그 언어로 튜링 머신을 직접 만들면 되겠죠?   
   
굳이 그렇지는 않습니다! 튜링 머신을 만드는 대신, 이미 튜링 완전성이 증명된 어떤 언어(또는 오토마타)를 동작 시키면 되거든요.   
   
예를 들어 이런식입니다. Python이 튜링 완전하다는건 자명한 사실입니다[^4]. 그리고 C언어로는 Python을 구현 할 수 있습니다[^5]. 즉, C는 Python을 구동 시키기 때문에, 저절로 C는 튜링 완전하게 됩니다!   
   
특정 언어 C가 언어 P를 구동 시킬 수 있고, 그 반대도 성립하면, C와 P는 동등 하다고 할 수 있습니다. 이를 **튜링 등가**라고 합니다. 튜링 등가로 인해서 튜링 완전성이 증명된 아주 간단한 언어를 동작시켜, 특정 언어가 튜링 완전하다는것을 증명시키곤 합니다. 주로 구현의 대상이 되는것은 [**Rule 110**](https://en.wikipedia.org/wiki/Rule_110)입니다.

### 3.1. Rule 110
Rule 110은 **기초 세포 자동자**<sub>(Elementary Cellular Automata)</sub>의 종류중 하나입니다. 일렬로 배열된 세포의 주변 상태에 따라, 다음 세대의 상태가 결정되는 오토마타입니다.   
<div class='Rule110'></div>

위는 실제로 동작하는 **Rule 110 시뮬레이터**[^6]입니다! **→**로 다음 칸으로 이동하고, **⮒**로 다음줄로 이동, **↻**로 시뮬레이터를 초기화 할 수 있습니다.    
   
해당 시뮬레이터는 시뮬레이터의 8가지[^7] 패턴에 따라 다음 세포의 상태가 결정됩니다.  

![Rule110MachineExample](https://github.com/MOJAN3543/MOJAN3543.github.io/blob/main/_posts/ProgrammingByHTML/Rule110MachineExample.png?raw=true "Rule110MachineExample")
{: .text-center}  
마치 이런식입니다. 한 세포가 켜져있는 것을 `1`로, 꺼져 있는 것을 `0`으로 치환을 하겠습니다. 위의 패턴에 의하면, `001`의 다음 세대는 `1`이므로, 시뮬레이터의 `001`의 결과도 3개의 셀 중앙 아래칸에 `1`로 나타나 있습니다.   
   
Rule 110의 의미도 이 패턴을 의미합니다. `111`부터 `000`까지의 경우에서 생산 하는 다음 세대의 규칙인 `01101110`. 즉 110으로 부르게 되는것이죠[^8].   
   
시뮬레이터는 이 8가지 규칙대로 계속해서 다음 세대를 생산해 나갑니다. 그런데, 이게 또 무슨 의미가 있는건가요?

### 3.2. Rule 110의 의미
이 시뮬레이터에서 보기는 힘들겠지만, 다음 세대를 생산하고 생산하다 보면, 조금씩 규칙이 보이기 시작합니다.   
   
![Rule110Glider](https://github.com/MOJAN3543/MOJAN3543.github.io/blob/main/_posts/ProgrammingByHTML/Glider-classification-in-Rule-110.png?raw=true"Rule110Glider")
{: .text-center} 
<span style="font-size:50%">[Determining a Regular Language by Glider-Based Structures called Phases - Scientific Figure on ResearchGate.](https://www.researchgate.net/figure/Glider-classification-in-Rule-110_fig1_220440959)</span>
{: .text-center} 
이렇게 몇 세대에 걸쳐서 좌측, 또는 우측으로 움직이거나 움직이지 않는 규칙들이 보입니다. 이를 글라이더라고 합니다.   
   
Rule 110을 언어로서 사용하기 위해서, 특정 글라이더를 `0`과 `1`로 구분 지어 사용합니다. 그리고 이 글라이더들이 충돌하며, 그냥 통과하거나, 충돌하여 사라지거나, 충돌하여 새로운 글라이더가 만들어지는 경우가 있습니다. 예를 들어, `1`로 정의된 글라이더가 구분자로 정의된 글라이더와 충돌한다면, `11` 또는 `10`에 해당하는 글라이더를 생산하는 규칙을 정의 할 수 있습니다[^9].
   
이런 성질들을 이용하여 Rule 110은 순환 태그 시스템<sub>Cyclic Tag-System</sub>을 구동합니다.  
### 3.3. 순환 태그 시스템
순환 태그 시스템은 뭘까요?
   
순환 태그 시스템은 `0`과 `1`로 이루어진 문자열 W와 단어 생산 규칙 P가 주어집니다. 주어진 단어 생산 규칙들을 순환하며 문자열 첫 단어가 `1`이면 생산 규칙에서 해당 차례에 맞는 단어를 생산하는 오토마타입니다.
<div class='Cyclic'></div>

위는 실제로 동작하는 **순환 태그 시스템**입니다. `Start Word`에서 순환 태그 시스템의 시작 문자열 W를 설정 할 수 있고, `Production Rule`에서 단어 생산 규칙 P를 설정 할 수 있습니다. **→**로 다음 생산을 진행하고, **↻**로 시뮬레이터를 초기화 할 수 있습니다.   
   
`Start Word`와 `Production Rule`은 다음 규칙을 지키면서 입력 하면 됩니다.

Start Word   
* 모든 값은 `0`과 `1`로 이루어져야 합니다. 
    
Prodution Rule
* 생산 하는 모든 값은 `0`과 `1`로 이루어져야 합니다.
* 룰의 첫 글자는 `(`, 마지막 글자는 `)`이어야 합니다.
* 생산하는 값들의 사이에는 콤마<sub>,</sub>만 들어가야합니다.
* 룰에는 `(`, `)`, `,`, `0`, `1` 만 포함되어야 합니다.



이런 규칙들로 이루어진 예제가 입력되어 있습니다. 예제를 살펴보면, `11001`에서 시작하여 문자열을 생산하다가, `10` → `0010` → `010` → `10`을 계속 순환하는 것을 알 수 있습니다.  
  
만약 시작 문자열을 `010`으로 바꾸면 어떻게 될까요? 두번째 생산 규칙인 `000`이 생산된 뒤, `1`이 더이상 남지 않아 생산이 멈추고 문자열의 길이가 0이 되며 종료 되는 것을 볼 수 있습니다.  
  
이 순환 태그 시스템은 `0`과 `1`로 이루어진 이진수가 아닌, 더 범용적인 기호를 사용하기 위해서 또 다른 시스템을 구동합니다.
### 3.4. 2 태그 시스템
순환 태그 시스템으로는 2 태그 시스템<sub>2-Tag System</sub>을 구동 할 수 있습니다[^10]. 2 태그 시스템은 뭘까요?

2 태그 시스템은 순환 태그 시스템과 유사하게 특정 기호를 읽고 생산 규칙에 따라 특정 기호를 생산하는 오토마타입니다.  
  
하지만, 순환 태그 시스템과는 달리 한 기호에 대해 한 가지 생산 규칙을 가지고 있고, 이진수가 아닌 단어를 사용한다는 특징이 있습니다. 또한, 단어를 생산할때 1개의 앞 기호를 지우는 순환 태그 시스템과는 달리, 2 태그 시스템은 2개의 기호를 지운 뒤 기호를 생산합니다.
<div class='TwoTag'></div>

위는 실제로 동작하는 **2 태그 시스템**입니다. `Start Word`와 `Production Rule`은 다음 규칙을 지키면서 입력 하면 됩니다.

Start Word   
* 모든 값은 알파벳으로 이루어져야 합니다.
    
Prodution Rule
* 입력 받는 기호와 생산 하는 기호는 알파벳로 이루어져야 합니다.
* 룰의 첫 글자는 `(`, 마지막 글자는 `)`이어야 합니다.
* 생산하는 값들의 사이에는 콤마<sub>,</sub>만 들어가야 합니다.
* 입력 받는 기호는 한글자입니다.
* 입력 받는 기호가 중복 되지 않아야 합니다.
* 입력 받는 기호와 생산 하는 기호 사이에는 콜론<sub>:</sub>만 들어가야 합니다.
* 입력 받는 기호가 `H`라면, 2 태그 시스템은 작동을 정지합니다.

이 순환 태그 시스템은 2 태그 시스템을 구동 할 수 있습니다. 특정 기호를 이진수로 치환하고, 순환 하는 생산 규칙에 생산 규칙을 적용 시키는 [**방식**](https://medium.com/@barvinograd1/cyclic-tag-system-1-line-of-turing-complete-code-cebe8e18658f)으로 2 태그 시스템의 기호를 완전히 대체 할 수 있습니다. 

예를 들어 보겠습니다. 위의 2 태그 시스템 시뮬레이터에서 사용된 예제인 `baa` 예제를 순환 태그 시스템으로 변경하자면, 우선 2 태그 시스템에서 사용된 기호들을 이진수로 변환 해야 합니다.
```
a : 1000
b : 0100
c : 0010
H : 0001
```
다음과 같이 기호를 이진수로 변환 하는데, 첫번째 기호는 `1000`, 그 다음 기호는 `0100` ... 이렇게 변환합니다.  
  
그리고 생산 규칙도 변환 하여 변환한 기호의 순서에 따라 정렬 합니다.
```
a → ccbaH
b → cca
c → cc
(0010 0010 0100 1000 0001, 0010 0010 1000, 0010 0010, - , - , - , - , -)
```
이렇게 기호를 `a`, `b`, `c` 순서로 변환 했다면, 순환 태그 시스템의 생성 규칙 또한 `a`, `b`, `c` 순서로 변환 합니다. 그리고 남는 생성 규칙 칸에는 `(사용된 기호의 수 × 2)` 칸이 될 때 까지 빈칸을 채웁니다.   
```
Start Word : 010010001000
Production Rule : (00100010010010000001,001000101000,00100010,,,,,)
```
이것이 2 태그 시스템을 순환 태그 시스템으로 구동하는 방법입니다. 위로 올라가서 직접 실행 해보세요! 8번 생산 할때마다 2 태그 시스템 에서의 결과가 나옵니다[^12].
### 3.5. 종점
![TagsystemUniversal](https://github.com/MOJAN3543/MOJAN3543.github.io/blob/main/_posts/ProgrammingByHTML/TagsystemUniversal.png?raw=true"TagsystemUniversal")
{: .text-center}  

<span style="font-size:50%">[Universality of Tag Systems With P = 2, p.17](https://dl.acm.org/doi/epdf/10.1145/321203.321206)</span>
{: .text-center} 
2 태그 시스템은 튜링 머신을 [**가동합니다**](https://dspace.mit.edu/handle/1721.1/6107). 튜링 머신의 헤드의 앞과 뒤 문자를 이진수로 치환한 정수로 생각하고, 이 두 자연수 `a`, `b`를, 2 태그 시스템에 정수로 기입, 그 정수를 비트 연산하여 헤드를 움직이는 방식으로 튜링 머신을 구현했습니다!  
  
이것으로 Rule 110이 튜링 완전한 오토마타라는것을 알 수 있었습니다.

## 4. HTML과 CSS 이야기
약간 논점을 잃을뻔 했지만, 이 글의 중점은 HTML과 CSS가 함께 있으면 튜링 완전하다는 사실입니다! 그래서 HTML과 CSS로 Rule 110을 구현한다면 튜링 완전하다고 볼 수 있겠네요!   
   
하지만, HTML과 CSS는 앞서 언급했듯이 프로그래밍 언어가 아닙니다. 즉, 이렇다할 제어문이 없습니다. 그러면 어떻게 Rule 110을 구현 할 수 있는걸까요?

### 4.1. CSS의 특이한 선택자
CSS에는 `+`라는 선택자가 있습니다. 이는 어떤 요소를 이전에 둔 한 요소를 선택하는 선택자입니다. 예를 들면 이런식 입니다.
```
{% raw %}<head>
    <style>
        .Mario {
            color: red;
        }
    </style>
</head>
<body>
    <div class="Mario">Mario</div>
    <div>Luigi</div>
    <div>Wario</div>
    <div>Waluigi</div>
</body>{% endraw %}
```
![MarioOnly](https://github.com/MOJAN3543/MOJAN3543.github.io/blob/main/_posts/ProgrammingByHTML/MarioOnly.png?raw=true "MarioOnly")
{: .text-center}  
슈퍼 마리오 제작진이 극적인 제작비 절감을 위해, 인기 캐릭터인 마리오만 클래스를 지정해줬다고 가정해 봅시다. 이 상황에서, `Luigi` 클래스를 지정하지 않은채, 루이지만 폰트 색상을 초록색으로 바꿀 수 있을까요?  
```
{% raw %}<head>
    <style>
        .Mario {
            color: red;
        }
        .Mario + div {
            color: green;
        }
    </style>
</head>
<body>
    <div class="Mario">Mario</div>
    <div>Luigi</div>
    <div>Wario</div>
    <div>Waluigi</div>
</body>{% endraw %}
```
![MarioNLuigi](https://github.com/MOJAN3543/MOJAN3543.github.io/blob/main/_posts/ProgrammingByHTML/MarioNluigi.png?raw=true "MarioNLuigi")
{: .text-center}  
위는 `+` 선택자를 이용하여 `Mario` 클래스 옆에 있는 `div`를 지정해주었습니다. `+` 선택자는 이렇게 `(선택자 1) + (선택자 2)` 형식으로 사용되며, `(선택자 1)`을 형제로 가지고 있으며 `(선택자 2)`를 만족하는 바로 다음에 오는 요소를 선택하는 선택자 입니다. 
```
{% raw %}<head>
    <style>
        .Mario {
            color: red;
        }
        .Mario + div {
            color: green;
        }
        .Mario + div + div + div {
            color: purple;
        }
    </style>
</head>
<body>
    <div class="Mario">Mario</div>
    <div>Luigi</div>
    <div>Wario</div>
    <div>Waluigi</div>
</body>{% endraw %}
```
![Waluigi](https://github.com/MOJAN3543/MOJAN3543.github.io/blob/main/_posts/ProgrammingByHTML/Waluigi.png?raw=true "Waluigi")
{: .text-center}  
이런식으로 `+` 선택자 뒤 또 다른 `+` 선택자를 이용해 다른 조건을 추가 할 수 있습니다. 즉, 바로 다음에 있는 요소가 아닌 더 에 있는 요소도 지정 할 수 있습니다.

### 4.2. input:checked
이를 다른 방식으로 응용해보겠습니다. 바로 `input`과의 응용입니다.   
   
```
{% raw %}<head>
    <style>
        input:checked+*::before{
            content: 'Checked!';
        }
        input:not(:checked)+*::before{
            content: 'Not Checked!';
        }
    </style>
</head>
<body>
    <input type="checkbox">
    <small></small>
</body>{% endraw %}
```

<div class='CheckNotCheck'><input type="checkbox"><small></small></div>
    
이는 `input` 태그의 `:checked` 선택자를 이용한 체크박스 입니다. 직접 클릭해보세요!   
   
이는 Javascript 없이 체크를 감지하고, 내부 HTML을 변경 할 수 있습니다! CSS로 `input` 태그가 `:checked` 선택자를 가지고 있으면 뒤에 있는 태그의 `content`를 `'Checked!`로 수정합니다. 반대의 경우에는 `:not(:checked)`로 감지합니다.  
  
마치 다음과 같은 조건문을 실행하는 것과 같습니다.   
```
if(checked)
    content = "Checked!";
else
    content = "Not Checked!";
```
또한, CSS에서 사용한 `*` 태그는 특정 태그를 가진 요소만 지정하지 않고, 옆에 있는 요소가 무슨 태그를 가졌든, 무조건 지정합니다. 
### 4.3 input:checked++
```
<head>
    <style>
        input:checked+input:checked+input:not(:checked)+*{
            background-color: #10dc36;
        }
        input:checked+input:not(:checked)+input:checked+*{
            background-color: #10dc36;
        }
        input:checked+input:not(:checked)+input:not(:checked)+*{
            background-color: #ffffff;
        }
        input:not(:checked)+input:checked+input:checked+*{
            background-color: #10dc36;
        }
        input:not(:checked)+input:checked+input:not(:checked)+*{
            background-color: #10dc36;
        }
        input:not(:checked)+input:not(:checked)+input:checked+*{
            background-color: #10dc36;
        }
        input:not(:checked)+input:not(:checked)+input:not(:checked)+*{
            background-color: #ffffff;
        }
    </style>
</head>
<body>
    <input type="checkbox">
    <input type="checkbox">
    <input type="checkbox">
    <input type="checkbox">
</body>
```

<div class="Rule110Mini"><input type="checkbox"><input type="checkbox"><input type="checkbox"><input type="checkbox"></div>

Rule 110을 HTML과 CSS로 구현한 결과입니다! `+` 선택자를 여러개 사용해서 `switch` 제어문 비슷한 역할을 하게 했습니다.   

### 4.4 조금만 더 늘려봅시다
![Rule110ByHTML](https://github.com/MOJAN3543/MOJAN3543.github.io/blob/main/_posts/ProgrammingByHTML/Rule110ByHTML.png?raw=true "Rule110ByHTML")
{: .text-center} 

<span style="font-size:50%">[Rule 110 By HTML](https://mojan3543.github.io/Rule110ByHTML)</span>
{: .text-center}  
하하! 실제로 동작하지 않는 이미지입니다. [**이 곳**](https://mojan3543.github.io/Rule110ByHTML)에서 실제로 해볼 수 있습니다!   
   
개발자 도구를 켜보면, `<script>`가 없는걸 알 수 있습니다! 스크립트의 힘이 들어가지 않았다는 걸 의미하죠. 그러므로, HTML과 CSS, 그리고 사람의 클릭으로 튜링 완전한 Rule 110을 구현했습니다!   
   
![whyusejs](https://github.com/MOJAN3543/MOJAN3543.github.io/blob/main/_posts/ProgrammingByHTML/whyusejs.png?raw=true "WhyUseJS")
{: .text-center} 

이제 Javascript의 시대는 끝났습니다. HTML과 CSS로 Javascript와 동등한 기능을 할 수 있는데 Javascript를 왜쓰나요?

## 5. 다른 곳에서 구현된 Rule 110
이전에 서술했듯, Rule 110은 튜링 완전을 증명하기에 아주 쉬운 오토마타이기에, 튜링 동치계의 `Hello, World!` 같은 느낌입니다. 그래서 HTML과 CSS의 경우 말고도 다른 곳에서도 많이 구현됩니다.   
   
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">This video demonstrates my design for a mechanism in <a href="https://twitter.com/hashtag/BabaIsYou?src=hash&amp;ref_src=twsrc%5Etfw">#BabaIsYou</a> which implements Cellular Automaton Rule 110, which suffices to prove the game is Turing-Complete!<br><br>The write-up is here: <a href="https://t.co/EE7vB8S26H">https://t.co/EE7vB8S26H</a><br><br>Feel free to ask any questions!<a href="https://twitter.com/babaisyou_?ref_src=twsrc%5Etfw">@babaisyou_</a> <a href="https://twitter.com/ESAdevlog?ref_src=twsrc%5Etfw">@ESAdevlog</a> <a href="https://t.co/EzOeTuZga5">pic.twitter.com/EzOeTuZga5</a></p>&mdash; Matthew Rodriguez (@mattar0d) <a href="https://twitter.com/mattar0d/status/1109987662608384000?ref_src=twsrc%5Etfw">March 25, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

위는 [**Baba is you**](https://store.steampowered.com/app/736260/Baba_Is_You/?l=koreana)에서 Rule 110을 구현한 장면입니다. 관련 설명은 [**여기**](https://udaqueness.blog/2019/03/25/baba-is-you%EB%8A%94-%ED%8A%9C%EB%A7%81%EC%99%84%EC%A0%84%ED%95%98%EB%8B%A4/)에서 볼 수 있습니다.   
   
{% include video id="QKnSRw_X2w4" provider="youtube" %}  
심지어는 구슬의 흐름으로 Rule 110을 구현 하는 경우도 있습니다!   
  
## 6. 마치며
이 게시물에서는 튜링 머신, 튜링 완전, Rule 110과 HTML의 튜링 완전성에 대해 알아보았습니다.   
   
블로그 게시를 얼마 안했지만, 제가 그동안 쓴 게시물 중에서 가장 공을 많이 들였습니다. 아니, 게시물이 아니라 제가 살면서 쓴 글 전체를 통틀어도 여기에 제일 많은 노력을 쏟은것 같습니다. '이해가 어려운 오토마타 부분에서 인터렉티브 요소를 만들어야겠다' 라고 생각은 했는데, 생각보다 많은 오토마타가 있었고... Tag System을 구현하는 중에 그냥 그만두고 마무리 지을까... 했지만! 끝내 구현했습니다!   
   
국내 블로그에는 HTML과 CSS, 그리고 Rule 110에 대해서 다룬 블로그가 얼마 없는것 같아 이렇게 글을 쓰게 되었습니다. 이 글을 보고 조금이나마 궁금했던 점들을 해소했으면 좋겠습니다.


[^1]: 실제로는 무한한 길이의 테이프를 구현할 수 없으므로, 어떤 기계가 유한한 저장 공간을 가졌지만, 이후에 무한하게 저장 공간을 추가 할 수 있다면, 이 기계를 느슨하게 튜링 완전하다 봅니다.
[^2]: 업그레이드 버전이라고는 했지만, 튜링 머신답게 튜링 머신은 범용 튜링 머신을 구동할 수 있습니다!
[^3]: 이는 단일 테이프 튜링 머신을 다중 테이프 튜링 머신으로 확장 시키고, 업 다운 카운터로 단순화, 카운터 머신으로 단순화, 그리고 이 카운터 머신을 현재 컴퓨터에 가까운 레지스터 머신으로 확장 함에 증명되었습니다. 정확한 내용은 [**처치-튜링 명제**](https://en.wikipedia.org/wiki/Church%E2%80%93Turing_thesis)를 살펴보세요.
[^4]: 어떤 명령형 언어가 튜링 완전하기 위해서는, 조건부 반복(Python의 `while`)과 변수의 [**CRUD**](https://ko.wikipedia.org/wiki/CRUD)의 기능이 있으면 됩니다.
[^5]: [**CPython**](https://ko.wikipedia.org/wiki/C%ED%8C%8C%EC%9D%B4%EC%8D%AC)이라고 합니다.
[^6]: Rule 110 뿐만 아니라, 다른 규칙으로도 동작 가능합니다! Rule의 숫자를 변경하거나, Rule의 패턴을 클릭해보세요.
[^7]: 1차원에 놓인 3개의 셀의 상태는 총 8가지<sub>2³</sub> 입니다
[^8]: 그래서 `00000000`부터 `11111111`까지, Rule 0부터 Rule 255까지 존재합니다. 이중 실질적으로 사용되는 Rule의 종류는 적습니다. Rule 30, Rule 90, Rule 184 등이 그중에서 연구가 활발히 이루어진 기초 세포 자동자입니다.
[^9]: 이 외에도 데이터 번역, 연산자 생산, 초기조건 등의 요소들이 활용되지만, 이해하기 힘들뿐더러, 저도 이해 하지 못했기에 여기까지 설명 드리겠습니다. 참고 : [**Reproducing the cyclic tag system developed by Matthew Cook with Rule 110 using the phases f1_1**](https://uwe-repository.worktribe.com/output/970133)
[^10]: 애초에, 순환 태그 시스템은 Rule 110과 태그 시스템을 연결 해주기 위해 나온 개념입니다. 태그 시스템의 변형이라고 할 수 있습니다.
[^11]: 2 태그 시스템의 2는 삭제하는 단어 개수입니다. 보통은 [**Tag System**](https://en.wikipedia.org/wiki/Tag_system)으로 불립니다.
[^12]: `H` 기호가 나왔을때 생산을 멈추지는 않습니다. 그래서 `H` 기호 이후에는 적절한 값이 나오지 않습니다.
<!-- [^8]: 참고 : [http://delta.cs.cinvestav.mx/~mcintosh/comun/texlet/texlet.html](http://delta.cs.cinvestav.mx/~mcintosh/comun/texlet/texlet.html) -->


<script src="/assets/post-script/ProgrammingByHTML/TuringMachine.js"></script>

<link rel="stylesheet" href="/assets/post-style/ProgrammingByHTML/style.css" type="text/css">
