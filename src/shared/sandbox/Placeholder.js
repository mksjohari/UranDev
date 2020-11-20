import React from "react";
import ContentLoader from "react-content-loader";
import styles from "../../modules/explore.module.scss";

const Placeholder = (props) => (
  <ContentLoader 
  className={styles.placeholder}
    speed={2}
    width={700}
    height={100}
    viewBox="0 0 700 100"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="130" y="22" rx="5" ry="5" width="300" height="14" /> 
    <rect x="130" y="50" rx="3" ry="3" width="170" height="8" /> 
    <rect x="130" y="71" rx="3" ry="3" width="140" height="8" /> 
    <rect x="30" y="15" rx="10" ry="10" width="70" height="70" />
  </ContentLoader>
)

export default Placeholder

