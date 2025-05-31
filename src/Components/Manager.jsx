import { React, useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const PasswordRef = useRef()
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passArray, setpassArray] = useState([])


    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        
        setpassArray(passwords)
        console.log(passwords)

    }


    useEffect(() => {
        getPasswords()

    }, [])



    const showPassword = () => {
        PasswordRef.current.type = "text"
        console.log(ref.current.src)
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            PasswordRef.current.type = "password"
        }
        else {
            PasswordRef.current.type = "text"
            ref.current.src = "icons/eyecross.png"
        }

    }

    const savePassword = async() => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

            await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"},
            body:JSON.stringify({id:form.id})})

            // console.log(form)
            setpassArray([...passArray, { ...form, id: uuidv4() }])
            await fetch("http://localhost:3000/",{method:"POST",headers:{"Content-Type":"application/json"},
            body:JSON.stringify({...form,id:uuidv4()})})
            // localStorage.setItem("passwords", JSON.stringify([...passArray, form]))
            setForm({ site: "", username: "", password: "" })
            console.log(passArray)
        }
        else {
            alert('Error:Password Not Saved!');
        }


    }

    const deletePassword = async(id) => {
        // console.log(form)
        let c = confirm("Do you really want to delete this password")
        if (c) {
            setpassArray(passArray.filter(item => item.id !== id))
            let res= await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"},
            body:JSON.stringify({...form,id})})
            // localStorage.setItem("passwords", JSON.stringify(passArray.filter(item => item.id !== id)))
            // console.log(passArray)
        }

        // toast('Password Deleted!', {
        //     position: "top-right",
        //     autoClose: 5000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: false,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "dark",
        //     transition: "Bounce"
        // });


    }

    const editPassword = (id) => {
        setForm({...passArray.filter(item => item.id === id)[0],id:id})
        setpassArray(passArray.filter(item => item.id !== id))

    }


    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value })
    }

    const copyText = (text) => {
        // toast('Copied to Clipboard!', {
        //     position: "top-right",
        //     autoClose: 5000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "light",
        //     transition: "Bounce"
        // });
        navigator.clipboard.writeText(text)
    }



    return (
        <>
            {/* <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="dark"
                transition="Bounce"
            /> */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]">
                </div></div>
            <div className="p-2 md:p-0 md:mycontainer min-h-[88.2vh] ">
                <h1 className='text-4xl font-bold text-center'>
                    <span className='text-green-500'>&lt;</span>
                    Pass
                    <span className='text-green-500'>OP/&gt;</span></h1>
                <p className='text-green-900 text-lg text-center'>Aapka apna Password Manager</p>
                <div className="flex flex-col p-4 text-black gap-8 items-center">
                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full bg-white border border-green-500 w-full py-1 p-4' type="text" name="site" id="site" />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8 ">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full bg-white border border-green-500 w-full py-1 p-4' type="text" name="username" id="username" />
                        <div className="relative">
                            <input ref={PasswordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full bg-white border border-green-500 w-full py-1 p-4' type="text" name="password" id="password" />
                            <span onClick={showPassword} className="absolute right-[3px] top-[4px] cursor-pointer">
                                <img ref={ref} className='p-1' width={26} src="icons/eye.png" alt="eye" /></span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center gap-2 bg-green-400 rounded-full px-8 py-2 w-fit hover:bg-green-300 border-2 border-green-900'><lord-icon
                        src="https://cdn.lordicon.com/efxgwrkc.json"
                        trigger="hover">
                    </lord-icon>
                        Save</button>

                </div>

                <div className="passwords max-w-3/4 mx-auto">
                    <h2 className='font-bold py-4 text-2xl'>Your passwords</h2>
                    {passArray.length === 0 && <div>No passwords to show</div>}
                    {passArray.length != 0 && <table className="table-auto w-full overflow-hidden rounded-md mb-10">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100 mb-10'>
                            {passArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='text-center py-2 border border-white'>
                                        <div className='flex items-center justify-center'>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <div className='size-7 lordiconcopy cursor-pointer' onClick={() => copyText(item.site)}><lord-icon
                                                src="https://cdn.lordicon.com/xuoapdes.json"
                                                trigger="hover" style={{ "width": "25px", "height": "25px", "paddingLeft": "3px" }}>
                                            </lord-icon></div>
                                        </div>
                                    </td>
                                    <td className='text-center py-2 border border-white'>
                                        <div className="flex items-center justify-center">
                                            <span>{item.username}</span>

                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => copyText(item.username)}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/xuoapdes.json"
                                                    trigger="hover" style={{ "width": "25px", "height": "25px", "paddingLeft": "3px" }}>
                                                </lord-icon></div></div>
                                    </td>
                                    <td className='text-center py-2 border border-white'>
                                        <div className="flex items-center justify-center">
                                            <span>{"*".repeat(item.password.length)}</span>

                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => copyText(item.password)}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/xuoapdes.json"
                                                    trigger="hover" style={{ "width": "25px", "height": "25px", "paddingLeft": "3px" }}>
                                                </lord-icon></div></div>
                                    </td>
                                    <td className='flex items-center justify-center text-center py-2 border border-white'>
                                        <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}><lord-icon
                                            src="https://cdn.lordicon.com/exymduqj.json"
                                            trigger="hover"
                                            stroke="bold"
                                            style={{ "width": "25px", "height": "25px" }}>
                                        </lord-icon></span>
                                        <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}><lord-icon
                                            src="https://cdn.lordicon.com/xyfswyxf.json"
                                            trigger="hover"
                                            stroke="bold"
                                            style={{ "width": "25px", "height": "25px" }}>
                                        </lord-icon></span>
                                    </td>
                                </tr>
                            })}


                        </tbody>
                    </table>
                    }
                </div>


            </div>


        </>
    )
}

export default Manager
