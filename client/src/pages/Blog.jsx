import React from 'react';
import styled from 'styled-components';

const BlogContainer = styled.div `
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 20px;

  .blog {
    width: 290px;
    margin: 20px;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    img {
      width: 100%;
      border-radius: 8px;
      margin-bottom: 10px;
    }

    h2 {
      font-size: 1.5rem;
      margin-bottom: 10px;
    }

    p {
      font-size: 1rem;
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
    image: 'https://example.com/image1.jpg',
    title: 'Navigating the Stock Market: A Beginner\'s Guide',
    content: 'Learn the basics of investing in stocks, understand market trends, and discover key strategies for building a successful investment portfolio.',
  },
  {
    id: 2,
    image: 'https://example.com/image2.jpg',
    title: 'Budgeting 101: Taking Control of Your Finances',
    content: 'Explore effective budgeting techniques to manage your money, save for goals, and achieve financial stability.',
  },
  {
    id: 3,
    image: 'https://example.com/image3.jpg',
    title: 'Cryptocurrency Trends: What You Need to Know',
    content: 'Stay updated on the latest trends in the world of cryptocurrency, including market insights, regulatory changes, and the future of digital currencies.',
  },
  {
    id: 4,
    image: 'https://example.com/image4.jpg',
    title: 'Retirement Planning Strategies for Every Age',
    content: 'Discover personalized retirement planning tips based on your age, income, and financial goals. Ensure a comfortable and secure retirement.',
  },
  {
    id: 5,
    image: 'https://example.com/image5.jpg',
    title: 'The Impact of Inflation on Your Finances',
    content: 'Understand how inflation affects your purchasing power and learn practical strategies to protect your finances from its impact.',
  },
  {
    id: 6,
    image: 'https://example.com/image6.jpg',
    title: 'Mastering Credit Scores: A Comprehensive Guide',
    content: 'Demystify credit scores, learn how they impact your financial life, and discover ways to improve and maintain a healthy credit score.',
  },
];

function Blog() {
  return (
    <>
    <h1>Our latest Blogs</h1>
    <BlogContainer className = 'blogContainer' >
      {blogPosts.map(post => (
        <div className='blog' key={post.id}>
          <img src={post.image} alt={`Blog post - ${post.title}`} />
          <div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
          <div>
            <button>Learn More</button>
          </div>
        </div>
      ))}
    </BlogContainer>
    </>
  );
}

export default Blog;
