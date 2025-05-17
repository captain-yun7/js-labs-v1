// closures.js - JavaScript의 클로저 개념

/**
 * JavaScript의 클로저(Closure)
 * 
 * 클로저는 함수와 그 함수가 선언된 렉시컬 환경의 조합입니다.
 * 쉽게 말해, 함수가 자신이 생성될 때의 환경(변수)을 기억하는 것입니다.
 */

// 1. 기본적인 클로저 예제
function outerFunction() {
    const outerVariable = '외부 함수 변수';
    
    // 내부 함수는 외부 함수의 변수에 접근할 수 있습니다.
    function innerFunction() {
        console.log(outerVariable); // 외부 함수의 변수에 접근
    }
    
    return innerFunction; // 내부 함수를 반환
}

const closureExample = outerFunction(); // 외부 함수 실행하고 내부 함수를 변수에 저장
closureExample(); // "외부 함수 변수" 출력 - 외부 함수가 이미 실행을 완료했지만 내부 함수는 여전히 outerVariable에 접근 가능

// 2. 클로저로 데이터 은닉하기
function createCounter() {
    let count = 0; // 프라이빗 변수
    
    return {
        increment: function() {
            count += 1;
            return count;
        },
        decrement: function() {
            count -= 1;
            return count;
        },
        getCount: function() {
            return count;
        }
    };
}

const counter = createCounter();
console.log(counter.getCount()); // 0
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.decrement()); // 1
// console.log(counter.count); // undefined - count 변수는 외부에서 직접 접근할 수 없음

// 3. 클로저와 함수 팩토리
function multiplyBy(factor) {
    return function(number) {
        return number * factor;
    };
}

const double = multiplyBy(2);
const triple = multiplyBy(3);

console.log(double(5)); // 10 - 5 * 2
console.log(triple(5)); // 15 - 5 * 3

// 4. 클로저와 이벤트 핸들러
function setupButtonEvents() {
    const buttons = ['Button 1', 'Button 2', 'Button 3'];
    
    // 각 버튼에 대한 클릭 핸들러 생성 (실제 코드에서는 DOM 요소를 사용)
    for (let i = 0; i < buttons.length; i++) {
        // 이 함수는 i 값을 기억하는 클로저를 생성합니다.
        function createClickHandler(index) {
            return function() {
                console.log(`${buttons[index]}이(가) 클릭되었습니다.`);
            };
        }
        
        // 실제 코드: element.addEventListener('click', createClickHandler(i));
        // 예시를 위해 함수를 직접 호출
        const clickHandler = createClickHandler(i);
        clickHandler(); // 각 버튼의 클릭 핸들러 실행
    }
}

setupButtonEvents();

// 5. 클로저 함정: 루프 내부에서 변수 캡처하기
function closureInLoops() {
    // 문제: var를 사용하면 클로저가 항상 루프 변수의 마지막 값을 참조
    const functionsWithVar = [];
    for (var i = 0; i < 3; i++) {
        functionsWithVar.push(function() {
            console.log('var로 선언한 i:', i);
        });
    }
    
    // 모든 함수가 루프가 종료된 후의 i 값(3)을 참조
    functionsWithVar.forEach(function(func) {
        func(); // 모두 "var로 선언한 i: 3" 출력
    });
    
    // 해결책 1: 즉시 실행 함수로 현재 i 값 캡처
    const functionsWithIIFE = [];
    for (var j = 0; j < 3; j++) {
        (function(currentJ) {
            functionsWithIIFE.push(function() {
                console.log('IIFE로 캡처한 j:', currentJ);
            });
        })(j);
    }
    
    functionsWithIIFE.forEach(function(func) {
        func(); // "IIFE로 캡처한 j: 0", "IIFE로 캡처한 j: 1", "IIFE로 캡처한 j: 2" 순서로 출력
    });
    
    // 해결책 2: ES6의 let 사용 (블록 스코프로 각 반복마다 새로운 변수가 생성됨)
    const functionsWithLet = [];
    for (let k = 0; k < 3; k++) {
        functionsWithLet.push(function() {
            console.log('let으로 선언한 k:', k);
        });
    }
    
    functionsWithLet.forEach(function(func) {
        func(); // "let으로 선언한 k: 0", "let으로 선언한 k: 1", "let으로 선언한 k: 2" 순서로 출력
    });
}

closureInLoops();

// 6. 모듈 패턴
// 클로저를 사용하여 프라이빗 변수와 메소드를 가진 객체를 생성하는 패턴
function createBankAccount(initialBalance) {
    let balance = initialBalance; // 프라이빗 변수
    
    // 프라이빗 함수
    function validateAmount(amount) {
        return amount > 0 && amount <= balance;
    }
    
    // 퍼블릭 인터페이스
    return {
        deposit: function(amount) {
            if (amount > 0) {
                balance += amount;
                return `${amount}원 입금 완료. 현재 잔액: ${balance}원`;
            }
            return '유효하지 않은 입금액입니다.';
        },
        withdraw: function(amount) {
            if (validateAmount(amount)) {
                balance -= amount;
                return `${amount}원 출금 완료. 현재 잔액: ${balance}원`;
            }
            return '유효하지 않은 출금액입니다.';
        },
        getBalance: function() {
            return `현재 잔액: ${balance}원`;
        }
    };
}

const account = createBankAccount(10000);
console.log(account.getBalance()); // "현재 잔액: 10000원"
console.log(account.deposit(5000)); // "5000원 입금 완료. 현재 잔액: 15000원"
console.log(account.withdraw(3000)); // "3000원 출금 완료. 현재 잔액: 12000원"
console.log(account.withdraw(20000)); // "유효하지 않은 출금액입니다."
// console.log(account.balance); // undefined - balance 변수는 외부에서 접근 불가

// 7. 클로저와 메모리 관리
function potentialMemoryLeak() {
    const largeData = new Array(1000000).fill('잠재적 메모리 누수 데이터');
    
    return function() {
        // 이 함수는 largeData의 작은 부분만 사용하지만, 
        // 전체 largeData 배열을 메모리에 유지합니다.
        console.log(`Data length: ${largeData.length}`);
    };
}

const leakyFunction = potentialMemoryLeak();
leakyFunction(); // "Data length: 1000000"

// 개선된 버전 - 필요한 데이터만 캡처
function betterMemoryManagement() {
    const largeData = new Array(1000000).fill('잠재적 메모리 누수 데이터');
    const dataLength = largeData.length; // 필요한 정보만 캡처
    
    // largeData는 이 함수가 종료된 후 가비지 컬렉션의 대상이 됩니다.
    return function() {
        console.log(`Data length: ${dataLength}`);
    };
}

const efficientFunction = betterMemoryManagement();
efficientFunction(); // "Data length: 1000000"

/**
 * 클로저 사용 시 주요 팁:
 * 1. 클로저는 데이터 은닉과 캡슐화에 유용합니다.
 * 2. 메모리 관리에 주의하세요 - 클로저는 참조하는 변수를 메모리에 유지합니다.
 * 3. 루프 내에서 클로저를 생성할 때는 let을 사용하거나 IIFE를 활용하세요.
 * 4. 모듈 패턴에서 클로저를 활용하여 프라이빗 변수와 메소드를 구현하세요.
 * 5. 클로저는 이벤트 핸들러, 콜백 함수, 함수 팩토리에서 특히 유용합니다.
 */ 