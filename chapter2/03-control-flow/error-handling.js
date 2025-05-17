// error-handling.js - 예외 처리

/**
 * JavaScript의 예외 처리 (Error Handling)
 * 
 * 예외 처리는 프로그램 실행 중 발생할 수 있는 오류를 
 * 감지하고 처리하는 메커니즘입니다.
 * JavaScript에서는 try, catch, finally 블록을 사용하여 예외를 처리합니다.
 */

console.log('==== 예외 처리 예제 ====');

// 1. 기본 try-catch 문
console.log('\n--- 기본 try-catch ---');

try {
    // 오류가 발생할 수 있는 코드
    console.log('try 블록 시작');
    
    // 존재하지 않는 변수를 참조하여 오류 발생
    console.log(nonExistentVariable);
    
    // 이 코드는 오류 발생 후 실행되지 않음
    console.log('이 메시지는 출력되지 않습니다.');
} catch (error) {
    // 오류가 발생하면 이 블록이 실행됨
    console.log('오류가 발생했습니다:', error.message);
}

console.log('프로그램이 계속 실행됩니다.');

// 2. try-catch-finally 문
console.log('\n--- try-catch-finally ---');

try {
    console.log('try 블록 시작');
    
    // 오류 발생
    throw new Error('의도적으로 발생시킨 오류');
    
    console.log('이 메시지는 출력되지 않습니다.');
} catch (error) {
    console.log('catch 블록:', error.message);
} finally {
    // 오류 발생 여부와 상관없이 항상 실행
    console.log('finally 블록: 항상 실행됩니다.');
}

// 3. 에러 객체의 속성
console.log('\n--- 에러 객체 속성 ---');

try {
    // 문법적으로 유효하지만 런타임에 오류가 발생하는 코드
    const obj = null;
    console.log(obj.property);
} catch (error) {
    console.log('에러 타입:', error.name);
    console.log('에러 메시지:', error.message);
    console.log('스택 트레이스:', error.stack);
}

// 4. 다양한 에러 타입
console.log('\n--- 다양한 에러 타입 ---');

// 4.1. SyntaxError - 문법 오류
try {
    // 주석 처리를 해제하면 SyntaxError가 발생합니다
    // eval('alert("Hello"');  // 닫는 괄호 누락
    
    // 파싱 시점의 SyntaxError는 try-catch로 잡을 수 없으므로 eval로 시뮬레이션
    console.log('SyntaxError 예제');
    eval('if (true) {');  // 닫는 중괄호 누락
} catch (error) {
    console.log('SyntaxError 발생:', error.message);
}

// 4.2. ReferenceError - 존재하지 않는 변수 참조
try {
    console.log(undefinedVariable);
} catch (error) {
    console.log('ReferenceError 발생:', error.message);
}

// 4.3. TypeError - 타입 불일치
try {
    const num = 123;
    num.toUpperCase();  // 숫자에 문자열 메서드 호출
} catch (error) {
    console.log('TypeError 발생:', error.message);
}

// 4.4. RangeError - 범위 초과
try {
    const arr = new Array(-1);  // 음수 길이의 배열 생성 시도
} catch (error) {
    console.log('RangeError 발생:', error.message);
}

// 5. 사용자 정의 에러
console.log('\n--- 사용자 정의 에러 ---');

// 사용자 정의 에러 클래스 생성
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
        this.date = new Date();
    }
}

// 사용자 정의 에러 사용
function validateUsername(username) {
    if (!username) {
        throw new ValidationError('사용자 이름이 필요합니다.');
    }
    
    if (username.length < 3) {
        throw new ValidationError('사용자 이름이 너무 짧습니다.');
    }
    
    return true;
}

try {
    console.log(validateUsername(''));  // 빈 문자열로 호출
} catch (error) {
    if (error instanceof ValidationError) {
        console.log('유효성 검사 오류:', error.message);
        console.log('발생 시간:', error.date);
    } else {
        console.log('다른 오류 발생:', error.message);
    }
}

// 6. 에러 다시 던지기 (re-throwing)
console.log('\n--- 에러 다시 던지기 ---');

function processData(data) {
    try {
        if (typeof data !== 'number') {
            throw new TypeError('숫자만 처리할 수 있습니다.');
        }
        
        if (data < 0) {
            throw new RangeError('음수는 처리할 수 없습니다.');
        }
        
        console.log('데이터 처리 완료:', data * 2);
    } catch (error) {
        console.log('processData 내부에서 오류 감지');
        
        // 특정 에러만 처리하고 나머지는 다시 던짐
        if (error instanceof RangeError) {
            console.log('범위 오류 처리:', error.message);
        } else {
            throw error;  // 다른 종류의 오류는 상위로 전파
        }
    }
}

try {
    // processData(-5);  // RangeError: 내부에서 처리됨
    processData('문자열');  // TypeError: 다시 던져짐
} catch (error) {
    console.log('최상위 catch 블록에서 오류 처리:', error.message);
}

// 7. 비동기 코드에서의 에러 처리
console.log('\n--- 비동기 코드의 에러 처리 ---');

// 7.1. setTimeout과 try-catch
try {
    setTimeout(() => {
        try {
            throw new Error('setTimeout 내부 오류');
        } catch (error) {
            console.log('setTimeout 내부에서 오류 처리:', error.message);
        }
    }, 1000);
    
    // 외부 try-catch는 setTimeout 내부 오류를 감지하지 못함
    throw new Error('즉시 발생한 오류');
} catch (error) {
    console.log('외부에서 오류 처리:', error.message);
}

// 7.2. Promise와 에러 처리
function fetchData() {
    return new Promise((resolve, reject) => {
        // 비동기 작업 시뮬레이션
        setTimeout(() => {
            const success = false;
            
            if (success) {
                resolve('데이터 가져오기 성공!');
            } else {
                reject(new Error('데이터 가져오기 실패!'));
            }
        }, 1000);
    });
}

// then/catch를 사용한 에러 처리
fetchData()
    .then(data => {
        console.log('Promise 결과:', data);
    })
    .catch(error => {
        console.log('Promise 오류 처리:', error.message);
    })
    .finally(() => {
        console.log('Promise finally 블록 실행');
    });

// 7.3. async/await와 try-catch
async function fetchDataAsync() {
    try {
        const data = await fetchData();
        console.log('async/await 결과:', data);
    } catch (error) {
        console.log('async/await 오류 처리:', error.message);
    } finally {
        console.log('async/await finally 블록 실행');
    }
}

fetchDataAsync();

/**
 * 예외 처리 사용 시 주의사항:
 * 
 * 1. 구체적인 에러 처리: 가능한 모든 에러를 한 catch 블록에서 처리하기보다 구체적인 에러 타입별로 처리하세요.
 * 2. 에러 전파: 처리할 수 없는 에러는 적절히 상위로 전파(re-throw)하세요.
 * 3. finally 활용: 리소스 정리 등의 작업은 finally 블록에서 수행하세요.
 * 4. 비동기 코드: 비동기 코드의 에러는 콜백, Promise, async/await 등에 맞는 방법으로 처리하세요.
 * 5. 오류 발생(throw): 오류를 발생시킬 때는 항상 Error 객체나 그 하위 클래스를 사용하세요.
 */ 