# JavaScript 이벤트 루프

이 섹션에서는 JavaScript의 이벤트 루프(Event Loop)와 비동기 실행 모델에 대해 학습합니다.

## 학습 목표

- JavaScript의 단일 스레드 실행 모델 이해하기
- 이벤트 루프의 작동 원리와 구성 요소 파악하기
- 콜 스택(Call Stack)과 태스크 큐(Task Queue)의 관계 이해하기
- 마이크로태스크(Microtask)와 매크로태스크(Macrotask) 구분하기
- 비동기 작업의 실행 순서와 우선순위 이해하기

## 예제 파일

- `event-loop-basics.js`: 이벤트 루프의 기본 개념
- `call-stack.js`: 호출 스택의 동작 방식
- `task-queue.js`: 태스크 큐와 비동기 실행
- `microtasks-macrotasks.js`: 마이크로태스크와 매크로태스크 예제
- `practice.js`: 실습 예제

## 이벤트 루프란?

이벤트 루프는 JavaScript가 비동기 작업을 처리하는 메커니즘입니다. JavaScript는 단일 스레드 언어이지만, 이벤트 루프를 통해 비차단(non-blocking) 방식으로 비동기 작업을 효율적으로 처리할 수 있습니다.

### 이벤트 루프 구성 요소

1. **콜 스택(Call Stack)**: 함수 호출이 쌓이는 스택 구조로, 현재 실행 중인 함수를 추적합니다.
2. **힙(Heap)**: 객체가 할당되는 메모리 영역입니다.
3. **태스크 큐(Task Queue)**: 비동기 콜백을 저장하는 큐입니다(매크로태스크).
4. **마이크로태스크 큐(Microtask Queue)**: Promise 콜백 등 높은 우선순위의 비동기 작업을 저장합니다.
5. **웹 API**: setTimeout, fetch, DOM 이벤트 등 브라우저에서 제공하는 비동기 API입니다.

### 이벤트 루프의 작동 순서

1. 콜 스택에서 코드가 실행됩니다.
2. 비동기 작업(setTimeout, fetch 등)은 웹 API에서 처리됩니다.
3. 비동기 작업이 완료되면 콜백이 태스크 큐 또는 마이크로태스크 큐에 추가됩니다.
4. 콜 스택이 비어있으면, 이벤트 루프는 먼저 모든 마이크로태스크를 처리합니다.
5. 마이크로태스크가 모두 처리된 후, 태스크 큐에서 다음 태스크를 가져와 콜 스택에 넣습니다.
6. 이 과정이 계속 반복됩니다.

## 마이크로태스크 vs 매크로태스크

### 마이크로태스크(높은 우선순위)
- Promise.then/catch/finally
- queueMicrotask()
- MutationObserver
- process.nextTick (Node.js)

### 매크로태스크(일반 우선순위)
- setTimeout/setInterval
- requestAnimationFrame
- setImmediate (Node.js)
- I/O 작업
- UI 렌더링

## 실습 과제

1. 다양한 비동기 작업(Promise, setTimeout 등)을 조합하여 실행 순서 예측하기
2. 콜 스택 오버플로우 상황을 만들고 해결책 찾기
3. 마이크로태스크와 매크로태스크의 우선순위를 확인하는 실험 코드 작성하기
4. requestAnimationFrame을 활용한 애니메이션 구현하기
5. 콜백 지옥(Callback Hell)을 Promise와 async/await로 해결하기 