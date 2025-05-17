# Promise

이 섹션에서는 JavaScript의 Promise에 대해 학습합니다.

## 학습 목표

- Promise의 개념과 필요성 이해하기
- Promise 생성과 사용 방법 배우기
- Promise 체이닝으로 비동기 작업 순차 처리하기
- Promise 에러 처리 방법 익히기
- Promise.all, Promise.race 등 여러 Promise 동시 처리하기

## 주요 개념

Promise는 비동기 작업의 최종 완료(또는 실패)와 그 결과값을 나타내는 객체입니다. Promise는 다음 세 가지 상태 중 하나를 가집니다:

- **대기(pending)**: 초기 상태, 이행되거나 거부되지 않은 상태
- **이행(fulfilled)**: 작업이 성공적으로 완료된 상태
- **거부(rejected)**: 작업이 실패한 상태

Promise는 콜백 지옥(Callback Hell) 문제를 해결하고, 비동기 코드를 더 읽기 쉽고 관리하기 쉽게 만듭니다.

## 예제 파일

- `promise-basics.js`: Promise 기본 개념과 생성 방법
- `promise-chaining.js`: Promise 체이닝과 값 전달
- `error-handling.js`: Promise 에러 처리 방법
- `promise-methods.js`: Promise.all, Promise.race 등 정적 메서드
- `promise-vs-callback.js`: 콜백과 Promise 비교
- `practical-examples.js`: 실제 활용 예제
- `practice.js`: 실습 문제

## 실습 과제

1. 주어진 시간(ms) 후에 해결되는 Promise를 반환하는 delay 함수 구현하기
2. fetch API와 Promise를 사용하여 외부 API에서 데이터 가져오기
3. 여러 비동기 작업을 Promise.all로 병렬 처리하기
4. Promise.race를 사용하여 타임아웃 구현하기
5. 콜백 기반 API를 Promise 기반으로 변환하기 