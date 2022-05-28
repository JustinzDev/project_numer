import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import './index.css'
const MainPage = () => {
    return(
        <HelmetProvider>
            <Helmet>
                <title>Numerical Methods</title>
            </Helmet>
            <div className='mx-auto container mt-10'>
                <div className="w-5/6 text-center mx-auto p-6 bg-white rounded-lg border-t-4 border-green-500 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <a href="/">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Numerical Methods 2/64</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">สอนโดย ผู้ช่วยศาสตราจารย์ ดร. สุวัจชัย กมลสันติโรจน์ (SWK)</p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">โปรเจค Scope ที่มี</p>
                    <ul className="list-none font-normal text-gray-700 dark:text-gray-400">
                        <li>Web - React</li>
                        <li>API + Token (jsonwebtoken)</li>
                        <li>Database MongoDB</li>
                        <li>CI/CD</li>
                        <li>Docker</li>
                        <li>Github</li>
                        <li>Swagger</li>
                    </ul>
                </div>
            </div>
        </HelmetProvider>
    )
}

export default MainPage