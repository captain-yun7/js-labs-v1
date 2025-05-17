// utils.js - 유틸리티 함수 모듈

// 기본 내보내기 (default export)
// 한 모듈당 하나만 가능
export default class Formatter {
  static formatNumber(num, decimals = 2) {
    return Number(num).toFixed(decimals);
  }
  
  static formatCurrency(amount, currency = 'KRW') {
    return `${currency} ${Number(amount).toLocaleString()}`;
  }
  
  static formatDate(date = new Date()) {
    return date.toISOString().split('T')[0];
  }
}

// 일반 내보내기도 함께 사용 가능
export function capitalize(str) {
  if (typeof str !== 'string' || !str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function truncate(str, length = 20) {
  if (typeof str !== 'string') return '';
  return str.length > length ? str.slice(0, length) + '...' : str;
}

export const generateRandomId = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

// 유틸리티 객체
export const StringUtils = {
  reverse(str) {
    return str.split('').reverse().join('');
  },
  
  countWords(str) {
    return str.trim().split(/\s+/).length;
  },
  
  removeSpaces(str) {
    return str.replace(/\s/g, '');
  }
}; 