/**
 * 템플릿 리터럴 (Template Literals)
 * 
 * 템플릿 리터럴은 백틱(`)을 사용하여 문자열을 표현하는 방법으로,
 * 문자열 내에 변수를 쉽게 삽입하고 여러 줄 문자열을 간편하게 작성할 수 있습니다.
 */

// 기본 사용법
console.log('===== 기본 사용법 =====');

const name = '홍길동';
const age = 30;

// 기존 방식
const greeting1 = '안녕하세요, ' + name + '님! 당신은 ' + age + '세입니다.';
console.log('기존 방식:', greeting1);

// 템플릿 리터럴 사용
const greeting2 = `안녕하세요, ${name}님! 당신은 ${age}세입니다.`;
console.log('템플릿 리터럴:', greeting2);

// 표현식 삽입
console.log('\n===== 표현식 삽입 =====');

const a = 10;
const b = 20;
console.log(`${a} + ${b} = ${a + b}`);
console.log(`${a}이 ${b}보다 큰가요? ${a > b ? '예' : '아니오'}`);

// 함수 호출
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const city = 'seoul';
console.log(`도시 이름: ${capitalize(city)}`);

// 여러 줄 문자열
console.log('\n===== 여러 줄 문자열 =====');

// 기존 방식
const multiline1 = '첫 번째 줄\n' +
                  '두 번째 줄\n' +
                  '세 번째 줄';
console.log('기존 방식:');
console.log(multiline1);

// 템플릿 리터럴 사용
const multiline2 = `첫 번째 줄
두 번째 줄
세 번째 줄`;
console.log('\n템플릿 리터럴:');
console.log(multiline2);

// HTML 템플릿 생성
console.log('\n===== HTML 템플릿 생성 =====');

const product = {
  name: '스마트폰',
  price: 1200000,
  discount: 0.1,
  stock: 50
};

const productHTML = `
<div class="product">
  <h2>${product.name}</h2>
  <p class="price">가격: ${product.price.toLocaleString()}원</p>
  <p class="discount">할인가: ${(product.price * (1 - product.discount)).toLocaleString()}원 (${product.discount * 100}% 할인)</p>
  <p class="stock ${product.stock < 10 ? 'low-stock' : ''}">${
    product.stock < 10 ? '재고 부족!' : `재고: ${product.stock}개`
  }</p>
</div>
`;

console.log(productHTML);

// 태그드 템플릿 (Tagged Templates)
console.log('\n===== 태그드 템플릿 =====');

// 태그 함수 정의
function highlight(strings, ...values) {
  let result = '';
  
  strings.forEach((string, i) => {
    const value = values[i] || '';
    const highlighted = typeof value === 'number' 
      ? `<strong style="color: blue">${value}</strong>` 
      : `<strong style="color: green">${value}</strong>`;
    
    result += string + highlighted;
  });
  
  return result;
}

const title = '월간 보고서';
const monthlyUsers = 12500;
const growth = 25;

const report = highlight`${title}에 따르면, 이번 달 사용자 수는 ${monthlyUsers}명이고, 전월 대비 ${growth}% 증가했습니다.`;
console.log(report);

// 실무 활용 예제
console.log('\n===== 실무 활용 예제 =====');

// SQL 쿼리 작성
const tableName = 'users';
const fields = ['name', 'email', 'created_at'];
const condition = 'age >= 18';

const query = `
SELECT ${fields.join(', ')}
FROM ${tableName}
WHERE ${condition}
ORDER BY created_at DESC
LIMIT 10;
`;

console.log('SQL 쿼리 예제:');
console.log(query);

// API 엔드포인트 구성
const apiVersion = 'v1';
const resource = 'products';
const id = 1234;
const params = { fields: 'name,price,description', include: 'categories' };

const queryString = Object.entries(params)
  .map(([key, value]) => `${key}=${value}`)
  .join('&');

const apiUrl = `https://api.example.com/${apiVersion}/${resource}/${id}?${queryString}`;
console.log('\nAPI URL 예제:');
console.log(apiUrl); 