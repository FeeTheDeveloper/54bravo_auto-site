import { bindings, defineConfig, defineWorker } from "cf/config";

export default defineConfig({
  accountId: "62738e2bb751720449f1cd904f6d175f",
  worker: defineWorker({
    name: "54bravo-auto-site",
    entrypoint: "vinext/server/fetch-handler",
    domains: ["54bravoauto.com", "www.54bravoauto.com"],
    compatibilityDate: "2026-10-26",
    compatibilityFlags: ["nodejs_compat"],
    assets: {
      htmlHandling: "none",
      notFoundHandling: "none",
      runWorkerFirst: ["/*", "!/_next/static/*", "!/*/_next/static/*"],
    },
    env: {
      ASSETS: bindings.assets(),
    },
  }),
});
