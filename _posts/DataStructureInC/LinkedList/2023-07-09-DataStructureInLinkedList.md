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

그래서 자료구조의 대표적인 자료형인 스택, 큐, 원형 큐, 덱, 연결 리스트, 트리, 힙, 그래프를 연결 리스트로 구현하며 정리해보고자 합니다.  

## 1. 연결 리스트
모든 자료형의 기초가 되는 연결 리스트입니다.  

![LinkedList](https://github.com/MOJAN3543/MOJAN3543.github.io/blob/main/_posts/DataStructureInC/LinkedList/LinkedList.png?raw=true "LinkedList")
{: .text-center}  

연결 리스트는 대체로 2가지 요소로 만들어 집니다. 저장할 **데이터**와 다음 노드를 가리키는 **포인터**입니다.   

그리고 연결 리스트를 포인터의 개수, 가르키는 위치에 따라 총 3가지로 나눌 수 있습니다. **단순 연결 리스트**, **원형 연결 리스트**, **이중 연결 리스트**입니다.

### 1.1. 단순 연결 리스트
가장 단순한 **단순 연결 리스트**입니다. 선 처럼 연결 되어있다 하여 **선형 연결 리스트**라고도 합니다.
  
단순 연결 리스트를 이용하여 **스택**, **큐**, **연결 리스트**를 구현 합니다.

**Source Code**
```c
{% raw %}#include <stdio.h>
#include <stdlib.h>

typedef struct _NODE{
	int data;
	struct _NODE* next; 
} NODE;

NODE* newLinkedList(){
    NODE* newNode = (NODE *)malloc(sizeof(NODE));
    newNode->next = NULL;
    return newNode;
}

void insertFirst(NODE* head, int data){
    NODE* newNode = (NODE *)malloc(sizeof(NODE));
    newNode->data = data;
    newNode->next = head->next;
    head->next = newNode;
}

void insertMiddle(NODE* head, int index, int data){
    NODE* newNode = (NODE *)malloc(sizeof(NODE));
    newNode->data = data;
    NODE* ptr = head;
    for(int i=0; i<index; i++)
        ptr = ptr->next;
    newNode->next = ptr->next;
    ptr->next = newNode;
}

void insertLast(NODE* head, int data){
    NODE* newNode = (NODE *)malloc(sizeof(NODE));
    newNode->data = data;
    newNode->next = NULL;
    for(NODE* ptr=head; ; ptr=ptr->next){
        if(!(ptr->next)){
            ptr->next = newNode;
            break;
        }
    }
}

void deleteFirst(NODE* head){
    NODE* ptr = head->next;
    head->next = ptr->next;
    free(ptr);
}

void deleteMiddle(NODE* head, int index){
    NODE* ptr = head;
    for(int i=0; i<index; i++)
        ptr = ptr->next;
    NODE* removeNode = ptr->next;
    ptr->next = removeNode->next;
    free(removeNode);
}

void deleteLast(NODE* head){
    for(NODE* ptr=head; ; ptr=ptr->next){
        if(!((ptr->next)->next)){
            free((ptr->next)->next);
            ptr->next = NULL;
            break;
        }
    }
}

void traverseNode(NODE* head){
    for(NODE* ptr = head->next; ptr; ptr=ptr->next)
        printf("%d -> ", ptr->data);
    puts("");
}

int main(){
    NODE* linkedList;
    linkedList = newLinkedList();
    
    insertFirst(linkedList, 4);
    insertFirst(linkedList, 2);
    insertMiddle(linkedList, 1, 3);
    insertLast(linkedList, 5);
    insertFirst(linkedList, 1);
    
    traverseNode(linkedList);
    
    deleteFirst(linkedList);
    deleteMiddle(linkedList, 2);
    deleteLast(linkedList);
    
    traverseNode(linkedList);
}{% endraw %}
```
구현한 연결 리스트의 연산은 가장 앞과 뒤, 그리고 원하는 위치에 값을 삽입하는 `insert`와 값을 삭제하는 `delete`, 그리고 노드를 순회하는 `traverseNode`를 구현했습니다[^1].

### 1.2. 원형 연결 리스트
노드가 원형으로 연결되어 순환 할 수 있는 **원형 연결 리스트**입니다.  

원형 연결 리스트를 이용하여 **원형 큐**를 구현 합니다.  

**Source Code**



[^1]: 추상 자료형의 연산을 구현하는 중, 에러를 핸들링 하는 코드를 작성하기도 하지만, 이 포스트에서는 동작을 위한 코드만 작성하여 최소화 했습니다.
