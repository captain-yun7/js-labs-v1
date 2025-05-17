// switch-statement.js - switch 문

/**
 * JavaScript의 switch 문
 * 
 * switch 문은 표현식의 값과 case 절의 값을 비교하여 
 * 일치하는 case의 코드 블록을 실행하는 제어 구조입니다.
 */

console.log('==== switch 문 예제 ====');

// 1. 기본 switch 문
function getDayName(dayNumber) {
    let dayName;
    
    switch (dayNumber) {
        case 0:
            dayName = '일요일';
            break;
        case 1:
            dayName = '월요일';
            break;
        case 2:
            dayName = '화요일';
            break;
        case 3:
            dayName = '수요일';
            break;
        case 4:
            dayName = '목요일';
            break;
        case 5:
            dayName = '금요일';
            break;
        case 6:
            dayName = '토요일';
            break;
        default:
            dayName = '유효하지 않은 날짜';
    }
    
    return dayName;
}

const today = new Date().getDay(); // 0(일요일) ~ 6(토요일)
console.log(`오늘은 ${getDayName(today)}입니다.`);
console.log(`3은 ${getDayName(3)}입니다.`);
console.log(`9는 ${getDayName(9)}입니다.`);

// 2. break 생략 - 폴스루(fall-through)
// break가 없으면 다음 case도 실행됩니다.
function getSeasonByMonth(month) {
    let season;
    
    switch (month) {
        case 3:
        case 4:
        case 5:
            season = '봄';
            break;
        case 6:
        case 7:
        case 8:
            season = '여름';
            break;
        case 9:
        case 10:
        case 11:
            season = '가을';
            break;
        case 12:
        case 1:
        case 2:
            season = '겨울';
            break;
        default:
            season = '유효하지 않은 월';
    }
    
    return season;
}

console.log(`4월은 ${getSeasonByMonth(4)}입니다.`);
console.log(`7월은 ${getSeasonByMonth(7)}입니다.`);
console.log(`10월은 ${getSeasonByMonth(10)}입니다.`);
console.log(`1월은 ${getSeasonByMonth(1)}입니다.`);
console.log(`13월은 ${getSeasonByMonth(13)}입니다.`);

// 3. break 생략 주의사항
function breakExample(value) {
    let result = '';
    
    switch (value) {
        case 1:
            result += 'case 1 ';
            // break가 없음 - 의도적 폴스루
        case 2:
            result += 'case 2 ';
            break;
        case 3:
            result += 'case 3 ';
            break;
        default:
            result += 'default case';
    }
    
    return result;
}

console.log(`breakExample(1): ${breakExample(1)}`); // "case 1 case 2"
console.log(`breakExample(2): ${breakExample(2)}`); // "case 2"
console.log(`breakExample(3): ${breakExample(3)}`); // "case 3"
console.log(`breakExample(4): ${breakExample(4)}`); // "default case"

// 4. 문자열 값을 사용한 switch
function getFruitColor(fruit) {
    let color;
    
    switch (fruit.toLowerCase()) {
        case 'apple':
        case '사과':
            color = '빨간색 또는 초록색';
            break;
        case 'banana':
        case '바나나':
            color = '노란색';
            break;
        case 'grape':
        case '포도':
            color = '보라색';
            break;
        default:
            color = '알 수 없음';
    }
    
    return color;
}

console.log(`사과의 색상: ${getFruitColor('사과')}`);
console.log(`바나나의 색상: ${getFruitColor('banana')}`);
console.log(`수박의 색상: ${getFruitColor('수박')}`);

// 5. 복잡한 표현식을 사용한 switch
function getGrade(score) {
    // true를 기준으로 각 case의 조건식을 평가
    switch (true) {
        case score >= 90:
            return 'A';
        case score >= 80:
            return 'B';
        case score >= 70:
            return 'C';
        case score >= 60:
            return 'D';
        default:
            return 'F';
    }
}

console.log(`점수 95: ${getGrade(95)}`);
console.log(`점수 83: ${getGrade(83)}`);
console.log(`점수 75: ${getGrade(75)}`);
console.log(`점수 65: ${getGrade(65)}`);
console.log(`점수 45: ${getGrade(45)}`);

// 6. 객체 리터럴 대안
// 간단한 switch 문은 객체 리터럴로 더 깔끔하게 작성할 수 있습니다.
function getDayNameObjectLiteral(dayNumber) {
    const days = {
        0: '일요일',
        1: '월요일',
        2: '화요일',
        3: '수요일',
        4: '목요일',
        5: '금요일',
        6: '토요일'
    };
    
    return days[dayNumber] || '유효하지 않은 날짜';
}

console.log(`객체 리터럴 - 2는 ${getDayNameObjectLiteral(2)}입니다.`);
console.log(`객체 리터럴 - 9는 ${getDayNameObjectLiteral(9)}입니다.`);

// 7. Map 객체 대안 (ES6+)
// 객체 리터럴보다 더 유연한 방법
function getFruitColorMap(fruit) {
    const fruitColors = new Map([
        ['apple', '빨간색 또는 초록색'],
        ['사과', '빨간색 또는 초록색'],
        ['banana', '노란색'],
        ['바나나', '노란색'],
        ['grape', '보라색'],
        ['포도', '보라색']
    ]);
    
    return fruitColors.get(fruit.toLowerCase()) || '알 수 없음';
}

console.log(`Map - 포도의 색상: ${getFruitColorMap('포도')}`);
console.log(`Map - APPLE의 색상: ${getFruitColorMap('APPLE')}`);

// 8. 함수 맵 - 더 복잡한 동작이 필요한 경우
function executeCommand(command, ...args) {
    const actions = {
        add: (a, b) => a + b,
        subtract: (a, b) => a - b,
        multiply: (a, b) => a * b,
        divide: (a, b) => b !== 0 ? a / b : '0으로 나눌 수 없습니다',
        default: () => '알 수 없는 명령어'
    };
    
    const action = actions[command] || actions.default;
    return action(...args);
}

console.log(`add 실행: ${executeCommand('add', 5, 3)}`);
console.log(`subtract 실행: ${executeCommand('subtract', 10, 4)}`);
console.log(`divide 실행: ${executeCommand('divide', 8, 0)}`);
console.log(`unknown 실행: ${executeCommand('unknown')}`);

/**
 * switch 문 사용 시 주의사항:
 * 
 * 1. break 문: 각 case 끝에 break 문을 빼먹지 않도록 주의하세요(의도적인 폴스루가 아니라면).
 * 2. default 절: 예상치 못한 값에 대한 처리를 위해 default 절을 포함하는 것이 좋습니다.
 * 3. 엄격한 비교: switch 문은 값 비교 시 엄격한 비교(===)를 사용합니다.
 * 4. 복잡한 switch: 너무 복잡한 switch 문은 객체 리터럴이나 Map으로 대체하는 것이 가독성에 좋습니다.
 * 5. 함수형 접근: 복잡한 로직이 필요한 경우 함수 맵을 고려하세요.
 */ 