import styles from "./style";
import { Navbar,Billing,Business,Hero,Footer,Animations  } from "./components/index";
import { howtoplayhex, video1 } from "./assets";



const App = () => (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar/>
        </div>
      </div>

      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Hero/>
        </div>
      </div> 

      <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Business/>
          <Animations/>
          <Billing src={howtoplayhex} width={640}
           height={200}/>
          <Footer/>
        </div>
      </div> 

    </div>
    
  );


export default App