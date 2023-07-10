---
title: "C로 배우는 자료구조 (연결 리스트편)"
toc: true
toc_sticky: true
categories:
  - 튜토리얼
tags:
  - [C, 자료구조, 연결 리스트]
last_modified_at: 2023-04-05
---
![SadDataStructure](https://raw.githubusercontent.com/MOJAN3543/MOJAN3543.github.io/6c70d3b441163cf0aeb290c5973458f28b1a054b/_posts/DataStructureInC/LinkedList/datastructmakemecry.png "SoSad")
{: .text-center}  
[**자료 구조**](https://ko.wikipedia.org/wiki/%EC%9E%90%EB%A3%8C_%EA%B5%AC%EC%A1%B0)는 모든 컴퓨터 관련 학과 학생들이 거쳐가는 관문입니다. 그만큼 자료구조가 아주 중요한 개념 중 하나이며, 이후에 데이터를 처리하는데에 핵심적인 역할을 하게 됩니다.  

하지만, 자료구조는 알고리즘과 더불어 뉴비 학살기로 불리는 만큼 난이도가 꽤 있는 편입니다. 왜냐하면 자료구조 강의는 대부분 C로 진행되어, 기초적인 [**추상 자료형**](https://ko.wikipedia.org/wiki/%EC%B6%94%EC%83%81_%EC%9E%90%EB%A3%8C%ED%98%95)이나 그와 관계된 연산 함수가 기본 라이브러리에 있는 C++, Python과는 다르게 자료형과 함수를 직접 구현해야 하므로 기초 프로그래밍을 배우다가 자료구조로 바로 넘어오는 경우 엄청난 벽을 만나게 됩니다.  

그래서 자료구조의 대표적인 자료형인 스택, 큐, 연결 리스트, 트리, 힙, 그래프를 연결 리스트로 구현하며 정리해보고자 합니다.  

## 1. 연결 리스트
우선, 모든 자료형을 구현하기 위한 기초인 연결 리스트입니다. 연결 리스트는 노드 단위로 구성되어, 한 노드가 다른 노드를 가르켜 줄줄이 이어지는 구조를 띄고 있습니다.  
  
![LinkedList](https://github.com/MOJAN3543/MOJAN3543.github.io/blob/main/_posts/DataStructureInC/LinkedList/LinkedList.png?raw=true "LinkedList")
{: .text-center}
   
연결 리스트는 대체로 2가지 요소로 만들어집니다. 저장할 **데이터**와 다음 노드를 가리키는 **포인터**입니다.  

그러므로 C에서의 구현은 자기 참조 구조체로 노드를 구현하고, 그 뒤 관련 연산 함수를 구현합니다.  

**Source Code**
```c
{% raw %}#include <stdio.h>
#include <stdlib.h>

typedef struct _NODE{
	int data;
	struct _NODE* next; 
} NODE;

void init(NODE* head){
    head = NULL;
}

void insertFirst(NODE* head, int data){
    NODE* newNode = (NODE *)malloc(sizeof(NODE));
    newNode->data = data;
    newNode->next = head;
    head = newNode;
}

// void insertMiddle(NODE* head, int index, int data){
//     if(index)
//         insert(head->next, index-1, data);
//     else{
        
//     }
// }

// void insertLast(NODE* head, int data){
    
// }

void TraverseNode(NODE* head){
    for(NODE* ptr = head; ptr->next; ptr=ptr->next)
        printf("%d ->", ptr->data);
}

int main(){
    NODE* linkedList;
    init(linkedList);
    insertFirst(linkedList, 4);
    insertFirst(linkedList, 1);
    insertFirst(linkedList, 3);
    TraverseNode(linkedList);
}{% endraw %}
``` 
