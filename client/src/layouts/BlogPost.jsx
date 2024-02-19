import React from 'react';
import { BlogCard } from '../components/BlogCard';
import b1 from '../../public/blog/b1.jpg';
import b2 from '../../public/blog/b2.jpg';
import b3 from '../../public/blog/b3.jpg';
import b4 from '../../public/blog/b4.jpg';
import b5 from '../../public/blog/b5.jpg';
import b6 from '../../public/blog/b6.jpg';
import styled from 'styled-components';



const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
`

export default function BlogPost() {
    const BlogPosts = [
        {
          title: "Navigating the Financial Seas: Unraveling Today's Market Trends",
          image: b1,
          body: "In today's dynamic financial landscape, understanding market trends is crucial for making informed decisions. Dive into the current market conditions, analyzing key trends, economic indicators, and factors influencing financial markets. Explore potential investment opportunities and strategies for the year, considering emerging sectors and market predictions. Stay informed about the ever-evolving world of cryptocurrencies, discussing recent developments, market fluctuations, and the future of digital assets. Moreover, gain insights into how geopolitical events and economic policies impact personal finances, providing a comprehensive outlook on potential challenges and opportunities in the financial realm.",
          tags: ["FinancialMarkets", "InvestmentStrategies", "CryptoNews", "EconomicOutlook", "PersonalFinanceInsights"]
        },
        {
          title: "Mastering the Art of Credit: A Guide to Responsible Borrowing",
          image: b2,
          body: "Credit can be a powerful tool or a dangerous pitfall. Learn how to navigate the world of credit responsibly. Understand the importance of credit scores, explore strategies for improving them, and discover the impact of credit on various financial aspects. Whether you're new to credit or looking to enhance your creditworthiness, this guide provides valuable insights and practical tips for managing credit effectively.",
          tags: ["CreditManagement", "CreditScores", "ResponsibleBorrowing", "FinancialEducation"]
        },
        {
          title: "Demystifying Investment Jargon: A Beginner's Guide",
          image:b3,
          body: "Embarking on the investment journey can be daunting with all the complex terminology. This beginner's guide demystifies investment jargon, explaining terms like dividends, bonds, and ETFs in simple language. Equip yourself with the knowledge needed to make informed investment decisions and build a diversified portfolio tailored to your financial goals.",
          tags: ["InvestmentBasics", "FinancialEducation", "Diversification", "InvestmentJargon"]
        },
        {
          title: "The ABCs of Budgeting: A Practical Approach to Financial Wellness",
          image:b4,
          body: "Budgeting is the cornerstone of financial success. This blog post provides a practical approach to budgeting, breaking down the process into simple steps. Learn how to set realistic financial goals, track expenses effectively, and create a budget that aligns with your lifestyle. Achieve financial wellness by mastering the ABCs of budgeting and taking control of your financial future.",
          tags: ["BudgetingTips", "FinancialWellness", "ExpenseTracking", "BudgetingABCs"]
        },
        {
          title: "The Rise of Sustainable Investing: Aligning Profits with Principles",
          image: b5,
          body: "Sustainable investing is gaining momentum, allowing investors to align their financial goals with ethical and environmental values. Explore the principles of sustainable investing, understand ESG criteria, and discover how to incorporate sustainability into your investment strategy. Make a positive impact on the world while achieving financial growth through the rise of sustainable investing.",
          tags: ["SustainableInvesting", "ESGCriteria", "EthicalInvesting", "ImpactInvesting"]
        },
        {
          title: "Unlocking the Secrets of a Healthy Credit Score",
          image: b6,
          body: "Your credit score is a key factor in financial health. This blog post delves into the secrets of maintaining a healthy credit score. Learn about the factors that influence your score, understand how to interpret your credit report, and discover actionable tips for boosting your creditworthiness. Unlock the secrets to a healthy credit score and pave the way for better financial opportunities.",
          tags: ["CreditScoreTips", "CreditHealth", "CreditReport", "FinancialWellbeing"]
        }
      ]
      
  return (
    <>
    <h1>Our Latest Blogs</h1>
    <Container>
        {BlogPosts.map((blog, index) => (
            <BlogCard blog={blog}/>
        ))}
    </Container>
    </>
  )
}
