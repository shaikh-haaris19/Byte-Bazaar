import Head from "next/head";


export default function Home() {
  return (
    <>
      {/* Next Head  */}
      <Head>
        <title>Byte-Bazaar</title>
        <meta name="description" content="Discover Byte Bazaar, your one-stop online marketplace for trendy fashion, tech essentials, and lifestyle products. Shop with ease, enjoy secure checkout, and explore collections designed to bring style and innovation to your everyday life." />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
      </Head>



      <div>
        <img src="/Image.png" alt="" />
      </div>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="text-center mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">Byte-Bazaar</h1>
            <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">Byte Bazaar is a modern e‑commerce platform bringing together fashion, lifestyle, and everyday essentials in one place. With a focus on simplicity and elegance, it offers curated collections that blend style with affordability. Whether it’s clothing, accessories, or unique finds, Byte Bazaar delivers a seamless shopping experience designed for today’s digital marketplace.</p>
            <div className="flex mt-6 justify-center">
              <div className="w-16 h-1 rounded-full bg-yellow-800 inline-flex"></div>
            </div>
          </div>


          <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-yellow-100 text-yellow-800 mb-5 shrink-0">
                <img src={'/exchange_icon.png'} className='w-12 h-12 m-auto' alt="Exchange Policy" />
              </div>
              <div className="grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">Easy Exchange Policy</h2>
                <p className="leading-relaxed text-base">Exchanges accepted within 30 days. Items must be unworn, unwashed, and returned with original tags. Sale and personalized items are not eligible.</p>
                <a className="mt-3 text-yellow-800 inline-flex items-center">Learn More
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-yellow-100 text-yellow-800 mb-5 shrink-0">
                <img src={'/quality_icon.png'} className='w-12 h-12 m-auto' alt="" />
              </div>
              <div className="grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">We Offer's Best Quality</h2>
                <p className="leading-relaxed text-base">Premium fabrics, durable stitching, and timeless designs—crafted for comfort, style, and long‑lasting wear.</p>
                <a className="mt-3 text-yellow-800 inline-flex items-center">Learn More
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-yellow-100 text-yellow-800 mb-5 shrink-0">
                <img src={'/support_img.png'} className='w-12 h-12 m-auto' alt="" />
                {/* <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10" viewBox="0 0 24 24">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg> */}
              </div>
              <div className="grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">24x7 Customer Support</h2>
                <p className="leading-relaxed text-base">Our dedicated team is available around the clock to assist you anytime, anywhere.</p>
                <a className="mt-3 text-yellow-800 inline-flex items-center">Learn More
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


    </>
  );
}
