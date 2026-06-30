// ===== USJ クルーバス時刻表アプリ =====

// ===== データ定義 =====
const STOPS_DATA = {
  north: [
    { id: "cs", name: "クルーサービス棟", lat: 34.6635, lng: 135.4350, shared: true },
    { id: "jp", name: "JPビル", lat: 34.6654, lng: 135.4323 },
    { id: "westcart", name: "ウエストカート", lat: 34.6660, lng: 135.4315 },
    { id: "wtw", name: "WTW", lat: 34.6667, lng: 135.4308 },
    { id: "fj", name: "FJ裏", lat: 34.6672, lng: 135.4298 },
    { id: "uwl", name: "UWL", lat: 34.6678, lng: 135.4288 },
    { id: "deck", name: "デッキオフィス", lat: 34.6640, lng: 135.4340, shared: true }
  ],
  south: [
    { id: "cs", name: "クルーサービス棟", lat: 34.6635, lng: 135.4350, shared: true },
    { id: "parade", name: "パレード倉庫", lat: 34.6605, lng: 135.4390 },
    { id: "gate4", name: "Gate4前", lat: 34.6612, lng: 135.4380 },
    { id: "sfr", name: "SFR", lat: 34.6620, lng: 135.4370 },
    { id: "stage33", name: "Stage33", lat: 34.6628, lng: 135.4360 },
    { id: "deck", name: "デッキオフィス", lat: 34.6640, lng: 135.4340, shared: true }
  ]
};

// 停留所IDからルートを判定するマップ
const STOP_ROUTE_MAP = {
  cs: 'both', jp: 'north', westcart: 'north', wtw: 'north', fj: 'north', uwl: 'north',
  deck: 'both', parade: 'south', gate4: 'south', sfr: 'south', stage33: 'south'
};

// 方向ラベル
const DIRECTION_LABELS = {
  north: { toDeck: "デッキ行き", toCS: "CS棟行き" },
  south: { toDeck: "デッキ行き", toCS: "CS棟行き" }
};

// ルート順序（運休設定用：始発→終点）
const ROUTE_ORDER = {
  north: { toDeck: ["cs", "jp", "westcart", "wtw", "fj", "uwl", "deck"], toCS: ["deck", "uwl", "fj", "wtw", "westcart", "jp", "cs"] },
  south: { toDeck: ["cs", "parade", "gate4", "sfr", "stage33", "deck"], toCS: ["deck", "stage33", "sfr", "gate4", "parade", "cs"] }
};

const TIMETABLE = {
  "cs": {
    "18": {
      "toDeck": {
        "6": [0, 10, 20, 30, 40, 50],
        "7": [0, 10, 20, 30, 40, 50],
        "8": [0, 10, 20, 30, 40, 50],
        "9": [0, 10, 20, 30, 40, 50],
        "10": [0, 10, 20, 30, 40, 50],
        "11": [0, 15, 30, 45],
        "12": [0, 10, 20, 30, 40, 50],
        "13": [0, 10, 20, 30, 40, 50],
        "14": [0, 10, 20, 30, 40, 50],
        "15": [0, 10, 20, 30, 40, 50],
        "16": [0, 10, 20, 30, 40, 50],
        "17": [0, 10, 20, 30, 40, 50],
        "18": [0, 10, 20, 30, 40, 50],
        "19": [0, 10, 20, 30, 40, 50],
        "20": [0, 10, 20, 30, 40, 50],
      },
      "toCS": {
        "6": [3, 13, 23, 33, 43, 53],
        "7": [3, 13, 23, 33, 43, 53],
        "8": [3, 13, 23, 33, 43, 53],
        "9": [3, 13, 23, 33, 43, 53],
        "10": [3, 13, 23, 33, 43, 53],
        "11": [13, 28, 43, 58],
        "12": [3, 13, 23, 33, 43, 53],
        "13": [3, 13, 23, 33, 43, 53],
        "14": [3, 13, 23, 33, 43, 53],
        "15": [3, 13, 23, 33, 43, 53],
        "16": [3, 13, 23, 33, 43, 53],
        "17": [3, 13, 23, 33, 43, 53],
        "18": [3, 13, 23, 33, 43, 53],
        "19": [3, 13, 23, 33, 43, 53],
        "20": [3, 13, 23, 33, 43, 53],
      },
    },
    "19": {
      "toDeck": {
        "21": [0, 15, 30, 45],
        "22": [0, 15, 30, 45],
      },
      "toCS": {
        "21": [13, 28, 43, 58],
        "22": [13, 28, 43, 58],
      },
    },
    "20": {
      "toDeck": {
        "21": [0, 10, 20, 30, 40, 50],
        "22": [0, 15, 30, 45],
      },
      "toCS": {
        "21": [3, 13, 23, 33, 43, 53],
        "22": [13, 28, 43, 58],
      },
    },
    "21": {
      "toDeck": {
        "21": [0, 10, 20, 30, 40, 50],
        "22": [0, 10, 20, 30, 40, 50],
        "23": [0, 10, 20, 30, 40, 50],
      },
      "toCS": {
        "21": [3, 13, 23, 33, 43, 53],
        "22": [3, 13, 23, 33, 43, 53],
        "23": [3, 13, 23, 33, 43, 53],
      },
    },
    "22": {
      "toDeck": {
        "21": [0, 10, 20, 30, 40, 50],
        "22": [0, 10, 20, 30, 40, 50],
        "23": [0, 10, 20, 30, 40, 50],
        "24": [0, 15],
      },
      "toCS": {
        "21": [3, 13, 23, 33, 43, 53],
        "22": [3, 13, 23, 33, 43, 53],
        "23": [3, 13, 23, 33, 43, 53],
        "24": [3, 13],
      },
    },
  },
  "jp": {
    "18": {
      "toDeck": {
        "6": [4, 14, 24, 34, 44, 54],
        "7": [4, 14, 24, 34, 44, 54],
        "8": [4, 14, 24, 34, 44, 54],
        "9": [4, 14, 24, 34, 44, 54],
        "10": [4, 14, 24, 34, 44, 54],
        "11": [14, 29, 44, 59],
        "12": [5, 20, 35, 50],
        "13": [5, 20, 35, 50],
        "14": [5, 20, 35, 50],
        "15": [5, 20, 35, 50],
        "16": [4, 14, 24, 34, 44, 54],
        "17": [4, 14, 24, 34, 44, 54],
        "18": [4, 14, 24, 34, 44, 54],
        "19": [4, 14, 24, 34, 44, 54],
        "20": [4, 14, 24, 34, 44, 54],
      },
      "toCS": {
        "6": [23, 33, 43, 53],
        "7": [3, 13, 23, 33, 43, 53],
        "8": [3, 13, 23, 33, 43, 53],
        "9": [3, 13, 23, 33, 43, 53],
        "10": [3, 13, 23, 33, 43, 53],
        "11": [3, 20, 33, 48],
        "12": [5, 20, 35, 50],
        "13": [5, 20, 35, 50],
        "14": [5, 20, 35, 50],
        "15": [5, 20, 35, 50],
        "16": [5, 13, 23, 33, 43, 53],
        "17": [3, 13, 23, 33, 43, 53],
        "18": [3, 13, 23, 33, 43, 53],
        "19": [3, 13, 23, 33, 43, 53],
        "20": [3, 13, 23, 33, 43, 53],
      },
    },
    "19": {
      "toDeck": {
        "21": [14, 29, 44, 59],
        "22": [14, 29, 44, 59],
      },
      "toCS": {
        "21": [3, 20, 35, 50],
        "22": [5, 20, 35, 50],
        "23": [5],
      },
    },
    "20": {
      "toDeck": {
        "21": [4, 14, 24, 34, 44, 54],
        "22": [14, 29, 44, 59],
      },
      "toCS": {
        "21": [3, 13, 23, 33, 43, 53],
        "22": [3, 20, 35, 50],
        "23": [5],
      },
    },
    "21": {
      "toDeck": {
        "21": [4, 14, 24, 34, 44, 54],
        "22": [4, 14, 24, 34, 44, 54],
        "23": [4, 14, 24, 34, 44, 54],
      },
      "toCS": {
        "21": [3, 13, 23, 33, 43, 53],
        "22": [3, 13, 23, 33, 43, 53],
        "23": [3, 13, 23, 33, 43, 53],
      },
    },
    "22": {
      "toDeck": {
        "21": [4, 14, 24, 34, 44, 54],
        "22": [4, 14, 24, 34, 44, 54],
        "23": [4, 14, 24, 34, 44, 54],
        "24": [4, 14],
      },
      "toCS": {
        "21": [3, 13, 23, 33, 43, 53],
        "22": [3, 13, 23, 33, 43, 53],
        "23": [3, 13, 23, 33, 43, 53],
        "24": [3, 23, 33],
      },
    },
  },
  "westcart": {
    "18": {
      "toDeck": {
        "6": [5, 15, 25, 35, 45, 55],
        "7": [5, 15, 25, 35, 45, 55],
        "8": [5, 15, 25, 35, 45, 55],
        "9": [5, 15, 25, 35, 45, 55],
        "10": [5, 15, 25, 35, 45, 55],
        "11": [15, 30, 45],
        "12": [0, 15, 30, 45],
        "13": [0, 15, 30, 45],
        "14": [0, 15, 30, 45],
        "15": [0, 15, 30, 45],
        "16": [0, 5, 15, 25, 35, 45, 55],
        "17": [5, 15, 25, 35, 45, 55],
        "18": [5, 15, 25, 35, 45, 55],
        "19": [5, 15, 25, 35, 45, 55],
        "20": [5, 15, 25, 35, 45, 55],
      },
      "toCS": {
        "6": [22, 32, 42, 52],
        "7": [2, 12, 22, 32, 42, 52],
        "8": [2, 12, 22, 32, 42, 52],
        "9": [2, 12, 22, 32, 42, 52],
        "10": [2, 12, 22, 32, 42, 52],
        "11": [19, 34, 49],
        "12": [4, 19, 34, 49],
        "13": [4, 19, 34, 49],
        "14": [4, 19, 34, 49],
        "15": [4, 19, 34, 49],
        "16": [4, 12, 22, 32, 42, 52],
        "17": [2, 12, 22, 32, 42, 52],
        "18": [2, 12, 22, 32, 42, 52],
        "19": [2, 12, 22, 32, 42, 52],
        "20": [2, 12, 22, 32, 42, 52],
      },
    },
    "19": {
      "toDeck": {
        "21": [15, 30, 45],
        "22": [0, 15, 30, 45],
        "23": [0],
      },
      "toCS": {
        "21": [2, 19, 34, 49],
        "22": [4, 19, 34, 49],
        "23": [4],
      },
    },
    "20": {
      "toDeck": {
        "21": [5, 15, 25, 35, 45, 55],
        "22": [15, 30, 45],
        "23": [0],
      },
      "toCS": {
        "21": [2, 12, 22, 32, 42, 52],
        "22": [2, 19, 34, 49],
        "23": [4],
      },
    },
    "21": {
      "toDeck": {
        "21": [5, 15, 25, 35, 45, 55],
        "22": [5, 15, 25, 35, 45, 55],
        "23": [5, 15, 25, 35, 45, 55],
      },
      "toCS": {
        "21": [2, 12, 22, 32, 42, 52],
        "22": [2, 12, 22, 32, 42, 52],
        "23": [2, 12, 22, 32, 42, 52],
      },
    },
    "22": {
      "toDeck": {
        "21": [5, 15, 25, 35, 45, 55],
        "22": [5, 15, 25, 35, 45, 55],
        "23": [5, 15, 25, 35, 45, 55],
        "24": [5, 15],
      },
      "toCS": {
        "21": [2, 12, 22, 32, 42, 52],
        "22": [2, 12, 22, 32, 42, 52],
        "23": [2, 12, 22, 32, 42, 52],
        "24": [2, 22, 32],
      },
    },
  },
  "wtw": {
    "18": {
      "toDeck": {
        "6": [7, 17, 27, 37, 47, 57],
        "7": [7, 17, 27, 37, 47, 57],
        "8": [7, 17, 27, 37, 47, 57],
        "9": [7, 17, 27, 37, 47, 57],
        "10": [7, 17, 27, 37, 47, 57],
        "11": [17, 32, 47],
        "12": [2, 17, 32, 47],
        "13": [2, 17, 32, 47],
        "14": [2, 17, 32, 47],
        "15": [2, 17, 32, 47],
        "16": [2, 7, 17, 27, 37, 47, 57],
        "17": [7, 17, 27, 37, 47, 57],
        "18": [7, 17, 27, 37, 47, 57],
        "19": [7, 17, 27, 37, 47, 57],
        "20": [7, 17, 27, 37, 47, 57],
      },
      "toCS": {
        "6": [20, 30, 40, 50],
        "7": [0, 10, 20, 30, 40, 50],
        "8": [0, 10, 20, 30, 40, 50],
        "9": [0, 10, 20, 30, 40, 50],
        "10": [0, 10, 20, 30, 40, 50],
        "11": [17, 32, 47],
        "12": [2, 17, 32, 47],
        "13": [2, 17, 32, 47],
        "14": [2, 17, 32, 47],
        "15": [2, 17, 32, 47],
        "16": [2, 10, 20, 30, 40, 50],
        "17": [0, 10, 20, 30, 40, 50],
        "18": [0, 10, 20, 30, 40, 50],
        "19": [0, 10, 20, 30, 40, 50],
        "20": [0, 10, 20, 30, 40, 50],
      },
    },
    "19": {
      "toDeck": {
        "21": [17, 32, 47],
        "22": [2, 17, 32, 47],
        "23": [2],
      },
      "toCS": {
        "21": [0, 17, 32, 47],
        "22": [2, 17, 32, 47],
        "23": [2],
      },
    },
    "20": {
      "toDeck": {
        "21": [7, 17, 27, 37, 47, 57],
        "22": [17, 32, 47],
        "23": [2],
      },
      "toCS": {
        "21": [0, 10, 20, 30, 40, 50],
        "22": [0, 17, 32, 47],
        "23": [2],
      },
    },
    "21": {
      "toDeck": {
        "21": [7, 17, 27, 37, 47, 57],
        "22": [7, 17, 27, 37, 47, 57],
        "23": [7, 17, 27, 37, 47, 57],
      },
      "toCS": {
        "21": [0, 10, 20, 30, 40, 50],
        "22": [0, 10, 20, 30, 40, 50],
        "23": [0, 10, 20, 30, 40, 50],
      },
    },
    "22": {
      "toDeck": {
        "21": [7, 17, 27, 37, 47, 57],
        "22": [7, 17, 27, 37, 47, 57],
        "23": [7, 17, 27, 37, 47, 57],
        "24": [7, 17],
      },
      "toCS": {
        "21": [0, 10, 20, 30, 40, 50],
        "22": [0, 10, 20, 30, 40, 50],
        "23": [0, 10, 20, 30, 40, 50],
        "24": [0, 20, 30],
      },
    },
  },
  "fj": {
    "18": {
      "toDeck": {
        "6": [9, 19, 29, 39, 49, 59],
        "7": [9, 19, 29, 39, 49, 59],
        "8": [9, 19, 29, 39, 49, 59],
        "9": [9, 19, 29, 39, 49, 59],
        "10": [9, 19, 29, 39, 49, 59],
        "11": [19, 34, 49],
        "12": [4, 19, 34, 49],
        "13": [4, 19, 34, 49],
        "14": [4, 19, 34, 49],
        "15": [4, 19, 34, 49],
        "16": [4, 9, 19, 29, 39, 49, 59],
        "17": [9, 19, 29, 39, 49, 59],
        "18": [9, 19, 29, 39, 49, 59],
        "19": [9, 19, 29, 39, 49, 59],
        "20": [9, 19, 29, 39, 49, 59],
      },
      "toCS": {
        "6": [18, 28, 38, 48, 58],
        "7": [8, 18, 28, 38, 48, 58],
        "8": [8, 18, 28, 38, 48, 58],
        "9": [8, 18, 28, 38, 48, 58],
        "10": [8, 18, 28, 38, 48, 58],
        "11": [15, 30, 45],
        "12": [0, 15, 30, 45],
        "13": [0, 15, 30, 45],
        "14": [0, 15, 30, 45],
        "15": [0, 15, 30, 45],
        "16": [0, 8, 18, 28, 38, 48, 58],
        "17": [8, 18, 28, 38, 48, 58],
        "18": [8, 18, 28, 38, 48, 58],
        "19": [8, 18, 28, 38, 48, 58],
        "20": [8, 18, 28, 38, 48, 58],
      },
    },
    "19": {
      "toDeck": {
        "21": [19, 34, 49],
        "22": [4, 19, 34, 49],
        "23": [4],
      },
      "toCS": {
        "21": [15, 30, 45],
        "22": [0, 15, 30, 45],
        "23": [0],
      },
    },
    "20": {
      "toDeck": {
        "21": [9, 19, 29, 39, 49, 59],
        "22": [19, 34, 49],
        "23": [4],
      },
      "toCS": {
        "21": [8, 18, 28, 38, 48, 58],
        "22": [15, 30, 45],
        "23": [0],
      },
    },
    "21": {
      "toDeck": {
        "21": [9, 19, 29, 39, 49, 59],
        "22": [9, 19, 29, 39, 49, 59],
        "23": [9, 19, 29, 39, 49, 59],
      },
      "toCS": {
        "21": [8, 18, 28, 38, 48, 58],
        "22": [8, 18, 28, 38, 48, 58],
        "23": [8, 18, 28, 38, 48, 58],
      },
    },
    "22": {
      "toDeck": {
        "21": [9, 19, 29, 39, 49, 59],
        "22": [9, 19, 29, 39, 49, 59],
        "23": [9, 19, 29, 39, 49, 59],
        "24": [9, 19],
      },
      "toCS": {
        "21": [8, 18, 28, 38, 48, 58],
        "22": [8, 18, 28, 38, 48, 58],
        "23": [8, 18, 28, 38, 48, 58],
        "24": [18, 28],
      },
    },
  },
  "uwl": {
    "18": {
      "toDeck": {
        "6": [10, 20, 30, 40, 50],
        "7": [0, 10, 20, 30, 40, 50],
        "8": [0, 10, 20, 30, 40, 50],
        "9": [0, 10, 20, 30, 40, 50],
        "10": [0, 10, 20, 30, 40, 50],
        "11": [0, 20, 35, 50],
        "12": [5, 20, 35, 50],
        "13": [5, 20, 35, 50],
        "14": [5, 20, 35, 50],
        "15": [5, 20, 35, 50],
        "16": [5, 10, 20, 30, 40, 50],
        "17": [0, 10, 20, 30, 40, 50],
        "18": [0, 10, 20, 30, 40, 50],
        "19": [0, 10, 20, 30, 40, 50],
        "20": [0, 10, 20, 30, 40, 50],
      },
      "toCS": {
        "6": [17, 27, 37, 47, 57],
        "7": [7, 17, 27, 37, 47, 57],
        "8": [7, 17, 27, 37, 47, 57],
        "9": [7, 17, 27, 37, 47, 57],
        "10": [7, 17, 27, 37, 47, 57],
        "11": [14, 29, 44, 59],
        "12": [14, 29, 44, 59],
        "13": [14, 29, 44, 59],
        "14": [14, 29, 44, 59],
        "15": [14, 29, 44, 59],
        "16": [7, 17, 27, 37, 47, 57],
        "17": [7, 17, 27, 37, 47, 57],
        "18": [7, 17, 27, 37, 47, 57],
        "19": [7, 17, 27, 37, 47, 57],
        "20": [7, 17, 27, 37, 47, 57],
      },
    },
    "19": {
      "toDeck": {
        "21": [0, 10, 20, 30, 40, 50],
        "22": [5, 20, 35, 50],
        "23": [5],
      },
      "toCS": {
        "21": [14, 29, 44, 59],
        "22": [14, 29, 44, 59],
      },
    },
    "20": {
      "toDeck": {
        "21": [0, 10, 20, 30, 40, 50],
        "22": [0, 20, 35, 50],
        "23": [5],
      },
      "toCS": {
        "21": [7, 17, 27, 37, 47, 57],
        "22": [14, 29, 44, 59],
      },
    },
    "21": {
      "toDeck": {
        "21": [0, 10, 20, 30, 40, 50],
        "22": [0, 10, 20, 30, 40, 50],
        "23": [0, 10, 20, 30, 40, 50],
      },
      "toCS": {
        "21": [7, 17, 27, 37, 47, 57],
        "22": [7, 17, 27, 37, 47, 57],
        "23": [7, 17, 27, 37, 47, 57],
      },
    },
    "22": {
      "toDeck": {
        "21": [0, 10, 20, 30, 40, 50],
        "22": [0, 10, 20, 30, 40, 50],
        "23": [0, 10, 20, 30, 40, 50],
        "24": [0, 10, 20],
      },
      "toCS": {
        "21": [7, 17, 27, 37, 47, 57],
        "22": [7, 17, 27, 37, 47, 57],
        "23": [7, 17, 27, 37, 47, 57],
        "24": [17, 27],
      },
    },
  },
  "deck": {
    "18": {
      "toDeck": {
        "6": [6, 16, 26, 36, 46, 56],
        "7": [6, 16, 26, 36, 46, 56],
        "8": [6, 16, 26, 36, 46, 56],
        "9": [6, 16, 26, 36, 46, 56],
        "10": [6, 16, 26, 36, 46, 56],
        "11": [6, 21, 36, 51],
        "12": [6, 16, 26, 36, 46, 56],
        "13": [6, 16, 26, 36, 46, 56],
        "14": [6, 16, 26, 36, 46, 56],
        "15": [6, 16, 26, 36, 46, 56],
        "16": [6, 16, 26, 36, 46, 56],
        "17": [6, 16, 26, 36, 46, 56],
        "18": [6, 16, 26, 36, 46, 56],
        "19": [6, 16, 26, 36, 46, 56],
        "20": [6, 16, 26, 36, 46, 56],
      },
      "toCS": {
        "6": [16, 26, 36, 46, 56],
        "7": [6, 16, 26, 36, 46, 56],
        "8": [6, 16, 26, 36, 46, 56],
        "9": [6, 16, 26, 36, 46, 56],
        "10": [6, 16, 26, 36, 46, 56],
        "11": [13, 28, 43, 58],
        "12": [6, 16, 26, 36, 46, 56],
        "13": [6, 16, 26, 36, 46, 56],
        "14": [6, 16, 26, 36, 46, 56],
        "15": [6, 16, 26, 36, 46, 56],
        "16": [6, 16, 26, 36, 46, 56],
        "17": [6, 16, 26, 36, 46, 56],
        "18": [6, 16, 26, 36, 46, 56],
        "19": [6, 16, 26, 36, 46, 56],
        "20": [6, 16, 26, 36, 46, 56],
      },
    },
    "19": {
      "toDeck": {
        "21": [6, 21, 36, 51],
        "22": [6, 21, 36, 51],
      },
      "toCS": {
        "21": [13, 28, 43, 58],
        "22": [13, 28, 43, 58],
      },
    },
    "20": {
      "toDeck": {
        "21": [6, 16, 26, 36, 46, 56],
        "22": [6, 21, 36, 51],
      },
      "toCS": {
        "21": [6, 16, 26, 36, 46, 56],
        "22": [13, 28, 43, 58],
      },
    },
    "21": {
      "toDeck": {
        "21": [6, 16, 26, 36, 46, 56],
        "22": [6, 16, 26, 36, 46, 56],
        "23": [6, 16, 26, 36, 46, 56],
      },
      "toCS": {
        "21": [6, 16, 26, 36, 46, 56],
        "22": [6, 16, 26, 36, 46, 56],
        "23": [6, 16, 26, 36, 46, 56],
      },
    },
    "22": {
      "toDeck": {
        "21": [6, 16, 26, 36, 46, 56],
        "22": [6, 16, 26, 36, 46, 56],
        "23": [6, 16, 26, 36, 46, 56],
        "24": [6, 21],
      },
      "toCS": {
        "21": [6, 16, 26, 36, 46, 56],
        "22": [6, 16, 26, 36, 46, 56],
        "23": [6, 16, 26, 36, 46, 56],
        "24": [16, 26],
      },
    },
  },
  "parade": {
    "18": {
      "toDeck": {
        "6": [1, 11, 21, 31, 41, 51],
        "7": [1, 11, 21, 31, 41, 51],
        "8": [1, 11, 21, 31, 41, 51],
        "9": [1, 11, 21, 31, 41, 51],
        "10": [1, 11, 21, 31, 41, 51],
        "11": [1, 16, 31, 46],
        "12": [1, 11, 21, 31, 41, 51],
        "13": [1, 11, 21, 31, 41, 51],
        "14": [1, 11, 21, 31, 41, 51],
        "15": [1, 11, 21, 31, 41, 51],
        "16": [1, 11, 21, 31, 41, 51],
        "17": [1, 11, 21, 31, 41, 51],
        "18": [1, 11, 21, 31, 41, 51],
        "19": [1, 11, 21, 31, 41, 51],
        "20": [1, 11, 21, 31, 41, 51],
      },
      "toCS": {
        "6": [10, 20, 30, 40, 50],
        "7": [0, 10, 20, 30, 40, 50],
        "8": [0, 10, 20, 30, 40, 50],
        "9": [0, 10, 20, 30, 40, 50],
        "10": [0, 10, 20, 30, 40, 50],
        "11": [10, 25, 40, 55],
        "12": [0, 10, 20, 30, 40, 50],
        "13": [0, 10, 20, 30, 40, 50],
        "14": [0, 10, 20, 30, 40, 50],
        "15": [0, 10, 20, 30, 40, 50],
        "16": [0, 10, 20, 30, 40, 50],
        "17": [0, 10, 20, 30, 40, 50],
        "18": [0, 10, 20, 30, 40, 50],
        "19": [0, 10, 20, 30, 40, 50],
        "20": [0, 10, 20, 30, 40, 50],
      },
    },
    "19": {
      "toDeck": {
        "21": [1, 16, 31, 46],
        "22": [1, 16, 31, 46],
      },
      "toCS": {
        "21": [0, 10, 25, 40, 55],
        "22": [10, 25, 40, 55],
      },
    },
    "20": {
      "toDeck": {
        "21": [1, 11, 21, 31, 41, 51],
        "22": [1, 16, 31, 40],
      },
      "toCS": {
        "21": [0, 10, 20, 30, 40, 50],
        "22": [0, 10, 25, 40, 55],
      },
    },
    "21": {
      "toDeck": {
        "21": [1, 11, 21, 31, 41, 51],
        "22": [1, 11, 21, 31, 41, 51],
        "23": [1, 11, 21, 31, 41, 51],
      },
      "toCS": {
        "21": [0, 10, 20, 30, 40, 50],
        "22": [0, 10, 20, 30, 40, 50],
        "23": [0, 10, 20, 30, 40, 50],
      },
    },
    "22": {
      "toDeck": {
        "21": [1, 11, 21, 31, 41, 51],
        "22": [1, 11, 21, 31, 41, 51],
        "23": [1, 11, 21, 31, 41, 51],
        "24": [1, 16],
      },
      "toCS": {
        "21": [0, 10, 20, 30, 40, 50],
        "22": [0, 10, 20, 30, 40, 50],
        "23": [0, 10, 20, 30, 40, 50],
        "24": [0, 10, 25],
      },
    },
  },
  "gate4": {
    "18": {
      "toDeck": {
        "6": [2, 12, 22, 32, 42, 52],
        "7": [2, 12, 22, 32, 42, 52],
        "8": [2, 12, 22, 32, 42, 52],
        "9": [2, 12, 22, 32, 42, 52],
        "10": [2, 12, 22, 32, 42, 52],
        "11": [2, 17, 32, 47],
        "12": [2, 12, 22, 32, 42, 52],
        "13": [2, 12, 22, 32, 42, 52],
        "14": [2, 12, 22, 32, 42, 52],
        "15": [2, 12, 22, 32, 42, 52],
        "16": [2, 12, 22, 32, 42, 52],
        "17": [2, 12, 22, 32, 42, 52],
        "18": [2, 12, 22, 32, 42, 52],
        "19": [2, 12, 22, 32, 42, 52],
        "20": [2, 12, 22, 32, 42, 52],
      },
      "toCS": {
        "6": [9, 19, 29, 39, 49, 59],
        "7": [9, 19, 29, 39, 49, 59],
        "8": [9, 19, 29, 39, 49, 59],
        "9": [9, 19, 29, 39, 49, 59],
        "10": [9, 19, 29, 39, 49, 59],
        "11": [9, 24, 39, 54],
        "12": [9, 19, 29, 39, 49, 59],
        "13": [9, 19, 29, 39, 49, 59],
        "14": [9, 19, 29, 39, 49, 59],
        "15": [9, 19, 29, 39, 49, 59],
        "16": [9, 19, 29, 39, 49, 59],
        "17": [9, 19, 29, 39, 49, 59],
        "18": [9, 19, 29, 39, 49, 59],
        "19": [9, 19, 29, 39, 49, 59],
        "20": [9, 19, 29, 39, 49, 59],
      },
    },
    "19": {
      "toDeck": {
        "21": [2, 17, 32, 47],
        "22": [2, 17, 32, 47],
      },
      "toCS": {
        "21": [9, 24, 39, 54],
        "22": [9, 24, 39, 54],
      },
    },
    "20": {
      "toDeck": {
        "21": [2, 12, 22, 32, 42, 52],
        "22": [2, 17, 32, 47],
      },
      "toCS": {
        "21": [9, 19, 29, 39, 49, 59],
        "22": [9, 24, 39, 59],
      },
    },
    "21": {
      "toDeck": {
        "21": [2, 12, 22, 32, 42, 52],
        "22": [2, 12, 22, 32, 42, 52],
        "23": [2, 12, 22, 32, 42, 52],
      },
      "toCS": {
        "21": [9, 19, 29, 39, 49, 59],
        "22": [9, 19, 29, 39, 49, 59],
        "23": [9, 19, 29, 39, 49, 59],
      },
    },
    "22": {
      "toDeck": {
        "21": [2, 12, 22, 32, 42, 52],
        "22": [2, 12, 22, 32, 42, 52],
        "23": [2, 12, 22, 32, 42, 52],
        "24": [2, 17],
      },
      "toCS": {
        "21": [9, 19, 29, 39, 49, 59],
        "22": [9, 19, 29, 39, 49, 59],
        "23": [9, 19, 29, 39, 49, 59],
        "24": [9, 24],
      },
    },
  },
  "sfr": {
    "18": {
      "toDeck": {
        "6": [3, 13, 23, 33, 43, 53],
        "7": [3, 13, 23, 33, 43, 53],
        "8": [3, 13, 23, 33, 43, 53],
        "9": [3, 13, 23, 33, 43, 53],
        "10": [3, 13, 23, 33, 43, 53],
        "11": [3, 18, 33, 48],
        "12": [3, 13, 23, 33, 43, 53],
        "13": [3, 13, 23, 33, 43, 53],
        "14": [3, 13, 23, 33, 43, 53],
        "15": [3, 13, 23, 33, 43, 53],
        "16": [3, 13, 23, 33, 43, 53],
        "17": [3, 13, 23, 33, 43, 53],
        "18": [3, 13, 23, 33, 43, 53],
        "19": [3, 13, 23, 33, 43, 53],
        "20": [3, 13, 23, 33, 43, 53],
      },
      "toCS": {
        "6": [8, 18, 28, 38, 48, 58],
        "7": [8, 18, 28, 38, 48, 58],
        "8": [8, 18, 28, 38, 48, 58],
        "9": [8, 18, 28, 38, 48, 58],
        "10": [8, 18, 28, 38, 48, 58],
        "11": [8, 23, 38, 53],
        "12": [8, 18, 28, 38, 48, 58],
        "13": [8, 18, 28, 38, 48, 58],
        "14": [8, 18, 28, 38, 48, 58],
        "15": [8, 18, 28, 38, 48, 58],
        "16": [8, 18, 28, 38, 48, 58],
        "17": [8, 18, 28, 38, 48, 58],
        "18": [8, 18, 28, 38, 48, 58],
        "19": [8, 18, 28, 38, 48, 58],
        "20": [8, 18, 28, 38, 48, 58],
      },
    },
    "19": {
      "toDeck": {
        "21": [3, 18, 33, 48],
        "22": [3, 18, 33, 48],
      },
      "toCS": {
        "21": [8, 23, 38, 53],
        "22": [8, 23, 38, 53],
      },
    },
    "20": {
      "toDeck": {
        "21": [3, 13, 23, 33, 43, 53],
        "22": [3, 18, 33, 48],
      },
      "toCS": {
        "21": [8, 18, 28, 38, 48, 58],
        "22": [18, 23, 38, 58],
      },
    },
    "21": {
      "toDeck": {
        "21": [3, 13, 23, 33, 43, 53],
        "22": [3, 13, 23, 33, 43, 53],
        "23": [3, 13, 23, 33, 43, 53],
      },
      "toCS": {
        "21": [8, 18, 28, 38, 48, 58],
        "22": [8, 18, 28, 38, 48, 58],
        "23": [8, 18, 28, 38, 48, 58],
      },
    },
    "22": {
      "toDeck": {
        "21": [3, 13, 23, 33, 43, 53],
        "22": [3, 13, 23, 33, 43, 53],
        "23": [3, 13, 23, 33, 43, 53],
        "24": [3, 18],
      },
      "toCS": {
        "21": [8, 18, 28, 38, 48, 58],
        "22": [8, 18, 28, 38, 48, 58],
        "23": [8, 18, 28, 38, 48, 58],
        "24": [8, 23],
      },
    },
  },
  "stage33": {
    "18": {
      "toDeck": {
        "6": [4, 14, 24, 34, 44, 54],
        "7": [4, 14, 24, 34, 44, 54],
        "8": [4, 14, 24, 34, 44, 54],
        "9": [4, 14, 24, 34, 44, 54],
        "10": [4, 14, 24, 34, 44, 54],
        "11": [4, 19, 34, 49],
        "12": [4, 14, 24, 34, 44, 54],
        "13": [4, 14, 24, 34, 44, 54],
        "14": [4, 14, 24, 34, 44, 54],
        "15": [4, 14, 24, 34, 44, 54],
        "16": [4, 14, 24, 34, 44, 54],
        "17": [4, 14, 24, 34, 44, 54],
        "18": [4, 14, 24, 34, 44, 54],
        "19": [4, 14, 24, 34, 44, 54],
        "20": [4, 14, 24, 34, 44, 54],
      },
      "toCS": {
        "6": [7, 17, 27, 37, 47, 57],
        "7": [7, 17, 27, 37, 47, 57],
        "8": [7, 17, 27, 37, 47, 57],
        "9": [7, 17, 27, 37, 47, 57],
        "10": [7, 17, 27, 37, 47, 57],
        "11": [7, 22, 37, 52],
        "12": [7, 17, 27, 37, 47, 57],
        "13": [7, 17, 27, 37, 47, 57],
        "14": [7, 17, 27, 37, 47, 57],
        "15": [7, 17, 27, 37, 47, 57],
        "16": [7, 17, 27, 37, 47, 57],
        "17": [7, 17, 27, 37, 47, 57],
        "18": [7, 17, 27, 37, 47, 57],
        "19": [7, 17, 27, 37, 47, 57],
        "20": [7, 17, 27, 37, 47, 57],
      },
    },
    "19": {
      "toDeck": {
        "21": [4, 19, 34, 49],
        "22": [4, 19, 34, 49],
      },
      "toCS": {
        "21": [7, 22, 37, 52],
        "22": [7, 22, 37, 52],
      },
    },
    "20": {
      "toDeck": {
        "21": [4, 14, 24, 34, 44, 54],
        "22": [4, 19, 34, 49],
      },
      "toCS": {
        "21": [7, 17, 27, 37, 47, 57],
        "22": [7, 22, 37, 52],
      },
    },
    "21": {
      "toDeck": {
        "21": [4, 14, 24, 34, 44, 54],
        "22": [4, 14, 24, 34, 44, 54],
        "23": [4, 14, 24, 34, 44, 54],
      },
      "toCS": {
        "21": [7, 17, 27, 37, 47, 57],
        "22": [7, 17, 27, 37, 47, 57],
        "23": [7, 17, 27, 37, 47, 57],
      },
    },
    "22": {
      "toDeck": {
        "21": [4, 14, 24, 34, 44, 54],
        "22": [4, 14, 24, 34, 44, 54],
        "23": [4, 14, 24, 34, 44, 54],
        "24": [4, 19],
      },
      "toCS": {
        "21": [7, 17, 27, 37, 47, 57],
        "22": [7, 17, 27, 37, 47, 57],
        "23": [7, 17, 27, 37, 47, 57],
        "24": [7, 22],
      },
    },
  },
};


// ===== 状態管理 =====
const state = {
  currentRoute: 'north',
  currentStop: null,
  currentStopId: null,
  currentDirection: null,
  closingMode: '18',
  gpsEnabled: true,
  notificationEnabled: false,
  favorites: [],  // [{stopId, route, direction}]
  favFilterActive: false,
  lastStop: null,
  customCoords: {},
  debugMode: false,
  after830open: false,
  suspendedTimes: {} // { "north_toDeck_6:00": true, ... } 始発停留所の時刻をキーに
};

// ===== ユーティリティ =====
function nowSeconds() {
  const now = new Date();
  return now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
}

function formatCountdown(diffSeconds) {
  if (diffSeconds < 0) return { text: '発車済', class: 'gray' };
  const min = Math.floor(diffSeconds / 60);
  const sec = diffSeconds % 60;
  if (min >= 10) return { text: `${min}分`, class: 'green' };
  if (min >= 5) return { text: `${min}:${String(sec).padStart(2,'0')}`, class: 'yellow' };
  return { text: `${min}:${String(sec).padStart(2,'0')}`, class: 'red' };
}

function getColorClass(diffMinutes) {
  if (diffMinutes < 0) return 'gray';
  if (diffMinutes >= 10) return 'green';
  if (diffMinutes >= 5) return 'yellow';
  return 'red';
}

function haversineDistance(lat1, lng1, lat2, lng2) {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

// ===== LocalStorage =====
function saveState() {
  const toSave = {
    currentRoute: state.currentRoute,
    currentStop: state.currentStop,
    currentStopId: state.currentStopId,
    closingMode: state.closingMode,
    gpsEnabled: state.gpsEnabled,
    notificationEnabled: state.notificationEnabled,
    favorites: state.favorites,
    favFilterActive: state.favFilterActive,
    lastStop: state.lastStop,
    customCoords: state.customCoords,
    debugMode: state.debugMode,
    currentDirection: state.currentDirection,
    after830open: state.after830open,
    suspendedTimes: state.suspendedTimes
  };
  localStorage.setItem('usjCrewBus', JSON.stringify(toSave));
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem('usjCrewBus'));
    if (saved) {
      Object.assign(state, saved);
      if (state.favorites && state.favorites.length > 0 && typeof state.favorites[0] === 'string') {
        state.favorites = [];
      }
      if (!state.suspendedTimes) state.suspendedTimes = {};
    }
  } catch(e) {}
}

// ===== 方向の取得（停留所に応じて片方のみ表示対応） =====
function getAvailableDirections(stopId) {
  if (stopId === 'deck') return ['toCS'];
  if (stopId === 'cs') return ['toDeck'];
  return ['toDeck', 'toCS'];
}

// ===== 運休判定 =====
// 始発停留所の時刻が運休設定されている場合、同じ便の各停留所も運休とする
function isSuspended(stopId, route, direction, hour, minute) {
  // 始発停留所を特定
  const order = ROUTE_ORDER[route][direction];
  const startStopId = order[0]; // 始発停留所

  // 始発停留所の同じ便の時刻を取得
  const startData = TIMETABLE[startStopId];
  if (!startData) return false;

  // 現在の停留所のインデックスと始発停留所のインデックスの差分から始発時刻を逆算
  const stopIndex = order.indexOf(stopId);
  if (stopIndex < 0) return false;

  // 始発停留所の18時基本ダイヤから対応する時刻を探す
  const baseData = startData['18'];
  if (!baseData || !baseData[direction]) return false;

  // 始発停留所の全時刻を取得
  const startTimes = [];
  const startHourData = baseData[direction];
  for (const h of Object.keys(startHourData)) {
    for (const m of startHourData[h]) {
      startTimes.push({ hour: parseInt(h), minute: m });
    }
  }

  // 現在の停留所の全時刻を取得
  const currentData = TIMETABLE[stopId];
  if (!currentData || !currentData['18'] || !currentData['18'][direction]) return false;
  const currentTimes = [];
  const currentHourData = currentData['18'][direction];
  for (const h of Object.keys(currentHourData)) {
    for (const m of currentHourData[h]) {
      currentTimes.push({ hour: parseInt(h), minute: m });
    }
  }

  // 便のインデックスを特定（時刻順で同じインデックスの便が対応する）
  const currentTimeIndex = currentTimes.findIndex(t => t.hour === hour && t.minute === minute);
  if (currentTimeIndex < 0) return false;

  // 対応する始発時刻
  if (currentTimeIndex >= startTimes.length) return false;
  const startTime = startTimes[currentTimeIndex];
  const key = `${route}_${direction}_${startTime.hour}:${String(startTime.minute).padStart(2, '0')}`;
  return !!state.suspendedTimes[key];
}

// ===== 時刻表取得 =====
function getSchedule(stopId, route, direction, mode) {
  const stopData = TIMETABLE[stopId];
  if (!stopData) return [];

  // 基本ダイヤ（18時モード）を取得
  const baseData = stopData['18'];
  if (!baseData || !baseData[direction]) return [];

  let times = [];

  // 基本ダイヤの全時刻を追加
  const baseHours = baseData[direction];
  for (const h of Object.keys(baseHours).sort((a,b) => Number(a) - Number(b))) {
    for (const m of baseHours[h]) {
      times.push({ hour: parseInt(h), minute: m });
    }
  }

  // 18時モード以外の場合、追加の時刻を追加
  if (mode !== '18') {
    const extData = stopData[mode];
    if (extData && extData[direction]) {
      const extHours = extData[direction];
      for (const h of Object.keys(extHours).sort((a,b) => Number(a) - Number(b))) {
        for (const m of extHours[h]) {
          times.push({ hour: parseInt(h), minute: m });
        }
      }
    }
  }

  // ソート
  times.sort((a, b) => a.hour * 60 + a.minute - (b.hour * 60 + b.minute));

  // 8:30以降オープンの場合、6時台の最初3本を除外
  if (state.after830open) {
    let removed = 0;
    times = times.filter(t => {
      if (t.hour === 6 && removed < 3) {
        removed++;
        return false;
      }
      return true;
    });
  }

  // 運休設定されている便を除外
  times = times.filter(t => !isSuspended(stopId, route, direction, t.hour, t.minute));

  // "H:MM" 形式の文字列配列に変換
  return times.map(t => `${t.hour}:${String(t.minute).padStart(2, '0')}`);
}

function getNextBuses(stopId, route, mode, direction, count = 3) {
  const schedule = getSchedule(stopId, route, direction, mode);
  const nowSec = nowSeconds();
  const buses = [];
  for (const timeStr of schedule) {
    const [h, m] = timeStr.split(':').map(Number);
    const busSec = h * 3600 + m * 60;
    const diff = busSec - nowSec;
    if (diff >= -60) {
      buses.push({ time: timeStr, diffSeconds: diff, direction });
    }
    if (buses.length >= count) break;
  }
  return buses;
}

// ===== UI更新 =====
function updateClock() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('ja-JP', { hour12: false });
  document.getElementById('currentTime').textContent = timeStr;
}

function updateModeBadge() {
  const badge = document.getElementById('modeBadge');
  badge.textContent = `${state.closingMode}時閉園`;
  badge.classList.toggle('south-mode', state.currentRoute === 'south');
}

function renderStopList() {
  const stops = STOPS_DATA[state.currentRoute];
  const container = document.getElementById('stopList');
  container.innerHTML = '';
  const isSouth = state.currentRoute === 'south';

  stops.forEach(stop => {
    // お気に入りフィルターがONの場合
    if (state.favFilterActive) {
      const isFav = state.favorites.some(f => {
        if (f.stopId !== stop.id || f.route !== state.currentRoute) return false;
        if (state.currentDirection && f.direction !== state.currentDirection) return false;
        return true;
      });
      if (!isFav) return;
    }

    const btn = document.createElement('button');
    btn.className = `stop-btn ${isSouth ? 'south-stop' : 'north-stop'}`;
    if (state.currentStopId === stop.id) {
      btn.classList.add('active');
    }
    const isFav = state.favorites.some(f => f.stopId === stop.id);
    if (isFav) btn.classList.add('favorite');
    if (stop.shared) btn.classList.add('shared');
    btn.textContent = stop.name;
    btn.addEventListener('click', () => selectStop(stop));
    container.appendChild(btn);
  });
}

function selectStop(stop) {
  state.currentStopId = stop.id;
  state.currentStop = stop.name;
  state.lastStop = stop.id;

  const directions = getAvailableDirections(stop.id);
  if (!state.currentDirection || !directions.includes(state.currentDirection)) {
    state.currentDirection = directions[0];
  }

  document.querySelector('.stop-name-text').textContent = stop.name;
  saveState();
  renderStopList();
  renderDirectionButtons();
  updateBusInfo();
}

function renderDirectionButtons() {
  const container = document.getElementById('directionButtons');
  container.innerHTML = '';
  if (!state.currentStopId) return;

  const directions = getAvailableDirections(state.currentStopId);
  const labels = DIRECTION_LABELS[state.currentRoute];
  const isSouth = state.currentRoute === 'south';

  container.className = directions.length === 1 ? 'direction-buttons single-direction' : 'direction-buttons';

  directions.forEach(dir => {
    const btn = document.createElement('button');
    btn.className = 'dir-btn';
    if (state.currentDirection === dir) {
      btn.classList.add('active');
      if (isSouth) btn.classList.add('south-active');
    }
    btn.textContent = labels[dir];
    btn.addEventListener('click', () => {
      state.currentDirection = dir;
      saveState();
      renderDirectionButtons();
      renderStopList();
      updateBusInfo();
    });
    container.appendChild(btn);
  });
}

function updateBusInfo() {
  if (!state.currentStopId || !state.currentDirection) {
    document.getElementById('nextBusCountdown').textContent = '--:--';
    document.getElementById('nextBusCountdown').className = 'next-bus-countdown';
    document.getElementById('nextBusTime').textContent = '停留所を選択してください';
    document.getElementById('nextBusDirection').textContent = '';
    document.getElementById('nextBusCard').className = 'next-bus-card';
    document.getElementById('upcomingList').innerHTML = '<div class="no-bus-message">停留所を選択してください</div>';
    return;
  }

  const buses = getNextBuses(state.currentStopId, state.currentRoute, state.closingMode, state.currentDirection, 3);
  const card = document.getElementById('nextBusCard');

  if (buses.length === 0) {
    document.getElementById('nextBusCountdown').textContent = '本日終了';
    document.getElementById('nextBusCountdown').className = 'next-bus-countdown gray';
    document.getElementById('nextBusTime').textContent = '次の便はありません';
    document.getElementById('nextBusDirection').textContent = '';
    card.className = 'next-bus-card gray';
    document.getElementById('upcomingList').innerHTML = '<div class="no-bus-message">本日の運行は終了しました</div>';
    return;
  }

  const nextBus = buses.find(b => b.diffSeconds >= 0) || buses[0];
  const countdown = formatCountdown(nextBus.diffSeconds);

  document.getElementById('nextBusCountdown').textContent = countdown.text;
  document.getElementById('nextBusCountdown').className = `next-bus-countdown ${countdown.class}`;
  document.getElementById('nextBusTime').textContent = `${nextBus.time} 発`;
  document.getElementById('nextBusDirection').textContent = DIRECTION_LABELS[state.currentRoute][state.currentDirection];
  card.className = `next-bus-card ${countdown.class}`;

  // 次便リスト（直近3つ）
  const listContainer = document.getElementById('upcomingList');
  listContainer.innerHTML = '';
  buses.forEach(bus => {
    const item = document.createElement('div');
    const diffMin = Math.floor(bus.diffSeconds / 60);
    const colorClass = bus.diffSeconds < 0 ? 'gray' : getColorClass(diffMin);
    item.className = `upcoming-item ${colorClass}`;
    let remainText;
    if (bus.diffSeconds < 0) remainText = '発車済';
    else if (bus.diffSeconds < 60) remainText = 'まもなく';
    else remainText = `あと${Math.ceil(bus.diffSeconds / 60)}分`;
    item.innerHTML = `
      <div>
        <div class="upcoming-time">${bus.time}</div>
        <div class="upcoming-direction">${DIRECTION_LABELS[state.currentRoute][bus.direction]}</div>
      </div>
      <div class="upcoming-remaining ${colorClass}">${remainText}</div>
    `;
    listContainer.appendChild(item);
  });

  checkNotification(nextBus);

  // 全時刻表が開いている場合は自動更新
  const timetableContainer = document.getElementById('timetableFull');
  if (timetableContainer && !timetableContainer.classList.contains('hidden')) {
    renderFullTimetable();
  }
}

// ===== 全時刻表表示 =====
function renderFullTimetable() {
  if (!state.currentStopId || !state.currentDirection) return;
  const schedule = getSchedule(state.currentStopId, state.currentRoute, state.currentDirection, state.closingMode);
  const container = document.getElementById('timetableFull');
  container.innerHTML = '';
  const isSouth = state.currentRoute === 'south';

  const grouped = {};
  schedule.forEach(time => {
    const hour = time.split(':')[0];
    if (!grouped[hour]) grouped[hour] = [];
    grouped[hour].push(time.split(':')[1]);
  });

  Object.keys(grouped).sort((a,b) => Number(a) - Number(b)).forEach(hour => {
    const div = document.createElement('div');
    div.className = 'timetable-hour';
    div.innerHTML = `
      <div class="timetable-hour-label ${isSouth ? 'south-label' : ''}">${hour}時</div>
      <div class="timetable-minutes">${grouped[hour].join('  ')}</div>
    `;
    container.appendChild(div);
  });
}

// ===== GPS機能 =====
function initGPS() {
  if (!state.gpsEnabled || !navigator.geolocation) {
    fallbackStopSelection();
    return;
  }
  const gpsBtn = document.getElementById('gpsBtn');
  gpsBtn.classList.add('active');
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      gpsBtn.classList.remove('active');
      findNearestStop(pos.coords.latitude, pos.coords.longitude);
    },
    () => {
      gpsBtn.classList.remove('active');
      document.getElementById('gpsInfo').textContent = 'GPS取得失敗';
      fallbackStopSelection();
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
}

function findNearestStop(lat, lng) {
  let nearest = null;
  let minDist = Infinity;
  let nearestRoute = null;
  const allStops = [...STOPS_DATA.north.map(s => ({...s, route: 'north'})), ...STOPS_DATA.south.map(s => ({...s, route: 'south'}))];
  const seen = new Set();
  allStops.forEach(stop => {
    if (seen.has(stop.id)) return;
    seen.add(stop.id);
    const sLat = state.customCoords[stop.id]?.lat || stop.lat;
    const sLng = state.customCoords[stop.id]?.lng || stop.lng;
    const dist = haversineDistance(lat, lng, sLat, sLng);
    if (dist < minDist) {
      minDist = dist;
      nearest = stop;
      // ルートを判定
      const routeInfo = STOP_ROUTE_MAP[stop.id];
      if (routeInfo === 'both') {
        nearestRoute = state.currentRoute; // 共有停留所は現在のルートを維持
      } else {
        nearestRoute = routeInfo;
      }
    }
  });

  const distText = minDist < 1000 ? `${Math.round(minDist)}m` : `${(minDist/1000).toFixed(1)}km`;
  document.getElementById('gpsInfo').textContent = `最寄り: ${nearest.name} (${distText})`;

  if (minDist <= 50) {
    autoSelectWithRoute(nearest, nearestRoute);
  } else if (minDist <= 150) {
    document.getElementById('gpsInfo').textContent += ' - タップで選択';
    document.getElementById('gpsInfo').style.cursor = 'pointer';
    document.getElementById('gpsInfo').onclick = () => autoSelectWithRoute(nearest, nearestRoute);
  } else {
    fallbackStopSelection();
  }
}

function autoSelectWithRoute(stop, route) {
  // ルートを自動切替
  if (route && route !== state.currentRoute) {
    state.currentRoute = route;
    updateRouteTabs();
    renderStopList();
  }
  // 停留所を選択
  const routeStops = STOPS_DATA[state.currentRoute];
  const inRoute = routeStops.find(s => s.id === stop.id);
  if (inRoute) {
    selectStop(inRoute);
  }
}

function fallbackStopSelection() {
  if (state.currentStop) return;

  // 前回利用停留所
  if (state.lastStop) {
    const allStops = [...STOPS_DATA.north, ...STOPS_DATA.south];
    const lastUsed = allStops.find(s => s.id === state.lastStop);
    if (lastUsed) {
      // ルートも復元
      const routeInfo = STOP_ROUTE_MAP[state.lastStop];
      if (routeInfo && routeInfo !== 'both' && routeInfo !== state.currentRoute) {
        state.currentRoute = routeInfo;
        updateRouteTabs();
        renderStopList();
      }
      selectStop(lastUsed);
      return;
    }
  }
  // お気に入りの最初
  if (state.favorites.length > 0) {
    const fav = state.favorites[0];
    const allStops = [...STOPS_DATA.north, ...STOPS_DATA.south];
    const favStop = allStops.find(s => s.id === fav.stopId);
    if (favStop) {
      if (fav.route) {
        state.currentRoute = fav.route;
        updateRouteTabs();
        renderStopList();
      }
      selectStop(favStop);
      if (fav.direction) state.currentDirection = fav.direction;
      return;
    }
  }
  // デフォルト: NORTHのクルーサービス棟
  state.currentRoute = 'north';
  updateRouteTabs();
  renderStopList();
  const defaultStop = STOPS_DATA.north.find(s => s.id === 'cs');
  if (defaultStop) selectStop(defaultStop);
}

// ===== 通知 =====
let lastNotifiedBus = null;
function checkNotification(nextBus) {
  if (!state.notificationEnabled || !nextBus || nextBus.diffSeconds < 0) return;
  if (nextBus.diffSeconds <= 180 && nextBus.diffSeconds > 170) {
    const busKey = `${nextBus.time}-${nextBus.direction}`;
    if (lastNotifiedBus !== busKey) {
      lastNotifiedBus = busKey;
      if (Notification.permission === 'granted') {
        new Notification('クルーバス', {
          body: `${nextBus.time}発 まもなく到着（あと3分）`,
          tag: 'crew-bus-alert'
        });
      }
    }
  }
}

// ===== お気に入り =====
function addFavorite(stopId, route, direction) {
  const exists = state.favorites.some(f => f.stopId === stopId && f.route === route && f.direction === direction);
  if (exists) return;
  state.favorites.push({ stopId, route, direction });
  saveState();
  renderFavorites();
  renderStopList();
}

function removeFavorite(index) {
  state.favorites.splice(index, 1);
  saveState();
  renderFavorites();
  renderStopList();
}

function renderFavorites() {
  const container = document.getElementById('favoritesList');
  if (!container) return;
  container.innerHTML = '';
  const allStops = [...STOPS_DATA.north, ...STOPS_DATA.south];

  state.favorites.forEach((fav, idx) => {
    const stop = allStops.find(s => s.id === fav.stopId);
    if (!stop) return;
    const dirLabel = DIRECTION_LABELS[fav.route || 'north'][fav.direction] || '';
    const routeLabel = (fav.route === 'south') ? 'SOUTH' : 'NORTH';
    const chip = document.createElement('div');
    chip.className = 'fav-chip';
    chip.innerHTML = `
      <div class="fav-chip-info">
        <span class="fav-chip-name">${stop.name}</span>
        <span class="fav-chip-detail">${routeLabel} / ${dirLabel}</span>
      </div>
      <button onclick="removeFavorite(${idx})">✕</button>
    `;
    container.appendChild(chip);
  });
}

// ===== お気に入りフィルター =====
function initFavFilter() {
  const btn = document.getElementById('favFilterBtn');
  btn.classList.toggle('active', state.favFilterActive);
  btn.addEventListener('click', () => {
    state.favFilterActive = !state.favFilterActive;
    btn.classList.toggle('active', state.favFilterActive);
    saveState();
    renderStopList();
  });
}

// ===== 閉園時間ポップアップ =====
function initClosingModePopup() {
  const timeRow = document.getElementById('timeRow');
  const popup = document.getElementById('closingModePopup');

  timeRow.addEventListener('click', () => {
    popup.classList.toggle('hidden');
    updateClosingModeButtons();
  });

  document.addEventListener('click', (e) => {
    if (!timeRow.contains(e.target) && !popup.contains(e.target)) {
      popup.classList.add('hidden');
    }
  });

  document.querySelectorAll('.closing-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      state.closingMode = btn.dataset.mode;
      saveState();
      updateModeBadge();
      updateClosingModeButtons();
      updateBusInfo();
      popup.classList.add('hidden');
    });
  });

  // 8:30以降オープントグル
  const after830Btn = document.getElementById('after830Btn');
  if (after830Btn) {
    after830Btn.classList.toggle('active', state.after830open);
    after830Btn.addEventListener('click', () => {
      state.after830open = !state.after830open;
      after830Btn.classList.toggle('active', state.after830open);
      saveState();
      updateBusInfo();
    });
  }
}

function updateClosingModeButtons() {
  document.querySelectorAll('.closing-opt').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === state.closingMode);
  });
}

// ===== ルートタブ =====
function initRouteTabs() {
  document.querySelectorAll('.route-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      state.currentRoute = tab.dataset.route;
      updateRouteTabs();

      // 共有停留所の場合、選択状態を維持
      if (state.currentStopId) {
        const newRouteStops = STOPS_DATA[state.currentRoute];
        const sharedStop = newRouteStops.find(s => s.id === state.currentStopId);
        if (sharedStop) {
          state.currentStop = sharedStop.name;
        }
      }

      // 方向を新ルートに合わせる
      if (state.currentStopId) {
        const directions = getAvailableDirections(state.currentStopId);
        if (!directions.includes(state.currentDirection)) {
          state.currentDirection = directions[0];
        }
      }

      saveState();
      renderStopList();
      renderDirectionButtons();
      updateModeBadge();
      updateBusInfo();
    });
  });
}

function updateRouteTabs() {
  document.querySelectorAll('.route-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.route === state.currentRoute);
  });
}

// ===== 全時刻表トグル =====
function initTimetableToggle() {
  const btn = document.getElementById('toggleTimetableBtn');
  btn.addEventListener('click', () => {
    const container = document.getElementById('timetableFull');
    container.classList.toggle('hidden');
    const isOpen = !container.classList.contains('hidden');
    btn.classList.toggle('opened', isOpen);
    btn.textContent = isOpen ? '全時刻表を閉じる' : '全時刻表を表示';
    if (isOpen) {
      renderFullTimetable();
    }
  });
}

// ===== 運休時間設定 =====
function initSuspendSettings() {
  const container = document.getElementById('suspendSettingsContent');
  if (!container) return;

  const routeSelect = document.getElementById('suspendRouteSelect');
  const dirSelect = document.getElementById('suspendDirSelect');

  routeSelect.addEventListener('change', () => renderSuspendTimes());
  dirSelect.addEventListener('change', () => renderSuspendTimes());

  renderSuspendTimes();
}

function renderSuspendTimes() {
  const container = document.getElementById('suspendTimesList');
  if (!container) return;
  container.innerHTML = '';

  const route = document.getElementById('suspendRouteSelect').value;
  const direction = document.getElementById('suspendDirSelect').value;

  // 始発停留所の時刻を取得
  const order = ROUTE_ORDER[route][direction];
  const startStopId = order[0];
  const startStopName = STOPS_DATA[route].find(s => s.id === startStopId)?.name || startStopId;

  const startData = TIMETABLE[startStopId];
  if (!startData || !startData['18'] || !startData['18'][direction]) return;

  const baseHours = startData['18'][direction];
  const times = [];
  for (const h of Object.keys(baseHours).sort((a,b) => Number(a) - Number(b))) {
    for (const m of baseHours[h]) {
      times.push({ hour: parseInt(h), minute: m });
    }
  }

  // 始発停留所名を表示
  const headerDiv = document.createElement('div');
  headerDiv.className = 'suspend-header';
  headerDiv.textContent = `始発: ${startStopName} の発車時刻`;
  container.appendChild(headerDiv);

  // 時間帯ごとにグループ化
  const grouped = {};
  times.forEach(t => {
    const hKey = t.hour;
    if (!grouped[hKey]) grouped[hKey] = [];
    grouped[hKey].push(t);
  });

  for (const h of Object.keys(grouped).sort((a,b) => Number(a) - Number(b))) {
    const hourDiv = document.createElement('div');
    hourDiv.className = 'suspend-hour-group';
    hourDiv.innerHTML = `<div class="suspend-hour-label">${h}時</div>`;
    const btnsDiv = document.createElement('div');
    btnsDiv.className = 'suspend-btns';

    grouped[h].forEach(t => {
      const key = `${route}_${direction}_${t.hour}:${String(t.minute).padStart(2, '0')}`;
      const btn = document.createElement('button');
      btn.className = `suspend-time-btn ${state.suspendedTimes[key] ? 'suspended' : ''}`;
      btn.textContent = String(t.minute).padStart(2, '0');
      btn.addEventListener('click', () => {
        if (state.suspendedTimes[key]) {
          delete state.suspendedTimes[key];
        } else {
          state.suspendedTimes[key] = true;
        }
        btn.classList.toggle('suspended', !!state.suspendedTimes[key]);
        saveState();
        updateBusInfo();
      });
      btnsDiv.appendChild(btn);
    });

    hourDiv.appendChild(btnsDiv);
    container.appendChild(hourDiv);
  }
}

// ===== 設定 =====
function initSettings() {
  document.getElementById('gpsToggle').checked = state.gpsEnabled;
  document.getElementById('gpsToggle').addEventListener('change', (e) => {
    state.gpsEnabled = e.target.checked;
    saveState();
  });

  document.getElementById('notificationToggle').checked = state.notificationEnabled;
  document.getElementById('notificationToggle').addEventListener('change', async (e) => {
    if (e.target.checked) {
      if ('Notification' in window) {
        const perm = await Notification.requestPermission();
        state.notificationEnabled = perm === 'granted';
        e.target.checked = state.notificationEnabled;
      }
    } else {
      state.notificationEnabled = false;
    }
    saveState();
  });

  document.getElementById('debugToggle').checked = state.debugMode;
  document.getElementById('debugToggle').addEventListener('change', (e) => {
    state.debugMode = e.target.checked;
    document.getElementById('debugInfo').classList.toggle('hidden', !e.target.checked);
    saveState();
  });

  document.getElementById('exportDataBtn').addEventListener('click', () => {
    const data = JSON.stringify({ customCoords: state.customCoords, favorites: state.favorites, suspendedTimes: state.suspendedTimes }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'crew-bus-data.json'; a.click();
    URL.revokeObjectURL(url);
  });

  document.getElementById('importDataBtn').addEventListener('click', () => {
    document.getElementById('importFileInput').click();
  });
  document.getElementById('importFileInput').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (data.customCoords) state.customCoords = data.customCoords;
        if (data.favorites) state.favorites = data.favorites;
        if (data.suspendedTimes) state.suspendedTimes = data.suspendedTimes;
        saveState();
        renderFavorites();
        renderStopList();
        renderSuspendTimes();
        alert('インポート完了');
      } catch(err) { alert('インポートエラー'); }
    };
    reader.readAsText(file);
  });

  // 座標登録（パスワード不要）
  document.getElementById('coordRegisterBtn').addEventListener('click', () => {
    document.getElementById('coordModal').classList.remove('hidden');
    populateCoordSelect();
  });
  document.getElementById('closeCoordModal').addEventListener('click', () => {
    document.getElementById('coordModal').classList.add('hidden');
  });
  document.getElementById('registerCurrentCoord').addEventListener('click', () => {
    if (!navigator.geolocation) {
      document.getElementById('coordResult').textContent = 'GPS非対応';
      return;
    }
    navigator.geolocation.getCurrentPosition((pos) => {
      const stopId = document.getElementById('coordStopSelect').value;
      state.customCoords[stopId] = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      saveState();
      document.getElementById('coordResult').textContent =
        `登録完了: ${pos.coords.latitude.toFixed(6)}, ${pos.coords.longitude.toFixed(6)}`;
    }, () => {
      document.getElementById('coordResult').textContent = 'GPS取得失敗';
    }, { enableHighAccuracy: true });
  });

  document.getElementById('settingsBtn').addEventListener('click', () => {
    document.getElementById('settingsPanel').classList.remove('hidden');
    renderFavorites();
    updateFavStopSelect();
    renderSuspendTimes();
  });
  document.getElementById('closeSettings').addEventListener('click', () => {
    document.getElementById('settingsPanel').classList.add('hidden');
  });

  // お気に入り登録フォーム
  initFavRegisterForm();
  // 運休時間設定
  initSuspendSettings();
}

function initFavRegisterForm() {
  const routeSelect = document.getElementById('favRouteSelect');
  const stopSelect = document.getElementById('favStopSelect');
  const dirSelect = document.getElementById('favDirSelect');
  const addBtn = document.getElementById('addFavBtn');

  routeSelect.addEventListener('change', () => {
    updateFavStopSelect();
    updateFavDirSelect();
  });

  stopSelect.addEventListener('change', () => {
    updateFavDirSelect();
  });

  addBtn.addEventListener('click', () => {
    const route = routeSelect.value;
    const stopId = stopSelect.value;
    const direction = dirSelect.value;
    if (stopId && direction) {
      addFavorite(stopId, route, direction);
    }
  });

  updateFavStopSelect();
}

function updateFavStopSelect() {
  const routeSelect = document.getElementById('favRouteSelect');
  const stopSelect = document.getElementById('favStopSelect');
  const route = routeSelect.value;
  const stops = STOPS_DATA[route];
  stopSelect.innerHTML = '';
  stops.forEach(stop => {
    const opt = document.createElement('option');
    opt.value = stop.id;
    opt.textContent = stop.name;
    stopSelect.appendChild(opt);
  });
  updateFavDirSelect();
}

function updateFavDirSelect() {
  const stopSelect = document.getElementById('favStopSelect');
  const dirSelect = document.getElementById('favDirSelect');
  const routeSelect = document.getElementById('favRouteSelect');
  const route = routeSelect.value;
  const stopId = stopSelect.value;
  const stop = STOPS_DATA[route].find(s => s.id === stopId);
  if (!stop) return;
  const directions = getAvailableDirections(stop.id);
  dirSelect.innerHTML = '';
  directions.forEach(dir => {
    const opt = document.createElement('option');
    opt.value = dir;
    opt.textContent = DIRECTION_LABELS[route][dir];
    dirSelect.appendChild(opt);
  });
}

function populateCoordSelect() {
  const select = document.getElementById('coordStopSelect');
  select.innerHTML = '';
  const seen = new Set();
  const allStops = [...STOPS_DATA.north, ...STOPS_DATA.south];
  allStops.forEach(stop => {
    if (seen.has(stop.id)) return;
    seen.add(stop.id);
    const opt = document.createElement('option');
    opt.value = stop.id;
    opt.textContent = stop.name;
    select.appendChild(opt);
  });
}

// ===== GPS手動ボタン =====
function initGPSButton() {
  document.getElementById('gpsBtn').addEventListener('click', () => initGPS());
}

// ===== デバッグ情報 =====
function updateDebugInfo() {
  if (!state.debugMode) return;
  const info = document.getElementById('debugInfo');
  info.textContent = JSON.stringify({
    stop: state.currentStop,
    stopId: state.currentStopId,
    route: state.currentRoute,
    direction: state.currentDirection,
    mode: state.closingMode,
    time: new Date().toLocaleTimeString(),
    favorites: state.favorites,
    favFilter: state.favFilterActive,
    suspended: Object.keys(state.suspendedTimes).length
  }, null, 2);
}

// ===== メインループ =====
function mainLoop() {
  updateClock();
  updateBusInfo();
  updateDebugInfo();
}

// ===== Service Worker登録 =====
function registerSW() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js').catch(() => {});
  }
}

// ===== 初期化 =====
function init() {
  loadState();
  registerSW();

  updateRouteTabs();
  renderStopList();
  initRouteTabs();
  initClosingModePopup();
  initSettings();
  initTimetableToggle();
  initGPSButton();
  initFavFilter();

  // 前回の停留所を復元
  if (state.currentStopId) {
    const allStops = [...STOPS_DATA.north, ...STOPS_DATA.south];
    const stop = allStops.find(s => s.id === state.currentStopId);
    if (stop) selectStop(stop);
  }

  updateModeBadge();

  // GPS取得 or デフォルト選択
  if (!state.currentStop) {
    // まずデフォルトを設定し、GPS成功時に上書き
    fallbackStopSelection();
    if (state.gpsEnabled) {
      setTimeout(initGPS, 500);
    }
  }

  mainLoop();
  setInterval(mainLoop, 1000);
}

document.addEventListener('DOMContentLoaded', init);
