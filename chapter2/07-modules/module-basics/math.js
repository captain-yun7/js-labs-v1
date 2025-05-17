// math.js - 수학 함수 모듈

// 개별 내보내기 (named export)
export const PI = 3.14159;
export const E = 2.71828;

// 함수 내보내기
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

// 내부에서만 사용할 헬퍼 함수 (내보내지 않음)
function square(x) {
  return x * x;
}

// 위의 내부 함수를 사용하는 함수
export function calculateDistance(x1, y1, x2, y2) {
  return Math.sqrt(square(x2 - x1) + square(y2 - y1));
}

// 객체 내보내기
export const MathConstants = {
  SQRT2: 1.414,
  LN10: 2.302,
  LOG2E: 1.442
};

// 나중에 한 번에 내보내기
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

// 한 번에 내보내기
export { multiply, divide };

// 이름을 바꿔서 내보내기
function power(base, exponent) {
  return Math.pow(base, exponent);
}

export { power as pow }; 