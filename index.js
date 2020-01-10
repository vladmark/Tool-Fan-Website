const http = require("http");
const path = require("path");
const fs = require("fs");

const server=http.createServer( function(req, res){
    //path-ul fisierului cerut
    var filePath=path.join(__dirname, "public", req.url === "/" ? "index.html" : req.url);
    //determin ce tip de fisier mi se cere in contentType
    var contentType="";
    let extName=path.extname(filePath);
    switch (extName) {
      case ".js":
      contentType = "text/javascript";
      break;
      case ".css":
      contentType = "text/css";
      break;
      case ".json":
      contentType = "application/json";
      break;
      case ".png":
      contentType = "image/png";
      break;
      case ".ico":
      contentType = "image/ico";
      break;
      case ".jpg":
      contentType = "image/jpg";
      break;
    }

    //tratez cazurile in functie de metoda
    if (req.method === "POST") {
      if (contentType === "application/json") {
         handleApiPostRequests (req, res, filePath);
      }
      res.writeHead(200, {"Content-Type": contentType});
    } else if (req.method === "PUT") {
      if (contentType === "application/json") {
         handleApiPutRequests (req, res, filePath);
      }
      res.writeHead(200, {"Content-Type": contentType});
    } else if (req.method === "DELETE") {
      if (contentType === "application/json") {
         handleApiDeleteRequests (req, res, filePath);
      }
      res.writeHead(200, {"Content-Type": contentType});
    } else if (req.method === "GET") {
      //o fac dinamic daca mai am timp
      /* if (path.basename === "user.html") {
        //asta e o pagina pe care vreau s-o generez dinamic inainte de servire
        var content="";
        //asta am de facut^
        fs.writeFile(filePath, content,function(err) {
        });
      } */
      fs.readFile(filePath, function(err, content) {
        res.end(content);
      });
      res.writeHead(200, {"Content-Type": contentType});
    }
});

//scrie ceea ce se primeste prin req la filePath (cu fs.appendFile)
//trimite in response obiectul scris

//poate sa sterg parola de la astea, desi asta ar face api-ul specific
function handleApiPostRequests (req, res, filePath) {
  //primesc ce-am de primit
  var primit="";
  req.on("data", function(received) {
      primit += received;
  });


  req.on("end", function() {
      var jsonToAppend=JSON.parse(primit);
      fs.readFile(filePath, function(err, content) {
        //content e ce am in api pana acum;
        var currentJson=JSON.parse(content);
        //imi iau contentul si adaug la el nodul primit;
        if (Array.isArray(currentJson)) {
          jsonToAppend["id"]=currentJson.length+1;
          currentJson.push(jsonToAppend);
        } else {
          jsonToAppend["id"]=1; //e primul user daca nu mai e nici unul
          currentJson=[jsonToAppend]; //ma asigur ca-l fac array;
        }
        fs.writeFile(filePath, JSON.stringify(currentJson), function(err) {
          console.log("eroare");
        });
        res.end(JSON.stringify("S-a introdus cu succes."));
      });
  });
}

function handleApiPutRequests (req, res, filePath) {
  //primesc ce-am de primit
  var primit="";
  req.on("data", function(received) {
      primit += received;
  });

  req.on("end", function() {
      var jsonToUpdate=JSON.parse(primit);
      fs.readFile(filePath, function(err, content) {
        var negasit=false;
        //content e ce am in api pana acum;
        var currentJson=JSON.parse(content);
        //imi iau contentul si adaug la el nodul primit;
        if (Array.isArray(currentJson)) {
          var append=true;
          var i=0;
          while(append) { //caut obiectul si ii schimb pe ala potrivit
            if (currentJson[i].id == jsonToUpdate.id) {
              currentJson[i]=jsonToUpdate;
              append=false;
            }
            i++;
          }
          if (i=== currentJson.length) {negasit=true;}
        } else if (currentJson) {
          if (currentJson.id != jsonToUpdate.id) {
              negasit=true;
          } else {
              currentJson=jsonToUpdate;
          }
        } else {negasit=true;}
        if (!negasit) {
          fs.writeFile(filePath, JSON.stringify(currentJson), function(err) {
            console.log("eroare");
          });
          res.end("S-a updatat cu succes");
        } else {
          res.end("Nu a fost gasit obiectul care se dorea updatat.");
        }
      });
  });

}

function handleApiDeleteRequests (req, res, filePath) {
  //primesc ce-am de primit
  var primit="";
  req.on("data", function(received) {
      primit += received;
  });

  req.on("end", function() {
      var jsonToDelete=JSON.parse(primit);
      fs.readFile(filePath, function(err, content) {
        var negasit=false;
        //content e ce am in api pana acum;
        var currentJson=JSON.parse(content);
        //imi iau contentul si adaug la el nodul primit;
        if (Array.isArray(currentJson)) {
          var sterge=true;
          var i=0;
          while(sterge) { //caut obiectul si il sterg
            if (currentJson[i].id == jsonToDelete.id) {
              currentJson.splice(i,1); //sterge componenta de la poz i
              //updeateaza id-urile tuturor celorlalte componente
              for (var j=i; j<currentJson.length; j++) {
                currentJson[j].id--;
              }
              sterge=false;
            }
            i++;
          }
          if (i=== currentJson.length) {negasit=true;}
        } else if (currentJson) {
          if (currentJson.id != jsonToDelete.id) {
              negasit=true;
          } else {
              currentJson={};
          }
        } else {negasit=true;}
        if (!negasit) {
          fs.writeFile(filePath, JSON.stringify(currentJson), function(err) {
            console.log("eroare");
          });
          res.end("S-a sters cu succes");
        } else {
          res.end("Nu a fost gasit obiectul care se dorea sters.");
        }
      });
  });

}

const PORT = process.env.port || 5000;

server.listen( PORT, function () {console.log("Serverul ruleaza pe portul", PORT);});
