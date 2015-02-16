exports.render = function(req,res) {
    if (typeof(req.session.lastVisit) !== 'undefined'){
        console.log('Cookie:lastVisit ' + req.session.lastVisit);
    }

    req.session.lastVisit = new Date();

    res.render('index', {
        title: 'Hello world - msg from index controller. Rendered:EJS' 
    });
};
