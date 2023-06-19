import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const ComponentC = () => {
   
    const [posts, setPosts] = useState([]);
    const [skip, setSkip] = useState(10)
    
    //Initial load data 
    useEffect(() => {
        const initialFetch = () => {
            fetch(
                `https://dummyjson.com/posts?limit=10&skip=0&select=title&select=body`
            )
                .then((res) => res.json())
                .then((data) => setPosts(data.posts));
        };
        initialFetch();
    },[]);
   
    //Fetch data once scroll down to the bottom of page
    const fetchData = async () => {
        const dataSource = await fetch(
            `https://dummyjson.com/posts?limit=10&skip=${skip}&select=title&select=body`
        );
        const postsData = await dataSource.json();

        setPosts(posts.concat(postsData.posts));
        setSkip(skip + 10)
    };
 
    return (
        <>
            <InfiniteScroll
                dataLength={posts?.length}
                next={fetchData}
                hasMore={true}
                loader={<p>Loading...</p>}
                endMessage={<p>Thats all for today</p>}
            >
                <ul style={{listStyle:"none"}}>
                    {posts?.map((item, index) =>   {
                     return <li key={index}>({item.id}) - {item.title}</li>
                    })}
                </ul>
            </InfiniteScroll>
        </>
    );
};

export default ComponentC;
