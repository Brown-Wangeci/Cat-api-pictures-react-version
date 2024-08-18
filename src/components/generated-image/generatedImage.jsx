import styles from './generatedImage.module.css';


const GeneratedImage = ({catImage}) => {

    return ( 
        <img className={styles.img} src={catImage} alt="Random cat" />
    );
}
 
export default GeneratedImage;