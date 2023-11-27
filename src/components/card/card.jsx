import Link from "next/link";
import style from "../card/card.module.css"

const Card = ({id, name, brandName, description , price, color, image}) => {
    return (
        <div className={style.container}>     
            <div className={style.brand}>{brandName}</div>
            <div className={style.containerImg}>
                <Link href={`/detail/${id}`}>
                    <img src={image} alt={name}></img> </Link>
            </div>
            <div className={style.details}>
                <h4>{name}</h4>
                <p>{description}</p>
            </div>
                <div className={style.price}>{price}</div>
				</div>
            
//         <div className={style.container}>
//             <Link href={`/detail/${id}`}>
//             <h2>{name}</h2>
//             <Image
//             src={image}
//             width={300}
//             height={300}
//             alt={name}
//             />
//             <h2>{brandName}</h2>
//             <h2>{description}</h2>
//             <h2>{price}</h2>
//             <h2>{color}</h2>

//             <br />
//             </Link>
//         </div>
//     );
//   };
    );
};


 
export default Card;