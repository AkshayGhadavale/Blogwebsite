import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from '../appwrite/mainconfig'
import { Button, Container } from "../Componnets/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);



    const isAuthor = post && userData ? post.userid === userData.$id : false;
    
   
   
 
    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) setPost(post);
               
                else navigate("/");
           

            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        service.deletepost(post.$id).then((status) => {
            if (status) {
                service.deleteFile(post.image);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8 px-4 md:px-8">
          <Container>
            <div className="w-full flex flex-col items-center mb-4 relative border rounded-xl p-2">
              <img
                src={service.getFilePreview(post.image)}
                alt={post.title}
                className="rounded-xl max-w-xs w-auto object-contain"
              />
              
              {isAuthor && (
                <div className="absolute right-4 top-4 md:right-6 md:top-6 flex space-x-2">
                  <Link to={`/edit-post/${post.$id}`}>
                    <Button bgColor="bg-green-500" className="mr-3">
                      Edit
                    </Button>
                  </Link>
                  <Button bgColor="bg-red-500" onClick={deletePost}>
                    Delete
                  </Button>
                </div>
              )}
            </div>
            <div className="w-full mb-6">
              <h1 className="text-2xl font-bold text-center md:text-left">{post.title}</h1>
            </div>
            <div className="browser-css">
              {parse(post.content)}
            </div>
          </Container>
        </div>
      ) : null;
      
      
}