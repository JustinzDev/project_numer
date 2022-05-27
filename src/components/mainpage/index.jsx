import React from 'react'
import './index.css'
const MainPage = () => {
    return(
        <div className='mx-auto container mt-10'>
            <div className="w-5/6 text-center mx-auto p-6 bg-white rounded-lg border-t-4 border-green-500 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <a href="/">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Numerical Methods 2/64</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">สอนโดย ผู้ช่วยศาสตราจารย์ ดร. สุวัจชัย กมลสันติโรจน์ (SWK)</p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">โปรเจค Scope ที่มี</p>
                <ul className="list-none font-normal text-gray-700 dark:text-gray-400">
                    <li>Web - React</li>
                    <li>API - Node.js And MongoDB</li>
                    <li>API + Token (key)</li>
                    <li>Docker</li>
                    <li>Github</li>
                    <li>Swagger</li>
                </ul>
            </div>
        </div>
        
    )
}

export default MainPage