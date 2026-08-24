const Project = require("../models/Project");
const {
  parsePagination,
  buildPaginationMeta,
} = require("../utils/propertyQuery");

async function getProjects(req, res, next) {
  try {
    const { page, limit, skip } = parsePagination(req.query);
    const filter = {};

    if (req.query.city) {
      filter.city = new RegExp(`^${String(req.query.city).trim()}$`, "i");
    }

    const [projects, total] = await Promise.all([
      Project.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Project.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: projects,
      pagination: buildPaginationMeta(total, page, limit),
    });
  } catch (error) {
    next(error);
  }
}

async function getProject(req, res, next) {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
}

async function createProject(req, res, next) {
  try {
    if (!req.body.name || !req.body.city || !req.body.locality) {
      return res.status(400).json({
        success: false,
        message: "name, city and locality are required",
      });
    }

    const project = await Project.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
}

async function updateProject(req, res, next) {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    Object.assign(project, req.body);
    await project.save();

    res.json({ success: true, data: project });
  } catch (error) {
    next(error);
  }
}

async function deleteProject(req, res, next) {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.json({
      success: true,
      data: { message: "Project deleted successfully" },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
};
