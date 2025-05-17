// arrays-objects-practice.js - 배열과 객체 실습 문제

/**
 * 배열과 객체 실습 문제
 * 
 * 이 파일에는 배열과 객체 관련 개념을 종합적으로 활용하는 실습 문제가 포함되어 있습니다.
 * 주석으로 표시된 각 문제를 해결하고 결과를 확인해보세요.
 */

console.log('==== 배열과 객체 실습 문제 ====');

// 문제 1: 학생 데이터 관리
console.log('\n--- 문제 1: 학생 데이터 관리 ---');

// 학생 데이터 배열
const students = [
    { id: 1, name: '김철수', scores: { math: 85, english: 92, science: 78 } },
    { id: 2, name: '이영희', scores: { math: 90, english: 88, science: 95 } },
    { id: 3, name: '박민수', scores: { math: 76, english: 82, science: 89 } },
    { id: 4, name: '정지연', scores: { math: 88, english: 95, science: 90 } },
    { id: 5, name: '최현우', scores: { math: 95, english: 89, science: 82 } }
];

/*
문제 1.1: 각 학생의 평균 점수를 계산하여 'average' 속성을 추가하세요.
예상 결과: 각 학생 객체에 average 속성이 추가됨 (예: { id: 1, name: '김철수', scores: {...}, average: 85.0 })
*/
console.log('\n문제 1.1 해결:');

// 여기에 코드를 작성하세요
students.forEach(student => {
    const scores = student.scores;
    const sum = scores.math + scores.english + scores.science;
    student.average = (sum / 3).toFixed(1); // 소수점 한 자리까지 표시
});

// 결과 확인
console.log(students[0]); // 김철수의 정보 (average 속성 포함)

/*
문제 1.2: 평균 점수가 90점 이상인 학생들의 이름만 추출하여 배열로 반환하세요.
예상 결과: ['이영희', '정지연', '최현우'] (평균 점수 기준)
*/
console.log('\n문제 1.2 해결:');

// 여기에 코드를 작성하세요
const highScorers = students
    .filter(student => parseFloat(student.average) >= 90)
    .map(student => student.name);

// 결과 확인
console.log('평균 90점 이상 학생:', highScorers);

/*
문제 1.3: 각 과목별 최고 점수를 받은 학생의 이름을 찾으세요.
예상 결과: { math: '최현우', english: '정지연', science: '이영희' }
*/
console.log('\n문제 1.3 해결:');

// 여기에 코드를 작성하세요
const topStudentsBySubject = {
    math: '',
    english: '',
    science: ''
};

// 각 과목별로 최고 점수와 학생 찾기
let maxMath = 0, maxEnglish = 0, maxScience = 0;

students.forEach(student => {
    if (student.scores.math > maxMath) {
        maxMath = student.scores.math;
        topStudentsBySubject.math = student.name;
    }
    if (student.scores.english > maxEnglish) {
        maxEnglish = student.scores.english;
        topStudentsBySubject.english = student.name;
    }
    if (student.scores.science > maxScience) {
        maxScience = student.scores.science;
        topStudentsBySubject.science = student.name;
    }
});

// 결과 확인
console.log('과목별 최고 점수 학생:', topStudentsBySubject);

// 문제 2: 쇼핑몰 상품 관리
console.log('\n--- 문제 2: 쇼핑몰 상품 관리 ---');

// 상품 데이터 배열
const products = [
    { id: 101, name: '노트북', price: 1200000, category: '전자제품', stock: 5 },
    { id: 102, name: '스마트폰', price: 950000, category: '전자제품', stock: 10 },
    { id: 103, name: '운동화', price: 87000, category: '의류', stock: 25 },
    { id: 104, name: '바지', price: 35000, category: '의류', stock: 0 },
    { id: 105, name: '티셔츠', price: 28000, category: '의류', stock: 15 },
    { id: 106, name: '모니터', price: 450000, category: '전자제품', stock: 3 }
];

/*
문제 2.1: 카테고리별 상품 수와 평균 가격을 계산하세요.
예상 결과: { '전자제품': { count: 3, averagePrice: 866666.67 }, '의류': { count: 3, averagePrice: 50000 } }
*/
console.log('\n문제 2.1 해결:');

// 여기에 코드를 작성하세요
const categoryStats = products.reduce((stats, product) => {
    const { category, price } = product;
    
    // 카테고리가 없으면 초기화
    if (!stats[category]) {
        stats[category] = { count: 0, totalPrice: 0, averagePrice: 0 };
    }
    
    // 카테고리 정보 업데이트
    stats[category].count++;
    stats[category].totalPrice += price;
    stats[category].averagePrice = stats[category].totalPrice / stats[category].count;
    
    return stats;
}, {});

// 결과 확인
console.log('카테고리별 통계:', categoryStats);

/*
문제 2.2: 재고가 있는 상품만 필터링하고, 가격이 높은 순으로 정렬한 후, 
상품명과 가격만 포함하는 새 배열을 생성하세요.
예상 결과: [
  { name: '노트북', price: 1200000 },
  { name: '스마트폰', price: 950000 },
  ...
]
*/
console.log('\n문제 2.2 해결:');

// 여기에 코드를 작성하세요
const inStockSorted = products
    .filter(product => product.stock > 0) // 재고가 있는 상품만 필터링
    .sort((a, b) => b.price - a.price) // 가격 내림차순 정렬
    .map(({ name, price }) => ({ name, price })); // 이름과 가격만 포함하는 새 객체 배열 생성

// 결과 확인
console.log('재고 있는 상품 (가격 내림차순):', inStockSorted);

/*
문제 2.3: 각 상품에 10% 할인가를 계산하여 'discountPrice' 속성을 추가하고,
전체 상품의 할인 적용 전과 후의 총 가치를 계산하세요.
*/
console.log('\n문제 2.3 해결:');

// 여기에 코드를 작성하세요
let totalValueBefore = 0;
let totalValueAfter = 0;

products.forEach(product => {
    // 상품별 재고 가치 계산
    const totalProductValue = product.price * product.stock;
    totalValueBefore += totalProductValue;
    
    // 할인가 계산 및 속성 추가
    product.discountPrice = Math.round(product.price * 0.9); // 10% 할인, 반올림
    
    // 할인 후 재고 가치 계산
    const discountedProductValue = product.discountPrice * product.stock;
    totalValueAfter += discountedProductValue;
});

// 결과 확인
console.log('첫 번째 상품 할인 정보:', products[0]);
console.log('할인 전 총 재고 가치:', totalValueBefore);
console.log('할인 후 총 재고 가치:', totalValueAfter);
console.log('할인으로 인한 차액:', totalValueBefore - totalValueAfter);

// 문제 3: 도서관 책 관리 시스템
console.log('\n--- 문제 3: 도서관 책 관리 시스템 ---');

const books = [
    { 
        id: 1, 
        title: '자바스크립트 완벽 가이드', 
        author: '데이비드 플래너건',
        genres: ['프로그래밍', '컴퓨터 과학'],
        rating: 4.5,
        isAvailable: true
    },
    { 
        id: 2, 
        title: '해리 포터와 마법사의 돌', 
        author: 'J.K. 롤링',
        genres: ['판타지', '모험'],
        rating: 4.7,
        isAvailable: false
    },
    { 
        id: 3, 
        title: '데이터 과학을 위한 Python', 
        author: '제이크 반더플라스',
        genres: ['프로그래밍', '데이터 과학', '컴퓨터 과학'],
        rating: 4.2,
        isAvailable: true
    },
    { 
        id: 4, 
        title: '반지의 제왕', 
        author: 'J.R.R. 톨킨',
        genres: ['판타지', '모험', '클래식'],
        rating: 4.8,
        isAvailable: true
    },
    { 
        id: 5, 
        title: '클린 코드', 
        author: '로버트 C. 마틴',
        genres: ['프로그래밍', '소프트웨어 개발'],
        rating: 4.6,
        isAvailable: false
    }
];

/*
문제 3.1: 모든 책의 제목과 저자 정보를 "제목 - 저자" 형식의 문자열 배열로 변환하세요.
예상 결과: ['자바스크립트 완벽 가이드 - 데이비드 플래너건', ...]
*/
console.log('\n문제 3.1 해결:');

// 여기에 코드를 작성하세요
const bookInfos = books.map(book => `${book.title} - ${book.author}`);

// 결과 확인
console.log('책 정보 목록:', bookInfos);

/*
문제 3.2: 특정 장르의 책만 필터링하는 함수를 작성하세요.
함수는 장르를 매개변수로 받아 해당 장르를 포함하는 책 객체들의 배열을 반환해야 합니다.
*/
console.log('\n문제 3.2 해결:');

// 여기에 코드를 작성하세요
function filterBooksByGenre(books, genre) {
    return books.filter(book => book.genres.includes(genre));
}

// 결과 확인 - 프로그래밍 장르 책 필터링
const programmingBooks = filterBooksByGenre(books, '프로그래밍');
console.log('프로그래밍 장르 책:', programmingBooks);

/*
문제 3.3: 대출 가능한 책과 대출 중인 책의 목록을 분리하고, 
각 목록에서 가장 평점이 높은 책을 찾으세요.
*/
console.log('\n문제 3.3 해결:');

// 여기에 코드를 작성하세요
// 대출 가능/불가능 책 분리
const availableBooks = books.filter(book => book.isAvailable);
const unavailableBooks = books.filter(book => !book.isAvailable);

// 각 목록에서 가장 평점 높은 책 찾기
const findHighestRatedBook = bookList => {
    if (bookList.length === 0) return null;
    
    return bookList.reduce((highest, current) => {
        return current.rating > highest.rating ? current : highest;
    }, bookList[0]);
};

const highestRatedAvailable = findHighestRatedBook(availableBooks);
const highestRatedUnavailable = findHighestRatedBook(unavailableBooks);

// 결과 확인
console.log('대출 가능한 책 수:', availableBooks.length);
console.log('대출 중인 책 수:', unavailableBooks.length);
console.log('대출 가능한 책 중 최고 평점:', highestRatedAvailable?.title, `(${highestRatedAvailable?.rating}점)`);
console.log('대출 중인 책 중 최고 평점:', highestRatedUnavailable?.title, `(${highestRatedUnavailable?.rating}점)`);

/*
문제 3.4: 책 목록에서 중복 없이 모든 장르를 추출하고, 각 장르별 평균 평점을 계산하세요.
*/
console.log('\n문제 3.4 해결:');

// 여기에 코드를 작성하세요
// 모든 책의 장르를 펼친 다음 중복 제거
const allGenres = [...new Set(books.flatMap(book => book.genres))];

// 각 장르별 책의 평점 계산
const genreRatings = allGenres.reduce((acc, genre) => {
    // 해당 장르를 가진 책들 필터링
    const booksInGenre = filterBooksByGenre(books, genre);
    
    // 평균 평점 계산
    const totalRating = booksInGenre.reduce((sum, book) => sum + book.rating, 0);
    const averageRating = totalRating / booksInGenre.length;
    
    // 결과 객체에 추가
    acc[genre] = {
        count: booksInGenre.length,
        averageRating: averageRating.toFixed(2)
    };
    
    return acc;
}, {});

// 결과 확인
console.log('모든 장르 목록:', allGenres);
console.log('장르별 평균 평점:', genreRatings);

// 문제 4: 종합 문제 - 영화 리뷰 시스템
console.log('\n--- 문제 4: 종합 문제 - 영화 리뷰 시스템 ---');

const movies = [
    {
        id: 1,
        title: '인셉션',
        director: '크리스토퍼 놀란',
        releaseYear: 2010,
        genres: ['액션', 'SF', '스릴러'],
        ratings: [
            { userId: 101, score: 9.5, review: '최고의 영화!' },
            { userId: 102, score: 8.0, review: '흥미로운 설정' },
            { userId: 103, score: 9.0, review: '놀라운 연출' }
        ]
    },
    {
        id: 2,
        title: '어벤져스: 엔드게임',
        director: '앤서니 루소, 조 루소',
        releaseYear: 2019,
        genres: ['액션', '모험', 'SF'],
        ratings: [
            { userId: 101, score: 8.5, review: '시리즈의 완벽한 마무리' },
            { userId: 104, score: 9.5, review: '쿵쾅거리는 액션' }
        ]
    },
    {
        id: 3,
        title: '기생충',
        director: '봉준호',
        releaseYear: 2019,
        genres: ['드라마', '스릴러', '코미디'],
        ratings: [
            { userId: 102, score: 10.0, review: '걸작!' },
            { userId: 103, score: 9.0, review: '뛰어난 연출과 연기' },
            { userId: 105, score: 8.5, review: '의미 있는 메시지' }
        ]
    },
    {
        id: 4,
        title: '다크 나이트',
        director: '크리스토퍼 놀란',
        releaseYear: 2008,
        genres: ['액션', '범죄', '드라마'],
        ratings: [
            { userId: 101, score: 10.0, review: '최고의 히어로 영화' },
            { userId: 102, score: 9.5, review: '조커의 연기가 압권' },
            { userId: 104, score: 9.0, review: '긴장감 넘치는 스토리' },
            { userId: 105, score: 10.0, review: '명불허전 명작' }
        ]
    },
    {
        id: 5,
        title: '라라랜드',
        director: '데이미언 셔젤',
        releaseYear: 2016,
        genres: ['드라마', '뮤지컬', '로맨스'],
        ratings: [
            { userId: 103, score: 8.0, review: '아름다운 음악' },
            { userId: 105, score: 7.5, review: '달콤한 영화' }
        ]
    }
];

// 사용자 정보
const users = [
    { id: 101, name: '김영화', level: 'VIP' },
    { id: 102, name: '이시네', level: 'GOLD' },
    { id: 103, name: '박무비', level: 'SILVER' },
    { id: 104, name: '정필름', level: 'GOLD' },
    { id: 105, name: '최영상', level: 'VIP' }
];

/*
문제 4.1: 각 영화의 평균 평점을 계산하고, 평점이 높은 순으로 영화 목록을 정렬하세요.
각 영화 객체에는 averageRating 속성이 추가되어야 합니다.
*/
console.log('\n문제 4.1 해결:');

// 여기에 코드를 작성하세요
// 각 영화에 평균 평점 추가
movies.forEach(movie => {
    const totalScore = movie.ratings.reduce((sum, rating) => sum + rating.score, 0);
    movie.averageRating = (totalScore / movie.ratings.length).toFixed(1);
});

// 평점 높은 순으로 정렬 (원본 배열 복사 후 정렬)
const sortedMovies = [...movies].sort((a, b) => 
    parseFloat(b.averageRating) - parseFloat(a.averageRating)
);

// 결과 확인
console.log('평점 순 영화 목록:');
sortedMovies.forEach(movie => {
    console.log(`${movie.title} - ${movie.averageRating}점`);
});

/*
문제 4.2: 특정 감독이 제작한 영화의 모든 리뷰를 수집하고, 
각 리뷰에 해당 사용자의 이름과 레벨 정보를 추가하세요.
*/
console.log('\n문제 4.2 해결:');

// 여기에 코드를 작성하세요
function getReviewsByDirector(director) {
    // 해당 감독의 영화 필터링
    const directorMovies = movies.filter(movie => movie.director.includes(director));
    
    // 모든 리뷰 수집 및 확장
    const reviews = directorMovies.flatMap(movie => {
        return movie.ratings.map(rating => {
            // 사용자 정보 찾기
            const user = users.find(user => user.id === rating.userId);
            
            // 리뷰 정보 확장
            return {
                movieTitle: movie.title,
                score: rating.score,
                review: rating.review,
                userName: user ? user.name : '알 수 없음',
                userLevel: user ? user.level : '알 수 없음'
            };
        });
    });
    
    return reviews;
}

// 크리스토퍼 놀란 감독의 영화 리뷰 가져오기
const nolanReviews = getReviewsByDirector('크리스토퍼 놀란');

// 결과 확인
console.log(`크리스토퍼 놀란 감독 영화의 리뷰 (${nolanReviews.length}개):`);
console.log(nolanReviews);

/*
문제 4.3: 각 장르별로 가장 높은 평점을 받은 영화를 찾으세요. 
또한, 가장 많은 장르를 가진 영화를 찾으세요.
*/
console.log('\n문제 4.3 해결:');

// 여기에 코드를 작성하세요
// 모든 장르 목록 생성 (중복 제거)
const movieGenres = [...new Set(movies.flatMap(movie => movie.genres))];

// 각 장르별 최고 평점 영화 찾기
const topMoviesByGenre = movieGenres.reduce((acc, genre) => {
    // 해당 장르의 영화들
    const genreMovies = movies.filter(movie => movie.genres.includes(genre));
    
    // 평점순 정렬 후 최고 평점 영화 선택
    const topMovie = genreMovies.sort((a, b) => 
        parseFloat(b.averageRating) - parseFloat(a.averageRating)
    )[0];
    
    acc[genre] = {
        title: topMovie.title,
        rating: topMovie.averageRating
    };
    
    return acc;
}, {});

// 가장 많은 장르를 가진 영화 찾기
const movieWithMostGenres = movies.reduce((mostGenres, movie) => {
    return movie.genres.length > mostGenres.genres.length ? movie : mostGenres;
}, movies[0]);

// 결과 확인
console.log('장르별 최고 평점 영화:', topMoviesByGenre);
console.log('가장 많은 장르를 가진 영화:', 
    `${movieWithMostGenres.title} (${movieWithMostGenres.genres.length}개 장르)`
);

/*
문제 4.4: VIP 사용자의 리뷰만 고려했을 때 영화별 평균 평점을 다시 계산하고,
일반 평점과의 차이를 분석하세요.
*/
console.log('\n문제 4.4 해결:');

// 여기에 코드를 작성하세요
// VIP 사용자 ID 목록
const vipUserIds = users
    .filter(user => user.level === 'VIP')
    .map(user => user.id);

// VIP 평점 계산
const vipRatings = movies.map(movie => {
    // VIP 사용자의 리뷰만 필터링
    const vipReviews = movie.ratings.filter(rating => 
        vipUserIds.includes(rating.userId)
    );
    
    // VIP 평균 평점 계산
    let vipAverage = 0;
    if (vipReviews.length > 0) {
        const vipTotal = vipReviews.reduce((sum, review) => sum + review.score, 0);
        vipAverage = (vipTotal / vipReviews.length).toFixed(1);
    }
    
    // 일반 평점과의 차이 계산
    const difference = (vipAverage - movie.averageRating).toFixed(1);
    
    return {
        title: movie.title,
        regularRating: movie.averageRating,
        vipRating: vipAverage || '리뷰 없음',
        difference: vipAverage ? difference : '비교 불가',
        vipReviewCount: vipReviews.length
    };
});

// 결과 확인
console.log('VIP 평점 vs 일반 평점 비교:');
vipRatings.forEach(movie => {
    console.log(`${movie.title} - 일반: ${movie.regularRating}, VIP: ${movie.vipRating}, 차이: ${movie.difference}`);
});

/**
 * 배열과 객체를 다루는 실습 문제를 통해 다음 개념을 연습했습니다:
 * 
 * 1. 배열 메서드(map, filter, reduce, forEach 등) 활용
 * 2. 객체 속성 추가 및 수정
 * 3. 배열 및 객체 구조 분해 할당
 * 4. 중첩 객체와 배열 다루기
 * 5. 데이터 변환 및 분석
 * 6. 함수 작성 및 활용
 * 
 * 실제 프로젝트에서는 이와 같은 데이터 처리 작업이 매우 흔하게 요구됩니다.
 * 이러한 연습을 통해 실무에서 마주하는 데이터 처리 문제를 효과적으로 해결할 수 있습니다.
 */ 