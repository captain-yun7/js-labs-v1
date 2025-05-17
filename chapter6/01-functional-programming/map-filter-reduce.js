// map-filter-reduce.js - 배열 고차 함수 예제

// 샘플 데이터
const products = [
  { id: 1, name: '노트북', price: 1200000, category: '전자제품' },
  { id: 2, name: '스마트폰', price: 950000, category: '전자제품' },
  { id: 3, name: '커피머신', price: 350000, category: '주방가전' },
  { id: 4, name: '청소기', price: 550000, category: '생활가전' },
  { id: 5, name: '냉장고', price: 1800000, category: '주방가전' },
  { id: 6, name: '태블릿', price: 800000, category: '전자제품' },
  { id: 7, name: '에어컨', price: 1000000, category: '생활가전' },
  { id: 8, name: '전자레인지', price: 150000, category: '주방가전' },
];

// 1. map 함수
console.log('=== map 함수 ===');

/*
  map 함수는 배열의 각 요소에 주어진 함수를 적용하고
  그 결과로 새로운 배열을 생성합니다.
  
  Array.prototype.map(callback(currentValue[, index[, array]]) {
    // return element for new_array
  }[, thisArg])
*/

// 예제 1: 모든 상품의 이름만 추출하기
const productNames = products.map(product => product.name);
console.log('상품 이름 목록:', productNames);

// 예제 2: 가격에 10% 할인 적용하기
const discountedProducts = products.map(product => ({
  ...product,
  price: product.price * 0.9
}));
console.log('할인된 상품:', discountedProducts[0]);

// 예제 3: 상품 정보를 문자열로 변환하기
const productStrings = products.map(product => 
  `${product.name} (${product.category}): ${product.price.toLocaleString()}원`
);
console.log('상품 설명:', productStrings.slice(0, 3));

// 예제 4: 인덱스와 함께 사용하기
const numberedProducts = products.map((product, index) => 
  `${index + 1}. ${product.name}`
);
console.log('번호가 매겨진 상품 목록:', numberedProducts);

// 자체 구현 map 함수
function customMap(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i], i, array));
  }
  return result;
}

const customMappedNames = customMap(products, product => product.name);
console.log('자체 구현 map으로 추출한 이름:', customMappedNames);


// 2. filter 함수
console.log('\n=== filter 함수 ===');

/*
  filter 함수는 주어진 함수의 테스트를 통과하는
  모든 요소를 모아 새로운 배열을 생성합니다.
  
  Array.prototype.filter(callback(element[, index[, array]]) {
    // return element for new_array if true
  }[, thisArg])
*/

// 예제 1: 50만원 이상의 상품만 필터링하기
const expensiveProducts = products.filter(product => product.price >= 500000);
console.log('비싼 상품 수:', expensiveProducts.length);
console.log('첫 번째 비싼 상품:', expensiveProducts[0].name);

// 예제 2: '전자제품' 카테고리 상품만 필터링하기
const electronicProducts = products.filter(product => product.category === '전자제품');
console.log('전자제품 목록:', electronicProducts.map(p => p.name));

// 예제 3: 여러 조건으로 필터링하기
const searchResults = products.filter(product => 
  product.price <= 1000000 && 
  (product.category === '전자제품' || product.category === '주방가전')
);
console.log('검색 결과 수:', searchResults.length);

// 예제 4: 이름에 특정 문자열이 포함된 상품 찾기
const searchTerm = '기';
const searchByName = products.filter(product => 
  product.name.includes(searchTerm)
);
console.log(`'${searchTerm}'이 포함된 상품:`, searchByName.map(p => p.name));

// 자체 구현 filter 함수
function customFilter(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      result.push(array[i]);
    }
  }
  return result;
}

const customFiltered = customFilter(products, product => product.price < 500000);
console.log('자체 구현 filter로 찾은 저렴한 상품:', customFiltered.map(p => p.name));


// 3. reduce 함수
console.log('\n=== reduce 함수 ===');

/*
  reduce 함수는 배열의 각 요소에 대해 주어진 리듀서(reducer) 함수를 실행하고
  하나의 결과값을 반환합니다.
  
  Array.prototype.reduce(callback(accumulator, currentValue[, index[, array]]) {
    // return accumulator
  }[, initialValue])
*/

// 예제 1: 모든 상품 가격의 총합 계산하기
const totalPrice = products.reduce((acc, product) => acc + product.price, 0);
console.log('총 상품 가격:', totalPrice.toLocaleString(), '원');

// 예제 2: 카테고리별 상품 개수 계산하기
const categoryCounts = products.reduce((acc, product) => {
  acc[product.category] = (acc[product.category] || 0) + 1;
  return acc;
}, {});
console.log('카테고리별 상품 수:', categoryCounts);

// 예제 3: 카테고리별 가격 총합 계산하기
const categoryPrices = products.reduce((acc, product) => {
  acc[product.category] = (acc[product.category] || 0) + product.price;
  return acc;
}, {});
console.log('카테고리별 가격 총합:', categoryPrices);

// 예제 4: 가장 비싼 상품 찾기
const mostExpensiveProduct = products.reduce((acc, product) => 
  acc.price > product.price ? acc : product
);
console.log('가장 비싼 상품:', mostExpensiveProduct.name, mostExpensiveProduct.price.toLocaleString(), '원');

// 예제 5: 특정 조건을 만족하는 첫 번째 요소 찾기 (find 함수 구현)
const findProduct = (name) => products.reduce((acc, product) => {
  if (acc) return acc; // 이미 찾았으면 그대로 반환
  return product.name.includes(name) ? product : acc;
}, null);

console.log('검색 결과:', findProduct('폰'));

// 자체 구현 reduce 함수
function customReduce(array, callback, initialValue) {
  let accumulator = initialValue;
  let startIndex = 0;
  
  if (initialValue === undefined) {
    if (array.length === 0) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
    accumulator = array[0];
    startIndex = 1;
  }
  
  for (let i = startIndex; i < array.length; i++) {
    accumulator = callback(accumulator, array[i], i, array);
  }
  
  return accumulator;
}

const customTotal = customReduce(products, (acc, product) => acc + product.price, 0);
console.log('자체 구현 reduce로 계산한 총액:', customTotal.toLocaleString(), '원');


// 4. 함수 체이닝: map, filter, reduce 조합하기
console.log('\n=== 함수 체이닝 ===');

// 예제 1: 전자제품 카테고리의 총 가격
const electronicTotalPrice = products
  .filter(product => product.category === '전자제품')
  .reduce((total, product) => total + product.price, 0);

console.log('전자제품 카테고리 총 가격:', electronicTotalPrice.toLocaleString(), '원');

// 예제 2: 100만원 이상 상품의 이름 목록
const expensiveProductNames = products
  .filter(product => product.price >= 1000000)
  .map(product => product.name);

console.log('100만원 이상 상품:', expensiveProductNames);

// 예제 3: 카테고리별 평균 가격
const categoryAverages = Object.entries(
  products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = { total: 0, count: 0 };
    }
    acc[product.category].total += product.price;
    acc[product.category].count += 1;
    return acc;
  }, {})
).reduce((acc, [category, { total, count }]) => {
  acc[category] = Math.round(total / count);
  return acc;
}, {});

console.log('카테고리별 평균 가격:', categoryAverages);

// 예제 4: 모든 상품 이름을 연결하여 하나의 문자열로 만들기
const allProductNames = products
  .map(product => product.name)
  .reduce((result, name, index, array) => 
    index === array.length - 1 
      ? result + name 
      : result + name + ', '
  , '');

console.log('모든 상품 이름:', allProductNames);


// 5. 응용: 데이터 변환 파이프라인 만들기
console.log('\n=== 응용: 데이터 변환 파이프라인 ===');

// 상품 데이터 분석 보고서 생성하기
const generateReport = (products) => {
  const totalProducts = products.length;
  
  const categorizedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});
  
  const categorySummary = Object.entries(categorizedProducts).map(([category, products]) => {
    const count = products.length;
    const totalPrice = products.reduce((sum, product) => sum + product.price, 0);
    const averagePrice = Math.round(totalPrice / count);
    const priceRange = {
      min: Math.min(...products.map(p => p.price)),
      max: Math.max(...products.map(p => p.price))
    };
    
    return {
      category,
      count,
      percentage: Math.round((count / totalProducts) * 100),
      totalPrice,
      averagePrice,
      priceRange
    };
  });
  
  const overallStats = {
    totalProducts,
    totalCategories: Object.keys(categorizedProducts).length,
    totalValue: products.reduce((sum, product) => sum + product.price, 0),
    averagePrice: Math.round(
      products.reduce((sum, product) => sum + product.price, 0) / totalProducts
    )
  };
  
  return {
    overallStats,
    categorySummary
  };
};

const report = generateReport(products);
console.log('상품 보고서:', JSON.stringify(report, null, 2));

// Node.js 환경에서 실행할 경우
module.exports = {
  products,
  customMap,
  customFilter,
  customReduce,
  generateReport
}; 