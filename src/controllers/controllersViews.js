const persona = [
    {
      nombre: "Juan",
      edad: 23,
      roll: "admin",
    },
    {
      nombre: "Dario",
      edad: 50,
      roll: "admin",
    },
  ];

const home = (req, res) => {
  const params = {
    title: "handlebars",
    nombre: "Martin",
    persona, 
    isAdmin: persona[0].roll === "admin"
  };
  return res.render("home", params);
};

const webSockets = (req, res) => {  // Creo esta vista donde vamos a trabajar con websockets
  const params = {
    title: "web sockets"
  };
  return res.render("websockets", params);
};

module.exports = { home, webSockets }