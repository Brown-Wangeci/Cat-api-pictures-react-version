import styles from'./App.module.css';
import Button from './components/button/button';
import GeneratedImage from './components/generated-image/generatedImage';
import { useState } from "react";
import Loader from './components/loader/loader';

function App() {
    const API_URL = 'https://cataas.com/cat';
    const OPTIONS = {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    };

    const [catImage, setCatImage] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageCount, setImageCount] = useState(0);

    const fetchCatImage = async () => {
        try {
            setLoading(true);
            setError(null);
            const catData = await fetch(API_URL, OPTIONS);
            if(!catData.ok){
                throw new Error('Error fetching');
            }else{
                setCatImage(catData.url);
                setImageCount(prevImageCount => prevImageCount + 1);
            }
        } catch (error) {
            setError(error.message);
            console.error(error);
        } finally{
            setLoading(false);
        }
    }

  return (
    <div className={styles.app}>
        <div className={styles.imgCard}>
          {!loading  && <GeneratedImage catImage={catImage} key={imageCount} />}
          {loading  && <Loader/>}
          {error && <pre style={{color: "white"}}>{error}</pre>}
          <Button fetchCatImage={fetchCatImage} />
        </div>
    </div>
  );
}

export default App;
