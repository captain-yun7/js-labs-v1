# DOM 트래버싱 (DOM Traversing)

이 섹션에서는 DOM 트래버싱(탐색)에 대해 학습합니다. DOM 트래버싱은 DOM 구조에서 요소 간의 관계를 이용해 다른 요소로 이동하는 기술입니다.

## 학습 목표

- DOM 트리 구조 이해하기
- 부모, 자식, 형제 요소 접근 방법 학습하기
- DOM 트래버싱 메서드 사용법 익히기
- 효율적인 DOM 탐색 방법 이해하기

## 주요 개념

### 부모 요소 접근하기

DOM에서 부모 요소에 접근하기 위한 속성과 메서드:

- `parentNode`: 요소의 부모 노드 (노드 타입 상관없음)
- `parentElement`: 요소의 부모 요소 (요소 노드만 반환)

### 자식 요소 접근하기

DOM에서 자식 요소에 접근하기 위한 속성과 메서드:

- `childNodes`: 모든 자식 노드를 NodeList로 반환 (텍스트 노드, 주석 노드 포함)
- `children`: 자식 요소만 HTMLCollection으로 반환
- `firstChild`, `lastChild`: 첫 번째/마지막 자식 노드 (텍스트 노드 포함)
- `firstElementChild`, `lastElementChild`: 첫 번째/마지막 자식 요소

### 형제 요소 접근하기

DOM에서 형제 요소에 접근하기 위한 속성과 메서드:

- `nextSibling`, `previousSibling`: 다음/이전 형제 노드 (텍스트 노드 포함)
- `nextElementSibling`, `previousElementSibling`: 다음/이전 형제 요소

### 기타 트래버싱 메서드

- `closest()`: 자신을 포함하여 조상 중에서 지정된 선택자와 일치하는 가장 가까운 요소
- `contains()`: 특정 노드가 다른 노드를 포함하는지 확인

## 실습 파일 설명

이 폴더에는 다음과 같은 실습 파일이 포함되어 있습니다:

1. `parent-child.html`: 부모-자식 관계 탐색 예제
2. `siblings.html`: 형제 요소 탐색 예제
3. `advanced-traversing.html`: 고급 DOM 트래버싱 기법
4. `traversing-vs-querying.html`: 트래버싱과 쿼리 선택자 비교
5. `practice.html`: 실습 문제

## 참고 자료

- [MDN: DOM 트래버싱](https://developer.mozilla.org/ko/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces)
- [JavaScript Info: DOM 탐색](https://javascript.info/dom-navigation) 