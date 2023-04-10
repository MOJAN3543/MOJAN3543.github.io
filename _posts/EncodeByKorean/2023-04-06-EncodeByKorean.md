---
title: "한글로 인코딩을 해보자! EnKORde"
toc: true
toc_sticky: true
last_modified_at: 2023-04-05
---
![이진수](https://github.com/MOJAN3543/MOJAN3543.github.io/blob/main/_posts/EncodeByKorean/EnKORdeTitle.png?raw=true "이진수")
{: .text-center}  
컴퓨터로 처리하는 모든 형태의 데이터는, 이진수로 이루어져 있습니다. 심지어 이 글까지도요! 그런데 이 글을 어떻게 0과 1이 아닌 글자로 보고있을까요?  
  
이는 특정 숫자를 특정 문자로 치환하는 부호화를 했기 때문입니다. 예를 들어, 이진수로 `1000001`는 십진수로 `65`이고, 이를 `A`로 부르기로 하자고 일종의 약속[^1]을 해놓은거죠.
이러한 과정의 부호화를 영어로 `encoding` 이라고 합니다.   
   
## 1. Base64
이와 유사하게, 특정 이진수 값을 특정 문자로 치환하여 데이터를 부호화 하는 인코딩 방식이 있습니다. 이를 [**Base64**](https://en.wikipedia.org/wiki/Base64)라고 합니다. Base64를 사용하는 이유는, 
이진수 데이터를 전송할때, 이를 0, 1로 전송하는 것이 아닌, 특정 문자[^2]를 이용해 표현하기 위해서 사용합니다.   

### 1.1 백문이 불여일견
직접 예시를 들어 보겠습니다.  

![CAT](https://github.com/MOJAN3543/MOJAN3543.github.io/blob/main/_posts/EncodeByKorean/CAT.png?raw=true "CAT")
{: .text-center}  

여기, `CAT`이라는 문자열이 있습니다. 컴퓨터는 이 문자열을 `C`, `A`, `T`의 문자로 분리합니다.  
   
![CAT2Binary](https://github.com/MOJAN3543/MOJAN3543.github.io/blob/main/_posts/EncodeByKorean/CAT2Binary.png?raw=true "CAT2Binary")
{: .text-center}  

그리고 이 문자를 저장하기 위해서 ASCII로 디코딩. `67`, `65`, `84`로 변환됩니다. 그리고 이를 이진수 형태로 저장합니다.   
   
![Binary2Base64](https://github.com/MOJAN3543/MOJAN3543.github.io/blob/main/_posts/EncodeByKorean/Binary2Base64.png?raw=true "Binary2Base64")
{: .text-center}  
여기서 Base64로 `CAT` 문자열을 인코딩 한다면, `CAT` 이진수 데이터를 6비트씩 잘라서 잘린 이진수 값을 특정 문자로 치환합니다. 예를 들어 `000000`은 `A` `000001`은 `B` 이런식[^3]으로 치환하면 Base64로 인코딩된 결과를 얻을수 있습니다. `CAT`은 `Q0FU`로 인코딩 되었습니다.  
   
이외에도 이진수 데이터가 6비트씩 나누어 떨어지지 않을때, `=`를 넣어서 나누어 떨어지지 않음을 표기하는 패딩 규칙도 있지만, 여기까지 설명하도록 하겠습니다.   

## 2. 이제는 본론으로
저는 Base64를 보고, 한글을 이에 적용시켜 한글로 인코딩을 하는. **EnKORde**를 만들자고 생각했습니다!   
   
제가 생각한 EnKORde의 장점은 이렇습니다.   
   
* 한글로 표기해서 한국인들에게 친숙하게 인코딩 할 수 있다.
* ASCII코드로 제한해서 64개의 문자만 사용한 Base64와는 달리, 한글을 이용해서 더 많은 정보를 더 짧은 문자로 표기한다.
* 더 짧아진 문자를 이용해서, 인코딩 된 문자를 직접 입력하여 디코딩한다던지, 이를 실제로 출력해서 디코딩 하게 한다면 더 효율적이다.
* Base64보다 덜 알려져있으므로, 암호화로써의 역할을 한다

이렇게 장점이 많은데 왜 만들지 않고 있죠?? 당장 만듭시다!   

### 2.1 EnKORde의 메커니즘
EnKORde의 동작은 Base64와 유사합니다. 인코딩할 데이터를 특정 비트씩 자르고, 잘린 비트를 기반으로 특정 문자와 치환하는 방식입니다.   
   
하지만 EnKORde는 데이터를 6비트씩 자르지 않고, 12비트씩 자릅니다. Base64가 한 글자에 나타내는 데이터의 2배입니다[^4]. 그리고 여기서 한글의 조합 원리가 사용됩니다. 바로 초성, 중성, 종성을 사용해 데이터를 표기합니다!    
    
| 초성 | 이진법 | 초성 | 이진법 | 중성 | 이진법 | 중성 | 이진법 | 종성 | 이진법 | 종성 | 이진법 |
|:--------|:--------|:--------|:--------|:--------|:--------|:--------|:--------|:--------|:--------|:--------|:--------|
| ㄱ | 0000 | ㅅ | 1000 | ㅏ | 0000 | ㅚ | 1000 | (없음) | 0000 | ㅅ | 1000 |
| ㄲ | 0001 | ㅇ | 1001 | ㅐ | 0001 | ㅛ | 1001 | ㄱ | 0001 | ㅇ | 1001 |
| ㄴ | 0010 | ㅈ | 1010 | ㅑ | 0010 | ㅜ | 1010 | ㄴ | 0010 | ㅈ | 1010 |
| ㄷ | 0011 | ㅊ | 1011 | ㅓ | 0011 | ㅟ | 1011 | ㄶ | 0011 | ㅊ | 1011 |
| ㄸ | 0100 | ㅋ | 1100 | ㅔ | 0100 | ㅠ | 1100 | ㄷ | 0100 | ㅋ | 1100 |
| ㄹ | 0101 | ㅌ | 1101 | ㅕ | 0101 | ㅡ | 1101 | ㄹ | 0101 | ㅌ | 1101 |
| ㅁ | 0110 | ㅍ | 1110 | ㅗ | 0110 | ㅢ | 1110 | ㅁ | 0110 | ㅍ | 1110 |
| ㅂ | 0111 | ㅎ | 1111 | ㅘ | 0111 | ㅣ | 1111 | ㅂ | 0111 | ㅎ | 1111 |
    
위의 인코딩표를 이용해서 12비트 이진수를 1자리 한글로 변환할 수 있습니다! 예를 들어 `000000000000`는 `가`, `111111111111`는 `힣`, `000010101000`은 `굿`으로 변환됩니다.   
   
### 2.2 구현하기
```python
{% raw %}KOREAN_UNICODE_START = 44032
KOREAN_INITIAL_COUNT = 19
KOREAN_NEUTRAL_COUNT = 21
KOREAN_FINAL_COUNT = 28

def KoreanDecompose(Korean):
    #Korean = KOREAN_UNICODE_START + initial * KOREAN_NEUTRAL_COUNT * KOREAN_FINAL_COUNT + neutral * KOREAN_FINAL_COUNT + final
    final = (ord(Korean) - KOREAN_UNICODE_START) % KOREAN_FINAL_COUNT
    neutral = ((ord(Korean) - KOREAN_UNICODE_START - final) // KOREAN_FINAL_COUNT) % KOREAN_NEUTRAL_COUNT
    initial = (ord(Korean) - KOREAN_UNICODE_START - final - neutral * KOREAN_FINAL_COUNT) // (KOREAN_FINAL_COUNT * KOREAN_NEUTRAL_COUNT)
    return [initial, neutral, final]

def KoreanCompose(KoreanList):
    initial, neutral, final = KoreanList
    return chr(KOREAN_UNICODE_START + initial * KOREAN_NEUTRAL_COUNT * KOREAN_FINAL_COUNT + neutral * KOREAN_FINAL_COUNT + final)

def KoreanEncode(msg):
    KoreanInitialEncodeTable = [0, 1, 2, 3, 4, 5, 6, 7, 9, 11, 12, 14, 15, 16, 17, 18]
    KoreanNeutralEncodeTable = [0, 1, 2, 4, 5, 6, 8, 9, 11, 12, 13, 16, 17, 18, 19, 20]
    KoreanFinalEncodeTable = [0, 1, 4, 6, 7, 8, 16, 17, 19, 21, 22, 23, 24, 25, 26, 27]
    
    msgb = msg.encode()
    bins = ''.join(format(b, '08b') for b in msgb)
    if len(bins) % 12:
        bins += '0'*(12-len(bins) % 12)
        
    ret = ''
    for idx in range(0, len(bins), 12):
        Initial = KoreanInitialEncodeTable[int(bins[idx:idx+4], 2)]
        Neutral = KoreanNeutralEncodeTable[int(bins[idx+4:idx+8], 2)]
        Final = KoreanFinalEncodeTable[int(bins[idx+8:idx+12], 2)]
        ret += KoreanCompose([Initial, Neutral, Final])
        
    return ret

def KoreanDecode(msg):
    KoreanInitialDecodeTable = [0, 1, 2, 3, 4, 5, 6, 7, -1, 8, -1, 9, 10, -1, 11, 12, 13, 14, 15]
    KoreanNeutralDecodeTable = [0, 1, 2, -1, 3, 4, 5, -1, 6, 7, -1, 8, 9, 10, -1, -1, 11, 12, 13, 14, 15]
    KoreanFinalDecodeTable = [0, 1, -1, -1, 2, -1, 3, 4, 5, -1, -1, -1, -1, -1, -1, -1, 6, 7, -1, 8, -1, 9, 10, 11, 12, 13, 14, 15]
    
    bins = ''
    for Kor in msg:
        Initial, Neutral, Final = KoreanDecompose(Kor)
        DecomposeList = [KoreanInitialDecodeTable[Initial], KoreanNeutralDecodeTable[Neutral], KoreanFinalDecodeTable[Final]]
        for DecomposeNum in DecomposeList:
            bins += format(DecomposeNum, '08b')[4:]
    
    ret = bytearray()
    for idx in range(0, len(bins), 8):
        ret += int(bins[idx:idx+8], 2).to_bytes(1, byteorder='little')
                   
    return ret.decode(){% endraw %}
```   
인코딩·디코딩은 [**2.1 EnKORde의 메커니즘**](https://mojan3543.github.io/EncodeByKorean/#21-enkorde%EC%9D%98-%EB%A9%94%EC%BB%A4%EB%8B%88%EC%A6%98)에서 설명한 과정과 같습니다.   
   
그리고, 주어진 한글의 초성, 중성, 종성을 분리, 조립하기 위해, 다음과 같은 식을 활용했습니다.    
   
* 한글 유니코드 = ( 초성 인덱스 * 21 * 28 ) + ( 중성 인덱스 * 28 ) + ( 종성 인덱스 ) + 0xAC00[^5]
* 초성 인덱스 = ( 한글 유니코드 - 0xAC00 ) / ( 21 * 28 )
* 중성 인덱스 = ( ( 한글 유니코드 - 0xAC00 ) % ( 21 * 28 ) ) / 28
* 종성 인덱스 = ( ( 한글 유니코드 - 0xAC00 ) % ( 21 * 28 ) ) % 28
    
| 인덱스 | 00 | 01 | 02 | 03 | 04 | 05 | 06 | 07 | 08 | 09 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 |
|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|
| 초성 | ㄱ | ㄲ | ㄴ | ㄷ | ㄸ | ㄹ | ㅁ | ㅂ | ㅃ | ㅅ | ㅆ | ㅇ | ㅈ | ㅉ | ㅊ | ㅋ | ㅌ | ㅍ | ㅎ |    |    |    |    |    |    |    |    |    |
| 중성 | ㅏ | ㅐ | ㅑ | ㅒ | ㅓ | ㅔ | ㅕ | ㅖ | ㅗ | ㅘ | ㅙ | ㅚ | ㅛ | ㅜ | ㅝ | ㅞ | ㅟ | ㅠ | ㅡ | ㅢ | ㅣ |    |    |    |    |    |    |    |
| 종성 | 없음 | ㄱ | ㄲ | ㄳ | ㄴ | ㄵ | ㄶ | ㄷ | ㄹ | ㄺ | ㄻ | ㄼ | ㄽ | ㄾ | ㄿ | ㅀ | ㅁ | ㅂ | ㅄ | ㅅ | ㅆ | ㅇ | ㅈ | ㅊ | ㅋ | ㅌ | ㅍ | ㅎ |
   
### 2.3 잘 동작할까요?
![EnKORdeWithPython](https://github.com/MOJAN3543/MOJAN3543.github.io/blob/main/_posts/EncodeByKorean/EnKORdeWithPython.png?raw=true "EnKORdeWithPython")
{: .text-center}  

음! 일단 읽을 생각을 하면 안되겠네요. 생각보다 많이 복잡한 단어가 나왔지만, 누락된 단어도 없이 성공적으로 동작합니다!   
   
심지어, ASCII 문자 영역만 사용한 두번째 인코딩의 경우에는, 기존의 문장<sub>(공백 포함 37자)</sub>보다 인코딩 결과<sub>(공백 포함 25자)</sub>가 약 0.66배로 문자 길이가 감소함을 보였습니다! 의외로 좋은 결과가 나와서 만족스럽습니다.
## 3. EnKORde. 이제는 웹으로!
![인코딩.웹.한국](https://github.com/MOJAN3543/MOJAN3543.github.io/blob/main/_posts/EncodeByKorean/%EC%9D%B8%EC%BD%94%EB%94%A9.%EC%9B%B9.%ED%95%9C%EA%B5%AD.png?raw=true "인코딩.웹.한국")
{: .text-center}  
여기까지 구현해도 정말 재미있는 프로젝트입니다! 하지만, EnKORde의 위대함을 널리 알리고, 여러 사람들이 편하게 사용하게 하기 위해서, 이를 JavaScript로 다시 제작하여 웹상에 게시했습니다! [**해당 프로젝트**](https://github.com/MOJAN3543/enKORde)는 [**인코딩.웹.한국**](https://인코딩.웹.한국)에서 사용 가능합니다.    
    
또한, EnKORde로 부호화된 문장을 빠르게 디코딩 하기 위해서, 부호화된 문장 앞에 `인코딩.웹.한국/?디코딩=(문장)` 이렇게 접속도 가능합니다.   
   
## 덴퍄퓢뵛퓿욧퓢위
퓽숟퓟죳퓽퇴낲쿜셒쿙산긪창읰읏갸픙룤풏쇠낲쿝쵶큍엪쵿죤긭섯긬읫릨읓샤뗨펯띨녿몊출츈긫좟킟엊띜옻띛쳊띜숯릧쉿싗슂떂낟족봄껺멉농밥띛졏캬퓻눜퓻춛퓻됙낲퀸욒쿝슌긬샺킠웆읱옃띛첯띛숭띚챳댜퓽튇퓽뵛퓾뵈퓢뵠뉸겨뵵똣밈픸윷킟쟁캬퓾괻퓿뉟퓾괵퓽튓낲큍엪쵾윤긭응긫좃띜읏땨퓢휫퓢뭌낲춥슢쵾젶쥖잔겢맵목럼돤묩괃퓢륔낲춥슢쵾윺쵳쇤캬퓾뀌풏쇳낲쵵엔긬숓틪챳캬퓽푝퓻뛱낲툘잔긬쇵샤퓽푓퓽뵛퓟툣풏뇒낲쥐욮쾾쳪쵳쇺쵳젠퍄풏뷧퓢뭌풏두낲툘윺쥣샆축윤긬읓싘층띛엦야픙룤퓟춛퓟죧풏뇒퓽툣낲쿠옆퀸쳎쾯챞쿝센긫승띜웇꺄퓣뫼풏괵픙룟풏쉬낲쿜셒툘쳎쾯윤긭영킞쵯갸퓟횓퓢욛퓽튓[^6]퓽퇻낲쾬즆쿚죺툠쇺쵲엪쵵찬캬퓻둍풏괵퓣뒫퓟춛낲쿛쵼긭싕싘읓띜좟갸퓿춧퓻룅풏뒼낲쿞왼긫좡픸엿띜셍캬퓟뙷퓢퀻낲춥슢쿡챞쾾젶춓즆쿛잪쾾쳪쵳쇺쵳젠퍄퓽뮛퓾구풏괴낲쿛춒툎욒쿝쳎쿱샆출츈긫싯킠엿띛슂띛쉿싗슂떀낟롶뛷현멤릧쟁캬퓽튓퓿툗퓡뚱퓡굨낲춬쵶쿞앞쿕쳎쿝센긫좟킟샹싗첯킠쇵샤퓽푓퓽뵛퓽큌퓢윋낲쿤슆쥔잪쾾쳪쵳쇺쵳젠파    
    
[**풏교퓻눜픙룽퓟쵯퓟춛내**](https://인코딩.웹.한국/?디코딩=퓽숟퓟죳퓽퇴낲쿜셒쿙산긪창읰읏갸픙룤풏쇠낲쿝쵶큍엪쵿죤긭섯긬읫릨읓샤뗨펯띨녿몊출츈긫좟킟엊띜옻띛쳊띜숯릧쉿싗슂떂낟족봄껺멉농밥띛졏캬퓻눜퓻춛퓻됙낲퀸욒쿝슌긬샺킠웆읱옃띛첯띛숭띚챳댜퓽튇퓽뵛퓾뵈퓢뵠뉸겨뵵똣밈픸윷킟쟁캬퓾괻퓿뉟퓾괵퓽튓낲큍엪쵾윤긭응긫좃띜읏땨퓢휫퓢뭌낲춥슢쵾젶쥖잔겢맵목럼돤묩괃퓢륔낲춥슢쵾윺쵳쇤캬퓾뀌풏쇳낲쵵엔긬숓틪챳캬퓽푝퓻뛱낲툘잔긬쇵샤퓽푓퓽뵛퓟툣풏뇒낲쥐욮쾾쳪쵳쇺쵳젠퍄풏뷧퓢뭌풏두낲툘윺쥣샆축윤긬읓싘층띛엦야픙룤퓟춛퓟죧풏뇒퓽툣낲쿠옆퀸쳎쾯챞쿝센긫승띜웇꺄퓣뫼풏괵픙룟풏쉬낲쿜셒툘쳎쾯윤긭영킞쵯갸퓟횓퓢욛퓽튓퓽퇻낲쾬즆쿚죺툠쇺쵲엪쵵찬캬퓻둍풏괵퓣뒫퓟춛낲쿛쵼긭싕싘읓띜좟갸퓿춧퓻룅풏뒼낲쿞왼긫좡픸엿띜셍캬퓟뙷퓢퀻낲춥슢쿡챞쾾젶춓즆쿛잪쾾쳪쵳쇺쵳젠퍄퓽뮛퓾구풏괴낲쿛춒툎욒쿝쳎쿱샆출츈긫싯킠엿띛슂띛쉿싗슂떀낟롶뛷현멤릧쟁캬퓽튓퓿툗퓡뚱퓡굨낲춬쵶쿞앞쿕쳎쿝센긫좟킟샹싗첯킠쇵샤퓽푓퓽뵛퓽큌퓢윋낲쿤슆쥔잪쾾쳪쵳쇺쵳젠파풏교퓻눜픙룽퓟쵯퓟춛내)


[^1]: `65`를 `A`라고 부르는 이 약속을 [**ASCII**](https://en.wikipedia.org/wiki/ASCII)라고 합니다.
[^2]: 이 특정 문자들은 어느 환경에서도 동일하게 사용하기 위해서 문자 코드에 영향을 받지 않는 ASCII 영역만 사용합니다.
[^3]: ![Base64Index](https://github.com/MOJAN3543/MOJAN3543.github.io/blob/main/_posts/EncodeByKorean/BASE64Index.jpeg?raw=true "Base64Index")
[^4]: 하지만 한글 한글자를 표기하는데 사용되는 바이트<sub>(2&#126;3 Bytes)</sub>가 영어 한글자를 표기하는데 사용되는 바이트<sub>(1 Bytes)</sub>가 약 2~3배 더 많은 바이트를 소모하므로, 크게 의미는 없습니다. 오히려 현재 가장 많이 사용되는 UTF-8의 경우에서는 한글이 영어보다 3배 더 많은 바이트를 소모합니다.
[^5]: 여기서 0x4C00이 뜻하는 의미는 한글의 제일 첫 글자인 `가`입니다.
[^6]: 픙룤풏쇠퓟횓퓢욛퓽튓퓽퇴[**퓟뉟퓟횓퓢욛퓽튓닆툘윺쥘즢**](https://내도메인.한국)쿕앞쾯윦딐찾싗싯띛죵띜읓싘읏띛즃띛젓킟쟁킟엋끷쟁틪찻긫숮릩옂읯쉿싗슂땩
