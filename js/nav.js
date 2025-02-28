class Navigation {
    static async load(activePage, depth = 0) {
        // depth에 따른 상대 경로 계산
        const rootPath = depth > 0 ? '../'.repeat(depth) : './';

        // APP_VERSION 가져오기
        const version = window.APP_VERSION || '1.0.0';

        // 모바일 헤더 추가
        const mobileHeader = document.createElement('div');
        mobileHeader.className = 'mobile-header';
        document.body.insertBefore(mobileHeader, document.body.firstChild);

        // 로고 컨테이너 추가
        const logoContainer = document.createElement('div');
        logoContainer.className = 'mobile-logo-container';
        logoContainer.onclick = () => location.href = `${rootPath}?v=${version}`;
        logoContainer.innerHTML = `
            <img src="${rootPath}img/logo/lufel.webp" alt="logo" />
            <img src="${rootPath}img/logo/lufelnet.png" alt="logo-text" />
        `;
        mobileHeader.appendChild(logoContainer);

        // 햄버거 버튼 추가
        const hamburgerBtn = document.createElement('button');
        hamburgerBtn.className = 'hamburger-btn';
        hamburgerBtn.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        mobileHeader.appendChild(hamburgerBtn);

        const navTemplate = `
            <nav class="main-nav">
                <div class="logo-container" onclick="location.href='${rootPath}?v=${version}'">
                    <img src="${rootPath}img/logo/lufel.webp" alt="logo" />
                    <img src="${rootPath}img/logo/lufelnet.png" alt="logo-text" />
                </div>
                <a href="${rootPath}?v=${version}" class="nav-link" data-nav="home">
                    <img src="${rootPath}img/nav/home.png" alt="guaidao" style="width: 32px; height: 32px; object-fit: contain;" />
                    <span data-text="홈">홈</span>
                </a>
                <a href="${rootPath}character?v=${version}" class="nav-link" data-nav="character">
                    <img src="${rootPath}img/nav/guaidao.png" alt="guaidao" style="width: 32px; height: 32px; object-fit: contain;" />
                    <span data-text="괴도">괴도</span>
                </a>
                <a href="${rootPath}persona?v=${version}" class="nav-link" data-nav="persona">
                    <img src="${rootPath}img/nav/persona.png" alt="persona" style="width: 32px; height: 32px; object-fit: contain;" />
                    <span data-text="페르소나">페르소나</span>
                </a>
                <a href="${rootPath}revelations?v=${version}" class="nav-link" data-nav="revelations">
                    <img src="${rootPath}img/nav/qishi.png" alt="qishi" style="width: 32px; height: 32px; object-fit: contain;" />
                    <span data-text="계시">계시</span>
                </a>
                <a href="${rootPath}defense-calc?v=${version}" class="nav-link" data-nav="defense-calc">
                    <img src="${rootPath}img/nav/defense-calc.png" alt="defense-calc" style="width: 32px; height: 32px; object-fit: contain;" />
                    <span data-text="방어력 계산">방어력 계산</span>
                </a>
                <div class="nav-item has-submenu" data-nav="tactic">
                    <div class="nav-main-item">
                        <img src="${rootPath}img/nav/tactic.png" alt="tactic" style="width: 32px; height: 32px; object-fit: contain;" />
                        <span data-text="택틱">택틱</span>
                    </div>
                    <div class="submenu">
                        <a href="${rootPath}tactic?v=${version}" class="nav-sub-item" data-nav="tactic-maker">
                            <span data-text="택틱 메이커">◈　택틱 메이커</span>
                        </a>
                        <a href="${rootPath}tactic/tactic-share.html?v=${version}" class="nav-sub-item" data-nav="tactic-share">
                            <span data-text="택틱 대장간">◈　택틱 대장간</span>
                        </a>
                    </div>
                </div>
            </nav>
        `;

        document.querySelector('#nav-container').innerHTML = navTemplate;
        
        if (activePage) {
            const activeItem = document.querySelector(`[data-nav="${activePage}"]`);
            if (activeItem) {
                activeItem.classList.add('active');
                
                // 서브메뉴 아이템인 경우
                if (activeItem.classList.contains('nav-sub-item')) {
                    // 부모 메뉴 활성화
                    const parentMenu = activeItem.closest('.has-submenu');
                    if (parentMenu) {
                        parentMenu.classList.add('active');
                    }
                }
            }

            // 택틱 관련 페이지인 경우 추가 처리
            if (activePage === 'tactic' || activePage === 'tactic-maker' || activePage === 'tactic-share') {
                const tacticMenu = document.querySelector('[data-nav="tactic"]');
                if (tacticMenu) {
                    tacticMenu.classList.add('active');
                    
                    // 현재 활성화된 서브메뉴 아이템 찾기
                    let activeSubItem;
                    if (activePage === 'tactic' || activePage === 'tactic-maker') {
                        activeSubItem = document.querySelector('[data-nav="tactic-maker"]');
                    } else if (activePage === 'tactic-share') {
                        activeSubItem = document.querySelector('[data-nav="tactic-share"]');
                    }
                    
                    if (activeSubItem) {
                        // 다른 서브메뉴 아이템의 active 클래스 제거
                        document.querySelectorAll('.nav-sub-item').forEach(item => {
                            item.classList.remove('active');
                        });
                        // 현재 서브메뉴 아이템 활성화
                        activeSubItem.classList.add('active');
                    }
                }
            }
        }
        
        // 스크롤 이벤트 처리
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            if (window.innerWidth <= 1440) {  // 1440px 이하에서 작동하도록 수정
                const currentScroll = window.pageYOffset;
                const header = document.querySelector('.mobile-header');
                
                if (currentScroll > lastScroll && currentScroll > 60) {
                    header.classList.add('hide');
                } else {
                    header.classList.remove('hide');
                }
                lastScroll = currentScroll;
            }
        });

        // 햄버거 메뉴 이벤트 리스너
        hamburgerBtn.addEventListener('click', () => {
            const nav = document.querySelector('.main-nav');
            const header = document.querySelector('.mobile-header');
            hamburgerBtn.classList.toggle('active');
            nav.classList.toggle('active');
            header.classList.toggle('active');
        });

        // 모바일에서 메뉴 아이템 클릭시 메뉴 닫기
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                if (window.innerWidth <= 1440) {  // 1440px 이하에서 작동하도록 수정
                    const nav = document.querySelector('.main-nav');
                    const hamburgerBtn = document.querySelector('.hamburger-btn');
                    nav.classList.remove('active');
                    hamburgerBtn.classList.remove('active');
                }
            });
        });
        
        // 메인 메뉴 클릭 이벤트 처리
        document.querySelectorAll('.has-submenu .nav-main-item').forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const submenu = this.closest('.has-submenu');
                submenu.classList.toggle('active');
            });
        });
        
        this.initSwordAnimation();
    }
    
    
    static initSwordAnimation() {
        const isPc = () => window.innerWidth > 1440;  // PC 기준을 1440px로 수정
        
        // sword animation 생성 함수
        const createSwordAnimation = (element, href) => {
            const sword = document.createElement('div');
            sword.className = 'sword-animation';
            
            const rect = element.getBoundingClientRect();
            const navRect = document.querySelector('.main-nav').getBoundingClientRect();
            
            sword.style.top = `${rect.top + (rect.height - 32) / 2}px`;
            sword.style.left = `${navRect.left + navRect.width - 48}px`;
            
            document.body.appendChild(sword);
            
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        };

        // 일반 nav-link에 대한 sword animation 추가
        document.querySelectorAll('.nav-link').forEach(item => {
            item.addEventListener('click', function(e) {
                if (!this.classList.contains('active')) {
                    e.preventDefault();
                    const href = this.getAttribute('href');
                    
                    if (isPc()) {
                        createSwordAnimation(this, href);
                    } else {
                        window.location.href = href;
                    }
                }
            });
        });

        // 서브메뉴 아이템에 대한 이벤트 처리
        document.querySelectorAll('.nav-sub-item').forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const href = this.getAttribute('href');
                
                if (isPc()) {
                    createSwordAnimation(this, href);
                } else {
                    window.location.href = href;
                }
            });
        });
    }
}