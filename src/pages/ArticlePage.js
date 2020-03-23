import React from 'react';
import articles from './article-content';

const ArticlePage = ({ match }) => {
    const { name } = match.params;

    const matchingArticle = articles.find(
      article => article.name === name  
    );

    return !matchingArticle ? <h1>Article doesn't exist!</h1> : (
        <>
        <h1>{matchingArticle.name} article </h1>
        {matchingArticle.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
        ))}
        </>
    );  
}

export default ArticlePage;