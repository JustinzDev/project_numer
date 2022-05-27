import React, { useEffect, useState, Fragment } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import Desmos from 'desmos'
import './index.css'

import axios from 'axios'

import { addStyles, EditableMathField } from 'react-mathquill'
import { create, all } from 'mathjs'

import Swal from 'sweetalert2'

addStyles()

const config = { }
const math = create(all, config)

const Secant = () => {

    let calculator = null

    const [FxText, setText] = useState({
        title: 'secant',
        fx: '',
        latex: '',
        fxisrandom: false
    })

    const [checkError, setcheckError] = useState(false)
    const [table, setTable] = useState(null)
    let dataTable = []

    const [data, setData] = useState({
        x0: '',
        x1: '',
        xnew: '',
        result: false,
        sum: 0
    })

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    const AuthToken = async (data_token) => {
        try {
            console.log(data_token)
            const url = "http://localhost:4000/api/rootofeq/auth_datatoken";
            const { data: res } = await axios.post(url, { token: data_token })
            if(res.token.title === 'secant'){
                setText({
                    title: res.token.title,
                    fx: res.token.fx,
                    latex: res.token.latex,
                    fxisrandom: true
                })
            }
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Token ของสมการ Secant หมดอายุแล้ว',
                    showConfirmButton: false,
                    timer: 2000
                })
                localStorage.removeItem('data_token_secant')
                console.log(error.response.data)
            }
        }
    }

    const handleRandomFx = async (e) => {
        e.preventDefault()
        try {
            const url = "http://localhost:4000/api/rootofeq/randomfx/secant";
            const { data: res } = await axios.get(url, FxText)
            console.log(res)
            localStorage.setItem('data_token_secant', res.token)
            setText({
                title: res.data.title,
                fx: res.data.fx,
                latex: res.data.latex,
                fxisrandom: true
            })
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                console.log(error.response.data)
            }
        }
    }

    const handleSumit = async (e) => {
        e.preventDefault()
        
        setData({
            x0: data.x0,
            x1: data.x1,
            xnew: data.xnew,
            result: true,
            sum: 0
        })

        const parseFx = math.parse(FxText.fx)
        const CompileFx = parseFx.compile()
        let scope = { x: 0 }

        let x0 = Number(data.x0), x1 = Number(data.x1), xNew, eps

        let findFx = (x0, x1) => { 
            scope.x = x0
            let fx0 = CompileFx.evaluate(scope)
            scope.x = x1
            let fx1 = CompileFx.evaluate(scope)
            return (x0 - (fx0 * (x0 - x1))) / (fx0- fx1)
        }

        while(true){
            xNew = findFx(x0, x1)
            scope.x = xNew
            eps = Math.abs(CompileFx.evaluate(scope))
            if(eps < 0.000001) {
                dataTable.push({
                    x0: x0.toFixed(6),
                    x1: x1.toFixed(6),
                    xnew: xNew.toFixed(6),
                    Err: eps
                })
                CreateGraph(xNew)
                setcheckError(false)
                break
            } else {
                dataTable.push({
                    x0: x0.toFixed(6),
                    x1: x1.toFixed(6),
                    xnew: xNew.toFixed(6),
                    Err: eps
                })
                continue
            }
        }

        setData({
            x0: data.x0,
            x1: data.x1,
            xnew: data.xnew,
            result: true,
            sum: xNew.toFixed(6)
        })

        setTable(
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400 border-t-4 border-green-500'>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                    <th scope="col" className="px-6 py-3">Iteration</th>
                    <th scope="col" className="px-6 py-3">x0</th>
                    <th scope="col" className="px-6 py-3">x1</th>
                    <th scope="col" className="px-6 py-3">xNew</th>
                    <th scope="col" className="px-6 py-3">Error</th>
                    </tr>
                </thead>
                <tbody>
                    {dataTable.map(
                            (data, i) => {
                            return (
                                <Fragment key={i}>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{i+1}</th>
                                        <td className="px-6 py-4">{data.x0}</td>
                                        <td className="px-6 py-4">{data.x1}</td>
                                        <td className="px-6 py-4">{data.xnew}</td>
                                        <td className="px-6 py-4">{data.Err}</td>
                                    </tr>
                                </Fragment>
                            )
                        }
                    )}  
                </tbody>
            </table>
        </div>
        )

        try {
            const url = "http://localhost:4000/api/rootofeq/savefx";
            const { data: res } = await axios.post(url, FxText)
            console.log(res)
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                console.log(error.response.data)
            }
        }
    }

    const CreateGraph = (sum) => {
        const elt = document.getElementById('calculatorgraph')
        elt.innerHTML = ''
        calculator = Desmos.GraphingCalculator(elt)
        const fx = 'y=' + FxText.latex
        calculator.setExpression({ latex: fx })
        calculator.setExpression({ latex: '(' + sum + ',' + 0 + ')' })
    }

    useEffect(() => {
        const data_token = localStorage.getItem('data_token_secant')
        if(data_token) AuthToken(data_token)
    }, [])

    return(
        <HelmetProvider>
            <Helmet>
                <title>Secant</title>
            </Helmet>
            <div className='mx-auto container mt-10 mb-10'>
                <div className="w-5/6 mx-auto p-6 bg-white rounded-lg border-t-4 border-green-500 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <h2 className='mt-5 text-center text-xl'>Secant</h2>
                    <div className='mt-10'>
                        {checkError === true &&
                            <div className="text-center text-lg w-2/4 mx-auto p-4 mb-4 text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                                พบข้อผิดพลาด, กรุณาลองใหม่อีกครั้ง!
                            </div>
                        }
                        <form onSubmit={handleSumit}>
                            <div className="mb-2 mx-auto">
                                <div className="flex items-center border-b-2 border-gray-300 py-2 w-1/4 mx-auto">
                                    <EditableMathField
                                        className="mathquill-example-field MathField-class appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                        latex={FxText.latex}
                                        onChange={(mathField) => {
                                            setText({
                                                title: 'secant',
                                                fx: mathField.text(),
                                                latex: mathField.latex()
                                            })
                                        }}
                                        mathquillDidMount={(mathField) => {
                                            setText({
                                                title: 'secant',
                                                fx: mathField.text(),
                                                latex: mathField.latex()
                                            })
                                        }}
                                        style={{border: "0px", margin: "auto"}}
                                    />
                                    <button onClick={handleRandomFx} className="flex-shrink-0 bg-green-500 hover:bg-green-700 border-green-500 hover:border-green-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
                                    Random
                                    </button>
                                </div>
                            </div>
                            {/* <div className="result-container">
                                <span>Raw latex:</span>
                                <span className="result-latex">{FxText.latex}</span>
                            </div>
                            <div className="result-container">
                                <span>Raw text:</span>
                                <span className="result-latex">{FxText.fx}</span>
                            </div> */}

                            <div className="relative z-0 w-1/4 mx-auto mb-6 group mt-7">
                                <input type="text" onChange={handleChange} value={data.x0} name="x0" className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                                <label className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ค่า x0</label>
                            </div>

                            <div className="relative z-0 w-1/4 mx-auto mb-6 group mt-7">
                                <input type="text" onChange={handleChange} value={data.x1} name="x1" className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                                <label className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ค่า x1</label>
                            </div>
                            {
                                data.x0 !== '' && data.x1 !== '' &&
                                <div className='text-center mt-10'>
                                    <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">คำนวณ</button>
                                </div>
                            }
                            
                        </form>
                        {data.sum !== 0 &&
                            <div className="p-5 w-3/4 mx-auto text-2xl text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800 mt-5 mb-5 text-center" role="alert">
                                <h4>{data.sum}</h4>
                            </div>
                        }
                    </div>
                    <div id="dataSum" className="mt-3 mb-1">
                        {table}
                        <div id='calculatorgraph' className='graph1 m-auto mt-5' ></div>
                    </div>
                </div>
            </div>
        </HelmetProvider>
    )
}

export default Secant