
import React,{useState,useEffect} from 'react'
import service from '../appwrite/mainconfig'
import { Container,PostForm } from '../Componnets/index'
import { useNavigate,useParams } from 'react-router-dom'

const Editpost = () => {
    const [post,setPosts]=useState([])
    const {slug}= useParams()
    const navigate = useNavigate()
  

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                  
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])


    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
      ) : null
}

export default Editpost