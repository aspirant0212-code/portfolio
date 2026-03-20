import React from 'react'
import { RiBookLine } from '@remixicon/react'
import SlideUp from '@/utlits/animations/slideUp'

const Resume = () => {
    return (
        <section id="resume" className="resume-area">
            <div className="container">
                <div className="resume-items">
                    <div className="row">
                        {/* <!-- START EXPERIENCE RESUME DESIGN AREA --> */}
                        <div className="col-xl-6 col-md-6">
                            <div className="single-resume">
                                <h2>Experience</h2>
                                <div className="experience-list">
                                    <Card year={'2025 jan - Present'} title={'Full Stack Web Developer'} institution={'Billiontags Creations Pvt Ltd'} />
                                    <Card year={'2024 oct - dec 2024'} title={'Jr. Content Writer'} institution={'Billiontags Creations Pvt Ltd'} />
                                    <Card year={'2024 may - July 2024'} title={'Web Development Intern'} institution={'Akshaya Homes'} />
                                </div>
                            </div>
                        </div>
                        {/* <!-- // END EXPERIENCE RESUME DESIGN AREA -->
                        <!-- START EDUCATION RESUME DESIGN AREA --> */}
                        <div className="col-xl-6 col-md-6">
                            <div className="experience-list">
                                <div className="single-resume">
                                    <h2>Education</h2>
                                    <Card year={'2020 - 2023'} title={'Bachelor of Computer Applications (BCA)'} institution={'Madras University'} />
                                    {/* <Card year={'2018 - 2020'} title={'Higher Secondary Education'} institution={'State Board, Tamil Nadu'} /> */}
                                    <Card year={'2023'} title={'Full Stack Development Certification'} institution={'Qspiders'} />
                                    <Card year={'2025'} title={'Cloud Engineering'} institution={'Inceptez Technologies'} />

                                </div>
                            </div>
                        </div>
                        {/* <!-- // END EDUCATION RESUME DESIGN AREA --> */}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Resume


const Card = ({ year, title, institution }) => {
    return (
        <SlideUp>
            <div className="resume-item">
                <div className="icon">
                    <RiBookLine />
                </div>
                <div className="content">
                    <span className="years">{year}</span>
                    <h4>{title}</h4>
                    <span className="company"> {institution} </span>
                </div>
            </div>
        </SlideUp>
    )
}