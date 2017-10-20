// 双色球 七乐彩 大乐透 胆拖特殊
var lotteryRule = {
    双色球: {
        直选: {

            红球: {
                total: 33,
                selectRule: [
                    6
                ],
                format: "至少选择%s个号码",
                color: 'red',
                createType: '球'
            },
            蓝球: {
                total: [
                    16
                ],
                selectRule: [
                    1
                ],
                format: "至少选择%s个号码",
                color: 'blue',
                createType: '球'
            }
        },
        胆拖: {

            红球胆码: {
                total: 33,
                selectRule: [
                    1,
                    5
                ],
                format: "选择%s个号码",
                color: 'red',
                createType: '球'
            },
            红球拖码: {
                total: 33,
                selectRule: [
                    2
                ],
                format: "至少选择%s个号码",
                color: 'red',
                createType: '球'
            },
            蓝球: {
                total: [
                    16
                ],
                selectRule: [
                    1
                ],
                format: "至少选择%s个号码",
                color: 'blue',
                createType: '球'
            }
        }
    },
    七乐彩: {
        直选: {
            红球: {
                total: 30,
                selectRule: [
                    7, 15
                ],
                format: "选择%s个号码",
                color: 'red',
                createType: '球'
            }
        },
        胆拖: {
            红球胆码: {
                total: 30,
                selectRule: [
                    1, 6
                ],
                format: "选择%s个号码",
                color: 'red',
                createType: '球'
            },
            红球拖码: {
                total: 30,
                selectRule: [
                    2
                ],
                format: "至少选择%s个号码",
                color: 'red',
                createType: '球'
            }
        }
    },
    福彩3D: {
        直选: {
            百位: {
                total: 9,
                selectRule: [
                    1
                ],
                format: "至少选择%s个号码",
                color: 'red',
                createType: '位'
            },
            十位: {
                total: 9,
                selectRule: [
                    1
                ],
                format: "至少选择%s个号码",
                color: 'red',
                createType: '位'
            },
            个位: {
                total: 9,
                selectRule: [
                    1
                ],
                format: "至少选择%s个号码",
                color: 'red',
                createType: '位'
            }
        },
        组三: {
            选号: {
                total: 9,
                selectRule: [
                    2
                ],
                format: "至少选择%s个号码",
                color: 'red',
                createType: '位'
            }
        },
        组六: {
            选号: {
                total: 9,
                selectRule: [
                    3
                ],
                format: "至少选择%s个号码",
                color: 'red',
                createType: '位'
            }
        }
    },
    大乐透: {
        直选: {
            红球: {
                total: 35,
                selectRule: [
                    5
                ],
                format: "至少选择%s个号码",
                color: 'red',
                createType: '球'
            },
            蓝球: {
                total: 12,
                selectRule: [
                    2
                ],
                format: "至少选择%s个号码",
                color: 'blue',
                createType: '球'
            }
        },
        胆拖: {
            红球胆码: {
                total: 33,
                selectRule: [
                    1,
                    4
                ],
                format: "选择%s个号码",
                color: 'red',
                createType: '球'
            },
            红球拖码: {
                total: 33,
                selectRule: [
                    1
                ],
                format: "至少选择%s个号码",
                color: 'red',
                createType: '球'
            },
            蓝球胆码: {
                total: [
                    12
                ],
                selectRule: [
                    1
                ],
                format: "最多选择%s个号码",
                color: 'blue',
                createType: '球'
            },
            蓝球拖码: {
                total: [
                    12
                ],
                selectRule: [
                    1
                ],
                format: "至少选择%s个号码",
                color: 'blue',
                createType: '球'
            }
        }
    },
    排列三: {
        直选: {
            百位: {
                total: 9,
                selectRule: [
                    1
                ],
                format: "至少选择%s个号码",
                color: 'red',
                createType: '位'
            },
            十位: {
                total: 9,
                selectRule: [
                    1
                ],
                format: "至少选择%s个号码",
                color: 'red',
                createType: '位'
            },
            个位: {
                total: 9,
                selectRule: [
                    1
                ],
                format: "至少选择%s个号码",
                color: 'red',
                createType: '位'
            }
        },
        组三: {
            选号: {
                total: 9,
                selectRule: [
                    2
                ],
                format: "至少选择%s个号码",
                color: 'red',
                createType: '位'
            }
        },
        组六: {
            选号: {
                total: 9,
                selectRule: [
                    3
                ],
                format: "至少选择%s个号码",
                color: 'red',
                createType: '位'
            }
        }
    },
    排列五: {
        直选: {
            万位: {
                total: 9,
                selectRule: [
                    1
                ],
                format: "至少选择%s个号码",
                color: 'red',
                createType: '位'
            },
            千位: {
                total: 9,
                selectRule: [
                    1
                ],
                format: "至少选择%s个号码",
                color: 'red',
                createType: '位'
            },
            百位: {
                total: 9,
                selectRule: [
                    1
                ],
                format: "至少选择%s个号码",
                color: 'red',
                createType: '位'
            },
            十位: {
                total: 9,
                selectRule: [
                    1
                ],
                format: "至少选择%s个号码",
                color: 'red',
                createType: '位'
            },
            个位: {
                total: 9,
                selectRule: [
                    1
                ],
                format: "至少选择%s个号码",
                color: 'red',
                createType: '位'
            }
        }
    },
    七星彩: {
        直选: {
            第一位: {
                total: 9,
                selectRule: [
                    1
                ],
                format: "至少选择%s个号码",
                color: 'red',
                createType: '位'
            },
            第二位: {
                total: 9,
                selectRule: [
                    1
                ],
                format: "至少选择%s个号码",
                color: 'red',
                createType: '位'
            },
            第三位: {
                total: 9,
                selectRule: [
                    1
                ],
                format: "至少选择%s个号码",
                color: 'red',
                createType: '位'
            },
            第四位: {
                total: 9,
                selectRule: [
                    1
                ],
                format: "至少选择%s个号码",
                color: 'red',
                createType: '位'
            },
            第五位: {
                total: 9,
                selectRule: [
                    1
                ],
                format: "至少选择%s个号码",
                color: 'red',
                createType: '位'
            },
            第六位: {
                total: 9,
                selectRule: [
                    1
                ],
                format: "至少选择%s个号码",
                color: 'red',
                createType: '位'
            },
            第七位: {
                total: 9,
                selectRule: [
                    1
                ],
                format: "至少选择%s个号码",
                color: 'red',
                createType: '位'
            }
        }
    }
};
var lotteryNo = {
    groups: [
        {
            type: [
                {
                    element: '01'
                },
                {
                    element: '02'
                }
            ],
            color: 'red'
        },
        {
            type: [
                {
                    element: '01'
                },
                {
                    element: '02'
                }
            ],
            color: 'blue'
        }

    ],
    betNum: 0,
    playType: '',
    lotteryType: ''

};
var lotteryEnd = {};