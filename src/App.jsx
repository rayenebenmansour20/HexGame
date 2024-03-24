import styles from "./style";
import { Navbar,Billing,Business,FeedBackCard,Button,GetStarted,Hero,Testimonials,Footer,Clients,CTA,Stats  } from "./components/index";
import { howtoplayhex, video1 } from "./assets";

const videos = [
  { src: 'video1.mp4', width: 640, height: 360 },
  { src: 'video2.mp4', width: 640, height: 360 },
  { src: 'video3.mp4', width: 640, height: 360 }
];

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
          <Billing src={howtoplayhex} width={640}
           height={200}/>
          <Testimonials/>
          <FeedBackCard/>
          <Clients/>
          <CTA/>
          <Footer/>
        </div>
      </div> 

    </div>
    
  );


export default App