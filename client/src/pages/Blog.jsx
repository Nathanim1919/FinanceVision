import React,{useEffect} from 'react';
import styled from 'styled-components';
import blogImage1 from '../../src/assets/blog/b1.jpg';
import blogImage2 from '../../src/assets/blog/b2.jpg';
import blogImage3 from '../../src/assets/blog/b3.jpg';
import blogImage4 from '../../src/assets/blog/b4.jpg';
import blogImage5 from '../../src/assets/blog/b5.jpg';
import blogImage6 from '../../src/assets/blog/b6.jpg';
import Aos from 'aos';
import 'aos/dist/aos.css'


const Container = styled.div`
  display: grid;
  place-items: center;
  position: relative;
  gap:2rem;
  width: 80vw;
  margin: auto;
  
  
  >button{
    padding: .6rem 1rem;
    border: none;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    
    &:hover{
      opacity: .7;
    }
  }
  `

const BlogContainer = styled.div `
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  position: relative;
  widows: 100%;
  gap: 2rem;


  @media screen and (min-width:700px){
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }

  .blog {
    border-radius: 8px;
    width: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    .textContent{
      padding: 1rem;
    }

    img {
      width: 100%;
      margin-bottom: 10px;
    }

    h2 {
      font-size: 1.1rem;
      margin-bottom: 10px;
    }

    p {
      font-size: .9rem;
      color: #555;
      margin-bottom: 15px;
    }

    button {
      background-color: #007bff;
      color: #fff;
      border: none;
      padding: 8px 12px;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #0056b3;
      }
    }
  }
`;

const blogPosts = [
  {
    id: 1,
    image: blogImage1,
    title: 'Navigating the Stock Market: A Beginner\'s Guide',
    content: 'Learn the basics of investing in stocks, understand market trends, and discover key strategies for building a successful investment portfolio.',
  },
  {
    id: 2,
    image: blogImage2,
    title: 'Budgeting 101: Taking Control of Your Finances',
    content: 'Explore effective budgeting techniques to manage your money, save for goals, and achieve financial stability.',
  },
  {
    id: 3,
    image: blogImage4,
    title: 'Cryptocurrency Trends: What You Need to Know',
    content: 'Stay updated on the latest trends in the world of cryptocurrency, including market insights, regulatory changes, and the future of digital currencies.',
  },
  {
    id: 4,
    image: blogImage3,
    title: 'Retirement Planning Strategies for Every Age',
    content: 'Discover personalized retirement planning tips based on your age, income, and financial goals. Ensure a comfortable and secure retirement.',
  },
  {
    id: 5,
    image: blogImage6,
    title: 'The Impact of Inflation on Your Finances',
    content: 'Understand how inflation affects your purchasing power and learn practical strategies to protect your finances from its impact.',
  },
  {
    id: 6,
    image: blogImage5,
    title: 'Mastering Credit Scores: A Comprehensive Guide',
    content: 'Demystify credit scores, learn how they impact your financial life, and discover ways to improve and maintain a healthy credit score.',
  },
];

function Blog() {
    useEffect(() => {
      Aos.init({
        duration: 500
      })
    }, []);
  return (
    <Container>
    <h1>Our latest Blogs</h1>
    <BlogContainer className = 'blogContainer' >
      {blogPosts.map(post => (
        <div data-aos="zoom-in" className='blog' key={post.id}>
          <img src={post.image} alt={`Blog post - ${post.title}`} />
          <div className = 'textContent' >
            <div>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </div>
            <div>
              <button>Learn More</button>
            </div>
          </div>
        </div>
      ))}
    </BlogContainer>
    <button>Read more</button>
    </Container>
  );
}

export default Blog;
