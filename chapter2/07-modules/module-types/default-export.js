/**
 * 기본 내보내기 예제 (Default Export)
 * 
 * 기본 내보내기는 모듈당 하나만 존재할 수 있으며, 
 * import 시 원하는 이름으로 가져올 수 있습니다.
 */

// 클래스 정의와 동시에 내보내기
export default class Calculator {
  add(a, b) {
    return a + b;
  }
  
  subtract(a, b) {
    return a - b;
  }
  
  multiply(a, b) {
    return a * b;
  }
  
  divide(a, b) {
    if (b === 0) {
      throw new Error('0으로 나눌 수 없습니다.');
    }
    return a / b;
  }
  
  power(base, exponent) {
    return Math.pow(base, exponent);
  }
}

// 참고: 이 파일에서는 다른 기본 내보내기를 추가할 수 없습니다.
// 아래 코드는 오류를 발생시킵니다.
/*
export default function add(a, b) {
  return a + b;
}
*/ 