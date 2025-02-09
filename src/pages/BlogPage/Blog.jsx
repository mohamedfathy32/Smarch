import { useNavigate } from "react-router-dom";
import { Posts } from "../../api/data";

export default function Blog() {
  const blogPosts = Posts
  const nav = useNavigate()
  const GoToPost = (id) => {
    nav(`/blog/${id}`)
  }
  return (
    <div className="bg-blue-50 py-10">
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-blue-700 text-3xl font-bold">استكشف مقالاتنا</h1>
        <h3 className="text-gray-600 text-lg">
          تعرف على أحدث الأخبار والنصائح حول استئجار الشاليهات وإدارة العطلات المثالية.
        </h3>
        <input
          type="search"
          name="search1"
          id="12"
          placeholder="بحث"
          className="w-72 md:w-96 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Grid for Blog Posts */}
      <div className="flex flex-wrap gap-6 justify-center">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-4 w-full  sm:w-[48%] lg:w-[25%] rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
            onClick={() => GoToPost(post.id)}
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-60 object-cover rounded-lg mb-10"
            />
            <h2 className="text-lg font-semibold text-blue-700 mb-2">{post.title}</h2>
            <p className="text-gray-600 text-sm mb-4">{post.description}</p>
          </div>
        ))}
      </div>


    </div>
  );
}
