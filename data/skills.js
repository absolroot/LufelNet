// 스킬 목록
const skillList = ["스킬1", "스킬2", "스킬3", "HIGHLIGHT", "총격", "근접", "방어", "ONE MORE", "아이템"];

// 페르소나 액티브 스킬 리스트
// "아기" : 1명의 적에게 공격력 106.2%의 화염 속성 대미지를 주고, 59.0%의 기본 확률로 적을 2턴 동안 화상 상태에 빠뜨린다.
// "아기라오" : 1명의 적에게 공격력 114.0%의 화염 속성 대미지를 주고, 63.3%의 기본 확률로 적을 2턴 동안 화상 상태에 빠뜨린다.


const personaSkillList = {
    // 화염 속성 스킬
    "아기": {
        description: "1명의 적에게 공격력 106.2%의 화염 속성 대미지를 주고, 59.0%의 기본 확률로 적을 2턴 동안 화상 상태에 빠뜨린다.",
        type: "공격",
        target: "단일",
        effects: [
            {
                type: "대미지",
                element: "화염",
                power: 106.2,
                scale: "공격력"
            },
            {
                type: "원소이상",
                status: "화상",
                chance: 59.0,
                duration: 2
            }
        ]
    },
    "아기라오": {
        description: "1명의 적에게 공격력 114.0%의 화염 속성 대미지를 주고, 63.3%의 기본 확률로 적을 2턴 동안 화상 상태에 빠뜨린다.",
        type: "공격",
        target: "단일",
        effects: [
            {
                type: "대미지",
                element: "화염",
                power: 114.0,
                scale: "공격력"
            },
            {
                type: "원소이상",
                status: "화상",
                chance: 63.3,
                duration: 2
            }
        ]
    },
    "아기다인": {
        description: "1명의 적에게 공격력 121.7%의 화염 속성 대미지를 주고, 67.6%의 기본 확률로 적을 2턴 동안 화상 상태에 빠뜨린다.",
        type: "공격",
        target: "단일",
        effects: [
            {
                type: "대미지",
                element: "화염",
                power: 121.7,
                scale: "공격력"
            },
            {
                type: "원소이상",
                status: "화상",
                chance: 67.6,
                duration: 2
            }
        ]
    },
    "마하라기": {
        description: "모든 적에게 공격력 53.1%의 화염 속성 대미지를 주고, 29.5%의 기본 확률로 적을 2턴 동안 화상 상태에 빠뜨린다.",
        type: "공격",
        target: "전체",
        effects: [
            {
                type: "대미지",
                element: "화염",
                power: 53.1,
                scale: "공격력"
            },
            {
                type: "원소이상",
                status: "화상",
                chance: 29.5,
                duration: 2
            }
        ]
    },
    "마하라기온": {
        description: "모든 적에게 공격력 57.0%의 화염 속성 대미지를 주고, 31.7%의 기본 확률로 적을 2턴 동안 화상 상태에 빠뜨린다.",
        type: "공격",
        target: "전체",
        effects: [
            {
                type: "대미지",
                element: "화염",
                power: 57.0,
                scale: "공격력"
            },
            {
                type: "원소이상",
                status: "화상",
                chance: 31.7,
                duration: 2
            }
        ]
    },
    "마하라기다인": {
        description: "모든 적에게 공격력 60.8%의 화염 속성 대미지를 주고, 33.8%의 기본 확률로 적을 2턴 동안 화상 상태에 빠뜨린다.",
        type: "공격",
        target: "전체",
        effects: [
            {
                type: "대미지",
                element: "화염",
                power: 60.8,
                scale: "공격력"
            },
            {
                type: "원소이상",
                status: "화상",
                chance: 33.8,
                duration: 2
            }
        ]
    },

    // 빙결 속성 스킬
    "부흐": {
        description: "1명의 적에게 공격력 106.2%의 빙결 속성 대미지를 주고, 59.0%의 기본 확률로 적을 2턴 동안 동결 상태에 빠뜨린다.",
        type: "공격",
        target: "단일",
        effects: [
            {
                type: "대미지",
                element: "빙결",
                power: 106.2,
                scale: "공격력"
            },
            {
                type: "원소이상",
                status: "동결",
                chance: 59.0,
                duration: 2
            }
        ]
    },
    "부흐라": {
        description: "1명의 적에게 공격력 114.0%의 빙결 속성 대미지를 주고, 63.3%의 기본 확률로 적을 2턴 동안 동결 상태에 빠뜨린다.",
        type: "공격",
        target: "단일",
        effects: [
            {
                type: "대미지",
                element: "빙결",
                power: 114.0,
                scale: "공격력"
            },
            {
                type: "원소이상",
                status: "동결",
                chance: 63.3,
                duration: 2
            }
        ]
    },
    "부흐다인": {
        description: "1명의 적에게 공격력 121.7%의 빙결 속성 대미지를 주고, 67.6%의 기본 확률로 적을 2턴 동안 동결 상태에 빠뜨린다.",
        type: "공격",
        target: "단일",
        effects: [
            {
                type: "대미지",
                element: "빙결",
                power: 121.7,
                scale: "공격력"
            },
            {
                type: "원소이상",
                status: "동결",
                chance: 67.6,
                duration: 2
            }
        ]
    },
    "다이아의 별": {
        description: "1명의 적에게 공격력 129.5%의 빙결 속성 대미지를 주고, 72.0%의 기본 확률로 적을 2턴 동안 동결 상태에 빠뜨린다.",
        type: "공격",
        target: "단일",
        effects: [
            {
                type: "대미지",
                element: "빙결",
                power: 129.5,
                scale: "공격력"
            },
            {
                type: "원소이상",
                status: "동결",
                chance: 72.0,
                duration: 2
            }
        ]
    },
    "마하부흐": {
        description: "모든 적에게 공격력 53.1%의 빙결 속성 대미지를 주고, 29.5%의 기본 확률로 적을 2턴 동안 동결 상태에 빠뜨린다.",
        type: "공격",
        target: "전체",
        effects: [
            {
                type: "대미지",
                element: "빙결",
                power: 53.1,
                scale: "공격력"
            },
            {
                type: "원소이상",
                status: "동결",
                chance: 29.5,
                duration: 2
            }
        ]
    },
    "마하부흐라": {
        description: "모든 적에게 공격력 57.0%의 빙결 속성 대미지를 주고, 31.7%의 기본 확률로 적을 2턴 동안 동결 상태에 빠뜨린다.",
        type: "공격",
        target: "전체",
        effects: [
            {
                type: "대미지",
                element: "빙결",
                power: 57.0,
                scale: "공격력"
            },
            {
                type: "원소이상",
                status: "동결",
                chance: 31.7,
                duration: 2
            }
        ]
    },
    "마하부흐다인": {
        description: "모든 적에게 공격력 60.8%의 빙결 속성 대미지를 주고, 33.8%의 기본 확률로 적을 2턴 동안 동결 상태에 빠뜨린다.",
        type: "공격",
        target: "전체",
        effects: [
            {
                type: "대미지",
                element: "빙결",
                power: 60.8,
                scale: "공격력"
            },
            {
                type: "원소이상",
                status: "동결",
                chance: 33.8,
                duration: 2
            }
        ]
    },

    // 전격 속성 스킬
    "지오": {
        description: "1명의 적에게 공격력 106.2%의 전격 속성 대미지를 주고, 59.0%의 기본 확률로 적을 2턴 동안 감전 상태에 빠뜨린다.",
        type: "공격",
        target: "단일",
        effects: [
            {
                type: "대미지",
                element: "전격",
                power: 106.2,
                scale: "공격력"
            },
            {
                type: "원소이상",
                status: "감전",
                chance: 59.0,
                duration: 2
            }
        ]
    },
    "지온가": {
        description: "1명의 적에게 공격력 114.0%의 전격 속성 대미지를 주고, 63.3%의 기본 확률로 적을 2턴 동안 감전 상태에 빠뜨린다.",
        type: "공격",
        target: "단일",
        effects: [
            {
                type: "대미지",
                element: "전격",
                power: 114.0,
                scale: "공격력"
            },
            {
                type: "원소이상",
                status: "감전",
                chance: 63.3,
                duration: 2
            }
        ]
    },
    "지오다인": {
        description: "1명의 적에게 공격력 121.7%의 전격 속성 대미지를 주고, 67.6%의 기본 확률로 적을 2턴 동안 감전 상태에 빠뜨린다.",
        type: "공격",
        target: "단일",
        effects: [
            {
                type: "대미지",
                element: "전격",
                power: 121.7,
                scale: "공격력"
            },
            {
                type: "원소이상",
                status: "감전",
                chance: 67.6,
                duration: 2
            }
        ]
    },
    "마하지온가": {
        description: "모든 적에게 공격력 57.0%의 전격 속성 대미지를 주고, 31.7%의 기본 확률로 적을 2턴 동안 감전 상태에 빠뜨린다.",
        type: "공격",
        target: "전체",
        effects: [
            {
                type: "대미지",
                element: "전격",
                power: 57.0,
                scale: "공격력"
            },
            {
                type: "원소이상",
                status: "감전",
                chance: 31.7,
                duration: 2
            }
        ]
    },
    "마하지오다인": {
        description: "모든 적에게 공격력 60.8%의 전격 속성 대미지를 주고, 33.8%의 기본 확률로 적을 2턴 동안 감전 상태에 빠뜨린다.",
        type: "공격",
        target: "전체",
        effects: [
            {
                type: "대미지",
                element: "전격",
                power: 60.8,
                scale: "공격력"
            },
            {
                type: "원소이상",
                status: "감전",
                chance: 33.8,
                duration: 2
            }
        ]
    },
    "엘 지하드": {
        description: "모든 적에게 공격력 64.8%의 전격 속성 대미지를 주고, 36.0%의 기본 확률로 적을 2턴 동안 감전 상태에 빠뜨린다.",
        type: "공격",
        target: "전체",
        effects: [
            {
                type: "대미지",
                element: "전격",
                power: 64.8,
                scale: "공격력"
            },
            {
                type: "원소이상",
                status: "감전",
                chance: 36.0,
                duration: 2
            }
        ]
    },

    // 질풍 속성 스킬
    "갈": {
        description: "1명의 적에게 공격력 106.2%의 질풍 속성 대미지를 주고, 59.0%의 기본 확률로 적을 2턴 동안 풍습 상태에 빠뜨린다.",
        type: "공격",
        target: "단일",
        effects: [
            {
                type: "대미지",
                element: "질풍",
                power: 106.2,
                scale: "공격력"
            },
            {
                type: "원소이상",
                status: "풍습",
                chance: 59.0,
                duration: 2
            }
        ]
    },
    "갈라": {
        description: "1명의 적에게 공격력 114.0%의 질풍 속성 대미지를 주고, 63.3%의 기본 확률로 적을 2턴 동안 풍습 상태에 빠뜨린다.",
        type: "공격",
        target: "단일",
        effects: [
            {
                type: "대미지",
                element: "질풍",
                power: 114.0,
                scale: "공격력"
            },
            {
                type: "원소이상",
                status: "풍습",
                chance: 63.3,
                duration: 2
            }
        ]
    },
    "갈다인": {
        description: "1명의 적에게 공격력 121.7%의 질풍 속성 대미지를 주고, 67.6%의 기본 확률로 적을 2턴 동안 풍습 상태에 빠뜨린다.",
        type: "공격",
        target: "단일",
        effects: [
            {
                type: "대미지",
                element: "질풍",
                power: 121.7,
                scale: "공격력"
            },
            {
                type: "원소이상",
                status: "풍습",
                chance: 67.6,
                duration: 2
            }
        ]
    },
    "마하갈라": {
        description: "모든 적에게 공격력 57.0%의 질풍 속성 대미지를 주고, 31.7%의 기본 확률로 적을 2턴 동안 풍습 상태에 빠뜨린다.",
        type: "공격",
        target: "전체",
        effects: [
            {
                type: "대미지",
                element: "질풍",
                power: 57.0,
                scale: "공격력"
            },
            {
                type: "원소이상",
                status: "풍습",
                chance: 31.7,
                duration: 2
            }
        ]
    },
    "마하갈다인": {
        description: "모든 적에게 공격력 60.8%의 질풍 속성 대미지를 주고, 33.8%의 기본 확률로 적을 2턴 동안 풍습 상태에 빠뜨린다.",
        type: "공격",
        target: "전체",
        effects: [
            {
                type: "대미지",
                element: "질풍",
                power: 60.8,
                scale: "공격력"
            },
            {
                type: "원소이상",
                status: "풍습",
                chance: 33.8,
                duration: 2
            }
        ]
    },

    // 염동 속성 스킬
    "사이오": {
        description: "1명의 적에게 공격력 122.0%의 염동 속성 대미지를 주고, 정신 이상 상태의 적은 TECHNICAL을 주고 스킬 대미지는 40% 증가한다.",
        type: "공격",
        target: "단일",
        effects: [
            {
                type: "대미지",
                element: "염동",
                power: 122.0,
                scale: "공격력"
            },
            {
                type: "technical",
                condition: "정신이상",
                damageIncrease: 40
            }
        ]
    },
    "사이다인": {
        description: "1명의 적에게 공격력 130.5%의 염동 속성 대미지를 주고, 정신 이상 상태의 적은 TECHNICAL을 주고 스킬 대미지는 45% 증가한다.",
        type: "공격",
        target: "단일",
        effects: [
            {
                type: "대미지",
                element: "염동",
                power: 130.5,
                scale: "공격력"
            },
            {
                type: "technical",
                condition: "정신이상",
                damageIncrease: 45
            }
        ]
    },
    "사이코키네시스": {
        description: "1명의 적에게 공격력 138.9%의 염동 속성 대미지를 주고, 정신 이상 상태의 적은 TECHNICAL을 주고 스킬 대미지는 50% 증가한다.",
        type: "공격",
        target: "단일",
        effects: [
            {
                type: "대미지",
                element: "염동",
                power: 138.9,
                scale: "공격력"
            },
            {
                type: "technical",
                condition: "정신이상",
                damageIncrease: 50
            }
        ]
    },
    "마하사이": {
        description: "모든 적에게 공격력 61.4%의 염동 속성 대미지를 주고, 정신 이상 상태의 적은 TECHNICAL을 주고 스킬 대미지는 35% 증가한다.",
        type: "공격",
        target: "전체",
        effects: [
            {
                type: "대미지",
                element: "염동",
                power: 61.4,
                scale: "공격력"
            },
            {
                type: "technical",
                condition: "정신이상",
                damageIncrease: 35
            }
        ]
    },
    "마하사이오": {
        description: "모든 적에게 공격력 66.4%의 염동 속성 대미지를 주고, 정신 이상 상태의 적은 TECHNICAL을 주고 스킬 대미지는 40% 증가한다.",
        type: "공격",
        target: "전체",
        effects: [
            {
                type: "대미지",
                element: "염동",
                power: 66.4,
                scale: "공격력"
            },
            {
                type: "technical",
                condition: "정신이상",
                damageIncrease: 40
            }
        ]
    },
    "마하사이다인": {
        description: "모든 적에게 공격력 72.3%의 염동 속성 대미지를 주고, 정신 이상 상태의 적은 TECHNICAL을 주고 스킬 대미지는 45% 증가한다.",
        type: "공격",
        target: "전체",
        effects: [
            {
                type: "대미지",
                element: "염동",
                power: 72.3,
                scale: "공격력"
            },
            {
                type: "technical",
                condition: "정신이상",
                damageIncrease: 45
            }
        ]
    },
    "사이코 포스": {
        description: "모든 적에게 공격력 77.1%의 염동 속성 대미지를 주고, 정신 이상 상태의 적은 TECHNICAL을 주고 스킬 대미지는 50% 증가한다.",
        type: "공격",
        target: "전체",
        effects: [
            {
                type: "대미지",
                element: "염동",
                power: 77.1,
                scale: "공격력"
            },
            {
                type: "technical",
                condition: "정신이상",
                damageIncrease: 50
            }
        ]
    },
    "코우가": {
        description: "1명의 적에게 공격력 123.2%의 축복 속성 대미지를 주고, 자신은 축복 효과 1~2개를 획득한다.",
        type: "공격",
        target: "단일",
        effects: [
            {
                type: "대미지",
                element: "축복",
                power: 123.2,
                scale: "공격력"
            },
            {
                type: "버프",
                target: "자신",
                effect: "축복",
                count: "1-2"
            }
        ]
    },
    "코우가온": {
        description: "1명의 적에게 공격력 130.8%의 축복 속성 대미지를 주고, 자신은 축복 효과 1~2개를 획득한다.",
        type: "공격",
        target: "단일",
        effects: [
            {
                type: "대미지",
                element: "축복",
                power: 130.8,
                scale: "공격력"
            },
            {
                type: "버프",
                target: "자신",
                effect: "축복",
                count: "1-2"
            }
        ]
    },
    "신의 심판": {
        description: "1명의 적에게 공격력 140.0%의 축복 속성 대미지를 주고, 자신은 축복 효과 2개를 획득한다.",
        type: "공격",
        target: "단일",
        effects: [
            {
                type: "대미지",
                element: "축복",
                power: 140.0,
                scale: "공격력"
            },
            {
                type: "버프",
                target: "자신",
                effect: "축복",
                count: 2
            }
        ]
    },
    "마하코우하": {
        description: "모든 적에게 공격력 57.6%의 축복 속성 대미지를 주고, 자신은 축복 효과 0~1개를 획득한다.",
        type: "공격",
        target: "전체",
        effects: [
            {
                type: "대미지",
                element: "축복",
                power: 57.6,
                scale: "공격력"
            },
            {
                type: "버프",
                target: "자신",
                effect: "축복",
                count: "0-1"
            }
        ]
    },
    "마하코우가": {
        description: "모든 적에게 공격력 61.3%의 축복 속성 대미지를 주고, 자신은 축복 효과 1~2개를 획득한다.",
        type: "공격",
        target: "전체",
        effects: [
            {
                type: "대미지",
                element: "축복",
                power: 61.3,
                scale: "공격력"
            },
            {
                type: "버프",
                target: "자신",
                effect: "축복",
                count: "1-2"
            }
        ]
    },
    "마하코우가온": {
        description: "모든 적에게 공격력 65.8%의 축복 속성 대미지를 주고, 자신은 축복 효과 1~2개를 획득한다.",
        type: "공격",
        target: "전체",
        effects: [
            {
                type: "대미지",
                element: "축복",
                power: 65.8,
                scale: "공격력"
            },
            {
                type: "버프",
                target: "자신",
                effect: "축복",
                count: "1-2"
            }
        ]
    },
    "하마온": {
        description: "1명의 적에게 공격력 90.6%의 축복 속성 대미지를 주고, 생명이 50% 이하인 적에게 낮은 확률로 축복 속성 즉사 효과를 부여하며 생명이 낮을수록 확률이 높아진다.",
        type: "공격",
        target: "단일",
        effects: [
            {
                type: "대미지",
                element: "축복",
                power: 90.6,
                scale: "공격력"
            },
            {
                type: "즉사",
                element: "축복",
                condition: "HP50%이하",
                variableChance: true
            }
        ]
    },
    "마한마": {
        description: "모든 적에게 39.9%의 축복 속성 대미지를 주고, 생명이 50% 이하인 적에게 낮은 확률로 축복 속성 즉사 효과를 부여하며 생명이 낮을수록 확률이 높아진다.",
        type: "공격",
        target: "전체",
        effects: [
            {
                type: "대미지",
                element: "축복",
                power: 39.9,
                scale: "공격력"
            },
            {
                type: "즉사",
                element: "축복",
                condition: "HP50%이하",
                variableChance: true
            }
        ]
    },
    "마한마온": {
        description: "모든 적에게 45.0%의 축복 속성 대미지를 주고, 생명이 50% 이하인 적에게 낮은 확률로 축복 속성 즉사 효과를 부여하며 생명이 낮을수록 확률이 높아진다.",
        type: "공격",
        target: "전체",
        effects: [
            {
                type: "대미지",
                element: "축복",
                power: 45.0,
                scale: "공격력"
            },
            {
                type: "즉사",
                element: "축복",
                condition: "HP50%이하",
                variableChance: true
            }
        ]
    },
    "에이가온": {
        description: "1명의 적에게 공격력 132.5%의 주원 속성 대미지를 주고, 적이 주원 효과 1~2개를 획득한다.",
        type: "공격",
        target: "단일",
        effects: [
            {
                type: "대미지",
                element: "주원",
                power: 132.5,
                scale: "공격력"
            },
            {
                type: "디버프",
                target: "적",
                effect: "주원",
                count: "1-2"
            }
        ]
    },
    "악마의 심판": {
        description: "1명의 적에게 공격력 142.5%의 주원 속성 대미지를 주고, 적이 주원 효과 2개를 획득한다.",
        type: "공격",
        target: "단일",
        effects: [
            {
                type: "대미지",
                element: "주원",
                power: 142.5,
                scale: "공격력"
            },
            {
                type: "디버프",
                target: "적",
                effect: "주원",
                count: 2
            }
        ]
    },
    "마하에이가": {
        description: "모든 적에게 공격력 61.8%의 주원 속성 대미지를 주고, 일정 확률로 적에게 주원 효과 1개를 추가한다.",
        type: "공격",
        target: "전체",
        effects: [
            {
                type: "대미지",
                element: "주원",
                power: 61.8,
                scale: "공격력"
            },
            {
                type: "디버프",
                target: "적",
                effect: "주원",
                count: 1,
                chance: true
            }
        ]
    },
    "마하에이가온": {
        description: "모든 적에게 공격력 66.5%의 주원 속성 대미지를 주고, 일정 확률로 적에게 주원 효과 1개를 추가한다.",
        type: "공격",
        target: "전체",
        effects: [
            {
                type: "대미지",
                element: "주원",
                power: 66.5,
                scale: "공격력"
            },
            {
                type: "디버프",
                target: "적",
                effect: "주원",
                count: 1,
                chance: true
            }
        ]
    },
    "연옥의 날개": {
        description: "모든 적에게 공격력 71.0%의 주원 속성 대미지를 주고, 적에게 주원 효과 1개를 추가한다.",
        type: "공격",
        target: "전체",
        effects: [
            {
                type: "대미지",
                element: "주원",
                power: 71.0,
                scale: "공격력"
            },
            {
                type: "디버프",
                target: "적",
                effect: "주원",
                count: 1
            }
        ]
    },
    "무드": {
        description: "1명의 적에게 공격력 79.2%의 주원 속성 대미지를 주고, 생명이 50% 이하인 적에게 낮은 확률로 주원 속성 즉사 효과를 부여하며 생명이 낮을수록 확률이 높아진다.",
        type: "공격",
        target: "단일",
        effects: [
            {
                type: "대미지",
                element: "주원",
                power: 79.2,
                scale: "공격력"
            },
            {
                type: "즉사",
                element: "주원",
                condition: "HP50%이하",
                variableChance: true
            }
        ]
    },
    "무드온": {
        description: "1명의 적에게 공격력 90.6%의 주원 속성 대미지를 주고, 생명이 50% 이하인 적에게 낮은 확률로 주원 속성 즉사 효과를 부여하며 생명이 낮을수록 확률이 높아진다.",
        type: "공격",
        target: "단일",
        effects: [
            {
                type: "대미지",
                element: "주원",
                power: 90.6,
                scale: "공격력"
            },
            {
                type: "즉사",
                element: "주원",
                condition: "HP50%이하",
                variableChance: true
            }
        ]
    },
    "마하무드": {
        description: "모든 적에게 39.9%의 주원 속성 대미지를 주고, 생명이 50% 이하인 적에게 낮은 확률로 주원 속성 즉사 효과를 부여하며 생명이 낮을수록 확률이 높아진다.",
        type: "공격",
        target: "전체",
        effects: [
            {
                type: "대미지",
                element: "주원",
                power: 39.9,
                scale: "공격력"
            },
            {
                type: "즉사",
                element: "주원",
                condition: "HP50%이하",
                variableChance: true
            }
        ]
    },
    "메기도": {
        description: "1명의 적에게 공격력 81.4%의 만능 속성 대미지를 주고, 적의 방어력을 무시한다.",
        type: "공격",
        target: "단일",
        effects: [
            {
                type: "대미지",
                element: "만능",
                power: 81.4,
                scale: "공격력",
                ignoreDefense: true
            }
        ]
    },
    "마하메기도": {
        description: "모든 적에게 공격력 40.7%의 만능 속성 대미지를 주고, 적의 방어력을 무시한다.",
        type: "공격",
        target: "전체",
        effects: [
            {
                type: "대미지",
                element: "만능",
                power: 40.7,
                scale: "공격력",
                ignoreDefense: true
            }
        ]
    },
    "메기도라온": {
        description: "모든 적에게 공격력 43.5%의 만능 속성 대미지를 주고, 적의 방어력을 무시한다.",
        type: "공격",
        target: "전체",
        effects: [
            {
                type: "대미지",
                element: "만능",
                power: 43.5,
                scale: "공격력",
                ignoreDefense: true
            }
        ]
    },
    "흡혈": {
        description: "1명의 적에게 공격력 41.4%의 만능 대미지를 주고 방어력을 무시하며, 자신은 생명을 공격력 41.4%만큼 회복한다.",
        type: "공격",
        target: "단일",
        effects: [
            {
                type: "대미지",
                element: "만능",
                power: 41.4,
                scale: "공격력",
                ignoreDefense: true
            },
            {
                type: "회복",
                target: "자신",
                power: 41.4,
                scale: "공격력"
            }
        ]
    },
    "흡마": {
        description: "적 1명의 SP 25포인트를 흡수한다.",
        type: "지원",
        target: "단일",
        effects: [
            {
                type: "SP흡수",
                amount: 25
            }
        ]
    },
    "돌격": {
        description: "1명의 적에게 공격력 116.4%의 물리 속성 대미지를 준다.",
        type: "공격",
        target: "단일",
        effects: [
            {
                type: "대미지",
                element: "물리",
                power: 116.4,
                scale: "공격력"
            }
        ]
    },
    "참격": {
        description: "1명의 적에게 공격력 116.4%의 물리 속성 대미지를 준다.",
        type: "공격",
        target: "단일",
        effects: [
            {
                type: "대미지",
                element: "물리",
                power: 116.4,
                scale: "공격력"
            }
        ]
    },
    "빅 슬라이스": {
        description: "1명의 적에게 공격력 129.1%의 물리 속성 대미지를 준다.",
        type: "공격",
        target: "단일",
        effects: [
            {
                type: "대미지",
                element: "물리",
                power: 129.1,
                scale: "공격력"
            }
        ]
    },
    "궁서아": {
        description: "1명의 적에게 공격력 129.1%의 물리 속성 대미지를 준다.",
        type: "공격",
        target: "단일",
        effects: [
            {
                type: "대미지",
                element: "물리",
                power: 129.1,
                scale: "공격력"
            }
        ]
    },
    "이연아": {
        description: "1명의 적에게 공격력 58.2%의 물리 속성 대미지를 2회 준다.",
        type: "공격",
        target: "단일",
        effects: [
            {
                type: "대미지",
                element: "물리",
                power: 58.2,
                scale: "공격력",
                hits: 2
            }
        ]
    },
    "어설트 다이브": {
        description: "1명의 적에게 공격력 141.8%의 물리 속성 대미지를 준다.",
        type: "공격",
        target: "단일",
        effects: [
            {
                type: "대미지",
                element: "물리",
                power: 141.8,
                scale: "공격력"
            }
        ]
    },
    "럭키 펀치": {
        description: "1명의 적에게 공격력 108.3%의 물리 속성 대미지를 주고, 크리티컬 확률이 20% 증가하며 명중률은 20% 감소한다.",
        type: "공격",
        target: "단일",
        effects: [
            {
                type: "대미지",
                element: "물리",
                power: 108.3,
                scale: "공격력",
                critRate: 20,
                accuracy: -20
            }
        ]
    },
    "장대비 베기": {
        description: "1명의 적에게 공격력 36.9%의 물리 속성 대미지를 3~5회 준다.",
        type: "공격",
        target: "단일",
        effects: [
            {
                type: "대미지",
                element: "물리",
                power: 36.9,
                scale: "공격력",
                hits: "3-5"
            }
        ]
    },
    "메가톤 레이드": {
        description: "1명의 적에게 공격력 141.8%의 물리 속성 대미지를 준다.",
        type: "공격",
        target: "단일",
        effects: [
            {
                type: "대미지",
                element: "물리",
                power: 141.8,
                scale: "공격력"
            }
        ]
    },
    "검의 춤": {
        description: "1명의 적에게 공격력 154.5%의 물리 속성 대미지를 준다.",
        type: "공격",
        target: "단일",
        effects: [
            {
                type: "대미지",
                element: "물리",
                power: 154.5,
                scale: "공격력"
            }
        ]
    },
    "브레이브 재퍼": {
        description: "1명의 적에게 공격력 154.5%의 물리 속성 대미지를 준다.",
        type: "공격",
        target: "단일",
        effects: [
            {
                type: "대미지",
                element: "물리",
                power: 154.5,
                scale: "공격력"
            }
        ]
    },
    "사망유희": {
        description: "1명의 적에게 공격력 154.5%의 물리 속성 대미지를 준다.",
        type: "공격",
        target: "단일",
        effects: [
            {
                type: "대미지",
                element: "물리",
                power: 154.5,
                scale: "공격력"
            }
        ]
    },
    "미라클 펀치": {
        description: "1명의 적에게 공격력 108.3%의 물리 속성 대미지를 주고, 크리티컬 확률이 20% 증가하며 명중률은 20% 감소한다.",
        type: "공격",
        target: "단일",
        effects: [
            {
                type: "대미지",
                element: "물리",
                power: 108.3,
                scale: "공격력",
                critRate: 20,
                accuracy: -20
            }
        ]
    },
    "전광석화": {
        description: "모든 적에게 공격력 15.2%의 물리 속성 대미지를 3~4회 준다.",
        type: "공격",
        target: "전체",
        effects: [
            {
                type: "대미지",
                element: "물리",
                power: 15.2,
                scale: "공격력",
                hits: "3-4"
            }
        ]
    },
    "난동 부리기": {
        description: "모든 적에게 공격력 30.0%의 물리 속성 대미지를 1~3회 준다.",
        type: "공격",
        target: "전체",
        effects: [
            {
                type: "대미지",
                element: "물리",
                power: 30.0,
                scale: "공격력",
                hits: "1-3"
            }
        ]
    },
    "히트 웨이브": {
        description: "모든 적에게 60.8%의 물리 속성 대미지를 준다.",
        type: "공격",
        target: "전체",
        effects: [
            {
                type: "대미지",
                element: "물리",
                power: 60.8,
                scale: "공격력"
            }
        ]
    },
    "데스바운드": {
        description: "모든 적에게 공격력 40.6%의 물리 속성 대미지를 1~2회 준다.",
        type: "공격",
        target: "전체",
        effects: [
            {
                type: "대미지",
                element: "물리",
                power: 40.6,
                scale: "공격력",
                hits: "1-2"
            }
        ]
    },
    "폴 다운": {
        description: "1명의 적에게 공격력 82.4%의 물리 속성 대미지를 주고, 2턴 동안 9.3%의 기본 확률로 적을 혼란 상태에 빠뜨린다.",
        type: "공격",
        target: "단일",
        effects: [
            {
                type: "대미지",
                element: "물리",
                power: 82.4,
                scale: "공격력"
            },
            {
                type: "정신이상",
                status: "혼란",
                chance: 9.3,
                duration: 2
            }
        ]
    },
    "몽향침": {
        description: "1명의 적에게 공격력 82.4%의 물리 속성 대미지를 주고, 2턴 동안 12.5%의 기본 확률로 적을 수면 상태에 빠뜨린다.",
        type: "공격",
        target: "단일",
        effects: [
            {
                type: "대미지",
                element: "물리",
                power: 82.4,
                scale: "공격력"
            },
            {
                type: "정신이상",
                status: "수면",
                chance: 12.5,
                duration: 2
            }
        ]
    },
    "망살 러시": {
        description: "모든 적에게 공격력 40.8%의 물리 속성 대미지를 주고, 2턴 동안 6.7%의 기본 확률로 적을 망각 상태에 빠뜨린다.",
        type: "공격",
        target: "전체",
        effects: [
            {
                type: "대미지",
                element: "물리",
                power: 40.8,
                scale: "공격력"
            },
            {
                type: "정신이상",
                status: "망각",
                chance: 6.7,
                duration: 2
            }
        ]
    },
    "피의 축제": {
        description: "모든 적에게 공격력 40.8%의 물리 속성 대미지를 주고, 2턴 동안 2.6%의 기본 확률로 적을 공포 상태에 빠뜨린다.",
        type: "공격",
        target: "전체",
        effects: [
            {
                type: "대미지",
                element: "물리",
                power: 40.8,
                scale: "공격력"
            },
            {
                type: "정신이상",
                status: "공포",
                chance: 2.6,
                duration: 2
            }
        ]
    },
    "마인드 슬라이스": {
        description: "모든 적에게 공격력 40.8%의 물리 속성 대미지를 주고, 2턴 동안 3.4%의 기본 확률로 적을 혼란 상태에 빠뜨린다.",
        type: "공격",
        target: "전체",
        effects: [
            {
                type: "대미지",
                element: "물리",
                power: 40.8,
                scale: "공격력"
            },
            {
                type: "정신이상",
                status: "혼란",
                chance: 3.4,
                duration: 2
            }
        ]
    },
    "도르민 러시": {
        description: "모든 적에게 공격력 40.8%의 물리 속성 대미지를 주고, 2턴 동안 4.5%의 기본 확률로 적을 수면 상태에 빠뜨린다.",
        type: "공격",
        target: "전체",
        effects: [
            {
                type: "대미지",
                element: "물리",
                power: 40.8,
                scale: "공격력"
            },
            {
                type: "정신이상",
                status: "수면",
                chance: 4.5,
                duration: 2
            }
        ]
    },
    "박치기": {
        description: "1명의 적에게 공격력 82.4%의 물리 속성 대미지를 주고, 2턴 동안 18.7%의 기본 확률로 적을 망각 상태에 빠뜨린다.",
        type: "공격",
        target: "단일",
        effects: [
            {
                type: "대미지",
                element: "물리",
                power: 82.4,
                scale: "공격력"
            },
            {
                type: "정신이상",
                status: "망각",
                chance: 18.7,
                duration: 2
            }
        ]
    },
    "브레인 버스터": {
        description: "모든 적에게 공격력 40.8%의 물리 속성 대미지를 주고, 2턴 동안 1.7%의 기본 확률로 적을 세뇌 상태에 빠뜨린다.",
        type: "공격",
        target: "전체",
        effects: [
            {
                type: "대미지",
                element: "물리",
                power: 40.8,
                scale: "공격력"
            },
            {
                type: "정신이상",
                status: "세뇌",
                chance: 1.7,
                duration: 2
            }
        ]
    },
    "지탄": {
        description: "1명의 적에게 공격력 92.2%의 총격 속성 대미지를 주고, 크리티컬 확률이 16% 증가한다.",
        type: "공격",
        target: "단일",
        effects: [
            {
                type: "대미지",
                element: "총격",
                power: 92.2,
                scale: "공격력",
                critRate: 16
            }
        ]
    },
    "원 샷 킬": {
        description: "1명의 적에게 공격 포인트 107.5%의 총격 속성 대미즈를 주고, 크리티컬 확률이 20% 증가한다.",
        type: "공격",
        target: "단일",
        effects: [
            {
                type: "대미지",
                element: "총격",
                power: 107.5,
                scale: "공격력",
                critRate: 20
            }
        ]
    },
    "트리플 다운": {
        description: "모든 적에게 공격력 14.9%의 총격 속성 대미지를 3회 입히고, 크리티컬 확률이 16% 증가하며 명중률은 15% 감소한다.",
        type: "공격",
        target: "전체",
        effects: [
            {
                type: "대미지",
                element: "총격",
                power: 14.9,
                scale: "공격력",
                hits: 3,
                critRate: 16,
                accuracy: -15
            }
        ]
    },
    "디아": {
        description: "동료 1명이 공격력 33.1%+1001의 생명을 회복한다.",
        type: "회복",
        target: "단일",
        effects: [
            {
                type: "회복",
                power: 33.1,
                scale: "공격력",
                flat: 1001
            }
        ]
    },
    "디아라마": {
        description: "동료 1명이 공격력 35.6%+1077의 생명을 회복한다.",
        type: "회복",
        target: "단일",
        effects: [
            {
                type: "회복",
                power: 35.6,
                scale: "공격력",
                flat: 1077
            }
        ]
    },
    "메디아": {
        description: "모든 동료가 공격력 16.6%+502의 생명을 회복한다.",
        type: "회복",
        target: "전체",
        effects: [
            {
                type: "회복",
                power: 16.6,
                scale: "공격력",
                flat: 502
            }
        ]
    },
    "메디라마": {
        description: "모든 동료가 공격력 17.8%+538의 생명을 회복한다.",
        type: "회복",
        target: "전체",
        effects: [
            {
                type: "회복",
                power: 17.8,
                scale: "공격력",
                flat: 538
            }
        ]
    },
    "메디아라한": {
        description: "모든 동료가 공격력 19.0%+575의 생명을 회복한다.",
        type: "회복",
        target: "전체",
        effects: [
            {
                type: "회복",
                power: 19.0,
                scale: "공격력",
                flat: 575
            }
        ]
    },
    "우로스": {
        description: "동료 1명의 공격력 25.7%+777의 생명을 회복하고, 원소 이상 효과 1개를 제거한다.",
        type: "회복",
        target: "단일",
        effects: [
            {
                type: "회복",
                power: 25.7,
                scale: "공격력",
                flat: 777
            },
            {
                type: "상태해제",
                category: "원소이상",
                count: 1
            }
        ]
    },
    "파트라": {
        description: "동료 1명의 현기증, 수면, 망각 효과를 제거한다.",
        type: "지원",
        target: "단일",
        effects: [
            {
                type: "상태해제",
                status: ["현기증", "수면", "망각"]
            }
        ]
    },
    "바이스디": {
        description: "동료 1명의 화상, 동결, 감전, 풍습 효과를 제거한다.",
        type: "지원",
        target: "단일",
        effects: [
            {
                type: "상태해제",
                status: ["화상", "동결", "감전", "풍습"]
            }
        ]
    },
    "에너지 드롭": {
        description: "동료 1명의 혼란, 공포, 절망, 광노, 세뇌 효과를 제거한다.",
        type: "지원",
        target: "단일",
        effects: [
            {
                type: "상태해제",
                status: ["혼란", "공포", "절망", "광노", "세뇌"]
            }
        ]
    },
    "데카쟈": {
        description: "모든 적의 속성 증가 효과 1개를 제거한다.",
        type: "지원",
        target: "전체",
        effects: [
            {
                type: "버프해제",
                target: "적",
                category: "속성증가",
                count: 1
            }
        ]
    },
    "데쿤다": {
        description: "모든 동료의 속성 감소 효과를 1개 제거한다.",
        type: "지원",
        target: "전체",
        effects: [
            {
                type: "디버프해제",
                target: "아군",
                category: "속성감소",
                count: 1
            }
        ]
    },
    "타루카쟈": {
        description: "동료 1명의 공격력이 15.5% 증가하고, 자신의 공격력 500포인트마다 1.3% 추가 증가한다. 상한은 10.4%이며, 효과는 3턴 동안 지속된다.",
        type: "지원",
        target: "단일",
        effects: [
            {
                type: "버프",
                stat: "공격력",
                baseValue: 15.5,
                scaleValue: 1.3,
                scalePer: 500,
                maxValue: 10.4,
                duration: 3
            }
        ]
    },
    "마하타루카쟈": {
        description: "모든 동료의 공격력이 10.9% 증가하고, 자신의 공격력 500포인트마다 0.9% 추가 증가한다. 상한은 7.2%이며, 효과는 3턴 동안 지속된다.",
        type: "지원",
        target: "전체",
        effects: [
            {
                type: "버프",
                stat: "공격력",
                baseValue: 10.9,
                scaleValue: 0.9,
                scalePer: 500,
                maxValue: 7.2,
                duration: 3
            }
        ]
    },
    "라쿠카쟈": {
        description: "동료 1명의 방어력이 23.3% 증가하고, 자신의 방어력 500마다 3.9% 추가 증가한다. 상한은 15.6%이며, 효과는 3턴 동안 지속된다.",
        type: "지원",
        target: "단일",
        effects: [
            {
                type: "버프",
                stat: "방어력",
                baseValue: 23.3,
                scaleValue: 3.9,
                scalePer: 500,
                maxValue: 15.6,
                duration: 3
            }
        ]
    },
    "마하라쿠카쟈": {
        description: "모든 동료의 방어력이 16.3% 증가하고, 자신의 방어력 500마다 2.7% 추가 증가한다. 상한은 10.8%이며, 효과는 3턴 동안 지속된다.",
        type: "지원",
        target: "전체",
        effects: [
            {
                type: "버프",
                stat: "방어력",
                baseValue: 16.3,
                scaleValue: 2.7,
                scalePer: 500,
                maxValue: 10.8,
                duration: 3
            }
        ]
    },
    "스쿠카쟈": {
        description: "동료 1명의 효과 명중, 효과 저항이 9.3% 증가하고, 자신의 효과 명중 25%마다 1.6% 추가 증가한다. 상한은 6.4%이며, 효과는 3턴 동안 지속된다.",
        type: "지원",
        target: "단일",
        effects: [
            {
                type: "버프",
                stat: ["효과명중", "효과저항"],
                baseValue: 9.3,
                scaleValue: 1.6,
                scalePer: 25,
                maxValue: 6.4,
                duration: 3
            }
        ]
    },
    "마하스쿠카쟈": {
        description: "모든 동료의 효과 명중, 효과 저항이 6.5% 증가하고, 자신의 효과 명중 25%마다 1.1% 추가 증가한다. 상한은 4.4%이며, 효과는 3턴 동안 지속된다.",
        type: "지원",
        target: "전체",
        effects: [
            {
                type: "버프",
                stat: ["효과명중", "효과저항"],
                baseValue: 6.5,
                scaleValue: 1.1,
                scalePer: 25,
                maxValue: 4.4,
                duration: 3
            }
        ]
    },
    "리벨리온": {
        description: "동료 1명의 크리티컬 확률이 9.3% 증가하고, 자신의 크리티컬 확률 10%마다 1.6% 추가 증가한다. 상한은 6.4%이며, 효과는 3턴 동안 지속된다.",
        type: "지원",
        target: "단일",
        effects: [
            {
                type: "버프",
                stat: "크리티컬",
                baseValue: 9.3,
                scaleValue: 1.6,
                scalePer: 10,
                maxValue: 6.4,
                duration: 3
            }
        ]
    },
    "컨센트레이트": {
        description: "자신의 다음 마법 속성 대미지가 52.1% 증가하며 1턴 동안 지속된다.",
        type: "지원",
        target: "자신",
        effects: [
            {
                type: "버프",
                stat: "마법대미지",
                value: 52.1,
                duration: 1,
                nextOnly: true
            }
        ]
    },
    "차지": {
        description: "자신의 다음 물리 속성 대미지가 52.1% 증가하며 1턴 동안 지속된다.",
        type: "지원",
        target: "자신",
        effects: [
            {
                type: "버프",
                stat: "물리대미지",
                value: 52.1,
                duration: 1,
                nextOnly: true
            }
        ]
    },
    "라쿤다": {
        description: "3턴 동안 적 1명의 방어력이 38.8% 감소한다.",
        type: "지원",
        target: "단일",
        effects: [
            {
                type: "디버프",
                stat: "방어력",
                value: -38.8,
                duration: 3
            }
        ]
    },
    "마하라쿤다": {
        description: "3턴 동안 모든 적의 방어력이 27.1% 감소한다.",
        type: "지원",
        target: "전체",
        effects: [
            {
                type: "디버프",
                stat: "방어력",
                value: -27.1,
                duration: 3
            }
        ]
    },
    "음률의 침입": {
        description: "3턴 동안 모든 적의 방어력이 32.0% 감소하고, 받는 대미지를 10% 증가시킨다.",
        type: "지원",
        target: "전체",
        effects: [
            {
                type: "디버프",
                stat: "방어력",
                value: -32.0,
                duration: 3
            },
            {
                type: "디버프",
                stat: "대미지",
                value: 10,
                duration: 3
            }
        ]
    },
    "타룬다": {
        description: "3턴 동안 적 1명의 공격력이 25.8% 감소한다.",
        type: "지원",
        target: "단일",
        effects: [
            {
                type: "디버프",
                stat: "공격력",
                value: -25.8,
                duration: 3
            }
        ]
    }
}