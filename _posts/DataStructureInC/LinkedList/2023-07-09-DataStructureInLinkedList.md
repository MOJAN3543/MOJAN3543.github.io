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

연결 리스트의 노드는 대체로 2가지 요소로 만들어 집니다. 저장할 **데이터**와 다음 노드를 가리키는 **포인터**입니다.  
  
그리고 연결 리스트 자체를 가르키는 목적으로 사용되는 **헤드**가 있습니다. 헤드는 대부분 연결 리스트의 가장 첫번째 노드를 가르키고 있으며, 삽입, 삭제 연산에 따라 가르키는 노드가 달라지기도 합니다. 

그리고 연결 리스트를 포인터의 개수, 가르키는 위치에 따라 총 3가지로 나눌 수 있습니다. **단순 연결 리스트**, **원형 연결 리스트**, **이중 연결 리스트**입니다.

### 1.1. 단순 연결 리스트
가장 단순한 **단순 연결 리스트**입니다. 선 처럼 연결 되어있다 하여 **선형 연결 리스트**라고도 합니다.
  
단순 연결 리스트를 이용하여 **스택**, **큐**, **연결 리스트**, **그래프**를 구현 합니다.

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

![CircularLinkedList](https://github.com/MOJAN3543/MOJAN3543.github.io/blob/main/_posts/DataStructureInC/LinkedList/CircularLinkedList.png?raw=true "CircularLinkedList")
{: .text-center}  

원형 연결 리스트는 삽입, 삭제 연산을 위해서는 가장 앞 노드와 가장 뒤 노드가 필요합니다. 하지만, 가장 뒤 노드를 구하는 연산의 시간 복잡도는 $O(N)$이므로 시간적으로 비효율적입니다.  

![CircularLinkedListInsertionAtTheEnd](https://github.com/MOJAN3543/MOJAN3543.github.io/blob/main/_posts/DataStructureInC/LinkedList/CircularLinkedListInsertionAtTheEnd.png?raw=true "CircularLinkedListInsertionAtTheEnd")
{: .text-center}  

그러므로 변형된 원형 연결 리스트라고도 불리는 방식을 활용합니다. 이는 헤드가 가장 뒤 노드를 가르키는 방식이며, 시간 복잡도 $O(1)$로 가장 앞 노드[^2]와 가장 뒤 노드를 구할 수 있습니다. 이 포스트에서는 변형된 원형 연결 리스트를 구현하겠습니다.

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
    if(head->next == NULL){
        head->next = newNode;
        newNode->next = newNode;
    }
    else{
        newNode->next = ((head->next)->next);
        (head->next)->next = newNode;
    }
}

void insertMiddle(NODE* head, int index, int data){
    NODE* newNode = (NODE *)malloc(sizeof(NODE));
    newNode->data = data;
    if(head->next == NULL){
        head->next = newNode;
        newNode->next = newNode;
        return;
    }
    NODE* ptr = head->next;
    for(int i=0; i<index; i++)
        ptr = ptr->next;
    newNode->next = ptr->next;
    ptr->next = newNode;
}

void insertLast(NODE* head, int data){
    NODE* newNode = (NODE *)malloc(sizeof(NODE));
    newNode->data = data;
    if(head->next == NULL){
        head->next = newNode;
        newNode->next = newNode;
    }
    else{
        newNode->next = ((head->next)->next);
        (head->next)->next = newNode;
        head->next = newNode;
    }
}

void deleteFirst(NODE* head){
    NODE* ptr = (head->next)->next;
    (head->next)->next = ptr->next;
    free(ptr);
}

void deleteMiddle(NODE* head, int index){
    NODE* ptr = head->next;
    for(int i=0; i<index; i++)
        ptr = ptr->next;
    NODE* removeNode = ptr->next;
    if(removeNode == head->next)
        head->next = ptr;
    ptr->next = removeNode->next;
    free(removeNode);
}

void deleteLast(NODE* head){
    for(NODE* ptr=(head->next)->next; ; ptr=ptr->next){
        if(ptr->next == head->next){
            ptr->next = (head->next)->next;
            free(head->next);
            head->next = ptr;
            break;
        }
    }
}

void traverseNode(NODE* head){
    NODE *ptr = (head->next)->next;
    do{
        printf("%d -> ", ptr->data);
        ptr = ptr->next;
    }
    while(ptr != (head->next)->next);
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
이전에 구현한 선형 연결 리스트와는 달리 데이터 삽입시 연결 리스트가 비어있는지 확인 후 비어있다면 자기 자신을 가르키는 노드를 삽입합니다.  

또한, 노드를 순회 할때도, 헤드가 가장 뒤 노드를 가르키기에, 가장 앞 노드를 `ptr`로 지정 하는것을 고려해야 합니다.  

### 1.3. 이중 연결 리스트
![DoubleLinkedList](https://github.com/MOJAN3543/MOJAN3543.github.io/blob/main/_posts/DataStructureInC/LinkedList/DoubleLinkedList.png?raw=true "DoubleLinkedList")
{: .text-center}  

노드의 포인터가 두개인 **이중 연결 리스트**입니다.  

이중 연결 리스트를 이용하여 **덱**을 구현합니다.  

**Source Code**
```c
{% raw %}#include <stdio.h>
#include <stdlib.h>

typedef struct _NODE{
	int data;
	struct _NODE* next;
    struct _NODE* prev;
} NODE;

NODE* newLinkedList(){
    NODE* newNode = (NODE *)malloc(sizeof(NODE));
    newNode->next = NULL;
    return newNode;
}

void insertFirst(NODE* head, int data){
    NODE* newNode = (NODE*)malloc(sizeof(NODE));
    newNode->data = data;
    newNode->next = head->next;
    newNode->prev = head;
    if(head->next)
        (head->next)->prev = newNode;
    head->next = newNode;
}

void insertMiddle(NODE* head, int index, int data){
    NODE* newNode = (NODE*)malloc(sizeof(NODE));
    newNode->data = data;
    NODE* ptr = head;
    for(int i=0; i<index; i++)
        ptr = ptr->next;
    newNode->next = ptr->next;
    newNode->prev = ptr;
    if(ptr->next)
        (ptr->next)->prev = newNode;
    ptr->next = newNode;
}

void insertLast(NODE* head, int data){
    NODE* newNode = (NODE*)malloc(sizeof(NODE));
    newNode->data = data;
    newNode->next = NULL;
    for(NODE* ptr=head; ; ptr=ptr->next){
        if(ptr->next == NULL){
            ptr->next = newNode;
            newNode->prev = ptr;
            break;
        }
    }
}

void deleteFirst(NODE* head){
    NODE* ptr = head->next;
    head->next = ptr->next;
    if(ptr->next)
        (ptr->next)->prev = head;
    free(ptr);
}

void deleteMiddle(NODE* head, int index){
    NODE* ptr = head;
    for(int i=0; i<index; i++)
        ptr = ptr->next;
    NODE* removeNode = ptr->next;
    ptr->next = removeNode->next;
    if(removeNode->next)
        (removeNode->next)->prev = ptr;
    free(removeNode);
}

void deleteLast(NODE* head){
    for(NODE* ptr = head->next; ; ptr=ptr->next){
        if(ptr->next == NULL){
            (ptr->prev)->next = NULL;
            free(ptr);
            break;
        }
    }
}

void traverseNode(NODE* head){
    for(NODE* ptr=head->next; ptr; ptr=ptr->next)
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
이중 연결 리스트는 다른 연결 리스트들과는 다르게, 두가지의 포인터를 가지고 있습니다. 그러므로 노드를 삽입, 삭제할때 이전 노드의 포인터도 변경 해야 합니다.  

## 2. 스택
![Stack](https://github.com/MOJAN3543/MOJAN3543.github.io/blob/main/_posts/DataStructureInC/LinkedList/Stack.png?raw=true "Stack")
{: .text_center}  
**스택**(Stack)은 후입선출 구조로 되어있는 자료구조 입니다. 한쪽 끝에서만 자료의 삽입<sub>push</sub>과 삭제<sub>pop</sub>가 일어납니다.  



[^1]: 추상 자료형의 연산을 구현하는 중, 에러를 핸들링 하는 코드를 작성하기도 하지만, 이 포스트에서는 동작을 위한 코드만 작성하여 최소화 했습니다.
[^2]: 원형으로 연결되어 있어, 가장 뒤 노드의 다음 노드는 가장 앞 노드가 되게 됩니다.
