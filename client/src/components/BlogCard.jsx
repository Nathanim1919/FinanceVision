import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const BlogCard = ({blog}) => {
  return (
    <Container>
      <Link to={'/blog'}>
          <img src={blog.image} alt="" />
          <div>
          <div className="tags">
            {(blog.tags || []).map((tag, index) => (
              <span key={index}>{tag}</span>
            ))}
          </div>
          <h2>{blog.title}</h2>
          <p>{blog.body.slice(0, 100)} ...</p>
          </div>
      </Link>
    </Container>
  )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    cursor: pointer;
    overflow: hidden;
    transition: all .3s ease-in-out;
    &:hover{
        transform: scale(1.05);
    }

    h2{
        font-size: 1.1rem;
    }


    img{
        width: 100%;
        height: auto;
        object-fit: cover;
    }

    .tags{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: .2rem;
        padding: 0.2rem 1rem;


        span{
            font-size: .7rem;
            background-color: #00800040;
            color: green;
            margin: .1rem;
            border-radius: 10px;
            padding: 0.1rem .4rem;
        }
    }


    >*{
        margin: 0;
    }

    a{
      color: #333;
      text-decoration: none;
    }
`
