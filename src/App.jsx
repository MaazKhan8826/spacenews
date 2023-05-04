import { useEffect, useState } from 'react';
import './App.css';


function App() {
  const [newsList, setNewsList] = useState([]);
  const [newsData, setNewsData] = useState({});
  const [loading, setLoading] = useState(false);

  function nextPage() {
    setLoading(true)
    fetch(newsData.next).then(response => {
      response.json().then(data => {
        setNewsList(data.results);
        setNewsData(data);
        setLoading(false)
      });
    });
  }

  function prevPage() {
    setLoading(true)
    fetch(newsData.previous).then(response => {
      response.json().then(data => {
        setNewsList(data.results);
        setNewsData(data);
        setLoading(false)
      });
    });
    
  }

  useEffect(()=>{
    setLoading(true)
    fetch("https://api.spaceflightnewsapi.net/v4/articles/?format=json").then(response => {
      response.json().then(data => {
        setNewsList(data.results)
        setNewsData(data)
        setLoading(false)
      })
    })
  },[])

  return (
    <div className="App font-sans">
      <div className='w-100% text-5xl mt-5 mb-2 font-bold'>
        <h1>Space News</h1>
      </div>
      <div className='flex flex-col place-items-center'>
        {loading ? (<div className='text-4xl m-10'>Loading...</div>) : (newsList.map((article,key) => {
          return <div key={key} className='m-5 p-4 border-2 w-[50%]'>
            <h1 className='mt-2 mb-4 text-3xl'>{article.title}</h1>
            <img src={article.image_url} className='mt-2 mb-2' />
            <p className='mt-4'>{article.summary}</p>
          </div>
        })) }
      </div>
      <div>
        <button className='bg-gray-400 p-2 rounded-lg m-4' onClick={() => prevPage()}>Previous Page</button>
        <button className='bg-gray-400 p-2 rounded-lg m-4' onClick={() => nextPage()}>Next Page</button>
      </div>
    </div>
  );
}

export default App;
