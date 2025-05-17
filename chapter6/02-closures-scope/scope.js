// scope.js - JavaScript의 스코프 개념

/**
 * JavaScript의 스코프(Scope)
 * 
 * 스코프는 변수와 함수가 접근할 수 있는 범위를 정의합니다.
 * JavaScript에는 다음과 같은 스코프 유형이 있습니다:
 * 1. 전역 스코프(Global Scope)
 * 2. 함수 스코프(Function Scope)
 * 3. 블록 스코프(Block Scope) - ES6 이후 let과 const를 통해 구현
 */

// 1. 전역 스코프(Global Scope)
// 코드의 어느 부분에서나 접근 가능한 변수입니다.
const globalVar = '전역 변수';
var anotherGlobalVar = '또 다른 전역 변수';

function accessGlobalVar() {
    console.log(globalVar); // 전역 변수에 접근 가능
}

accessGlobalVar(); // "전역 변수" 출력

// 2. 함수 스코프(Function Scope)
// 함수 내부에서 선언된 변수는 해당 함수 내부에서만 접근 가능합니다.
function functionScope() {
    const functionVar = '함수 스코프 변수';
    var anotherFunctionVar = '또 다른 함수 스코프 변수';
    
    console.log(functionVar); // "함수 스코프 변수" 출력
    console.log(globalVar);   // 전역 변수에도 접근 가능
}

functionScope();
// console.log(functionVar); // 에러: functionVar는 함수 외부에서 접근 불가

// 3. 블록 스코프(Block Scope)
// let과 const로 선언된 변수는 중괄호({}) 블록 내에서만 접근 가능합니다.
{
    let blockVar = '블록 스코프 변수';
    const anotherBlockVar = '또 다른 블록 스코프 변수';
    var varInBlock = 'var로 선언된 블록 내 변수'; // var는 블록 스코프를 가지지 않음
    
    console.log(blockVar); // "블록 스코프 변수" 출력
}

// console.log(blockVar); // 에러: blockVar는 블록 외부에서 접근 불가
// console.log(anotherBlockVar); // 에러: anotherBlockVar는 블록 외부에서 접근 불가
console.log(varInBlock); // "var로 선언된 블록 내 변수" (var는 함수 스코프만 가짐)

// 4. var vs let/const 비교
function varVsLet() {
    // var는 함수 스코프를 가지며, 호이스팅됩니다.
    console.log(hoistedVar); // undefined (선언은 호이스팅되지만 초기화는 아님)
    // console.log(notHoistedLet); // 에러: 초기화 전에 접근 불가 (TDZ - Temporal Dead Zone)
    
    var hoistedVar = 'var로 선언된 변수';
    let notHoistedLet = 'let으로 선언된 변수';
    
    // 블록 스코프 내에서의 차이
    if (true) {
        var varInsideBlock = 'if 블록 내 var 변수';
        let letInsideBlock = 'if 블록 내 let 변수';
    }
    
    console.log(varInsideBlock); // "if 블록 내 var 변수" (var는 블록 스코프를 무시)
    // console.log(letInsideBlock); // 에러: letInsideBlock는 블록 외부에서 접근 불가
}

varVsLet();

// 5. 스코프 체인(Scope Chain)
// 내부 스코프에서 변수를 찾을 수 없으면, 외부 스코프를 순차적으로 검색합니다.
const outerVar = '외부 변수';

function outerFunction() {
    const innerVar = '내부 변수';
    
    function innerFunction() {
        const innermostVar = '가장 내부 변수';
        console.log(innermostVar); // 로컬 스코프에서 먼저 찾음
        console.log(innerVar);     // 그 다음 외부 함수 스코프에서 찾음
        console.log(outerVar);     // 마지막으로 전역 스코프에서 찾음
    }
    
    innerFunction();
}

outerFunction();

// 6. 변수 섀도잉(Variable Shadowing)
// 내부 스코프에서 외부 스코프와 동일한 이름의 변수를 선언하면, 외부 변수는 가려집니다.
const shadowedVar = '전역 변수';

function shadowingExample() {
    const shadowedVar = '함수 내 변수'; // 동일한 이름으로 변수 선언
    console.log(shadowedVar); // "함수 내 변수" (전역 변수가 아닌 로컬 변수 사용)
    
    if (true) {
        const shadowedVar = '블록 내 변수'; // 또 다시 동일한 이름으로 변수 선언
        console.log(shadowedVar); // "블록 내 변수" (함수 내 변수가 아닌 블록 내 변수 사용)
    }
    
    console.log(shadowedVar); // "함수 내 변수" (다시 함수 스코프의 변수로 돌아옴)
}

shadowingExample();
console.log(shadowedVar); // "전역 변수" (전역 스코프의 변수는 그대로 유지)

// 7. 즉시 실행 함수 표현식(IIFE)와 스코프
// IIFE는 함수를 선언하자마자 즉시 실행하며, 자체적인 스코프를 생성합니다.
(function() {
    const privateVar = 'IIFE 내부 변수';
    console.log(privateVar); // "IIFE 내부 변수"
    console.log(globalVar);  // 전역 변수에도 접근 가능
})();

// console.log(privateVar); // 에러: privateVar는 IIFE 외부에서 접근 불가

// 8. 스코프와 관련된 주의사항

// 8.1. var의 함수 스코프와 호이스팅으로 인한 문제
function varScopeIssue() {
    for (var i = 0; i < 3; i++) {
        // var로 선언된 i는 함수 전체에서 접근 가능
    }
    console.log(i); // 3 (for 루프 밖에서도 i에 접근 가능)
}
varScopeIssue();

// 8.2. let의 블록 스코프로 문제 해결
function letScopeFixed() {
    for (let j = 0; j < 3; j++) {
        // let으로 선언된 j는 for 루프 블록 내에서만 접근 가능
    }
    // console.log(j); // 에러: j는 for 루프 외부에서 접근 불가
}
letScopeFixed();

// 8.3. 비동기 코드와 스코프
function asyncScopeExample() {
    // var로 인한 문제
    for (var k = 0; k < 3; k++) {
        setTimeout(function() {
            console.log('var로 선언한 k:', k); // 모두 3을 출력 (함수 스코프)
        }, 100);
    }
    
    // let으로 문제 해결
    for (let m = 0; m < 3; m++) {
        setTimeout(function() {
            console.log('let으로 선언한 m:', m); // 0, 1, 2를 순서대로 출력 (블록 스코프)
        }, 200);
    }
}
asyncScopeExample();

/**
 * 스코프 사용 시 주요 팁:
 * 1. 가능하면 전역 변수 사용을 최소화하고, 필요한 스코프에서만 변수를 선언하세요.
 * 2. var 대신 let과 const를 사용하여 예측 가능한 스코프 동작을 보장하세요.
 * 3. 변수 이름 충돌을 피하기 위해 적절한 변수 이름을 지정하세요.
 * 4. 클로저와 즉시 실행 함수를 활용하여 변수 노출을 제한하세요.
 */ 