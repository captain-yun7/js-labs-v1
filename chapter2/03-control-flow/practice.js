// practice.js - 제어 흐름 실습

/**
 * JavaScript 제어 흐름 실습
 * 
 * 이 파일은 조건문, 반복문, switch 문, 예외 처리 등 
 * JavaScript의 제어 흐름 구문을 연습하기 위한 실습 예제입니다.
 */

console.log('===== JavaScript 제어 흐름 실습 =====');

// 실습 1: 조건문
console.log('\n----- 실습 1: 조건문 -----');

// TODO: age 변수의 값에 따라 다음과 같이 출력하는 조건문을 작성하세요.
// 20세 이상: "성인입니다."
// 14세 이상 20세 미만: "청소년입니다."
// 14세 미만: "어린이입니다."
function checkAge(age) {
    // 여기에 코드를 작성하세요.
    if (age >= 20) {
        return "성인입니다.";
    } else if (age >= 14) {
        return "청소년입니다.";
    } else {
        return "어린이입니다.";
    }
}

// 테스트
console.log('10살: ' + checkAge(10));  // 어린이입니다.
console.log('16살: ' + checkAge(16));  // 청소년입니다.
console.log('25살: ' + checkAge(25));  // 성인입니다.

// 실습 2: 삼항 연산자
console.log('\n----- 실습 2: 삼항 연산자 -----');

// TODO: 아래 if 문을 삼항 연산자로 변환하세요.
function isEvenOrOdd(number) {
    if (number % 2 === 0) {
        return "짝수";
    } else {
        return "홀수";
    }
}

// 삼항 연산자로 변환한 함수
function isEvenOrOddTernary(number) {
    // 여기에 코드를 작성하세요.
    return number % 2 === 0 ? "짝수" : "홀수";
}

// 테스트
console.log('7은 ' + isEvenOrOdd(7));        // 홀수
console.log('8은 ' + isEvenOrOddTernary(8)); // 짝수

// 실습 3: 반복문 - for
console.log('\n----- 실습 3: 반복문 - for -----');

// TODO: 1부터 10까지의 합을 구하는 for 루프를 작성하세요.
function sumOneToTen() {
    let sum = 0;
    
    // 여기에 코드를 작성하세요.
    for (let i = 1; i <= 10; i++) {
        sum += i;
    }
    
    return sum;
}

// 테스트
console.log('1부터 10까지의 합: ' + sumOneToTen());  // 55

// 실습 4: 반복문 - while
console.log('\n----- 실습 4: 반복문 - while -----');

// TODO: 주어진 숫자의 각 자릿수 합을 구하는 함수를 while 루프를 사용하여 작성하세요.
function sumDigits(number) {
    let sum = 0;
    
    // 여기에 코드를 작성하세요.
    while (number > 0) {
        sum += number % 10;      // 현재 일의 자리 숫자를 더함
        number = Math.floor(number / 10);  // 일의 자리를 제거
    }
    
    return sum;
}

// 테스트
console.log('123의 각 자릿수 합: ' + sumDigits(123));    // 6 (1+2+3)
console.log('9872의 각 자릿수 합: ' + sumDigits(9872));  // 26 (9+8+7+2)

// 실습 5: 중첩 반복문
console.log('\n----- 실습 5: 중첩 반복문 -----');

// TODO: 다음과 같은 패턴을 출력하는 함수를 작성하세요.
// *
// **
// ***
// ****
// *****
function printStarPattern(rows) {
    let pattern = '';
    
    // 여기에 코드를 작성하세요.
    for (let i = 1; i <= rows; i++) {
        let row = '';
        for (let j = 1; j <= i; j++) {
            row += '*';
        }
        pattern += row + '\n';
    }
    
    return pattern;
}

// 테스트
console.log(printStarPattern(5));

// 실습 6: 배열 순회
console.log('\n----- 실습 6: 배열 순회 -----');

// TODO: 주어진 배열에서 짝수만 필터링하여 새 배열을 반환하는 함수를 작성하세요.
function filterEvenNumbers(numbers) {
    const result = [];
    
    // 여기에 코드를 작성하세요.
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] % 2 === 0) {
            result.push(numbers[i]);
        }
    }
    
    return result;
}

// 테스트
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log('짝수만 필터링: ' + filterEvenNumbers(numbers));  // [2,4,6,8,10]

// 실습 7: switch 문
console.log('\n----- 실습 7: switch 문 -----');

// TODO: 월 이름을 입력받아 해당 월의 일수를 반환하는 함수를 switch 문을 사용하여 작성하세요.
// (윤년은 고려하지 않음)
function getDaysInMonth(month) {
    let days;
    
    // 여기에 코드를 작성하세요.
    switch (month.toLowerCase()) {
        case 'january':
        case '1월':
        case 'january':
        case 'jan':
            days = 31;
            break;
        case 'february':
        case '2월':
        case 'feb':
            days = 28;
            break;
        case 'march':
        case '3월':
        case 'mar':
            days = 31;
            break;
        case 'april':
        case '4월':
        case 'apr':
            days = 30;
            break;
        case 'may':
        case '5월':
            days = 31;
            break;
        case 'june':
        case '6월':
        case 'jun':
            days = 30;
            break;
        case 'july':
        case '7월':
        case 'jul':
            days = 31;
            break;
        case 'august':
        case '8월':
        case 'aug':
            days = 31;
            break;
        case 'september':
        case '9월':
        case 'sep':
            days = 30;
            break;
        case 'october':
        case '10월':
        case 'oct':
            days = 31;
            break;
        case 'november':
        case '11월':
        case 'nov':
            days = 30;
            break;
        case 'december':
        case '12월':
        case 'dec':
            days = 31;
            break;
        default:
            days = '알 수 없는 월';
    }
    
    return days;
}

// 테스트
console.log('February의 일수: ' + getDaysInMonth('February'));  // 28
console.log('8월의 일수: ' + getDaysInMonth('8월'));           // 31
console.log('Nov의 일수: ' + getDaysInMonth('Nov'));          // 30

// 실습 8: 예외 처리
console.log('\n----- 실습 8: 예외 처리 -----');

// TODO: 두 수를 나누는 함수를 작성하고, 0으로 나누려고 할 때 적절한 예외 처리를 하세요.
function divideNumbers(a, b) {
    // 여기에 코드를 작성하세요.
    try {
        if (b === 0) {
            throw new Error('0으로 나눌 수 없습니다.');
        }
        return a / b;
    } catch (error) {
        return error.message;
    }
}

// 테스트
console.log('10 / 2 = ' + divideNumbers(10, 2));    // 5
console.log('10 / 0 = ' + divideNumbers(10, 0));    // 0으로 나눌 수 없습니다.

// 실습 9: 복합 실습 - 간단한 계산기
console.log('\n----- 실습 9: 복합 실습 - 간단한 계산기 -----');

// TODO: 두 수와 연산자를 입력받아 계산 결과를 반환하는 함수를 작성하세요.
// switch 문과 예외 처리를 활용하세요.
function calculator(a, b, operator) {
    // 여기에 코드를 작성하세요.
    try {
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new TypeError('숫자만 계산할 수 있습니다.');
        }
        
        let result;
        switch (operator) {
            case '+':
                result = a + b;
                break;
            case '-':
                result = a - b;
                break;
            case '*':
                result = a * b;
                break;
            case '/':
                if (b === 0) {
                    throw new Error('0으로 나눌 수 없습니다.');
                }
                result = a / b;
                break;
            default:
                throw new Error('지원하지 않는 연산자입니다. (+, -, *, / 중 하나를 사용하세요)');
        }
        
        return result;
    } catch (error) {
        return error.message;
    }
}

// 테스트
console.log('5 + 3 = ' + calculator(5, 3, '+'));  // 8
console.log('10 - 4 = ' + calculator(10, 4, '-'));  // 6
console.log('3 * 7 = ' + calculator(3, 7, '*'));  // 21
console.log('8 / 2 = ' + calculator(8, 2, '/'));  // 4
console.log('8 / 0 = ' + calculator(8, 0, '/'));  // 0으로 나눌 수 없습니다.
console.log('5 $ 3 = ' + calculator(5, 3, '$'));  // 지원하지 않는 연산자입니다.
console.log('"5" + 3 = ' + calculator('5', 3, '+'));  // 숫자만 계산할 수 있습니다.

// 실습 10: 복합 실습 - 소수 찾기
console.log('\n----- 실습 10: 복합 실습 - 소수 찾기 -----');

// TODO: 주어진 범위 내의 모든 소수(Prime Number)를 찾아 배열로 반환하는 함수를 작성하세요.
function findPrimeNumbers(start, end) {
    const primes = [];
    
    // 여기에 코드를 작성하세요.
    // 1은 소수가 아니므로 시작 숫자가 1이하면 2부터 시작
    if (start <= 1) {
        start = 2;
    }
    
    for (let num = start; num <= end; num++) {
        let isPrime = true;
        
        // 2부터 num의 제곱근까지의 숫자로 나누어 보기
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) {
                isPrime = false;
                break;
            }
        }
        
        if (isPrime) {
            primes.push(num);
        }
    }
    
    return primes;
}

// 테스트
console.log('1-10 사이의 소수: ' + findPrimeNumbers(1, 10));  // [2,3,5,7]
console.log('20-30 사이의 소수: ' + findPrimeNumbers(20, 30));  // [23,29] 