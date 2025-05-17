// main.js - 모듈을 가져와 사용하는 메인 파일

// 1. 개별적으로 가져오기
import { PI, add, subtract } from './math.js';
console.log('PI:', PI);
console.log('3 + 5 =', add(3, 5));
console.log('10 - 7 =', subtract(10, 7));

// 2. 이름을 바꿔서 가져오기
import { multiply as mul, divide as div } from './math.js';
console.log('4 * 3 =', mul(4, 3));
console.log('20 / 4 =', div(20, 4));

// 3. 모든 export를 한번에 가져오기 (네임스페이스 객체로)
import * as MathModule from './math.js';
console.log('E:', MathModule.E);
console.log('6 + 9 =', MathModule.add(6, 9));
console.log('SQRT2:', MathModule.MathConstants.SQRT2);
console.log('2^8 =', MathModule.pow(2, 8));

// 4. 두 점 사이의 거리 계산
const point1 = { x: 0, y: 0 };
const point2 = { x: 3, y: 4 };
console.log('두 점 사이의 거리:', MathModule.calculateDistance(
  point1.x, point1.y, point2.x, point2.y
));

// 5. 기본 내보내기(default export) 가져오기
import Formatter from './utils.js';
console.log('포맷된 숫자:', Formatter.formatNumber(123.4567, 3));
console.log('포맷된 금액:', Formatter.formatCurrency(1000000));
console.log('오늘 날짜:', Formatter.formatDate());

// 6. 일반 내보내기와 기본 내보내기 함께 가져오기
import FormatterClass, { capitalize, truncate, StringUtils } from './utils.js';
console.log('클래스 이름:', FormatterClass.name);

const text = 'hello world';
console.log('대문자 변환:', capitalize(text));
console.log('텍스트 자르기:', truncate('This is a very long text that should be truncated', 15));
console.log('텍스트 뒤집기:', StringUtils.reverse(text));
console.log('단어 수:', StringUtils.countWords('JavaScript 모듈 시스템을 배우고 있습니다.'));

// 7. 동적으로 모듈 가져오기 (ES2020)
async function loadModuleDynamically() {
  console.log('동적 모듈 로딩 시작...');
  
  try {
    // 동적으로 모듈 가져오기
    const mathModule = await import('./math.js');
    console.log('동적으로 가져온 PI 값:', mathModule.PI);
    console.log('동적으로 가져온 함수 실행:', mathModule.add(10, 20));
  } catch (error) {
    console.error('모듈 로딩 오류:', error);
  }
}

// 동적 모듈 로딩 실행
loadModuleDynamically(); 