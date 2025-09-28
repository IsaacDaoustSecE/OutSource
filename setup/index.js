const express = require("express");
const app = express();

app.use(express.json());

const freelancerRoutes = require("./routes/freelancers");
const clientRoutes = require("./routes/clients");
const projectRoutes = require("./routes/projects");
const contractRoutes = require("./routes/contracts");

app.use("/freelancers", freelancerRoutes);
app.use("/clients", clientRoutes);
app.use("/projects", projectRoutes);
app.use("/contracts", contractRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
