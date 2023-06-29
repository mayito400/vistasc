import app from "./app.js";

app.listen(app.get("port"), () => {
  console.table({
    MESSAGE: "Ejecutando...",
    PORT: app.get("port"),
    URL: `http://localhost:${app.get("port")}`,
  });
});
