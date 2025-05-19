import React from 'react'
import { Link } from 'react-router-dom'

const Modal = ({ isVisible, onClose, children }) => {
    if (!isVisible) return null

    const handleClose = (e) => {
        if (e.target.id === 'wrapper') onClose()
    }

    return (
        <div onClick={handleClose} id='wrapper' className='z-[60] fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
            <div className="w-full sm:w-[300px] md:w-[400px] lg:w-[600px] xl:w-[1200px] flex flex-col">
                <button onClick={() => onClose()} className="text-white text-xl place-self-end">
                    X
                </button>
                <div className="bg-white p-4 rounded">
                    {children}
                    {/* Add your modal content here */}
                    Example: <input type="text" placeholder="Enter your name" />
                    Example: <button onClick={() => handleSubmit()}>Submit</button>
                    Example: <button onClick={() => handleClose()}>Close</button>
                    Example: <Link to="/dashboard">Go to Dashboard</Link>
                    Example: <p>This is a modal.</p>

                </div>
            </div>
        </div>
    )
}

export default Modal