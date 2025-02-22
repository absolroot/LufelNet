class Navigation {
    static async load(activePage, depth = 0) {
        // depth에 따른 상대 경로 계산
        const rootPath = depth > 0 ? '../'.repeat(depth) : './';

        // 모바일 헤더 추가
        const mobileHeader = document.createElement('div');
        mobileHeader.className = 'mobile-header';
        document.body.insertBefore(mobileHeader, document.body.firstChild);

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
                <div class="logo-container" onclick="location.href='${rootPath}index.html'">
                    <img src="${rootPath}img/logo/lufel.png" alt="logo" />
                    <img src="${rootPath}img/logo/lufelnet.png" alt="logo-text" />
                </div>
                <a href="${rootPath}index.html" class="nav-item" data-nav="home">
                    <img src="${rootPath}img/nav/home.png" alt="guaidao" style="width: 32px; height: 32px; object-fit: contain;" />
                    <span data-text="홈">홈</span>
                </a>
                <a href="${rootPath}character/character.html" class="nav-item" data-nav="character">
                    <img src="${rootPath}img/nav/guaidao.png" alt="guaidao" style="width: 32px; height: 32px; object-fit: contain;" />
                    <span data-text="괴">괴</span><span data-text="도">도</span>
                </a>
                <!--
                <a href="${rootPath}persona/persona.html" class="nav-item" data-nav="persona">
                    <img src="${rootPath}img/nav/persona.png" alt="persona" style="width: 32px; height: 32px; object-fit: contain;" />
                    <span data-text="페">페</span><span data-text="르">르</span><span data-text="소">소</span><span data-text="나">나</span>
                </a>
                <a href="${rootPath}character/" class="nav-item" data-nav="boss">
                    <img src="${rootPath}img/nav/boss.png" alt="boss" style="width: 32px; height: 32px; object-fit: contain;" />
                    <span data-text="보">보</span><span data-text="스">스</span>
                </a>-->
                <a href="${rootPath}revelations/revelations.html" class="nav-item" data-nav="revelations">
                    <img src="${rootPath}img/nav/qishi.png" alt="qishi" style="width: 32px; height: 32px; object-fit: contain;" />
                    <span data-text="계">계</span><span data-text="시">시</span>
                </a>
                <!--
                <a href="${rootPath}simulator/" class="nav-item" data-nav="simulator">
                    <img src="${rootPath}img/nav/simulator.png" alt="simulator" style="width: 32px; height: 32px; object-fit: contain;" />
                    <span data-text="시">시</span><span data-text="뮬">뮬</span><span data-text="레">레</span><span data-text="이">이</span><span data-text="터">터</span>
                </a> -->

                <a href="${rootPath}defense-calc/defense-calc.html" class="nav-item" data-nav="defense-calc">
                    <img src="${rootPath}img/nav/defense-calc.png" alt="defense-calc" style="width: 32px; height: 32px; object-fit: contain;" />
                    <span data-text="방">방</span><span data-text="어">어</span><span data-text="력">력</span>
                </a>
                <a href="${rootPath}tactic/tactic.html" class="nav-item" data-nav="tactic">
                    <img src="${rootPath}img/nav/tactic.png" alt="tactic" style="width: 32px; height: 32px; object-fit: contain;" />
                    <span data-text="택">택</span><span data-text="틱">틱</span>
                </a>
            </nav>
        `;

        document.querySelector('#nav-container').innerHTML = navTemplate;
        
        if (activePage) {
            const activeItem = document.querySelector(`[data-nav="${activePage}"]`);
            if (activeItem) activeItem.classList.add('active');
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
            hamburgerBtn.classList.toggle('active');
            nav.classList.toggle('active');
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
        
        this.initSwordAnimation();
    }
    
    
    static initSwordAnimation() {
        const isPc = () => window.innerWidth > 1440;  // PC 기준을 1440px로 수정
        
        document.querySelectorAll('.nav-item').forEach(link => {
            link.addEventListener('click', function(e) {
                if (!this.classList.contains('active')) {
                    e.preventDefault();
                    const href = this.getAttribute('href');  // 직접 href 속성 사용
                    
                    if (isPc()) {
                        const sword = document.createElement('div');
                        sword.className = 'sword-animation';
                        
                        const rect = this.getBoundingClientRect();
                        const navRect = document.querySelector('.main-nav').getBoundingClientRect();
                        
                        sword.style.top = `${rect.top + (rect.height - 32) / 2}px`;
                        sword.style.left = `${navRect.left + navRect.width - 48}px`;
                        
                        document.body.appendChild(sword);
                        
                        setTimeout(() => {
                            window.location.href = href;  // 상대 경로 그대로 사용
                        }, 300);
                    } else {
                        window.location.href = href;  // 상대 경로 그대로 사용
                    }
                }
            });
        });
    }
}