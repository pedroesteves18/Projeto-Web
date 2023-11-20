module.exports= {
    estaLogado: function(req, res, next) {
        if (req.session.user != undefined && req.session.user != null) {
            return next()
        }
        res.redirect("/")
}
}