# JavaScript 비동기 프로그래밍 기초

이 섹션에서는 JavaScript의 비동기 프로그래밍 기초에 대해 학습합니다.

## 학습 목표

- JavaScript의 싱글 스레드 특성 이해하기
- 콜백 함수의 개념과 활용법 익히기
- 비동기 프로그래밍의 필요성 이해하기
- 자바스크립트 이벤트 루프의 작동 원리 파악하기
- 타이머 함수(setTimeout, setInterval) 활용하기

## 주요 개념

JavaScript는 싱글 스레드 언어이지만, 브라우저나 Node.js와 같은 환경에서 비동기 작업을 수행할 수 있습니다. 비동기 프로그래밍은 시간이 오래 걸리는 작업(파일 로딩, 네트워크 요청 등)을 처리할 때 특히 중요합니다.

### 동기 vs 비동기

- **동기(Synchronous)**: 코드가 순차적으로 실행되며, 하나의 작업이 완료될 때까지 다음 작업이 대기합니다.
- **비동기(Asynchronous)**: 작업이 완료되기를 기다리지 않고 다음 코드를 실행합니다. 작업이 완료되면 콜백 함수 등을 통해 결과를 처리합니다.

### 핵심 비동기 메커니즘

1. **콜백 함수(Callback Functions)**: 작업이 완료되면 호출할 함수를 전달합니다.
2. **이벤트 루프(Event Loop)**: 비동기 작업을 관리하는 JavaScript의 핵심 메커니즘입니다.
3. **타이머 함수(Timer Functions)**: `setTimeout`과 `setInterval`을 사용하여 코드 실행을 지연시킵니다.

## 예제 파일

- `sync-vs-async.js`: 동기와 비동기 코드의 차이점
- `callbacks.js`: 콜백 함수의 기본 개념과 사용법
- `callback-hell.js`: 콜백 중첩(콜백 지옥) 문제
- `timers.js`: setTimeout과 setInterval 활용하기
- `event-loop.js`: 이벤트 루프의 작동 방식
- `practical-examples.js`: 실제 활용 예제
- `practice.js`: 실습 문제

## 실습 과제

1. 콜백 함수를 사용하여 비동기 작업 순차 실행하기
2. setTimeout를 활용하여 타이머 기능 구현하기
3. 콜백 지옥 예제를 직접 작성해보고 문제점 이해하기
4. 이벤트 루프의 작동을 확인할 수 있는 코드 작성하기
5. 실제 웹 개발에서 자주 사용되는 비동기 패턴 구현하기 