import React from 'react'
import { RiLayoutLine, RiCodeBoxLine, RiRocketLine, RiRobotLine, RiCloudLine, RiDatabase2Line } from '@remixicon/react'
import SlideUp from '@/utlits/animations/slideUp'

const ServiceGrid = () => {
    return (
        <section id="services" className="services-area innerpage-single-area">
            <div className="container">
                <div className="container-inner">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12">
                            <SlideUp>
                                <div className="section-title text-center">
                                    <p>Services</p>
                                    <h2>Quality Services</h2>
                                </div>
                            </SlideUp>
                        </div>
                    </div>
                    <div className="row g-4">
                        <Card id={1} icon={<RiLayoutLine size={60} />} title={"UI/UX Design"} description={"Crafting stunning, user-centered designs that provide seamless digital experiences and reflect your brand's unique identity."} />
                        <Card id={2} icon={<RiCodeBoxLine size={60} />} title={"Web Development"} description={"Building robust, scalable, and highly performant websites using modern technologies from front-end to back-end."} />
                        <Card id={3} icon={<RiRocketLine size={60} />} title={"Deployment & Support"} description={"Ensuring smooth deployment to production and providing ongoing support to keep your web applications secure and up-to-date."} />
                        <Card id={4} icon={<RiRobotLine size={60} />} title={"AI Automation"} description={"Integrating intelligent AI solutions to streamline workflows, enhance productivity, and automate complex processes."} />
                        <Card id={5} icon={<RiCloudLine size={60} />} title={"Cloud Migration"} description={"Smoothly transitioning legacy systems to modern cloud infrastructures for improved scalability, security, and cost-efficiency."} />
                        <Card id={6} icon={<RiDatabase2Line size={60} />} title={"Data Engineering"} description={"Designing and building robust data pipelines to collect, transform, and analyze large volumes of information for actionable insights."} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ServiceGrid

const Card = ({ icon, title, description, id }) => {
    return (
        <div className="col-lg-4 col-md-6">
            <SlideUp delay={id}>
                <div className="service-item">
                    {icon}
                    <h4>{title}</h4>
                    <p>{description}</p>
                </div>
            </SlideUp>
        </div>
    )
}