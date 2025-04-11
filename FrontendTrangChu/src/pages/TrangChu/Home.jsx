import Footer from "../../components/TrangChu/Footer/Footer"
import HeaderViewDoctor from "../../components/TrangChu/Header/HeaderViewDoctor"
import ScrollToTop from '../../components/TrangChu/ScrollToTop/ScrollToTop';
import '../TrangChu/home.scss'
import BodyHomePage from "./BodyHomePage/BodyHomePage"
const Home = () => {

    return (
        <>
            <div className='layout-app'>
                <HeaderViewDoctor />
                <BodyHomePage />
                <Footer />
            </div>      
            <ScrollToTop />            
        </>
    )
}
export default Home