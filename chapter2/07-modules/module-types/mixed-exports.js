/**
 * 혼합 내보내기 예제 (Mixed Exports)
 * 
 * 모듈은 하나의 기본 내보내기와 여러 이름 붙은 내보내기를 
 * 함께 사용할 수 있습니다.
 */

// 이름 붙은 내보내기
export const VERSION = '1.0.0';

export function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatTime(date) {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

// 기본 내보내기 - DateTime 클래스
export default class DateTime {
  constructor(date = new Date()) {
    this.date = new Date(date);
  }
  
  getDate() {
    return formatDate(this.date);
  }
  
  getTime() {
    return formatTime(this.date);
  }
  
  getDateTime() {
    return `${this.getDate()} ${this.getTime()}`;
  }
  
  addDays(days) {
    const newDate = new Date(this.date);
    newDate.setDate(newDate.getDate() + days);
    return new DateTime(newDate);
  }
  
  static now() {
    return new DateTime();
  }
  
  static fromString(dateString) {
    return new DateTime(new Date(dateString));
  }
  
  // 내부에서 이름 붙은 내보내기 함수 사용
  format(pattern) {
    const tokens = {
      'YYYY': this.date.getFullYear(),
      'MM': String(this.date.getMonth() + 1).padStart(2, '0'),
      'DD': String(this.date.getDate()).padStart(2, '0'),
      'HH': String(this.date.getHours()).padStart(2, '0'),
      'mm': String(this.date.getMinutes()).padStart(2, '0'),
      'ss': String(this.date.getSeconds()).padStart(2, '0')
    };
    
    return pattern.replace(/YYYY|MM|DD|HH|mm|ss/g, match => tokens[match]);
  }
}

// 추가 이름 붙은 내보내기
export const dateUtils = {
  isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  },
  
  getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
  },
  
  getDayName(date) {
    const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    return days[date.getDay()];
  }
}; 