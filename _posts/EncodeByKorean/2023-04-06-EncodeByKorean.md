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
   
하지만 EnKORde는 데이터를 6비트씩 자르지 않고, 12비트씩 자릅니다. Base64가 한 글자에 나타내는 데이터의 2배입니다[^4]. 그리고 여기서 한글의 조합 원리가 사용됩니다. 바로 자음, 모음, 받침을 사용해 데이터를 표기합니다!    
    
| 자음 | 이진법 | 모음 | 이진법 | 받침 | 이진법 |
|:--------|:--------|:--------|:--------|:--------|:--------|
| ㄱ | d0000 | ㅏ | 0000 | (없음) | 0000 |
| ㄲ | 0001 | ㅐ | 0001 | ㄱ | 0001 |
| ㄴ | 0010 | ㅑ | 0010 | ㄴ | 0010 |
| ㄷ | 0011 | ㅓ | 0011 | ㄶ | 0011 |
| ㄸ | 0100 | ㅔ | 0100 | ㄷ | 0100 |
| ㄹ | 0101 | ㅕ | 0101 | ㄹ | 0101 |
| ㅁ | 0110 | ㅗ | 0110 | ㅁ | 0110 |
| ㅂ | 0111 | ㅘ | 0111 | ㅂ | 0111 |
| ㅅ | 1000 | ㅚ | 1000 | ㅅ | 1000 |
| ㅇ | 1001 | ㅛ | 1001 | ㅇ | 1001 |
| ㅈ | 1010 | ㅜ | 1010 | ㅈ | 1010 |
| ㅊ | 1011 | ㅟ | 1011 | ㅊ | 1011 |
| ㅋ | 1100 | ㅠ | 1100 | ㅋ | 1100 |
| ㅌ | 1101 | ㅡ | 1101 | ㅌ | 1101 |
| ㅍ | 1110 | ㅢ | 1110 | ㅍ | 1110 |
| ㅎ | 1111 | ㅣ | 1111 | ㅎ | 1111 |

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


[^1]: `65`를 `A`라고 부르는 이 약속을 [**ASCII**](https://en.wikipedia.org/wiki/ASCII)라고 합니다.
[^2]: 이 특정 문자들은 어느 환경에서도 동일하게 사용하기 위해서 문자 코드에 영향을 받지 않는 ASCII 영역만 사용합니다.
[^3]: ![Base64Index](https://github.com/MOJAN3543/MOJAN3543.github.io/blob/main/_posts/EncodeByKorean/BASE64Index.jpeg?raw=true "Base64Index")
[^4]: 하지만 한글 한글자를 표기하는데 사용되는 바이트<sub>(2-3 Bytes)</sub>가 영어 한글자를 표기하는데 사용되는 바이트<sub>(1 Bytes)</sub>가 약 2~3배 더 많은 바이트를 소모하므로, 크게 의미는 없습니다. 오히려 현재 가장 많이 사용되는 UTF-8의 경우에서는 한글이 영어보다 3배 더 많은 바이트를 소모합니다.
