// usei o express para criar e configurar meu servidor

const express = require("express")
const server = express()

const db = require("./db")

// configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"))

// habilitar uso do req.body
server.use(express.urlencoded({ extended: true }))


// configuração do nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true, // boolean
})

// criei uma rota
server.get("/", function(req, res){


   db.all(`SELECT * FROM IDEAS`, function(err, rows){
    if(err) {
        console.log(err)
        return res.send("Erro no banco de dados!!!!!!")
    }

      const reversedIdeas = [...rows].reverse()

      let lastideas = []
      for(let idea of reversedIdeas){
          if(lastideas.length < 2){
              lastideas.push(idea)
          }
       }
  
      return res.render("index.html", { ideas: lastideas})
    })




    

})

server.get("/ideias", function(req, res){



    db.all(`SELECT * FROM IDEAS`, function(err, rows){
     
    if(err) {
        console.log(err)
        return res.send("Erro no banco de dados!!!!!!")
    }

    const reversedIdeas = [...rows]

    return res.render("ideias.html", {ideas: reversedIdeas})

    })
})

server.post("/", function(req,res){
    console.log(req.body)

     // INSERIR DADOS NA TABELA
     const query = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
        ) VALUES(?,?,?,?,?);
        `

     const values = [
         req.body.image,
         req.body.title,
         req.body.category,
         req.body.description,
         req.body.link,

     ]

      db.run(query, values, function(err){
        if(err) {
            console.log(err)
            return res.send("Erro no banco de dados!!!!!!")
        }

        return res.redirect("/ideias")

      }) 
 })

// liguei o servidor na porta 3000
server.listen(3000)


