const properties = {
    port:'3000',
    dist:'dist/index.html',
    error:'dist/error.html',
    db:{
        port:'27017',
        name:'thinkin_out_loud_db'
    },
    response:{
        status:000,
        data:{}
    },
    session:{
        secret:'atbhcidnekfignhgiojuktllmonuodp',
        resave:true,
        saveUninitiated:false,
        cookie:{
            secure:true,
            maxAge:60000
        }
    }
};

module.exports = properties;
