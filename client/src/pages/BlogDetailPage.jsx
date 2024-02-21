import React from 'react'
import styled from 'styled-components';
import b2 from '../../public/blog/b2.jpg'
import { Link } from 'react-router-dom'
import { IoArrowBack } from "react-icons/io5";


const Container = styled.div`
    width: 50vw;
    margin: auto;
    display: grid;
    place-items: center;
    gap: 1rem;


    @media screen and (max-width:800px){
        width: 70vw;
    }


    .back{
        position: absolute;
        top: 5%;
        left: 20%;
        width: 25px;
        height: 25px;
        display: grid;
        place-items: center;
        font-size: 1.3rem;
        background-color: #dfe0b4ba;
        border-radius: 50%;
    }

    .tags{
        display: flex;
        flex-wrap: wrap;
        gap: .4rem;

        span{
            background-color: #a09b7094;
            padding: 0.3rem 1rem;
            border-radius: 20px;
            font-size: 0.8rem;
        }
    }

    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`

function BlogDetailPage() {
    const blog = 
    {
        title: "Navigating the Financial Seas: Unraveling Today's Market Trends",
        image: b2,
        body: "In today's dynamic financial landscape, understanding market trends is crucial for making informed decisions. Dive into the current market conditions, analyzing key trends, economic indicators, and factors influencing financial markets. Explore potential investment opportunities and strategies for the year, considering emerging sectors and market predictions. Stay informed about the ever-evolving world of cryptocurrencies, discussing recent developments, market fluctuations, and the future of digital assets. Moreover, gain insights into how geopolitical events and economic policies impact personal finances, providing a comprehensive outlook on potential challenges and opportunities in the financial realm.",
        tags: ["FinancialMarkets", "InvestmentStrategies", "CryptoNews", "EconomicOutlook", "PersonalFinanceInsights"]
    }
    
  return (
    <Container>
        <Link to={'/'} className='back'>
            <IoArrowBack/>
        </Link>
        <h2 className="title">{blog.title}</h2>
        <div className="tags">
        {blog.tags.map((tag)=>(
            <span>{tag}</span>
        ))}
        </div>
        <div>
            <img src={blog.image} alt="" />
        </div>
        <div className="content">
            <p className="body">
                <p>{blog.body}</p>
            </p>
        </div>
    </Container>
  )
}
export default BlogDetailPage;