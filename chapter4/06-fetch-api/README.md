# Fetch API와 Axios

이 섹션에서는 JavaScript에서 HTTP 요청을 보내기 위한 Fetch API와 Axios 라이브러리에 대해 학습합니다.

## 학습 목표
- Fetch API의 기본 사용법 이해하기
- Axios 라이브러리 사용법 익히기
- 다양한 HTTP 메서드 활용하기
- RESTful API와 통신하는 방법 학습하기
- 에러 처리 및 응답 처리 방법 배우기

## 예제 파일
- `fetch-basics.js`: Fetch API 기본 사용법
- `axios-basics.js`: Axios 기본 사용법
- `http-methods.js`: 다양한 HTTP 메서드 예제
- `error-handling.js`: 에러 처리 예제
- `real-api-example/`: 실제 API와 통신하는 예제 애플리케이션

## Fetch API 개요

Fetch API는 네트워크 요청을 쉽게 만들기 위한 현대적인 인터페이스로, 대부분의 모던 브라우저에서 기본적으로 지원됩니다.

### 기본 사용법

```javascript
fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('There has been a problem:', error));
```

### 특징
- Promise 기반 API
- 기본 내장되어 있어 추가 라이브러리 불필요
- Request와 Response 객체를 통한 상세한 제어 가능
- CORS 지원
- 기본적으로 쿠키를 포함하지 않음 (credentials 옵션으로 설정 가능)

## Axios 라이브러리

Axios는 브라우저와 Node.js에서 사용할 수 있는 Promise 기반 HTTP 클라이언트 라이브러리입니다.

### 기본 사용법

```javascript
axios.get(url)
  .then(response => console.log(response.data))
  .catch(error => console.error('Error:', error));
```

### 특징
- 브라우저와 Node.js 환경 모두 지원
- 자동 JSON 변환
- 요청 취소 지원
- 응답 시간 초과 설정 지원
- 기본적으로 XSRF 보호 기능
- 인터셉터를 통한 요청/응답 가로채기 가능
- 글로벌 및 인스턴스별 설정 가능

## HTTP 메서드

HTTP 메서드는 클라이언트가 서버에게 특정 동작을 요청하는 방법을 정의합니다.

### 주요 HTTP 메서드
- **GET**: 리소스 조회
- **POST**: 리소스 생성
- **PUT**: 리소스 전체 수정
- **PATCH**: 리소스 일부 수정
- **DELETE**: 리소스 삭제

## RESTful API

REST(Representational State Transfer)는 웹 서비스를 설계하고 개발하는 방법을 정의한 아키텍처 스타일입니다.

### RESTful API 설계 원칙
- 자원(Resource)을 URI로 표현
- 자원에 대한 행동을 HTTP 메서드로 표현
- 메시지는 자체 설명적(self-descriptive)이어야 함
- 애플리케이션 상태는 Hypermedia(HATEOAS)를 통해 전이되어야 함

## 실습 과제
1. Fetch API를 사용하여 공개 API에서 데이터를 가져오고 화면에 표시해보세요.
2. Axios를 설치하고 다양한 HTTP 메서드를 사용하여 RESTful API와 통신해보세요.
3. 에러 처리와 로딩 상태를 구현하는 방법을 연습해보세요.
4. Fetch와 Axios의 차이점을 비교 분석해보세요. 