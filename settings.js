/**************有关项目中数据的设置*******************/
module.exports = {
    "cookieSecret":'pmt',	
    "app": {
        "host": process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
        "port": process.env.OPENSHIFT_NODEJS_PORT || 8080
    },
    "mongodb": {
        "host": process.env.OPENSHIFT_MONGODB_DB_HOST||'127.0.0.1',
        "port": process.env.OPENSHIFT_MONGODB_DB_PORT|| 27017,
        "name": 'todo',
        "user": process.env.OPENSHIFT_MONGODB_DB_USERNAME,
        "pass": process.env.OPENSHIFT_MONGODB_DB_PASSWORD
    },
    "links": {
        "bugzilla": "https://bugzilla.redhat.com/enter_bug.cgi?product=Cantas&component=Web%20UI&version=0.2",
        "hssPortal": "https://engineering.redhat.com/hss-portal"
    }
};