const req = require("express/lib/request");
const res = require("express/lib/response");
const db = require("../database/models/index");
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;

const actorsController = {
    
    list: (req,res) => {
        db.Actors.findAll({
            order: [["first_name", "ASC"]]
        })
            .then( actors => {
                res.render("actorsList", { actors })
            })
            .catch(err => {
                res.send(err)
            })

    },

    detail: (req, res) => {

        let id = req.params.id

        let promesaPeliculas = db.Movies.findAll()

        let promesaActor =  db.Actors.findByPk(id, {
                                include: [{association: "movies"}]
                            })
        
        Promise.all([promesaPeliculas, promesaActor ])
            .then(([movies, actor]) => {
                res.render("actorsDetail", { movies, actor })
            })
            .catch(err => {
                res.send(err)
            })
    },

    add: (req, res) => {
        db.Movies
            .findAll()
            .then(movies => {
                res.render("ActorsAdd", { movies })
            })
            .catch(err => {
                res.send(err)
            })
    },

    create: (req, res) => {
        db.Actors
            .create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                rating: req.body.rating,
                favorite_movie_id: req.body.favorite_movie_id
            })
            .then(resultado => {
                res.redirect("/actors")
            })
            .catch(err => {
                res.send(err)
            })
    },

    edit: (req,res) => {
        let id = req.params.id;

        let promesaPeliculas = db.Movies.findAll()

        let promesaActor = db.Actors.findByPk(id)

        Promise.all([promesaPeliculas, promesaActor])
            .then(([movies, actor]) => {
                res.render("actorsEdit", { movies, actor })
            })
            .catch(err => {
                res.send(err)
            })
    },

    update: (req, res) => {

        db.Actors
            .update(
                {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    rating: req.body.rating,
                    favorite_movie_id: req.body.favorite_movie_id
                },
                {
                    where: {
                        id: req.params.id
                    }
                }
            )
            .then(resultado => {
                res.redirect("/actors");
            })
            .catch(err => {
                res.send(err)
            })

    },

    delete: (req, res) => {

        let id = req.params.id;

        db.Actors
            .findByPk(id)
            .then(actor => {
                res.render("actorsDelete", { actor })
            })
            .catch(err => {
                res.send(err)
            })

    },

    destroy: (req, res) => {

        db.Actors
            .destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(resultado => {
                res.redirect("/actors")
            })
            .catch(err => {
                res.send(err)
            })
            
    }

}

module.exports = actorsController;