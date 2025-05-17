// logical-operators.js - 논리 연산자

/**
 * 논리 연산자 (Logical Operators)
 * 
 * 논리 연산자는 불리언(boolean) 값(true/false)에 대한 연산을 수행합니다.
 * 주로 조건문에서 여러 조건을 결합하는 데 사용됩니다.
 */

console.log('==== 논리 연산자 예제 ====');

// 1. 논리 AND 연산자 (&&)
// 두 피연산자가 모두 true일 때만 true를 반환합니다.
console.log('true && true:', true && true);      // true
console.log('true && false:', true && false);    // false
console.log('false && true:', false && true);    // false
console.log('false && false:', false && false);  // false

// 실제 값을 사용한 예시
let x = 5;
let y = 10;
console.log('(x > 0) && (y < 20):', (x > 0) && (y < 20));  // true
console.log('(x > 10) && (y < 20):', (x > 10) && (y < 20));  // false

// 2. 논리 OR 연산자 (||)
// 두 피연산자 중 하나라도 true이면 true를 반환합니다.
console.log('true || true:', true || true);      // true
console.log('true || false:', true || false);    // true
console.log('false || true:', false || true);    // true
console.log('false || false:', false || false);  // false

// 실제 값을 사용한 예시
console.log('(x > 10) || (y < 20):', (x > 10) || (y < 20));  // true
console.log('(x > 10) || (y > 20):', (x > 10) || (y > 20));  // false

// 3. 논리 NOT 연산자 (!)
// 피연산자의 불리언 값을 반전시킵니다.
console.log('!true:', !true);    // false
console.log('!false:', !false);  // true

// 실제 값을 사용한 예시
console.log('!(x > 10):', !(x > 10));  // true (x > 10은 false, 그 반대는 true)
console.log('!!(x > 0):', !!(x > 0));  // true (이중 부정은 불리언으로 변환하는 방법)

// 4. 단락 평가 (Short-circuit Evaluation)
// 논리 연산자는 결과가 확정되면 나머지 표현식을 평가하지 않습니다.

// && 연산자의 단락 평가
console.log('false && anyExpression:', false && console.log('이 메시지는 출력되지 않음'));  // false
// 첫 번째 피연산자가 false이므로 두 번째 피연산자는 평가되지 않습니다.

// || 연산자의 단락 평가
console.log('true || anyExpression:', true || console.log('이 메시지는 출력되지 않음'));  // true
// 첫 번째 피연산자가 true이므로 두 번째 피연산자는 평가되지 않습니다.

// 5. 논리 연산자 활용

// 5.1. 기본값 설정 (|| 연산자 활용)
let username = '';
let defaultName = 'Guest';
let displayName = username || defaultName;
console.log('displayName:', displayName);  // 'Guest' (username이 빈 문자열로 falsy이므로 defaultName 사용)

// 5.2. 조건부 실행 (&& 연산자 활용)
let isLoggedIn = true;
isLoggedIn && console.log('사용자가 로그인했습니다.');  // 사용자가 로그인했습니다. (isLoggedIn이 true이므로 로그 출력)

// 5.3. null 또는 undefined 체크
let user = null;
let userName = user && user.name;
console.log('userName:', userName);  // null (user가 null이므로 user.name은 평가되지 않음)

// 6. 불리언이 아닌 값의 논리 연산

// 6.1. Truthy와 Falsy 값
// JavaScript에서는 불리언이 아닌 값도 논리 연산에서 true 또는 false로 강제 변환됩니다.

// Falsy 값들 (false로 평가됨)
console.log('Boolean(false):', Boolean(false));        // false
console.log('Boolean(0):', Boolean(0));                // false
console.log('Boolean(""):', Boolean(""));              // false
console.log('Boolean(null):', Boolean(null));          // false
console.log('Boolean(undefined):', Boolean(undefined));// false
console.log('Boolean(NaN):', Boolean(NaN));            // false

// Truthy 값들 (true로 평가됨)
console.log('Boolean(true):', Boolean(true));          // true
console.log('Boolean(1):', Boolean(1));                // true
console.log('Boolean("hello"):', Boolean("hello"));    // true
console.log('Boolean([]):', Boolean([]));              // true
console.log('Boolean({}):', Boolean({}));              // true
console.log('Boolean(function(){}):', Boolean(function(){})); // true

// 6.2. 불리언이 아닌 값의 AND 연산 (&&)
// 첫 번째 피연산자가 falsy이면 그 값을 반환하고, truthy이면 두 번째 피연산자를 반환합니다.
console.log('0 && "hello":', 0 && "hello");          // 0 (0은 falsy이므로 첫 번째 피연산자 반환)
console.log('"hello" && "world":', "hello" && "world");  // "world" (두 값 모두 truthy이므로 두 번째 피연산자 반환)
console.log('[] && {}:', [] && {});                  // {} (빈 배열은 truthy이므로 두 번째 피연산자 반환)

// 6.3. 불리언이 아닌 값의 OR 연산 (||)
// 첫 번째 피연산자가 truthy이면 그 값을 반환하고, falsy이면 두 번째 피연산자를 반환합니다.
console.log('"hello" || "world":', "hello" || "world");  // "hello" (첫 번째 피연산자가 truthy이므로 반환)
console.log('0 || "hello":', 0 || "hello");          // "hello" (0은 falsy이므로 두 번째 피연산자 반환)
console.log('null || "":', null || "");              // "" (두 값 모두 falsy이지만 두 번째 피연산자 반환)
console.log('null || "" || "default":', null || "" || "default");  // "default" (앞의 두 값이 falsy)

// 7. 널 병합 연산자 (??) - ES2020에서 추가
// 왼쪽 피연산자가 null 또는 undefined일 때만 오른쪽 피연산자를 반환합니다.
let nullValue = null;
let undefinedValue = undefined;
let emptyString = '';
let zero = 0;

console.log('nullValue ?? "default":', nullValue ?? "default");  // "default"
console.log('undefinedValue ?? "default":', undefinedValue ?? "default");  // "default"
console.log('emptyString ?? "default":', emptyString ?? "default");  // "" (빈 문자열은 null/undefined가 아님)
console.log('zero ?? 42:', zero ?? 42);  // 0 (0은 null/undefined가 아님)

// || 연산자와의 차이점 비교
console.log('nullValue || "default":', nullValue || "default");  // "default"
console.log('undefinedValue || "default":', undefinedValue || "default");  // "default"
console.log('emptyString || "default":', emptyString || "default");  // "default" (빈 문자열은 falsy)
console.log('zero || 42:', zero || 42);  // 42 (0은 falsy)

/**
 * 논리 연산자 사용 시 주의사항
 * 
 * 1. 단락 평가(short-circuit evaluation)의 동작 방식을 이해하는 것이 중요합니다.
 *    이를 활용하면 코드를 더 간결하게 작성할 수 있습니다.
 * 
 * 2. 불리언이 아닌 값에 대한 논리 연산자의 동작 방식을 이해해야 합니다.
 *    특히 truthy와 falsy 값의 개념을 명확히 알아야 합니다.
 * 
 * 3. 기본값 설정 시 || 연산자와 ?? 연산자의 차이점을 이해하고, 
 *    상황에 맞게 선택해야 합니다.
 * 
 * 4. 복잡한 논리 표현식은 괄호를 사용하여 평가 순서를 명확히 하는 것이 좋습니다.
 */ 