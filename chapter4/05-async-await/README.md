# Async/Await

이 섹션에서는 JavaScript의 Async/Await 구문에 대해 학습합니다.

## 학습 목표

- Async/Await 구문의 기본 개념 이해하기
- 비동기 코드를 동기 코드처럼 작성하는 방법 배우기
- Promise와 async/await의 관계 이해하기
- 에러 처리 방법 익히기
- 실제 활용 사례 구현하기

## 주요 개념

Async/Await는 비동기 JavaScript 코드를 작성하는 방법 중 하나로, Promise를 기반으로 하지만 더 간결하고 읽기 쉬운 코드를 작성할 수 있게 해줍니다.

### Async 함수

- `async` 키워드는 함수가 Promise를 반환하도록 만듭니다.
- 함수 내에서 `await` 키워드를 사용할 수 있게 합니다.

```javascript
async function fetchData() {
  // 함수 내용
  return result; // 자동으로 Promise로 감싸짐
}
```

### Await 표현식

- `await` 키워드는 Promise가 처리(resolved)될 때까지 함수 실행을 일시 중지합니다.
- Promise가 처리되면 await 표현식은 Promise의 결과값을 반환합니다.
- `await`는 `async` 함수 내에서만 사용할 수 있습니다.

```javascript
async function fetchUserData() {
  const response = await fetch('/api/users'); // fetch가 완료될 때까지 대기
  const data = await response.json(); // json 변환이 완료될 때까지 대기
  return data;
}
```

### 에러 처리

- `try...catch` 구문을 사용하여 async/await 코드의 에러를 처리할 수 있습니다.

```javascript
async function fetchData() {
  try {
    const data = await fetchUserData();
    return data;
  } catch (error) {
    console.error('데이터를 가져오는 중 오류 발생:', error);
    throw error;
  }
}
```

## 예제 파일

- `async-basics.js`: Async/Await 기본 구문
- `async-vs-promise.js`: Promise와 Async/Await 비교
- `error-handling.js`: Async/Await 에러 처리
- `sequential-parallel.js`: 순차 실행과 병렬 실행
- `practical-examples.js`: 실제 활용 예제
- `practice.js`: 실습 문제

## 실습 과제

1. 주어진 API URL에서 데이터를 가져오는 async 함수 작성하기
2. 여러 비동기 작업을 순차적으로 실행하는 함수 구현하기
3. 여러 비동기 작업을 병렬로 실행하는 함수 구현하기
4. 에러 처리를 포함한 실제 활용 사례 작성하기
5. fetch API와 async/await를 활용한 간단한 데이터 검색 기능 만들기 