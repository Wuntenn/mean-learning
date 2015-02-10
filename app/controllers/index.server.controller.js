exports.render = function(req,res) {
    if (req.session.lastVist){
        console.log(req.session.lastVisit);
    }

    req.session.lastVisit = new Date();

    res.render('index', {
        title: 'Hello world - msg from index controller. Rendered:EJS' 
    });
};
