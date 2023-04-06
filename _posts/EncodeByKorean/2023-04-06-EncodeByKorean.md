---
title: "한글로 인코딩을 해보자! EnKORde 프로젝트"
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

여기, `CAT`이라는 문자열이 있습니다. 이 문자열은 `C`, `A`, `T`로 분리되어 저장됩니다.  
![CAT2Binary](https://github.com/MOJAN3543/MOJAN3543.github.io/blob/main/_posts/EncodeByKorean/CAT2Binary.png?raw=true "CAT2Binary")
{: .text-center}  

이와 같이 `CAT`은 ASCII로 디코딩되어 `67`, `65`, `84`으로 변환되고, 이를 이진수로 저장합니다.
![Binary2Base64](https://github.com/MOJAN3543/MOJAN3543.github.io/blob/main/_posts/EncodeByKorean/Binary2Base64.png?raw=true "Binary2Base64")
{: .text-center}  
Base64는 이와 같은 이진수 데이터를 6비트씩 잘라서 이진수 값을 특정 문자로 치환합니다.  




[^1]: `65`를 `A`라고 부르는 이 약속을 [**ASCII**](https://en.wikipedia.org/wiki/ASCII)라고 합니다.
[^2]: 이 특정 문자들은 어느 환경에서도 동일하게 사용하기 위해서 문자 코드에 영향을 받지 않는 ASCII 영역만 사용합니다.
