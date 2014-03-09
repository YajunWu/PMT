module.exports = function(grunt) {

  //项目配置
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    //uglify任务用于压缩js文件
    uglify: {
      options: {
        //用于在文件顶部生成一个注释
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'public/javascripts/src/<%= pkg.name %>.js',
        dest: 'public/javascripts/build/<%= pkg.name %>.min.js'
      }
    },
    //watch任务是用来监控文件被改变时执行的任务
    watch: {
      //将sass文件编译成css文件
      css: {
        //files属性用来监控任务中指定的目标文件
        files: [
          '**/*.sass',
          '**/*.scss'
        ],
        //tasks属性定义了Grunt任务的数组，执行改变项目目标中的文件
        tasks: ['compass']
      },
      js: {
        files: [
          'public/javascripts/src/*.js',
          'Gruntfile.js'
        ],
        tasks: ['jshint']
      }
    },
    //compass任务用来将Sass编译成css
    compass: {
      dist: {
        options: {
          //sass文件的目录
          sassDir: 'public/stylesheets/sass',
          //编译出来的css目录
          cssDir: 'public/stylesheets/css',
          //指定Sass代码要如何编译。
          outputStyle: 'compressed'//编译出来的css将被压缩
        }
      }
    },
    //jshint任务可以检测js代码是否有错误，也可用来统一代码风格
    jshint: {
      options: {
        //大括号包裹。即不能使用这种代码if(true)doSomething();
        curly: true,
        //对于简单类型，使用===和!==，而不是==和!=
        eqeqeq: true,
        //对于首字母大写的函数（声明的类），强制使用new
        newcap: true,
        //禁用arguments.caller和arguments.callee
        noarg: true,
        //对于属性使用aa.bb,而不是aap['bb']
        sub: true,
        //查找所有未定义变量
        undef: true,
        //查找类似与if(a=0)这样的代码
        boss: true,
        //指定运行环境为node.js
        node: true
      },
      //用于指定那些文件用JSHint来检查
      all: ['Gruntfile.js', 'public/javascripts/src/*.js']
    },
    //browser-sync用于css样式注入。可处理css，图像，js和模板文件
    //使用WebSockets将消息发送到浏览器，触发样式的注入或页面的刷新，实现浏览器同步
    browser-sync: {
      files: {
        src: [
          'public/stylesheets/css/*.css',
          'public/images/*',
          'public/javascripts/src/*.js',
          'views/*.ejs'
        ]
      },
      options: {
        //由于使用了watch插件，应该在watch监听操作执行之后再同步到浏览器
        watchTask: true
        //指定host主机，用于跨设备同步工作
       // host: 'treehouse.dev'
      }
    }
  });

  //加载grunt插件
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-browser-sync');

  //注册grunt默认任务
  grunt.registerTask('default', ['uglify','browser-sync','watch']);

};