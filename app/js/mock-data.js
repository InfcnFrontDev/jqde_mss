Mock.mock(/action\=JqdeProfiles\&verb\=getCurrentProfiles/, {
    "rootPrivilege": true,
    "success": true,
    "profiles": {
        "demoProfile.testkey": "4444",
        "usersMon.headers": "[\"\\u6027\\u522b\",\"\\u89d2\\u8272\",\"IP\\u5730\\u5740\",\"\\u4e0a\\u6b21\\u52a8\\u4f5c\",\"\\u6d41\\u91cf\",\"\\u5355\\u4f4d\"]",
        "userMgr.headers": "[\"MAC\",\"\\u6027\\u522b\",\"\\u8eab\\u4efd\\u8bc1\\u53f7\",\"\\u7535\\u5b50\\u90ae\\u4ef6\",\"\\u7535\\u8bdd\",\"\\u4f59\\u989d\",\"\\u521b\\u5efa\\u65f6\\u95f4\",\"\\u8fc7\\u671f\\u65f6\\u95f4\",\"\\u4e0a\\u6b21\\u767b\\u5f55\",\"\\u9996\\u6b21\\u767b\\u5f55\"]",
        "qde.shortcuts": "[\"userMgr\",\"usersMon\",\"resMgr\",\"aclMgr\",\"blacklistMgr\",\"netMgr\",\"IDSMon\",\"stats\",\"qdeOptions\",\"onlineLog\",\"ipArea\",\"noticeMgr\",\"coreMon\",\"qdeReports\",\"qdeAdmin\",\"msgMgr\",\"chargeLog\",\"excessBlock\",\"netFlowLog\",\"loginLog\",\"blockLog\",\"ubmUser\",\"ubmRes\",\"ubmUserRes\",\"ipRoutes\",\"rwtError\"]",
        "resMgr.headers": "[\"\\u667a\\u80fd\\u91cd\\u5199\",\"\\u63cf\\u8ff0\",\"\\u72b6\\u6001\",\"\\u72b6\\u6001\\u8bf4\\u660e\",\"\\u70b9\\u51fb\"]"
    },
    "services": [{"folder": "系统管理", "ui": "tab", "serviceId": "qdeAdmin", "serviceName": "管理员管理"}, {
        "folder": "系统管理",
        "ui": "tab",
        "serviceId": "coreMon",
        "serviceName": "服务器动态监控"
    }, {"folder": "系统管理", "ui": "tab", "serviceId": "modulesMgr", "serviceName": "模块管理"}, {
        "folder": "系统管理",
        "ui": "window",
        "serviceId": "qdeOptions",
        "serviceName": "系统参数设置"
    }, {"folder": "系统管理", "ui": "window", "serviceId": "qdeReports", "serviceName": "系统状态报告"}, {
        "folder": "词表管理",
        "ui": "tab",
        "serviceId": "dictCenterMgr",
        "serviceName": "词表管理"
    }, {"folder": "数据清洗", "ui": "tab", "serviceId": "etlWorkerMgr", "serviceName": "数据清洗"}, {
        "folder": "元数据库管理",
        "ui": "tab",
        "serviceId": "mssSqlAction",
        "serviceName": "Sql查询"
    }, {"folder": "元数据库管理", "ui": "tab", "serviceId": "mssTableAction", "serviceName": "库表管理"}, {
        "folder": "发布管理",
        "ui": "tab",
        "serviceId": "pmpSectionAction",
        "serviceName": "栏目管理"
    }, {"folder": "发布管理", "ui": "tab", "serviceId": "pmpSiteAction", "serviceName": "站点管理"}],
    "userName": "INFCN",
    "userId": "root"
});


Mock.mock(/action\=qdeAdmin\&verb\=getAllAdmins/, {
    "total": 3,
    "success": true,
    "rows": [{
        "department": "",
        "email": "",
        "enabled": true,
        "name": "INFCN",
        "password": "*2DC1D65FA18258BAD3F3E9108C7FE57B970EB58B",
        "phone": "",
        "sex": "M",
        "userId": "admin"
    }, {
        "createDate": "2013-05-07 08:54:46.0",
        "department": "",
        "email": "infcn@infcn.com.cn",
        "enabled": true,
        "name": "INFCN",
        "password": "*E6CC90B878B948C35E92B003C792C46C58C4AF40",
        "phone": "3333",
        "sex": "M",
        "userId": "root"
    }, {
        "createDate": "2016-05-03 00:07:57.0",
        "department": "",
        "email": "",
        "enabled": true,
        "name": "test",
        "password": "123456",
        "phone": "",
        "sex": "M",
        "userId": "test"
    }]
});

Mock.mock(/action\=modulesMgr\&verb\=getAllMoudles/, {
    "success": true,
    "rows": [{
        "sortNo": "",
        "folder": "系统管理",
        "host": "",
        "serviceId": "qdeAdmin",
        "serviceName": "管理员管理"
    }, {"sortNo": "", "folder": "系统管理", "host": "", "serviceId": "coreMon", "serviceName": "服务器动态监控"}, {
        "sortNo": "",
        "folder": "系统管理",
        "host": "",
        "serviceId": "modulesMgr",
        "serviceName": "模块管理"
    }, {"sortNo": "", "folder": "系统管理", "host": "", "serviceId": "qdeOptions", "serviceName": "系统参数设置"}, {
        "sortNo": "",
        "folder": "系统管理",
        "host": "",
        "serviceId": "qdeReports",
        "serviceName": "系统状态报告"
    }, {"sortNo": "", "folder": "词表管理", "host": "", "serviceId": "dictCenterMgr", "serviceName": "词表管理"}, {
        "sortNo": "",
        "folder": "数据清洗",
        "host": "",
        "serviceId": "etlWorkerMgr",
        "serviceName": "数据清洗"
    }, {
        "sortNo": "",
        "folder": "元数据库管理",
        "host": "",
        "serviceId": "mssSqlAction",
        "serviceName": "Sql查询"
    }, {
        "sortNo": "",
        "folder": "元数据库管理",
        "host": "",
        "serviceId": "mssTableAction",
        "serviceName": "库表管理"
    }, {
        "sortNo": "",
        "folder": "发布管理",
        "host": "",
        "serviceId": "pmpSectionAction",
        "serviceName": "栏目管理"
    }, {"sortNo": "", "folder": "发布管理", "host": "", "serviceId": "pmpSiteAction", "serviceName": "站点管理"}]
});
Mock.mock(/action\=qdeOptions\&verb\=getAllOptions/,
    {
        "total": 4,
        "success": true,
        "rows": [{
            "editor": "text",
            "name": "API接口连接",
            "category": "系统设置",
            "value": "192.168.10.9",
            "key": "api_url"
        }, {
            "editor": {"type": "numberbox"},
            "name": "API接口端口号",
            "category": "系统设置",
            "value": "9095",
            "key": "api_port"
        }, {
            "editor": "text",
            "name": "sql接口",
            "category": "系统设置",
            "value": "192.168.10.9:9200",
            "key": "search_host"
        }, {"editor": "text", "name": "用户名", "category": "注册信息", "value": "图书馆", "key": "license.user"}]
    });
Mock.mock(/action\=qdeReports\&verb\=getReports/,
    {
        "success": true,
        "rows": [{
            "category": "系统环境",
            "key": "操作系统",
            "value": "Linux V3.10.0-327.10.1.el7.x86_64 amd64 (unknown)"
        }, {"category": "系统环境", "key": "中央处理器", "value": "12个CPU；1900 MHz"}, {
            "category": "系统环境",
            "key": "物理内存",
            "value": "空闲437M；总内存128662M"
        }, {"category": "系统环境", "key": "QDE版本", "value": "QDE V4.0.18"}, {
            "category": "系统环境",
            "key": "JRE信息",
            "value": "版本1.8.0_45；路径/opt/jdk1.8.0_45/jre"
        }, {"category": "系统环境", "key": "Java虚拟机内存", "value": "空闲2128M；总内存2625M；最大内存 27305M"}, {
            "category": "系统环境",
            "key": "JVM线程数",
            "value": "31"
        }]
    });