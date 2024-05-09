const readline = require("readline");
const { execSync } = require("child_process");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter the port number: ", (port: any) => {
  console.log(`Starting server on port ${port}...`);
  process.env.PORT = port;
  execSync("ts-node -r tsconfig-paths/register ./src/app.ts");
  rl.close();
});
