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
* 더 짧아진 문자를 이용해서, 인코딩 된 문자를 직접 입력하여 디코딩한다던지, 이를 출력해서 디코딩 하게 한다면 더 효율적이다.
* Base64보다 덜 알려져있으므로, 암호화로써의 역할을 한다

이렇게 장점이 많은데 왜 만들지 않고 있죠?? 당장 만듭시다!

[^1]: `65`를 `A`라고 부르는 이 약속을 [**ASCII**](https://en.wikipedia.org/wiki/ASCII)라고 합니다.
[^2]: 이 특정 문자들은 어느 환경에서도 동일하게 사용하기 위해서 문자 코드에 영향을 받지 않는 ASCII 영역만 사용합니다.
[^3]: ![Base64Index](https://github.com/MOJAN3543/MOJAN3543.github.io/blob/main/_posts/EncodeByKorean/BASE64Index.jpeg?raw=true "Base64Index")
