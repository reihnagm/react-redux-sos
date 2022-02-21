import React from "react"
import Header from "./header"
import Footer from "./footer"
const Landing = () => {
  return (
    <>
      <Header />
      <div id="landing" className="columns is-items-center is-justify-center">
        <div className="column is-two-fifths">
          <div id="cover-landing"></div>
        </div>
        <div className="column  is-two-fifths">
          <div className="flex flex-d-column justify-c-center h-full">
            <h1 className="title text-black  margin-normal">Welcome to Hiring Channel</h1>
            <p className="sub-title text-black">Want to find a job or looking for employees ? </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
export default Landing
