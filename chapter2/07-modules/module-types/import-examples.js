/**
 * 다양한 가져오기 방식 예제 (Import Examples)
 * 
 * 모듈에서 내보낸 요소를 다양한 방식으로 가져오는 방법들
 */

// 1. 기본 내보내기 가져오기
import Calculator from './default-export.js';

// 기본 내보내기는 원하는 이름으로 가져올 수 있음
import Calc from './default-export.js';

// 2. 이름 붙은 내보내기 가져오기
import { PI, add, subtract, Circle, utils } from './named-exports.js';

// 3. 이름 바꿔서 가져오기
import { 
  PI as PI_VALUE, 
  add as addition, 
  Circle as CircleClass 
} from './named-exports.js';

// 4. 모든 이름 붙은 내보내기를 하나의 객체로 가져오기
import * as MathUtils from './named-exports.js';

// 5. 혼합 내보내기에서 기본 내보내기와 이름 붙은 내보내기 함께 가져오기
import DateTime, { VERSION, formatDate, dateUtils } from './mixed-exports.js';

// 코드 실행 예제
console.log('===== 기본 내보내기 사용하기 =====');
const calculator = new Calculator();
console.log(`10 + 5 = ${calculator.add(10, 5)}`);
console.log(`10 - 5 = ${calculator.subtract(10, 5)}`);

const calc = new Calc();
console.log(`10 × 5 = ${calc.multiply(10, 5)}`);

console.log('\n===== 이름 붙은 내보내기 사용하기 =====');
console.log(`PI 값: ${PI}`);
console.log(`3 + 4 = ${add(3, 4)}`);
console.log(`10 - 7 = ${subtract(10, 7)}`);

const circle = new Circle(5);
console.log(`원 지름: ${circle.diameter}`);
console.log(`원 면적: ${circle.area.toFixed(2)}`);

console.log(`난수 생성: ${utils.random(1, 10)}`);
console.log(`배열 합계: ${utils.sum([1, 2, 3, 4, 5])}`);

console.log('\n===== 이름 바꿔서 가져온 요소 사용하기 =====');
console.log(`PI_VALUE: ${PI_VALUE}`);
console.log(`6 + 9 = ${addition(6, 9)}`);
const circle2 = new CircleClass(3);
console.log(`작은 원 면적: ${circle2.area.toFixed(2)}`);

console.log('\n===== 모듈 전체를 객체로 가져와 사용하기 =====');
console.log(`MathUtils.E: ${MathUtils.E}`);
console.log(`MathUtils.multiply(4, 5): ${MathUtils.multiply(4, 5)}`);
console.log(`MathUtils.divide(20, 4): ${MathUtils.divide(20, 4)}`);
console.log(`직각삼각형 빗변: ${MathUtils.calculateHypotenuse(3, 4)}`);

console.log('\n===== 혼합 내보내기 사용하기 =====');
console.log(`라이브러리 버전: ${VERSION}`);

const today = new Date();
console.log(`오늘 날짜: ${formatDate(today)}`);

const dateTimeNow = DateTime.now();
console.log(`현재 날짜와 시간: ${dateTimeNow.getDateTime()}`);
console.log(`사용자 형식: ${dateTimeNow.format('YYYY년 MM월 DD일 HH시 mm분 ss초')}`);

const tomorrow = dateTimeNow.addDays(1);
console.log(`내일 날짜: ${tomorrow.getDate()}`);

console.log(`윤년 여부 (2024): ${dateUtils.isLeapYear(2024)}`);
console.log(`2월 일수 (2024): ${dateUtils.getDaysInMonth(2024, 2)}`);
console.log(`오늘 요일: ${dateUtils.getDayName(today)}`); 