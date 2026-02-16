import Blog from "../models/Blog.js";

// Create / Publish Blog
// Create / Publish Blog
export const createBlog = async (req, res) => {
  try {
    const { title, markdown, author, tags } = req.body;

    // Validate required fields
    if (!title || !markdown || !author) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all the required fields: title, content, and author name.",
      });
    }

    // Process tags
    let processedTags = [];
    if (typeof tags === 'string') {
       // If coming from FormData, it might be a comma separated string
       processedTags = tags.split(',').map(t => t.trim()).filter(t => t.length > 0);
    } else if (Array.isArray(tags)) {
       processedTags = tags.map(t => String(t).trim()).filter(t => t.length > 0);
    }

    // Handle cover image (uploaded via multer/cloudinary)
    const cover = req.file ? req.file.path : null;

    // Create a new blog document
    const newBlog = new Blog({
      title,
      markdown,
      author,
      authorId: req.user ? req.user._id : undefined, // Save author ID
      cover,
      tags: processedTags,
      date: new Date(),
      readTime: Math.ceil(markdown.length / 1000) + 2,
    });

    await newBlog.save();

    res.status(201).json({
      success: true,
      message: "🎉 Your blog has been published successfully!",
      blog: newBlog,
    });
  } catch (error) {
    console.error("❌ Error creating blog:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while publishing your blog. Please try again later.",
    });
  }
};

// Increment View Count
export const incrementView = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true });
        
        if(!blog) return res.status(404).json({ success: false, message: "Blog not found" });

        return res.status(200).json({ success: true, views: blog.views });
    } catch (error) {
        console.error("Error incrementing view:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// Delete Blog
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found." });
    }

    // Use strict check if authorId exists, otherwise maybe allow admin? 
    // Or if authorId is not set (old blogs), fallback to name check? (Less secure but ok for migration)
    if (blog.authorId && blog.authorId.toString() !== userId.toString()) {
        return res.status(403).json({ success: false, message: "Not authorized to delete this blog." });
    }
    
    await Blog.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Blog deleted successfully.", blogId: id });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ success: false, message: "Unable to delete blog." });
  }
};

// Get all blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: -1 });

    if (blogs.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No blogs available right now. Be the first to write one!",
        blogs: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Blogs fetched successfully.",
      totalBlogs: blogs.length,
      blogs,
    });
  } catch (error) {
    console.error("❌ Error fetching blogs:", error);
    res.status(500).json({
      success: false,
      message: "Unable to fetch blogs at the moment. Please try again later.",
    });
  }
};
