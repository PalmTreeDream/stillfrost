import type { Express } from "express";
import { type Server } from "http";

export async function registerRoutes(
  httpServer: Server,
  _app: Express
): Promise<Server> {
  // All old agent/vault/lab API routes have been removed.
  // StillFrost is now a minimal product studio landing page.

  return httpServer;
}
