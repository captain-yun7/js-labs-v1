/**
 * IIFE를 사용한 모듈 패턴 (ES 모듈 이전 방식)
 * 
 * 즉시 실행 함수 표현식(Immediately Invoked Function Expression)을 
 * 사용하여 모듈처럼 동작하는 패턴입니다.
 */

// 카운터 모듈 - 기본적인 IIFE 모듈 패턴
var counterModule = (function() {
  // 비공개 변수
  var count = 0;
  
  // 공개 API 반환
  return {
    // 카운터 증가 메서드
    increment: function() {
      count++;
      return count;
    },
    
    // 카운터 감소 메서드
    decrement: function() {
      count--;
      return count;
    },
    
    // 현재 카운트 값 조회 메서드
    getCount: function() {
      return count;
    },
    
    // 카운트 리셋 메서드
    reset: function() {
      count = 0;
      return count;
    }
  };
})();

// 사용 예시
console.log('초기 카운트:', counterModule.getCount()); // 0
console.log('증가 후:', counterModule.increment());    // 1
console.log('증가 후:', counterModule.increment());    // 2
console.log('감소 후:', counterModule.decrement());    // 1
console.log('리셋 후:', counterModule.reset());        // 0

// 비공개 변수에 직접 접근 시도 (불가능)
// console.log(counterModule.count); // undefined

// 매개변수를 받는 IIFE 모듈 패턴
var calculatorModule = (function(initialValue) {
  // 비공개 변수
  var result = initialValue || 0;
  
  // 비공개 함수
  function validateNumber(value) {
    return typeof value === 'number' && !isNaN(value);
  }
  
  // 공개 API 반환
  return {
    // 덧셈 메서드
    add: function(value) {
      if (validateNumber(value)) {
        result += value;
      }
      return this; // 메서드 체이닝 지원
    },
    
    // 뺄셈 메서드
    subtract: function(value) {
      if (validateNumber(value)) {
        result -= value;
      }
      return this; // 메서드 체이닝 지원
    },
    
    // 곱셈 메서드
    multiply: function(value) {
      if (validateNumber(value)) {
        result *= value;
      }
      return this; // 메서드 체이닝 지원
    },
    
    // 나눗셈 메서드
    divide: function(value) {
      if (validateNumber(value) && value !== 0) {
        result /= value;
      }
      return this; // 메서드 체이닝 지원
    },
    
    // 결과 조회 메서드
    getResult: function() {
      return result;
    },
    
    // 결과 초기화 메서드
    clear: function() {
      result = 0;
      return this;
    }
  };
})(10); // 초기값 10으로 시작

// 사용 예시
console.log('\n계산기 초기값:', calculatorModule.getResult()); // 10

// 메서드 체이닝
calculatorModule.add(5).multiply(2).subtract(8).divide(3);
console.log('계산 결과:', calculatorModule.getResult()); // (10 + 5) * 2 - 8 / 3 ≈ 7.33

calculatorModule.clear();
console.log('초기화 후:', calculatorModule.getResult()); // 0

// 의존성 주입을 사용한 IIFE 모듈 패턴
var formatterModule = (function($, _) {
  // $ = jQuery, _ = Underscore.js (가정)
  
  // 공개 API 반환
  return {
    // 통화 형식 지정 함수
    formatCurrency: function(value) {
      if (typeof value !== 'number') return 'Invalid input';
      
      // 원래는 jQuery와 Underscore 라이브러리를 사용하지만,
      // 이 예제에서는 간단히 구현
      return '₩' + value.toLocaleString('ko-KR');
    },
    
    // 날짜 형식 지정 함수
    formatDate: function(date) {
      if (!(date instanceof Date)) return 'Invalid date';
      
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      
      return `${year}-${month}-${day}`;
    },
    
    // 문자열 처리 함수
    truncate: function(str, length) {
      if (typeof str !== 'string') return '';
      
      return str.length > length 
        ? str.substring(0, length) + '...'
        : str;
    }
  };
})(window.jQuery, window._); // 의존성 주입 (여기서는 실제로 사용하지 않음)

// 사용 예시
console.log('\n통화 형식:', formatterModule.formatCurrency(1234567));
console.log('날짜 형식:', formatterModule.formatDate(new Date()));
console.log('문자열 자르기:', formatterModule.truncate('안녕하세요, 반갑습니다!', 7));

// 네임스페이스 패턴과 모듈 패턴 결합
var APP = APP || {};

// 네임스페이스 내에 사용자 관리 모듈 추가
APP.userModule = (function() {
  // 비공개 변수
  var users = [];
  var nextId = 1;
  
  // 비공개 함수
  function findUserById(id) {
    return users.find(user => user.id === id);
  }
  
  // 공개 API 반환
  return {
    // 사용자 추가
    addUser: function(name, email) {
      const newUser = {
        id: nextId++,
        name: name,
        email: email,
        createdAt: new Date()
      };
      
      users.push(newUser);
      return newUser.id;
    },
    
    // 사용자 정보 조회
    getUser: function(id) {
      const user = findUserById(id);
      
      if (!user) return null;
      
      // 객체 복사본 반환 (원본 보호)
      return { ...user };
    },
    
    // 사용자 정보 업데이트
    updateUser: function(id, updateData) {
      const user = findUserById(id);
      
      if (!user) return false;
      
      // 허용된 필드만 업데이트
      if (updateData.name) user.name = updateData.name;
      if (updateData.email) user.email = updateData.email;
      
      return true;
    },
    
    // 사용자 삭제
    deleteUser: function(id) {
      const initialLength = users.length;
      users = users.filter(user => user.id !== id);
      
      return users.length !== initialLength;
    },
    
    // 모든 사용자 조회
    getAllUsers: function() {
      // 복사본 반환 (원본 보호)
      return users.map(user => ({ ...user }));
    }
  };
})();

// 사용 예시
console.log('\n사용자 관리 모듈 테스트:');
const userId1 = APP.userModule.addUser('홍길동', 'hong@example.com');
const userId2 = APP.userModule.addUser('김철수', 'kim@example.com');

console.log('사용자 추가 후 목록:', APP.userModule.getAllUsers());

APP.userModule.updateUser(userId1, { name: '홍길순' });
console.log('사용자 업데이트 후:', APP.userModule.getUser(userId1));

APP.userModule.deleteUser(userId2);
console.log('사용자 삭제 후 목록:', APP.userModule.getAllUsers()); 