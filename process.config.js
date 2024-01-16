module.exports = {
  apps: [
    {
      name: "james-edu",
      cwd: "./",
      script: "./src/main.ts",
      watch: "false",
      env_production: {
        NODE_ENV: "production",
      },
      env_development: {
        NODE_ENV: "development",
      },
      instances: 1,
      exec_mode: "cluster",
    },
  ],
};
