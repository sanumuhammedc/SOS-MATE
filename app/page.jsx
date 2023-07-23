import Features from "@components/Features";
import Footer from "@components/Footer";

const Home = () => {
    return (
        <section className="w-full flex-center flex-col ">
            <h1 className="head_text text-center">
                Care & Cure
                <br className="max-md:hidden" />
                <span className="orange_gradient text-center ">SOS MATE</span>
            </h1>
            <p className="desc text-center">
                A Unique Approach to
                Emergency Care. Care at your own pace, with lifetime
                access on mobile and desktop
            </p>
            <Features/>
            <Footer/>
        </section>
    )
}

export default Home 