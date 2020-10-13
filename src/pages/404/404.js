import React from "react";
import styles from "../../modules/page404.module.scss"
import Button from "../../shared/sandbox/Button";

const Page404 = () => {
  function goHome() {
    window.location.replace('/');
  }

  return (
    <div className={styles.container}>
      <div className={styles.main404} >404</div>
      <div className={styles.msg}>!Error! page not found :O </div>

      <Button 
        text='Go to homepage' 
        colour='blue'
        iconR={<i className='fas fa-home' ></i>} 
        onClick={goHome}
      />
      
    </div>
  );
};



export default Page404;
