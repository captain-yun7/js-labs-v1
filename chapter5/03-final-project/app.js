// DOM 요소 선택
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');
const progressBars = document.querySelectorAll('.progress');
const contactForm = document.querySelector('#contactForm');
const header = document.querySelector('header');

// 햄버거 메뉴 클릭 이벤트
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // 햄버거 메뉴 애니메이션
    hamburger.classList.toggle('toggle');
    
    const lines = hamburger.querySelectorAll('div');
    if (hamburger.classList.contains('toggle')) {
        lines[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        lines[1].style.opacity = '0';
        lines[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    } else {
        lines[0].style.transform = 'none';
        lines[1].style.opacity = '1';
        lines[2].style.transform = 'none';
    }
});

// 부드러운 스크롤 기능
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // 모바일 메뉴 닫기
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('toggle');
                
                const lines = hamburger.querySelectorAll('div');
                lines[0].style.transform = 'none';
                lines[1].style.opacity = '1';
                lines[2].style.transform = 'none';
            }
        }
    });
});

// 스크롤 시 헤더 스타일 변경
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.backgroundColor = '#fff';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// 프로젝트 필터링 기능
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // 활성 버튼 변경
        filterBtns.forEach(btn => btn.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        projectItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// 스킬 진행률 애니메이션
function animateSkills() {
    progressBars.forEach(progress => {
        const percent = progress.getAttribute('data-percent');
        progress.style.width = percent + '%';
    });
}

// 컨텐츠가 화면에 나타날 때 애니메이션 적용
const observerOptions = {
    threshold: 0.3
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // 스킬 섹션 애니메이션
            if (entry.target.classList.contains('skills')) {
                animateSkills();
            }
            
            // 다른 섹션들의 애니메이션
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 모든 섹션 관찰
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// 연락처 폼 제출 처리
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const formValues = {};
    
    for (const [key, value] of formData.entries()) {
        formValues[key] = value;
    }
    
    // 여기서 localStorage에 저장하거나 서버로 전송하는 코드를 추가할 수 있음
    // 예: localStorage.setItem('contactMessage', JSON.stringify(formValues));
    
    // 메시지 전송 확인 알림
    alert('메시지가 성공적으로 전송되었습니다!');
    
    // 폼 초기화
    contactForm.reset();
});

// 페이지 로드 시 실행되는 코드
window.addEventListener('load', () => {
    // 페이지 로딩 애니메이션 (선택 사항)
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    }
    
    // 초기 상태 설정
    document.querySelector('body').classList.add('loaded');
    
    // 현재 연도 업데이트 (푸터에 있는 경우)
    const yearElement = document.querySelector('.current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // 랜덤 배경 이미지 또는 색상 설정 (선택 사항)
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const randomBg = Math.floor(Math.random() * 5) + 1;
        heroSection.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://source.unsplash.com/random/1920x1080/?portfolio,${randomBg}')`;
    }
});

// 타이핑 효과 (선택 사항)
function typeEffect(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// 타이핑 효과 적용 (홈 섹션 제목에 적용할 경우)
const heroTitle = document.querySelector('.hero-content h1');
if (heroTitle) {
    const originalText = heroTitle.textContent;
    window.addEventListener('load', () => {
        setTimeout(() => {
            typeEffect(heroTitle, originalText, 50);
        }, 1500);
    });
}

// 다크 모드 토글 (선택 사항)
function setupDarkModeToggle() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.classList.add('dark-mode-toggle');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(darkModeToggle);
    
    // 저장된 다크 모드 설정 확인
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        
        darkModeToggle.innerHTML = isDarkMode ? 
            '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
}

// 다크 모드 토글 설정 (선택적 기능)
// setupDarkModeToggle(); 