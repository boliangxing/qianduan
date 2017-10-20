<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

return [
    // +----------------------------------------------------------------------
    // | 应用设置
    // +----------------------------------------------------------------------

    // 应用命名空间
    'app_namespace' => 'app',
    // 应用调试模式
    'app_debug' => true,
    // 应用Trace
    'app_trace' => false,
    // 应用模式状态
    'app_status' => '',
    // 是否支持多模块
    'app_multi_module' => true,
    // 入口自动绑定模块
    'auto_bind_module' => false,
    // 注册的根命名空间
    'root_namespace' => [],
    // 扩展函数文件
    'extra_file_list' => [THINK_PATH . 'helper' . EXT],
    // 默认输出类型
    'default_return_type' => 'html',
    // 默认AJAX 数据返回格式,可选json xml ...
    'default_ajax_return' => 'json',
    // 默认JSONP格式返回的处理方法
    'default_jsonp_handler' => 'jsonpReturn',
    // 默认JSONP处理方法
    'var_jsonp_handler' => 'callback',
    // 默认时区
    'default_timezone' => 'PRC',
    // 是否开启多语言
    'lang_switch_on' => false,
    // 默认全局过滤方法 用逗号分隔多个
    'default_filter' => '',
    // 默认语言
    'default_lang' => 'zh-cn',
    // 应用类库后缀
    'class_suffix' => false,
    // 控制器类后缀
    'controller_suffix' => false,

    // +----------------------------------------------------------------------
    // | 模块设置
    // +----------------------------------------------------------------------

    // 默认模块名
    'default_module' => 'index',
    // 禁止访问模块
    'deny_module_list' => ['common'],
    // 默认控制器名
    'default_controller' => 'Index',
    // 默认操作名
    'default_action' => 'index',
    // 默认验证器
    'default_validate' => '',
    // 默认的空控制器名
    'empty_controller' => 'Error',
    // 操作方法后缀
    'action_suffix' => '',
    // 自动搜索控制器
    'controller_auto_search' => false,

    // +----------------------------------------------------------------------
    // | URL设置
    // +----------------------------------------------------------------------

    // PATHINFO变量名 用于兼容模式
    'var_pathinfo' => 's',
    // 兼容PATH_INFO获取
    'pathinfo_fetch' => ['ORIG_PATH_INFO', 'REDIRECT_PATH_INFO', 'REDIRECT_URL'],
    // pathinfo分隔符
    'pathinfo_depr' => '/',
    // URL伪静态后缀
    'url_html_suffix' => 'html',
    // URL普通方式参数 用于自动生成
    'url_common_param' => false,
    // URL参数方式 0 按名称成对解析 1 按顺序解析
    'url_param_type' => 0,
    // 是否开启路由
    'url_route_on' => true,
    // 路由使用完整匹配
    'route_complete_match' => false,
    // 路由配置文件（支持配置多个）
    'route_config_file' => ['route'],
    // 是否强制使用路由
    'url_route_must' => false,
    // 域名部署
    'url_domain_deploy' => false,
    // 域名根，如thinkphp.cn
    'url_domain_root' => '',
    // 是否自动转换URL中的控制器和操作名
    'url_convert' => true,
    // 默认的访问控制器层
    'url_controller_layer' => 'controller',
    // 表单请求类型伪装变量
    'var_method' => '_method',
    // 表单ajax伪装变量
    'var_ajax' => '_ajax',
    // 表单pjax伪装变量
    'var_pjax' => '_pjax',
    // 是否开启请求缓存 true自动缓存 支持设置请求缓存规则
    'request_cache' => false,
    // 请求缓存有效期
    'request_cache_expire' => null,
    // 全局请求缓存排除规则
    'request_cache_except' => [],

    // +----------------------------------------------------------------------
    // | 模板设置
    // +----------------------------------------------------------------------

    'template' => [
        // 模板引擎类型 支持 php think 支持扩展
        'type' => 'Think',
        // 模板路径
        'view_path' => '',
        // 模板后缀
        'view_suffix' => 'html',
        // 模板文件名分隔符
        'view_depr' => DS,
        // 模板引擎普通标签开始标记
        'tpl_begin' => '{{',
        // 模板引擎普通标签结束标记
        'tpl_end' => '}}',
        // 标签库标签开始标记
        'taglib_begin' => '{{',
        // 标签库标签结束标记
        'taglib_end' => '}}',
    ],

    // 视图输出字符串内容替换
    'view_replace_str' => [
        '__ADMIN__' => '/static/admin',
        '__MOBILE__' => '/static/mobile'
    ],
    // 默认跳转页面对应的模板文件
    'dispatch_success_tmpl' => THINK_PATH . 'tpl' . DS . 'dispatch_jump.tpl',
    'dispatch_error_tmpl' => THINK_PATH . 'tpl' . DS . 'dispatch_jump.tpl',

    // +----------------------------------------------------------------------
    // | 异常及错误设置
    // +----------------------------------------------------------------------

    // 异常页面的模板文件
    'exception_tmpl' => THINK_PATH . 'tpl' . DS . 'think_exception.tpl',

    // 错误显示信息,非调试模式有效
    'error_message' => '页面错误！请稍后再试～',
    // 显示错误信息
    'show_error_msg' => false,
    // 异常处理handle类 留空使用 \think\exception\Handle
    'exception_handle' => '',

    // +----------------------------------------------------------------------
    // | 日志设置
    // +----------------------------------------------------------------------

    'log' => [
        // 日志记录方式，内置 file socket 支持扩展
        'type' => 'File',
        // 日志保存目录
        'path' => LOG_PATH,
        // 日志记录级别
        'level' => [],
    ],

    // +----------------------------------------------------------------------
    // | Trace设置 开启 app_trace 后 有效
    // +----------------------------------------------------------------------
    'trace' => [
        // 内置Html Console 支持扩展
        'type' => 'Html',
    ],

    // +----------------------------------------------------------------------
    // | 缓存设置
    // +----------------------------------------------------------------------

    'cache' => [
        // 驱动方式
        'type' => 'File',
        // 缓存保存目录
        'path' => CACHE_PATH,
        // 缓存前缀
        'prefix' => '',
        // 缓存有效期 0表示永久缓存
        'expire' => 0,
    ],

    // +----------------------------------------------------------------------
    // | 会话设置
    // +----------------------------------------------------------------------

    'session' => [
        'id' => '',
        // SESSION_ID的提交变量,解决flash上传跨域
        'var_session_id' => '',
        // SESSION 前缀
        'prefix' => 'think',
        // 驱动方式 支持redis memcache memcached
        'type' => '',
        // 是否自动开启 SESSION
        'auto_start' => true,
    ],

    // +----------------------------------------------------------------------
    // | Cookie设置
    // +----------------------------------------------------------------------
    'cookie' => [
        // cookie 名称前缀
        'prefix' => '',
        // cookie 保存时间
        'expire' => 0,
        // cookie 保存路径
        'path' => '/',
        // cookie 有效域名
        'domain' => '',
        //  cookie 启用安全传输
        'secure' => false,
        // httponly设置
        'httponly' => '',
        // 是否使用 setcookie
        'setcookie' => true,
    ],

    //分页配置
    'paginate' => [
        'type' => 'bootstrap',
        'var_page' => 'page',
        'list_rows' => 15,
    ],

    'alipay_wap' => [

        //应用ID,您的APPID。
        'app_id' => "2016021601145930",

        //商户私钥，您的原始格式RSA私钥
        'merchant_private_key' => "MIIEpAIBAAKCAQEAvEA7YD6DLhAfAraCc9/oee8XYtHpmkE4cps6wpD+8hT23nlPNA8lLGXubg5Ik6NtiB/RUixYeyn+YdneGdTiQZAoN/qCL9yb0HYi+s/hMRQ95z43+3NHlVM/agiQZIp0aOUzW+auF4Hf+Zc6IY7M13OdGL5KcM/m1YoqTfkNhnSQ2OOzUGqNrvUzoH3ZTzpnBi4lKv33upOOMfvVcUwDnenf/uGxI70UsZCDrNEwDncrK0vx4mWJUqFUcocb9LULnGx7fCQyFPqXHd51aa0T/yIMKJrJG56/ARWiHJ5xmWzP4CYgaj794wnzX62oj0DRIiN8fGqqIPY6JriUFWIrFQIDAQABAoIBAQCm8uv1gdsCmed2l3d/3h4lLSX3TKQ4Wgj+kq386WxAMtlxGfJk/91+z3MxhVdWH8S+yUDw+EUMDYT9MKNpE0QI0xjn9DFK0wIYUPzapEtZJFN15dbuGCFuy6JcnfW4RJXShRoUMbNJQ7PnfPdf1W3S0USMMg6Al9Bmpp64Ady91NNTwavZ9XixJVGrK12qWLaTP2nPPRJsfzOiP+9BJlUxHdiFgBO/tfzw13PIOD88lA5CyY0DdlJ1F5MFvfuzZ1PSw445Xm7Ls/HK3ldilgIJg3iSF37vcxn+EPGEzOY9BQxJRmzG20kWTNmMr7hw1eGpmaGozPPoV2ccrRWZHOcBAoGBANuXJhvt40KPIaDJyd0qCawh7B5nx/PzGqLmXj/r0rufrzueDBRwmUtpUEbFCQO7BS+MOHRI/X0NMruTankiLFwYmZe68rRYYYpTCLz4J6733fTzbVifAqKS0dkXiIGzP2scBRrrTgywKmHyYChjWxekWY//cvUtQBL1FCspfC9VAoGBANt21Ex+ubAlRmBCKpxHw8u0RRHa2LxMe/ZODZ8r506F6+px9zfYFRXRQABwwHRLJmwwyAFhawRZlBszztcHSandCZGHo866XIhuLdMdF4YA3ASvExqpzQbSLLl8Z5JmB0v+QyFoFv5qE5UsRH9B3JiWO6dniVireqP3mhWRYIzBAoGAF/ht7oqPTkq1jwm4AW5/U8z4K3GEwDp/Y9zl2PBzNov94vIju293LGY4nyEPFNsre79AwmDdWvM/4H39F3AFi6Ab1BZSPCGRtDnQMGCeZFkmX4DbJNtmvDxur9YDzrS0bYrHe+LHyFbKqZp9qKr/3JrSNAfckqr33ZnnM7b5mWkCgYEAr2pQkH/uLcPtd30Lj/SwpD6Hwpi5CfDcWGfU7XfrH1Fd2vuSzXkSiWjCjleRDKMQqANpqejS4Bw1jHShjC/QCkyZnE/dd5xv38CpMggbyEkhk0DYtUQpk50kkHHGWzbf+DbYM3h+gIYK9v32Ff1vtCrIrarNFimiEjMTXs/fa0ECgYBxXB1H02ZkhteQS7UwZphc3wd1wh19sDg8a7Yibna+Lkc8d+i3CygCjwFAgaqrY1j9ht4lBPtbUMJS6K3lmX3BT/DVgvfiwyQn9Iwd8/at29mW9D0Svk+dGkUjHcQpx9mhpnjjaE6+zAtVRV4xhGIVwagCgzSF3ekxJ7C9P8OiGQ==",

        //异步通知地址
        'notify_url' => "http://pay.gamezs78.com/alipay.trade.wap.pay-PHP-UTF-8/notify_url.php",

        //同步跳转
        'return_url' => "http://10.7.24.202:803/index.php/mobile/result/returnUrl",

        //编码格式
        'charset' => "UTF-8",

        //签名方式
        'sign_type' => "RSA2",

        //支付宝网关
        'gatewayUrl' => "https://openapi.alipay.com/gateway.do",

        //支付宝公钥,查看地址：https://openhome.alipay.com/platform/keyManage.htm 对应APPID下的支付宝公钥。
        'alipay_public_key' => "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsol8/zrezTgKbXfzGWFlJAcXDUNZe3g5PHY1lz3U1Rno4y+XBHS8nARDoJgUcZ/dVbBTQKFc+EJqIJIqchy0FqtWtZNCDdSe1zhE4Bue21HaZDzpKSHpNJsNESWfhzc+2mjdHHYx6eEb4demzKKL0TNnmii7LWL1WZYMAOr0IkVDV5uIqIVMinEXRjpjLcHbjBEBRd3IVn1lU5GGi8+VFVqMx9UC4VdmaF5FPW2gmOPSRdDydvk7WuGvRYjP8RjMFrjfZBVWVLUB5r0WPUvay/kI75NBTF5sr6Bot1PADx/96u/2XuzEdOkF57FUJpLQWGrEKAxIJoAahTMM7zpWlQIDAQAB",


        //签名方式
        'key' => "ahsdvf527id",
    ],
    'bmap'=>[
        //云存储表id
        'geotable_id'=> '173455',
        'ak'=>'c7sBjQAny2ulYaooMIFzt8UqC0D0yRLc'
    ],
    'captcha' => [
        // 验证码字符集合
//        'codeSet' => '2345678abcdefhijkmnpqrstuvwxyzABCDEFGHJKLMNPQRTUVWXY',
        'expire'=>180,
        // 验证码字体大小(px)
        'fontSize' => 14,
        // 是否画混淆曲线
        'useCurve' => false,
        // 验证码图片高度
        'imageH' => 40,
        // 验证码图片宽度
        'imageW' => 90,
        // 验证码位数
        'length' => 4,
        // 验证成功后是否重置
        'reset' => true
    ],
];
