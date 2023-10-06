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
  
그리고 연결 리스트 자체를 가리키는 목적으로 사용되는 **헤드**가 있습니다. 헤드는 대부분 연결 리스트의 가장 첫번째 노드를 가리키고 있으며, 삽입, 삭제 연산에 따라 가리키는 노드가 달라지기도 합니다. 

그리고 연결 리스트를 포인터의 개수, 가리키는 위치에 따라 총 3가지로 나눌 수 있습니다. **단순 연결 리스트**, **원형 연결 리스트**, **이중 연결 리스트**입니다.

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

그러므로 변형된 원형 연결 리스트라고도 불리는 방식을 활용합니다. 이는 헤드가 가장 뒤 노드를 가리키는 방식이며, 시간 복잡도 $O(1)$로 가장 앞 노드[^2]와 가장 뒤 노드를 구할 수 있습니다. 이 포스트에서는 변형된 원형 연결 리스트를 구현하겠습니다.

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
이전에 구현한 선형 연결 리스트와는 달리 데이터 삽입시 연결 리스트가 비어있는지 확인 후 비어있다면 자기 자신을 가리키는 노드를 삽입합니다.  

또한, 노드를 순회 할때도, 헤드가 가장 뒤 노드를 가리키기에, 가장 앞 노드를 `ptr`로 지정 하는것을 고려해야 합니다.  

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

### 2.1. 스택의 구현
```c
{% raw %}#include <stdio.h>
#include <stdlib.h>

typedef struct _NODE{
	int data;
	struct _NODE* prev; 
} NODE;

typedef struct _STACK{
	NODE* top;
} Stack;

Stack* newStack(){
	Stack* S = (Stack *)malloc(sizeof(Stack));
	S->top = NULL;
	return S;
}

void push(Stack* S, int data){
	NODE* newNode = (NODE *)malloc(sizeof(NODE));
	newNode->data = data;
	newNode->prev = S->top;
	S->top = newNode;
}

int pop(Stack* S){
	NODE* ptr = S->top;
	int ret = ptr->data;
	S->top = ptr->prev;
	free(ptr);
	return ret;
}

void traverseStack(Stack* S){
	for(NODE* ptr = S->top; ptr; ptr=ptr->prev)
        	printf("%d -> ", ptr->data);
	puts("");
}

int main(){
	Stack* S;
	
	S = newStack();
    
	push(S, 1);
	push(S, 2);
	push(S, 3);
	push(S, 4);
	push(S, 5);
    
	traverseStack(S);
    
	pop(S);
	pop(S);
	pop(S);
    
	traverseStack(S);
}{% endraw %}
```
스택은 단순 연결 리스트를 이용하여 구현합니다. 스택은 한 곳에서만 자료의 입력, 출력이 발생하므로, 가장 위 노드(가장 최근에 생성된 노드)인 `top`을 가리키며 해당 노드를 이용하여 연산합니다.  

![StackLinkedList](https://github.com/MOJAN3543/MOJAN3543.github.io/blob/main/_posts/DataStructureInC/LinkedList/StackLinkedList.png?raw=true "StackLinkedList")
{:.text_center}  

스택이 연결 리스트로 이어져 있는 모습은 다음과 같습니다. `top`쪽에 있을수록 더 최근에 생성된 노드이고, 각 노드는 자신의 앞 노드(자신보다 먼저 생성된 노드)를 가리켜 삽입, 삭제 연산을 $O(N)$으로 구현합니다[^3]. 

### 2.2. 실습
스택을 직접 활용하기 위해서 백준 [**10828번 스택**](https://www.acmicpc.net/problem/10828)을 직접 구현해보겠습니다.  
  
```c
{% raw %}#include <stdio.h>
#include <stdlib.h>

typedef struct _NODE{
	int data;
	struct _NODE* prev; 
} NODE;

typedef struct _STACK{
	NODE* top;
} Stack;

Stack* newStack(){
	Stack* S = (Stack *)malloc(sizeof(Stack));
	S->top = NULL;
	return S;
}

void push(Stack* S, int data){
	NODE* newNode = (NODE *)malloc(sizeof(NODE));
	newNode->data = data;
	newNode->prev = S->top;
	S->top = newNode;
}

int pop(Stack* S){
	NODE* ptr = S->top;
	if(ptr == NULL)
		return -1;
	int ret = ptr->data;
	S->top = ptr->prev;
	free(ptr);
	return ret;
}

int sizeofStack(Stack* S){
	int ret = 0;
	for(NODE* ptr = S->top; ptr; ptr=ptr->prev)
		ret++;
	return ret;
}

int main(){
	Stack* S;
	
	S = newStack();
    
	int N;
	scanf("%d", &N);
	for(int i=0; i<N; i++){
		char input[6];
		scanf("%s", input);
		switch(input[0]){
			case 'p':
				if(input[1] == 'u'){ // push
					int X;
					scanf("%d", &X);
					push(S, X);
				}
				else // pop
					printf("%d\n", pop(S));
				break;
			case 's': // size
				printf("%d\n", sizeofStack(S));
				break;
			case 'e': // empty
				printf("%d\n", !(S->top));
				break;
			case 't': // top
				printf("%d\n", S->top?(S->top)->data:-1);
				break;
		}
	}
}{% endraw %}
```
스택이 비었는지는 판별하는 `isEmpty` 함수는 `!(S->top)`로 대체 할 수 있습니다. 그리고 스택의 길이를 판별하는 `sizeofStack` 함수는 기존에 작성했던 `traverseStack`함수를 재활용하여 작성했습니다. 또한 `pop` 함수에 에러 핸들링 코드를 추가하여 문제를 풀기위한 코드를 작성했고, [<span style="color:#009874;font-weight:bold">맞았습니다!!</span>](https://www.acmicpc.net/source/66915405)  

## 3. 큐
![Queue](https://github.com/MOJAN3543/MOJAN3543.github.io/blob/main/_posts/DataStructureInC/LinkedList/Queue.png?raw=true "Queue")
{: .text_center}  
**큐**(Queue)는 선입선출 구조로 이루어진 자료구조입니다. 한쪽 끝<sub>rear</sub>에서는 삽입<sub>enequeue</sub>만 일어나고, 다른쪽 끝<sub>front</sub>에서는 삭제<sub>dequeue</sub>만 일어납니다.  

### 3.1. 큐의 구현
```c
{% raw %}#include <stdio.h>
#include <stdlib.h>

typedef struct _NODE{
	int data;
	struct _NODE* prev; 
} NODE;

typedef struct _QUEUE{
    NODE* rear;
    NODE* front;
} Queue;

Queue* newQueue(){
    Queue* Q = (Queue*)malloc(sizeof(Queue));
    Q->rear = Q->front = NULL;
    return Q;
}

void enqueue(Queue* Q, int data){
    NODE* newNode = (NODE*)malloc(sizeof(NODE));
    newNode->data = data;
	newNode->prev = NULL;
    if(Q->rear)
        (Q->rear)->prev = newNode;
    else 
        Q->front = newNode;
    Q->rear = newNode;
}

int dequeue(Queue* Q){
    NODE* ptr = Q->front;
    int ret = ptr->data;
    Q->front = ptr->prev;
    if(Q->front == NULL)
        Q->rear = NULL;
    free(ptr);
    return ret;
}

void traverseQueue(Queue* Q){
    for(NODE* ptr = Q->front; ptr; ptr=ptr->prev)
        printf("%d -> ", ptr->data);
    puts("");
}

int main(){
    Queue* Q;
    
    Q = newQueue();
    
    enqueue(Q, 1);
    enqueue(Q, 2);
    enqueue(Q, 3);
    enqueue(Q, 4);
    enqueue(Q, 5);
    
    traverseQueue(Q);
    
    dequeue(Q);
    dequeue(Q);
    dequeue(Q);
    
    traverseQueue(Q);
}{% endraw %}
```
큐는 단순 연결 리스트를 이용하여 구현합니다. 큐는 스택과 다르게 자료의 입 출력이 다른 방향에서 일어납니다. 그러므로 입력받는 방향인 `rear`와 출력하는 방향인 `front`를 이용하여 연산합니다.  

![QueueLinkedList](https://github.com/MOJAN3543/MOJAN3543.github.io/blob/main/_posts/DataStructureInC/LinkedList/QueueLinkedList.png?raw=true "QueueLinkedList")
{: .text_center}  
큐 또한 스택과 비슷하게 각 노드가 자신의 앞 노드를 가리킵니다. 이로써 `dequeue`연산을 할때 시간복잡도 $O(N)$으로 해결할 수 있습니다. 그리고 스택과는 다르게 노드를 가리키는 포인터를 2개 사용하여 연산합니다.  

### 3.2. 실습
백준 [**10845번 큐**](https://www.acmicpc.net/problem/10845)를 구현해보면서 실습해 보겠습니다.
```c
{% raw %}#include <stdio.h>
#include <stdlib.h>

typedef struct _NODE{
	int data;
	struct _NODE* prev; 
} NODE;

typedef struct _QUEUE{
    NODE* rear;
    NODE* front;
} Queue;

Queue* newQueue(){
    Queue* Q = (Queue*)malloc(sizeof(Queue));
    Q->rear = Q->front = NULL;
    return Q;
}

void enqueue(Queue* Q, int data){
    NODE* newNode = (NODE*)malloc(sizeof(NODE));
    newNode->data = data;
    newNode->prev = NULL;
    if(Q->rear)
        (Q->rear)->prev = newNode;
    else 
        Q->front = newNode;
    Q->rear = newNode;
}

int dequeue(Queue* Q){
    NODE* ptr = Q->front;
    if(ptr == NULL)
        return -1;
    int ret = ptr->data;
    Q->front = ptr->prev;
    if(Q->front == NULL)
        Q->rear = NULL;
    free(ptr);
    return ret;
}

int sizeofQueue(Queue* Q){
    int ret =0;
    for(NODE* ptr = Q->front; ptr; ptr=ptr->prev)
        ret++;
    return ret;
}

int main(){
    Queue* Q;
    
    Q = newQueue();
    
    int N;
    scanf("%d", &N);
    for(int i=0; i<N; i++){
        char input[6];
		scanf("%s", input);
		switch(input[0]){
			case 'p':
				if(input[1] == 'u'){ // push
					int X;
					scanf("%d", &X);
					enqueue(Q, X);
				}
				else // pop
					printf("%d\n", dequeue(Q));
				break;
			case 's': // size
				printf("%d\n", sizeofQueue(Q));
				break;
			case 'e': // empty
				printf("%d\n", !(Q->front));
				break;
			case 'f': // front
				printf("%d\n", Q->front?(Q->front)->data:-1);
				break;
			case 'b': // back
			    printf("%d\n", Q->rear?(Q->rear)->data:-1);
		}
    }
}{% endraw %}
```
**10828번 스택** 문제와 유사하게, `dequeue`의 에러 핸들링과, `traverseQueue`의 응용으로 `sizeofQueue` 함수를 제작하여 문제를 [<span style="color:#009874;font-weight:bold">맞았습니다!!</span>](https://www.acmicpc.net/source/66976006)  

## 4. 원형 큐
![CircularQueue](https://github.com/MOJAN3543/MOJAN3543.github.io/blob/main/_posts/DataStructureInC/LinkedList/CircularQueue.png?raw=true "CircularQueue")
{: .text_center}  
**원형 큐**(Circular Queue)는 큐와 마찬가지로 선입선출 구조를 가진 자료구조입니다. 하지만 큐와는 다르게 가장 앞 노드와 가장 뒤 노드가 이어져 있어 하나의 포인터로 삽입, 삭제 연산을 할 수 있습니다.  
### 4.1. 원형 큐의 구현
```c
{% raw %}#include <stdio.h>
#include <stdlib.h>

typedef struct _NODE{
	int data;
	struct _NODE* prev; 
} NODE;

typedef struct _CQUEUE{
    NODE* rear;
} CQueue;

CQueue* newCircularQueue(){
    CQueue* CQ = (CQueue*)malloc(sizeof(CQueue));
    CQ->rear = NULL;
    return CQ;
}

void enqueue(CQueue* CQ, int data){
    NODE* newNode = (NODE*)malloc(sizeof(NODE));
    newNode->data = data;
    if(CQ->rear){
        newNode->prev = (CQ->rear)->prev;
        (CQ->rear)->prev = newNode;
    }
    else
        newNode->prev = newNode;
    CQ->rear = newNode;
}

int dequeue(CQueue* CQ){
    NODE* ptr = (CQ->rear)->prev;
    int ret = ptr->data;
    if(CQ->rear == ptr)
        CQ->rear = NULL;
    else
        (CQ->rear)->prev = ptr->prev;
    free(ptr);
    return ret;
}

void traverseCircularQueue(CQueue* CQ){
    NODE* rear = (CQ->rear);
    for(NODE* ptr = (CQ->rear)->prev; ptr != rear; ptr=ptr->prev)
        printf("%d -> ", ptr->data);
    printf("%d -> ", rear->data);
    puts("");
}

int main(){
    CQueue* CQ;
    
    CQ = newCircularQueue();
    
    enqueue(CQ, 1);
    enqueue(CQ, 2);
    enqueue(CQ, 3);
    enqueue(CQ, 4);
    enqueue(CQ, 5);
    
    traverseCircularQueue(CQ);
    
    dequeue(CQ);
    dequeue(CQ);
    dequeue(CQ);
    
    traverseCircularQueue(CQ);
}{% endraw %}
```
원형 큐는 원형 연결 리스트를 이용하여 구현합니다. 원형 연결 리스트의 특성상 제일 끝과 끝이 하나의 정점으로 이어져 있습니다. 그러므로 가장 앞 노드<sub>front</sub>을 포인터로 지정 할 필요 없이 `(CQ->rear)->prev`로 사용합니다.  

![CircularQueueLinkedList](https://github.com/MOJAN3543/MOJAN3543.github.io/blob/main/_posts/DataStructureInC/LinkedList/CircularQueueLinkedList.png?raw=true "CircularQueueLinkedList")
{: .text_center}  
원형 큐는 [**1.2. 원형 연결 리스트**](https://mojan3543.github.io/DataStructureInLinkedList/#12-%EC%9B%90%ED%98%95-%EC%97%B0%EA%B2%B0-%EB%A6%AC%EC%8A%A4%ED%8A%B8)에 설명한 변형 원형 연결 리스트와 원리가 같습니다. 그러므로 `front`와 `rear`에 접근하는 시간 복잡도가 $O(1)$이 됩니다. 또한 원형 큐를 순회할때는 먼저 마지막 노드인 `rear`를 저장하고, `rear`가 나오기 전까지 노드를 이동하여 순회합니다.  
### 4.2. 실습
백준 [**1158번 요세푸스 문제**](https://www.acmicpc.net/problem/1158)를 풀어보며 원형 큐를 실습해 보겠습니다.
```c
{% raw %}#include <stdio.h>
#include <stdlib.h>

typedef struct _NODE{
	int data;
	struct _NODE* prev; 
} NODE;

typedef struct _CQUEUE{
    NODE* rear;
} CQueue;

CQueue* newCircularQueue(){
    CQueue* CQ = (CQueue*)malloc(sizeof(CQueue));
    CQ->rear = NULL;
    return CQ;
}

void enqueue(CQueue* CQ, int data){
    NODE* newNode = (NODE*)malloc(sizeof(NODE));
    newNode->data = data;
    if(CQ->rear){
        newNode->prev = (CQ->rear)->prev;
        (CQ->rear)->prev = newNode;
    }
    else
        newNode->prev = newNode;
    CQ->rear = newNode;
}

int dequeue(CQueue* CQ){
    NODE* ptr = (CQ->rear)->prev;
    int ret = ptr->data;
    if(CQ->rear == ptr)
        CQ->rear = NULL;
    else
        (CQ->rear)->prev = ptr->prev;
    free(ptr);
    return ret;
}

void rotateRear(CQueue* CQ){
    CQ->rear = (CQ->rear)->prev;
}

int isEmpty(CQueue* CQ){
    return !(CQ->rear);
}

int main(){
    CQueue* CQ;
    CQueue* result;
    
    CQ = newCircularQueue();
    result = newCircularQueue();
    
    int N, K;
    scanf("%d %d", &N, &K);
    for(int i=0; i<N; i++)
        enqueue(CQ, i+1);
    
    while(!isEmpty(CQ)){
        for(int i=0; i<K-1; i++)
            rotateRear(CQ);
        enqueue(result, dequeue(CQ));
    }
    
    printf("<");
    while(!isEmpty(result)){
        printf("%d", dequeue(result));
        printf("%s", isEmpty(result)?">":", ");
    }
}{% endraw %}
```
해당 문제는 원래 큐를 이용하여 구현하는 경우가 많지만, 원형 큐를 이용하여 구현했습니다. 큐로 구현하는 경우는 큐 하나에 대해 $N*K$번 삽입과 삭제 연산을 해야합니다.  
  
하지만 원형 큐를 이용하여 삽입, 삭제를 하지 않고 비교적 가벼운 `rotateRear()` 함수를 이용하여 `rear` 포인터를 직접 옮겨 $N$번의 삭제 연산만으로 구현이 가능합니다.  

## 5. 덱
![Deque](https://github.com/MOJAN3543/MOJAN3543.github.io/blob/main/_posts/DataStructureInC/LinkedList/Deque.png?raw=true "Deque")
{: .text_center}  
**덱**(Deque)은 앞으로도, 뒤로도 자료의 삽입과 삭제가 이루어지는 자료구조입니다. Double-ended Queue 라고도 불립니다. 스택과 큐의 특성을 모두 가지고 있습니다.  
### 5.1. 덱의 구현
```c
{% raw %}#include <stdio.h>
#include <stdlib.h>

typedef struct _NODE{
	int data;
	struct _NODE* next;
	struct _NODE* prev; 
} NODE;

typedef struct _DEQUE{
    NODE* rear;
    NODE* front;
} Deque;

Deque* newDeque(){
    Deque* DQ = (Deque*)malloc(sizeof(Deque));
    DQ->rear = DQ->front = NULL;
    return DQ;
}

void addRear(Deque* DQ, int data){
    NODE* newNode = (NODE*)malloc(sizeof(NODE));
    newNode->data = data;
    newNode->next = DQ->rear;
    newNode->prev = NULL;
    if(DQ->rear)
        (DQ->rear)->prev = newNode;
    else
        DQ->front = newNode;
    DQ->rear = newNode;
}
void addFront(Deque* DQ, int data){
    NODE* newNode = (NODE*)malloc(sizeof(NODE));
    newNode->data = data;
    newNode->prev = DQ->front;
    newNode->next = NULL;
    if(DQ->front)
        (DQ->front)->next = newNode;
    else
        DQ->rear = newNode;
    DQ->front = newNode;
}

int deleteRear(Deque* DQ){
    NODE* ptr = DQ->rear;
    int ret = ptr->data;
    DQ->rear = ptr->next;
    free(ptr);
    if(DQ->rear)
        (DQ->rear)->prev = NULL;
    else
        DQ->front = NULL;
    return ret;
}
int deleteFront(Deque* DQ){
    NODE* ptr = DQ->front;
    int ret = ptr->data;
    DQ->front = ptr->prev;
    free(ptr);
    if(DQ->front)
        (DQ->front)->next  = NULL;
    else
        DQ->rear = NULL;
    return ret;
}

void traverseDeque(Deque* DQ){
    for(NODE* ptr = DQ->front; ptr; ptr= ptr->prev)
        printf("%d -> ", ptr->data);
    puts("");
}

int main(){
    Deque* DQ;
    
    DQ = newDeque();
    
    addFront(DQ, 3);
    addFront(DQ, 2);
    addFront(DQ, 1);
    addRear(DQ, 4);
    addRear(DQ, 5);
    
    traverseDeque(DQ);
    
    deleteFront(DQ);
    deleteFront(DQ);
    deleteRear(DQ);
    
    traverseDeque(DQ);
}{% endraw %}
```
![DequeLinkedList](https://github.com/MOJAN3543/MOJAN3543.github.io/blob/main/_posts/DataStructureInC/LinkedList/DequeLinkedList.png?raw=true "DequeLinkedList")
{: .text_center}  
덱은 이중 연결 리스트를 이용하여 구현합니다. 큐와 같이 제일 앞을 가리키는 포인터와 제일 뒤를 가리키는 포인터를 이용하여 연산합니다.

[^1]: 추상 자료형의 연산을 구현하는 중, 에러를 핸들링 하는 코드를 작성하기도 하지만, 이 포스트에서는 동작을 위한 코드만 작성하여 최소화 했습니다.
[^2]: 원형으로 연결되어 있어, 가장 뒤 노드의 다음 노드는 가장 앞 노드가 되게 됩니다.
[^3]: 만약 노드가 자신의 앞 노드<sub>prev</sub>가 아닌 뒤 노드<sub>next</sub>를 가리킨다면 삽입, 삭제 연산에 $O(N)$이 소요됩니다.
