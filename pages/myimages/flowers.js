import Image from 'next/image'
import img from '../../public/img1.png'

function Flowers() {
    return (
        <div>
            <Image src={img} width={420} height={200} alt ='banner' placeholder='blur' blurDataURL='https://cdn.wallpapersafari.com/98/9/Y3f8uF.jpg'/>
        </div>
    )
}
export default Flowers;