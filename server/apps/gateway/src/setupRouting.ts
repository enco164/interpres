import { INestApplication } from "@nestjs/common";
import { createProxyMiddleware } from "http-proxy-middleware";

interface GatewayRouteConfig {
  predicate: string;
  target: string;
}

export function setupRouting(app: INestApplication) {
  const gatewayRouteConfigs: GatewayRouteConfig[] = [
    {
      predicate: "/api/translation-service",
      target: process.env.TRANSLATION_SERVICE_URI || "http://localhost:8091",
    },
  ];

  gatewayRouteConfigs.forEach((config) => {
    app.use(
      config.predicate,
      createProxyMiddleware({
        target: config.target,
        pathRewrite: (path) => path.replace(config.predicate, ""),
      })
    );
  });
}
