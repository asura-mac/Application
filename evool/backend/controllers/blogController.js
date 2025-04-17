import Blog from './../model/Blog.js';

const blogController = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch blogs.' });
  }
};

export default blogController; 
