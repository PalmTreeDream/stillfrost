--!strict
-- Spawns Andy's bed in the workspace at server start, under a "Bedroom" folder.

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Workspace = game:GetService("Workspace")

local BedBuilder = require(ReplicatedStorage:WaitForChild("BedBuilder"))

local bedroom = Workspace:FindFirstChild("Bedroom")
if not bedroom then
	bedroom = Instance.new("Folder")
	bedroom.Name = "Bedroom"
	bedroom.Parent = Workspace
end

BedBuilder.build(CFrame.new(0, 0, 0), bedroom)
