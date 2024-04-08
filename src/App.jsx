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
          <div id="Régles">
          <Business/>
          </div>
          <div id="APropos">
          <Animations/>
          </div>
          <div id="Démo">
          <Billing src={howtoplayhex} width={640}
           height={200}/>
          </div>
          <Footer/>
        </div>
      </div> 

    </div>
    
  );


export default App