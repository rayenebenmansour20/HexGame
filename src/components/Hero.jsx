import styles from "../style"
import {discount,gamelogo,robot,robot1} from "../assets"
import GetStarted from './GetStarted'
import Stats from './Stats'


const Hero = () => {
  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
        <div className="flex flex-row items-center py-[6px] px-4 bg-discount-gradient
        rounded-[10px] mb-2 custom-gradient-shadow ">
          <img src={gamelogo} alt="GameLogoIcon" 
          className={`w-[32px] h-[32px]`}/>
          <p className={`${styles.paragraph} ml-2`}>  
          <span className={`text-white italic hover:not-italic`}>Vous Etes Prêt a jouer</span> A HEXGAME{" "}
          <span className={`text-white`}></span>
          </p>
        </div>

        <div className="flex flex-row
        justify-between items-center w-full">
          <h1 className="flex-1 font-poppins
          font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100px] leading-[75px]">
            Meilleur<br className="sm:block hidden"/>{" "}
            <span className="text-gradient">JEU de</span>{" "}
            réflexion
          </h1>

          <div className="ss:flex hidden md:mr-4 mr-0">
            <GetStarted/>
          </div>
        </div>

        <h1 className={`${styles.paragraph} font-poppins max-w-[470px] mt-5`}>
          "Hexgame" fait référence à un jeu,
          une application ou un programme informatique
          qui utilise des hexagones comme élément principal
          de son design ou de son gameplay.
        </h1>
      </div>
      <div className={`flex-1 flex ${styles.flexCenter}
      md:my-0 my-10 relative`}>
        <img src={robot1} alt="hexGameRobot"
        className="w-[100%] h-[100%] relative z-[5]"/>
        <div className="absolute z-[1] w-[40%]
        h-[35%] top-0 pink__gradient"/>
        <div className="absolute z-[1] w-[80%]
        h-[80%] rounded-full bottom-40 white__gradient"/>
        <div className="absolute z-[1] w-[50%]
        h-[50%] right-20 bottom-20 blue__gradient"/>
        </div>

    </section>
  )
}

export default Hero