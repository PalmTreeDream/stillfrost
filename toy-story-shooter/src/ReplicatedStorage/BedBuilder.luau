--!strict
-- Procedurally builds Andy's twin bed from Toy Story.
-- Scaled deliberately oversized so a toy-sized player feels small around it.
--
-- Usage:
--   local BedBuilder = require(game.ReplicatedStorage.BedBuilder)
--   BedBuilder.build(CFrame.new(0, 0, 0), workspace)

local BedBuilder = {}

local Palette = {
	WoodLight = Color3.fromRGB(160, 105, 60),
	WoodDark  = Color3.fromRGB(110, 70, 35),
	SkyBlue   = Color3.fromRGB(85, 150, 220),
	Cloud     = Color3.fromRGB(250, 250, 245),
	Sheet     = Color3.fromRGB(253, 250, 240),
	Red       = Color3.fromRGB(210, 65, 60),
	RedTrim   = Color3.fromRGB(175, 45, 45),
}

local function part(parent: Instance, props: { [string]: any }): Part
	local p = Instance.new("Part")
	p.Anchored = true
	p.CanCollide = true
	p.TopSurface = Enum.SurfaceType.Smooth
	p.BottomSurface = Enum.SurfaceType.Smooth
	p.Material = Enum.Material.Wood
	p.Color = Palette.WoodLight
	for k, v in pairs(props) do
		(p :: any)[k] = v
	end
	p.Parent = parent
	return p
end

local function wood(parent: Instance, name: string, size: Vector3, position: Vector3, color: Color3?): Part
	return part(parent, {
		Name = name,
		Size = size,
		CFrame = CFrame.new(position),
		Material = Enum.Material.Wood,
		Color = color or Palette.WoodLight,
	})
end

local function fabric(parent: Instance, name: string, size: Vector3, position: Vector3, color: Color3): Part
	return part(parent, {
		Name = name,
		Size = size,
		CFrame = CFrame.new(position),
		Material = Enum.Material.Fabric,
		Color = color,
	})
end

local function ball(parent: Instance, name: string, size: Vector3, position: Vector3, color: Color3, material: Enum.Material?): Part
	return part(parent, {
		Name = name,
		Shape = Enum.PartType.Ball,
		Size = size,
		CFrame = CFrame.new(position),
		Material = material or Enum.Material.Wood,
		Color = color,
	})
end

-- Vertical wood disk (PartType.Cylinder rotated so the round face is horizontal).
local function disk(parent: Instance, name: string, diameter: number, height: number, position: Vector3, color: Color3?): Part
	return part(parent, {
		Name = name,
		Shape = Enum.PartType.Cylinder,
		Size = Vector3.new(height, diameter, diameter),
		CFrame = CFrame.new(position) * CFrame.Angles(0, 0, math.pi / 2),
		Material = Enum.Material.Wood,
		Color = color or Palette.WoodLight,
	})
end

local function post(parent: Instance, name: string, x: number, height: number, z: number)
	wood(parent, name, Vector3.new(1.2, height, 1.2), Vector3.new(x, height / 2, z))
end

-- Classic turned-wood finial: base ring -> drum -> narrow neck -> ball cap.
-- Sits on top of a post whose top face is at world Y = postTopY.
local function finial(parent: Instance, prefix: string, x: number, postTopY: number, z: number)
	disk(parent, prefix .. "Base", 1.5, 0.25, Vector3.new(x, postTopY + 0.125, z), Palette.WoodLight)
	disk(parent, prefix .. "Drum", 1.0, 0.40, Vector3.new(x, postTopY + 0.45,  z), Palette.WoodDark)
	disk(parent, prefix .. "Neck", 0.5, 0.30, Vector3.new(x, postTopY + 0.80,  z), Palette.WoodDark)
	ball(parent, prefix .. "Ball", Vector3.new(1.4, 1.4, 1.4), Vector3.new(x, postTopY + 1.65, z), Palette.WoodDark)
end

local function cloud(parent: Instance, index: number, center: Vector3)
	-- A puffy cloud is one larger flattened ball plus a few satellite puffs.
	ball(parent, `Cloud{index}Main`, Vector3.new(2.8, 1.3, 2.2), center, Palette.Cloud, Enum.Material.Fabric)
	ball(parent, `Cloud{index}A`,    Vector3.new(1.7, 1.0, 1.5), center + Vector3.new( 1.3, -0.1,  0.4), Palette.Cloud, Enum.Material.Fabric)
	ball(parent, `Cloud{index}B`,    Vector3.new(1.5, 0.9, 1.4), center + Vector3.new(-1.2, -0.05, -0.5), Palette.Cloud, Enum.Material.Fabric)
	ball(parent, `Cloud{index}C`,    Vector3.new(1.2, 0.8, 1.1), center + Vector3.new( 0.2,  0.05,  1.2), Palette.Cloud, Enum.Material.Fabric)
end

-- Builds the bed at originCF (origin = floor center, head end faces -Z).
function BedBuilder.build(originCF: CFrame?, parent: Instance?): Model
	local where: CFrame = originCF or CFrame.new(0, 0, 0)
	local target: Instance = parent or workspace

	local bed = Instance.new("Model")
	bed.Name = "AndysBed"

	---------------------------------------------------------------------------
	-- Frame: side rails + end rails, just under the box spring
	---------------------------------------------------------------------------
	wood(bed, "LeftSideRail",  Vector3.new(0.7, 1.8, 30), Vector3.new(-8, 4, 0))
	wood(bed, "RightSideRail", Vector3.new(0.7, 1.8, 30), Vector3.new( 8, 4, 0))
	wood(bed, "HeadEndRail",   Vector3.new(16,  1.5, 0.7), Vector3.new(0, 4, -15))
	wood(bed, "FootEndRail",   Vector3.new(16,  1.5, 0.7), Vector3.new(0, 4,  15))

	---------------------------------------------------------------------------
	-- Corner posts (head posts taller than foot posts)
	---------------------------------------------------------------------------
	post(bed, "PostHeadLeft",  -8, 13, -15)
	post(bed, "PostHeadRight",  8, 13, -15)
	post(bed, "PostFootLeft",  -8, 10,  15)
	post(bed, "PostFootRight",  8, 10,  15)

	-- Layered turned-wood finials on top of each post
	finial(bed, "FinialHeadLeft_",  -8, 13, -15)
	finial(bed, "FinialHeadRight_",  8, 13, -15)
	finial(bed, "FinialFootLeft_",  -8, 10,  15)
	finial(bed, "FinialFootRight_",  8, 10,  15)

	---------------------------------------------------------------------------
	-- Headboard: top rail + bottom rail + vertical spindles
	---------------------------------------------------------------------------
	wood(bed, "HeadboardTopRail",    Vector3.new(17.5, 1.2, 0.6), Vector3.new(0, 11.5, -15))
	wood(bed, "HeadboardBottomRail", Vector3.new(17.5, 0.5, 0.4), Vector3.new(0,  7.8, -15))
	for i, x in ipairs({ -6, -4, -2, 0, 2, 4, 6 }) do
		wood(bed, `HeadboardSpindle{i}`, Vector3.new(0.45, 3.7, 0.45), Vector3.new(x, 9.65, -15), Palette.WoodDark)
	end

	---------------------------------------------------------------------------
	-- Footboard: shorter, fewer spindles
	---------------------------------------------------------------------------
	wood(bed, "FootboardTopRail",    Vector3.new(17.5, 1.2, 0.6), Vector3.new(0, 9.4, 15))
	wood(bed, "FootboardBottomRail", Vector3.new(17.5, 0.5, 0.4), Vector3.new(0, 7.95, 15))
	for i, x in ipairs({ -5, -2.5, 0, 2.5, 5 }) do
		wood(bed, `FootboardSpindle{i}`, Vector3.new(0.45, 1.3, 0.45), Vector3.new(x, 8.65, 15), Palette.WoodDark)
	end

	---------------------------------------------------------------------------
	-- Box spring (white sheet) with red trim strips on the visible long sides
	---------------------------------------------------------------------------
	fabric(bed, "BoxSpring",       Vector3.new(15.5, 1.2, 29.5), Vector3.new(0, 5.5, 0), Palette.Sheet)
	fabric(bed, "BoxSpringTrimL",  Vector3.new(0.1,  0.4, 29.5), Vector3.new(-7.78, 5.5, 0), Palette.RedTrim)
	fabric(bed, "BoxSpringTrimR",  Vector3.new(0.1,  0.4, 29.5), Vector3.new( 7.78, 5.5, 0), Palette.RedTrim)

	---------------------------------------------------------------------------
	-- Mattress
	---------------------------------------------------------------------------
	fabric(bed, "Mattress", Vector3.new(15, 1.6, 29), Vector3.new(0, 7, 0), Palette.Sheet)

	---------------------------------------------------------------------------
	-- Two pillows side by side near the headboard, with red piping
	---------------------------------------------------------------------------
	fabric(bed, "PillowLeft",      Vector3.new(6, 1, 4),     Vector3.new(-3.5, 8.3, -10), Palette.Cloud)
	fabric(bed, "PillowRight",     Vector3.new(6, 1, 4),     Vector3.new( 3.5, 8.3, -10), Palette.Cloud)
	fabric(bed, "PillowTrimLeft",  Vector3.new(6, 0.15, 0.3), Vector3.new(-3.5, 8.8, -12), Palette.Red)
	fabric(bed, "PillowTrimRight", Vector3.new(6, 0.15, 0.3), Vector3.new( 3.5, 8.8, -12), Palette.Red)

	---------------------------------------------------------------------------
	-- Cloud-print blue blanket on top of the mattress, with a slight drape
	---------------------------------------------------------------------------
	fabric(bed, "Blanket",         Vector3.new(15.4, 0.4, 22),  Vector3.new(0,    7.9,  3),    Palette.SkyBlue)
	fabric(bed, "BlanketDrapeL",   Vector3.new(0.4,  0.8, 22),  Vector3.new(-7.7, 7.7,  3),    Palette.SkyBlue)
	fabric(bed, "BlanketDrapeR",   Vector3.new(0.4,  0.8, 22),  Vector3.new( 7.7, 7.7,  3),    Palette.SkyBlue)
	fabric(bed, "BlanketDrapeFoot",Vector3.new(15.4, 2.0, 0.4), Vector3.new(0,    6.9,  14.2), Palette.SkyBlue)

	-- White cloud puffs scattered across the blanket
	local cloudCenters = {
		Vector3.new(-4,   8.25, -3),
		Vector3.new( 3.5, 8.25,  0),
		Vector3.new(-2,   8.25,  5),
		Vector3.new( 4,   8.25,  8),
		Vector3.new(-5,   8.25, 11),
		Vector3.new( 1,   8.25, -7),
	}
	for i, c in ipairs(cloudCenters) do
		cloud(bed, i, c)
	end

	---------------------------------------------------------------------------
	-- Red blanket folded over the foot, peeking out from under the blue one
	---------------------------------------------------------------------------
	fabric(bed, "RedFoldedBlanket", Vector3.new(15.4, 0.5, 4), Vector3.new(0, 8.2, 12), Palette.Red)

	---------------------------------------------------------------------------
	-- Finalize: place model and use the mattress as the pivot reference
	---------------------------------------------------------------------------
	bed.PrimaryPart = bed:FindFirstChild("Mattress") :: BasePart
	bed.Parent = target
	bed:PivotTo(where)

	return bed
end

return BedBuilder
