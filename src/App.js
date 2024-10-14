import styles from'./App.module.css';
import Button from './components/button/button';
import GeneratedImage from './components/generated-image/generatedImage';
import { useState } from "react";
import Loader from './components/loader/loader';
import { FaCloudDownloadAlt } from "react-icons/fa";
import { FaRegFaceSadCry } from "react-icons/fa6";



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

    const downloadImage = async () => {
        try {
          const response = await fetch(catImage);
          const blob = await response.blob();
          const blobUrl = URL.createObjectURL(blob);
    
          // Create a temporary anchor element and trigger the download
          const link = document.createElement('a');
          link.href = blobUrl;
          link.download = 'randomcat.png';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
    
          // Revoke the object URL to free up memory
          URL.revokeObjectURL(blobUrl);
        } catch (error) {
          console.error('Failed to download the image:', error);
        }
      };

  return (
    <div className={styles.app}>
        <div className={styles.imgCard}>
            {!loading  && <GeneratedImage catImage={catImage} key={imageCount} />}
            {loading  && <Loader/>}
            {error && <pre style={{color: "white"}}>{error}</pre>}
            <Button fetchCatImage={fetchCatImage} />
            {
                catImage && (
                    <div>
                        <FaCloudDownloadAlt
                        color  = 'pink' 
                        size = '2em'
                        onClick = {downloadImage}
                        />
                        <pre style={{color: 'white'}}>Disclaimer: Does not download the specific picture <FaRegFaceSadCry color  = 'pink' />
                        </pre>
                    </div>
                )
            }
        </div>
    </div>
  );
}

export default App;
