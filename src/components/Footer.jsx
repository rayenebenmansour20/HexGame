import styles  from "../style"
import { hexgamelogo1 } from "../assets"
import { footerLinks, socialMedia } from "../constants"

const Footer = () => (
  <section className={`${styles.flexCenter} ${styles.paddingY} flex-col relative `}>
    {/* Premier dégradé de couleur */}
    <div className=" z-[1] w-[40%] h-[35%] top-0 pink__gradient" />

    {/* Deuxième dégradé de couleur */}
    <div className=" z-[1] w-[80%] h-[80%] rounded-full bottom-40 white__gradient" />

    {/* Troisième dégradé de couleur */}
    <div className=" z-[1] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />

    <div className={`${styles.flexStart} md:flex-row
    flex-col mb-8 w-full`}>
      <div className=" flex-1 flex flex-col justify-center mr-10">
        <img src={hexgamelogo1} alt="hexgamelogo" className="w-[300px] h-[72px] object-contain object-left-bottom mt-8" />
         </div>
      <div className="flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10">
        {footerLinks.map((footerLink) => (
          <div key={footerLink.key} className="flex flex-col ss:my-0 my-4 min-w-[150px]">
            <h4 className="font-poppins font-medium text-[18px] leading-[27px] text-white">
              {footerLink.title}
            </h4>
            <ul className="list-none mt-4">
              {footerLink.links.map((link,index) =>(
                <li key={link.name} className={`font-poppins font-normal text-[16px] leading-[24px]
                text-dimWhite hover:text-secondary cursor-pointer
                ${index !== footerLink.links.length - 1 ? 'mb-4' : 'mb-0'}`}>
                <a href={link.link} className="text-dimWhite hover:text-secondary">
                  {link.name}
                </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

      </div>
    </div>
    <div className="w-full flex justify-between items-center 
    md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3f3r45]">
        <p className="font-poppins font-normal text-center text-[18px]
        leading-[27px] text-white">
          2024 HexGame. Tous Droits Réservés
        </p>
        <div className="flex flex-row md:mt-0 mt-6">
          {socialMedia.map((social,index)=>(
              <a key={social.id} href={social.link} target="_blank" rel="noopener noreferrer">
              <img
                src={social.icon}
                alt={social.id}
                className={`w-[21px] h-[21px] object-contain cursor-pointer hover: ${
                  index !== socialMedia.length - 1 ? 'mr-6' : 'mr-0'
                }`}
              />
            </a>
          ))}

        </div>
    </div>
  </section>
) 
export default Footer