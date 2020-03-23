import React, { useState, useEffect } from 'react';
import articles from './article-content';
import { useParams } from 'react-router-dom';
import CommentsList from '../components/CommentsList';
import UpvotesSection from '../components/UpvotesSection';

const ArticlePage = () => {
    const [articleInfo, setArticleInfo] = useState({ upvotes:0, comments: [] })
    const { name } = useParams();

    useEffect(() => {
        const fetchArticleInfo = async () => {
            const result = await fetch(`/api/articles/${name}`);
            const body = await result.json();
            setArticleInfo(body);
        };

        fetchArticleInfo();
    }, [name]);

    const matchingArticle = articles.find(
      article => article.name === name  
    );

    return !matchingArticle ? <h1>Article doesn't exist!</h1> : (
        <>
        <h1>{matchingArticle.name} article </h1>
        <UpvotesSection 
            upvotes={articleInfo.upvotes}
            articleName={name}
            setArticleInfo={setArticleInfo} />
        <p>This article has {articleInfo.upvotes} upvotes</p>
        {matchingArticle.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
        ))}
        <CommentsList comments={articleInfo.comments} articleName={name} setArticleInfo={setArticleInfo} />
        </>
    );  
}

export default ArticlePage;