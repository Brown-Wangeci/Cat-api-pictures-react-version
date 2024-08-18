import styles from './loader.module.css';
import profileImage from './smile.png';
import Shimmer from './shimmer/shimmer';


const Loader = () => {
    return ( 
        <div className={styles.loaderWrapper}>
            <div className={styles.loader}>
                <div className={styles.profile}>
                    <img className={styles.img} src={profileImage} alt="cat-profile"/>
                </div>
            </div>
            <Shimmer />
        </div>
     );
}
 
export default Loader;