import styles from './button.module.css';

const Button = ({fetchCatImage}) => {

    return ( 
        <button onClick={fetchCatImage} className={styles.button} >Click me</button>
     );
}
 
export default Button;