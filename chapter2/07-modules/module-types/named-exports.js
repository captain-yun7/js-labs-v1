/**
 * 이름 붙은 내보내기 예제 (Named Exports)
 * 
 * 이름 붙은 내보내기는 여러 개를 정의할 수 있으며,
 * import 시 정확한 이름으로 가져와야 합니다.
 */

// 변수 내보내기
export const PI = 3.14159;
export const E = 2.71828;

// 함수 내보내기
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

// 내보내지 않은 함수(모듈 내부에서만 사용)
function square(x) {
  return x * x;
}

// 위에서 정의한 함수를 사용하는 내보내기 함수
export function calculateHypotenuse(a, b) {
  return Math.sqrt(square(a) + square(b));
}

// 클래스 내보내기
export class Circle {
  constructor(radius) {
    this.radius = radius;
  }
  
  get diameter() {
    return this.radius * 2;
  }
  
  get area() {
    return PI * square(this.radius);
  }
  
  get circumference() {
    return 2 * PI * this.radius;
  }
}

// 객체 내보내기
export const utils = {
  random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  
  sum(arr) {
    return arr.reduce((total, current) => total + current, 0);
  },
  
  average(arr) {
    return this.sum(arr) / arr.length;
  }
};

// 나중에 한 번에 여러 항목 내보내기
const multiply = (a, b) => a * b;
const divide = (a, b) => {
  if (b === 0) throw new Error('0으로 나눌 수 없습니다.');
  return a / b;
};

export { multiply, divide }; 