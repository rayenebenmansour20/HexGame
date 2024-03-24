import styles from '../style'
import {arrowUp, boucle,tried } from '../assets'

const GetStarted = () => {
  return (
    <button className={`${styles.flexCenter} w-[140px]
    h-[140px] rounded-full bg-blue-gradient p-[2px] cursor-pointer `}>
      <div className={`${styles.flexCenter} flex-col bg-primary
      w-[100%] h-[100%] rounded-full`}>
        <div className={`${styles.flexStart} flex-row`}>
          <p className='font-poppins font-medium text-[18px] leading-[23px]'>
            <span className='text-gradient'>Nouvelle</span>
          </p>
        </div>
          <p className='font-poppins font-medium text-[18px] leading-[23px]'>
            <span className='text-gradient'>Partie</span>
          </p>
          <img src={arrowUp} alt="NouvellePartielogo"
          className='w-[23px] h-[23px] object-contain' />
      </div>
    </button>
  )
}

export default GetStarted