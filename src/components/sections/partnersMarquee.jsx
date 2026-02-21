import React from 'react'
import Marquee from "react-fast-marquee";

const PartnersMarquee = () => {
    return (
        <div className="about-content-part-bottom">
            <h2>Company I Worked With</h2>
            <div className="company-list">
                <div className="scroller">
                    <div className="scroller__inner">
                        <Marquee>
                            <img src={"/images/client-logos/partner1.png"} alt="" />
                            <img src={"/images/client-logos/partner2.png"} alt="" />
                            <img src={"/images/client-logos/partner3.png"} alt="" />
                            <img src={"/images/client-logos/partner4.png"} alt="" />
                            <img src={"/images/client-logos/partner5.png"} alt="" />
                            <img src={"/images/client-logos/partner1.png"} alt="" />
                        </Marquee>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PartnersMarquee