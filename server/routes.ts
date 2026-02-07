import type { Express, Request, Response } from "express";
import { type Server } from "http";
import { isAuthenticated } from "./replit_integrations/auth";
import { db } from "./db";
import { pendingApprovals, registryAssets, activeTasks } from "@shared/schema";
import { sql } from "drizzle-orm";

const PYTHON_BACKEND_URL = process.env.PYTHON_BACKEND_URL || "http://localhost:8001";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get("/api/vault/pending", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const pending = await db.select().from(pendingApprovals).where(sql`${pendingApprovals.status} = 'pending'`);
      res.json(pending);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch pending approvals" });
    }
  });

  app.post("/api/vault/authorize/:id", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      
      const [approval] = await db.select().from(pendingApprovals).where(sql`${pendingApprovals.id} = ${id}`);
      
      if (!approval) {
        return res.status(404).json({ error: "Approval not found" });
      }

      await db.update(pendingApprovals)
        .set({ status: "authorized" })
        .where(sql`${pendingApprovals.id} = ${id}`);

      if (approval.type === "product" && approval.taskId) {
        const [task] = await db.select().from(activeTasks).where(sql`${activeTasks.id} = ${approval.taskId}`);
        
        if (task) {
          await db.insert(registryAssets).values({
            name: task.title,
            description: task.description || "",
            category: (task.metadata as any)?.category || "Utility",
            status: "operational",
            link: (task.metadata as any)?.link,
            metrics: { users: "0", revenue: "$0" },
          });

          await db.delete(activeTasks).where(sql`${activeTasks.id} = ${approval.taskId}`);
        }
      }

      if (approval.type === "twitter_thread") {
        try {
          const pythonResponse = await fetch(`${PYTHON_BACKEND_URL}/api/twitter/post`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              approval_id: id,
              content: approval.content
            }),
          });
          
          if (!pythonResponse.ok) {
            console.error("Twitter post failed:", await pythonResponse.text());
          }
        } catch (twitterError) {
          console.error("Failed to post to Twitter:", twitterError);
        }
      }

      res.json({ success: true, message: "Authorization granted" });
    } catch (error) {
      res.status(500).json({ error: "Failed to authorize" });
    }
  });

  app.post("/api/vault/reject/:id", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      
      await db.update(pendingApprovals)
        .set({ status: "rejected" })
        .where(sql`${pendingApprovals.id} = ${id}`);

      res.json({ success: true, message: "Rejected" });
    } catch (error) {
      res.status(500).json({ error: "Failed to reject" });
    }
  });

  app.post("/api/vault/directive", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const { content } = req.body;
      
      if (!content || typeof content !== "string") {
        return res.status(400).json({ error: "Directive content required" });
      }

      try {
        await fetch(`${PYTHON_BACKEND_URL}/api/control/directive`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content }),
        });
      } catch {
      }

      res.json({ success: true, message: "Directive injected" });
    } catch (error) {
      res.status(500).json({ error: "Failed to inject directive" });
    }
  });

  app.get("/api/registry/assets", async (req: Request, res: Response) => {
    try {
      const assets = await db.select().from(registryAssets);
      res.json(assets);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch assets" });
    }
  });

  app.get("/api/lab/tasks", async (req: Request, res: Response) => {
    try {
      const tasks = await db.select().from(activeTasks);
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tasks" });
    }
  });

  app.get("/api/twitter/status", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const response = await fetch(`${PYTHON_BACKEND_URL}/api/twitter/status`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.json({ configured: false, error: "Python backend unavailable" });
    }
  });

  app.use("/api/control", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const path = req.path;
      const url = `${PYTHON_BACKEND_URL}/api/control${path}`;
      
      const response = await fetch(url, {
        method: req.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: ["POST", "PUT", "PATCH", "DELETE"].includes(req.method) 
          ? JSON.stringify(req.body) 
          : undefined,
      });
      
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      res.status(502).json({ error: "Python backend unavailable" });
    }
  });

  return httpServer;
}
