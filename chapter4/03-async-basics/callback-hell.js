// callback-hell.js - 콜백 중첩(콜백 지옥) 문제

/**
 * 콜백 지옥(Callback Hell)
 * 
 * 콜백 지옥은 콜백 함수가 중첩되어 코드의 가독성과 유지보수성이 저하되는 현상을 말합니다.
 * 여러 비동기 작업을 순차적으로 실행해야 할 때 많이 발생합니다.
 * 이 파일에서는 콜백 지옥이 발생하는 상황과 이를 개선하는 방법을 알아봅니다.
 */

console.log('==== 콜백 지옥(Callback Hell) ====');

// 가상의 비동기 작업을 시뮬레이션하는 함수들

// 사용자 정보 조회
function fetchUserData(userId, callback) {
    console.log(`사용자 ID ${userId} 정보 조회 중...`);
    
    setTimeout(() => {
        console.log(`사용자 정보 조회 완료`);
        // 성공 시 사용자 데이터와 함께 콜백 호출
        callback(null, {
            id: userId,
            name: '홍길동',
            email: 'hong@example.com'
        });
    }, 1000);
}

// 사용자의 권한 조회
function fetchUserPermissions(userId, callback) {
    console.log(`사용자 ID ${userId}의 권한 조회 중...`);
    
    setTimeout(() => {
        console.log(`권한 정보 조회 완료`);
        // 성공 시 권한 데이터와 함께 콜백 호출
        callback(null, ['read', 'write', 'delete']);
    }, 1000);
}

// 사용자의 활동 내역 조회
function fetchUserActivity(userId, callback) {
    console.log(`사용자 ID ${userId}의 활동 내역 조회 중...`);
    
    setTimeout(() => {
        console.log(`활동 내역 조회 완료`);
        // 성공 시 활동 내역과 함께 콜백 호출
        callback(null, [
            { type: 'login', date: '2023-05-01' },
            { type: 'purchase', date: '2023-05-03' },
            { type: 'comment', date: '2023-05-07' }
        ]);
    }, 1000);
}

// 활동 내역 기반으로 추천 항목 조회
function fetchRecommendations(activities, callback) {
    console.log(`${activities.length}개의 활동 내역 기반으로 추천 항목 조회 중...`);
    
    setTimeout(() => {
        console.log(`추천 항목 조회 완료`);
        // 성공 시 추천 항목과 함께 콜백 호출
        callback(null, [
            { id: 'rec1', name: '추천 상품 1' },
            { id: 'rec2', name: '추천 상품 2' }
        ]);
    }, 1000);
}

// 추천 항목의 상세 정보 조회
function fetchItemDetails(itemId, callback) {
    console.log(`항목 ID ${itemId}의 상세 정보 조회 중...`);
    
    setTimeout(() => {
        console.log(`항목 상세 정보 조회 완료`);
        // 성공 시 상세 정보와 함께 콜백 호출
        callback(null, {
            id: itemId,
            name: '추천 상품 1',
            price: 50000,
            description: '이 상품은 매우 인기 있는 제품입니다.'
        });
    }, 1000);
}

// 1. 콜백 지옥 예제
console.log('\n--- 콜백 지옥 예제 ---');

// 사용자 정보 -> 권한 -> 활동 내역 -> 추천 항목 -> 상세 정보
function getUserRecommendationDetailsBad(userId) {
    console.log(`사용자 ID ${userId}의 추천 상품 상세 정보 조회 시작`);
    
    fetchUserData(userId, (error, user) => {
        if (error) {
            console.error('사용자 정보 조회 실패:', error);
            return;
        }
        
        console.log(`사용자 이름: ${user.name}`);
        
        fetchUserPermissions(user.id, (error, permissions) => {
            if (error) {
                console.error('권한 정보 조회 실패:', error);
                return;
            }
            
            console.log(`사용자 권한: ${permissions.join(', ')}`);
            
            // 필요한 권한이 있는지 확인
            if (!permissions.includes('read')) {
                console.error('읽기 권한이 없습니다.');
                return;
            }
            
            fetchUserActivity(user.id, (error, activities) => {
                if (error) {
                    console.error('활동 내역 조회 실패:', error);
                    return;
                }
                
                console.log(`최근 활동: ${activities.length}개`);
                
                fetchRecommendations(activities, (error, recommendations) => {
                    if (error) {
                        console.error('추천 항목 조회 실패:', error);
                        return;
                    }
                    
                    console.log(`추천 항목: ${recommendations.length}개`);
                    
                    if (recommendations.length === 0) {
                        console.log('추천 항목이 없습니다.');
                        return;
                    }
                    
                    // 첫 번째 추천 항목의 상세 정보 조회
                    fetchItemDetails(recommendations[0].id, (error, details) => {
                        if (error) {
                            console.error('항목 상세 정보 조회 실패:', error);
                            return;
                        }
                        
                        console.log('\n추천 항목 상세 정보:');
                        console.log(`- 이름: ${details.name}`);
                        console.log(`- 가격: ${details.price.toLocaleString()}원`);
                        console.log(`- 설명: ${details.description}`);
                        
                        console.log('\n모든 정보 조회 완료! (많은 들여쓰기가 필요했습니다.)');
                    });
                });
            });
        });
    });
}

// 콜백 지옥 함수 실행
getUserRecommendationDetailsBad(123);

// 2. 콜백 지옥 개선 - 함수 분리
console.log('\n--- 콜백 지옥 개선: 함수 분리 ---');

// 각 단계를 별도의 함수로 분리
function getUserRecommendationDetailsBetter(userId) {
    console.log(`\n사용자 ID ${userId}의 추천 상품 상세 정보 조회 시작 (개선 버전)`);
    
    // 사용자 정보 조회 후 권한 조회 함수 호출
    fetchUserData(userId, handleUserData);
}

// 각 단계를 처리하는 함수들을 별도로 정의
function handleUserData(error, user) {
    if (error) {
        console.error('사용자 정보 조회 실패:', error);
        return;
    }
    
    console.log(`사용자 이름: ${user.name}`);
    fetchUserPermissions(user.id, (error, permissions) => handlePermissions(error, permissions, user));
}

function handlePermissions(error, permissions, user) {
    if (error) {
        console.error('권한 정보 조회 실패:', error);
        return;
    }
    
    console.log(`사용자 권한: ${permissions.join(', ')}`);
    
    if (!permissions.includes('read')) {
        console.error('읽기 권한이 없습니다.');
        return;
    }
    
    fetchUserActivity(user.id, (error, activities) => handleActivities(error, activities));
}

function handleActivities(error, activities) {
    if (error) {
        console.error('활동 내역 조회 실패:', error);
        return;
    }
    
    console.log(`최근 활동: ${activities.length}개`);
    fetchRecommendations(activities, handleRecommendations);
}

function handleRecommendations(error, recommendations) {
    if (error) {
        console.error('추천 항목 조회 실패:', error);
        return;
    }
    
    console.log(`추천 항목: ${recommendations.length}개`);
    
    if (recommendations.length === 0) {
        console.log('추천 항목이 없습니다.');
        return;
    }
    
    fetchItemDetails(recommendations[0].id, handleItemDetails);
}

function handleItemDetails(error, details) {
    if (error) {
        console.error('항목 상세 정보 조회 실패:', error);
        return;
    }
    
    console.log('\n추천 항목 상세 정보:');
    console.log(`- 이름: ${details.name}`);
    console.log(`- 가격: ${details.price.toLocaleString()}원`);
    console.log(`- 설명: ${details.description}`);
    
    console.log('\n모든 정보 조회 완료! (함수 분리로 들여쓰기 문제 해결)');
}

// 개선된 함수는 10초 후에 실행 (앞의 예제가 완료된 후)
setTimeout(() => {
    getUserRecommendationDetailsBetter(456);
}, 10000);

// 3. 콜백 지옥의 다른 문제점과 해결책
console.log('\n--- 콜백 지옥의 다른 문제점 ---');

console.log(`
콜백 지옥의 문제점:
1. 코드 가독성 저하: 들여쓰기가 깊어지면서 코드 이해가 어려워짐
2. 에러 처리 중복: 각 콜백마다 에러 처리 코드 반복
3. 변수 스코프 문제: 외부 변수 접근을 위한 클로저 사용으로 복잡성 증가
4. 실행 흐름 파악 어려움: 코드 실행 순서가 직관적이지 않음
5. 예외 처리의 어려움: try-catch로 비동기 콜백의 예외를 잡을 수 없음

해결책:
1. 함수 분리: 각 콜백을 별도 함수로 분리
2. 모듈화: 관련 기능을 모듈로 분리하여 재사용성 높이기
3. Promise 사용: 콜백 대신 Promise 체이닝으로 가독성 향상
4. async/await 사용: 비동기 코드를 동기 코드처럼 작성하여 가독성 극대화
`);

// 4. Promise를 사용한 개선 (참고)
console.log('\n--- Promise를 사용한 개선 (참고) ---');

console.log(`
// Promise를 사용한 개선된 코드 예시 (chapter4/04-promises에서 자세히 다룹니다)

function fetchUserDataPromise(userId) {
  return new Promise((resolve, reject) => {
    fetchUserData(userId, (error, data) => {
      if (error) reject(error);
      else resolve(data);
    });
  });
}

// Promise 체이닝을 통한 개선된 코드
fetchUserDataPromise(userId)
  .then(user => {
    console.log(\`사용자 이름: \${user.name}\`);
    return fetchUserPermissionsPromise(user.id);
  })
  .then(permissions => {
    console.log(\`사용자 권한: \${permissions.join(', ')}\`);
    // ...나머지 코드
  })
  .catch(error => {
    console.error('에러 발생:', error);
  });
`);

// 5. async/await를 사용한 개선 (참고)
console.log('\n--- async/await를 사용한 개선 (참고) ---');

console.log(`
// async/await를 사용한 개선된 코드 예시 (chapter4/05-async-await에서 자세히 다룹니다)

async function getUserRecommendationDetails(userId) {
  try {
    const user = await fetchUserDataPromise(userId);
    console.log(\`사용자 이름: \${user.name}\`);
    
    const permissions = await fetchUserPermissionsPromise(user.id);
    console.log(\`사용자 권한: \${permissions.join(', ')}\`);
    
    if (!permissions.includes('read')) {
      throw new Error('읽기 권한이 없습니다.');
    }
    
    const activities = await fetchUserActivityPromise(user.id);
    console.log(\`최근 활동: \${activities.length}개\`);
    
    const recommendations = await fetchRecommendationsPromise(activities);
    console.log(\`추천 항목: \${recommendations.length}개\`);
    
    if (recommendations.length === 0) {
      console.log('추천 항목이 없습니다.');
      return;
    }
    
    const details = await fetchItemDetailsPromise(recommendations[0].id);
    console.log('추천 항목 상세 정보:', details);
    
  } catch (error) {
    console.error('처리 중 오류 발생:', error);
  }
}
`);

/**
 * 콜백 지옥(Callback Hell) 요약:
 * 
 * 1. 콜백 지옥은 중첩된 콜백 함수로 인해 코드의 가독성과 유지보수성이 저하되는 문제
 * 2. 주로 비동기 작업을 순차적으로 처리해야 할 때 발생
 * 3. 개선 방법:
 *    - 함수 분리: 각 콜백을 별도 함수로 분리
 *    - Promise: 콜백 대신 Promise 체이닝 사용
 *    - async/await: 비동기 코드를 동기 코드처럼 작성
 * 4. 현대 JavaScript에서는 Promise와 async/await를 사용하여 콜백 지옥 문제를 해결
 */ 