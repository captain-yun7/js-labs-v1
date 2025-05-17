# JavaScript 모듈 시스템

이 섹션에서는 JavaScript의 모듈 시스템에 대해 학습합니다.

## 학습 목표
- JavaScript 모듈의 개념 이해하기
- ES Modules(ESM) 사용법 배우기
- 모듈 내보내기(export)와 가져오기(import) 방법 익히기
- 모듈을 활용한 코드 구조화 방법 알기

## 예제 파일
- `module-basics/`: 모듈 기본 예제
  - `math.js`: 수학 함수를 내보내는 모듈
  - `utils.js`: 유틸리티 함수를 내보내는 모듈
  - `main.js`: 모듈을 가져와 사용하는 메인 파일
- `module-types/`: 다양한 내보내기/가져오기 방식 예제
- `module-pattern/`: 모듈 패턴 예제 (ES Modules 이전 방식)

## JavaScript 모듈 개요

모듈은 코드를 독립적이고 재사용 가능한 단위로 분리할 수 있게 해주는 메커니즘입니다. ES Modules는 JavaScript의 공식 모듈 시스템입니다.

모듈 시스템의 장점:
- 코드 구조화 및 네임스페이스 관리
- 코드 재사용성 증가
- 의존성 관리 용이
- 프로젝트 확장성 향상

## 모듈 내보내기 (Export)

export 키워드를 사용하여 변수, 함수, 클래스 등을 모듈에서 내보낼 수 있습니다.

```javascript
// 개별 내보내기
export const PI = 3.14159;
export function add(a, b) {
  return a + b;
}

// 한 번에 내보내기
const multiply = (a, b) => a * b;
const subtract = (a, b) => a - b;
export { multiply, subtract };

// 기본 내보내기 (default export)
export default class Calculator {
  // 클래스 내용
}
```

## 모듈 가져오기 (Import)

import 키워드를 사용하여 다른 모듈에서 내보낸 항목을 가져올 수 있습니다.

```javascript
// 개별 가져오기
import { PI, add } from './math.js';

// 이름 바꿔서 가져오기
import { multiply as mul, subtract as sub } from './math.js';

// 모든 내보내기 항목 가져오기
import * as mathUtils from './math.js';

// 기본 내보내기 가져오기
import Calculator from './calculator.js';

// 기본 내보내기와 일반 내보내기 함께 가져오기
import Calculator, { PI, add } from './math.js';
```

## 브라우저에서 모듈 사용하기

HTML에서 모듈 스크립트를 불러올 때는 `type="module"` 속성을 사용합니다.

```html
<script type="module" src="main.js"></script>

<!-- 또는 인라인으로 -->
<script type="module">
  import { add } from './math.js';
  console.log(add(2, 3));
</script>
```

## 실습 과제
1. 여러 수학 함수를 내보내는 모듈을 만들고, 다른 파일에서 가져와 사용해보세요.
2. 기본 내보내기와 일반 내보내기를 함께 사용하는 모듈을 만들어보세요.
3. 모듈을 사용하여 작은 애플리케이션을 구조화해보세요. 