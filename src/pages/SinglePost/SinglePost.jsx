import { useParams } from "react-router-dom";
import { Posts } from "../../api/data";

export default function SinglePost() {
    const { id } = useParams()
    const post = Posts.find(post => post.id === parseInt(id))
    console.log(post.image)
    return (
        <div className="mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="text-center mx-auto">
                <img
                    src={post.image}
                    alt="Chalet"
                    className="w-[80%] h-96 object-contain mx-auto"
                />
            </div>
            <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">{post.title}</h2>
                <p className="text-gray-600 leading-relaxed mb-4">{post.description}</p>

            </div>
        </div>
    );

}
