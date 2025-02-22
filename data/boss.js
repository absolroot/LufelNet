// 속성값 상수 정의
const RESISTANCE_TYPES = {
    NULL: "null",   // 속성 없음
    WEAK: "약",     // 약점
    NORMAL: "내",   // 내성
    ABSORB: "흡",   // 흡수
    REFLECT: "반",  // 반사
    IMMUNE: "무"    // 무효
};

// 속성 종류 상수 정의
const ELEMENT_TYPES = {
    PHYSICAL: "physical",   // 물리
    GUN: "gun",            // 총격
    FIRE: "fire",          // 화염
    ICE: "ice",            // 빙결
    ELECTRIC: "electric",   // 전격
    WIND: "wind",          // 질풍
    PSY: "psy",            // 염동
    NUCLEAR: "nuclear",    // 핵열
    BLESS: "bless",        // 축복
    CURSE: "curse"         // 주원
};

// 속성 한글명 매핑
const ELEMENT_NAMES = {
    physical: "물리",
    gun: "총격",
    fire: "화염",
    ice: "빙결",
    electric: "전격",
    wind: "질풍",
    psy: "염동",
    nuclear: "핵열",
    bless: "축복",
    curse: "주원"
};

// 속성 아이콘 경로 매핑
const ELEMENT_ICONS = {
    physical: "../img/elements/physical.webp",
    gun: "../img/elements/gun.webp",
    fire: "../img/elements/fire.webp",
    ice: "../img/elements/ice.webp",
    electric: "../img/elements/electric.webp",
    wind: "../img/elements/wind.webp",
    psy: "../img/elements/psy.webp",
    nuclear: "../img/elements/nuclear.webp",
    bless: "../img/elements/bless.webp",
    curse: "../img/elements/curse.webp"
};

// 내성 아이콘 경로 매핑
const RESISTANCE_ICONS = {
    "null": "",
    "약": "../img/resistance/weak.webp",
    "내": "../img/resistance/normal.webp",
    "흡": "../img/resistance/absorb.webp",
    "반": "../img/resistance/reflect.webp",
    "무": "../img/resistance/immune.webp"
};


const bossData = [
    {
        id: 1,
        isSea: false,
        name: "흉몽 단일 보스(반항)",
        icon: "",
        description: "",
        resistances: {},
        baseDefense: "1280",
        defenseCoef: "258.4",
        comment: ""
    },
    {
        id: 2,
        isSea: false,
        name: "흉몽 광역 보스(지배)",
        icon: "",
        description: "",
        resistances: {},
        baseDefense: "821",
        defenseCoef: "258.4",
        comment: ""
    },
    {
        id: 4,
        isSea: true,
        name: "릴리스",
        icon: "../img/boss/릴리스.webp",
        description: "시종 4개 소환해 [생명 연결] 상태\n[생명 연결] : 현재 생명 비율에 따라 받는 대미지 분배\n\n1턴마다 모든 아군에게 [황혼의 가호] 1중첩 추가 (최대 2중첩)\n[황혼의 가호] : 자신이 받는 최종 대미지 15% 감소, 원소 이상 상태 획득 시 1중첩 제거",
        resistances: {
            physical: "null",
            gun: "null",
            fire: "약",
            ice: "내",
            electric: "null",
            wind: "null",
            psy: "null",
            nuclear: "내",
            bless: "내",
            curse: "null"
        },
        baseDefense: "-",
        defenseCoef: 263.2,
        comment: ""
    },
    {
        id: 5,
        isSea: true,
        name: "릴리스 / 누에 - 시종",
        icon: "../img/boss/누에.webp",
        description: "-",
        resistances: {
            physical: "null",
            gun: "null",
            fire: "약",
            ice: "내",
            electric: "null",
            wind: "null",
            psy: "null",
            nuclear: "null",
            bless: "내",
            curse: "null"
        },
        baseDefense: "-",
        defenseCoef: 263.2,
        comment: ""
    },
    {
        id: 6,
        isSea: true,
        name: "바포멧",
        icon: "../img/boss/바포멧.webp",
        description: "바포맷은 한 턴 마다 모든 괴도의 SP 회복\n2번째 행동마다 공격력이 가장 높은 괴도에게 [악마의 주원] 부여\n(2턴/4턴 종료 후 발동)\n\n[악마의 주원] : 주는 대미지가 50% 감소한다 (2턴 지속)",
        resistances: {
            physical: "null",
            gun: "null",
            fire: "내",
            ice: "내",
            electric: "null",
            wind: "null",
            psy: "null",
            nuclear: "null",
            bless: "약",
            curse: "약"
        },
        baseDefense: 855,
        defenseCoef: 263.2,
        comment: "미나미의 2스 / 쿤다킬을 통해 [악마의 주원] 제거 가능"
    },
    {
        id: 7,
        isSea: true,
        name: "멜키세덱",
        icon: "../img/boss/멜키세덱.webp",
        description: "1턴마다 [신의 비호] 6중첩 획득 (1턴/3턴/5턴)\n- 중첩마다 5% 대미지 감소\n- 스킬 또는 추가효과로 대미지를 받을 때마다 1중첩 해제\n- 모든 중첩을 잃으면 모든 괴도가 [신의 축복] 획득\n\n[신의 축복] : 주는 대미지 30% 증가",
        resistances: {
            physical: "내",
            gun: "null",
            fire: "null",
            electric: "null",
            ice: "null",
            wind: "약",
            psy: "내",
            nuclear: "내",
            bless: "내",
            curse: "내"
        },
        baseDefense: 1493,
        defenseCoef: 263.2,
        comment: ""
    }
];

