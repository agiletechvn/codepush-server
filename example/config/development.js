const path = require("path");

module.exports = {
  connection: {
    port: 9001
  },
  plugins: {
    "electrode-ota-server-dao-cassandra": {
      options: {
        contactPoints: ["localhost"],
        username: "cassandra",
        password: "cassandra",
        keyspace: "ota_db"
      }
    },
    "electrode-ota-server-fileservice-upload": {
      options: {
        downloadUrl: "http://localhost:9001/storagev2/"
      }
    },
    "my-sso-plugin": {
      module: path.join(__dirname, "../my-sso"),
      priority: -9800,
      enabled: true
    },
    "electrode-ota-server-auth": {
      options: {
        strategy: {
          "github-oauth": {
            enable: false
          },
          session: {
            options: {
              cookie: "jchen-auth-cookie",
              isSecure: false,
              isHttpOnly: false,
              password:
                "aasd123123mnl1kj31lk2312l3n1l2312l3kn12l3n12n312kj3n12kj3n12k3jn12k3n12k3n"
            }
          }
        }
      }
    },
    "electrode-ota-server-routes-auth": {
      options: {
        providers: [
          {
            name: "walmart-sso",
            auth: "my-sso-strategy",
            label: "Walmart SSO",
            icon: {
              height: 50,
              width: 50
            }
          }
        ]
      }
    }
  }
};
